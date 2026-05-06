import { unstable_cache } from "next/cache";
import { offPlanListings } from "@/data/off-plan-data";
import fs from "fs";
import path from "path";

const BASE = "https://uae-real-estate2.p.rapidapi.com";

/** Listing search: default 30m — tune via env without redeploying logic */
const LISTINGS_REVALIDATE = parseInt(
  process.env.BAYUT_LISTINGS_CACHE_SECONDS || "1800",
  10
);
const LOCATIONS_REVALIDATE = parseInt(
  process.env.BAYUT_LOCATIONS_CACHE_SECONDS || "3600",
  10
);
const PROPERTY_BUNDLE_REVALIDATE = parseInt(
  process.env.BAYUT_PROPERTY_CACHE_SECONDS || "3600",
  10
);

export function getBayutApiHeaders() {
  const key =
    process.env.BAYUT_API_KEY || process.env.NEXT_PUBLIC_BAYUT_API_KEY;
  const host =
    process.env.BAYUT_API_HOST || process.env.NEXT_PUBLIC_BAYUT_API_HOST;
  return {
    "x-rapidapi-key": key,
    "x-rapidapi-host": host,
  };
}

function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const keys = Object.keys(value).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
}

/**
 * Cached POST /properties_search — shared by listing page, property photo fallback, and API route.
 */
export async function getBayutPropertiesSearchCached(body, page) {
  const p = Math.max(0, parseInt(String(page), 10) || 0);
  const key = stableStringify({ body, page: p });

  return unstable_cache(
    async () => {
      const headers = getBayutApiHeaders();
      const res = await fetch(`${BASE}/properties_search?page=${p}`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(
          `Bayut properties_search ${res.status}: ${t?.slice(0, 200)}`
        );
      }
      return res.json();
    },
    ["bayut", "properties_search", key],
    { revalidate: LISTINGS_REVALIDATE }
  )();
}

/**
 * Cached GET /locations_search — shared by HomeHero, SearchBar, listing location field.
 */
export async function getBayutLocationsSearchCached(query) {
  const q = String(query).trim().toLowerCase().slice(0, 160);
  if (!q) {
    return { hits: [], results: [] };
  }

  return unstable_cache(
    async () => {
      const headers = getBayutApiHeaders();
      const res = await fetch(
        `${BASE}/locations_search?query=${encodeURIComponent(q)}`,
        { headers }
      );
      if (!res.ok) {
        const t = await res.text();
        throw new Error(
          `Bayut locations_search ${res.status}: ${t?.slice(0, 200)}`
        );
      }
      return res.json();
    },
    ["bayut", "locations_search", q],
    { revalidate: LOCATIONS_REVALIDATE }
  )();
}

/**
 * Server-only: off-plan from static data; for-sale/for-rent from RapidAPI with bundle cache
 * (detail + optional photo search deduped per property id).
 */
export async function getBayutPropertyDataForPage(purpose, propertyId) {
  const cleanPropertyId = propertyId.split("/")[0].split("@")[0];

  if (purpose === "off-plan") {
    const propertyData = offPlanListings.find(
      (item) => item.slug === cleanPropertyId
    );
    return { data: propertyData, error: null };
  }

  const numericId = cleanPropertyId.replace(/\D/g, "");
  if (!numericId) {
    return { data: null, error: "Error Fetching Property Details" };
  }

  const apiHeaders = getBayutApiHeaders();
  if (!apiHeaders["x-rapidapi-key"] || !apiHeaders["x-rapidapi-host"]) {
    console.error(
      "Bayut API: missing BAYUT_API_KEY/BAYUT_API_HOST or NEXT_PUBLIC_BAYUT_API_KEY/NEXT_PUBLIC_BAYUT_API_HOST"
    );
    return { data: null, error: "Error Fetching Property Details" };
  }

  return unstable_cache(
    async () => {
      try {
        const detailRes = await fetch(`${BASE}/property/${numericId}`, {
          headers: apiHeaders,
        });

        if (!detailRes.ok) throw new Error("Failed to fetch property details");

        const detailText = await detailRes.text();
        if (!detailText || !detailText.trim()) throw new Error("Empty response");

        let data;
        try {
          data = JSON.parse(detailText);
        } catch {
          throw new Error("Invalid JSON");
        }

        if (Array.isArray(data?.results) && data.results.length > 0) {
          data = data.results[0];
        } else if (data?.hit && typeof data.hit === "object") {
          data = data.hit;
        }

        const hasRealPhotos =
          Array.isArray(data?.media?.photos) &&
          data.media.photos.some(
            (p) => typeof p === "string" && p.startsWith("http")
          );

        if (!hasRealPhotos && data?.purpose && data?.price) {
          try {
            const locationId =
              data.location?.sub_community?.id ||
              data.location?.community?.id ||
              data.location?.city?.id;

            const searchBody = {
              purpose: data.purpose,
              price_min: Math.floor(data.price),
              price_max: Math.ceil(data.price),
              hitsPerPage: 25,
            };
            if (locationId) searchBody.locations_ids = [locationId];

            const searchData = await getBayutPropertiesSearchCached(
              searchBody,
              0
            );
            const results = searchData?.results || [];
            const match = results.find(
              (r) => String(r.id) === String(data.id)
            );
            if (match?.media?.photos) {
              const realPhotos = match.media.photos.filter(
                (p) => typeof p === "string" && p.startsWith("http")
              );
              if (realPhotos.length > 0) {
                data.media = { ...data.media, photos: realPhotos };
              }
            }
          } catch (photoErr) {
            console.error("Photo search fallback failed:", photoErr);
          }
        }

        /*
        console.log("[Bayut] Single property response:", JSON.stringify(data, null, 2));

        try {
          const outPath = path.join(process.cwd(), "single-property-bayut.json");
          fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
          console.log("[Bayut] Saved single-property-bayut.json");
        } catch (writeErr) {
          console.error("[Bayut] Failed to write single-property-bayut.json:", writeErr);
        }
        */

        return { data, error: null };
      } catch (error) {
        console.error("Error fetching property:", error);
        return { data: null, error: "Error Fetching Property Details" };
      }
    },
    ["bayut", "property_bundle", purpose, numericId],
    { revalidate: PROPERTY_BUNDLE_REVALIDATE }
  )();
}
