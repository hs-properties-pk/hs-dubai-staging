"use client";

import React from "react";
import { Fade } from "react-reveal";

const SectionSubHeading = ({ title }) => {
  return (
    <div className="font-custom text-center pt-8 md:pt-20 pb-6 md:pb-8">
      <Fade bottom duration={1500}>
        <p className="text-black text-3xl md:text-6xl mb-4">{title}</p>
      </Fade>
    </div>
  );
};

export default SectionSubHeading;
