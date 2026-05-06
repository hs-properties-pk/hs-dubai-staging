import { offPlanListingFaqItems } from "@/data/off-plan-listing-faq";
import { offPlanListings } from "@/data/off-plan-data";

const BASE = "https://hsproperty.ae";
const PAGE_PATH = "/properties/off-plan";

/**
 * FAQPage (Question / acceptedAnswer / Answer) + ItemList in one @graph for /properties/off-plan.
 * FAQ copy is driven by `off-plan-listing-faq.js` so it matches visible FAQs.
 */
export function buildOffPlanPropertiesListingJsonLd() {
  const pageUrl = `${BASE}${PAGE_PATH}`;

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: offPlanListingFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const itemList = {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name: "Off plan properties in Dubai",
    numberOfItems: offPlanListings.length,
    itemListElement: offPlanListings.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title || p.fullTitle || p.slug,
      item: `${BASE}/properties/off-plan/${p.slug}`,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [faqPage, itemList],
  };
}
