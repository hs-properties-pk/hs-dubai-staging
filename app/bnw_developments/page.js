// app/bnw-developments/page.js (Server Component)
import BNWLandingPage from "./BnwDeveleopments";

// Server-side metadata export
export const metadata = {
  title: "Premium Real Estate Developments in Dubai | BNW by HS Property",
  description:
    "Discover BNW Developments by HS Property, leading Dubai real estate developers delivering high-value luxury projects with exceptional investment potential.",
  keywords:
    "BNW Developments, Dubai real estate, luxury villas Dubai, off-plan properties Dubai, waterfront apartments UAE, BNW Properties Dubai, investment in Dubai",
  openGraph: {
    title: "BNW Developments | Luxury Properties & Real Estate in Dubai",
    description:
      "Discover BNW Developments  premium villas and apartments in Dubai with world-class design and luxury amenities.",
    images: ["/off-plan/bnw-developments.jpg"],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/bnw-developments",
  },
  twitter: {
    card: "summary_large_image",
    title: "BNW Developments | Luxury Properties in Dubai",
    description:
      "Explore luxury villas and apartments in Dubai by BNW Developments.",
    images: ["/off-plan/bnw-developments.jpg"],
  },
};

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "BNW Developments Dubai",
  description:
    "Luxury real estate projects by BNW Developments, offering high-end villas, apartments, and waterfront residences in Dubai with modern design and premium amenities.",
  url: "https://hsproperty.ae/bnw-developments",
  image: "https://hsproperty.ae/off-plan/bnw-developments.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "BNW Developments",
    url: "https://hsproperty.ae/developers/bnw-developments",
  },
  numberOfBedrooms: [1, 2, 3, 4, 5],
  priceRange: "AED 1,200,000 - 25,000,000",
  amenityFeature: [
    "Swimming pool",
    "Private beach access",
    "Smart home systems",
    "Fitness center",
    "Parking",
    "24/7 security",
    "Children’s play area",
    "Green spaces",
  ],
  openingHours: "Mo-Su 09:00-19:00",
  telephone: "+971-4-123-4567",
};

export default function BNWDevelopmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BNWLandingPage />
    </>
  );
}
