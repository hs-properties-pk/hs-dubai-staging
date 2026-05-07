"use server";

/**
 * Production-safe brands data fetcher for Next.js App Router
 * - No filesystem (Vercel safe)
 * - Uses Next.js ISR cache
 * - Includes optional in-memory hot cache
 */

const BRANDS_API = process.env.NEXT_PUBLIC_API_URL || "https://cms.hsproperty.ae";

const BRANDS_LIST_ENDPOINT = `${BRANDS_API}/api/brands`;
const BRAND_DETAIL_ENDPOINT = (slug) => `${BRANDS_API}/api/brands/${slug}`;

/**
 * Cache duration (seconds)
 *
 * Falls back to AREA_GUIDES_REVALIDATE_SECONDS if BRANDS_REVALIDATE_SECONDS is not set.
 * Default: 3600 (1 hour)
 */
const REVALIDATE_SECONDS = Number(
  process.env.BRANDS_REVALIDATE_SECONDS ||
    process.env.AREA_GUIDES_REVALIDATE_SECONDS ||
    3600
);

// Optional ultra-fast in-memory cache (per server instance)
let brandsListCache = null;
let brandsListCacheTimestamp = 0;
let brandDetailCache = {};
let brandDetailCacheTimestamp = {};

/**
 * Get all brands using Next.js caching + memory hot cache
 */
export async function getBrandsList() {
  try {
    const now = Date.now();

    // 🔥 Level 1: in-memory cache (fastest, optional)
    if (
      brandsListCache &&
      brandsListCacheTimestamp &&
      now - brandsListCacheTimestamp < REVALIDATE_SECONDS * 1000
    ) {
      console.log("✅ Returning brands list from in-memory cache");
      return brandsListCache;
    }

    // 🔥 Level 2: Next.js fetch cache (persistent & CDN-backed)
    console.log(`📡 Fetching from: ${BRANDS_LIST_ENDPOINT}`);
    const cacheBuster = `?_cache=${Date.now()}`;
    const response = await fetch(BRANDS_LIST_ENDPOINT + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["brands", "brands:list"],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received brands data`);
    console.log(`📦 Total brands: ${data.data ? data.data.length : 0}`);

    if (!data || !data.data || data.data.length === 0) {
      console.warn("⚠️ No brands data in response");
    }

    // Update memory cache
    brandsListCache = data;
    brandsListCacheTimestamp = now;

    return data;
  } catch (error) {
    console.error("❌ Error fetching brands list:", error);
    console.log("📦 Returning cached data or null...");
    return brandsListCache || null;
  }
}

/**
 * Get a single brand detail by slug using Next.js caching + memory hot cache
 */
export async function getBrandDetail(slug) {
  try {
    const now = Date.now();

    // 🔥 Level 1: in-memory cache (fastest, optional)
    if (
      brandDetailCache[slug] &&
      brandDetailCacheTimestamp[slug] &&
      now - brandDetailCacheTimestamp[slug] < REVALIDATE_SECONDS * 1000
    ) {
      console.log(`✅ Returning brand detail for ${slug} from in-memory cache`);
      return brandDetailCache[slug];
    }

    // 🔥 Level 2: Next.js fetch cache (persistent & CDN-backed)
    const endpoint = BRAND_DETAIL_ENDPOINT(slug);
    const cacheBuster = `?_cache=${Date.now()}`;
    console.log(`📡 Fetching from: ${endpoint}${cacheBuster}`);
    const response = await fetch(endpoint + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["brands", `brands:detail:${slug}`],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received brand detail for ${slug}:`, data);

    // Update memory cache
    brandDetailCache[slug] = data;
    brandDetailCacheTimestamp[slug] = now;

    return data;
  } catch (error) {
    console.error(`❌ Error fetching brand detail for ${slug}:`, error);
    return brandDetailCache[slug] || null;
  }
}
