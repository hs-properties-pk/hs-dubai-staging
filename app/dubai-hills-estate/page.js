import DubaiHillsideLanding from "./DubaiHillsideLanding";

// In your app/page.jsx, update the metadata section:
export const metadata = {
  title:
    "Dubai Hills Estate By Emaar | Luxury Community Dubai Hills Real Estate",
  description:
    "Discover Dubai Hills Estate by Emaar Properties. Explore prime locations, real estate opportunities, master plan, off-plan properties, and investment opportunities in Dubai's premier residential community.",
  keywords:
    "dubai hills estate, emaar dubai hills estate, dubai hills estate location, dubai hills real estate, master plan dubai hills estate, about dubai hills estate, masterplan dubai hills estate, dubai hills estate location map, Emaar Properties, payment plan, off-plan properties, Community Parks, off-plan real estate, prime land, investment opportunity, real estate company in dubai",
  openGraph: {
    title: "Dubai Hills Estate By Emaar Community - The Green Heart of Dubai",
    description:
      "Explore Dubai Hills Estate by Emaar: A master-planned community in Mohammed Bin Rashid City offering luxury apartments, townhouses, villas, golf course, Dubai Hills Mall, and extensive parks. Discover real estate investment opportunities.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Fpalace_residences_hillside%2F1.webp&w=3840",
    ],
    type: "website",
    siteName: "H&S Property Dubai",
    url: "https://hsproperty.ae/communities/dubai-hills-estate",
  },
};

// Product Schema for Palace Residences Hillside
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Palace Residences Hillside Apartments & Townhouses in Dubai Hills Estate",
  description:
    "Palace Residences Hillside is a branded residential development by Emaar Properties in Dubai Hills Estate, offering luxury 1, 2 and 3 bedroom apartments and 3 bedroom townhouses with resort-style amenities, landscaped parks and modern community facilities.",
  brand: {
    "@type": "Brand",
    name: "Emaar Properties",
  },
  category: "Real Estate",
  url: "https://hsproperty.ae/communities/dubai-hills-estate",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AED",
    lowPrice: "1710000",
    highPrice: "5200000",
    offerCount: "4",
    availability: "https://schema.org/PreOrder",
    priceValidUntil: "2029-12-31",
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
      name: "What is Dubai Hills Esate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Hills Esate is a branded residential development by Emaar Properties in Dubai Hills Estate, offering luxury 1, 2 and 3 bedroom apartments and 3 bedroom townhouses with resort-style amenities and modern architecture.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Dubai Hills Esate located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Hills Esate is located in Dubai Hills Estate, close to Dubai Hills Mall, Dubai Hills Park and Dubai Hills Golf Course, with easy access to Downtown Dubai, Dubai Marina and key roads such as Al Khail Road and Sheikh Zayed Road.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the developer of Dubai Hills Esate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The project is developed by Emaar Properties, a leading UAE real estate developer known for high-quality, master-planned communities and branded residences.",
      },
    },
    {
      "@type": "Question",
      name: "What types of units are available at Dubai Hills Esate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Hills Esate offers 1, 2 and 3 bedroom branded apartments, along with a limited collection of 3 bedroom townhouses designed for families seeking larger spaces and private outdoor areas.",
      },
    },
    {
      "@type": "Question",
      name: "What is the starting price at Dubai Hills Esate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prices at Dubai Hills Esate start from approximately AED 1.71 million for 1 bedroom apartments, with larger apartments and townhouses available at higher price points.",
      },
    },
    {
      "@type": "Question",
      name: "When is the expected handover for Dubai Hills Esate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The expected handover for Dubai Hills Esate is scheduled for Q2 2029, with completion targeted around June 2029.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities are available at Dubai Hills Esate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Amenities at Dubai Hills Esate include swimming pools, infinity-edge pool, lap pool, outdoor gym, fitness centre, running track, landscaped gardens, children's play areas, community park, BBQ zones, padel courts, multi-purpose courts, indoor multipurpose room, wellness spaces, concierge service and 24-hour security.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dubai Hills Esate a branded residence?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Dubai Hills Esate is a branded residence inspired by Palace Hotels & Resorts, offering hotel-style services, high-end finishes and a resort-style living experience in Dubai Hills Estate.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dubai Hills Esate a good investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dubai Hills Esate is attractive for investors due to its high ROI potential, strong rental demand, branded apartments, prime Dubai Hills Estate location and flexible 80/20 payment plan from Emaar Properties.",
      },
    },
    {
      "@type": "Question",
      name: "Can buyers at Dubai Hills Esate apply for the UAE Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eligible investors who meet the minimum property value criteria set by the UAE government may apply for long-term UAE residency through the UAE Golden Visa or Dubai Golden Visa programs when purchasing at Palace Residences Hillside.",
      },
    },
  ],
};

// Residential Complex Schema
const residenceSchema = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Dubai Hills Esate By Emaar Properties",
  description:
    "Branded luxury apartments and townhouses by Emaar Properties featuring modern architecture, resort-style amenities, and premium finishes within the prestigious Dubai Hills Estate master community.",
  url: "https://hsproperty.ae/communities/dubai-hills-estate",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai Hills Estate",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Emaar Properties",
    url: "https://www.emaar.com",
  },
  numberOfBedrooms: "1, 2, 3",
  priceRange: "AED 1,710,000 - 5,200,000",
  amenityFeature: [
    "Swimming Pools",
    "Infinity-edge Pool",
    "Lap Pool",
    "Outdoor Gym",
    "Fitness Centre",
    "Running Track",
    "Landscaped Gardens",
    "Children's Play Areas",
    "Community Park",
    "BBQ Zones",
    "Padel Courts",
    "Multi-purpose Courts",
    "Indoor Multipurpose Room",
    "Wellness Spaces",
    "Concierge Service",
    "24-hour Security",
    "Smart Home Features",
    "Retail Outlets",
  ],
  openingHours: "Mo-Su 09:00-18:00",
  telephone: "+971-04-345-4888",
  completionDate: "2029-Q2",
};

export default function PalaceResidencesHillsidePage() {
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
      <DubaiHillsideLanding pixelId={pixelId} />
    </>
  );
}