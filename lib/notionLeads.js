const NOTION_VERSION = "2022-06-28";
const MAX_CHUNK = 2000;

const DEFAULT_WEBSITE_URL = "https://hsproperty.ae/";

/** Notion expects database_id without hyphens. */
function normalizeNotionId(id) {
  return String(id || "").replace(/-/g, "");
}

function truncate(str, n = MAX_CHUNK) {
  const s = String(str ?? "");
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

/** Append key/value pairs that do not map to core columns into Message. */
export function mergeExtraIntoMessage(message, extra) {
  let m = message || "";
  if (extra && typeof extra === "object") {
    const lines = Object.entries(extra)
      .filter(([, v]) => v != null && String(v).trim() !== "")
      .map(([k, v]) => `${k}: ${v}`);
    if (lines.length) {
      m = (m ? `${m}\n\n` : "") + "Additional fields:\n" + lines.join("\n");
    }
  } else if (typeof extra === "string" && extra.trim()) {
    m = (m ? `${m}\n\n` : "") + extra.trim();
  }
  return m;
}

function rt(content) {
  const t = truncate(content);
  return {
    rich_text: t ? [{ type: "text", text: { content: t } }] : [],
  };
}

function titleBlock(content) {
  return {
    title: [{ type: "text", text: { content: truncate(content || "Lead", MAX_CHUNK) } }],
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function notionEmail(value) {
  const s = String(value ?? "").trim();
  if (!s || s === "—") return { email: null };
  return EMAIL_RE.test(s) ? { email: s } : { email: null };
}

function notionPhone(value) {
  const s = String(value ?? "").trim();
  if (!s || s === "—") return { phone_number: null };
  return { phone_number: truncate(s, 50) };
}

/** ISO 8601 for Notion date property */
function notionDate(lead) {
  const raw = lead.date;
  const d = raw ? new Date(raw) : new Date();
  const start = Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  return { date: { start } };
}

/** Slug for URL path: "The Heights Landing Page" → "the-heights-landing-page" */
function slugifyPathSegment(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9/-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Build a clean path under the site (no %20); supports "/a/b" or a plain label */
function pathFromLabelOrPath(s) {
  const trimmed = String(s).trim();
  if (!trimmed) return "/form";
  if (trimmed.startsWith("/")) {
    const parts = trimmed.split("/").filter(Boolean).map(slugifyPathSegment).filter(Boolean);
    return parts.length ? `/${parts.join("/")}` : "/form";
  }
  const slug = slugifyPathSegment(trimmed);
  return slug ? `/${slug}` : "/form";
}

/** Page / Website columns are url type — non-HTTP values become links under NOTION_SITE_BASE_URL */
function notionUrl(value) {
  const s = String(value ?? "").trim();
  if (!s || s === "—") return { url: null };
  if (/^https?:\/\//i.test(s)) return { url: truncate(s, 2000) };
  const base = (process.env.NOTION_SITE_BASE_URL || "https://hsproperty.ae").replace(/\/$/, "");
  const path = pathFromLabelOrPath(s);
  return { url: `${base}${path}` };
}

/** Split "Jane Doe" → { first, last } */
export function splitFullName(fullName) {
  if (!fullName || typeof fullName !== "string") return { first: "", last: "" };
  const parts = fullName.trim().split(/\s+/);
  if (!parts.length) return { first: "", last: "" };
  return { first: parts[0] || "", last: parts.slice(1).join(" ") || "" };
}

export async function appendLeadToNotion(lead) {
  const token = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_LEADS_DATABASE_ID;
  if (!token || !databaseId) {
    console.warn("[Notion] NOTION_API_KEY or NOTION_LEADS_DATABASE_ID not set; skip fallback");
    return false;
  }

  let first = (lead.firstName || "").trim();
  let last = (lead.lastName || "").trim();
  if (!first && lead.fullName) {
    const sp = splitFullName(lead.fullName);
    first = sp.first;
    last = sp.last || last;
  }
  if (!first) first = "Lead";

  const emailRaw = (lead.email || "").trim();
  const phoneRaw = (lead.phone || lead.phoneNumber || "").trim();
  const enquiryType = (lead.enquiryType || "").trim() || "—";
  const websiteRaw = (lead.website || "").trim();
  const pageRaw = (lead.page || "").trim();

  const message = mergeExtraIntoMessage(lead.message || "", lead.extra);

  const titleProp = process.env.NOTION_TITLE_PROPERTY_NAME || "First Name";

  const websiteProp =
    websiteRaw && websiteRaw !== "—" ? notionUrl(websiteRaw) : { url: DEFAULT_WEBSITE_URL };

  const properties = {
    [titleProp]: titleBlock(first),
    "Last Name": rt(last),
    Email: notionEmail(emailRaw),
    Phone: notionPhone(phoneRaw),
    Message: rt(message),
    "Enquiry Type": rt(enquiryType),
    Date: notionDate(lead),
    Website: websiteProp,
    Page: notionUrl(pageRaw || "lead"),
  };

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        parent: { database_id: normalizeNotionId(databaseId) },
        properties,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Notion] create page failed:", res.status, errText);
      return false;
    }
    console.log("[Notion] Lead saved");
    return true;
  } catch (e) {
    console.error("[Notion] request error:", e.message || e);
    return false;
  }
}

