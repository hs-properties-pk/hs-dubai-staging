"use client";

import React from "react";
import BlogCard from "./BlogCard";
import Fade from "react-reveal/Fade";
import BlogCardOriginal from "./BlogCardOriginal";
import Footer from "@/components/Footer";
// import HomeHeroHeading from "@/components/HomeHeroHeading";
import PremiumPageHero from "@/components/PremiumPageHero";
import SectionHeading from "@/components/SectionHeading";
import BlogListingSidebar from "@/components/BlogListingSidebar";

const BlogNew = ({ blogs }) => {
  const type = "blogs";
  const list = Array.isArray(blogs) ? blogs : [];
  const remaining = list.slice(5);
  const hasMorePosts = remaining.length > 0;

  return (
    <div className="overflow-x-clip">
      {/* Previous hero (full-bleed image + centered PageHeading):
      <HomeHeroHeading image="/Bg-Imgs/blog-bg.jpg" title="Blogs" />
      */}
      <PremiumPageHero
        image="/Bg-Imgs/blog-hero.webp"
        imageAlt="H&S Real Estate blogs"
        eyebrow="Best real estate company in Dubai"
        titleBefore="Discover your future with H&S Real Estate"
        tagline="Your dream home awaits."
        description="Dubai's most trusted real estate agency. Premium off-plan properties and luxury developments across the UAE and beyond—insights, guides, and stories here on our blog."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: null },
        ]}
        stats={[
          { value: "$1B+", label: "Record sales" },
          { value: "25+", label: "Years experience" },
          { value: "35+", label: "Industry awards" },
          { value: "4", label: "Countries" },
        ]}
      />
      <SectionHeading
        title="Latest Blogs"
        subTitle="Catch Up with H&S! Stay updated through our latest blogs "
      />
      <div className="pb-20 md:pb-24">
        {list.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full px-4">
            No blogs available at the moment. Please check back later.
          </p>
        ) : (
          <div className="max-w-screen-3xl mx-auto px-4 md:px-6">
            {/* Mobile: full card grid, then sidebar */}
            <div className="md:hidden space-y-8 sm:space-y-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
                {list.map((blog, index) => (
                  <Fade bottom duration={1000 + index * 200} key={index}>
                    <BlogCardOriginal
                      type={type}
                      imageSrc={blog.imageSrc}
                      date={blog.date}
                      title={blog.title}
                      id={blog.id}
                    />
                  </Fade>
                ))}
              </div>
              <BlogListingSidebar />
            </div>

            {/* Desktop: hero feature row full width, then remainder + sidebar */}
            <div className="hidden md:block">
              <div className="grid md:grid-cols-6 md:gap-4 lg:gap-5 xl:gap-4">
                <div className="md:col-span-4 min-w-0">
                  {list[0] && (
                    <Fade left duration={1500}>
                      <BlogCard
                        type={type}
                        imageSrc={list[0].imageSrc}
                        date={list[0].date}
                        title={list[0].title}
                        id={list[0].id}
                        large
                      />
                    </Fade>
                  )}
                </div>
                <div className="md:col-span-2 min-w-0 space-y-3 md:space-y-3.5">
                  {list.slice(1, 5).map((blog, index) => (
                    <Fade right duration={1000 + index * 200} key={index}>
                      <BlogCard
                        type={type}
                        imageSrc={blog.imageSrc}
                        date={blog.date}
                        title={blog.title}
                        id={blog.id}
                      />
                    </Fade>
                  ))}
                </div>
              </div>

              <div
                className={`pt-8 md:pt-9 lg:pt-10 flex flex-col lg:flex-row lg:gap-10 lg:items-start ${!hasMorePosts ? "lg:justify-end" : ""}`}
              >
                {hasMorePosts && (
                  <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
                    {remaining.map((blog, index) => (
                      <Fade
                        bottom
                        duration={1000 + index * 200}
                        key={index}
                      >
                        <BlogCardOriginal
                          type={type}
                          imageSrc={blog.imageSrc}
                          date={blog.date}
                          title={blog.title}
                          id={blog.id}
                        />
                      </Fade>
                    ))}
                  </div>
                )}
                <aside className="w-full max-w-md mx-auto lg:mx-0 shrink-0 mt-8 lg:mt-0 lg:max-w-[min(100%,380px)] lg:sticky lg:top-32 self-start">
                  <BlogListingSidebar />
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogNew;
