import { NextResponse } from "next/server";
import { sendLeadEvent } from "@/lib/metaConversionAPI";
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
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: German Contact`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: German Contact`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    // Helper to display arrays as comma-separated strings
    const formatArray = (arr) =>
      Array.isArray(arr) && arr.length ? arr.join(", ") : "—";

    const formTable = `
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Field</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Name</td><td style="border: 1px solid #ddd; padding: 8px;">${data.name
      }</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Phone Number</td><td style="border: 1px solid #ddd; padding: 8px;">${data.phoneNumber
      }</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Email</td><td style="border: 1px solid #ddd; padding: 8px;">${data.email
      }</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Message</td><td style="border: 1px solid #ddd; padding: 8px;">${data.message
      }</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Investment Type</td><td style="border: 1px solid #ddd; padding: 8px;">${formatArray(
        data.investmentType
      )}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Investment Amount</td><td style="border: 1px solid #ddd; padding: 8px;">${formatArray(
        data.investmentAmount
      )}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Property Type</td><td style="border: 1px solid #ddd; padding: 8px;">${formatArray(
        data.propertyType
      )}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Bedroom Count</td><td style="border: 1px solid #ddd; padding: 8px;">${formatArray(
        data.bedroomCount
      )}</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Currently in Dubai?</td><td style="border: 1px solid #ddd; padding: 8px;">${data.currentlyInDubai || "—"
      }</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Dubai Resident?</td><td style="border: 1px solid #ddd; padding: 8px;">${data.dubaiResident || "—"
      }</td></tr>
        <tr><td style="border: 1px solid #ddd; padding: 8px;">Submitted At</td><td style="border: 1px solid #ddd; padding: 8px;">${data.createdAt
      }</td></tr>
      </tbody>
    </table>
    `;

    const emailHtml = `
      <p>Dear Team,</p>
      <p>You have received a new form submission. Below are the details:</p>
      ${formTable}
      <p>Best regards,</p>
    `;

    const nameParts = (data.name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    const createdAt = data.createdAt || new Date().toISOString();

    sendLeadEvent({
      userData: {
        email: data.email,
        phone: data.phoneNumber,
        firstName,
        lastName,
      },
      eventSource: data.source || "German Contact Form",
      eventTime: Math.floor(new Date(createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: Promise.resolve(null),
      leadNotification: trySendIpagMail({
        smtpUser: process.env.GERMAN_EMAIL_USER,
        smtpPass: process.env.GERMAN_EMAIL_PASS,
        smtpFromEmail: process.env.GERMAN_EMAIL_USER,
        to: process.env.GERMAN_EMAIL_USER,
        replyTo: data.email,
        subject: `${data.source} Form Submission`,
        text: `German contact form — ${data.name} — ${data.email}`,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: data.email,
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
        smtpUser: process.env.GERMAN_EMAIL_USER,
        smtpPass: process.env.GERMAN_EMAIL_PASS,
        smtpFromEmail: process.env.GERMAN_EMAIL_USER,
      }),
      notion: appendLeadToNotion({
        firstName,
        lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        message: data.message || "",
        enquiryType: "German Contact",
        page: data.source || "German Contact Form",
        date: createdAt,
        extra: {
          investmentType: formatArray(data.investmentType),
          investmentAmount: formatArray(data.investmentAmount),
          propertyType: formatArray(data.propertyType),
          bedroomCount: formatArray(data.bedroomCount),
          ...(data.currentlyInDubai && { currentlyInDubai: data.currentlyInDubai }),
          ...(data.dubaiResident && { dubaiResident: data.dubaiResident }),
        },
      }),
    });

    console.log(
      `✅ German contact IP: ${ip} | ${data.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
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
    console.error(`❌ Error from IP: ${ip} | Form: German Contact`, error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
