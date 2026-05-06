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

// Helper function to escape HTML to prevent XSS
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
  // Extract IP and User-Agent for logging
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  
  try {
    const data = await request.json();

    // Log all submission attempts (before honeypot check)
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: DAMAC Island 2`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: DAMAC Island 2`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!data.fullName || !data.email || !data.phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: name, email, and phone are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
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

    // Sanitize input data
    const sanitizedData = {
      fullName: escapeHtml(data.fullName.trim()),
      email: escapeHtml(data.email.trim()),
      phoneNumber: escapeHtml(data.phoneNumber.trim()),
      propertyType: data.propertyType ? escapeHtml(data.propertyType.trim()) : "",
      message: data.message ? escapeHtml(data.message.trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(data.source.trim()) : "DAMAC Island 2 - Dubai Islands",
    };

    // HTML email template with cyan/blue theme
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f0f9ff; }
            .data-item { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #06b6d4; }
            .label { font-weight: bold; color: #0891b2; }
            .value { color: #333; }
            .footer { background: #0e7490; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>DAMAC Island 2 - New Inquiry</h2>
            <p>Multi-step form submission</p>
          </div>
          
          <div class="content">
            <div class="data-item">
              <span class="label">Name:</span>
              <span class="value">${sanitizedData.fullName}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Phone:</span>
              <span class="value">${sanitizedData.phoneNumber}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Email:</span>
              <span class="value">${sanitizedData.email}</span>
            </div>
            
            ${
              sanitizedData.propertyType
                ? `
            <div class="data-item">
              <span class="label">Property Type:</span>
              <span class="value">${sanitizedData.propertyType}</span>
            </div>
            `
                : ""
            }
            
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
              <span class="value">${new Date(sanitizedData.createdAt).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Source:</span>
              <span class="value">${sanitizedData.source}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>DAMAC Island 2 Landing Page Submission</p>
          </div> 
        </body>
      </html>
    `;

    // Plain text version
    const emailText = `
DAMAC ISLAND 2 - NEW INQUIRY
==============================

Name: ${sanitizedData.fullName}
Phone: ${sanitizedData.phoneNumber}
Email: ${sanitizedData.email}
${sanitizedData.propertyType ? `Property Type: ${sanitizedData.propertyType}\n` : ""}${
      sanitizedData.message ? `Message: ${sanitizedData.message}\n` : ""
    }
Submitted: ${new Date(sanitizedData.createdAt).toLocaleString()}
Source: ${sanitizedData.source}

==============================
DAMAC Island 2 Landing Page
    `;

    const sheetMsg = [
      data.propertyType && `Property type: ${data.propertyType}`,
      data.message && `Message: ${data.message}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const nameParts = sanitizedData.fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    sendLeadEvent({
      userData: {
        email: String(data.email).trim(),
        phone: String(data.phoneNumber).trim(),
        firstName,
        lastName,
      },
      eventSource: sanitizedData.source,
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendCommunityLeadToSheet({
        source: data.source ? String(data.source).trim() : "DAMAC Island 2 - Dubai Islands",
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phoneNumber).trim(),
        message: sheetMsg,
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: String(data.email).trim(),
        subject: `DAMAC Island 2 Inquiry: ${sanitizedData.fullName}`,
        text: emailText,
        html: emailHtml,
        fromName: "DAMAC Island 2",
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phoneNumber).trim(),
        message: sheetMsg,
        enquiryType: "DAMAC Island 2",
        page: sanitizedData.source,
        date: sanitizedData.createdAt,
      }),
    });

    console.log(
      `✅ DAMAC Island IP: ${ip} | ${String(data.email).split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage:
        "Thank you! We've received your inquiry and will contact you within 24 hours.",
      failureMessage:
        "We could not save your inquiry right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: DAMAC Island 2`, error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We're experiencing technical difficulties. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}

