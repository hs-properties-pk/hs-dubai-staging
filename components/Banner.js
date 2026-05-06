"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: false,
  arrows: false,
  // nextArrow: <NextArrow />,
  // prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
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

export default function Banner() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setError(true);
        } else {
          setReels(data);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleImageError = (reelId) => {
    setImageErrors((prev) => new Set(prev).add(reelId));
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto flex justify-center items-center py-20">
        <ClipLoader color="#000" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-2xl mx-auto flex justify-center items-center py-20">
        <p className="text-gray-600 text-lg font-medium">
          No reels found or failed to load.
        </p>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {reels.map((reel) => {
        const thumbnailUrl = reel.thumbnail_url || reel.media_url;
        const fallbackImage = "/insta-thumbnail.png";
        // Use fallback if no thumbnail URL or if image failed to load
        const imageSrc = !thumbnailUrl || imageErrors.has(reel.id) 
          ? fallbackImage 
          : thumbnailUrl;

        return (
          <div key={reel.id} className="relative px-4 group py-6">
            <div className="relative w-full aspect-[9/16] overflow-hidden rounded-lg">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 16vw"
                src={imageSrc}
                alt={`Instagram reel ${reel.id}`}
                className="object-cover transition duration-500 group-hover:-translate-y-2 group-hover:shadow-lg"
                unoptimized
                loading="lazy"
                onError={() => handleImageError(reel.id)}
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <Link
                  href={reel.permalink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur bg-white/5 text-white rounded-full border p-2 hover:bg-white/10 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-4.928-2.488A1 1 0 008.5 9.6v4.8a1 1 0 001.324.936l4.928-2.488a1 1 0 000-1.792z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
