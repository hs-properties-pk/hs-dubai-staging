import RashidYachtsMarinaLanding from "./RashidYachtsMarinaLanding";

export const metadata = {
  title:
    "Rashid Yachts & Marina Dubai | Luxury Waterfront Apartments for Sale.",
  description:
    "Explore Rashid Yachts Marina for premium waterfront apartment living in Dubai. Discover luxury 1, 2 & 3 bedroom residences with stunning marina views.",
  keywords:
    "Rashid Yachts Marina, Rashid Yachts & Marina Dubai, Mina Rashid apartments, waterfront apartments in Dubai, luxury marina residences Dubai, Emaar Rashid Yachts & Marina, Rashid Yachts Marina apartments for sale, Dubai waterfront properties, marina view apartments Dubai",
  openGraph: {
    title: "Rashid Yachts Marina Apartments Dubai | Luxury Waterfront Living",
    description:
      "Discover Rashid Yachts Marina in Dubai – luxury 1, 2 & 3 bedroom waterfront apartments with stunning marina views and resort-style amenities.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/rashid_yachts_marina",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashid Yachts Marina Apartments Dubai | Luxury Waterfront Living",
    description:
      "Luxury waterfront apartments at Rashid Yachts Marina in Dubai. Premium 1–3 bedroom apartments with marina views and resort-style amenities.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Rashid Yachts Marina - Luxury Waterfront Apartments.",
  description:
    "Rashid Yachts Marina is a luxury waterfront apartment development by Emaar Properties offering premium 1, 2 and 3 bedroom apartments with marina views, smart home technology, and resort-style amenities at Rashid Yachts & Marina.",
  brand: {
    "@type": "Brand",
    name: "Emaar Properties",
  },
  category: "Real Estate",
  url: "https://hsproperty.ae/rashid_yachts_marina",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AED",
    lowPrice: "1700000",
    highPrice: "5200000",
    offerCount: "3",
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
      name: "What types of apartments are available in Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina offers a selection of 1-bedroom apartments, 2-bedroom apartments, and 3-bedroom apartments with stunning marina-facing views and waterfront living options.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Rashid Yachts Marina located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina is located at Rashid Yachts & Marina, a prestigious waterfront development in Dubai. It offers easy access to Dubai Downtown, Dubai Marina, Dubai Mall, and other prime locations within Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities are available in Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina features a wide range of luxury amenities, including infinity swimming pool, fitness centre and outdoor gym, yoga decks and wellness zones, private marina access, BBQ zones and entertainment areas, children's play area, and panoramic terraces and landscaped gardens.",
      },
    },
    {
      "@type": "Question",
      name: "When is the expected handover of Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The expected handover date for Rashid Yachts Marina is Q4 2029.",
      },
    },
    {
      "@type": "Question",
      name: "What are the payment plans for Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina offers an attractive 80/20 payment plan, making it an accessible option for both investors and end-users. 20% is paid during construction and the remaining 80% is due upon handover.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price range for apartments in Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The starting prices for apartments in Rashid Yachts Marina are: 1 Bedroom Apartments from AED 1.7M, 2 Bedroom Apartments AED 2.5M – 3.1M, and 3 Bedroom Apartments AED 3.9M – 5.2M.",
      },
    },
    {
      "@type": "Question",
      name: "Is Rashid Yachts Marina a good investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rashid Yachts Marina offers strong ROI potential due to its prime waterfront location, luxury residences, and high demand for marina-facing apartments. The project also offers eligibility for the UAE Golden Visa for qualifying investors.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy an apartment in Rashid Yachts Marina if I am a non-UAE resident?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, non-UAE residents are eligible to invest in Rashid Yachts Marina. Additionally, the project offers the possibility of obtaining the Dubai Golden Visa depending on the investment value.",
      },
    },
    {
      "@type": "Question",
      name: "What is the location of Rashid Yachts Marina in relation to Dubai's landmarks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina is located within Rashid Yachts & Marina, offering easy access to key landmarks such as Dubai Downtown, Dubai Mall, Burj Khalifa, Dubai Marina, Kite Beach, and the superyacht marina.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any family-friendly features in Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rashid Yachts Marina offers family-friendly amenities such as children's play area, community park, landscaped gardens, and wellness zones and outdoor spaces.",
      },
    },
    {
      "@type": "Question",
      name: "What is the expected return on investment (ROI) for Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina offers strong rental potential and high ROI, driven by its waterfront location, luxury apartments, and the ongoing development of Rashid Yachts & Marina as a premier destination for living, dining, and entertainment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a UAE Golden Visa through investing in Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, investors in Rashid Yachts Marina may be eligible for the UAE Golden Visa depending on the investment amount. This provides long-term residency benefits in the UAE.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Rashid Yachts Marina different from other developments in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rashid Yachts Marina stands out for its luxury waterfront apartments, marina-facing views, and hotel-inspired living experience. The development also offers smart home features, making it a modern and convenient option for contemporary living in Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "What types of views can I expect from my apartment in Rashid Yachts Marina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apartments in Rashid Yachts Marina offer a variety of breathtaking views, including marina views, waterfront views, and Dubai skyline views.",
      },
    },
    {
      "@type": "Question",
      name: "Is Rashid Yachts Marina part of a larger master development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Rashid Yachts Marina is part of the Rashid Yachts & Marina master development, which includes luxury residences, a superyacht marina, retail and dining spaces, and green spaces.",
      },
    },
  ],
};

// Residential Complex Schema
const residenceSchema = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Rashid Yachts Marina Residences - Rashid Yachts & Marina",
  description:
    "Luxury waterfront apartments by Emaar Properties with marina-facing views, smart home technology, and resort-style amenities within Rashid Yachts & Marina.",
  url: "https://hsproperty.ae/rashid_yachts_marina",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rashid Yachts & Marina",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Emaar Properties",
    url: "https://www.emaar.com",
  },
  numberOfBedrooms: "1, 2, 3",
  priceRange: "AED 1,700,000 - 5,200,000",
  amenityFeature: [
    "Infinity Swimming Pool",
    "Fitness Centre",
    "Outdoor Gym",
    "Yoga Decks",
    "Wellness Zones",
    "Private Marina Access",
    "BBQ Zones",
    "Entertainment Areas",
    "Children's Play Area",
    "Landscaped Gardens",
    "Panoramic Terraces",
    "Smart Home Features",
    "24/7 Security",
    "Concierge Service",
  ],
  openingHours: "Mo-Su 09:00-18:00",
  telephone: "+971-04-345-4888",
  completionDate: "2029-Q4",
};

export default function RashidYachtsMarinaPage() {
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
      <RashidYachtsMarinaLanding pixelId={pixelId} />
    </>
  );
}
