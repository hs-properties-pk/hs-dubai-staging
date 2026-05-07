"use server";

/**
 * Production-safe blog links fetcher for Next.js (App Router)
 * Works on Vercel serverless.
 */

const BLOG_LINKS_API =
  "https://cms.hsproperty.ae/api/blogs/org/1/list";

/**
 * Cache duration (seconds)
 *
 * Testing: 120 (2 minutes)
 * Production recommended: 3600 (1 hour) or higher
 */
const REVALIDATE_SECONDS = 120; // 🔁 change to 3600 in production

/**
 * Get blog links using Next.js fetch caching.
 */
export async function getBlogLinks() {
  try {
    const cacheBuster = `?_cache=${Date.now()}`;
    const response = await fetch(BLOG_LINKS_API + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
      // optional but explicit: Next.js will use ISR cache with tags
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog links:", error);
    return null;
  }
}