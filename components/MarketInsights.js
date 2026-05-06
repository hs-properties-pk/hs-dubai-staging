import React from "react";
import MarketInsightsCard from "./MarketInsightsCard";
import { Fade } from "react-reveal";

const MarketInsights = () => {
  const newsData = [
    {
      id: "opportunity-cost-transforming-capex-investment-into-asset-value",
      subtitle: "Hotel Asset Management Insights",
      image: "/market-insights/1.webp", // Replace with actual image URLs
      date: "August 13, 2024",
      title:
        "Opportunity cost - transforming capex investment into asset value",
    },
    {
      id: "transaction-volumes-continue-to-soar-and-reach-new-records",
      subtitle: "Dubai Residential Market Notes",
      image: "/market-insights/2.webp",
      date: "July 1, 2024",
      title: "Transaction volumes continue to soar and reach new records",
    },
    {
      id: "middle-east-real-estate-2024-outlook",
      subtitle: "Middle East Real Estate Market Notes",
      image: "/market-insights/3.webp",
      date: "March 4, 2024",
      title: "Middle East Real Estate 2024 Outlook",
    },
    {
      id: "dubais-aed-5m-property-market-hits-record-in-2023",
      subtitle: "UAE Residential Market Notes",
      image: "/market-insights/4.webp",
      date: "January 11, 2024",
      title: "Dubai's AED 5M+ Property Market Hits Record in 2023",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsData.map((news, index) => (
          <Fade bottom duration={1000 + index * 200} key={index}>
            <MarketInsightsCard {...news} />
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default MarketInsights;
