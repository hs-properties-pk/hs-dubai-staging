import { NextResponse } from "next/server";
import { sendLeadEvent } from "@/lib/metaConversionAPI";
import { isBotSubmission } from "@/lib/honeypot";
import { getClientIP } from "@/lib/getClientIP";
import { appendNewsletterLeadToSheet } from "@/lib/sheetDB";
import { appendLeadToNotion } from "@/lib/notionLeads";
import {
  buildLeadPersistenceResponse,
  runParallelLeadDispatch,
  trySendIpagMail,
  trySendLeadThankYouEmail,
} from "@/lib/smtpRouteHelpers";

function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request) {
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const data = await request.json();

    console.log(
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Newsletter Subscription`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Newsletter Subscription`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    if (!data.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    const rawEmail = String(data.email).trim();
    const sanitizedEmail = escapeHtml(rawEmail);
    const createdAt = data.createdAt || new Date().toISOString();
    const sourceRaw = data.source ? String(data.source).trim() : "Newsletter Subscription";
    const sourceDisplay = escapeHtml(sourceRaw);

    sendLeadEvent({
      userData: {
        email: rawEmail,
      },
      eventSource: sourceRaw,
      eventTime: Math.floor(new Date(createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: #0891b2; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f5f5f5; }
            .data-item { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #0891b2; }
            .label { font-weight: bold; color: #0891b2; }
            .value { color: #2F4F4F; }
            .footer { background: #065f73; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>New Newsletter Subscription</h2>
          </div>
          <div class="content">
            <div class="data-item">
              <span class="label">Email:</span>
              <span class="value">${sanitizedEmail}</span>
            </div>
            <div class="data-item">
              <span class="label">Subscribed:</span>
              <span class="value">${createdAt}</span>
            </div>
            <div class="data-item">
              <span class="label">Source:</span>
              <span class="value">${sourceDisplay}</span>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} H&amp;S Real Estate. All Rights Reserved.</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
NEW NEWSLETTER SUBSCRIPTION
============================

Email: ${sanitizedEmail}
Subscribed: ${createdAt}
Source: ${sourceDisplay}

============================
H&S Real Estate - Newsletter
    `;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendNewsletterLeadToSheet({
        email: rawEmail,
        source: sourceRaw,
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: rawEmail,
        subject: `Newsletter Subscription: ${sanitizedEmail}`,
        text: emailText,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: rawEmail,
        recipientFirstName: "",
        variant: "newsletter",
      }),
      notion: appendLeadToNotion({
        firstName: "Newsletter",
        lastName: "Subscriber",
        email: rawEmail,
        phoneNumber: "—",
        enquiryType: "Newsletter Subscription",
        page: sourceRaw,
        date: createdAt,
      }),
    });

    console.log(
      `✅ Newsletter IP: ${ip} | ${rawEmail.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you for subscribing to our newsletter!",
      failureMessage:
        "We could not save your subscription right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      {
        success: false,
        message: "We're experiencing technical difficulties. Please try again later.",
      },
      { status: 500 }
    );
  }
}
