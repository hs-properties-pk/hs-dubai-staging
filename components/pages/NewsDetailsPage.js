"use client";
import Footer from "@/components/Footer";
import SectionSubHeading from "@/components/SectionSubHeading";
import Link from "next/link";
import {
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import { Fade } from "react-reveal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import BlogCardOriginal from "@/components/BlogCardOriginal";
import HomeHeroHeading from "../HomeHeroHeading";
import { newsData as newsPosts } from "@/data/news-data";

export default function NewsDetailsPage({ params }) {
  const [showAll, setShowAll] = useState(false);
  let postData = {};
  let moreData = [];

  postData = newsPosts.find((item) => item.id === params.newsId);
  moreData = newsPosts.filter((item) => item.id !== params.newsId);

  // If post not found, show error message
  if (!postData) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl md:text-6xl font-light mb-4">News Not Found</h1>
        <p className="text-lg mb-8">The news article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/news" className="px-6 py-3 bg-black text-white hover:bg-gray-800 duration-300 rounded-lg tracking-wider">
          Back to News
        </Link>
        <Footer />
      </div>
    );
  }

  const currentPath = `/news/${params.newsId}`;
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`https://hsproperty.ae${currentPath}`);
    toast("Link copied to clipboard!");
  };

  return (
    <div>
      <HomeHeroHeading image={postData.image} />

      <div className="max-w-screen-2xl mx-auto  px-4 md:px-6 font-custom2">
        <Fade bottom duration={1500}>
          <div className=" pt-10 md:pt-14 font-custom text-black">
            <h1 className="text-3xl md:text-6xl font-light capitalize">
              {postData.title}
            </h1>
          </div>
        </Fade>
        <div className=" w-full flex flex-col lg:flex-row items-start  lg:items-center justify-between gap-4 my-4 md:my-10">
          <div className="flex flex-row lg:flex-col justify-between md:gap-10  bg-[#F8F8F8] shadow-md  p-2 lg:p-4 rounded-lg w-full lg:w-max">
            <h2 className="text-sm  py-[2px] px-2  border border-black rounded-xl w-max">
              News
            </h2>
            <span className=" text-black font-bold tracking-wider">
              Published: <span className="font-normal">{postData.date}</span>
            </span>
          </div>

          <div className="bg-[#F8F8F8] p-2 lg:p-4  shadow-md w-full lg:w-max h-max rounded-lg">
            <div className="flex flex-col justify-between ">
              <p className="text-sm  py-[2px] px-2  border border-black rounded-xl w-max">
                Share this
              </p>
              <div className="mt-6 grid grid-cols-6 social-icons gap-2 lg:gap-4">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://hsproperty.ae${currentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facebook"
                >
                  <RiFacebookFill size="2em" fill="white" />
                </Link>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <FaInstagram size="2em" fill="white" />
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?text=Check this out: https://hsproperty.ae${currentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp"
                >
                  <FaWhatsapp size="2em" fill="white" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://hsproperty.ae${currentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin"
                >
                  <FaLinkedinIn size="2em" fill="white" />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=https://hsproperty.ae${currentPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="twitter"
                >
                  <FaXTwitter size="2em" fill="white" />
                </Link>
                <button onClick={copyLinkToClipboard} className="link">
                  <FaLink size="2em" fill="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ToastContainer autoClose={2000} />
          <Fade right duration={1500}>
            <div
              className="w-full text-base md:text-lg tracking-wider flex flex-col gap-6 text-black blog-description"
              dangerouslySetInnerHTML={{ __html: postData.details }}
            />
          </Fade>
        </div>
      </div>
      <SectionSubHeading title="Other News" />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 pb-8 ">
        {moreData.slice(0, showAll ? moreData.length : 3).map((blog, index) => (
          <Fade bottom duration={1000 + index * 200} key={index}>
            <BlogCardOriginal
              imageSrc={blog.image}
              date={blog.date}
              title={blog.title}
              id={blog.id}
              type={blog.type}
            />
          </Fade>
        ))}
      </div>
      <Fade bottom duration={1500}>
        <div className="flex justify-center pb-16 font-custom2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-black text-white  hover:bg-gray-800 duration-300 rounded-lg tracking-wider"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      </Fade>
      <Footer />
    </div>
  );
}
