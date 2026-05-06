import { NextResponse } from "next/server";
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
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Property Valuation`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Property Valuation`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    if (!data.fullName || !data.email || !data.phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, and phone are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(data.email))) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    const fullName = escapeHtml(String(data.fullName));
    const email = escapeHtml(String(data.email));
    const phoneNumber = escapeHtml(String(data.phoneNumber));
    const listingType = escapeHtml(String(data.listingType || ""));
    const propertyAddress = escapeHtml(String(data.propertyAddress || ""));
    const createdAt = data.createdAt || new Date().toISOString();
    const source = data.source || "Property Valuation";

    const sheetMessage = data.propertyAddress
      ? `Property Address: ${String(data.propertyAddress)}, Listing Type: ${String(data.listingType || "")}`
      : "";

    const formTable = `
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Field</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Value</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Full Name</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${fullName}</td>
        </tr>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${email}</td>
        </tr>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Phone Number</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${phoneNumber}</td>
        </tr>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Listing Type</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${listingType}</td>
        </tr>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Property Address</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${propertyAddress}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Created At</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(String(createdAt))}</td>
        </tr>
      </tbody>
    </table>
    `;

    const emailHtml = `
      <p>Dear Team,</p>
      <p>You have received a new form submission. Below are the details:</p>
      ${formTable}
      <p>Best regards</p>
    `;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendLeadToSheet({
        source,
        fullName: String(data.fullName || ""),
        email: String(data.email || ""),
        phoneNumber: String(data.phoneNumber || ""),
        message: sheetMessage,
        inquiryType: "Property Valuation",
        subject: `${source} Form Submission`,
        property: String(data.propertyAddress || ""),
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: String(data.email).trim(),
        subject: `${source} Form Submission`,
        text: `Property Valuation — ${String(data.fullName)} — ${String(data.email)}`,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: String(data.fullName || ""),
        email: String(data.email || ""),
        phoneNumber: String(data.phoneNumber || ""),
        enquiryType: "Property Valuation",
        page: source,
        date: createdAt,
        extra: {
          ...(listingType && { listingType }),
          ...(propertyAddress && { propertyAddress }),
        },
      }),
    });

    console.log(
      `✅ Property valuation IP: ${ip} | ${String(data.email).split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! Your submission was received.",
      failureMessage:
        "We could not save your submission right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: Property Valuation`, error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
