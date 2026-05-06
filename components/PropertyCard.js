import React from "react";
import { LuMapPin } from "react-icons/lu";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";

const PropertyCard = ({ image, title, location, purpose, date, price, id, category, brand, communityType }) => {
  // Determine the link based on purpose
  const href = purpose === "communities" ? `/communities/${id}` : `/properties/${purpose}/${id}`;
  
  return (
    <Link
      href={href}
      className="  font-custom2 flex flex-col gap-4 py-6 md:mx-2"
    >
      <div className="relative">
        {/* <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-96 rounded-lg object-cover"
          src={image}
          alt={title}
          layout="responsive"
          priority={false}
        /> */}
        <div className="relative w-full h-96">
          <Image
            src={image}
            alt={title}
            sizes="auto"
            fill
            className="rounded-lg object-cover aspect-auto"
            loading="lazy"
          />
        </div>

        {/* H&S Watermark - More prominent to override other agency logos */}
        <div className="absolute bottom-3 right-3 z-30 bg-black/40 backdrop-blur-sm rounded-lg p-1.5">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/H&S-Dubai-Logo-White.png"
            alt="H&S Real Estate Logo"
            className="object-contain w-24"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
      </div>
      <div className=" px-2 ">
        <div className="text-black flex items-center justify-between pt-3 tracking-wide">
          <p className="text-xl font-semibold font-custom">{title}</p>
          <GoArrowUpRight size="1.4em" />
        </div>
        
        {/* Show price for properties, or community details for communities */}
        {price && (
          <p className="text-black font-extrabold text-base  pt-3 capitalize tracking-wide font-custom">
            {`Starting From AED ${price
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
        )}
        
        {/* Community-specific details */}
        {purpose === "communities" && (
          <div className="pt-3 space-y-1">
            {brand && (
              <p className="text-gray-600 text-sm font-medium font-custom2">
                By {brand}
              </p>
            )}
            {communityType && (
              <p className="text-gray-500 text-sm font-custom2">
                {communityType}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col gap-4 py-4">
          <div className=" flex items-center gap-2 tracking-wider text-secondary font-custom2">
            <LuMapPin />{" "}
            {location
              .slice(0, 3)
              ?.map((item) => item.name)
              .reverse()
              .join(" , ")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
