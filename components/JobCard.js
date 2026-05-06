import Image from "next/image";
import React from "react";

const JobCard = ({ image, title }) => {
  return (
    <div className="relative w-full h-full px-2">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        alt={title}
        className="w-full h-80 object-cover filter brightness-75 rounded-lg"
        loading="lazy"
      />
      <div className="absolute bottom-3 md:bottom-9 left-1/2 transform -translate-x-1/2 text-center w-full">
        <p className="text-white text-base md:text-xl font-custom">{title}</p>
      </div>
    </div>
  );
};

export default JobCard;
