import React from "react";
import BlogNew from '../../components/Blog-new';
import { getBlogLinks } from "@/lib/fetchBlogLinks";

async function fetchBlogListOnce() {
  const blogs = await getBlogLinks();
  return { blogs };
}

export const metadata = {
  title: "Dubai Real Estate Insights & Tips | H&S Real Estate",
  description:
    "Discover expert insights, tips, and guides on Dubai’s real estate market. Explore blogs by H&S Real Estate to make informed property decisions.",
};

async function Page() {
  const { blogs } = await fetchBlogListOnce();

  return (
    <div>
      <BlogNew blogs={Array.isArray(blogs) ? blogs : []} />
    </div>
  );
}

export default Page;
