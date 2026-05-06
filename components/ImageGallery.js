"use client";
import { useState, useMemo, useEffect } from "react";
import { LuMapPin } from "react-icons/lu";
import { TbPhoto } from "react-icons/tb";
import MapboxPropertyDetails from "./MapboxPropertyDetails";
import { RxCross1 } from "react-icons/rx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ImageGallery = ({ images, location }) => {
  const normalizedImages = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) return [];
    return images
      .map((img) => {
        if (img == null) return null;
        if (typeof img === "string" && img.trim()) return { url: img.trim() };
        if (typeof img === "object" && img.url) return { url: String(img.url).trim() };
        return null;
      })
      .filter((x) => x && x.url);
  }, [images]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    setSelectedIndex(0);
  }, [normalizedImages]);

  const safeIndex =
    normalizedImages.length === 0
      ? -1
      : Math.min(selectedIndex, normalizedImages.length - 1);
  const selectedImage = safeIndex >= 0 ? normalizedImages[safeIndex] : null;

  const openSlider = () => setIsSliderOpen(true);
  const closeSlider = () => setIsSliderOpen(false);
  const openMap = () => setIsMapOpen(true);
  const closeMap = () => setIsMapOpen(false);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-16 left-1/2 translate-x-6 w-10 h-10 md:w-14 md:h-14 text-white border-2 border-white rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
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
        className="absolute -bottom-16 left-1/2 -translate-x-12 w-10 h-10 md:w-14 md:h-14 text-white border-2 border-white rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
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
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const hasMap = location && location.lat && location.lng;

  return (
    <div
      className={`w-full mx-auto flex flex-col md:flex-row font-custom2 px-4 md:px-6 ${
        isSliderOpen || isMapOpen ? "md:space-x-0" : "md:space-x-4"
      }`}
    >
      {/* Main Image */}
      <div className="w-full md:w-2/3 relative min-h-[35vh] md:min-h-[70vh]">
        {selectedImage ? (
          <img
            src={selectedImage.url}
            alt="Selected property"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-200 text-gray-500">
            No photos available
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex space-x-4 mt-4 md:mt-0 z-10">
          <div
            onClick={openSlider}
            className="flex items-center gap-3 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition tracking-wider cursor-pointer"
          >
            <TbPhoto />
            <span>{`${normalizedImages.length} Photos`}</span>
          </div>
          {hasMap && (
            <div
              onClick={openMap}
              className="flex items-center gap-3 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition tracking-wider cursor-pointer"
            >
              <LuMapPin />
              <span>Map</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails — all images including first, scrollable */}
      <div className={`hidden md:flex flex-col w-full md:w-1/3 gap-4 max-h-[70vh] pr-1 ${normalizedImages.length > 3 ? "overflow-y-auto" : "overflow-y-hidden"}`}>
        {normalizedImages.map((image, index) => (
          <div
            key={`thumb-${index}`}
            className="relative min-h-[22vh] shrink-0 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover rounded-lg hover:opacity-80 transition duration-500 ${
                safeIndex === index ? "ring-2 ring-black" : ""
              }`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Slider */}
      {isSliderOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={closeSlider}
            className="absolute top-2 right-2 text-black bg-white rounded-full p-3 z-50"
          >
            <RxCross1 size="1.4em" />
          </button>
          <div className="relative w-[92vw] md:w-[65vw] md:h-[80vh] my-auto rounded-lg image-gallery">
            <Slider {...settings}>
              {normalizedImages.map((image, index) => (
                <div key={`slide-${index}`} className="relative h-[33vh] md:h-[76vh]">
                  <img
                    src={image.url}
                    alt={`Photo ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg transition duration-500"
                    loading="eager"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {isMapOpen && hasMap && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={closeMap}
            className="absolute top-2 right-2 text-black bg-white rounded-full p-3 z-50"
          >
            <RxCross1 size="1.4em" />
          </button>
          <div className="relative w-full mx-6 max-w-screen-2xl h-[80vh] rounded-lg">
            <MapboxPropertyDetails geography={location} round={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
