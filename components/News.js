import React from "react";
import BlogCard from "./BlogCard";
import Fade from "react-reveal/Fade";
import BlogCardOriginal from "./BlogCardOriginal";
import { newsData } from "@/data/news-data";

const News = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8   ">
        {newsData.map((blog, index) => (
          <Fade bottom duration={1000 + index * 200} key={index}>
            <BlogCardOriginal
              type={blog.type}
              imageSrc={blog.image}
              date={blog.date}
              title={blog.title}
              id={blog.id}
            />
          </Fade>
        ))}
      </div>
      <div className="hidden md:block ">
        <div className="grid lg:grid-cols-6 gap-4">
          <div className="lg:col-span-4">
            <Fade left duration={1500}>
              <BlogCard
                type={newsData[0].type}
                imageSrc={newsData[0].image}
                date={newsData[0].date}
                title={newsData[0].title}
                id={newsData[0].id}
                news
                large
              />
            </Fade>
          </div>
          <div className="lg:col-span-2 space-y-3.5">
            {newsData.slice(1, 5).map((blog, index) => (
              <Fade right duration={1000 + index * 200} key={index}>
                <BlogCard
                  type={blog.type}
                  imageSrc={blog.image}
                  date={blog.date}
                  title={blog.title}
                  id={blog.id}
                  news
                />
              </Fade>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {newsData.slice(5, newsData.length).map((blog, index) => (
            <Fade bottom duration={1000 + index * 200} key={index}>
              <BlogCardOriginal
                type={blog.type}
                imageSrc={blog.image}
                date={blog.date}
                title={blog.title}
                id={blog.id}
                news
              />
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
