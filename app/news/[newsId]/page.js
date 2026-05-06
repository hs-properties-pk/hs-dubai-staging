import NewsDetailsPage from "@/components/pages/NewsDetailsPage";
import React from "react";
import { newsData as newsPosts } from "@/data/news-data";

export async function generateMetadata({ params }) {
  let postData = {};
  postData = newsPosts.find((item) => item.id === params.newsId);
  let title = "";
  let description = "";
  if (postData) {
    title = postData.metaTitle || title;
    description = postData.metaDescription || description;
  }
  return {
    title,
    description,
  };
}

function Page({ params }) {
  return (
    <div>
      <NewsDetailsPage params={params} />
    </div>
  );
}

export default Page;
