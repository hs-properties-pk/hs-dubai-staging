import { offPlanListings } from "@/data/off-plan-data";
import { communityListings } from "@/data/community-data";

/**
 * Normalise variant spellings to one display/API key so `/brands` has one card per developer.
 * Add rows here if the same developer appears under multiple `brand` strings in the data.
 */
function canonicalBrandName(name) {
  if (!name || typeof name !== "string") return name;
  const t = name.trim();
  if (!t) return t;
  const key = t.toLowerCase();
  if (key === "damac properties") return "DAMAC Properties";
  return t;
}

/**
 * URL-safe slug for a developer brand name (matches routes under `/brands/[brandSlug]`).
 */
export function slugifyBrandName(name) {
  if (!name || typeof name !== "string") return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function previewFromOffPlan(p) {
  if (!p) return "";
  if (p.roomsOptional && typeof p.roomsOptional === "string")
    return p.roomsOptional.length > 200
      ? `${p.roomsOptional.slice(0, 197)}…`
      : p.roomsOptional;
  if (p.fullTitle && typeof p.fullTitle === "string")
    return p.fullTitle.length > 180
      ? `${p.fullTitle.slice(0, 177)}…`
      : p.fullTitle;
  if (p.title && typeof p.title === "string") return p.title;
  return "";
}

function buildBrandAggregateMap() {
  const map = new Map();
  for (const p of offPlanListings) {
    const name = canonicalBrandName(p.brand);
    if (!name) continue;
    if (!map.has(name)) {
      map.set(name, { offPlan: [], communities: [] });
    }
    map.get(name).offPlan.push(p);
  }
  for (const c of communityListings) {
    const name = canonicalBrandName(c.brand);
    if (!name) continue;
    if (!map.has(name)) {
      map.set(name, { offPlan: [], communities: [] });
    }
    map.get(name).communities.push(c);
  }
  return map;
}

// All developer brands from off-plan and community guides, deduped by exact brand name.
export function getBrandsIndex() {
  const aggregate = buildBrandAggregateMap();
  return [...aggregate.entries()]
    .map(([name, { offPlan, communities }]) => {
      const categories = [
        ...new Set(
          [
            ...offPlan.map((l) => l.category).filter(Boolean),
            ...communities.map((l) => l.category).filter(Boolean),
          ]
        ),
      ];
      const previewOff = offPlan[0];
      const previewComm = communities[0];
      const shortDescription =
        previewFromOffPlan(previewOff) ||
        (previewComm?.description &&
        typeof previewComm.description === "string"
          ? previewComm.description.length > 200
            ? `${previewComm.description.slice(0, 197)}…`
            : previewComm.description
          : "") ||
        `Discover ${name} in Dubai${
          communities.length
            ? ` — ${communities.length} community guide${
                communities.length === 1 ? "" : "s"
              } on our site.`
            : "."
        }`;

      const communitySearchText = communities
        .map((c) => `${c.title || ""} ${c.description || ""}`)
        .join(" ");

      return {
        name,
        slug: slugifyBrandName(name),
        offPlanCount: offPlan.length,
        communityCount: communities.length,
        // Legacy alias for offPlanCount (older callers).
        count: offPlan.length,
        shortDescription,
        propertyTypes: categories.slice(0, 8).join(" · "),
        communitySearchText,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getBrandBySlug(slug) {
  if (!slug) return null;
  return getBrandsIndex().find((b) => b.slug === slug) || null;
}

export function getListingsForBrandName(brandName) {
  if (!brandName) return [];
  const n = brandName.toLowerCase();
  return offPlanListings.filter(
    (p) => (p.brand || "").toLowerCase() === n
  );
}

/**
 * Community guides in `data/community-data.js` for this developer `brand` name.
 */
export function getCommunitiesForBrandName(brandName) {
  if (!brandName) return [];
  const n = brandName.toLowerCase();
  return communityListings.filter(
    (c) => (c.brand || "").toLowerCase() === n
  );
}

export function getAllBrandSlugs() {
  return getBrandsIndex().map((b) => b.slug);
}
