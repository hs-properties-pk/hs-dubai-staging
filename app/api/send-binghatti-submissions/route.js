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
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Binghatti`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Binghatti`);
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

    // Create HTML email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #000000, #2d3748); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f8f9fa; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
            .label { font-weight: bold; color: #2d3748; display: inline-block; width: 150px; }
            .value { color: #4a5568; }
            .footer { background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 14px; }
            .urgent { background: #fed7d7; color: #c53030; padding: 10px; border-radius: 5px; margin: 15px 0; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏢 Binghatti Developments</h1>
            <p>New Project Inquiry Received</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              <strong>🚀 URGENT: New Lead Requires Immediate Follow-up</strong>
            </div>
            
            <div class="details">
              <div class="field">
                <span class="label">Full Name:</span>
                <span class="value">${data.fullName}</span>
              </div>
              
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">
                  <a href="mailto:${data.email}" style="color: #3182ce;">${data.email
      }</a>
                </span>
              </div>
              
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">
                  <a href="tel:${data.phoneNumber}" style="color: #3182ce;">${data.phoneNumber
      }</a>
                </span>
              </div>
              
              <div class="field">
                <span class="label">Project Interest:</span>
                <span class="value" style="color: #e53e3e; font-weight: bold;">${data.projectInterest || "Not specified"
      }</span>
              </div>
              
              <div class="field">
                <span class="label">Message:</span>
                <span class="value">${data.message || "No message provided"
      }</span>
              </div>
              
              <div class="field">
                <span class="label">Submitted At:</span>
                <span class="value">${new Date(data.createdAt).toLocaleString(
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
              
              <div class="field" style="border-bottom: none;">
                <span class="label">Source:</span>
                <span class="value">${data.source}</span>
              </div>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="mailto:${data.email}?subject=Follow-up: ${data.projectInterest
      }&body=Dear ${data.fullName}," 
                 style="background: #e53e3e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                 📧 Reply to Client
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>This inquiry was submitted through the Binghatti Developments landing page</p>
            <p>⏰ Please respond within 24 hours for best conversion rates</p>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const emailText = `
BINGHATTI DEVELOPMENTS - NEW INQUIRY
=====================================

URGENT: New Lead Requires Immediate Follow-up

CONTACT DETAILS:
----------------
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phoneNumber}
Project: ${data.projectInterest || "Not specified"}

MESSAGE:
--------
${data.message || "No message provided"}

SUBMISSION DETAILS:
-------------------
Submitted: ${new Date(data.createdAt).toLocaleString()}
Source: ${data.source}

ACTION REQUIRED:
----------------
Please contact this lead within 24 hours for best results.

Reply to: ${data.email}
Call: ${data.phoneNumber}
    `;

    const nameParts = data.fullName.split(" ");
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
      eventSource: data.source || "Binghatti Developments",
      eventTime: Math.floor(new Date(createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: Promise.resolve(null),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email,
        subject: `🚀 New Binghatti Inquiry: ${data.projectInterest || data.fullName}`,
        text: emailText,
        html: emailHtml,
        fromName: "Binghatti Developments",
      }),
      thankYou: trySendLeadThankYouEmail({
        to: data.email,
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        message: data.message || "",
        enquiryType: "Binghatti",
        page: data.source,
        date: createdAt,
        extra: {
          ...(data.projectInterest && { projectInterest: data.projectInterest }),
        },
      }),
    });

    console.log(
      `✅ Binghatti IP: ${ip} | ${data.email.split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage:
        "Thank you! We've received your inquiry and will contact you within 24 hours.",
      failureMessage:
        "We could not deliver your inquiry by email right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: Binghatti`, error);
    // Generic error message for production
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
