/**
 * Awards page JSON-LD (@graph): Organization + awards, FAQPage, BreadcrumbList,
 * WebPage, ItemList. Single script keeps payload efficient for crawlers.
 */

const BASE = "https://hsproperty.ae";

/** Structured list for ItemList — matches on-page award history scope (56 entries). */
const AWARD_ITEM_ROWS = [
  { name: "No.1 Sales Company in UAE", description: "Dubai Land Department, 2025" },
  { name: "Best Sales Service in Dubai", description: "Dubai Land Department, 2025" },
  { name: "No.1 Company in UAE", description: "Nakheel, 2025" },
  { name: "Top Sales Company in UAE", description: "Nakheel, 2025" },
  { name: "Black Onyx Platinum Award", description: "Meraas/Nakheel, 2025" },
  { name: "Black Onyx Awards", description: "Meraas, 2025" },
  { name: "Annual Broker Awards", description: "Emaar Properties, 2025" },
  { name: "H1 Broker Awards No.10", description: "Emaar Properties, H1 2025" },
  { name: "Top 5 Performing Broker Award", description: "Emaar Properties, Q2 2025" },
  { name: "Top 13 Performing Broker", description: "Emaar Properties, Q3 2025" },
  { name: "Top 15 Performing Broker", description: "Emaar Properties, Q1 2025" },
  { name: "Star Performing Broker Award", description: "Binghatti, 2025" },
  { name: "Horizon Awards Rising Star Channel Partner", description: "ARDEE, 2025" },
  { name: "Annual Broker Awards", description: "Emaar Properties, 2024" },
  { name: "Quarter 1 Broker Awards No.12", description: "Emaar Properties, Q1 2024" },
  { name: "Quarter 2 Broker Awards No.15", description: "Emaar Properties, Q2 2024" },
  { name: "Quarter 3 Broker Awards No.12", description: "Emaar Properties, Q3 2024" },
  { name: "Top 19 Performing Broker", description: "Emaar Properties, Q4 2024" },
  { name: "The Black Onyx Awards", description: "Meraas/Nakheel, 2024" },
  { name: "Black Onyx Platinum Certificate", description: "Meraas/Nakheel, 2024" },
  { name: "Envoy Award Q4", description: "Aldar Properties, Q4 2024" },
  { name: "Annual Broker Awards", description: "Emaar Properties, 2023" },
  { name: "Annual Broker Awards", description: "Emaar Properties, 2023 (second award)" },
  { name: "Quarter 3 Broker Awards No.4", description: "Emaar Properties, Q3 2023" },
  { name: "Quarter 1 Broker Awards No.20", description: "Emaar Properties, Q1 2023" },
  { name: "Top 7 Performing Broker", description: "Emaar Properties, Q2 2023" },
  { name: "Top 12 Performing Broker", description: "Emaar Properties, 2023" },
  { name: "The Black Onyx Awards", description: "Meraas, 2023" },
  { name: "1st Performing Broker Award", description: "Tilal Al Ghaf, 2023" },
  { name: "Top Performing Agency", description: "DarGlobal, 2023" },
  { name: "Annual Broker Awards", description: "Emaar Properties, 2022" },
  { name: "Outstanding Performance Award", description: "Emaar Properties, 2022" },
  { name: "Top Performing Broker Award", description: "Emaar Properties, 2022" },
  { name: "Quarter 2 Broker Awards No.10", description: "Emaar Properties, Q2 2022" },
  { name: "Quarter 3 Broker Awards No.15", description: "Emaar Properties, Q3 2022" },
  { name: "Top 11 Performing Broker Award", description: "Emaar Properties, Q1 2022" },
  { name: "DLD & RERA Gold Award", description: "Dubai Land Department, 2022" },
  { name: "DAMAC Broker Awards 16th Place", description: "DAMAC Properties, 2022" },
  { name: "No.1 Sales Performance", description: "OCTA, 2022" },
  { name: "Top Performing Broker", description: "Emaar Properties, 2021" },
  { name: "No.1 Top Performing Broker", description: "Emaar Properties, Q3 2021" },
  { name: "Quarter 1 Broker Awards", description: "Emaar Properties, Q1 2021" },
  { name: "Quarter 2 Broker Awards No.4", description: "Emaar Properties, Q2 2021" },
  { name: "DLD & RERA Gold Award", description: "Dubai Land Department, 2021" },
  { name: "Q1 Broker Awards 10th Place", description: "DAMAC Unity, Q1 2021" },
  { name: "Broker Awards Q3 11th Place", description: "DAMAC Properties, Q3 2021" },
  { name: "Annual Broker Awards", description: "Emaar Properties, 2020" },
  { name: "Top Performing Broker Award", description: "Emaar Properties, 2020" },
  { name: "No.3 Highest Selling Brokerage", description: "DAMAC Unity, 2020" },
  { name: "Top Performing Agency", description: "Meraas, 2019" },
  { name: "Top Performing Broker", description: "Meraas, Q2 2019" },
  { name: "Agency of the Month", description: "Bayut, 2019" },
  { name: "Port de La Mer Launch Appreciation", description: "Meraas, 2018" },
  { name: "Outstanding Sales Achievement", description: "Dubai Properties, 2017" },
  { name: "Top Achievement Award", description: "Dubai Properties, 2016" },
  { name: "Achievement Award", description: "Dubai Properties, 2016" },
];

const ORGANIZATION_AWARDS = [
  "Dubai Land Department — No.1 Sales Company in UAE 2025",
  "Dubai Land Department — Best Sales Service in Dubai 2025",
  "Dubai Land Department — DLD & RERA Gold Award 2022",
  "Dubai Land Department — DLD & RERA Gold Award 2021",
  "Emaar Properties — Annual Broker Award 2025",
  "Emaar Properties — H1 Broker Award No.10 2025",
  "Emaar Properties — Top 5 Performing Broker Q2 2025",
  "Emaar Properties — Top 13 Performing Broker Q3 2025",
  "Emaar Properties — Top 15 Performing Broker Q1 2025",
  "Emaar Properties — Annual Broker Award 2024",
  "Emaar Properties — Quarter 1 Broker Award No.12 2024",
  "Emaar Properties — Quarter 2 Broker Award No.15 2024",
  "Emaar Properties — Quarter 3 Broker Award No.12 2024",
  "Emaar Properties — Annual Broker Award 2023",
  "Emaar Properties — Quarter 3 Broker Award No.4 2023",
  "Emaar Properties — Top 7 Performing Broker Q2 2023",
  "Emaar Properties — Annual Broker Award 2022",
  "Emaar Properties — Outstanding Performance Award 2022",
  "Emaar Properties — No.1 Top Performing Broker Q3 2021",
  "Emaar Properties — Annual Broker Award 2020",
  "Nakheel — No.1 Company in UAE 2025",
  "Nakheel — Top Sales Company in UAE 2025",
  "Meraas — Black Onyx Platinum Award 2025",
  "Meraas — Black Onyx Awards 2024",
  "Meraas — Black Onyx Awards 2023",
  "Meraas — Top Performing Agency 2019",
  "Tilal Al Ghaf — 1st Performing Broker Award 2023",
  "Aldar — Envoy Award Q4 2024",
  "DAMAC — Highest Selling Brokerage 2020",
  "OCTA — No.1 Sales Performance 2022",
  "Binghatti — Star Performing Broker Award 2025",
  "Dubai Properties — Outstanding Sales Achievement 2017",
];

const FAQ_MAIN_ENTITY = [
  {
    "@type": "Question",
    name: "How many awards does H&S Real Estate have?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "H&S Real Estate has received 150+ verified industry awards between 2016 and 2025, making it the most awarded real estate brokerage in UAE history. These include awards from Emaar Properties, Dubai Land Department, Nakheel, Meraas, DAMAC, Tilal Al Ghaf, Aldar, Binghatti, OCTA, DarGlobal and Dubai Properties.",
    },
  },
  {
    "@type": "Question",
    name: "Who is the most awarded real estate company in Dubai?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "H&S Real Estate is the most awarded real estate company in Dubai with 150+ verified industry awards from 2016 to 2025. The company has been recognized by Emaar Properties, Dubai Land Department, Nakheel, Meraas, DAMAC, Tilal Al Ghaf, Aldar and Binghatti across 10 consecutive years.",
    },
  },
  {
    "@type": "Question",
    name: "Has H&S Real Estate won the Emaar Annual Broker Award?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. H&S Real Estate has won the Emaar Annual Broker Award multiple times including 2020, 2022, 2023, 2024 and 2025. In addition, H&S has earned 20+ quarterly Emaar broker awards, consistently placing within Emaar's Top 20 brokerages every year since 2017.",
    },
  },
  {
    "@type": "Question",
    name: "Is H&S Real Estate the No.1 broker in UAE?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes. H&S Real Estate was officially awarded No.1 Sales Company in UAE by the Dubai Land Department in 2025 and No.1 Company in UAE by Nakheel in 2025. With 150+ awards from 15+ major developers and authorities, H&S holds the strongest verified performance record of any brokerage operating in Dubai.",
    },
  },
  {
    "@type": "Question",
    name: "What gulf real estate awards has H&S Real Estate won?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "H&S Real Estate has won major gulf real estate awards from 15+ recognized bodies including the Dubai Land Department, Emaar Properties, Nakheel, Meraas, DAMAC, Tilal Al Ghaf, Aldar, Binghatti, OCTA, DarGlobal and Bayut — spanning annual, quarterly and special performance categories across 10 consecutive years from 2016 to 2025.",
    },
  },
  {
    "@type": "Question",
    name: "What is the Meraas Black Onyx Award?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "The Meraas Black Onyx Award is the highest performance recognition given by Meraas, one of Dubai's most prestigious luxury real estate developers. H&S Real Estate has won this award for three consecutive years — 2023, 2024 and 2025 — with the Black Onyx Platinum tier achieved in 2025, reserved exclusively for the top-performing brokerages across all Meraas communities.",
    },
  },
  {
    "@type": "Question",
    name: "Which real estate agency has won the most broker awards in Dubai?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "H&S Real Estate has won the most broker awards in Dubai with 150+ verified recognitions from 2016 to 2025. The company has maintained award-winning status for 10 consecutive years, a record unmatched by any other independent brokerage in the UAE real estate market.",
    },
  },
  {
    "@type": "Question",
    name: "What is the Dubai Land Department No.1 Sales Company Award?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "The Dubai Land Department No.1 Sales Company Award is a government-verified recognition given by the UAE's official real estate regulatory authority. H&S Real Estate was named No.1 Sales Company in UAE and Best Sales Service in Dubai by the Dubai Land Department in 2025 — the most credible trust signal available in the UAE real estate sector.",
    },
  },
];

const itemListElements = AWARD_ITEM_ROWS.map((row, i) => ({
  "@type": "ListItem",
  position: i + 1,
  name: row.name,
  description: row.description,
}));

export const awardsPageJsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: `${BASE}/`,
      name: "H&S Real Estate",
      publisher: { "@id": `${BASE}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE}/awards#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About H&S Real Estate",
          item: `${BASE}/our-story`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Awards",
          item: `${BASE}/awards`,
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "H&S Real Estate",
      alternateName: [
        "H and S Real Estate Dubai",
        "HS Real Estate",
        "H&S Property Dubai",
        "H&S Real Estate Brokerage",
      ],
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/logos-icons/H&S-Dubai-Logo-Black.png`,
      },
      description:
        "H&S Real Estate is Dubai's most awarded real estate brokerage with 150+ verified industry awards from 2016 to 2025. Recognized by Emaar, Dubai Land Department, Nakheel, Meraas, DAMAC, Tilal Al Ghaf, Aldar and Binghatti as the No.1 Sales Company in UAE.",
      foundingDate: "2006",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 300,
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Haqsons Group",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: ["United Arab Emirates", "Pakistan", "Japan", "Angola"],
      telephone: "+971526902884",
      email: "info@hsproperty.ae",
      sameAs: [
        "https://www.instagram.com/hs_property/",
        "https://www.facebook.com/hspropertyrealestate/",
      ],
      award: ORGANIZATION_AWARDS,
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE}/awards#faq`,
      url: `${BASE}/awards`,
      mainEntity: FAQ_MAIN_ENTITY,
    },
    {
      "@type": "ItemList",
      "@id": `${BASE}/awards#itemlist`,
      name: "H&S Real Estate — Complete Award History 2016 to 2025",
      description:
        "Complete list of 150+ verified industry awards received by H&S Real Estate from major UAE real estate developers and government authorities.",
      numberOfItems: AWARD_ITEM_ROWS.length,
      itemListElement: itemListElements,
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/awards`,
      url: `${BASE}/awards`,
      name: "150+ Industry Awards | H&S Real Estate — Emaar, DLD, Nakheel",
      description:
        "150+ verified awards from 2016–2025. No.1 Sales Company UAE (DLD 2025). Emaar Annual Broker Award winner. Most awarded real estate brokerage in Dubai history.",
      inLanguage: "en",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
      dateModified: "2026-04-06",
      breadcrumb: { "@id": `${BASE}/awards#breadcrumbs` },
      mainEntity: [{ "@id": `${BASE}/awards#faq` }, { "@id": `${BASE}/awards#itemlist` }],
    },
  ],
};
