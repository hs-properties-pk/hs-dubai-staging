import Image from "next/image";
import React from "react";

const ServiceCard = ({ image, title }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative font-custom2 mx-auto">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        className="w-10/12 sm:w-80 md:w-96 rounded-lg"
        alt={title}
      />
      <p className="text-white text-base sm:text-lg absolute bottom-4 px-4 sm:px-6 text-center tracking-wider">
        {title}
      </p>
    </div>
  );
};

export default ServiceCard;
