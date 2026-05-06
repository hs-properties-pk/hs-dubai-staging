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

function escapeHtml(text) {
  if (!text) return "";
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request) {
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const data = await request.json();

    const source = data.source || "Community Landing Page";
    console.log(
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: ${source}`
    );

    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: ${source}`);
      return NextResponse.json(
        { success: true, message: "Thank you for your submission." },
        { status: 200 }
      );
    }

    const fullName = data.fullName || data.name;
    const phoneNumber = data.phoneNumber || data.phone;

    if (!fullName || !data.email || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, and phone are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    const messageRaw = data.message != null ? String(data.message) : "";
    const sanitizedData = {
      fullName: escapeHtml(fullName.trim()),
      email: escapeHtml(data.email.trim()),
      phoneNumber: escapeHtml(phoneNumber.trim()),
      userType: data.userType ? escapeHtml(data.userType.trim()) : "",
      budget: data.budget ? escapeHtml(data.budget.trim()) : "",
      investTimeline: data.investTimeline ? escapeHtml(data.investTimeline.trim()) : "",
      message: escapeHtml(messageRaw.trim()),
      createdAt: data.createdAt || new Date().toISOString(),
      source: escapeHtml(source),
      communitySlug: data.communitySlug ? escapeHtml(data.communitySlug.trim()) : "",
    };

    const nameParts = sanitizedData.fullName.split(" ");
    sendLeadEvent({
      userData: {
        email: String(data.email).trim(),
        phone: String(phoneNumber).trim(),
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
      },
      eventSource: source,
      eventTime: Math.floor(new Date(sanitizedData.createdAt).getTime() / 1000),
    }).catch((err) => {
      console.error("Meta Conversion API error (non-blocking):", err);
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #111 0%, #333 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .data-item { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #111; }
            .label { font-weight: bold; color: #111; }
            .value { color: #333; }
            .footer { background: #111; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${sanitizedData.source} - New Inquiry</h2>
            <p>Landing page form submission</p>
          </div>
          <div class="content">
            <div class="data-item"><span class="label">Name:</span> <span class="value">${sanitizedData.fullName}</span></div>
            <div class="data-item"><span class="label">Email:</span> <span class="value">${sanitizedData.email}</span></div>
            <div class="data-item"><span class="label">Phone:</span> <span class="value">${sanitizedData.phoneNumber}</span></div>
            ${sanitizedData.userType ? `<div class="data-item"><span class="label">Are you a:</span> <span class="value">${sanitizedData.userType}</span></div>` : ""}
            ${sanitizedData.budget ? `<div class="data-item"><span class="label">Budget:</span> <span class="value">${sanitizedData.budget}</span></div>` : ""}
            ${sanitizedData.investTimeline ? `<div class="data-item"><span class="label">How soon investing:</span> <span class="value">${sanitizedData.investTimeline}</span></div>` : ""}
            <div class="data-item"><span class="label">Submitted:</span> <span class="value">${new Date(sanitizedData.createdAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span></div>
            <div class="data-item"><span class="label">Source:</span> <span class="value">${sanitizedData.source}</span></div>
          </div>
          <div class="footer">
            <p>${sanitizedData.source} | H&S Property</p>
          </div>
        </body>
      </html>
    `;

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendCommunityLeadToSheet({
        source,
        community: data.communitySlug || source,
        fullName: String(fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(phoneNumber).trim(),
        userType: data.userType || "",
        budget: data.budget || "",
        investTimeline: data.investTimeline || "",
        message: messageRaw.trim(),
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: String(data.email).trim(),
        subject: `${sanitizedData.source}: ${sanitizedData.fullName}`,
        text: `${sanitizedData.source} - New Inquiry\n\nName: ${sanitizedData.fullName}\nEmail: ${sanitizedData.email}\nPhone: ${sanitizedData.phoneNumber}${sanitizedData.userType ? `\nAre you a: ${sanitizedData.userType}` : ""}${sanitizedData.budget ? `\nBudget: ${sanitizedData.budget}` : ""}${sanitizedData.investTimeline ? `\nHow soon investing: ${sanitizedData.investTimeline}` : ""}${sanitizedData.message ? `\nMessage: ${sanitizedData.message}` : ""}\nSubmitted: ${sanitizedData.createdAt}\nSource: ${sanitizedData.source}`,
        html: emailHtml,
        fromName: "H&S Property",
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: String(fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(phoneNumber).trim(),
        enquiryType: "Community",
        page: source,
        date: sanitizedData.createdAt,
        extra: {
          ...(sanitizedData.userType && { userType: sanitizedData.userType }),
          ...(sanitizedData.budget && { budget: sanitizedData.budget }),
          ...(sanitizedData.investTimeline && { investTimeline: sanitizedData.investTimeline }),
          ...(sanitizedData.communitySlug && { communitySlug: sanitizedData.communitySlug }),
          ...(sanitizedData.message && { message: sanitizedData.message }),
        },
      }),
    });

    console.log(
      `✅ Community contact IP: ${ip} | ${String(data.email).split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! We've received your inquiry and will contact you within 24 hours.",
      failureMessage:
        "We could not save your inquiry right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: Community Contact`, error);
    return NextResponse.json(
      {
        success: false,
        message: "We're experiencing technical difficulties. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}
