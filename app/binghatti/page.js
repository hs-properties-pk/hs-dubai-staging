import BinghattiLandingPage from "./Binghatti";

export const metadata = {
  title: "Binghatti Dubai | Real Estate Developers in Al Jaddaf",
  description:
    "Experience luxury living in the heart of Al Jaddaf with Binghatti Developments, modern homes, elegant architecture, and investor-friendly payment options.",
  keywords:
    "Binghatti Developments, Binghatti Properties, Dubai real estate, luxury apartments Dubai, off-plan projects Dubai, Binghatti towers, investment in Dubai, iconic architecture UAE",
  openGraph: {
    title: "Binghatti Developments | Innovative Real Estate in Dubai",
    description:
      "Discover luxury apartments and iconic towers by Binghatti Developments  redefining Dubai’s skyline with design and innovation.",
    images: ["/off-plan/binghatti-developments.jpg"],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/binghatti-developments",
  },
};

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Binghatti Developments Dubai",
  description:
    "Experience luxury living in the heart of Al Jaddaf with Binghatti Developments, modern homes, elegant architecture, and investor-friendly payment options.",
  url: "https://hsproperty.ae/binghatti-developments",
  image: "https://hsproperty.ae/off-plan/binghatti-developments.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  developer: {
    "@type": "Organization",
    name: "Binghatti Developments",
    url: "https://hsproperty.ae/developers/binghatti",
  },
  numberOfBedrooms: [1, 2, 3, 4],
  priceRange: "AED 900,000 - 20,000,000",
  amenityFeature: [
    "Infinity swimming pool",
    "Smart home systems",
    "Gym and wellness center",
    "Concierge service",
    "Covered parking",
    "24/7 security",
    "Children’s play area",
    "Retail and dining outlets",
  ],
  openingHours: "Mo-Su 09:00-19:00",
  telephone: "+971-4-123-4567",
};

export default function BinghattiDevelopmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <BinghattiLandingPage />
    </>
  );
}
