"use server";

/**
 * Production-safe properties data fetcher for Next.js App Router
 * Mirrors the pattern in lib/fetchAreaGuidesData.js
 *
 * Covers for-sale and for-rent properties from the internal CMS.
 * Off-plan properties continue to use the static data array + Bayut.
 */

const PROPERTIES_API =
  process.env.NEXT_PUBLIC_API_URL || "https://cms.hsproperty.ae";

const PROPERTIES_BY_PURPOSE_ENDPOINT = (purpose) =>
  `${PROPERTIES_API}/api/properties/${purpose}`;

const PROPERTY_BY_SLUG_ENDPOINT = (slug) =>
  `${PROPERTIES_API}/api/properties/slug/${slug}`;

/**
 * Cache duration in seconds.
 * Override with PROPERTIES_REVALIDATE_SECONDS env var.
 * Default: 3600 (1 hour)
 */
const REVALIDATE_SECONDS = Number(
  process.env.PROPERTIES_REVALIDATE_SECONDS || 3600
);

// Optional ultra-fast in-memory hot cache (per server instance)
let propertiesCache = {};
let propertiesCacheTimestamp = {};

/**
 * Clear the in-memory hot cache.
 * Called by the /api/revalidate webhook so stale data isn't served
 * between Next.js data-cache invalidation and the next fetch.
 * Pass a specific purpose to clear only that entry, or omit to clear all.
 */
export function clearPropertiesCache(purpose) {
  if (purpose) {
    delete propertiesCache[purpose];
    delete propertiesCacheTimestamp[purpose];
  } else {
    propertiesCache = {};
    propertiesCacheTimestamp = {};
  }
}

/**
 * Fetch all properties for a given purpose ("for-sale" | "for-rent")
 * Uses Next.js ISR cache + optional in-memory hot cache.
 */
export async function getPropertiesByPurpose(purpose) {
  try {
    const now = Date.now();

    // Level 1: in-memory cache (fastest, per-instance)
    if (
      propertiesCache[purpose] &&
      propertiesCacheTimestamp[purpose] &&
      now - propertiesCacheTimestamp[purpose] < REVALIDATE_SECONDS * 1000
    ) {
      console.log(`✅ Returning ${purpose} properties from in-memory cache`);
      return propertiesCache[purpose];
    }

    // Level 2: Next.js fetch cache (persistent & CDN-backed)
    const endpoint = PROPERTIES_BY_PURPOSE_ENDPOINT(purpose);
    console.log(`📡 Fetching properties from: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["properties", `properties:purpose:${purpose}`],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received ${purpose} data:`, JSON.stringify(data).slice(0, 200));

    const count = Array.isArray(data?.data)
      ? data.data.length
      : Array.isArray(data?.results)
      ? data.results.length
      : Array.isArray(data)
      ? data.length
      : 0;
    console.log(`📦 Total ${purpose} items: ${count}`);

    if (!count) {
      console.warn(`⚠️ No ${purpose} properties in response`);
    }

    // Update in-memory cache
    propertiesCache[purpose] = data;
    propertiesCacheTimestamp[purpose] = now;

    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${purpose} properties:`, error);
    // Graceful fallback to cached data
    return propertiesCache[purpose] || null;
  }
}

/**
 * Fetch a single property by slug.
 * Uses Next.js ISR cache.
 */
export async function getPropertyBySlug(slug) {
  try {
    const endpoint = PROPERTY_BY_SLUG_ENDPOINT(slug);
    console.log(`📡 Fetching property from: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["properties", `properties:detail:${slug}`],
      },
    });

    console.log(`📊 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Received property data for slug "${slug}"`);

    return data;
  } catch (error) {
    console.error(`❌ Error fetching property "${slug}":`, error);
    return null;
  }
}
