import React from "react";
import OurStoryPage from "@/components/pages/OurStoryPage";
import Script from "next/script";

export const metadata = {
  title: "Our Story - 25+ Years of Global Excellence | H&S Real Estate",
  description:
    "Discover H&S Real Estate's 25+ years of expertise in UAE's property market, part of Haqsons Group, with a global presence across 4 countries.",
};

function page() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://hsproperty.ae/#website",
        url: "https://hsproperty.ae/",
        name: "H&S Real Estate",
        publisher: { "@id": "https://hsproperty.ae/#organization" },
      },
      {
        "@type": "AboutPage",
        "@id": "https://hsproperty.ae/our-story#webpage",
        name: "Our Story — H&S Real Estate Dubai | 25+ Years of Excellence",
        url: "https://hsproperty.ae/our-story",
        inLanguage: "en-US",
        description:
          "H&S Real Estate — established 1999, part of Haqsons Group with presence in UAE, Pakistan, Angola and Japan. 150+ industry awards and over USD 1 billion in property sales.",
        isPartOf: { "@id": "https://hsproperty.ae/#website" },
        mainEntity: { "@id": "https://hsproperty.ae/#organization" },
        breadcrumb: {
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
              name: "Our Story",
              item: "https://hsproperty.ae/our-story",
            },
          ],
        },
      },
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": "https://hsproperty.ae/#organization",
        name: "H&S Real Estate",
        url: "https://hsproperty.ae",
        slogan: "Making Your Dreams A Reality",
        foundingDate: "1999",
        parentOrganization: { "@type": "Organization", name: "Haqsons Group" },
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
          maxValue: 200,
        },
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
        },
        areaServed: ["AE", "PK", "AO", "JP"],
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+97143454888",
            email: "info@hsproperty.ae",
            areaServed: "AE",
            availableLanguage: ["English"],
          },
        ],
        award: [
          "Emaar Top Sales Award (2024)",
          "Dubai Land Department & RERA Gold Award (2021, 2022)",
          "Tilal Al Ghaf Top Performing Partner Award (2021)",
        ],
        sameAs: [
          "https://www.instagram.com/hs_property/",
          "https://www.facebook.com/hspropertyrealestate/",
          "https://www.youtube.com/@HSRealEstate",
          "https://www.tiktok.com/@hsrealestatedubai",
          "https://x.com/hspropertydubai",
        ],
      },
    ],
  };
  return (
    <div>
      <Script
        id="our-story-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <OurStoryPage />
    </div>
  );
}

export default page;
