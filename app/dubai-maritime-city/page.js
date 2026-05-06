import DubaiMaritimeCity from "./MeritimeCity";

export const metadata = {
  title: "Dubai Maritime City | Waterfront Living & Commercial Hub | HS Property",
  description:
    "Dubai Maritime City offers a unique blend of residential towers, commercial spaces, and maritime services along Dubai Creek. Explore waterfront apartments, mixed-use developments, and industrial facilities in this dynamic community.",
  keywords: [
    "dubai maritime city",
    "maritime city dubai",
    "waterfront apartments dubai",
    "commercial spaces dubai",
    "port rashid",
    "dubai dry docks",
    "off plan projects uae",
    "real estate dubai",
    "maritime business hub",
    "dubai maritime city location",
    "dubai maritime city location map",
    "real estate company in dubai",
    "floor plan",
    "master plan",
    "master-planned communities",
  ],
  openGraph: {
    title: "Dubai Maritime City | Waterfront Living & Commercial Hub",
    description:
      "Explore Dubai Maritime City - a unique waterfront community combining residential towers, commercial spaces, and maritime services along Dubai Creek.",
    images: ["/dubai_maritime_city/gallery1.webp"],
    type: "website",
    siteName: "HS Property",
    url: "https://hsproperty.ae/communities/dubai-maritime-city",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Maritime City | Waterfront Living & Commercial Hub",
    description:
      "Explore Dubai Maritime City - a unique waterfront community combining residential towers, commercial spaces, and maritime services.",
    images: ["/dubai_maritime_city/gallery1.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://hsproperty.ae/communities/dubai-maritime-city",
  },
};

// Schema.org structured data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "ResidentialComplex",
  name: "Dubai Maritime City",
  description:
    "A unique mixed-use waterfront development along Dubai Creek, combining residential towers, commercial spaces, and active maritime services. Features waterfront apartments, mixed-use towers, and industrial facilities.",
  url: "https://hsproperty.ae/communities/dubai-maritime-city",
  image: "https://hsproperty.ae/_next/image?url=%2Fdubai-maritime-city%2F6.jpeg&w=1200&q=75",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
    streetAddress: "Between Port Rashid and Dubai Dry Docks",
  },
  developer: {
    "@type": "Organization",
    name: "DP World",
  },
  numberOfBedrooms: [1, 2, 3],
  amenityFeature: [
    "Working Marina",
    "Creek Views",
    "Business Facilities",
    "Green Spaces",
    "Retail Hub",
    "24/7 Security",
    "Waterfront Promenades",
    "Commercial Docks",
  ],
  telephone: "+971-4-345-4888",
};

export default function DubaiMaritimeCityPage() {
  const pixelId =
    process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <DubaiMaritimeCity pixelId={pixelId} />
    </>
  );
}