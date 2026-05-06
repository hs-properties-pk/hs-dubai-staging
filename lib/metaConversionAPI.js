import crypto from "crypto";

// SHA256 hash of PII for Meta Conversions API (lowercase hex).
function hashPII(value) {
  if (!value) return null;
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

// Send a server-side event to Meta Conversions API; returns null if env or request fails.
export async function sendConversionEvent({
  eventName,
  userData = {},
  eventSource,
  eventTime,
}) {
  try {
    const pixelId = process.env.FB_PIXEL_ID;
    const accessToken = process.env.FB_CONVERSIONS_ACCESS_TOKEN;

    // Validate required environment variables
    if (!pixelId || !accessToken) {
      console.warn(
        "Meta Conversion API: Missing FB_PIXEL_ID or FB_CONVERSIONS_ACCESS_TOKEN"
      );
      return null;
    }

    // Prepare user data with hashed PII
    const userDataPayload = {};
    if (userData.email) {
      userDataPayload.em = hashPII(userData.email);
    }
    if (userData.phone) {
      // Remove all non-digit characters before hashing
      const phoneDigits = userData.phone.replace(/\D/g, "");
      if (phoneDigits) {
        userDataPayload.ph = hashPII(phoneDigits);
      }
    }
    if (userData.firstName) {
      userDataPayload.fn = hashPII(userData.firstName);
    }
    if (userData.lastName) {
      userDataPayload.ln = hashPII(userData.lastName);
    }

    // If no user data provided, skip the event
    if (Object.keys(userDataPayload).length === 0) {
      console.warn("Meta Conversion API: No user data provided");
      return null;
    }

    // Prepare event data
    const eventData = {
      event_name: eventName,
      event_time: eventTime || Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: userDataPayload,
    };

    // Add custom data if event source is provided
    if (eventSource) {
      eventData.custom_data = {
        content_name: eventSource,
      };
    }

    // Prepare the request payload
    const payload = {
      data: [eventData],
      access_token: accessToken,
    };

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Meta Conversion API error: ${response.status} - ${errorText}`
      );
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Meta Conversion API error:", error.message);
    return null;
  }
}

export async function sendLeadEvent({ userData, eventSource, eventTime }) {
  return sendConversionEvent({
    eventName: "Lead",
    userData,
    eventSource,
    eventTime,
  });
}

export async function sendPageViewEvent({ userData, eventSource, eventTime }) {
  return sendConversionEvent({
    eventName: "PageView",
    userData,
    eventSource,
    eventTime,
  });
}

