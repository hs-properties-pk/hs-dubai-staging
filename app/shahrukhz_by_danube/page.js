// app/shahrukhz-danube-tower/page.js

import ShahrukhzTowerLanding from "./ShahrukhzTowerLanding";

export const metadata = {
  title: "Shahrukhz by Danube: Luxury Apartments in Al Sufouh Dubai",
  description:
    "Looking for luxury apartments in Al Sufouh? Discover Shahrukhz Tower by Danube Properties – world-class amenities and Dubai's lavish skyline views.",
  keywords:
    "Shahrukhz by Danube Tower Dubai, SRK Tower Al Sufouh, Danube Properties Shahrukhz Tower, Luxury apartments in Al Sufouh, Shahrukhz Tower by SRK, Al Sufouh properties for sale, Dubai luxury living, Danube Properties Dubai, Dubai real estate",
  authors: [{ name: "H&S Property" }],
  creator: "H&S Property",
  publisher: "H&S Property",
  metadataBase: new URL("https://hsproperty.ae"),
  alternates: {
    canonical: "/shahrukhz_by_danube",
  },
  openGraph: {
    title: "Shahrukhz by Danube: Luxury Apartments in Al Sufouh Dubai",
    description:
      "Discover Shahrukhz Tower by Danube Properties – luxury waterfront apartments with world-class amenities in Al Sufouh, Dubai.",
    url: "https://hsproperty.ae/shahrukhz_by_danube",
    siteName: "H&S Property",
    images: [
      {
        url: "/shahrukhz_by_danube/2.webp",
        width: 1200,
        height: 630,
        alt: "Shahrukhz by Danube Tower - Luxury Apartments in Al Sufouh Dubai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahrukhz by Danube: Luxury Apartments in Al Sufouh Dubai",
    description:
      "Discover luxury waterfront apartments with world-class amenities in Al Sufouh, Dubai.",
    images: ["/shahrukhz_by_danube/2.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      name: "What is Shahrukhz by Danube Tower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shahrukhz by Danube Tower is a luxury residential development in Al Sufouh, Dubai. Danube Properties created it in collaboration with SRK. The development features a 55-storey commercial tower with high-end apartments and modern office spaces, offering residents a combination of luxury living, waterfront views, and wellness amenities.",
      },
    },
    {
      "@type": "Question",
      name: "What types of properties are available at Shahrukhz by Danube Tower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shahrukhz by Danube Tower offers a range of luxury apartments and penthouses including studio apartments (from 500 sq. ft.), one-bedroom apartments (from 700 sq. ft.), and two-bedroom apartments (from 1,200 sq. ft.) with modern finishes and flexible layouts. There are also commercial units available for business owners.",
      },
    },
    {
      "@type": "Question",
      name: "What is the price range for apartments in Shahrukhz by Danube Tower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The price for Shahrukhz Tower apartments starts from AED 2,100,000. The final price varies based on the unit type, size, and location within the tower, such as lake-facing apartments with breathtaking views.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities are offered at Shahrukhz by Danube Tower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shahrukhz Tower provides luxury amenities including waterfront living with stunning views, wellness amenities like Japanese onsen baths and yoga spaces, sky pool, concierge services, 24-hour security, rooftop helipad, and smart home features with flexible layouts and modern finishes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the expected completion date for Shahrukhz by Danube Tower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The expected completion date for Shahrukhz by Danube Tower is between Q4 2028 and Q4 2029. The project is currently under construction.",
      },
    },
    {
      "@type": "Question",
      name: "Does Shahrukhz Tower offer a payment plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Shahrukhz by Danube Tower offers an affordable 70/30 post-handover payment plan, allowing buyers to pay in installments after receiving the property for easier financial management.",
      },
    },
    {
      "@type": "Question",
      name: "Is Shahrukhz by Danube Tower freehold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Shahrukhz by Danube Tower offers freehold ownership, making it available for both UAE residents and international buyers to invest in luxury apartments in Al Sufouh, Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "How is the location of Shahrukhz Tower connected to the rest of Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shahrukhz Tower is conveniently located in Al Sufouh with easy access to Sheikh Zayed Road, DMCC Metro Station, and is just a short drive from Dubai Marina, Palm Jumeirah, and Dubai International Airport.",
      },
    },
    {
      "@type": "Question",
      name: "What are the investment benefits of Shahrukhz by Danube Tower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Investment benefits include freehold ownership, waterfront apartments with panoramic views offering strong capital appreciation potential, prime Al Sufouh location near Palm Jumeirah and Dubai Marina, flexible payment plans, and modern office spaces for commercial investment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the apartments at Shahrukhz Tower for business purposes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Shahrukhz Tower offers a mix of office and residential units with elegant office spaces featuring flexible layouts and contemporary style, ideal for creating efficient professional work environments.",
      },
    },
  ],
};

// Product/Real Estate Schema
const realEstateSchema = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Shahrukhz by Danube Tower",
  description:
    "Luxury 55-storey commercial tower in Al Sufouh, Dubai offering high-end apartments, penthouses, and commercial units with waterfront views and world-class amenities.",
  url: "https://hsproperty.ae/shahrukhz_by_danube",
  image: "/shahrukhz_by_danube/2.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Sufouh",
    addressLocality: "Dubai",
    addressCountry: "UAE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.1124",
    longitude: "55.1388",
  },
  numberOfRooms: {
    "@type": "QuantitativeValue",
    value: "1-3",
  },
  petsAllowed: true,
  amenityFeature: [
    "Swimming Pool",
    "Fitness Center",
    "Yoga Studio",
    "Onsen Baths",
    "Sky Pool",
    "Rooftop Helipad",
    "Smart Home Technology",
    "24/7 Security",
    "Concierge Service",
    "Parking",
  ],
};

// Offer Schema for Pricing
const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Shahrukhz by Danube Tower Apartments",
  description:
    "Luxury apartments in Al Sufouh, Dubai with waterfront views and premium amenities",
  url: "https://hsproperty.ae/shahrukhz_by_danube",
  priceCurrency: "AED",
  price: "2100000",
  priceValidUntil: "2029-12-31",
  availability: "https://schema.org/PreOrder",
  seller: {
    "@type": "Organization",
    name: "Danube Properties",
  },
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  eligibleRegion: {
    "@type": "City",
    name: "Dubai",
  },
};

// Organization Schema for Developer
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Danube Properties",
  url: "https://www.danubeproperties.ae",
  logo: "https://www.danubeproperties.ae/logo.png",
  description:
    "Leading real estate developer in Dubai known for luxury residential and commercial properties",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "UAE",
  },
  sameAs: [
    "https://www.facebook.com/DanubeProperties",
    "https://www.instagram.com/danubeproperties",
    "https://www.linkedin.com/company/danube-properties",
  ],
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://hsproperty.ae",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://hsproperty.ae/projects",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Shahrukhz by Danube Tower",
      item: "https://hsproperty.ae/shahrukhz_by_danube",
    },
  ],
};

export default function ShahrukhzPage() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ShahrukhzTowerLanding pixelId={pixelId} />
    </>
  );
}
