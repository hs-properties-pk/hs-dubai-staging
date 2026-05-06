import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Fade } from "react-reveal";

const PageLinks = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-6 max-w-screen-2xl mx-auto font-custom2 pt-12 md:pt-16 pb-16 md:pb-24">
      {/* <Fade bottom duration={1200}> */}
      <Link
        href="/area-guides"
        className="h-full flex flex-col justify-between gap-10"
      >
        <div className="flex flex-col gap-4 ">
          <div className="text-black flex justify-between items-center">
            <p className="text-3xl font-medium font-custom">Area Guides</p>
            <GoArrowUpRight size="1.6em" />
          </div>
          <p className="text-gray-600 tracking-wider">
            Explore Dubai’s neighborhoods with up-to-date market insights and
            detailed property data at your fingertips.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
            src="/page-links/Image-5.jpg"
            alt="Property Worth"
            className="w-full h-64  rounded-lg object-cover shadow-md hover:scale-105 duration-300"
            loading="lazy"
            quality={65}
          />
        </div>
      </Link>
      {/* </Fade> */}
      {/* <Fade bottom duration={1300}> */}
      <Link
        href="/news"
        className="h-full flex flex-col justify-between gap-10 "
      >
        <div className="flex flex-col gap-4 ">
          <div className="text-black flex justify-between items-center">
            <p className="text-3xl font-medium font-custom capitalize">
              News & Videos
            </p>
            <GoArrowUpRight size="1.6em" />
          </div>
          <p className="text-gray-600 tracking-wider">
            Stay ahead with the latest updates on Dubai’s real estate market,
            with insightful news and event coverage videos.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
            src="/page-links/Image-2.jpg"
            alt="Property Worth"
            className="w-full h-64 rounded-lg object-cover shadow-md hover:scale-105 duration-300"
            loading="lazy"
            quality={65}
          />
        </div>
      </Link>
      {/* </Fade> */}
      {/* <Fade bottom duration={1400}> */}
      <Link
        href="/blogs"
        className="h-full flex flex-col justify-between gap-10 "
      >
        <div className="flex flex-col gap-4 ">
          <div className="text-black flex justify-between items-center">
            <p className="text-3xl font-medium font-custom capitalize">Blogs</p>
            <GoArrowUpRight size="1.6em" />
          </div>
          <p className="text-gray-600 tracking-wider">
            Stay in the know with insights from our team of experts on trending
            real estate topics in our blog section.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
            src="/page-links/Image-3.jpg"
            alt="Property Worth"
            className="w-full h-64 rounded-lg object-cover shadow-md hover:scale-105 duration-300"
            loading="lazy"
            quality={65}
          />
        </div>
      </Link>
      {/* </Fade> */}
      {/* <Fade bottom duration={1500}> */}
      <Link
        href="/careers"
        className="h-full flex flex-col justify-between gap-10"
      >
        <div className="flex flex-col gap-4 ">
          <div className="text-black flex justify-between items-center gap-16">
            <p className="text-3xl font-medium font-custom">Careers</p>
            <GoArrowUpRight size="1.6em" />
          </div>
          <p className="text-gray-600 tracking-wider">
            Become part of our journey in shaping Dubai’s property market
            explore exciting career opportunities with us.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
            src="/page-links/Image-4.jpg"
            alt="Property Worth"
            className="w-full h-64 rounded-lg object-cover shadow-md hover:scale-105 duration-300"
            loading="lazy"
            quality={65}
          />
        </div>
      </Link>
      {/* </Fade> */}
    </div>
  );
};

export default PageLinks;
