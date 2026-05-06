import DubaiCreekHarbour from "./CreekHarbour";

export const metadata = {
  title: "Creek Harbour By Emaar Community",
  description:
    "Discover Dubai Creek Harbour by Emaar, a stunning waterfront community that combines luxury living with breathtaking views. Explore modern apartments, vibrant harbours, and Dubai Creek Park.",
  keywords:
    "dubai creek harbour, dubai harbour, dubai creek, creek harbour, dubai creek park, harbours, creek harbor, real estate company in dubai, off plan project in dubai, off plan project in uae, real estate, waterfront living, Emaar Beachfront, the valley by emaar",
  openGraph: {
    title: "Creek Harbour By Emaar Community",
    description:
      "Discover Dubai Creek Harbour by Emaar, a stunning waterfront community that combines luxury living with breathtaking views. Explore modern apartments, vibrant harbours, and Dubai Creek Park.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/communities/dubai-creek-harbour",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creek Harbour By Emaar Community",
    description:
      "Discover Dubai Creek Harbour by Emaar, a stunning waterfront community that combines luxury living with breathtaking views.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
  },
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Dubai Creek Harbour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Creek Harbour is a large waterfront community on Dubai Creek, developed with residential towers, hotels, retail, offices, marinas, parks and promenades in one master-planned district by Emaar Properties.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dubai Creek Harbour the same as Dubai Creek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Dubai Creek is the natural waterway that runs through older parts of the city, while Dubai Creek Harbour is a new development built along a section of that creek near Ras Al Khor.",
      },
    },
    {
      "@type": "Question",
      name: "What types of homes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most homes are apartments in mid- and high-rise towers, ranging from 1–3 bedroom units to larger apartments and penthouses. Many are designed as waterfront residences with creek or skyline views.",
      },
    },
    {
      "@type": "Question",
      name: "Is it good for waterfront living?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The community was planned specifically around waterfront living, with marinas, promenades and creek-facing towers, giving residents easy access to the water's edge and open views.",
      },
    },
    {
      "@type": "Question",
      name: "How does it compare to Dubai Harbour or Emaar Beachfront?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Harbour and Emaar Beachfront are positioned more directly on the Arabian Gulf near Dubai Marina, while Dubai Creek Harbour is on the creek, closer to older parts of the city and Downtown Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "Are there off-plan projects available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Dubai Creek Harbour regularly sees new towers and phases launched as off-plan projects, as part of the wider UAE real estate market.",
      },
    },
    {
      "@type": "Question",
      name: "Who is developing Dubai Creek Harbour?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The area is being developed by Emaar, working alongside government-related partners. Emaar is one of the best-known names in real estate and a leading real estate company in Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "Is it family-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Creek Harbour offers parks, promenades, play areas and planned social infrastructure that can suit families, especially those comfortable with apartment living and an urban waterfront environment.",
      },
    },
    {
      "@type": "Question",
      name: "How easy is it to reach other parts of Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The community connects to major city roads, making it relatively straightforward to reach Downtown Dubai, Business Bay, the airport and other established districts by car or taxi.",
      },
    },
    {
      "@type": "Question",
      name: "Can visitors access Dubai Creek Harbour if they don't live there?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Public areas such as Creek Marina, waterfront promenades, retail and dining outlets are open to visitors, making Dubai Creek Harbour both a place to live and a place to visit.",
      },
    },
  ],
};

// Residential Complex Schema
const residenceSchema = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Dubai Creek Harbour By Emaar Properties",
  description:
    "A stunning waterfront community by Emaar Properties featuring luxury apartments, penthouses, and waterfront residences with modern amenities, creek views, and access to Dubai Creek Park.",
  url: "https://hsproperty.ae/communities/dubai-creek-harbour",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai Creek Harbour",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Emaar Properties",
    url: "https://www.emaar.com",
  },
  numberOfBedrooms: "1, 2, 3, 4+",
  amenityFeature: [
    "Creek Marina",
    "Parks & Promenades",
    "Retail & Dining",
    "Swimming Pools",
    "Fitness Centers",
    "24/7 Security",
    "Waterfront Access",
    "Beach Proximity",
    "Smart Home Features",
  ],
  openingHours: "Mo-Su 09:00-18:00",
  telephone: "+971-04-345-4888",
};

export default function DubaiCreekHarbourPage() {
  const pixelId =
    process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
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
      <DubaiCreekHarbour pixelId={pixelId} />
    </>
  );
}