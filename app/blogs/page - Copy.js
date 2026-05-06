import React from "react";
import BlogPage from "@/components/pages/BlogPage";

export const metadata = {
  title: "Dubai Real Estate Insights & Tips | H&S Real Estate",
  description:
    "Discover expert insights, tips, and guides on Dubai’s real estate market. Explore blogs by H&S Real Estate to make informed property decisions.",
};

function page() {
  return (
    <div>
      <BlogPage />
    </div>
  );
}

export default page;
