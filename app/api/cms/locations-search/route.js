import { NextResponse } from "next/server";

const PROPERTIES_API =
  process.env.NEXT_PUBLIC_API_URL || "https://cms.hsproperty.ae";

/**
 * CMS-backed location autocomplete for the HomeHero search widget.
 *
 * GET /api/cms/locations-search?query=marina&purpose=for-sale
 *
 * Returns { hits: [{ name: "Dubai Marina" }, ...] }
 * — same shape as the Bayut locations-search endpoint it replaces.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ hits: [] });
  }

  try {
    const response = await fetch(`${PROPERTIES_API}/api/properties/locations`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600, tags: ["properties:locations"] },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Flatten all location name arrays in priority order
    const allNames = [
      ...(data.community_name || []),
      ...(data.sub_community_name || []),
      ...(data.cluster_name || []),
      ...(data.city_name || []),
      ...(data.emirate || []),
    ];

    const seen = new Set();
    const hits = [];

    for (const name of allNames) {
      if (!name) continue;
      const key = name.toLowerCase();
      if (!seen.has(key) && key.includes(query)) {
        seen.add(key);
        hits.push({ name });
        if (hits.length >= 15) break;
      }
    }

    return NextResponse.json({ hits });
  } catch (error) {
    console.error("CMS locations-search error:", error);
    return NextResponse.json({ hits: [] });
  }
}
