"use client";

import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { usePathname } from "next/navigation";
import { Slide } from "react-reveal";

const PageHeading = ({ title, subTitle }) => {
  let currentPath = usePathname();
  if (currentPath.substring(1).includes("/")) {
    currentPath = currentPath
      .substring(1)
      .replace(/\s*\/\s*/, " ")
      .replace("-", " ");
  } else if (currentPath.substring(1).includes("-")) {
    currentPath = currentPath
      .substring(1)
      .replace(/\s*\/\s*/, " ")
      .replace("-", " ")
      .replace("-", " ")
      .replace("-", " ")
      .replace("-", " ")
      .replace("hs", "H&S");
  } else {
    currentPath = currentPath.substring(1);
  }
  if (currentPath.includes("off plan")) {
    currentPath = "off plan properties";
  }
  if (currentPath.includes("news")) {
    currentPath = "News & Videos";
  }
  return (
    <Slide bottom duration={1500}>
      <div
        className="flex flex-col items-center justify-center h-full bg-cover
      bg-center font-custom px-4 mt-4"
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-7xl  mb-4 capitalize text-center">
          {title}
        </h1>
        {subTitle ? (
          <div className="flex items-center 1 md:space-x-2 text-white text-lg md:text-2xl">
            <span>Home</span>
            <MdOutlineNavigateNext size="1.5em" />
            <span className=" capitalize">{subTitle}</span>
          </div>
        ) : (
          <div className="flex items-center 1 md:space-x-2 text-white text-lg md:text-2xl">
            <span>Home</span>
            <MdOutlineNavigateNext size="1.5em" />
            <span className=" capitalize">{currentPath}</span>
          </div>
        )}
      </div>
    </Slide>
  );
};

export default PageHeading;
