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
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: General Contact`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: General Contact`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    if (!data.firstName || !data.email || !data.phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: name, email, and phone are required",
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

    const sanitizedData = {
      firstName: escapeHtml(String(data.firstName).trim()),
      lastName: escapeHtml(String(data.lastName || "").trim()),
      email: escapeHtml(String(data.email).trim()),
      phoneNumber: escapeHtml(String(data.phoneNumber).trim()),
      inquiryType: escapeHtml(String(data.inquiryType || "").trim()),
      subject: escapeHtml(String(data.subject || "General Inquiry").trim()),
      message: data.message ? escapeHtml(String(data.message).trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(String(data.source).trim()) : "Contact Form",
      propertySlug: data.propertySlug ? escapeHtml(String(data.propertySlug).trim()) : "",
      propertyTitle: data.propertyTitle ? escapeHtml(String(data.propertyTitle).trim()) : "",
      propertyType: data.propertyType ? escapeHtml(String(data.propertyType).trim()) : "",
    };

    const rawData = {
      firstName: String(data.firstName).trim(),
      lastName: String(data.lastName || "").trim(),
      email: String(data.email).trim(),
      phoneNumber: String(data.phoneNumber).trim(),
      subject: String(data.subject || "General Inquiry").trim(),
      message: data.message ? String(data.message).trim() : "",
      inquiryType: String(data.inquiryType || "").trim(),
      source: data.source ? String(data.source).trim() : "Contact Form",
      country: data.country != null ? String(data.country).trim() : "",
    };

    const fullName = sanitizedData.lastName
      ? `${sanitizedData.firstName} ${sanitizedData.lastName}`
      : sanitizedData.firstName;

    const rawFullName = rawData.lastName
      ? `${rawData.firstName} ${rawData.lastName}`
      : rawData.firstName;

    const propertyField =
      [data.propertyTitle, data.propertySlug].filter(Boolean).join(" — ") || "";

    const createdAt = sanitizedData.createdAt;

    sendLeadEvent({
      userData: {
        email: rawData.email,
        phone: sanitizedData.phoneNumber,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
      },
      eventSource: sanitizedData.source,
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
            <h2>Contact Form - New Inquiry</h2>
            <p>${sanitizedData.subject}</p>
          </div>
          <div class="content">
            <div class="data-item">
              <span class="label">Name:</span>
              <span class="value">${fullName}</span>
            </div>
            <div class="data-item">
              <span class="label">Email:</span>
              <span class="value">${sanitizedData.email}</span>
            </div>
            <div class="data-item">
              <span class="label">Phone:</span>
              <span class="value">${sanitizedData.phoneNumber}</span>
            </div>
            ${
              data.country
                ? `
            <div class="data-item">
              <span class="label">Country (code):</span>
              <span class="value">${escapeHtml(String(data.country).trim())}</span>
            </div>
            `
                : ""
            }
            ${sanitizedData.inquiryType ? `
            <div class="data-item">
              <span class="label">Inquiry Type:</span>
              <span class="value">${sanitizedData.inquiryType}</span>
            </div>
            ` : ""}
            <div class="data-item">
              <span class="label">Subject:</span>
              <span class="value">${sanitizedData.subject}</span>
            </div>
            ${
              sanitizedData.message
                ? `
            <div class="data-item">
              <span class="label">Message:</span>
              <span class="value">${sanitizedData.message}</span>
            </div>
            `
                : ""
            }
            ${sanitizedData.propertySlug || sanitizedData.propertyTitle ? `
            <div class="data-item">
              <span class="label">Property:</span>
              <span class="value">${sanitizedData.propertyTitle || sanitizedData.propertySlug}${sanitizedData.propertyType ? ` (${sanitizedData.propertyType})` : ""}</span>
            </div>
            ` : ""}
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
      </html>
    `;

    const emailText = `
CONTACT FORM - NEW INQUIRY
===========================

Name: ${fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phoneNumber}
${data.country ? `Country (code): ${String(data.country).trim()}\n` : ""}${sanitizedData.inquiryType ? `Inquiry Type: ${sanitizedData.inquiryType}\n` : ""}Subject: ${sanitizedData.subject}
${sanitizedData.message ? `Message: ${sanitizedData.message}\n` : ""}${sanitizedData.propertySlug || sanitizedData.propertyTitle ? `Property: ${sanitizedData.propertyTitle || sanitizedData.propertySlug}${sanitizedData.propertyType ? ` (${sanitizedData.propertyType})` : ""}\n` : ""}Submitted: ${sanitizedData.createdAt}
Source: ${sanitizedData.source}

===========================
H&S Real Estate - Contact Form
    `;

    const notionPageForNotion =
      (data.notionPage != null && String(data.notionPage).trim()) ||
      (data.sourcePage != null && String(data.sourcePage).trim()) ||
      "Contact";

    const leadPayloadForNotion = {
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      email: rawData.email,
      phoneNumber: rawData.phoneNumber,
      message: rawData.message,
      enquiryType: rawData.inquiryType,
      page: notionPageForNotion,
      website: data.website != null ? String(data.website) : "",
      date: sanitizedData.createdAt,
      extra: {
        subject: rawData.subject,
        ...(propertyField && { property: propertyField }),
        ...(sanitizedData.propertyType && { propertyType: sanitizedData.propertyType }),
        ...(rawData.source && { source: rawData.source }),
        ...(rawData.country && { country: rawData.country }),
      },
    };

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendLeadToSheet({
        source: rawData.source,
        firstName: rawData.firstName,
        lastName: rawData.lastName,
        fullName: rawFullName,
        email: rawData.email,
        phoneNumber: rawData.phoneNumber,
        message: rawData.message,
        inquiryType: rawData.inquiryType,
        subject: rawData.subject,
        property: propertyField,
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email.trim(),
        subject: `Contact Inquiry: ${fullName}${sanitizedData.inquiryType ? ` - ${sanitizedData.inquiryType}` : ""} - ${sanitizedData.subject}`,
        text: emailText,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: rawData.email,
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion(leadPayloadForNotion),
    });

    console.log(
      `✅ Contact IP: ${ip} | ${sanitizedData.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! We've received your inquiry and will get back to you shortly.",
      failureMessage:
        "We could not save your inquiry at the moment. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "We're experiencing technical difficulties. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}
