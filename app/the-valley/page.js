import TheValley from "./TheValley";

export const metadata = {
  title: "The Valley By Emaar Community",
  description:
    "The Valley by Emaar Dubai presents a lifestyle of modern elegance in a vibrant community. Explore the perfect balance of nature and urban sophistication in an ideal location.",
  keywords:
    "the valley by emaar, emaar the valley, the valley emaar location, the valley by emaar dubai, the valley emaar dubai, real estate company, off plan projects in uae, Dubai Hills Estate, news and offer, Emaar The Valley, master community, community living, real estate, townhouses dubai, villas dubai, family community dubai, dubai al ain road, dubailand, golden beach, town centre, kids dale, sports village, farm gardens, rivana, eden, nara, talia, orania, nima, elora, alana, avena, velora, maple bear nursery, suburban community, nature-inspired living, green corridors, low-rise community, garden town, self-sustained community",
  authors: [{ name: "H&S Property" }],
  creator: "H&S Property",
  publisher: "H&S Property",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hsproperty.ae"),
  alternates: {
    canonical: "communities/the-valley",
    languages: {
      "en-US": "communities/the-valley",
      "ar-AE": "ar/communities/the-valley",
    },
  },
  openGraph: {
    title: "The Valley By Emaar | Modern Garden Suburb Community in Dubai",
    description:
      "Discover The Valley by Emaar - a nature-inspired master community with townhouses, villas, parks, and lifestyle hubs. Family-friendly suburban living with Golden Beach, Town Centre, and Sports Village.",
    url: "https://hsproperty.ae/communities/the-valley",
    siteName: "HS Property Dubai",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/the-valley/12.webp",
        width: 1200,
        height: 630,
        alt: "The Valley by Emaar - Modern Garden Suburb Community",
      },
      {
        url: "/the-valley/1.webp",
        width: 1200,
        height: 630,
        alt: "The Valley Townhouses and Villas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Valley By Emaar Dubai | Master Community",
    description:
      "Nature-inspired suburban living with townhouses, villas, parks & community hubs in Dubai.",
    images: ["/the-valley/12.webp"],
    creator: "@hspropertydubai",
    site: "@hspropertydubai",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

// Comprehensive Schema.org structured data
const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "The Valley by Emaar",
    description:
      "A nature-inspired suburban master community along Dubai–Al Ain Road (E66), featuring 3-4 bedroom townhouses and villas with amenities including Golden Beach, Town Centre, Kids' Dale, and Sports Village.",
    url: "https://hsproperty.ae/communities/the-valley",
    image: [
      "https://hsproperty.ae/the-valley/12.webp",
      "https://hsproperty.ae/the-valley/1.webp",
      "https://hsproperty.ae/the-valley/13.webp",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
      streetAddress: "Dubai–Al Ain Road (E66)",
      addressArea: "Dubailand Area",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.0667",
      longitude: "55.3333",
    },
    developer: {
      "@type": "Organization",
      name: "Emaar Properties",
      url: "https://www.emaar.com",
      description: "Leading real estate developer in Dubai",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AED",
      category: "Real Estate",
    },
    numberOfBedrooms: [3, 4],
    numberOfBathroomsTotal: [3, 4],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Golden Beach",
        value: "30,000 sqm man-made beach-style area",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Town Centre",
        value: "32,000 sqm retail and community hub",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Kids' Dale",
        value: "13,000 sqm children's play and learning area",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Sports Village",
        value: "20,000-25,000 sqm sports and fitness facilities",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Parks and Green Corridors",
        value: "Linear parks and green walking paths",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Swimming Pools",
        value: "Community swimming pools",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Security",
        value: "24/7 gated community security",
      },
    ],
    telephone: "+971-4-345-4888",
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
    sameAs: [
      "https://www.facebook.com/hspropertyrealestate",
      "https://www.instagram.com/hs_property/",
      "https://www.linkedin.com/company/h-s-properties/",
    ],
  },
  {
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
        name: "The Valley by Emaar",
        item: "https://hsproperty.ae/the-valley",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is The Valley by Emaar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Valley by Emaar is a large suburban community along Dubai–Al Ain Road, built mainly around townhouses and villas, with key amenities such as Golden Beach, Town Centre, Kids' Dale and Sports Village. It is designed as a nature-inspired, family-focused neighbourhood.",
        },
      },
      {
        "@type": "Question",
        name: "Where is The Valley located in Dubai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The community sits on the outer side of Dubai, along the Dubai–Al Ain Road (E66), close to the wider Dubailand area. This gives residents a quieter setting while keeping key parts of the city reachable by car.",
        },
      },
      {
        "@type": "Question",
        name: "What property types are available in The Valley?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most homes in The Valley are 3–4 bedroom townhouses, along with semi-detached and standalone villas in select phases like Farm Gardens and Rivana. Future phases may add more variations while keeping the low-rise, family-focused character.",
        },
      },
      {
        "@type": "Question",
        name: "Is The Valley a good place for families?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The community has been planned with families in mind, with parks, play areas, nursery options, and large lifestyle hubs such as Kids' Dale and Sports Village that encourage outdoor activity and social interaction.",
        },
      },
      {
        "@type": "Question",
        name: "Does The Valley offer off-plan properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many phases in The Valley are launched as off-plan townhouses or villas, with structured payment arrangements typical of Emaar and other major developers. Buyers interested in off plan projects in UAE often include The Valley on their shortlist.",
        },
      },
    ],
  },
];

// Hidden SEO content that will be rendered on server for search engines
const HiddenSEOContent = () => (
  <div className="sr-only" aria-hidden="true">
    <h1>
      The Valley by Emaar Dubai - Master Community with Townhouses & Villas
    </h1>

    <section>
      <h2>About The Valley by Emaar</h2>
      <p>
        The Valley by Emaar is a nature-inspired suburban community located
        along Dubai–Al Ain Road (E66), developed by Emaar Properties, one of
        Dubai&apos;s leading real estate companies. Introduced in 2019, this master
        community offers a perfect balance of modern urban living and natural
        serenity.
      </p>

      <h3>Community Features & Amenities</h3>
      <p>
        The Valley features several key destination zones including Golden Beach
        (30,000 sqm man-made beach-style area), Town Centre (32,000 sqm retail
        and community hub), Kids Dale (13,000 sqm children&apos;s area), and Sports
        Village (20,000-25,000 sqm sports facilities). The community is designed
        with green corridors, linear parks, and pedestrian-friendly pathways
        connecting all neighborhoods.
      </p>

      <h3>Property Types Available</h3>
      <p>
        The Valley offers 3-4 bedroom townhouses in clusters like Eden, Nara,
        Talia, Orania, Nima, and Elora. For those seeking more space, standalone
        villas are available in Farm Gardens and Farm Gardens 2 clusters, while
        twin villas can be found in Rivana, Alana, Avena, and Velora phases.
      </p>

      <h3>Location & Connectivity</h3>
      <p>
        Located on the outer side of Dubai near the Dubailand area, The Valley
        offers easy access to major destinations: Downtown Dubai (20-25
        minutes), Dubai International Airport (25-30 minutes), Dubai Silicon
        Oasis, and Dubai Outlet Mall. The community provides direct access to
        Dubai–Al Ain Road (E66) for convenient commuting.
      </p>

      <h3>Family-Friendly Environment</h3>
      <p>
        With Maple Bear Nursery already operating within the community and
        several schools reachable within 15-25 minutes, The Valley is ideal for
        families. The community emphasizes outdoor activity, green spaces, and a
        quieter suburban lifestyle compared to inner-city districts.
      </p>

      <h3>Investment Opportunity</h3>
      <p>
        As one of Emaar&apos;s key off-plan projects in the UAE, The Valley presents
        attractive investment opportunities. The phased development approach,
        Emaar&apos;s reputation as a trusted real estate company, and the growing
        demand for suburban family homes make it a compelling choice for
        investors.
      </p>
    </section>

    <section>
      <h2>Key Highlights of The Valley by Emaar</h2>
      <ul>
        <li>Nature-inspired master community spanning over 200 hectares</li>
        <li>3-4 bedroom townhouses and standalone villas available</li>
        <li>Multiple phases including Eden, Farm Gardens, Rivana, and more</li>
        <li>Direct access to Dubai–Al Ain Road (E66) highway</li>
        <li>Family-focused amenities and community living</li>
        <li>Self-sustained community with retail, dining, and recreation</li>
        <li>Green buffers between neighborhoods for privacy</li>
        <li>Pedestrian-friendly pathways and cycling routes</li>
        <li>Comparison to other Emaar communities like Dubai Hills Estate</li>
      </ul>
    </section>

    <section>
      <h2>Why Choose The Valley by Emaar?</h2>
      <p>
        The Valley offers a unique suburban lifestyle that combines the
        convenience of modern amenities with the tranquility of nature-inspired
        living. As a development by Emaar Properties, a leading real estate
        company in Dubai, buyers can expect quality construction, thoughtful
        community planning, and long-term value appreciation. Whether you&apos;re
        looking for a family home or an investment property in Dubai&apos;s real
        estate market, The Valley presents a compelling option with its
        strategic location, comprehensive amenities, and community-focused
        design.
      </p>
    </section>
  </div>
);

export default function TheValleyPage() {
  const pixelId =
    process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hidden SEO content rendered on server for search engines */}
      <HiddenSEOContent />

      {/* Main Client Component with Interactive Features */}
      <TheValley pixelId={pixelId} />
    </>
  );
}