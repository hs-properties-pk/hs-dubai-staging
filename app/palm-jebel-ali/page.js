// app/palm-jebel-ali/page.js (Server Component)
import PalmJebelAliClient from "./PalmJebelAliClient";

// Server-side metadata export
export const metadata = {
  title: "Palm Jebel Ali Villas by Nakheel | Luxury Waterfront Living in Dubai",
  description:
    "Discover Palm Jebel Ali villas by Nakheel. Premium 4-6 bedroom sea-facing villas with private beaches, smart home technology, and flexible payment plans. Freehold ownership from AED 18.6M.",
  keywords:
    "Palm Jebel Ali, Nakheel villas, Dubai waterfront property, freehold villas Dubai, luxury villas UAE, beach villas Dubai, Palm Island Dubai",
  openGraph: {
    title:
      "Palm Jebel Ali Villas by Nakheel | Luxury Waterfront Living in Dubai",
    description:
      "Discover Palm Jebel Ali villas by Nakheel. Premium 4-6 bedroom sea-facing villas with private beaches.",
    images: ["/off-plan/palm-jebel-ali-by-nakheel.jpg"],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/communities/palm-jebel-ali",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Jebel Ali Villas by Nakheel",
    description: "Luxury waterfront living in Dubai",
    images: ["/off-plan/palm-jebel-ali-by-nakheel.jpg"],
  },
};

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Palm Jebel Ali",
  description:
    "Luxury waterfront villas by Nakheel featuring premium 4-6 bedroom sea-facing villas with private beaches and smart home technology",
  url: "https://hsproperty.ae/communities/palm-jebel-ali",
  image: "https://hsproperty.ae/off-plan/palm-jebel-ali-by-nakheel.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Nakheel Properties",
  },
  numberOfBedrooms: [4, 5, 6],
  priceRange: "AED 18,600,000 - 32,800,000",
  amenityFeature: [
    "Private beach access",
    "Swimming pool",
    "Smart home technology",
    "Garden",
    "Parking",
    "Security system",
  ],
  openingHours: "Mo-Su 09:00-19:00",
  telephone: "+971-4-123-4567",
};

export default function PalmJebelAliPage() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <>
      <script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PalmJebelAliClient pixelId={pixelId} />
    </>
  );
}