import { offPlanListings } from "@/data/off-plan-data";

/** URL slugs that map to `/properties/off-plan/[propertyId]` category listing pages (not project slugs). */
export const OFF_PLAN_TYPE_LIST_SLUGS = ["villa", "apartment", "townhouse"];

export function isOffPlanTypeListSlug(propertyId) {
  return OFF_PLAN_TYPE_LIST_SLUGS.includes(propertyId);
}

function categoryMatchesTypeFilter(category, typeSlug) {
  if (!category || !typeSlug) return false;
  return category.toLowerCase().includes(typeSlug.toLowerCase());
}

// Count listings whose category string includes the type (same rule as the listing filter).
export function countOffPlanListingsByType(typeSlug) {
  return offPlanListings.filter((p) =>
    categoryMatchesTypeFilter(p.category, typeSlug)
  ).length;
}

const TYPE_META = {
  villa: {
    heroImage: "/off-plan/villa/villa.jpg",
    title: "Off-Plan Villas in Dubai | H&S Real Estate",
    description:
      "Browse off-plan villas in Dubai — golf, beachfront and gated communities. Flexible plans, top developers. H&S Real Estate — Dubai's No.1 awarded broker (DLD 2025).",
    heroTitle: "Off-Plan Villas in Dubai — 2026 Launch Projects",
    heroDescription:
      "Discover off-plan villa communities across Dubai — from family compounds to ultra-luxury beachfront. Compare handover dates, layouts, and payment plans with H&S Real Estate.",
    breadcrumbLabel: "Villas",
  },
  apartment: {
    heroImage: "/off-plan/apartments/apartments.webp",
    title: "Off-Plan Apartments in Dubai | H&S Real Estate",
    description:
      "Browse off-plan apartments in Dubai — waterfront towers, branded residences, and prime locations. Expert advice from H&S Real Estate — DLD 2025 No.1 broker.",
    heroTitle: "Off-Plan Apartments in Dubai — 2026 Launch Projects",
    heroDescription:
      "Explore off-plan apartments from studios to penthouses — Creek, Marina, Downtown, and emerging districts. Shortlist launches and payment plans with our team.",
    breadcrumbLabel: "Apartments",
  },
  townhouse: {
    heroImage: "/off-plan/tonwhouses/townhouse.webp",
    title: "Off-Plan Townhouses in Dubai | H&S Real Estate",
    description:
      "Browse off-plan townhouses in Dubai — family communities, green belts, and strong rental appeal. H&S Real Estate — Dubai's No.1 awarded broker (DLD 2025).",
    heroTitle: "Off-Plan Townhouses in Dubai — 2026 Launch Projects",
    heroDescription:
      "Find off-plan townhouses in master-planned communities across Dubai. Compare sizes, handover, and plans with a RERA-certified advisor.",
    breadcrumbLabel: "Townhouses",
  },
};

export function getOffPlanTypeListingMetadata(slug) {
  const meta = TYPE_META[slug];
  if (!meta) {
    return {
      title: "Off-Plan Properties in Dubai | H&S Real Estate",
      description:
        "Browse off-plan properties in Dubai with H&S Real Estate. Flexible plans, top developers, expert support.",
    };
  }
  return { title: meta.title, description: meta.description, ...meta };
}

