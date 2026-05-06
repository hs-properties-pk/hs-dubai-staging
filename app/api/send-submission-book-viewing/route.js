import { NextResponse } from "next/server";
import { sendLeadEvent } from "@/lib/metaConversionAPI";
import { isBotSubmission } from "@/lib/honeypot";
import { getClientIP } from "@/lib/getClientIP";
import { appendLeadToSheet } from "@/lib/sheetDB";
import { appendLeadToNotion } from "@/lib/notionLeads";
import {
  buildLeadPersistenceResponse,
  runParallelLeadDispatch,
  trySendIpagMail,
  trySendLeadThankYouEmail,
} from "@/lib/smtpRouteHelpers";
import { leadThankYouFirstNameFromPayload } from "@/lib/leadThankYouEmail";

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
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Book Viewing`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Book Viewing`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    if (!data.fullName || !data.email || !data.phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: name, email, and phone are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const sanitizedData = {
      fullName: escapeHtml(String(data.fullName).trim()),
      email: escapeHtml(String(data.email).trim()),
      phoneNumber: escapeHtml(String(data.phoneNumber).trim()),
      propertyUrl: data.propertyUrl ? escapeHtml(String(data.propertyUrl).trim()) : "",
      propertyType: data.propertyType ? escapeHtml(String(data.propertyType).trim()) : "",
      preferredDate: data.preferredDate ? escapeHtml(String(data.preferredDate).trim()) : "",
      message: data.message ? escapeHtml(String(data.message).trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(String(data.source).trim()) : "Book a Viewing",
    };

    const rawData = {
      fullName: String(data.fullName).trim(),
      email: String(data.email).trim(),
      phoneNumber: String(data.phoneNumber).trim(),
      propertyUrl: data.propertyUrl ? String(data.propertyUrl).trim() : "",
      source: data.source ? String(data.source).trim() : "Book a Viewing",
    };

    const sheetMessage = rawData.propertyUrl ? `Property URL: ${rawData.propertyUrl}` : "";

    const nameParts = sanitizedData.fullName.split(" ");
    sendLeadEvent({
      userData: {
        email: sanitizedData.email,
        phone: sanitizedData.phoneNumber,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
      },
      eventSource: sanitizedData.source,
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const propertyLinkHtml = sanitizedData.propertyUrl
      ? `<div class="data-item">
              <span class="label">Property Listing:</span>
              <span class="value"><a href="${sanitizedData.propertyUrl}" target="_blank" style="color: #0891b2; text-decoration: underline;">View Listing</a></span>
            </div>`
      : "";
    const propertyTypeHtml = sanitizedData.propertyType
      ? `<div class="data-item"><span class="label">Interested Property Type:</span><span class="value">${sanitizedData.propertyType}</span></div>`
      : "";
    const preferredDateHtml = sanitizedData.preferredDate
      ? `<div class="data-item"><span class="label">Preferred Date:</span><span class="value">${sanitizedData.preferredDate}</span></div>`
      : "";
    const messageHtml = sanitizedData.message
      ? `<div class="data-item"><span class="label">Additional Notes:</span><span class="value">${sanitizedData.message}</span></div>`
      : "";

    const propertyLinkText = sanitizedData.propertyUrl
      ? `Property Listing: ${sanitizedData.propertyUrl}\n`
      : "";
    const propertyTypeText = sanitizedData.propertyType ? `Interested Property Type: ${sanitizedData.propertyType}\n` : "";
    const preferredDateText = sanitizedData.preferredDate ? `Preferred Date: ${sanitizedData.preferredDate}\n` : "";
    const messageText = sanitizedData.message ? `Additional Notes: ${sanitizedData.message}\n` : "";

    const emailHtml = `<!DOCTYPE html>
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
      <h2>Book a Viewing - New Request</h2>
    </div>
    <div class="content">
      <div class="data-item">
        <span class="label">Name:</span>
        <span class="value">${sanitizedData.fullName}</span>
      </div>
      <div class="data-item">
        <span class="label">Email:</span>
        <span class="value">${sanitizedData.email}</span>
      </div>
      <div class="data-item">
        <span class="label">Phone:</span>
        <span class="value">${sanitizedData.phoneNumber}</span>
      </div>
      ${propertyLinkHtml}
      ${propertyTypeHtml}
      ${preferredDateHtml}
      ${messageHtml}
      <div class="data-item">
        <span class="label">Submitted:</span>
        <span class="value">${sanitizedData.createdAt}</span>
      </div>
      <div class="data-item">
        <span class="label">Source:</span>
        <span class="value">${sanitizedData.source}</span>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} H&amp;S Real Estate. All Rights Reserved.</p>
    </div>
  </body>
</html>`;

    const emailText = `BOOK A VIEWING - NEW REQUEST
==============================
Name: ${sanitizedData.fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phoneNumber}
${propertyLinkText}${propertyTypeText}${preferredDateText}${messageText}Submitted: ${sanitizedData.createdAt}
Source: ${sanitizedData.source}
==============================
H&S Real Estate - Book a Viewing`;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendLeadToSheet({
        source: rawData.source,
        fullName: rawData.fullName,
        email: rawData.email,
        phoneNumber: rawData.phoneNumber,
        message: sheetMessage,
        inquiryType: "Book Viewing",
        subject: `Book a Viewing: ${rawData.fullName}`,
        property: rawData.propertyUrl || "",
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email.trim(),
        subject: `Book a Viewing: ${sanitizedData.fullName}`,
        text: emailText,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: rawData.fullName,
        email: rawData.email,
        phoneNumber: rawData.phoneNumber,
        message: data.message ? String(data.message).trim() : "",
        enquiryType: "Book Viewing",
        page: rawData.source,
        date: sanitizedData.createdAt,
        extra: {
          ...(rawData.propertyUrl && { propertyUrl: rawData.propertyUrl }),
          ...(sanitizedData.propertyType && { propertyType: sanitizedData.propertyType }),
          ...(sanitizedData.preferredDate && { preferredDate: sanitizedData.preferredDate }),
        },
      }),
    });

    console.log(
      `✅ Book viewing IP: ${ip} | ${sanitizedData.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! We'll contact you shortly to schedule your viewing.",
      failureMessage:
        "We could not save your request right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error("Error processing book viewing form:", error);
    return NextResponse.json(
      { success: false, message: "We're experiencing technical difficulties. Please try again later." },
      { status: 500 }
    );
  }
}
