import ServicesPage from "@/components/pages/ServicesPage";
import { articleGraphJsonLd } from "@/lib/articleGraphJsonLd";
import Script from "next/script";
import React from "react";

export const metadata = {
  title: "Real Estate Services Dubai | H&S Real Estate",
  description:
    "Explore professional services in the UAE, including company registration, bank account opening, visa support, tax residency, and golden visa assistance.",
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Real Estate Services Dubai | H&S Real Estate",
  url: "https://hsproperty.ae/services",
  description:
    "Comprehensive real estate services: off-plan sales, luxury properties, management, mortgage advisory, Golden Visa.",
  serviceType: "RealEstate",
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
    serviceUrl: "https://hsproperty.ae/services",
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
        name: "Real Estate Services Dubai",
        item: "https://hsproperty.ae/services",
      },
    ],
  },
};

const servicesJsonLd = articleGraphJsonLd(servicesStructuredData);

function page() {
  return (
    <div>
      {servicesJsonLd ? (
        <Script
          id="services-real-estate-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesJsonLd),
          }}
        />
      ) : null}
      <ServicesPage />
    </div>
  );
}

export default page;
