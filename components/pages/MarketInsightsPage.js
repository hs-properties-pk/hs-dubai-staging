"use client";
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import MarketInsights from "@/components/MarketInsights";
import PremiumPageHero from "../PremiumPageHero";

function MarketInsightsPage() {
  return (
    <div className="overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/market-insights-bg.jpg"
        imageAlt="Dubai real estate market insights"
        eyebrow="Data-driven insights"
        titleBefore="Market Insights"
        description="Stay ahead in Dubai: reports, trends, and analysis from a No.1 DLD-recognized team trusted by 25+ top developers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Market insights", href: null },
        ]}
        stats={[
          { value: "$1B+", label: "Record Sales" },
          { value: "30min", label: "Response Time" },
          { value: "100k+", label: "Happy Clients" },
          { value: "30+", label: "Years Experience" },
        ]}
      />
      <SectionHeading
        title="Latest Market Insights"
        subTitle="Catch Up with H&S! Stay updated through our latest market insights "
      />
      <MarketInsights />
      <Footer />
    </div>
  );
}

export default MarketInsightsPage;
