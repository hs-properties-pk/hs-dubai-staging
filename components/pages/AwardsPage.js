"use client";

import React from "react";
import Footer from "@/components/Footer";
import PremiumPageHero from "../PremiumPageHero";
import AwardsBreakdownSection from "../AwardsBreakdownSection";
import AwardsHistorySection from "../AwardsHistorySection";
import AwardsYearShowcase from "../AwardsYearShowcase";
import AwardsLeaderAndFaqSection from "../AwardsLeaderAndFaqSection";
import AwardsCtaSection from "../AwardsCtaSection";

export default function AwardsPage() {
  return (
    <div className="overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/award-bg.jpg"
        imageAlt="H&S Real Estate awards and recognition"
        eyebrow="Recognized Excellence · 2016 — 2025"
        headline={
          <>
            <span className="block text-white">Dubai&apos;s Most</span>
            <span className="block text-white">Awarded Real Estate</span>
            <span className="block text-white">Brokerage</span>
          </>
        }
        description="150+ verified industry awards from Emaar, Dubai Land Department, Nakheel, Meraas, DAMAC, Tilal Al Ghaf and more — 10 consecutive years of No.1 performance."
        stats={[
          { value: "150+", label: "Total Awards" },
          { value: "10", label: "Consecutive Years" },
          { value: "15+", label: "Award Bodies" },
          { value: "$1B+", label: "Sales Record" },
        ]}
      />
      <main className="bg-white">
        <AwardsBreakdownSection />
        <AwardsYearShowcase />
        <AwardsHistorySection />
        <AwardsLeaderAndFaqSection />
        <AwardsCtaSection />
      </main>
      <Footer />
    </div>
  );
}
