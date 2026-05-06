import React from "react";
import PropertiesListingPage from "@/components/pages/PropertiesListingPage";
import { notFound } from "next/navigation";
import { buildOffPlanPropertiesListingJsonLd } from "@/lib/jsonld/offPlanPropertiesListingPage";
import { buildForSalePropertiesListingJsonLd } from "@/lib/jsonld/forSalePropertiesListingPage";
import { buildForRentPropertiesListingJsonLd } from "@/lib/jsonld/forRentPropertiesListingPage";
import { getPropertiesByPurpose } from "@/lib/fetchPropertiesData";

export const dynamic = "force-dynamic";

const ALLOWED_PURPOSES = ["for-sale", "for-rent", "off-plan"];

function getListingPurposeConfig(purpose) {
  if (purpose === "off-plan") {
    return {
      title:
        "Best Off-Plan Properties in Dubai 2026 | H&S Real Estate",
      description:
        "Explore 500+ off-plan properties in Dubai with H&S Real Estate — Dubai's No.1 awarded broker (DLD 2025). Emaar, Nakheel, DAMAC & more. Flexible payment plans. Free expert consultation.",
      canonical: "https://hsproperty.ae/properties/off-plan",
      buildJsonLd: buildOffPlanPropertiesListingJsonLd,
    };
  }
  if (purpose === "for-sale") {
    return {
      title: "Properties for Sale in Dubai | H&S Real Estate",
      description:
        "Explore exclusive properties for sale in Dubai with H&S Real Estate. From luxury to affordable options, find your ideal property in Dubai and invest with confidence.",
      canonical: "https://hsproperty.ae/properties/for-sale",
      buildJsonLd: buildForSalePropertiesListingJsonLd,
    };
  }
  if (purpose === "for-rent") {
    return {
      title: "Properties for Rent in Dubai | H&S Real Estate",
      description:
        "Find properties for rent in Dubai, from affordable to luxury options. Browse 1-5 bedroom rentals, business spaces, and more with H&S Real Estate.",
      canonical: "https://hsproperty.ae/properties/for-rent",
      buildJsonLd: buildForRentPropertiesListingJsonLd,
    };
  }
  return null;
}

export async function generateMetadata({ params }) {
  const purpose = params.purpose;

  if (!ALLOWED_PURPOSES.includes(purpose)) {
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }

  const cfg = getListingPurposeConfig(purpose);
  if (!cfg) {
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }

  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: cfg.canonical },
  };
}

async function Page({ params }) {
  const { purpose } = params;

  if (!ALLOWED_PURPOSES.includes(purpose)) {
    notFound();
  }

  const cfg = getListingPurposeConfig(purpose);
  if (!cfg) {
    notFound();
  }

  const listingJsonLd = cfg.buildJsonLd();

  // Fetch CMS data server-side for for-sale and for-rent.
  // Off-plan keeps its existing static-data + Bayut path (no cmsData prop).
  let cmsData = null;
  if (purpose === "for-sale" || purpose === "for-rent") {
    cmsData = await getPropertiesByPurpose(purpose);
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingJsonLd),
        }}
      />
      <PropertiesListingPage purpose={purpose} cmsData={cmsData} />
    </div>
  );
}

export default Page;
