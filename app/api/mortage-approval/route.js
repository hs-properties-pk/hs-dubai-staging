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
      `🚨 Lead submitted from IP: ${ip} | User-Agent: ${userAgent.substring(0, 80)} | Form: Mortgage Approval`
    );

    // Honeypot check
    if (isBotSubmission(data)) {
      console.log(`🚫 Bot detected from IP: ${ip} | Form: Mortgage Approval`);
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
      fullName: escapeHtml(String(data.fullName || "").trim()),
      email: escapeHtml(String(data.email || "").trim()),
      phoneNumber: escapeHtml(String(data.phoneNumber || "").trim()),
      message: data.message ? escapeHtml(String(data.message).trim()) : "",
      createdAt: data.createdAt || new Date().toISOString(),
      source: data.source ? escapeHtml(String(data.source).trim()) : "Mortgage Approval",
      // Calculator details
      propertyPrice: data.propertyPrice ? escapeHtml(String(data.propertyPrice).trim()) : "",
      deposit: data.deposit ? escapeHtml(String(data.deposit).trim()) : "",
      mortgagePeriod: data.mortgagePeriod ? escapeHtml(String(data.mortgagePeriod).trim()) : "",
      interestRate: data.interestRate ? escapeHtml(String(data.interestRate).trim()) : "",
      loanAmount: data.loanAmount ? parseFloat(data.loanAmount) : null,
      monthlyPayment: data.monthlyPayment ? parseFloat(data.monthlyPayment) : null,
      totalPurchaseCosts: data.totalPurchaseCosts ? escapeHtml(String(data.totalPurchaseCosts).trim()) : "",
      totalRequiredUpfront: data.totalRequiredUpfront ? escapeHtml(String(data.totalRequiredUpfront).trim()) : "",
      // Borrowing capacity calculator fields
      monthlyIncome: data.monthlyIncome ? escapeHtml(String(data.monthlyIncome).trim()) : "",
      monthlyCommitments: data.monthlyCommitments ? escapeHtml(String(data.monthlyCommitments).trim()) : "",
      buyerStatus: data.buyerStatus ? escapeHtml(String(data.buyerStatus).trim()) : "",
      propertyValue: data.propertyValue ? escapeHtml(String(data.propertyValue).trim()) : "",
      estimatedBorrowing: data.estimatedBorrowing ? parseFloat(data.estimatedBorrowing) : null,
    };

    // Proper HTML email template (black theme)
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
            .section-title { margin-top: 20px; margin-bottom: 10px; font-weight: bold; color: #000000; font-size: 16px; }
            .footer { background: #000000; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Mortgage Approval Request</h2>
            <p>${sanitizedData.source}</p>
          </div>
          
          <div class="content">
            <div class="section-title">Contact Information</div>
            
            <div class="data-item">
              <span class="label">Full Name:</span>
              <span class="value">${sanitizedData.fullName}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Email:</span>
              <span class="value">${sanitizedData.email}</span>
            </div>
            
            <div class="data-item">
              <span class="label">Phone Number:</span>
              <span class="value">${sanitizedData.phoneNumber}</span>
            </div>
            
            ${sanitizedData.message ? `
            <div class="data-item">
              <span class="label">Message:</span>
              <span class="value">${sanitizedData.message}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.propertyPrice || sanitizedData.deposit || sanitizedData.mortgagePeriod ? `
            <div class="section-title">Mortgage Calculator Details</div>
            
            ${sanitizedData.propertyPrice ? `
            <div class="data-item">
              <span class="label">Property Price:</span>
              <span class="value">${sanitizedData.propertyPrice}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.deposit ? `
            <div class="data-item">
              <span class="label">Deposit:</span>
              <span class="value">${sanitizedData.deposit}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.mortgagePeriod ? `
            <div class="data-item">
              <span class="label">Mortgage Period:</span>
              <span class="value">${sanitizedData.mortgagePeriod} years</span>
            </div>
            ` : ""}
            
            ${sanitizedData.interestRate ? `
            <div class="data-item">
              <span class="label">Interest Rate:</span>
              <span class="value">${sanitizedData.interestRate}%</span>
            </div>
            ` : ""}
            
            ${sanitizedData.loanAmount !== null ? `
            <div class="data-item">
              <span class="label">Loan Amount:</span>
              <span class="value">AED ${sanitizedData.loanAmount.toFixed(2)}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.monthlyPayment !== null ? `
            <div class="data-item">
              <span class="label">Monthly Payment:</span>
              <span class="value">AED ${sanitizedData.monthlyPayment.toFixed(2)}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.totalPurchaseCosts ? `
            <div class="data-item">
              <span class="label">Total Purchase Costs:</span>
              <span class="value">${sanitizedData.totalPurchaseCosts}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.totalRequiredUpfront ? `
            <div class="data-item">
              <span class="label">Total Required Upfront:</span>
              <span class="value">${sanitizedData.totalRequiredUpfront}</span>
            </div>
            ` : ""}
            ` : ""}
            
            ${sanitizedData.monthlyIncome || sanitizedData.buyerStatus || sanitizedData.estimatedBorrowing !== null ? `
            <div class="section-title">Borrowing Capacity Calculator Details</div>
            
            ${sanitizedData.monthlyIncome ? `
            <div class="data-item">
              <span class="label">Monthly Gross Income:</span>
              <span class="value">AED ${sanitizedData.monthlyIncome}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.monthlyCommitments ? `
            <div class="data-item">
              <span class="label">Monthly Commitments:</span>
              <span class="value">AED ${sanitizedData.monthlyCommitments}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.buyerStatus ? `
            <div class="data-item">
              <span class="label">Buyer Status:</span>
              <span class="value">${sanitizedData.buyerStatus}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.propertyValue ? `
            <div class="data-item">
              <span class="label">Property Value:</span>
              <span class="value">AED ${sanitizedData.propertyValue}</span>
            </div>
            ` : ""}
            
            ${sanitizedData.estimatedBorrowing !== null ? `
            <div class="data-item">
              <span class="label">Estimated Borrowing Capacity:</span>
              <span class="value">AED ${sanitizedData.estimatedBorrowing.toLocaleString()}</span>
            </div>
            ` : ""}
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

    // Plain text version (required for good deliverability)
    const emailText = `
MORTGAGE APPROVAL REQUEST
==========================

Contact Information:
--------------------
Full Name: ${sanitizedData.fullName}
Email: ${sanitizedData.email}
Phone Number: ${sanitizedData.phoneNumber}
${sanitizedData.message ? `Message: ${sanitizedData.message}\n` : ""}

${sanitizedData.propertyPrice || sanitizedData.deposit || sanitizedData.mortgagePeriod ? `
Mortgage Calculator Details:
----------------------------
${sanitizedData.propertyPrice ? `Property Price: ${sanitizedData.propertyPrice}\n` : ""}${sanitizedData.deposit ? `Deposit: ${sanitizedData.deposit}\n` : ""}${sanitizedData.mortgagePeriod ? `Mortgage Period: ${sanitizedData.mortgagePeriod} years\n` : ""}${sanitizedData.interestRate ? `Interest Rate: ${sanitizedData.interestRate}%\n` : ""}${sanitizedData.loanAmount !== null ? `Loan Amount: AED ${sanitizedData.loanAmount.toFixed(2)}\n` : ""}${sanitizedData.monthlyPayment !== null ? `Monthly Payment: AED ${sanitizedData.monthlyPayment.toFixed(2)}\n` : ""}${sanitizedData.totalPurchaseCosts ? `Total Purchase Costs: ${sanitizedData.totalPurchaseCosts}\n` : ""}${sanitizedData.totalRequiredUpfront ? `Total Required Upfront: ${sanitizedData.totalRequiredUpfront}\n` : ""}
` : ""}
${sanitizedData.monthlyIncome || sanitizedData.buyerStatus || sanitizedData.estimatedBorrowing !== null ? `
Borrowing Capacity Calculator Details:
--------------------------------------
${sanitizedData.monthlyIncome ? `Monthly Gross Income: AED ${sanitizedData.monthlyIncome}\n` : ""}${sanitizedData.monthlyCommitments ? `Monthly Commitments: AED ${sanitizedData.monthlyCommitments}\n` : ""}${sanitizedData.buyerStatus ? `Buyer Status: ${sanitizedData.buyerStatus}\n` : ""}${sanitizedData.propertyValue ? `Property Value: AED ${sanitizedData.propertyValue}\n` : ""}${sanitizedData.estimatedBorrowing !== null ? `Estimated Borrowing Capacity: AED ${sanitizedData.estimatedBorrowing.toLocaleString()}\n` : ""}
` : ""}
Submitted: ${sanitizedData.createdAt}
Source: ${sanitizedData.source}

==========================
H&S Real Estate - Mortgage Approval Form
    `;

    const createdAt = sanitizedData.createdAt;
    const nameParts = sanitizedData.fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    sendLeadEvent({
      userData: {
        email: data.email.trim(),
        phone: sanitizedData.phoneNumber,
        firstName,
        lastName,
      },
      eventSource: sanitizedData.source,
      eventTime: Math.floor(new Date(createdAt).getTime() / 1000),
    }).catch((error) => {
      console.error("Meta Conversion API error (non-blocking):", error);
    });

    const { sheetSaved, emailSent, thankYouSent, notionSaved } = await runParallelLeadDispatch({
      sheet: appendLeadToSheet({
        source: data.source || "Mortgage Approval",
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        message: data.message || "",
        inquiryType: "Mortgage",
        subject: `${data.source || "Mortgage"} Form Submission`,
      }),
      leadNotification: trySendIpagMail({
        to: "leads@hsproperties.ae",
        replyTo: data.email.trim(),
        subject: `Mortgage Approval Request: ${sanitizedData.fullName}`,
        text: emailText,
        html: emailHtml,
      }),
      thankYou: trySendLeadThankYouEmail({
        to: String(data.email).trim(),
        recipientFirstName: leadThankYouFirstNameFromPayload(data),
      }),
      notion: appendLeadToNotion({
        fullName: String(data.fullName || ""),
        email: String(data.email || ""),
        phoneNumber: String(data.phoneNumber || ""),
        message: String(data.message || ""),
        enquiryType: "Mortgage",
        page: sanitizedData.source,
        date: sanitizedData.createdAt,
        extra: {
          ...(sanitizedData.propertyPrice && { propertyPrice: sanitizedData.propertyPrice }),
          ...(sanitizedData.deposit && { deposit: sanitizedData.deposit }),
          ...(sanitizedData.mortgagePeriod && { mortgagePeriod: sanitizedData.mortgagePeriod }),
          ...(sanitizedData.interestRate && { interestRate: sanitizedData.interestRate }),
          ...(sanitizedData.loanAmount != null && { loanAmount: sanitizedData.loanAmount }),
          ...(sanitizedData.monthlyPayment != null && { monthlyPayment: sanitizedData.monthlyPayment }),
          ...(sanitizedData.totalPurchaseCosts && { totalPurchaseCosts: sanitizedData.totalPurchaseCosts }),
          ...(sanitizedData.totalRequiredUpfront && { totalRequiredUpfront: sanitizedData.totalRequiredUpfront }),
          ...(sanitizedData.monthlyIncome && { monthlyIncome: sanitizedData.monthlyIncome }),
          ...(sanitizedData.monthlyCommitments && { monthlyCommitments: sanitizedData.monthlyCommitments }),
          ...(sanitizedData.buyerStatus && { buyerStatus: sanitizedData.buyerStatus }),
          ...(sanitizedData.propertyValue && { propertyValue: sanitizedData.propertyValue }),
          ...(sanitizedData.estimatedBorrowing != null && { estimatedBorrowing: sanitizedData.estimatedBorrowing }),
        },
      }),
    });

    console.log(
      `✅ Mortgage IP: ${ip} | ${String(data.email).split("@")[0]}@*** | sheet=${sheetSaved} email=${emailSent} thankYou=${thankYouSent} notion=${notionSaved}`
    );

    return buildLeadPersistenceResponse({
      sheetSaved,
      emailSent,
      notionSaved,
      successMessage:
        "Thank you! We've received your mortgage approval request and will get back to you shortly.",
      failureMessage:
        "We could not save your request right now. Please try again later or contact us directly.",
    });
  } catch (error) {
    console.error(`❌ Error from IP: ${ip} | Form: Mortgage Approval`, error);
    return NextResponse.json(
      {
        success: false,
        message: "We're experiencing technical difficulties. Please try again later or contact us directly.",
      },
      { status: 500 }
    );
  }
}
