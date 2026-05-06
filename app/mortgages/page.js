import MortgagesPage from "@/components/pages/MortgagesPage";
import { articleGraphJsonLd } from "@/lib/articleGraphJsonLd";
import Script from "next/script";
import React from "react";

export const metadata = {
  title:
    "Mortgage Broker in Dubai | Expert Mortgage Advisors | H&S Real Estate",
  description:
    "Find the best mortgage broker in Dubai with H&S Real Estate. Get expert mortgage advice, use our mortgage calculator, and secure the right financing for your dream property.",
};

const mortgagesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mortgage Broker Dubai | H&S Real Estate",
  url: "https://hsproperty.ae/mortgages",
  description:
    "Expert mortgage advisory in Dubai. Compare UAE bank rates, get pre-approval, and secure the best mortgage.",
  serviceType: "MortgageLoan",
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
    serviceUrl: "https://hsproperty.ae/mortgages",
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
        name: "Mortgage Broker Dubai",
        item: "https://hsproperty.ae/mortgages",
      },
    ],
  },
};

const mortgagesJsonLd = articleGraphJsonLd(mortgagesStructuredData);

function page() {
  return (
    <div>
      {mortgagesJsonLd ? (
        <Script
          id="mortgages-service-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(mortgagesJsonLd),
          }}
        />
      ) : null}
      <MortgagesPage />
    </div>
  );
}

export default page;
