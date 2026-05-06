// app/avana/page.js

import AvanaLandingPage from "./AvanaResidences";

export const metadata = {
  title:
    "Avana Residences | Premium Apartments in Jumeirah Village Circle",
  description:
    "Avana Residences by DECA offers premium 1-3 bedroom apartments in Jumeirah Village Circle, Dubai. Modern living with panoramic views, premium amenities, and flexible payment plans.",
  keywords:
    "avana residences, avana residences dubai, avana residences JVC, DECA properties dubai, apartments in JVC, 1 bedroom apartments dubai, 2 bedroom apartments dubai, 3 bedroom apartments dubai, Jumeirah Village Circle, dubai real estate, off plan dubai",
  openGraph: {
    title: "Avana Residences by DECA | Premium JVC Apartments",
    description:
      "Modern apartments with panoramic views in Jumeirah Village Circle. Premium amenities and flexible payment plans.",
    images: ["/avana/avana-hero.jpg"],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/avana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avana Residences by DECA | Premium JVC Apartments",
    description:
      "Modern apartments with panoramic views in Jumeirah Village Circle.",
    images: ["/avana/avana-hero.jpg"],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Avana Residences by DECA",
  description:
    "Premium residential development offering 1-3 bedroom apartments in Jumeirah Village Circle, Dubai.",
  url: "https://hsproperty.ae/avana",
  image: "https://hsproperty.ae/avana/avana-hero.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
    streetAddress: "Jumeirah Village Circle",
  },
  developer: {
    "@type": "Organization",
    name: "DECA Lifestyle Development",
  },
  numberOfBedrooms: [1, 2, 3],
  amenityFeature: [
    "Swimming Pool",
    "Gym & Fitness Center",
    "Children's Play Area",
    "Landscaped Gardens",
    "Retail Outlets",
    "Underground Parking",
  ],
  telephone: "+971-4-345-4888",
};

export default function AvanaPage() {
  const pixelId =
    process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <AvanaLandingPage pixelId={pixelId} />
    </>
  );
}
