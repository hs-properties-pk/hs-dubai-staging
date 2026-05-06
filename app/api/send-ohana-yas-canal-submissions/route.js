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
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Ohana Yas Canal`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Ohana Yas Canal`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: full name, email, and phone are required",
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

    // Validate phone number format (basic check)
    if (!data.phone || data.phone.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid phone number.",
        },
        { status: 400 }
      );
    }

    // Sanitize input data
    const sanitizedData = {
      fullName: escapeHtml(data.fullName.trim()),
      email: escapeHtml(data.email.trim()),
      phone: escapeHtml(data.phone.trim()),
      country: data.country ? escapeHtml(data.country.trim()) : "",
      userType: data.userType ? escapeHtml(data.userType.trim()) : "",
      propertyType: data.propertyType ? escapeHtml(data.propertyType.trim()) : "",
      budget: data.budget ? escapeHtml(data.budget.trim()) : "",
      investTimeline: data.investTimeline ? escapeHtml(data.investTimeline.trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(data.source.trim()) : "Ohana Yas Canal",
    };

    // HTML email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: #001838; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .data-item { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #00bcd4; }
            .label { font-weight: bold; color: #001838; }
            .value { color: #333; }
            .footer { background: #002a5a; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Ohana Yas Canal - Expression of Interest</h2>
            <p>New inquiry submission</p>
          </div>
          
          <div class="content">
            <div class="data-item">
              <span class="label">Full Name:</span>
              <span class="value">${sanitizedData.fullName}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Email:</span>
              <span class="value">${sanitizedData.email}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Phone:</span>
              <span class="value">${sanitizedData.phone}</span>
            </div>
            
            ${sanitizedData.country ? `
            <div class="data-item">
              <span class="label">Country:</span>
              <span class="value">${sanitizedData.country}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.userType ? `
            <div class="data-item">
              <span class="label">User Type:</span>
              <span class="value">${sanitizedData.userType}</span>
            </div>
            ` : ""}
            
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
            
            ${sanitizedData.investTimeline ? `
            <div class="data-item">
              <span class="label">Investment Timeline:</span>
              <span class="value">${sanitizedData.investTimeline}</span>
            </div>
            ` : ""}
            
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
            <p>Ohana Yas Canal Landing Page Submission</p>
          </div> 
        </body>
      </html>
    `;

    // Plain text version
    const emailText = `
Ohana Yas Canal - EXPRESSION OF INTEREST
========================================

Full Name: ${sanitizedData.fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}
${sanitizedData.country ? `Country: ${sanitizedData.country}\n` : ""}${sanitizedData.userType ? `User Type: ${sanitizedData.userType}\n` : ""}${sanitizedData.propertyType ? `Property Type: ${sanitizedData.propertyType}\n` : ""}${sanitizedData.budget ? `Budget: ${sanitizedData.budget}\n` : ""}${sanitizedData.investTimeline ? `Investment Timeline: ${sanitizedData.investTimeline}\n` : ""}
Submitted: ${new Date(sanitizedData.createdAt).toLocaleString()}
Source: ${sanitizedData.source}

========================================
Ohana Yas Canal Landing Page
    `;

    const nameParts = sanitizedData.fullName.split(" ");
    sendLeadEvent({
      userData: {
        email: String(data.email).trim(),
        phone: String(data.phone).trim(),
        firstName: nameParts[0] || sanitizedData.fullName,
        lastName: nameParts.slice(1).join(" ") || "",
      },
      eventSource: sanitizedData.source,
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendCommunityLeadToSheet({
        source: data.source ? String(data.source).trim() : "Ohana Yas Canal",
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phone).trim(),
        userType: data.userType || "",
        budget: data.budget || "",
        investTimeline: data.investTimeline || "",
        residenceType: data.propertyType || "",
        message: data.country ? `Country: ${data.country}` : "",
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: String(data.email).trim(),
        subject: `Ohana Yas Canal EOI: ${sanitizedData.fullName}`,
        text: emailText,
        html: emailHtml,
        fromName: "Ohana Yas Canal",
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phone).trim(),
        enquiryType: "Ohana Yas Canal",
        page: sanitizedData.source,
        date: sanitizedData.createdAt,
        extra: {
          ...(sanitizedData.country && { country: sanitizedData.country }),
          ...(sanitizedData.userType && { userType: sanitizedData.userType }),
          ...(sanitizedData.propertyType && { propertyType: sanitizedData.propertyType }),
          ...(sanitizedData.budget && { budget: sanitizedData.budget }),
          ...(sanitizedData.investTimeline && { investTimeline: sanitizedData.investTimeline }),
        },
      }),
    });

    console.log(
      `✅ Ohana IP: ${ip} | ${String(data.email).split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
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
    console.error(`❌ Error from IP: ${ip} | Form: Ohana Yas Canal`, error);
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
