"use client";

import Image from "next/image";
import React from "react";
import { Fade } from "react-reveal";

const Visionaries = ({
  imgSource,
  name,
  designation,
  details,
  minorDetails,
  orderLast,
}) => {
  return (
    <div className="bg-white py-2 md:py-12 font-custom2">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:px-6 ">
        {orderLast === true ? (
          <Fade right duration={1500}>
            <div
              className={`${
                orderLast === true ? "order-last" : "order-last md:order-first"
              } flex flex-col gap-4`}
            >
              <h2 className="text-4xl md:text-6xl  text-secondary font-custom">
                {name}
              </h2>
              <p className="text-lg md:text-xl text-black  tracking-wider">
                {designation}
              </p>

              <p className="text-black tracking-wider text-base md:text-lg w-full md:w-3/4">
                {details}
              </p>

              <p
                className="mt-2 italic text-black tracking-wider text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: minorDetails }}
              ></p>
            </div>
          </Fade>
        ) : (
          <Fade left duration={1500}>
            <div
              className={`${
                orderLast === true ? "order-last" : "order-last md:order-first"
              } flex flex-col gap-4`}
            >
              <h2 className="text-4xl md:text-6xl  text-secondary font-custom">
                {name}
              </h2>
              <p className="text-lg md:text-xl text-black  tracking-wider">
                {designation}
              </p>

              <p className="text-black tracking-wider text-base md:text-lg w-full md:w-3/4">
                {details}
              </p>

              <p
                className="mt-2 italic text-black tracking-wider text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: minorDetails }}
              ></p>
            </div>
          </Fade>
        )}
        {orderLast === true ? (
          <Fade left duration={1500}>
            <div
              className={`flex   ${
                orderLast === true ? "justify-start" : "justify-end"
              } `}
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={imgSource}
                alt="Emad Haq"
                className=" border border-black p-4 w-full md:w-4/6 rounded-lg"
                loading="lazy"
              />
            </div>
          </Fade>
        ) : (
          <Fade right duration={1500}>
            <div
              className={`flex   ${
                orderLast === true ? "justify-start" : "justify-end"
              } `}
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={imgSource}
                alt="Emad Haq"
                className=" border border-black p-4 w-full md:w-4/6 rounded-lg"
                loading="lazy"
              />
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
};

export default Visionaries;
