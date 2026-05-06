// components/Gallery.jsx
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

const LandingPageGallery = ({
  images,
  title = "Gallery",
  description = "Experience the Luxury",
  className = "",
  id,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryScrollRef = useRef(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = 400;
      galleryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToImage = (index) => {
    if (galleryScrollRef.current) {
      const scrollLeft = index * (384 + 32);
      galleryScrollRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      setCurrentImageIndex(index);
    }
  };

  return (
    <section id={id} className={`py-24 md:py-28 border-t border-neutral-200/80 ${className}`.trim()}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16 px-6 max-w-4xl mx-auto"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2 mb-4">
            Gallery
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 font-custom tracking-tight leading-[1.15]">
            {title}
          </h2>
          <p className="text-neutral-600 text-base md:text-lg font-custom3 mt-5 leading-relaxed">{description}</p>
        </motion.div>

        <div className="relative group">
          <button
            type="button"
            onClick={() => scrollGallery("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-neutral-950/90 hover:bg-neutral-950 p-3 md:p-4 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Scroll gallery left"
          >
            <FaChevronLeft className="text-white text-xl" />
          </button>

          {/* Gallery Container */}
          <div className="relative w-full">
            <div
              ref={galleryScrollRef}
              className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 py-4 md:py-6 cursor-grab active:cursor-grabbing w-full"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onScroll={() => {
                if (galleryScrollRef.current) {
                  const scrollLeft = galleryScrollRef.current.scrollLeft;
                  const cardWidth = 384 + 32;
                  const newIndex = Math.round(scrollLeft / cardWidth);
                  setCurrentImageIndex(newIndex);
                }
              }}
            >
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[min(22rem,85vw)] h-72 md:h-80 relative cursor-pointer group/item snap-start"
                  onClick={() => openLightbox(idx)}
                >
                  {img.src ? (
                    <Image
                      src={img.src}
                      alt={img.alt || `Gallery ${idx + 1}`}
                      fill
                      className="object-cover rounded-xl border border-neutral-200 group-hover/item:scale-[1.02] transition-transform duration-500 shadow-sm"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 border border-neutral-300">
                      <FaTimes size={48} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/25 transition-all duration-300 rounded-xl flex items-center justify-center">
                    <div className="opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-white">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <FaArrowRight className="text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-neutral-950 text-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider font-custom2">
                    {idx + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scrollGallery("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-neutral-950/90 hover:bg-neutral-950 p-3 md:p-4 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
            aria-label="Scroll gallery right"
          >
            <FaChevronRight className="text-white text-xl" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-slate-300 transition-colors z-10 p-3 bg-black/50 rounded-full hover:bg-black/70"
            >
              <FaTimes size={28} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-6 text-white hover:text-slate-300 transition-colors z-10 p-4 bg-black/50 rounded-full hover:bg-black/70"
            >
              <FaArrowLeft size={28} />
            </button>

            <div className="relative max-w-6xl max-h-full">
              {images[lightboxIndex]?.src ? (
                <Image
                  src={images[lightboxIndex].src}
                  alt={
                    images[lightboxIndex].alt ||
                    `Gallery image ${lightboxIndex + 1}`
                  }
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                />
              ) : (
                <div className="w-full h-96 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-500 border border-neutral-300">
                  <FaTimes size={96} />
                </div>
              )}
            </div>

            <button
              onClick={nextImage}
              className="absolute right-6 text-white hover:text-slate-300 transition-colors z-10 p-4 bg-black/50 rounded-full hover:bg-black/70"
            >
              <FaArrowRight size={28} />
            </button>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-lg">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LandingPageGallery;
