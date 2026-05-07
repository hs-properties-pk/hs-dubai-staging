"use server";

/**
 * Production-safe area guides data fetcher for Next.js App Router
 * - No filesystem (Vercel safe)
 * - Uses Next.js ISR cache
 * - Includes optional in-memory hot cache
 */

const AREA_GUIDES_API = process.env.NEXT_PUBLIC_API_URL || "https://cms.hsproperty.ae";

const EMIRATES_LIST_ENDPOINT = `${AREA_GUIDES_API}/api/area-guides/emirates`;
const AREAS_BY_EMIRATE_ENDPOINT = (emirateSlug) =>
  `${AREA_GUIDES_API}/api/area-guides/emirates/${emirateSlug}/areas`;
const AREA_GUIDE_DETAIL_ENDPOINT = (areaSlug) =>
  `${AREA_GUIDES_API}/api/area-guides/${areaSlug}`;

/**
 * Cache duration (seconds)
 *
 * Set AREA_GUIDES_REVALIDATE_SECONDS in env for production tuning.
 * Default: 3600 (1 hour)
 */
const REVALIDATE_SECONDS = Number(
  process.env.AREA_GUIDES_REVALIDATE_SECONDS || 3600
);

// Optional ultra-fast in-memory cache (per server instance)
let emiratesCache = null;
let emiratesCacheTimestamp = 0;
let areasByEmirateCache = {};
let areasByEmirateCacheTimestamp = {};

/**
 * Get all emirates list using Next.js caching + memory hot cache
 */
export async function getEmiratesList() {
  try {
    const now = Date.now();

    // 🔥 Level 1: in-memory cache (fastest, optional)
    if (
      emiratesCache &&
      emiratesCacheTimestamp &&
      now - emiratesCacheTimestamp < REVALIDATE_SECONDS * 1000
    ) {
      console.log("✅ Returning emirates from in-memory cache");
      return emiratesCache;
    }

    // 🔥 Level 2: Next.js fetch cache (persistent & CDN-backed)
    console.log(`📡 Fetching from: ${EMIRATES_LIST_ENDPOINT}`);
    const cacheBuster = `?_cache=${Date.now()}`;
    const response = await fetch(EMIRATES_LIST_ENDPOINT + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["area-guides", "area-guides:emirates"],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received data:`, data);
    console.log(`📦 Total items: ${data.data ? data.data.length : 0}`);

    if (!data || !data.data || data.data.length === 0) {
      console.warn("⚠️ No emirates data in response");
    }

    // Update memory cache
    emiratesCache = data;
    emiratesCacheTimestamp = now;

    return data;
  } catch (error) {
    console.error("❌ Error fetching emirates list:", error);
    console.log("📦 Returning cached data or null...");
    // graceful fallback
    return emiratesCache || null;
  }
}

/**
 * Get area guides by emirate using Next.js caching + memory hot cache
 */
export async function getAreasByEmirate(emirateSlug) {
  try {
    const now = Date.now();

    // 🔥 Level 1: in-memory cache (fastest, optional)
    if (
      areasByEmirateCache[emirateSlug] &&
      areasByEmirateCacheTimestamp[emirateSlug] &&
      now - areasByEmirateCacheTimestamp[emirateSlug] < REVALIDATE_SECONDS * 1000
    ) {
      console.log(`✅ Returning areas for ${emirateSlug} from in-memory cache`);
      return areasByEmirateCache[emirateSlug];
    }

    // 🔥 Level 2: Next.js fetch cache (persistent & CDN-backed)
    const endpoint = AREAS_BY_EMIRATE_ENDPOINT(emirateSlug);
    const cacheBuster = `?_cache=${Date.now()}`;
    console.log(`📡 Fetching from: ${endpoint}${cacheBuster}`);
    const response = await fetch(endpoint + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // Bypass CMS API cache
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["area-guides", `area-guides:emirate:${emirateSlug}`],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received data for ${emirateSlug}:`, data);
    console.log(`📦 Total areas: ${data.data ? data.data.length : 0}`);

    // Update memory cache
    areasByEmirateCache[emirateSlug] = data;
    areasByEmirateCacheTimestamp[emirateSlug] = now;

    return data;
  } catch (error) {
    console.error(`❌ Error fetching areas for emirate ${emirateSlug}:`, error);
    // graceful fallback
    return areasByEmirateCache[emirateSlug] || null;
  }
}

/**
 * Get area guide detail using Next.js caching
 */
export async function getAreaGuideDetail(areaSlug) {
  try {
    const endpoint = AREA_GUIDE_DETAIL_ENDPOINT(areaSlug);
    const cacheBuster = `?_cache=${Date.now()}`;
    console.log(`📡 Fetching from: ${endpoint}${cacheBuster}`);
    const response = await fetch(endpoint + cacheBuster, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // Bypass CMS API cache
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["area-guides", `area-guides:detail:${areaSlug}`],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received data for ${areaSlug}:`, data);

    return data;
  } catch (error) {
    console.error(`❌ Error fetching area guide detail for ${areaSlug}:`, error);
    return null;
  }
}
