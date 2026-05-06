// app/page.js
import MontivaVidaLanding from "./MontivaVidaLanding";

export const metadata = {
  title:
    "Montiva by Vida: Luxury Apartments & Residences in Dubai Creek Harbour",
  description:
    "Discover Montiva by Vida in Dubai Creek Harbour - luxury branded residences by Emaar. Studio, 1, 2 & 3 bedroom apartments with smart home features.",
  keywords:
    "Montiva by Vida, Vida Montiva Dubai, Montiva Dubai, Montiva residences, Vida properties Dubai, Montiva apartments, Montiva by Vida UAE, Montiva by Vida apartments for sale, Vida Montiva luxury residences, Dubai Creek Harbour, Emaar Properties",
  openGraph: {
    title:
      "Montiva by Vida: Luxury Apartments & Residences in Dubai Creek Harbour",
    description:
      "Discover Montiva by Vida in Dubai Creek Harbour - luxury branded residences by Emaar. Studio, 1, 2 & 3 bedroom apartments with smart home features.",
    images: [
      "https://a.storyblok.com/f/209096/1923x1300/93f3a88144/montiva-by-vida.jpg",
    ],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/montiva-by-vida",
  },
  twitter: {
    card: "summary_large_image",
    title: "Montiva by Vida: Luxury Apartments & Residences in Dubai",
    description:
      "Luxury branded residences by Emaar in Dubai Creek Harbour. Premium apartments with smart home technology and waterfront views.",
    images: [
      "https://a.storyblok.com/f/209096/1923x1300/93f3a88144/montiva-by-vida.jpg",
    ],
  },
};

// Product Schema
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Montiva by Vida",
  description:
    "Montiva by Vida is a luxury residential project in Dubai Creek Harbour offering branded residences under Vida by Emaar. It includes studio, 1-bedroom, 2-bedroom, and 3-bedroom apartments with smart home features and waterfront views.",
  brand: {
    "@type": "Brand",
    name: "Emaar Properties",
  },
  category: "Real Estate",
  url: "https://hsproperty.ae/montiva-by-vida",
  image:
    "https://a.storyblok.com/f/209096/1923x1300/93f3a88144/montiva-by-vida.jpg",
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "1900000",
    priceValidUntil: "2029-09-30",
    availability: "https://schema.org/PreOrder",
    seller: {
      "@type": "Organization",
      name: "Emaar Properties",
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
      name: "What types of apartments are available in Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Montiva by Vida offers a variety of luxury apartments, including studio, 1-bedroom, 2-bedroom, and 3-bedroom units, designed to cater to individuals, couples, and families alike.",
      },
    },
    {
      "@type": "Question",
      name: "What is the expected completion date for Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The expected completion date for Montiva by Vida is September 2029. The project is set to be fully delivered by this time, allowing residents to move into their new homes.",
      },
    },
    {
      "@type": "Question",
      name: "How can I invest in Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Montiva by Vida is an off-plan property, meaning you can purchase a unit before its completion. You can explore various payment plans and work with Emaar Properties or certified real estate agents to secure your investment.",
      },
    },
    {
      "@type": "Question",
      name: "What is the starting price for Montiva by Vida apartments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The starting price for Montiva by Vida apartments begins at AED 1.9 million, offering a range of options depending on the size and layout of the unit.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any smart home features in Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every unit in Montiva by Vida includes smart home technology, allowing residents to control lighting, temperature, and security via smartphone or tablet for added comfort and convenience.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities are available in Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Montiva by Vida offers a wide range of luxury amenities, including an infinity pool, fitness center, co-working spaces, retail outlets, barbecue areas, and wellness-focused features, providing both relaxation and recreation for residents.",
      },
    },
    {
      "@type": "Question",
      name: "What is the payment plan for Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Montiva by Vida offers flexible payment plans tailored to suit different buyer preferences. Contacting the developer or a licensed real estate agent will provide more details on available payment structures.",
      },
    },
    {
      "@type": "Question",
      name: "What is the location of Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Montiva by Vida is situated in Dubai Creek Harbour, one of Dubai's most sought-after waterfront destinations, offering easy access to key landmarks such as Burj Khalifa, Dubai Mall, and Dubai International Airport (DXB).",
      },
    },
    {
      "@type": "Question",
      name: "Is Montiva by Vida a family-friendly community?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Montiva by Vida is designed as a family-friendly residence, offering spacious apartments, safe outdoor spaces, and close proximity to schools and other family-oriented facilities in the surrounding area.",
      },
    },
    {
      "@type": "Question",
      name: "How is the connectivity around Montiva by Vida?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Montiva by Vida offers excellent location and connectivity, with easy access to Ras Al Khor Road, Dubai Metro, and Dubai International Airport (DXB), making it convenient for residents to travel and commute.",
      },
    },
  ],
};

// Residential Complex Schema
const residenceSchema = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Montiva by Vida - Dubai Creek Harbour",
  description:
    "Luxury branded residences by Emaar Properties featuring Vida Hotels & Resorts inspired design, waterfront views, smart home technology, and wellness-focused amenities within Dubai Creek Harbour.",
  url: "https://hsproperty.ae/montiva-by-vida",
  image:
    "https://a.storyblok.com/f/209096/1923x1300/93f3a88144/montiva-by-vida.jpg",
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
  numberOfBedrooms: "Studio, 1, 2, 3",
  priceRange: "AED 1,900,000+",
  amenityFeature: [
    "Infinity Pool",
    "Fitness Center",
    "Co-working Spaces",
    "Retail Outlets",
    "Sky Gardens",
    "Barbecue Areas",
    "Community Lounge",
    "Smart Home Features",
    "24/7 Security",
    "Wellness Facilities",
  ],
  openingHours: "Mo-Su 09:00-18:00",
  completionDate: "2029-09-30",
};

export default function Home() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
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
      <MontivaVidaLanding pixelId={pixelId} />
    </>
  );
}
