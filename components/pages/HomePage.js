"use client";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import PageLinks from "@/components/PageLinks";
import Review from "@/components/Review";
import HomeHero from "@/components/HomeHero";
import dynamic from "next/dynamic";
import BelowHiddenText from "../BelowHiddenText";
import { offPlanListings } from "@/data/off-plan-data";
import CommunityListingsCarousel from "@/components/CommunityListingsCarousel";
import AchievementCard from "../AchievementCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { homepageAwardsCarousel } from "@/data/awards-data";
import Banner from "../Banner";
import {
  faqItems,
  heroContent,
  homePageTextContent,
  mortgageSection,
  sectionTitles,
  valuationSection,
} from "@/data/homepage/homepage-content";
import ContentSection from "../ContentSection";
import BrandsFeaturedStrip from "../BrandsFeaturedStrip";

const HomeLeadCapturePopup = dynamic(
  () => import("@/components/HomeLeadCapturePopup"),
  { ssr: false },
);

const CustomArrow = ({
  onClick,
  direction,
  bottom = "-bottom-10 md:-bottom-20",
}) => (
  <div
    className={`absolute ${bottom} left-1/2 ${direction === "next" ? "translate-x-6" : "-translate-x-12"
      } w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300`}
    onClick={onClick}
  >
    {direction === "next" ? (
      <FaChevronRight className="text-sm md:text-2xl" />
    ) : (
      <FaChevronLeft className="text-sm md:text-2xl" />
    )}
  </div>
);

const createSliderSettings = (bottomOffset = "-bottom-10 md:-bottom-20") => ({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <CustomArrow direction="next" bottom={bottomOffset} />,
  prevArrow: <CustomArrow direction="prev" bottom={bottomOffset} />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
});

function syncHomeCarouselFocus(selector) {
  if (typeof document === "undefined") return;
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

export default function HomePage({ homeFeaturedBrands = [] }) {
  const offPlanSliderSettings = useMemo(() => {
    const base = createSliderSettings();
    const sync = () => syncHomeCarouselFocus(".home-offplan-slider");
    return {
      ...base,
      onInit: sync,
      afterChange: sync,
    };
  }, []);

  const awardsSliderSettings = useMemo(() => {
    const base = createSliderSettings("-bottom-14 md:-bottom-20");
    const sync = () => syncHomeCarouselFocus(".home-awards-slider");
    return {
      ...base,
      onInit: sync,
      afterChange: sync,
    };
  }, []);

  useEffect(() => {
    syncHomeCarouselFocus(".home-offplan-slider");
    syncHomeCarouselFocus(".home-awards-slider");
  }, []);

  const homePageTextSection = [
    {
      question: "The Top Real Estate Company In Dubai",
      answer: homePageTextContent,
    },
  ];


  return (
    <>
      <main className="relative" id="script">
        <HomeLeadCapturePopup />
        <div className="relative flex min-h-[100dvh] flex-col bg-[#050a12]">
          <Navbar isHomeNavbar={true} />
          <div className="flex min-h-0 flex-1 flex-col">
            <HomeHero />
          </div>
        </div>
        <BrandsFeaturedStrip brands={homeFeaturedBrands} />
        <section className="bg-white pt-8 md:py-16 font-custom2">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6">
            <div className="order-2 grid grid-cols-3 grid-rows-2 gap-4 md:order-1">
              <div className="relative col-span-2 row-span-1 h-52 md:h-96">
                <Image
                  src="/making-your-dreams-a-reality/Image-1.webp"
                  alt="Luxury Dubai Property"
                  fill
                  sizes="(max-width: 768px) 67vw, (max-width: 1536px) 33vw, 520px"
                  priority
                  fetchPriority="high"
                  loading="eager"
                  quality={75}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative col-span-1 row-span-1 h-52 md:h-96">
                <Image
                  src="/making-your-dreams-a-reality/Image-2.webp"
                  alt="Dubai Real Estate View"
                  fill
                  sizes="(max-width: 768px) 34vw, (max-width: 1536px) 17vw, 220px"
                  loading="lazy"
                  quality={70}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative col-span-3 row-span-1 h-52 md:h-96">
                <Image
                  src="/making-your-dreams-a-reality/Image-3.webp"
                  alt="Premium Dubai Development"
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1536px) 50vw, 720px"
                  loading="lazy"
                  quality={70}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="order-1 flex flex-col justify-between md:order-2 md:px-8">
              <div className="flex flex-col justify-end items-end gap-1 font-custom3 order-last md:order-first md:-mt-0">
                <p className="text-[#050F27] font-semibold text-xs md:text-base tracking-wider">
                  {heroContent.recordLabel}
                </p>
                <p className="text-3xl md:text-6xl font-extrabold text-[#050F27] font-custom">
                  {heroContent.recordSales}
                </p>
              </div>

              <div className="flex flex-col">
                {/* <h1 className="text-2xl md:text-5xl font-medium text-black mb-4 md:mb-10 leading-tight font-custom">
                Making Your <br className="hidden md:block" /> Dreams A Reality
              </h1> */}
                <h1 className="text-2xl md:text-5xl font-medium text-black mb-4 md:mb-10 leading-tight font-custom">
                  <span className="md:block">Making Your</span>
                  <span className="md:block"> Dreams A Reality</span>
                </h1>

                <div className="text-gray-600 text-base md:text-lg flex flex-col gap-4 tracking-wider mb-4">
                  <p>
                    Looking for a trusted real estate partner in Dubai? At H&S
                    Real Estate, we&apos;re here to make your property dreams come
                    true, whether you&apos;re investing, expanding your portfolio,
                    or finding your dream home. Recognized as one of the top{" "}
                    <Link
                      className="font-semibold"
                      href="https://hsproperty.ae/properties/for-sale"
                    >
                      real estate companies in Dubai
                    </Link>{" "}
                    year after year, we specialize in premium off-plan properties
                    and luxury developments across the UAE and beyond.
                  </p>
                  <p>
                    What sets us apart? With our client-first approach, means we
                    go beyond transactions, providing local insight and global
                    reach to connect you with the best opportunities maximizing
                    your returns. Discover why so many clients trust H&S Real
                    Estate as their go-to partner in Dubai&apos;s real estate
                    market. Experience a top-tier service tailored to you, driven
                    by results, and delivered by Dubai&apos;s best real estate
                    brokers and agents.
                  </p>
                </div>
              </div>

              <Link
                href="/our-story"
                className="bg-black block text-white px-6 py-3 font-semibold hover:bg-gray-800 transition w-max rounded-lg"
              >
                Read our story
              </Link>
            </div>
          </div>
        </section>

        {/* Off-Plan Properties Section */}
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mt-12">
          <h2 className="text-center text-black text-3xl md:text-5xl font-medium capitalize mb-4 md:mb-16 font-custom">
            {sectionTitles.offPlan}
          </h2>
          <div className="pb-12 md:pb-24">
            <Slider
              {...offPlanSliderSettings}
              className="custom-slider home-offplan-slider"
            >
              {offPlanListings.slice(0, 10).map((property, index) => (
                <PropertyCard
                  key={index}
                  image={property.coverPhoto?.url}
                  title={property.title}
                  id={property.slug}
                  price={property.price}
                  location={property.location}
                  purpose="off-plan"
                />
              ))}
            </Slider>
          </div>
        </section>

        <CommunityListingsCarousel
          title={sectionTitles.communities}
          variant="home"
          sliderRootClass="home-community-slider"
        />

        <Review headingClass="font-medium" />
        <section className="bg-gradient-to-b from-white via-neutral-50/50 to-white pt-2 pb-2 font-custom2 md:pt-10 md:pb-4">
          <div className="mx-auto mb-10 max-w-screen-2xl px-4 text-center md:mb-14 md:px-6">
            <p className="mb-4 font-custom2 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
              Recognized excellence · 2016 — 2025
            </p>
            <h2 className="mb-4 font-custom text-3xl font-medium capitalize text-black md:mb-5 md:text-5xl">
              {sectionTitles.awards}
            </h2>
            <p className="mx-auto mb-6 max-w-2xl font-custom3 text-base leading-relaxed text-neutral-600 md:text-lg">
              The same verified trophies you&apos;ll find on our awards page — Emaar,
              Dubai Land Department, Nakheel, Meraas, DAMAC, and more.
            </p>
            <Link
              href="/awards"
              className="inline-flex items-center gap-1.5 font-custom2 text-sm font-semibold text-neutral-950 underline decoration-neutral-950/30 underline-offset-[5px] transition-colors hover:text-neutral-600 hover:decoration-neutral-600/40"
            >
              View full awards gallery
            </Link>
          </div>
          <div className="mx-auto mb-6 max-w-screen-2xl px-2 pb-6 text-center md:px-4 md:pb-20">
            <Slider
              {...awardsSliderSettings}
              className="custom-slider home-awards-slider"
            >
              {homepageAwardsCarousel.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  image={achievement.image}
                  name={achievement.name}
                  details={achievement.details}
                  year={achievement.year}
                />
              ))}
            </Slider>
          </div>
        </section>
        <PageLinks />
        <ContentSection
          className="mt-2 mb-10 md:mt-5 md:mb-14"
          data={mortgageSection}
          imageUrl="/home-image-1.jpg"
          imageAlt="Dubai Skyline with H&S Real Estate"
          imagePosition="right"
          imageOverlay={
            <>
              <div
                className="pointer-events-none absolute inset-0 bg-black/25"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Image
                  width={256}
                  height={80}
                  sizes="(max-width: 768px) 112px, 256px"
                  src="/logos-icons/H&S-Dubai-Logo-White.png"
                  alt="H&S Real Estate Dubai"
                  className="h-auto w-28 object-contain md:w-64"
                  loading="lazy"
                />
              </div>
            </>
          }
        />
        <ContentSection
          className="mb-12 md:mb-20"
          data={valuationSection}
          imageUrl="/home-image-2.jpg"
          imageAlt="Property Valuation Expert"
          imagePosition="left"
        />
        <BelowHiddenText
          textSection={homePageTextSection}
          faqItems={faqItems}
          home
        />
      </main>
      <Footer />
    </>
  );
}
