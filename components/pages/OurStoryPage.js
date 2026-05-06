"use client";
import AchievementCard from "@/components/AchievementCard";
import Footer from "@/components/Footer";
import SectionSubHeading from "@/components/SectionSubHeading";
// import Visionaries from "@/components/Visionaries";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fade } from "react-reveal";
import PremiumPageHero from "../PremiumPageHero";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { homepageAwardsCarousel } from "@/data/awards-data";

function OurStoryPage() {
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-10 md:-bottom-20 left-1/2 translate-x-6 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white  border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronRight className="text-sm md:text-2xl" />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-12 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronLeft className="text-sm md:text-2xl" />
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // arrows: false,
          // dots: false,
        },
      },
    ],
  };

  return (
    <div className=" overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/story-bg.jpeg"
        imageAlt="H&S Real Estate — our story in Dubai and globally"
        eyebrow="Haqsons Group · Since 2006 in Dubai"
        titleBefore="Our story"
        description="A global leader in property investment, headquartered in Dubai—trusted by Emaar, Meraas, and DAMAC with 150+ awards and a $1B+ track record."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our story", href: null },
        ]}
        stats={[
          { value: "25+", label: "Years in UAE" },
          { value: "150+", label: "Industry awards" },
          { value: "$1B+", label: "Sales record" },
          { value: "4+", label: "Countries" },
        ]}
      />
      <div className="px-4 md:px-6">
        <Fade bottom duration={1500}>
          <h2 className="text-3xl md:text-6xl  max-w-screen-2xl mx-auto font-custom pt-16 md:pt-24 pb-8">
            Who We Are
          </h2>
        </Fade>
        <div className="bg-white  font-custom2 pb-8">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-28">
            <Fade left duration={1500}>
              <div className="flex flex-col gap-8 justify-center">
                <p className="text-lg leading-relaxed text-gray-600 tracking-widest">
                  H&S Real Estate, a subsidiary of Haqsons Group, is a global
                  leader in property investment, headquartered in Dubai. With
                  over 30 professionals and a presence in four countries,
                  including the UAE, Pakistan, Angola, and Japan, we bring both
                  local expertise and global reach to every project.
                </p>
                <p className="text-lg leading-relaxed text-gray-600  tracking-widest">
                  For 25 years, we’ve been at the forefront of the UAE’s real
                  estate sector, working with renowned developers like Emaar,
                  Meraas, and Damac. Our presence spans major cities in the UAE
                  and across the globe gaining us investor trust in delivering
                  exceptional results.
                </p>
                <p className="text-lg leading-relaxed text-gray-600  tracking-widest">
                  Founded in 2006 under the Haq family, our leadership includes:
                </p>

                <div className="flex flex-col gap-2 tracking-wider">
                  <span className="text-sm md:text-lg font-semibold">
                    Emad Haq (Vice Chairman H&S-Group)
                  </span>
                  <span className="text-sm md:text-lg font-semibold">
                    Saad Haq (Group CEO H&S Properties)
                  </span>
                  <span className="text-sm md:text-lg font-semibold">
                    Fahad Haq (CEO-H&S Real Estate)
                  </span>
                </div>
              </div>
            </Fade>

            <Fade right duration={1500}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/our-story/Image-1.jpg"
                  alt="H&S Team"
                  className="w-full about-img-shadow rounded-lg object-cover"
                  loading="lazy"
                />
              </div>
            </Fade>
          </div>
        </div>
        <Fade bottom duration={1500}>
          <SectionSubHeading title="Mission & Vision" />
        </Fade>
        <div className="bg-white relative pt-3 md:pt-8 pb-20 md:pb-32 font-custom2">
          <div className="absolute inset-0 flex justify-between items-center z-0">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/logos-icons/1.png"
              alt="Floral Left"
              className="w-80 h-auto opacity-90 z-0 "
              loading="lazy"
            />
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/logos-icons/2.png"
              alt="Floral Right"
              className="w-80 h-auto opacity-90 z-0"
              loading="lazy"
            />
          </div>

          <div className="relative max-w-screen-2xl mx-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 md:gap-10 relative z-10">
              <Fade left duration={1500}>
                <div className="bg-[#E0E0E03D] p-8 rounded-lg  col-span-1 row-span-1 border border-[#0000004D]">
                  <p className="text-secondary text-lg text-center tracking-wider leading-relaxed">
                    Our mission is to provide unmatched service through
                    continuous development and innovation. By delivering an
                    exceptional white glove experience to both local and
                    international clients, we foster long-term growth and
                    success in your real estate endeavours.
                  </p>
                </div>
              </Fade>
              <div></div>
              <div></div>
              <Fade right duration={1500}>
                <div className="bg-[#E0E0E03D] p-8 rounded-lg   col-span-1 row-span-1 border border-[#0000004D]">
                  <p className="text-secondary text-lg text-center tracking-wider leading-relaxed">
                    We envision becoming a global leader by achieving excellence
                    across all our ventures. At H&S, we believe that innovation,
                    dedication, and strong values are the keys to sustained
                    success and achieving greatness.
                  </p>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 grid-rows-4 md:grid-rows-2 gap-4 pb-4">
          <div className="col-span-6 row-span-1 md:col-span-4 md:row-span-1">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/our-story/Image-2.jpg"
              alt="Image 1"
              className="w-full h-96 object-cover rounded-lg"
              loading="lazy"
            />
          </div>

          <div className="col-span-6 row-span-1 md:col-span-2 md:row-span-1">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/our-story/Image-3.jpg"
              alt="Image 2"
              className="w-full h-96 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="col-span-6 row-span-1 md:col-span-2 md:row-span-1">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/our-story/Image-4.jpg"
              alt="Image 3"
              className="w-full h-96 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div className="col-span-6 row-span-1 md:col-span-4 md:row-span-1">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/our-story/Image-5.jpg"
              alt="Image 4"
              className="w-full h-96 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
        <div className="pt-8 pb-20 md:pt-16 md:pb-36 font-custom2">
          <div className="max-w-screen-2xl mx-auto text-center ">
            <h2 className="text-3xl md:text-6xl mb-4 md:mb-6 font-custom">
              Achievements
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-custom3 text-base leading-relaxed text-neutral-600 md:mb-12 md:text-lg">
              The same verified trophies as our{" "}
              <Link
                href="/awards"
                className="font-semibold text-neutral-950 underline decoration-neutral-950/25 underline-offset-[3px] transition hover:text-neutral-600"
              >
                awards gallery
              </Link>{" "}
              — newest first, from Emaar, DLD, Nakheel, Meraas, DAMAC, and more.
            </p>
            <div className="max-w-screen-2xl m-auto ">
              <Slider {...settings}>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OurStoryPage;
