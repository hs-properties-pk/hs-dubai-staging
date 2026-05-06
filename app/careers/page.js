import React from "react";
import Script from "next/script";
import CareerPage from "@/components/pages/CareerPage";

export const metadata = {
  title: "Real Estate Careers Dubai | Join H&S Real Estate Team",
  description:
    "Build your real estate career with H&S Dubai — UAE's #1 brokerage. Agent, broker & marketing roles available. Competitive commission structure. Apply now.",
};

const careersSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers — H&S Real Estate Dubai",
  url: "https://hsproperty.ae/careers",
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
        name: "Careers",
        item: "https://hsproperty.ae/careers",
      },
    ],
  },
};

function page() {
  return (
    <div>
      <Script
        id="careers-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
      />
      <CareerPage />
    </div>
  );
}

export default page