import React from "react";
import ClientReviewsPage from "@/components/pages/ClientReviewsPage";
import Script from "next/script";
import { googleReviews } from "@/data/google-reviews";
import { mapGoogleReviewsForDisplay } from "@/lib/map-google-reviews";

export const metadata = {
  title: "Client Reviews - Trusted Testimonials | H&S Real Estate",
  description:
    "Read client reviews about H&S Real Estate. Discover why investors trust us for exceptional service, expert advice, and successful property investments worldwide.",
};

function page() {
  const displayReviews = mapGoogleReviewsForDisplay(googleReviews);
  const schemaReviewSamples = displayReviews.slice(0, 6).map((rev, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      author: { "@type": "Person", name: rev.name },
      reviewBody: rev.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.rating,
        bestRating: 5,
      },
      inLanguage: "en",
      itemReviewed: { "@id": "https://hsproperty.ae/#organization" },
    },
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemPage",
        "@id": "https://hsproperty.ae/client-reviews#webpage",
        name: "Client Reviews & Testimonials — H&S Real Estate Dubai",
        url: "https://hsproperty.ae/client-reviews",
        description:
          "Read genuine client testimonials from investors and homeowners who chose H&S Real Estate for their Dubai property journey.",
        mainEntity: { "@id": "https://hsproperty.ae/#organization" },
        about: { "@id": "https://hsproperty.ae/client-reviews#reviews" },
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
              name: "Client Reviews",
              item: "https://hsproperty.ae/client-reviews",
            },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://hsproperty.ae/client-reviews#reviews",
        name: "Latest client testimonials",
        numberOfItems: displayReviews.length,
        itemListElement: schemaReviewSamples,
      },
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": "https://hsproperty.ae/#organization",
        name: "H&S Real Estate",
        url: "https://hsproperty.ae/",
      },
    ],
  };
  return (
    <div>
      <Script
        id="client-reviews-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ClientReviewsPage />
    </div>
  );
}

export default page;
