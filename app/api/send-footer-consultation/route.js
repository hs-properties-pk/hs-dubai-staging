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
      `🚨 Footer Consultation submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Footer Consultation`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Footer Consultation`);
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
            "Missing required fields: first name, email, and phone are required",
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
      propertyType: escapeHtml(String(data.propertyType || "").trim()),
      budget: escapeHtml(String(data.budget || "").trim()),
      message: data.message ? escapeHtml(String(data.message).trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(String(data.source).trim()) : "Footer Consultation",
    };

    const fullName = sanitizedData.lastName
      ? `${sanitizedData.firstName} ${sanitizedData.lastName}`
      : sanitizedData.firstName;

    const sheetMessage = [
      data.message && `Message: ${data.message}`,
      data.propertyType && `Property type: ${data.propertyType}`,
      data.budget && `Budget: ${data.budget}`,
    ]
      .filter(Boolean)
      .join(" | ");

    sendLeadEvent({
      userData: {
        email: sanitizedData.email,
        phone: sanitizedData.phoneNumber,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
      },
      eventSource: sanitizedData.source,
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
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
            .footer { background: #333333; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Footer Consultation Form - New Inquiry</h2>
            <p>${sanitizedData.source}</p>
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
            
            ${sanitizedData.propertyType ? `
            <div class="data-item">
              <span class="label">Property Type:</span>
              <span class="value">${sanitizedData.propertyType}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.budget ? `
            <div class="data-item">
              <span class="label">Budget:</span>
              <span class="value">${sanitizedData.budget}</span>
            </div>
            ` : ""}
            
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
FOOTER CONSULTATION FORM - NEW INQUIRY
=======================================

Name: ${fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phoneNumber}
${sanitizedData.propertyType ? `Property Type: ${sanitizedData.propertyType}\n` : ""}
${sanitizedData.budget ? `Budget: ${sanitizedData.budget}\n` : ""}
${sanitizedData.message ? `Message: ${sanitizedData.message}\n` : ""}
Submitted: ${sanitizedData.createdAt}
Source: ${sanitizedData.source}

=======================================
H&S Real Estate - Footer Consultation Form
    `;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendLeadToSheet({
        source: data.source || "Footer Consultation",
        firstName: data.firstName,
        lastName: data.lastName || "",
        email: data.email,
        phoneNumber: data.phoneNumber,
        message: sheetMessage,
        inquiryType: "Footer Consultation",
        subject: "Footer Consultation Inquiry",
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email.trim(),
        subject: `Footer Consultation Inquiry: ${fullName}${sanitizedData.propertyType ? ` - ${sanitizedData.propertyType}` : ""}`,
        text: emailText,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        firstName: String(data.firstName).trim(),
        lastName: String(data.lastName || "").trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phoneNumber).trim(),
        message: sanitizedData.message,
        enquiryType: "Footer Consultation",
        page: sanitizedData.source,
        date: sanitizedData.createdAt,
        extra: {
          ...(sanitizedData.propertyType && { propertyType: sanitizedData.propertyType }),
          ...(sanitizedData.budget && { budget: sanitizedData.budget }),
        },
      }),
    });

    console.log(
      `✅ Footer consultation IP: ${ip} | ${sanitizedData.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage:
        "Thank you! We've received your inquiry and will get back to you within 30 minutes.",
      failureMessage:
        "We could not save your inquiry at the moment. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error("Error processing footer consultation form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "We're experiencing technical difficulties. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}
