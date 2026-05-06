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
import BlogDetailSidebar from "@/components/BlogDetailSidebar";
import HomeHeroHeading from "../HomeHeroHeading";

const BlogDetailPageNew = ({ postData, moreData }) => {

  const [showAll, setShowAll] = useState(false);
  const type = "blogs";

  const currentPath = postData ? `/blogs/${postData.id}` : "";
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`https://hsproperty.ae${currentPath}`);
    toast("Link copied to clipboard!");
  };

  if (!postData) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl md:text-6xl font-light mb-4">Blog Not Found</h1>
        <p className="text-lg mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/blogs"
          className="px-6 py-3 bg-black text-white hover:bg-gray-800 duration-300 rounded-lg tracking-wider"
        >
          Back to Blogs
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <div className="overflow-x-clip">
      <HomeHeroHeading image={postData.image} />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 font-custom2">
        <Fade bottom duration={1500}>
          <div className=" pt-10 md:pt-14 font-custom text-black">
            <h1 className="text-3xl md:text-6xl font-light capitalize">
              {postData.title}
            </h1>
          </div>
        </Fade>
        <div className=" w-full flex flex-col lg:flex-row items-start  lg:items-center justify-between gap-4 my-4 md:my-10">
          <div className="flex flex-row lg:flex-col justify-between md:gap-10  bg-[#F8F8F8] shadow-md  p-2 lg:p-4 rounded-lg w-full lg:w-max">
            <p className="text-sm  py-[2px] px-2  border border-black rounded-xl w-max">
              Blog
            </p>
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

        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_min(100%,380px)] lg:gap-10 lg:items-start">
          <div className="min-w-0">
            <ToastContainer autoClose={2000} />
            <div
              className="w-full text-base md:text-lg tracking-wider flex flex-col gap-6 text-black blog-description"
              dangerouslySetInnerHTML={{ __html: postData.details }}
            />
          </div>
          <aside className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none mt-10 lg:mt-0 lg:sticky lg:top-32 self-start shrink-0">
            <BlogDetailSidebar />
          </aside>
        </div>
      </div>

      <SectionSubHeading title="Other Blogs" />

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 pb-8 ">
        {moreData.slice(0, showAll ? moreData.length : 3).map((blog, index) => (
          <Fade bottom duration={1000 + index * 200} key={index}>
            <BlogCardOriginal
              imageSrc={blog.image}
              date={blog.date}
              title={blog.title}
              id={blog.id}
              type={type}
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
};

export default BlogDetailPageNew;