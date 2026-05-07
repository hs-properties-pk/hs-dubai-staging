"use server";

/**
 * Production-safe blog data fetcher for Next.js App Router
 * - No filesystem (Vercel safe)
 * - Uses Next.js ISR cache
 * - Includes optional in-memory hot cache
 */

const BLOG_DATA_API =
  "https://cms.hsproperty.ae/api/blogs/org/1/full";

/**
 * Cache duration (seconds)
 *
 * Testing: 120 (2 minutes)
 * Production recommended: 3600 (1 hour) or higher
 */
const REVALIDATE_SECONDS = 120;

// Optional ultra-fast in-memory cache (per server instance)
let inMemoryCache = null;
let cacheTimestamp = 0;

/**
 * Get blog data using Next.js caching + memory hot cache
 */
export async function getBlogData() {
  try {
    const now = Date.now();

    // 🔥 Level 1: in-memory cache (fastest, optional)
    if (
      inMemoryCache &&
      cacheTimestamp &&
      now - cacheTimestamp < REVALIDATE_SECONDS * 1000
    ) {
      return inMemoryCache;
    }

    // 🔥 Level 2: Next.js fetch cache (persistent & CDN-backed)
    const cacheBuster = `?_cache=${Date.now()}`;
    const response = await fetch(BLOG_DATA_API + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Update memory cache
    inMemoryCache = data;
    cacheTimestamp = now;

    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);

    // graceful fallback
    return inMemoryCache || null;
  }
}