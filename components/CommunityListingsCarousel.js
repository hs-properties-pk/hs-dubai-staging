"use client";

import { useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "@/components/PropertyCard";
import { communityListings } from "@/data/community-data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function syncCarouselFocus(selector) {
  if (typeof document === "undefined" || !selector) return;
  const root = document.querySelector(selector);
  if (!root) return;
  root.querySelectorAll(".slick-slide").forEach((slide) => {
    const hidden = slide.getAttribute("aria-hidden") === "true";
    slide.querySelectorAll("a[href], button").forEach((el) => {
      if (hidden) {
        el.setAttribute("tabindex", "-1");
      } else {
        el.removeAttribute("tabindex");
      }
    });
  });
}

function CustomArrow({ onClick, direction, bottom = "-bottom-10 md:-bottom-20", variant = "home" }) {
  const btnClass =
    variant === "landing"
      ? "border-2 border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white"
      : "border-2 border-black text-black hover:bg-black hover:text-white";
  return (
    <div
      className={`absolute ${bottom} left-1/2 ${
        direction === "next" ? "translate-x-6" : "-translate-x-12"
      } w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer z-10 transition duration-300 ${btnClass}`}
      onClick={onClick}
    >
      {direction === "next" ? (
        <FaChevronRight className="text-sm md:text-2xl" />
      ) : (
        <FaChevronLeft className="text-sm md:text-2xl" />
      )}
    </div>
  );
}

function createSliderSettings(bottomOffset, variant, syncSelector) {
  return {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" bottom={bottomOffset} variant={variant} />,
    prevArrow: <CustomArrow direction="prev" bottom={bottomOffset} variant={variant} />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
    onInit: () => syncCarouselFocus(syncSelector),
    afterChange: () => syncCarouselFocus(syncSelector),
  };
}

// Community property cards in a slider; pass a unique sliderRootClass for a11y focus sync.
export default function CommunityListingsCarousel({
  excludeSlug,
  title,
  variant = "home",
  maxItems = 10,
  sliderRootClass = "community-listings-carousel",
}) {
  const syncSelector = `.${sliderRootClass}`;

  const items = useMemo(() => {
    let list = [...communityListings];
    if (excludeSlug) {
      list = list.filter((c) => c.slug !== excludeSlug);
    }
    return list.slice(0, maxItems);
  }, [excludeSlug, maxItems]);

  const sliderSettings = useMemo(() => {
    const bottom =
      variant === "landing" ? "-bottom-12 md:-bottom-16" : "-bottom-10 md:-bottom-20";
    return createSliderSettings(bottom, variant, syncSelector);
  }, [variant, syncSelector]);

  useEffect(() => {
    syncCarouselFocus(syncSelector);
  }, [syncSelector, items.length]);

  if (items.length === 0) return null;

  if (variant === "landing") {
    return (
      <section className="py-24 md:py-28 bg-white border-t border-neutral-200/80 font-custom2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-16 max-w-4xl mx-auto">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2 mb-4">
              Communities
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 leading-[1.15] font-custom tracking-tight">
              {title}
            </h2>
          </div>
          <div className="pb-4 md:pb-8">
            <Slider {...sliderSettings} className={`custom-slider ${sliderRootClass}`}>
              {items.map((community) => (
                <PropertyCard
                  key={community.slug}
                  image={community.coverPhoto?.url}
                  title={community.title}
                  id={community.slug}
                  location={community.location}
                  purpose="communities"
                  brand={community.brand}
                  communityType={community.communityType}
                />
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-screen-2xl mx-auto px-4 md:px-6 my-12">
      <h2 className="text-center text-black text-3xl md:text-5xl font-medium capitalize mb-4 md:mb-16 font-custom">
        {title}
      </h2>
      <div className="pb-12 md:pb-24">
        <Slider {...sliderSettings} className={`custom-slider ${sliderRootClass}`}>
          {items.map((community) => (
            <PropertyCard
              key={community.slug}
              image={community.coverPhoto?.url}
              title={community.title}
              id={community.slug}
              location={community.location}
              purpose="communities"
              brand={community.brand}
              communityType={community.communityType}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}
