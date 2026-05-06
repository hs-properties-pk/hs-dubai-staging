"use client";

import React from "react";
import Link from "next/link";
import { LuBath, LuMapPin, LuPhone } from "react-icons/lu";
import { IoBedOutline, IoCalendarClearOutline } from "react-icons/io5";
import { TbBuildingCommunity } from "react-icons/tb";
import { PiResize } from "react-icons/pi";
import Image from "next/image";
import { FaRegEnvelope, FaWhatsapp } from "react-icons/fa6";

/** Returns the price-period suffix for for-rent listings, e.g. " / Year", " / Month". */
const formatRentPeriod = (pricePeriod) => {
  switch ((pricePeriod || "yearly").toLowerCase()) {
    case "monthly":   return " / Month";
    case "quarterly": return " / Quarter";
    case "weekly":    return " / Week";
    case "daily":     return " / Day";
    case "yearly":
    default:          return " / Year";
  }
};

const PropertyCardBig = ({
  image,
  title,
  subTitle,
  type,
  location,
  bedrooms,
  baths,
  sizeRange,
  purpose = "off-plan",
  date,
  price,
  pricePeriod,
  id,
  onBookViewing,
  brand,
  /** Vertical card layout for `/properties/off-plan` 2-column grid only — buy/rent unchanged. */
  compactGrid = false,
  /** LCP: set true for first above-the-fold cards; defaults true for buy/rent listing. */
  imagePriority = true,
}) => {
  const isOffPlanGrid = Boolean(compactGrid && purpose === "off-plan");
  const detailHref = `/properties/${purpose}/${id}`;

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(date * 1000).toLocaleDateString(
    "en-GB",
    options
  );

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const inquiryName =
    typeof subTitle === "string" && subTitle.trim()
      ? subTitle.trim()
      : Array.isArray(location) && location.length > 0
        ? location
            .slice(0, 3)
            .map((item) => item?.name)
            .filter(Boolean)
            .reverse()
            .join(", ")
        : typeof title === "string" && title.trim()
          ? title.trim()
          : "this property";

  const whatsappPrefill = `Hello! I would like to inquire about ${inquiryName}.`;
  const whatsappInquiryHref = `https://api.whatsapp.com/send/?phone=971526902884&text=${encodeURIComponent(
    whatsappPrefill,
  )}&type=phone_number&app_absent=0`;

  const imageAlt =
    typeof title === "string" && title.trim() ? title.trim() : inquiryName;

  return (
    <article
      className={
        isOffPlanGrid
          ? "group relative my-0 flex h-full w-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white font-custom2 shadow-sm transition-shadow hover:shadow-md"
          : "group relative my-2 flex w-full flex-col rounded-lg bg-white font-custom2 lg:my-6 lg:flex-row lg:border lg:space-x-6"
      }
    >
      {/* Full-card link: open in new tab / middle-click works; sits under content */}
      <Link
        href={detailHref}
        className={`absolute inset-0 z-[1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
          isOffPlanGrid ? "rounded-lg" : "rounded-lg"
        }`}
        aria-label={`View details: ${inquiryName}`}
      />
      <div
        className={`relative z-[2] flex min-h-0 w-full flex-1 pointer-events-none ${
          isOffPlanGrid ? "flex-col" : "flex-col lg:flex-row lg:space-x-6"
        }`}
      >
      {/* Image Section — fixed height on off-plan grid so every card aligns in a row */}
      <div
        className={
          isOffPlanGrid
            ? "relative h-52 w-full shrink-0 overflow-hidden rounded-t-lg sm:h-56 md:h-60 lg:h-64"
            : "relative w-full lg:w-1/2"
        }
      >
        {isOffPlanGrid ? (
          <Image
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover"
            src={image}
            alt={imageAlt}
            loader={imageLoader}
            priority={imagePriority}
          />
        ) : (
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-80 md:h-[30rem] object-cover rounded-t-lg md:rounded-l-lg md:rounded-r-none"
            src={image}
            alt={imageAlt}
            loader={imageLoader}
            priority={imagePriority}
          />
        )}
        {purpose === "off-plan" && (
          <div className="absolute bottom-3 right-3 z-30">
            <Image
              width={0}
              height={0}
              sizes="96px"
              src="/logos-icons/H&S-Dubai-Logo-White.png"
              alt="logo"
              className={isOffPlanGrid ? "object-contain w-20" : "object-contain w-28"}
              loading="lazy"
            />
          </div>
        )}
        <div
          className={
            isOffPlanGrid
              ? "pointer-events-none absolute inset-0 rounded-t-lg bg-black/10"
              : "absolute inset-0 bg-black opacity-10 rounded-t-lg md:rounded-l-lg md:rounded-r-none"
          }
        />
      </div>

      {/* Info Section */}
      <div
        className={
          isOffPlanGrid
            ? "flex min-h-0 flex-1 flex-col justify-between rounded-b-lg border-t border-neutral-100 px-4 pb-4 pt-4 md:px-5 md:pt-5"
            : "flex flex-col justify-between pt-6 md:py-8 px-3 lg:px-0 border lg:border-none rounded-b-lg w-full lg:w-1/2"
        }
      >
        {/* Title and Details */}
        <div className={`flex flex-col ${isOffPlanGrid ? "gap-3 md:gap-4" : "gap-4 md:gap-5"}`}>
          <p
            className={`font-bold text-black tracking-wide font-custom ${
              isOffPlanGrid ? "text-lg md:text-xl" : "text-xl md:text-2xl"
            }`}
          >
            {`${purpose === "off-plan" ? "Starting From AED" : "AED"} ${price
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${
              purpose === "for-rent" ? formatRentPeriod(pricePeriod) : ""
            }`}
          </p>

          {purpose === "off-plan" ? (
            <>
              <p
                className={`font-custom font-bold capitalize leading-snug tracking-wide text-black ${
                  isOffPlanGrid
                    ? "line-clamp-3 text-base md:text-lg"
                    : "text-xl"
                }`}
              >
                {subTitle}
              </p>
              {brand && (
                <p className="ml-0.5 text-md text-gray-600 font-custom2 font-semibold tracking-wide">
                  By {brand}
                </p>
              )}
            </>
          ) : (
            <p className="md:text-lg text-gray-500 capitalize tracking-wide">
              {typeof subTitle === "string" && subTitle.length > 56
                ? `${subTitle.slice(0, 56)}...`
                : subTitle}
            </p>
          )}

          {/* Location */}
          <div className="text-secondary flex items-center gap-2 tracking-wider">
            <LuMapPin />
            {location
              .slice(0, 3)
              ?.map((item) => item.name)
              .reverse()
              .join(" , ")}
          </div>

          {/* Meta Info */}
          <div
            className={`mb-2 text-gray-600 ${
              isOffPlanGrid
                ? "flex flex-wrap gap-x-3 gap-y-2 text-sm"
                : "flex flex-col gap-5 md:flex-row md:items-center"
            }`}
          >
            <div
              className={`text-secondary flex min-w-0 items-center gap-2 tracking-wide ${
                !isOffPlanGrid ? "pr-4 md:border-r-2" : ""
              }`}
            >
              <TbBuildingCommunity className="shrink-0" />
              <span className="min-w-0 break-words">
                {purpose === "off-plan" ? type : type[type.length - 1]?.name}
              </span>
            </div>
            <div
              className={`text-secondary flex items-center gap-2 ${
                !isOffPlanGrid ? "pr-4 md:border-r-2" : ""
              }`}
            >
              <IoBedOutline className="shrink-0" />
              {purpose === "off-plan"
                ? `${bedrooms} Bedrooms`
                : bedrooms === 0
                  ? "Studio"
                  : `${bedrooms}`}
            </div>
            {purpose !== "off-plan" && (
              <div className="text-secondary flex items-center gap-2 pr-4 md:border-r-2">
                <LuBath />
                {`${baths}`}
              </div>
            )}
            <div
              className={`text-secondary flex items-center gap-2 ${
                purpose !== "off-plan" ? "pr-4 md:border-r-2" : ""
              }`}
            >
              <PiResize className="shrink-0" />
              {purpose === "off-plan"
                ? sizeRange
                : sizeRange > 0
                ? `${Math.round(sizeRange).toLocaleString()} Sq Ft`
                : "N/A"}
            </div>

            {purpose !== "off-plan" && (
              <div className="text-secondary flex items-center gap-2 tracking-wide">
                <IoCalendarClearOutline />
                {formattedDate}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Right CTA — above overlay so Call / WhatsApp / Book keep working */}
        <div
          className={`relative z-[3] pointer-events-auto ${
            isOffPlanGrid
              ? "mt-3 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between"
              : "flex flex-col gap-4 py-4 sm:flex-row lg:items-center lg:justify-between md:pb-0 lg:pr-4"
          }`}
        >
          {/* Agent Info */}
          <div className="flex items-center gap-2 cursor-default">
            <Image
              src="/logos-icons/fahad.jpeg"
              alt="Agent"
              width={40}
              height={40}
              className="rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-semibold text-sm">Fahad</p>
              <p className="text-xs text-gray-500">Haq</p>
            </div>
          </div>

          {/* Buttons */}
          <div
            className={`flex flex-wrap justify-between gap-2 sm:gap-3 ${
              isOffPlanGrid ? "w-full sm:w-auto sm:justify-end" : ""
            }`}
          >
            <a
              href="tel:+971526902884"
              className={`flex items-center gap-1 rounded-lg border border-neutral-200 bg-gray-100 text-sm tracking-wide transition duration-300 hover:bg-black hover:text-white ${
                isOffPlanGrid ? "px-2.5 py-2" : "p-2 md:px-4  md:py-3 gap-1 md:gap-2"
              }`}
            >
              <LuPhone size="1.2em" aria-hidden />
              Call
            </a>
            <a
              href={whatsappInquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              title={whatsappPrefill}
              aria-label={`WhatsApp: ${whatsappPrefill}`}
              className={`flex items-center gap-1 rounded-lg border border-neutral-200 bg-gray-100 text-sm tracking-wide transition duration-300 hover:bg-black hover:text-white ${
                isOffPlanGrid ? "px-2.5 py-2" : "p-2 md:px-4  md:py-3 gap-1 md:gap-2"
              }`}
            >
              <FaWhatsapp size="1.2em" aria-hidden />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => onBookViewing(image, purpose, id)}
              className={`flex items-center gap-1 rounded-lg border border-neutral-200 bg-gray-100 text-sm tracking-wide transition duration-300 hover:bg-black hover:text-white ${
                isOffPlanGrid ? "px-2.5 py-2" : "p-2 md:px-4  md:py-3 gap-1 md:gap-2"
              }`}
            >
              <FaRegEnvelope size="1.2em" />
              Book a Viewing
            </button>
          </div>
        </div>
      </div>
      </div>
    </article>
  );
};

export default PropertyCardBig;
