import Image from "next/image";
import React from "react";

const HSGermanBenifitCard = ({ image, title, subTitle }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center  md:mx-5 relative font-custom2 mx-auto">
      <div className="relative">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={image}
          className="w-full sm:w-80 md:w-96 rounded-lg"
          alt=""
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </div>
      <div className="absolute bottom-10 flex flex-col gap-2 items-center justify-center px-2 w-full">
        <p className="text-white text-base sm:text-lg  text-center tracking-wider font-custom uppercase px-4">
          {title}
        </p>
        <p className="text-white  tracking-wider text-center">{subTitle}</p>
      </div>
    </div>
  );
};

export default HSGermanBenifitCard;
