"use client";

import React from "react";
import Fade from "react-reveal/Fade";

const SectionHeading = ({ title, subTitle }) => {
  return (
    <div className="font-custom text-center px-4 py-8 md:py-20">
      <Fade bottom duration={1200}>
        <h2 className="text-black text-3xl md:text-5xl lg:text-7xl mb-4  font-semibold md:font-medium">
          {title}
        </h2>
      </Fade>
      <p className="text-[#717171] text-base font-custom2 tracking-wider font-medium">
        {subTitle}
      </p>
    </div>
  );
};

export default SectionHeading;
