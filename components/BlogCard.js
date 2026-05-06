import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ imageSrc, date, title, id, large, news, type }) => {
  return (
    <Link href={`/${type}/${id}`} passHref>
      <div
        className={`overflow-hidden font-custom2 bg-white ${
          large
            ? "w-full h-full"
            : "flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
        } `}
      >
        {/* Image Section */}
        <div className={`relative ${large ? "" : "flex-shrink-0"}`}>
          <Image
            width={0}
            height={0}
            sizes={
              large
                ? "(min-width: 1280px) 55vw, (min-width: 768px) 60vw, 100vw"
                : "(min-width: 640px) 208px, 100vw"
            }
            className={`${
              large
                ? "w-full h-[min(22rem,52vh)] md:h-[min(28rem,48vh)] lg:h-[min(34rem,55vh)] xl:h-[38.7rem] object-cover rounded-lg"
                : "w-full sm:w-52 h-36 sm:min-h-[9rem] object-cover rounded-md"
            }`}
            src={imageSrc}
            alt={title}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
          <div className={`absolute bottom-2 left-0 text-white p-2 w-full`}>
            <div
              className={`${
                large
                  ? "flex justify-between items-center px-2"
                  : "flex justify-end items-center px-2"
              }`}
            >
              <p className="text-xs sm:text-sm px-2 rounded-lg border">
                {news ? "News" : "Blog"}
              </p>
              {large && <p className="text-xs sm:text-sm h-full">{date}</p>}
            </div>
          </div>
        </div>
        {/* Content Section */}
        <div
          className={`py-4 ${
            large
              ? "flex flex-col justify-between gap-4"
              : "flex-1 flex flex-col justify-between"
          }`}
        >
          <p
            className={`font-semibold capitalize ${
              large ? "text-[#272D2C] text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </p>
          {!large && (
            <p className="text-sm sm:text-base text-[#858585]">{date}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
