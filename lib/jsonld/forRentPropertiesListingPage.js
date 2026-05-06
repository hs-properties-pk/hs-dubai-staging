import { forRentListingFaqItems } from "@/data/for-rent-listing-faq";

const BASE = "https://hsproperty.ae";
const PAGE_PATH = "/properties/for-rent";

/** Related site sections (inventory is API-driven; no static listing IDs). */
const RELATED_ITEMLIST = [
  { name: "Properties for sale in Dubai", url: `${BASE}/properties/for-sale` },
  { name: "Off plan properties in Dubai", url: `${BASE}/properties/off-plan` },
  { name: "Dubai communities", url: `${BASE}/communities` },
  { name: "Mortgages & financing", url: `${BASE}/mortgages` },
  { name: "Contact H&S Real Estate", url: `${BASE}/contact` },
];

/**
 * FAQPage + ItemList in one @graph for /properties/for-rent.
 */
export function buildForRentPropertiesListingJsonLd() {
  const pageUrl = `${BASE}${PAGE_PATH}`;

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: forRentListingFaqItems.map((item) => ({
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
    name: "Properties for rent in Dubai — related pages",
    numberOfItems: RELATED_ITEMLIST.length,
    itemListElement: RELATED_ITEMLIST.map((row, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: row.name,
      item: row.url,
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [faqPage, itemList],
  };
}
