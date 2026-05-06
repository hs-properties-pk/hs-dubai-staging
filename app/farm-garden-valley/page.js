// app/farm-garden-valley/page.js
import FarmGardensLanding from "./FarmGardensLanding";
import Script from "next/script";

export const metadata = {
  title: "Farm Gardens The Valley Villas | Emaar Dubai Homes",
  description:
    "Discover luxury living at Farm Gardens The Valley Villas by Emaar in Dubai. Explore these stunning countryside villas that blend nature and modern design.",
  keywords:
    "Farm Gardens The Valley, The Valley Farm Gardens, Emaar Farm Gardens, The Valley Dubai villas, Farm Gardens villas, Dubai countryside villas, Emaar The Valley homes, Farm Gardens The Valley villas for sale",
  authors: [{ name: "H&S Property" }],
  creator: "H&S Property",
  publisher: "H&S Property",
  metadataBase: new URL("https://hsproperty.ae"),
  alternates: {
    canonical: "/farm-garden-valley",
  },
  openGraph: {
    title: "Farm Gardens The Valley Villas for Sale | Emaar Dubai Homes",
    description:
      "Discover luxury living at Farm Gardens The Valley Villas by Emaar in Dubai. Explore these stunning countryside villas that blend nature and modern design.",
    url: "https://hsproperty.ae/farm-garden-valley",
    siteName: "H&S Property",
    images: [
      {
        url: "/farm_garden_valley/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Farm Gardens The Valley - Luxury Countryside Villas in Dubai",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farm Gardens The Valley Villas for Sale | Emaar Dubai Homes",
    description:
      "Discover luxury living at Farm Gardens The Valley Villas by Emaar in Dubai.",
    images: ["/farm_garden_valley/twitter-image.jpg"],
  },
};

// Schema data (same as above)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Farm Gardens at The Valley?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Farm Gardens at The Valley is a luxury residential project by Emaar Properties located within The Valley community in Dubai Land, offering 4 and 5-bedroom villas designed for a modern and farm-inspired lifestyle.",
      },
    },
    {
      "@type": "Question",
      name: "What are the prices of the villas in Farm Gardens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The prices for the villas in Farm Gardens start from approximately AED 5.1 million, with final prices depending on the villa size, location, and amenities.",
      },
    },
    {
      "@type": "Question",
      name: "When is the expected completion date for Farm Gardens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The expected completion date for Farm Gardens at The Valley is August 2026.",
      },
    },
    {
      "@type": "Question",
      name: "What sizes are the villas in Farm Gardens?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The villas in Farm Gardens range in size from 4,950 square feet to 10,004 square feet, offering ample space for families.",
      },
    },
    {
      "@type": "Question",
      name: "Are the villas in Farm Gardens vastu compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the villas in Farm Gardens are designed according to Vastu Shastra principles, ensuring positive energy and harmony within the homes.",
      },
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Farm Gardens Villas",
  description:
    "Luxury 4 & 5 bedroom villas in The Valley, Dubai, offering modern design and a farm-inspired lifestyle with sustainable features.",
  url: "https://hsproperty.ae/farm-garden-valley",
  brand: {
    "@type": "Brand",
    name: "Emaar Properties",
  },
  priceCurrency: "AED",
  price: "5100000",
  priceValidUntil: "2026-08-01",
  offers: {
    "@type": "Offer",
    url: "https://hsproperty.ae/farm-garden-valley",
    priceCurrency: "AED",
    price: "5100000",
    priceValidUntil: "2026-08-01",
    seller: {
      "@type": "Organization",
      name: "Emaar Properties",
    },
  },
};

export default function FarmGardensPage() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <FarmGardensLanding pixelId={pixelId} />
    </>
  );
}
