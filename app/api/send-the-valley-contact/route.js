import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sendLeadEvent } from "@/lib/metaConversionAPI";
import { isBotSubmission } from "@/lib/honeypot";
import { getClientIP } from "@/lib/getClientIP";

export async function POST(request) {
  // Extract IP and User-Agent for logging
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  
  try {
    const data = await request.json();

    // Log all submission attempts (before honeypot check)
    console.log(`🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: The Valley`);

    // Honeypot check - reject if bot detected (silently to avoid feedback)
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: The Valley`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
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

    const smtpTransporter = nodemailer.createTransport({
      host: "smtp.ipage.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create HTML table from form data
    const formTable = `
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="background-color: #1C3D5A; color: white;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Field</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Full Name</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            data.name || "N/A"
          }</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Email</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            data.email || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Phone Number</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            data.phone || "N/A"
          }</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Property Type</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            data.propertyType || "N/A"
          }</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Message</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            data.message || "N/A"
          }</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Submitted At</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            data.createdAt || new Date().toLocaleString()
          }</td>
        </tr>
      </tbody>
    </table>
  `;

    // Send Email
    await smtpTransporter.sendMail({
      from: `H&S Real Estate - The Valley <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `The Valley by Emaar - New Inquiry from ${
        data.name
      }`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1C3D5A; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">The Valley by Emaar Inquiry</h1>
        </div>
        <div style="padding: 20px; background-color: #f5f5f5;">
          <p style="font-size: 16px; color: #333;">Dear Team,</p>
          <p style="font-size: 14px; color: #666;">You have received a new inquiry for The Valley by Emaar. Below are the details:</p>
          ${formTable}
          <p style="font-size: 14px; color: #666; margin-top: 20px;">Please follow up with the client at your earliest convenience.</p>
          <p style="font-size: 14px; color: #666;">Best regards,<br/>H&S Real Estate System</p>
        </div>
        <div style="background-color: #1C3D5A; padding: 10px; text-align: center;">
          <p style="color: white; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} H&S Real Estate. All Rights Reserved.</p>
        </div>
      </div>
    `,
    });

    // Send Lead event to Meta Conversion API (non-blocking)
    const nameParts = (data.name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    const createdAt = data.createdAt || new Date().toISOString();
    
    sendLeadEvent({
      userData: {
        email: data.email,
        phone: data.phone,
        firstName: firstName,
        lastName: lastName,
      },
      eventSource: data.source || "The Valley by Emaar",
      eventTime: Math.floor(new Date(createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

