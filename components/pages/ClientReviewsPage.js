"use client";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";
import React, { useMemo } from "react";
import PremiumPageHero from "../PremiumPageHero";
import { googleReviews } from "@/data/google-reviews";
import { mapGoogleReviewsForDisplay } from "@/lib/map-google-reviews";

const ClientReviewsPage = () => {
  const reviews = useMemo(
    () => mapGoogleReviewsForDisplay(googleReviews),
    []
  );

  return (
    <div>
      <PremiumPageHero
        image="/Bg-Imgs/client-reviews-bg.jpg"
        imageAlt="H&S Real Estate — client reviews"
        eyebrow="What clients say"
        titleBefore="Client Reviews"
        description="For over 25 years we’ve been creating opportunities and delivering results—read genuine Google reviews from investors and homeowners."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Client reviews", href: null },
        ]}
        stats={[
          { value: "300+", label: "Client reviews" },
          { value: "25+", label: "Years experience" },
          { value: "No.1", label: "DLD — UAE 2025" },
          { value: "150+", label: "Industry awards" },
        ]}
      />
      <div className="bg-gradient-to-b from-neutral-50/80 to-white py-10 md:py-16 font-custom2">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-medium text-black font-custom text-center mt-4">
            See What Our Clients Say
          </h2>
          <p className="text-neutral-600 mt-8 mb-10 md:mb-12 text-lg max-w-screen-lg mx-auto tracking-wide text-center leading-relaxed font-custom3">
            For over 25 years, we&apos;ve been creating opportunities and
            delivering exceptional results. Here are real Google reviews from our
            satisfied clients.
          </p>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {reviews.map((review) => (
              <li key={review.id} className="min-w-0 list-none">
                <ReviewCard {...review} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientReviewsPage;
