import React from "react";
import NewsAndVideosPage from "@/components/pages/NewsAndVideosPage";

export const metadata = {
  title: "Latest Real Estate News in Dubai | H&S Real Estate",
  description:
    "Stay updated with the latest real estate news in Dubai. Explore latest news and market updates from H&S Real Estate, your trusted property experts.",
};

function page() {
  return (
    <div>
      <NewsAndVideosPage />
    </div>
  );
}

export default page;
