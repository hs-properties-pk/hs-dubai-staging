/**
 * Defaults align with the contact page sidebar (`components/Contact.js` → `officeHours`)
 * and current Dubai office (Motor City). Override via env when needed.
 */

const DEFAULT_SITE = "https://hsproperty.ae";

/** Same logo as site (white) — Next/Image optimized URL for consistent sizing in email clients */
const DEFAULT_LOGO_URL =
  "https://hsproperty.ae/_next/image?url=%2Flogos-icons%2FH%26S-Dubai-Logo-White.png&w=128&q=90";

const DEFAULT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=H%26S+Real+Estate+7th+Floor+Control+Tower+Motor+City+Dubai";

const DEFAULT_ADDRESS =
  "H&S Real Estate, Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2 - Dubai - United Arab Emirates";

const DEFAULT_PHONE = "+971 4 345 4888";

const DEFAULT_INFO_EMAIL = "info@hsproperty.ae";

export function getLeadThankYouSiteBase() {
  const u =
    process.env.LEAD_THANK_YOU_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "";
  if (u && /^https?:\/\//i.test(u)) return u.replace(/\/$/, "");
  return DEFAULT_SITE;
}

function escapeHtml(text) {
  if (text == null) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

function telHref(phone) {
  return String(phone).replace(/[^\d+]/g, "").replace(/^00/, "+");
}

/**
 * First token from common lead payload shapes (firstName, fullName, name).
 */
export function leadThankYouFirstNameFromPayload(data) {
  if (!data || typeof data !== "object") return "";
  const raw =
    (data.firstName && String(data.firstName).trim()) ||
    (data.fullName && String(data.fullName).trim()) ||
    (data.name && String(data.name).trim()) ||
    "";
  const first = raw.split(/\s+/).filter(Boolean)[0] || "";
  return first.length > 40 ? first.slice(0, 40) : first;
}

function buildHoursHtml(rows) {
  let inner = "";
  for (const { day, time } of rows) {
    inner += `<tr>
      <td style="padding:8px 8px 8px 0;border-bottom:1px solid #eee;color:#333;vertical-align:top;">${escapeHtml(day)}</td>
      <td style="padding:8px 0 8px 8px;border-bottom:1px solid #eee;color:#555;text-align:right;vertical-align:top;">${escapeHtml(time)}</td>
    </tr>`;
  }
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:13px;margin:0 0 20px;">
    ${inner}
  </table>`;
}

function buildHoursPlain(rows) {
  return rows.map((r) => `${r.day}: ${r.time}`).join("\n");
}

export function buildLeadThankYouEmail({ recipientFirstName = "", variant = "lead" } = {}) {
  const base = getLeadThankYouSiteBase();
  const offPlanUrl = `${base}/properties/off-plan`;
  const communitiesUrl = `${base}/communities`;
  const mapUrl = process.env.LEAD_THANK_YOU_MAP_URL || DEFAULT_MAP_URL;
  const address = process.env.LEAD_THANK_YOU_ADDRESS || DEFAULT_ADDRESS;
  const phone = process.env.LEAD_THANK_YOU_PHONE || DEFAULT_PHONE;
  const infoEmail = process.env.LEAD_THANK_YOU_INFO_EMAIL || DEFAULT_INFO_EMAIL;
  const logoUrl = process.env.LEAD_THANK_YOU_LOGO_URL || DEFAULT_LOGO_URL;

  const hoursOverride = (process.env.LEAD_THANK_YOU_HOURS || "").trim();
  const officeRows = hoursOverride
    ? null
    : [
        { day: "Monday – Thursday", time: "9:00 AM – 7:00 PM" },
        { day: "Friday", time: "9:00 AM – 12:00 PM & 2:00 PM – 7:00 PM" },
        { day: "Saturday", time: "9:00 AM – 7:00 PM" },
        { day: "Sunday", time: "Closed" },
      ];

  const greeting = recipientFirstName
    ? `Dear ${escapeHtml(recipientFirstName)},`
    : "Hello,";

  const intro =
    variant === "newsletter"
      ? "Thank you for subscribing to our newsletter. You&rsquo;ll receive Dubai property insights, market updates, and hand-picked opportunities from our team."
      : "Thank you for reaching out to H&amp;S Real Estate. We have received your message and one of our advisors will contact you shortly.";

  const headline =
    variant === "newsletter" ? "You&rsquo;re on the list" : "We&rsquo;ve got your message";

  const hoursBlockHtml = officeRows
    ? `<p style="margin:0 0 8px;font-weight:600;">Office hours</p>${buildHoursHtml(officeRows)}`
    : `<p style="margin:0 0 8px;font-weight:600;">Office hours</p><p style="margin:0 0 20px;font-size:13px;color:#555;line-height:1.6;">${escapeHtml(hoursOverride).replace(/\n/g, "<br>")}</p>`;

  const hoursBlockPlain = officeRows
    ? buildHoursPlain(officeRows)
    : hoursOverride;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you — H&amp;S Real Estate</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
          <tr>
            <td style="background:#111111;color:#ffffff;padding:24px 24px 28px;text-align:center;">
              <img src="${escapeHtml(logoUrl)}" alt="H&amp;S Real Estate Dubai" width="128" style="display:block;margin:0 auto 16px;max-width:128px;height:auto;border:0;" />
              <h1 style="margin:0;font-size:22px;font-weight:600;line-height:1.3;">${headline}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 24px;color:#333333;font-size:15px;line-height:1.65;">
              <p style="margin:0 0 16px;">${greeting}</p>
              <p style="margin:0 0 20px;">${intro}</p>
              <p style="margin:0 0 8px;font-weight:600;">Visit us</p>
              <p style="margin:0 0 8px;">${escapeHtml(address).replace(/\n/g, "<br>")}</p>
              <p style="margin:0 0 4px;"><a href="tel:${escapeHtml(telHref(phone))}" style="color:#111;text-decoration:none;">${escapeHtml(phone)}</a></p>
              <p style="margin:0 0 20px;font-size:14px;"><a href="mailto:${escapeHtml(infoEmail)}" style="color:#111;">${escapeHtml(infoEmail)}</a></p>
              ${hoursBlockHtml}
              <p style="margin:0 0 24px;">
                <a href="${escapeHtml(mapUrl)}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px;font-weight:600;">View on Google Maps</a>
              </p>
              <p style="margin:0 0 10px;font-weight:600;">Explore while you wait</p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;">
                <tr>
                  <td style="padding:8px 8px 8px 0;vertical-align:top;width:50%;">
                    <a href="${escapeHtml(offPlanUrl)}" style="display:block;border:1px solid #ddd;border-radius:6px;padding:14px 16px;text-align:center;color:#111;text-decoration:none;font-weight:600;font-size:14px;">Off-plan projects →</a>
                  </td>
                  <td style="padding:8px 0 8px 8px;vertical-align:top;width:50%;">
                    <a href="${escapeHtml(communitiesUrl)}" style="display:block;border:1px solid #ddd;border-radius:6px;padding:14px 16px;text-align:center;color:#111;text-decoration:none;font-weight:600;font-size:14px;">Communities →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:13px;color:#666;">If you need anything urgently, reply to this email or call us on the number above.</p>
              <p style="margin:16px 0 0;font-size:13px;color:#666;">Best regards,<br><strong>H&amp;S Real Estate</strong></p>
            </td>
          </tr>
          <tr>
            <td style="background:#fafafa;padding:16px 24px;text-align:center;font-size:11px;color:#888;border-top:1px solid #eee;">
              © ${new Date().getFullYear()} H&amp;S Real Estate · Dubai, UAE
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const plainGreeting = recipientFirstName ? `Dear ${recipientFirstName},` : "Hello,";
  const plainIntro =
    variant === "newsletter"
      ? "Thank you for subscribing to our newsletter. You'll receive Dubai property insights and updates from our team."
      : "Thank you for reaching out to H&S Real Estate. We have received your message and one of our advisors will contact you shortly.";

  const text = `${plainGreeting}

${plainIntro}

VISIT US
${address.replace(/<br>/g, "\n")}
Phone: ${phone}
Email: ${infoEmail}

OFFICE HOURS
${hoursBlockPlain}

Map: ${mapUrl}

Explore:
Off-plan: ${offPlanUrl}
Communities: ${communitiesUrl}

Best regards,
H&S Real Estate
`;

  return { html, text };
}
