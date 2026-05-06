import GrandPoloClubResort from "./GrandPoloClub";

export const metadata = {
  title: "Grand Polo Club & Resort by Emaar - Community",
  description:
    "Welcome to the Grand Polo by Emaar, a Dubai community where luxury and polo passion converge. Dive into a world of elegance, exclusive facilities, and top-tier events.",
  keywords: [
    "Grand Polo Club & Resort by Emaar",
    "Grand Polo Club and Resort Dubai",
    "Grand Polo by Emaar",
    "Emaar Grand Polo Club & Resort",
    "Emaar Grand Polo community",
    "off plan project in uae",
    "real estate",
    "real estate company in dubai",
  ],
  openGraph: {
    title: "Grand Polo Club & Resort by Emaar - Community",
    description:
      "Welcome to the Grand Polo by Emaar, a Dubai community where luxury and polo passion converge. Dive into a world of elegance, exclusive facilities, and top-tier events.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/communities/grand-polo-club",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Polo Club & Resort by Emaar - Community",
    description:
      "Welcome to the Grand Polo by Emaar, a Dubai community where luxury and polo passion converge.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
  },
  alternates: {
    canonical: "https://hsproperty.ae/communities/grand-polo-club",
  },
};

// Product Schema for Grand Polo Club & Resort
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Grand Polo Club & Resort by Emaar Properties",
  description:
    "Grand Polo Club & Resort by Emaar is a large equestrian-themed residential community in Dubai, featuring luxury villas, townhouses, polo fields, a clubhouse and resort-style amenities within a gated master plan.",
  brand: {
    "@type": "Brand",
    name: "Emaar Properties",
  },
  category: "Real Estate",
  url: "https://hsproperty.ae/communities/grand-polo-club",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AED",
    availability: "https://schema.org/PreOrder",
    seller: {
      "@type": "RealEstateAgent",
      name: "H&S Property",
      telephone: "+971-04-345-4888",
      areaServed: "Dubai",
      url: "https://hsproperty.ae",
    },
  },
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Grand Polo Club & Resort by Emaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Grand Polo Club & Resort by Emaar is a large equestrian-themed residential community in Dubai, featuring villas, townhouses, polo fields, a clubhouse and resort-style amenities within a gated master plan.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Grand Polo Club and Resort Dubai located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The community is located in the Dubai Investments Park area, near the junction of Expo Road (E77) and Emirates Road (E611), with good connectivity to Expo City Dubai, Al Maktoum International Airport and other key destinations.",
      },
    },
    {
      "@type": "Question",
      name: "What types of homes are available in Grand Polo by Emaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The project offers mainly 3–5 bedroom villas and townhouses, with different clusters providing varied layouts, plot sizes and orientations. Some higher-spec villas are positioned closer to the polo fields or key landscaped areas.",
      },
    },
    {
      "@type": "Question",
      name: "Is Grand Polo Club & Resort an off-plan project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Grand Polo Club & Resort is currently being developed in phases as an off-plan master community, making it part of the wider off plan project in UAE market. Specific launch phases may have different timelines and conditions, so buyers usually review current project details before committing.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the developer behind Emaar Grand Polo community?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The community is developed by Emaar Properties, a leading real estate company in Dubai known for projects such as Downtown Dubai, Dubai Marina, Arabian Ranches and Dubai Hills Estate.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of lifestyle does Grand Polo Club & Resort offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Residents can expect a low-density, green and resort-style lifestyle focused on outdoor activities, privacy and equestrian-inspired amenities, rather than a dense high-rise or city-centre environment.",
      },
    },
  ],
};

// Residential Complex Schema
const residenceSchema = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Grand Polo Club & Resort By Emaar Properties",
  description:
    "A large equestrian-themed residential community in Dubai featuring luxury villas, townhouses, polo fields, a clubhouse and resort-style amenities within a gated master plan.",
  url: "https://hsproperty.ae/communities/grand-polo-club",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai Investments Park",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Emaar Properties",
    url: "https://www.emaar.com",
  },
  numberOfBedrooms: "3, 4, 5+",
  amenityFeature: [
    "Polo Fields",
    "Resort Pools",
    "Green Parks",
    "Fitness Center",
    "Clubhouse",
    "24/7 Security",
    "Equestrian Facilities",
    "Walking Trails",
    "Private Gardens",
  ],
  openingHours: "Mo-Su 09:00-18:00",
  telephone: "+971-04-345-4888",
};

export default function GrandPoloClubPage() {
  const pixelId =
    process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Residence Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceSchema) }}
      />

      {/* Main Component */}
      <GrandPoloClubResort pixelId={pixelId} />
    </>
  );
}