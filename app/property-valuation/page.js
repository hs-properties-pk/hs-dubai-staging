import PropertyValuationPage from "@/components/pages/PropertyValuationPage";
import { articleGraphJsonLd } from "@/lib/articleGraphJsonLd";
import Script from "next/script";
import React from "react";

export const metadata = {
  title: "Property Valuation in Dubai | H&S Real Estate",
  description:
    "Elevate Your Dubai Real Estate with H&S Real Estate Valuation Services: Expert brokers delivering accurate property valuations for informed decisions.",
};

const propertyValuationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Property Valuation Dubai | H&S Real Estate",
  url: "https://hsproperty.ae/property-valuation",
  description:
    "Professional RERA-certified property valuation in Dubai for buying, selling, and mortgage.",
  serviceType: "Appraisal",
  provider: {
    "@type": "RealEstateAgent",
    name: "H&S Real Estate",
    url: "https://hsproperty.ae",
    telephone: "+97143454888",
    email: "info@hsproperty.ae",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://hsproperty.ae/property-valuation",
    servicePhone: "+97143454888",
  },
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
        name: "Property Valuation Dubai",
        item: "https://hsproperty.ae/property-valuation",
      },
    ],
  },
};

const propertyValuationJsonLd = articleGraphJsonLd(
  propertyValuationStructuredData
);

function page() {
  return (
    <div>
      {propertyValuationJsonLd ? (
        <Script
          id="property-valuation-service-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertyValuationJsonLd),
          }}
        />
      ) : null}
      <PropertyValuationPage />
    </div>
  );
}

export default page;
