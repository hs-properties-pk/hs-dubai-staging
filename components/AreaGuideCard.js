import Image from "next/image";
import Link from "next/link";
import React from "react";

const AreaGuideCard = ({ image, title, id }) => {
  return (
    <Link
      className="relative w-full h-full bg-gray-200 "
      href={`/area-guides/${id}`}
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        alt={title}
        className="w-full h-96 object-cover  filter brightness-75 rounded-lg"
      />
      <div className="absolute left-3 bottom-3 md:left-9 md:bottom-9 flex flex-col justify-center">
        <h2 className="text-white text-2xl md:text-4xl font-custom">{title}</h2>
      </div>
    </Link>
  );
};

export default AreaGuideCard;
