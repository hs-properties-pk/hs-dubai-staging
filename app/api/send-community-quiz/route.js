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
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const data = await request.json();

    console.log(
      `🚨 Community Quiz submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Community Quiz`
    );

    // Honeypot check
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Community Quiz`);
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
          message: "Missing required fields: name, email, and phone are required",
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
      fullName: escapeHtml(String(data.fullName).trim()),
      email: escapeHtml(String(data.email).trim()),
      phoneNumber: escapeHtml(String(data.phoneNumber).trim()),
      primaryGoal: escapeHtml(String(data.primaryGoal || "").trim()),
      lifestyle: escapeHtml(String(data.lifestyle || "").trim()),
      budget: escapeHtml(String(data.budget || "").trim()),
      timeline: escapeHtml(String(data.timeline || "").trim()),
      matchingCommunities: Array.isArray(data.matchingCommunities)
        ? data.matchingCommunities.map((c) => escapeHtml(String(c).trim()))
        : [],
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(String(data.source).trim()) : "Community Quiz",
    };

    // Format quiz answers for email
    const goalLabels = {
      live: "I want to live there",
      invest: "Investment / Rental Income",
      both: "Both — Live & Invest",
    };

    const lifestyleLabels = {
      waterfront: "Waterfront & Beach Life",
      family: "Family & Community",
      urban: "Urban City Living",
      villa: "Villa & Green Living",
    };

    const budgetLabels = {
      "under-1.5m": "Under AED 1.5M",
      "1.5m-5m": "AED 1.5M – AED 5M",
      "5m-15m": "AED 5M – AED 15M",
      "15m-plus": "AED 15M+",
    };

    const timelineLabels = {
      "3months": "Within 3 Months",
      "6-12months": "Within 6–12 Months",
      exploring: "Just Exploring",
    };

    // Proper HTML email template
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
            .quiz-section { background: #fff; padding: 15px; margin-bottom: 15px; border-radius: 8px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Community Quiz - New Submission</h2>
            <p>${sanitizedData.source}</p>
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

            <div class="quiz-section">
              <h3 style="color: #000; margin-top: 0;">Quiz Answers:</h3>
              
              ${sanitizedData.primaryGoal ? `
              <div class="data-item">
                <span class="label">Primary Goal:</span>
                <span class="value">${goalLabels[sanitizedData.primaryGoal] || sanitizedData.primaryGoal}</span>
              </div>
              ` : ""}
              
              ${sanitizedData.lifestyle ? `
              <div class="data-item">
                <span class="label">Lifestyle Preference:</span>
                <span class="value">${lifestyleLabels[sanitizedData.lifestyle] || sanitizedData.lifestyle}</span>
              </div>
              ` : ""}
              
              ${sanitizedData.budget ? `
              <div class="data-item">
                <span class="label">Budget:</span>
                <span class="value">${sanitizedData.budget}</span>
              </div>
              ` : ""}
              
              ${sanitizedData.timeline ? `
              <div class="data-item">
                <span class="label">Timeline:</span>
                <span class="value">${timelineLabels[sanitizedData.timeline] || sanitizedData.timeline}</span>
              </div>
              ` : ""}
            </div>

            ${sanitizedData.matchingCommunities.length > 0 ? `
            <div class="data-item">
              <span class="label">Matched Communities:</span>
              <span class="value">${sanitizedData.matchingCommunities.join(", ")}</span>
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

    // Plain text version
    const emailText = `
COMMUNITY QUIZ - NEW SUBMISSION
================================

Name: ${sanitizedData.fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phoneNumber}

Quiz Answers:
${sanitizedData.primaryGoal ? `Primary Goal: ${goalLabels[sanitizedData.primaryGoal] || sanitizedData.primaryGoal}\n` : ""}
${sanitizedData.lifestyle ? `Lifestyle: ${lifestyleLabels[sanitizedData.lifestyle] || sanitizedData.lifestyle}\n` : ""}
${sanitizedData.budget ? `Budget: ${budgetLabels[sanitizedData.budget] || sanitizedData.budget}\n` : ""}
${sanitizedData.timeline ? `Timeline: ${timelineLabels[sanitizedData.timeline] || sanitizedData.timeline}\n` : ""}
${sanitizedData.matchingCommunities.length > 0 ? `Matched Communities: ${sanitizedData.matchingCommunities.join(", ")}\n` : ""}
Submitted: ${sanitizedData.createdAt}
Source: ${sanitizedData.source}

================================
H&S Real Estate - Community Quiz
    `;

    const quizNote = [
      data.primaryGoal && `Goal: ${data.primaryGoal}`,
      data.lifestyle && `Lifestyle: ${data.lifestyle}`,
      data.budget && `Budget: ${data.budget}`,
      data.timeline && `Timeline: ${data.timeline}`,
      Array.isArray(data.matchingCommunities) && data.matchingCommunities.length > 0
        ? `Matches: ${data.matchingCommunities.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const createdAt = sanitizedData.createdAt;

    sendLeadEvent({
      userData: {
        email: String(data.email).trim(),
        phone: String(data.phoneNumber).trim(),
        firstName: sanitizedData.fullName.split(" ")[0],
        lastName: sanitizedData.fullName.split(" ").slice(1).join(" ") || "",
      },
      eventSource: sanitizedData.source,
      eventTime: Math.floor(new Date(createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendCommunityLeadToSheet({
        source: data.source || "Community Quiz",
        community: "Community Quiz",
        fullName: String(data.fullName).trim(),
        email: String(data.email).trim(),
        phoneNumber: String(data.phoneNumber).trim(),
        userType: data.primaryGoal || "",
        budget: data.budget || "",
        investTimeline: data.timeline || "",
        message: quizNote,
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email.trim(),
        subject: `Community Quiz Submission: ${sanitizedData.fullName}`,
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
        message: quizNote,
        enquiryType: "Community Quiz",
        page: sanitizedData.source,
        date: sanitizedData.createdAt,
      }),
    });

    console.log(
      `✅ Community Quiz IP: ${ip} | ${String(data.email).split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage: "Thank you! Your quiz results are ready.",
      failureMessage:
        "We could not save your submission right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error("Error processing community quiz:", error);
    return NextResponse.json(
      {
        success: false,
        message: "We're experiencing technical difficulties. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}
