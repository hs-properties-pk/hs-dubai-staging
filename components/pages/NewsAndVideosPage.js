"use client";
import React, { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import News from "@/components/News";
import VideoPopUp from "@/components/VideoPopUp";
import PremiumPageHero from "../PremiumPageHero";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function NewsAndVideosPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVideoSrc, setSelectedVideoSrc] = useState("");

  const handleVideoClick = (videoSrc) => {
    setSelectedVideoSrc(videoSrc);
    setShowPopup(true);
  };

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

  const blogs = [
    {
      imageSrc: "/Video/video-1.png",
      videoSrc: "/Video/video-1.mp4",
      title: "Best Property Company in UAE",
      date: "August, 11 2024",
    },
    {
      videoSrc:
        "/Video/H&S Real Estate Awarded at Emaar Annual Broker Awards 2022.mp4",
      imageSrc: "/Video/video-2.png",
      title: "H&S Real Estate Awarded at Emaar Annual Broker Awards 2022",
      date: "November, 05 2021",
    },
    {
      videoSrc: "/Video/THE BLACK ONYX AWARD 2024 REEL H&S 2024.mp4",
      imageSrc: "/Video/video-3.jpg",
      title: "The Black Onyx Award 2024",
      date: "January, 09 2019",
    },
    {
      videoSrc: "/Video/16x9 Emaar 2021 Awards.mp4",
      imageSrc: "/Video/video-4.jpg",
      title: "H&S Real Estate Awarded at Emaar Annual Broker Awards 2021",
      date: "January, 09 2019",
    },
  ];
  return (
    <div className="overflow-hidden">
      <PremiumPageHero
        image="/Bg-Imgs/news-and-videos-bg.jpg"
        imageAlt="H&S Real Estate — news and market updates"
        eyebrow="Media & market updates"
        titleBefore="News & Videos"
        description="Catch up with H&S: latest Dubai real estate news, launches, and media from Dubai’s No.1 awarded broker (DLD 2025)."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: null },
        ]}
        stats={[
          { value: "No.1", label: "DLD — UAE 2025" },
          { value: "500+", label: "Projects" },
          { value: "30+", label: "Top Developers" },
          { value: "35+", label: "Years experience" },
        ]}
      />
      <SectionHeading
        title="News"
        subTitle="Catch Up with H&S! Stay updated through our latest news "
      />
      <News />
      <SectionHeading
        title="Videos"
        subTitle="Catch Up with H&S! Stay updated through our latest videos "
      />
      <div className="max-w-screen-2xl mx-auto  px-4  pt-6 pb-20 md:pb-28">
        <Slider {...settings} className="custom-slider">
          {blogs.map((blog, index) => (
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
      <Footer />
    </div>
  );
}

export default NewsAndVideosPage;
