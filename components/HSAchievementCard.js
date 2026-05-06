import Image from "next/image";
import React from "react";

const HSAchievementCard = ({ image, name, details, year }) => {
  return (
    <div className="flex-shrink-0 bg-white p-6 mx-2">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        alt="Award 1"
        className="w-full  mx-auto mb-4"
        loading="lazy"
      />
      <p className="text-2xl font-semibold text-black tracking-wider mb-2">
        {year}
      </p>
      <p className="text-black tracking-wider mb-2 uppercase">{name}</p>
      <p className="text-black tracking-wider mb-2 capitalize">{details}</p>
    </div>
  );
};

export default HSAchievementCard;
