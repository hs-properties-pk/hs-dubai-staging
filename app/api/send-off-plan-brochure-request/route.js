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
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Off-Plan Brochure Request`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Off-Plan Brochure`);
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
      propertySlug: data.propertySlug ? escapeHtml(String(data.propertySlug).trim()) : "",
      propertyTitle: data.propertyTitle ? escapeHtml(String(data.propertyTitle).trim()) : "",
      interestedResidence: (data.interestedResidence || data.propertyType)
        ? escapeHtml(String(data.interestedResidence || data.propertyType).trim())
        : "",
      createdAt: data.createdAt || new Date().toISOString(),
    };

    const brochureMsg = [
      data.propertyTitle && `Property: ${data.propertyTitle}`,
      (data.interestedResidence || data.propertyType) && `Interested: ${data.interestedResidence || data.propertyType}`,
      data.propertyUrl && `URL: ${data.propertyUrl}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const propertyField =
      [data.propertyTitle, data.propertySlug].filter(Boolean).join(" — ") || data.propertyUrl || "";

    const nameParts = sanitizedData.fullName.split(" ");
    sendLeadEvent({
      userData: {
        email: sanitizedData.email,
        phone: sanitizedData.phoneNumber,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
      },
      eventSource: "Off-Plan Brochure Request",
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const propertyLinkHtml = sanitizedData.propertyUrl
      ? `<div class="data-item">
              <span class="label">Property:</span>
              <span class="value"><a href="${sanitizedData.propertyUrl}" target="_blank" style="color: #000; text-decoration: underline;">${sanitizedData.propertyTitle || sanitizedData.propertyUrl}</a></span>
            </div>`
      : "";
    const interestedResidenceHtml = sanitizedData.interestedResidence
      ? `<div class="data-item">
              <span class="label">Interested In:</span>
              <span class="value">${sanitizedData.interestedResidence}</span>
            </div>`
      : "";

    const emailHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
      .header { background: #000000; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background: #f5f5f5; }
      .data-item { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #000000; }
      .label { font-weight: bold; color: #000000; }
      .value { color: #2F4F4F; }
      .footer { background: #000000; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>Off-Plan Brochure Request</h2>
      <p>Someone requested a brochure from Residences & Pricing</p>
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
      ${interestedResidenceHtml}
      <div class="data-item">
        <span class="label">Submitted:</span>
        <span class="value">${sanitizedData.createdAt}</span>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} H&amp;S Real Estate. All Rights Reserved.</p>
    </div>
  </body>
</html>`;

    const emailText = `OFF-PLAN BROCHURE REQUEST
==============================
Name: ${sanitizedData.fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phoneNumber}
Property: ${sanitizedData.propertyTitle || sanitizedData.propertyUrl}
${sanitizedData.interestedResidence ? `Interested In: ${sanitizedData.interestedResidence}\n` : ""}Submitted: ${sanitizedData.createdAt}
==============================
H&S Real Estate - Off-Plan Brochure`;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendLeadToSheet({
        source: data.source || "Off-Plan Brochure Request",
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phoneNumber).trim(),
        message: brochureMsg,
        inquiryType: "Off Plan",
        subject: `Brochure request: ${data.propertyTitle || data.propertySlug || "Off-plan"}`,
        property: propertyField,
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email.trim(),
        subject: `Off-Plan Brochure Request: ${sanitizedData.propertyTitle || "Property"} - ${sanitizedData.fullName}`,
        text: emailText,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phoneNumber).trim(),
        message: brochureMsg,
        enquiryType: "Off Plan",
        page: "Off-Plan Brochure",
        date: sanitizedData.createdAt,
        extra: {
          ...(data.propertySlug && { propertySlug: String(data.propertySlug).trim() }),
        },
      }),
    });

    console.log(
      `✅ Off-plan brochure IP: ${ip} | ${sanitizedData.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! You can now download your brochure.",
      failureMessage:
        "We could not save your request right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error("Error processing off-plan brochure request:", error);
    return NextResponse.json(
      { success: false, message: "We're experiencing technical difficulties. Please try again later." },
      { status: 500 }
    );
  }
}
