import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { formatFromHeader, getIpagMailer } from "@/lib/smtpIpag";
import { buildLeadThankYouEmail } from "@/lib/leadThankYouEmail";

// Best-effort SMTP send; does not throw. Optional German mailbox via smtpUser/smtpPass/smtpFromEmail.
export async function trySendIpagMail({
  smtpUser,
  smtpPass,
  smtpFromEmail,
  replyTo,
  to,
  subject,
  text,
  html,
  fromName = "H&S Real Estate",
}) {
  let transporter;
  let fromEmail;
  let user;
  let pass;

  if (smtpUser && smtpPass) {
    user = String(smtpUser).trim();
    pass = String(smtpPass).trim();
    fromEmail = String(smtpFromEmail || smtpUser).trim();
    transporter = nodemailer.createTransport({
      host: "smtp.ipage.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  } else {
    const m = getIpagMailer();
    transporter = m.transporter;
    fromEmail = m.fromEmail;
    user = m.user;
    pass = m.pass;
  }

  if (!user || !pass || !fromEmail) {
    console.warn("[SMTP] credentials not set; skipping notification email");
    return false;
  }
  try {
    const payload = {
      from: formatFromHeader(fromName, fromEmail),
      to,
      subject,
      text,
      html,
    };
    if (replyTo) payload.replyTo = replyTo;
    const info = await transporter.sendMail(payload);
    console.log("[SMTP] Sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("[SMTP] send failed:", err.message || err);
    return false;
  }
}

// Branded thank-you to the lead (best-effort); optional German SMTP matches internal notification.
export async function trySendLeadThankYouEmail({
  to,
  recipientFirstName = "",
  variant = "lead",
  smtpUser,
  smtpPass,
  smtpFromEmail,
}) {
  if (!to || typeof to !== "string") return false;
  const email = to.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

  const { html, text } = buildLeadThankYouEmail({ recipientFirstName, variant });
  const subject =
    variant === "newsletter"
      ? "Thank you for subscribing — H&S Real Estate"
      : "Thank you for contacting H&S Real Estate";

  const replyTo =
    (process.env.LEAD_THANK_YOU_REPLY_TO || "").trim() || "info@hsproperty.ae";

  return trySendIpagMail({
    smtpUser,
    smtpPass,
    smtpFromEmail,
    to: email,
    replyTo,
    subject,
    text,
    html,
    fromName: "H&S Real Estate",
  });
}

// Sheet, team email, thank-you, and Notion in parallel; use Promise.resolve(null) when no sheet row.
export async function runParallelLeadDispatch({ sheet, leadNotification, thankYou, notion }) {
  const [sheetR, leadMailR, thankYouR, notionR] = await Promise.allSettled([
    sheet,
    leadNotification,
    thankYou,
    notion,
  ]);
  const labels = ["Google Sheet", "Internal email", "Thank-you email", "Notion"];
  [sheetR, leadMailR, thankYouR, notionR].forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[Leads] ${labels[i]} (unexpected):`, r.reason);
    }
  });
  const sheetResult = sheetR.status === "fulfilled" ? sheetR.value : null;
  const sheetSaved = sheetResult != null;
  const emailSent = leadMailR.status === "fulfilled" && leadMailR.value;
  const thankYouSent = thankYouR.status === "fulfilled" && thankYouR.value;
  const notionSaved = notionR.status === "fulfilled" && Boolean(notionR.value);
  return { sheetSaved, emailSent, thankYouSent, notionSaved };
}

export function buildLeadPersistenceResponse({
  sheetSaved,
  emailSent,
  notionSaved,
  successMessage,
  failureMessage,
}) {
  if (sheetSaved || emailSent || notionSaved) {
    if (!sheetSaved) {
      console.warn("[Leads] SheetDB did not save; check SHEETDB_API_URL");
    }
    if (!emailSent) {
      console.warn("[Leads] SMTP did not send; check email credentials");
    }
    if (!notionSaved) {
      console.warn("[Leads] Notion did not save; check NOTION_API_KEY / database schema");
    }
    return NextResponse.json({ success: true, message: successMessage }, { status: 201 });
  }
  return NextResponse.json({ success: false, message: failureMessage }, { status: 503 });
}
