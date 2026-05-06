import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sendLeadEvent } from "@/lib/metaConversionAPI";
import { isBotSubmission } from "@/lib/honeypot";
import { getClientIP } from "@/lib/getClientIP";

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
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Dubai Hills Estate`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Dubai Hills Estate`);
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
      budget: data.budget ? escapeHtml(data.budget.trim()) : "",
      propertyType: data.propertyType ? escapeHtml(data.propertyType.trim()) : "",
      message: data.message ? escapeHtml(data.message.trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(data.source.trim()) : "Dubai Hills Estate - Dubai Hills Estate",
    };

    // Create transporter
    const smtpTransporter = nodemailer.createTransport({
      host: "smtp.ipage.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    try {
      await smtpTransporter.verify();
    } catch (smtpError) {
      console.error("SMTP connection failed");
      return NextResponse.json(
        {
          success: false,
          message:
            "Email service temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    // Simple HTML email template - just the data
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: #065f46; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .data-item { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #065f46; }
            .label { font-weight: bold; color: #065f46; }
            .value { color: #333; }
            .footer { background: #064e3b; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Dubai Hills Estate - New Inquiry</h2>
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
              sanitizedData.budget
                ? `
            <div class="data-item">
              <span class="label">Budget:</span>
              <span class="value">${sanitizedData.budget}</span>
            </div>
            `
                : ""
            }
            
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
            <p>Dubai Hills Estate Landing Page Submission</p>
          </div> 
        </body>
      </html>
    `;

    // Plain text version
    const emailText = `
Dubai Hills Estate - NEW INQUIRY
========================================

Name: ${sanitizedData.fullName}
Phone: ${sanitizedData.phoneNumber}
Email: ${sanitizedData.email}
${sanitizedData.budget ? `Budget: ${sanitizedData.budget}\n` : ""}${
      sanitizedData.propertyType ? `Property Type: ${sanitizedData.propertyType}\n` : ""
    }${sanitizedData.message ? `Message: ${sanitizedData.message}\n` : ""}
Submitted: ${new Date(sanitizedData.createdAt).toLocaleString()}
Source: ${sanitizedData.source}

========================================
Dubai Hills Estate Landing Page
    `;

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured");
      return NextResponse.json(
        {
          success: false,
          message:
            "Email service configuration error. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Send Email
    const mailOptions = {
      from: `Dubai Hills Estate <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: sanitizedData.email,
      subject: `Dubai Hills Estate Inquiry: ${sanitizedData.fullName}`,
      text: emailText,
      html: emailHtml,
    };

    try {
      const emailResult = await smtpTransporter.sendMail(mailOptions);
      console.log("Email sent successfully:", emailResult.messageId);

      // Send Lead event to Meta Conversion API (non-blocking)
      const nameParts = sanitizedData.fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      sendLeadEvent({
        userData: {
          email: sanitizedData.email,
          phone: sanitizedData.phoneNumber,
          firstName: firstName,
          lastName: lastName,
        },
        eventSource: sanitizedData.source,
        eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
      }).catch((error) => {
        console.error("Meta Conversion API error (non-blocking):", error);
      });

      // Log successful submission
      console.log(`✅ Valid submission from IP: ${ip} | Email: ${sanitizedData.email.split("@")[0]}@*** | Form: Dubai Hills Estate`);

      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you! We've received your inquiry and will contact you within 24 hours.",
        },
        { status: 201 }
      );
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json(
        {
          success: false,
          message:
            "We're experiencing technical difficulties. Please try again later or contact us directly.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Email submission error:", error);
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

