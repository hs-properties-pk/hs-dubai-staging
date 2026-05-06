import BlogDetailPageNew from "@/components/pages/BlogDetailPage-new";
import { getBlogData } from "@/lib/fetchBlogData";
import React from "react";

async function fetchBlogDataOnce(blogId) {
  const blogData = await getBlogData();
  const postData = blogData.find((item) => item.id === blogId) || null;
  const moreData = blogData.filter((item) => item.id !== blogId);

  return { postData, moreData };
}

export async function generateMetadata({ params }) {
  const { postData } = await fetchBlogDataOnce(params.blogId);

  return {
    title: postData?.meta_title || "",
    description: postData?.meta_description || "",
  };
}

async function Page({ params }) {
  const { postData, moreData } = await fetchBlogDataOnce(params.blogId);

  return (
    <div>
      <BlogDetailPageNew postData={postData} moreData={moreData} />
    </div>
  );
}

export default Page;
