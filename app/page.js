import HomePage from "@/components/pages/HomePage";
import React from "react";
import Script from "next/script";
import { getBrandsIndex } from "@/lib/brands";
import { getBrandLogoSrc } from "@/data/brand-profiles";

export const metadata = {
  title: "H&S Real Estate Dubai | UAE's #1 Luxury Property Brokerage",
  description:
    "Buy, sell & invest in Dubai luxury real estate with H&S — UAE's award-winning brokerage. Off-plan, secondary market & exclusive listings. Call us today.",
  alternates: {
    canonical: "https://hsproperty.ae/",
  },
};

export default function Page() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hsproperty.ae/#organization",
    name: "H&S Real Estate",
    url: "https://hsproperty.ae/",
    logo: {
      "@type": "ImageObject",
      url: "https://hsproperty.ae/_next/image?q=90&url=%2Flogos-icons%2FH%26S-Dubai-Logo-Black.png&w=3840",
      width: 800,
      height: 200,
    },
    slogan: "Discover your future with Best Real Estate Company in Dubai",
    email: "info@hsproperty.ae",
    telephone: "+971-4-345-4888",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971-4-345-4888",
        email: "info@hsproperty.ae",
        contactType: "customer service",
        areaServed: "AE",
        availableLanguage: ["en"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/hs_property/",
      "https://www.facebook.com/hspropertyrealestate/",
      "https://www.youtube.com/@HSRealEstate",
      "https://www.tiktok.com/@hsrealestatedubai",
      "https://x.com/hspropertydubai",
    ],
  };

  const homeFeaturedBrands = getBrandsIndex().map((b) => ({
    ...b,
    logoSrc: getBrandLogoSrc(b.slug),
  }));

  return (
    <>
      <Script
        id="json-ld-organization-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <HomePage homeFeaturedBrands={homeFeaturedBrands} />
    </>
  );
}
