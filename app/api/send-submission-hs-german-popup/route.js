import { NextResponse } from "next/server";
import { isBotSubmission } from "@/lib/honeypot";
import { getClientIP } from "@/lib/getClientIP";
import { appendLeadToNotion } from "@/lib/notionLeads";
import {
  buildLeadPersistenceResponse,
  runParallelLeadDispatch,
  trySendIpagMail,
  trySendLeadThankYouEmail,
} from "@/lib/smtpRouteHelpers";
import { leadThankYouFirstNameFromPayload } from "@/lib/leadThankYouEmail";

export async function POST(request) {
  // Extract IP and User-Agent for logging
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  
  try {
    const data = await request.json();

    // Log all submission attempts (before honeypot check)
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: HS German Popup`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
    console.log(`🚫 Bot detected from IP: ${ip} | Form: HS German Popup`);
    return NextResponse.json(
      { success: true, message: "Thank you for your submission." },
      { status: 200 }
    );
    }

    // Create HTML table from form data
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
          <td style="border: 1px solid #ddd; padding: 8px;">${data.fullName}</td>
        </tr>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td>
        </tr>
      <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Phone Number</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${data.phoneNumber}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Created At</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${data.createdAt}</td>
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
      sheet: Promise.resolve(null),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email,
        subject: `${data.source} Form Submission`,
        text: `HS German popup — ${data.fullName} — ${data.email}`,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: data.email,
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        enquiryType: "HS German Popup",
        page: data.source || "HS German Popup",
        date: data.createdAt || new Date().toISOString(),
      }),
    });

    console.log(
      `✅ HS German popup IP: ${ip} | ${data.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! Your submission was received.",
      failureMessage:
        "We could not deliver your submission by email right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: HS German Popup`, error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
