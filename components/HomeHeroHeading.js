import React from "react";
import Navbar from "./NavBar";
import PageHeading from "./PageHeading";
import Image from "next/image";
import HSGermanNavbar from "./HSGermanNavbar";

const HomeHeroHeading = ({
  image,
  title,
  subTitle,
  setShowPopup,
  isGermanNavbar,
}) => {
  return (
    <div className="h-[45vh] md:h-[75vh] relative">
      {isGermanNavbar ? (
        <HSGermanNavbar setShowPopup={setShowPopup} isGermanNavbar />
      ) : (
        <Navbar isHomeNavbar={false} />
      )}

      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={image}
        alt="H&S PageImage"
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      {title && (
        <div className="absolute inset-0">
          <PageHeading title={title} subTitle={subTitle} />
        </div>
      )}
    </div>
  );
};

export default HomeHeroHeading;
