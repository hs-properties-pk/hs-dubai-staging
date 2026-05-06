import nodemailer from "nodemailer";

/**
 * iPage SMTP: login user and From address should match an allowed mailbox (AUP#SNDR if not).
 * Optional EMAIL_FROM overrides the visible From address when the host allows it.
 */
export function getIpagMailer() {
  const user = (process.env.EMAIL_USER || "").trim();
  const pass = (process.env.EMAIL_PASS || "").trim();
  const fromEmail = (process.env.EMAIL_FROM || user).trim();

  const transporter = nodemailer.createTransport({
    host: "smtp.ipage.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  return { transporter, fromEmail, user, pass };
}

export function formatFromHeader(displayName, email) {
  return `${displayName} <${email}>`;
}
