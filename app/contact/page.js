import React from "react";
import ContactPage from "@/components/pages/ContactPage";
import Script from "next/script";

export const metadata = {
  title:
    "Contact H&S Real Estate | Get in Touch with Dubai's Property Professionals",
  description:
    "Contact H&S Real Estate for all your property needs in Dubai. Reach out to our expert team for personalized assistance and professional real estate solutions.",
};

function page() {
  /** Merged Contact JSON-LD: ContactPage copy + hours from your spec; @graph + Organization extras Google uses (logo, map, contactPoint, sameAs). */
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://hsproperty.ae/contact#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://hsproperty.ae/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: "https://hsproperty.ae/contact",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://hsproperty.ae/#website",
        url: "https://hsproperty.ae/",
        name: "H&S Real Estate",
        publisher: { "@id": "https://hsproperty.ae/#organization" },
      },
      {
        "@type": "ContactPage",
        "@id": "https://hsproperty.ae/contact#webpage",
        url: "https://hsproperty.ae/contact",
        name: "Contact H&S Real Estate Dubai",
        inLanguage: "en-US",
        description:
          "Contact H&S Real Estate for property inquiries, free consultations, and expert advice. Visit us in Al Barsha 2, Dubai.",
        isPartOf: { "@id": "https://hsproperty.ae/#website" },
        breadcrumb: { "@id": "https://hsproperty.ae/contact#breadcrumbs" },
        about: { "@id": "https://hsproperty.ae/#organization" },
        mainEntity: { "@id": "https://hsproperty.ae/#organization" },
      },
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": "https://hsproperty.ae/#organization",
        name: "H&S Real Estate",
        url: "https://hsproperty.ae/",
        logo: {
          "@type": "ImageObject",
          url: "https://hsproperty.ae/logos-icons/H&S-Dubai-Logo-Black.png",
        },
        image: "https://hsproperty.ae/logos-icons/H&S-Dubai-Logo-Black.png",
        email: "info@hsproperty.ae",
        telephone: "+97143454888",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        hasMap:
          "https://www.google.com/maps/place/H%26S+Real+Estate/@25.1079019,55.223372",
        areaServed: ["AE"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: "+97143454888",
            email: "info@hsproperty.ae",
            areaServed: "AE",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: "+971526902884",
            url: "https://wa.me/971526902884",
            areaServed: "AE",
            availableLanguage: ["English"],
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
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
        id="contact-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ContactPage />
    </div>
  );
}

export default page;
