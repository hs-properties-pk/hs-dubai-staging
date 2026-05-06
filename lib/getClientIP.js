/**
 * Extract client IP address from Next.js request
 * Handles Vercel, Cloudflare, and other proxy headers
 */
export function getClientIP(request) {
  // Try various headers (in order of preference)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare
  
  // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2)
  // Take the first one (original client)
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP.trim();
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback
  return "unknown";
}

