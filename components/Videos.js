import React from "react";
import VideoCard from "./VideoCard";
import Fade from "react-reveal/Fade";

const Videos = ({ setShowPopup }) => {
  const blogs = [
    {
      imageSrc: "/video-1.png",
      videoSrc: "/Video/homeHero.mp4",
      title: "Best Property Company in UAE",
      date: "August, 11 2024",
    },
    {
      videoSrc:
        "/Video/H&S Real Estate Awarded at Emaar Annual Broker Awards 2022.mp4",
      imageSrc: "/Blog/blog-1.jpg",
      title: "H&S Real Estate Awarded at Emaar Annual Broker Awards 2022",
      date: "November, 05 2021",
    },
    {
      videoSrc: "",
      imageSrc: "/Blog/blog-2.jpg",
      title: "H&S Real Estate wins award for sales success",
      date: "January, 09 2019",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 ">
      {blogs.map((blog, index) => (
        <Fade bottom duration={1000 + index * 200} key={index}>
          <VideoCard
            setShowPopup={setShowPopup}
            key={index}
            imageSrc={blog.imageSrc}
            videoSrc={blog.videoSrc}
            date={blog.date}
            title={blog.title}
            id={blog.id}
          />
        </Fade>
      ))}
    </div>
  );
};

export default Videos;
