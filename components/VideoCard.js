import Image from "next/image";
import React from "react";

const VideoCard = ({ imageSrc, title, videoSrc, onClick }) => {
  return (
    <div className="w-full h-full bg-white overflow-hidden font-custom2 px-2">
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
        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="absolute inset-0 flex justify-center items-center">
          <button
            className="bg-black text-white rounded-full p-2"
            onClick={() => onClick(videoSrc)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-4.928-2.488A1 1 0 008.5 9.6v4.8a1 1 0 001.324.936l4.928-2.488a1 1 0 000-1.792z"
              />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-2 left-0 text-white p-2 w-full">
          <div className="flex justify-between items-center px-2">
            <p className="text-sm px-2 rounded-lg border">Video</p>
          </div>
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between gap-4">
        <p className="mb-2 text-lg font-semibold  text-[#272D2C] ">{title}</p>
      </div>
    </div>
  );
};

export default VideoCard;
