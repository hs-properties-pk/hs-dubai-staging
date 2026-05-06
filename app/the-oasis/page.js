import OasisLanding from "./OasisLanding";

export const metadata = {
  title: "Oasis Community Villas: Luxury by Emaar Dubai.",
  description:
    "Discover the luxury  Villas in The Oasis Dubai community by Emaar. Experience unmatched elegance and comfort in Dubai's premier luxury villas.",
  keywords:
    "emirates oasis villas, dubailand oasis, villa oasis, The Oasis Dubai, The Oasis Dubai Villas, Luxury homes in The Oasis Dubai, The Oasis community Dubai, Dubai luxury villas, 4-bedroom villas Dubai, off-plan villas Dubai, Emaar Properties",
  openGraph: {
    title: "Oasis Community Villas: Luxury by Emaar Dubai",
    description:
      "Discover the luxury  Villas in The Oasis Dubai community by Emaar. Experience unmatched elegance and comfort in Dubai's premier luxury villas.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/communities/the-oasis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oasis Community Villas: Luxury by Emaar Dubai.",
    description:
      "Discover the luxury  Villas in The Oasis Dubai community by Emaar. Experience unmatched elegance and comfort in Dubai's premier luxury villas.",
    images: [
      "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
    ],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Oasis Community Villas: Luxury by Emaar Dubai.",
  description:
    "Discover the luxury  Villas in The Oasis Dubai community by Emaar. Experience unmatched elegance and comfort in Dubai's premier luxury villas.",
  brand: {
    "@type": "Brand",
    name: "Emaar Properties",
  },
  category: "Real Estate",
  url: "https://hsproperty.ae/communities/the-oasis",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AED",
    lowPrice: "9180000",
    highPrice: "9180000",
    offerCount: "1",
    availability: "https://schema.org/PreOrder",
    priceValidUntil: "2026-12-31",
    seller: {
      "@type": "RealEstateAgent",
      name: "H&S Property",
      telephone: "+971-04-345-4888",
      areaServed: "Dubai",
      url: "https://hsproperty.ae",
    },
  },
};

const oasisFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis Dubai is a luxury master-planned community developed by Emaar Properties, featuring a blend of residential, commercial, and recreational spaces, designed to offer a high-end living experience.",
      },
    },
    {
      "@type": "Question",
      name: "Where is The Oasis Dubai located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis Dubai is located with easy access to major highways such as Sheikh Zayed Road and Al Khail Road, near Dubai Marina, Downtown Dubai, and Dubai Hills Estate.",
      },
    },
    {
      "@type": "Question",
      name: "What types of properties are available in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis Dubai offers luxury villas, townhouses, and apartments, catering to various family sizes and investor preferences.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities can residents expect in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis Dubai offers swimming pools, fitness centers, wellness and spa facilities, recreational spaces, kids' play areas, and luxury retail outlets, providing residents with a resort-style lifestyle.",
      },
    },
    {
      "@type": "Question",
      name: "What is the estimated completion date for The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis Dubai is a phased development, with the completion of different phases scheduled over the coming years. For the latest updates on specific phases, it's best to refer to Emaar's official website.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Oasis Dubai family-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, The Oasis Dubai is designed as a family-friendly community, offering a range of amenities such as parks, recreational spaces, and schools in close proximity, making it ideal for family living.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price range for properties in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Property prices in The Oasis Dubai vary based on the property type, size, and location within the community. It is recommended to contact a trusted real estate agent or refer to Emaar's website for current pricing details.",
      },
    },
    {
      "@type": "Question",
      name: "Can I purchase a property in The Oasis Dubai as an investor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, The Oasis Dubai presents a strong investment opportunity with high rental demand and capital appreciation potential. The community is attractive to both local and international investors.",
      },
    },
    {
      "@type": "Question",
      name: "What financing options are available for purchasing properties in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Emaar Properties and various banks offer financing options for buyers. Mortgages and payment plans are available based on individual eligibility and property type.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book a property in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To book a property in The Oasis Dubai, you can contact Emaar Properties directly or work with an authorized real estate agent. The process typically involves a down payment followed by a structured payment plan.",
      },
    },
    {
      "@type": "Question",
      name: "Does The Oasis Dubai offer any sustainability features?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, The Oasis Dubai incorporates green building practices and eco-friendly features, including energy-efficient systems and sustainable landscaping, in line with Dubai's commitment to sustainable urban development.",
      },
    },
    {
      "@type": "Question",
      name: "What is the community lifestyle like in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The lifestyle in The Oasis Dubai is luxurious, offering a blend of tranquility and urban convenience. Residents can enjoy green spaces, wellness zones, recreational activities, and easy access to Dubai's top destinations.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a Dubai Golden Visa if I invest in The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if you invest in high-value properties in The Oasis Dubai, you may be eligible for the Dubai Golden Visa, which offers long-term residency benefits. Consult with a legal advisor or real estate agent for eligibility details.",
      },
    },
  ],
};

const residenceSchema = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Oasis Community Villas: Luxury by Emaar Dubai.",
  description:
    "Discover the luxury  Villas in The Oasis Dubai community by Emaar. Experience unmatched elegance and comfort in Dubai's premier luxury villas.",
  url: "https://hsproperty.ae/communities/the-oasis",
  image:
    "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
  address: {
    "@type": "PostalAddress",
    addressLocality: "The Oasis",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Emaar Properties",
    url: "https://www.emaar.com",
  },
  numberOfBedrooms: "4,5,6",
  amenityFeature: [
    "Private Gardens",
    "Swimming Pools",
    "Kids Play Areas",
    "Jogging & Cycling Tracks",
    "Fitness Centers",
    "Retail Outlets",
    "Wellness and Spa Facilities",
    "Recreational Spaces",
    "Lagoon-themed Lifestyle Zones",
    "Premium Clubhouse",
    "Smart Home Features",
    "24/7 Security",
  ],
  openingHours: "Mo-Su 09:00-18:00",
  telephone: "+971-04-345-4888",
  completionDate: "2028-Q2",
};

export default function Palmiera2Page() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Comprehensive Oasis Dubai FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(oasisFaqSchema) }}
      />

      {/* Residence Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceSchema) }}
      />

      {/* Main Component */}
      <OasisLanding pixelId={pixelId} />
    </>
  );
}