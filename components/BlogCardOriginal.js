import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCardOriginal = ({ imageSrc, date, title, id, type }) => {
  return (
    <Link
      href={`/${type}/${id}`}
      passHref
      className="w-full h-full bg-white  overflow-hidden font-custom2 "
    >
      <div className="relative">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-96 object-cover rounded-lg"
          src={imageSrc}
          alt={title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
        <div className="absolute bottom-2 left-0   text-white p-2 w-full">
          <div className="flex justify-between items-center px-2">
            <p className="text-sm px-2 rounded-lg border capitalize">
              {type === "blogs" ? "blog" : type}
            </p>
            <p className=" text-sm ">{date}</p>
          </div>
        </div>
      </div>
      <div className="py-4 flex  flex-col justify-between gap-4">
        <p className="mb-2 text-lg font-semibold  text-[#272D2C] ">{title}</p>
      </div>
    </Link>
  );
};

export default BlogCardOriginal;
