"use client";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import Image from "next/image";
import React, { useState } from "react";
import { Fade } from "react-reveal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JobCard from "@/components/JobCard";
import CountUp from "react-countup";
import VideoPopUp from "@/components/VideoPopUp";
import PremiumPageHero from "../PremiumPageHero";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const CareerPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupHiring, setShowPopupHiring] = useState(false);
  const careerVideos = [
    {
      imageSrc: "/Career Videos/Team H&S Enjoying a day of bowling.png",
      videoSrc: "/Career Videos/Team H&S Enjoying a day of bowling.mp4",
      title: "Team H&S Enjoying a day of bowling",
      date: "July, 20 2022",
    },
    {
      videoSrc:
        "/Career Videos/Gear Up With H&S Real Estate at F1 Grand Prix in Abu Dhabi.mp4",
      imageSrc:
        "/Career Videos/Gear Up With H&S Real Estate at F1 Grand Prix in Abu Dhabi.jpeg",
      title: "Gear Up With H&S Real Estate at F1 Grand Prix in Abu Dhabi",
      date: "November 25, 2023",
    },
    {
      videoSrc:
        "/Career Videos/H&S celebrates the strength and achievements of all women on this Women's Day.mp4",
      imageSrc:
        "/Career Videos/H&S celebrates the strength and achievements of all women on this Women's Day.jpg",
      title:
        "H&S celebrates the strength and achievements of all women on this Women's Day",
      date: "March, 08 2024",
    },
  ];

  const JobData = [
    {
      id: "al-reem-island",
      title: "Commercial Sales & Lettings Broker",
      image: "/Job/a.jpg",
    },
    {
      id: "khalifa-city",
      title: "Property Sales/Lettings Consultant",
      image: "/Job/b.jpg",
    },
    {
      id: "al-rehhan-abu-dhabi",
      title: "Emiratisation Graduate Training Programme",
      image: "/Job/c.jpg",
    },
  ];

  const scrollToSection = (id, offset = 130) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const [selectedVideoSrc, setSelectedVideoSrc] = useState("");

  const handleVideoClick = (videoSrc) => {
    setSelectedVideoSrc(videoSrc);
    setShowPopup(true);
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-0 md:-bottom-20 left-1/2 translate-x-6 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white  border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
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
        className="absolute -bottom-0 md:-bottom-20 left-1/2 -translate-x-12 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronLeft className="text-sm md:text-2xl" />
      </div>
    );
  }

  function NextArrow2(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-14 md:-bottom-20 left-1/2 translate-x-6 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white  border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-800 transition duration-300"
        onClick={onClick}
      >
        <FaChevronRight className="text-sm md:text-2xl" />
      </div>
    );
  }

  function PrevArrow2(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-14 md:-bottom-20 left-1/2 -translate-x-12 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-800 transition duration-300"
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
          // arrows: false, // Hide arrows on smaller screens
          // dots: false,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow2 />,
    prevArrow: <PrevArrow2 />,
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
          // arrows: false, // Hide arrows on smaller screens
          // dots: false,
        },
      },
    ],
  };
  return (
    <div className=" overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/career-bg.jpg"
        imageAlt="Careers at H&S Real Estate Dubai"
        eyebrow="Build your real estate career"
        titleBefore="Join the dream team at H&S Real Estate"
        description="UAE’s leading brokerage: innovation, support, and growth in Dubai’s dynamic market—competitive structure and top-developer access."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: null },
        ]}
        stats={[
          { value: "500+", label: "Projects" },
          { value: "35+", label: "Years experience" },
          { value: "No.1", label: "DLD / UAE" },
          { value: "150+", label: "Industry awards" },
        ]}
      />
      <div className="bg-white py-12 md:py-20 font-custom">
        <div className="max-w-screen-2xl mx-auto text-center px-4 md:px-6">
          <Fade bottom duration={1500}>
            <h2 className="text-3xl md:text-6xl  text-black">
              Join a Team That Elevates Your Potential
            </h2>

            <p className="text-gray-600  text-lg max-w-screen-lg mx-auto tracking-wider text-center mt-10 font-custom2">
              Experience a culture of innovation, support, and growth at H&S
              Real Estate, where your ambition is met with opportunities to
              thrive and lead in Dubai’s dynamic real estate market.
            </p>
          </Fade>
          <button
            onClick={() => scrollToSection("view-current-openings")}
            className="flex  justify-center max-w-screen-2xl mx-auto text-base text-white bg-black hover:text-black hover:bg-white    items-center duration-300 border font-custom2 tracking-wider  font-medium rounded-full  p-4 border-black my-8"
          >
            View current openings
          </button>
          <Fade right duration={1500}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center  font-custom2">
              <div className="text-black">
                <h3 className="text-4xl md:text-5xl font-extrabold mb-2 md:mb-4">
                  <CountUp end={1000} duration={3} separator="," suffix=" +" />
                </h3>
                <p className="text-base tracking-widest">
                  Employees Across the UAE
                </p>
              </div>
              <div className="text-black">
                <h3 className="text-4xl md:text-5xl font-extrabold  mb-2 md:mb-4">
                  <CountUp end={16000} duration={3} separator="," suffix=" +" />
                </h3>
                <p className="text-base tracking-widest">
                  Alliance Partners Worldwide
                </p>
              </div>
              <div className="text-black">
                <h3 className="text-4xl md:text-5xl font-extrabold mb-2 md:mb-4">
                  USD 1 Billion
                </h3>
                <p className="text-base tracking-widest">
                  Sales Revenue Locked by Our Team
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      <div className="relative h-[38rem] flex items-center justify-center text-white font-custom2">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src="/careers/Image-1.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-7xl font-bold mb-4 font-custom tracking-wider">
            Transform your future.
          </h2>

          <button
            onClick={() => setShowPopupHiring(true)}
            className="mt-6 px-8 py-2 rounded-full bg-transparent border text-base md:text-2xl tracking-wider border-white text-white font-medium hover:bg-white hover:text-black transition duration-300"
          >
            Watch Now
          </button>
        </div>
      </div>
      {showPopupHiring && (
        <VideoPopUp
          videoSrc="/careers/hiring-video.mp4"
          setShowPopup={setShowPopupHiring}
        />
      )}

      <div className="max-w-screen-2xl mx-auto py-6 pt-12 md:pt-16 px-4 md:px-6 font-custom2">
        {/* <div className="font-custom text-black"> */}
        <h2 className="text-xl md:text-3xl  font-semibold font-custom text-black">
          Discover life at H&S Real Estate
        </h2>
        {/* </div> */}
      </div>
      <div className="max-w-screen-2xl mx-auto  px-4 md:px-6 py-6 pb-0 md:pb-16">
        <Slider {...settings} className="custom-slider">
          {careerVideos.map((blog, index) => (
            <VideoCard
              key={index}
              imageSrc={blog.imageSrc}
              videoSrc={blog.videoSrc}
              date={blog.date}
              title={blog.title}
              id={blog.id}
              setShowPopup={setShowPopup}
              onClick={handleVideoClick}
            />
          ))}
        </Slider>
        {showPopup && (
          <VideoPopUp videoSrc={selectedVideoSrc} setShowPopup={setShowPopup} />
        )}
      </div>
      <div
        className="max-w-screen-2xl mx-auto py-6 pt-10 px-4 md:px-6 font-custom2"
        id="view-current-openings"
      >
        <div className="font-custom text-black">
          <h2 className="text-xl md:text-3xl  font-semibold">
            Current Job Openings
          </h2>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto  px-4 md:px-6 py-6 pb-20 md:pb-28">
        <Slider {...settings2} className="custom-slider">
          {JobData.map((job, index) => (
            <JobCard {...job} key={index} />
          ))}
        </Slider>
        {showPopup && (
          <VideoPopUp videoSrc={selectedVideoSrc} setShowPopup={setShowPopup} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CareerPage;
