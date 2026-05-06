"use client";
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import HomeHeroHeading from "../HomeHeroHeading";

function BlogPage() {
  return (
    <div className="overflow-hidden">
      <HomeHeroHeading image="/Bg-Imgs/blog-bg.jpg" title="Blogs" />
      <SectionHeading
        title="Latest Blogs"
        subTitle="Catch Up with H&S! Stay updated through our latest blogs "
      />
      <div className="pb-20 md:pb-24">
        <Blog />
      </div>

      <Footer />
    </div>
  );
}

export default BlogPage;
