import Image from "next/image";
import Link from "next/link";
import React from "react";

const AreaGuideCityCard = ({ image, title, id, previousId }) => {
  return (
    <div className="relative w-full h-full bg-gray-200">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-80 object-cover  filter brightness-75 rounded-lg"
      />
      <div className="absolute left-3 bottom-3 md:left-9 md:bottom-9 flex flex-col justify-center">
        <h2 className="text-white text-2xl md:text-4xl font-custom">{title}</h2>
        <Link
          href={`/area-guides/${previousId}/${id}`}
          className="mt-4 bg-black hover:bg-gray-800 duration-300 text-white py-2 px-5 hover:bg-opacity-90 font-custom2 w-max rounded-lg"
        >
          Read Guide
        </Link>
      </div>
    </div>
  );
};

export default AreaGuideCityCard;
