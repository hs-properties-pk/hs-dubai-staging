import { NextResponse } from "next/server";
import { sendLeadEvent } from "@/lib/metaConversionAPI";
import { isBotSubmission } from "@/lib/honeypot";
import { getClientIP } from "@/lib/getClientIP";
import { appendCommunityLeadToSheet } from "@/lib/sheetDB";
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
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: China LPS`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: China LPS`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    if (!data.name || !data.email || !data.phone) {
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
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    const rawName = String(data.name).trim();
    const rawEmail = String(data.email).trim();
    const rawPhone = String(data.phone).trim();
    const rawVchat = data.vchat ? String(data.vchat).trim() : "";
    const source = "China Landing Page";

    const sanitizedData = {
      name: escapeHtml(rawName),
      email: escapeHtml(rawEmail),
      phone: escapeHtml(rawPhone),
      vchat: rawVchat ? escapeHtml(rawVchat) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source,
    };

    const msgParts = [rawVchat && `WeChat/vChat: ${rawVchat}`].filter(Boolean);

    sendLeadEvent({
      userData: {
        email: rawEmail,
        phone: rawPhone,
        firstName: rawName.split(" ")[0] || rawName,
        lastName: rawName.split(" ").slice(1).join(" ") || "",
      },
      eventSource: source,
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const formTable = `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Field</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Name</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sanitizedData.name}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Email</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sanitizedData.email}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Phone</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sanitizedData.phone}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>vChat (WeChat) ID</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${sanitizedData.vchat || "Not provided"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Source</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(source)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Submitted At</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${new Date(sanitizedData.createdAt).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    `;

    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ffbf00; padding-bottom: 10px;">
            New Form Submission - China Landing Page
          </h2>
          <p>Dear Team,</p>
          <p>You have received a new form submission from the China Landing Page. Below are the details:</p>
          ${formTable}
          <p style="margin-top: 20px;">Best regards,<br>H&S Real Estate</p>
        </div>
      `;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendCommunityLeadToSheet({
        source,
        fullName: rawName,
        email: rawEmail,
        phoneNumber: rawPhone,
        message: msgParts.join(" | "),
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: rawEmail,
        subject: `${source} Form Submission`,
        text: `China LPS — ${rawName} — ${rawEmail}`,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: rawEmail,
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: rawName,
        email: rawEmail,
        phoneNumber: rawPhone,
        message: msgParts.join(" | "),
        enquiryType: "China LPS",
        page: source,
        date: sanitizedData.createdAt,
      }),
    });

    console.log(
      `✅ China LPS IP: ${ip} | ${rawEmail.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Form submitted successfully! We will contact you soon.",
      failureMessage:
        "We could not save your submission right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: China LPS`, error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while submitting the form. Please try again later.",
      },
      { status: 500 }
    );
  }
}
