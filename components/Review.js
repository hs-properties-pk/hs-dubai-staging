"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaStar } from "react-icons/fa6";
import { googleReviews } from "@/data/google-reviews";

const GOOGLE_REVIEWS_URL = "https://share.google/J6Vdxu6wWMPiXBXTI";

/** Prefer 4–5★ reviews with readable length (tuned for edited GMB copy). */
const LEN_MIN = 80;
const LEN_MAX = 480;
const FALLBACK_LEN_MIN = 40;
const FALLBACK_LEN_MAX = 600;
const MAX_SLIDES = 36;

/** Supports flat `{ reviewer, rating, comment }` and legacy GMB API shape. */
function normalizeRating(r) {
  if (typeof r.rating === "number" && Number.isFinite(r.rating)) {
    return Math.min(5, Math.max(0, Math.round(r.rating)));
  }
  if (typeof r.starRating === "string") {
    const map = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      STAR_RATING_UNSPECIFIED: 0,
    };
    return map[r.starRating] ?? 5;
  }
  return 5;
}

function getReviewerName(r) {
  if (typeof r.reviewer === "string") return r.reviewer.trim();
  if (r.reviewer && typeof r.reviewer === "object" && r.reviewer.displayName) {
    return String(r.reviewer.displayName).trim();
  }
  return "Google reviewer";
}

function formatReviewDate(iso) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

function getReviewDate(r) {
  if (r.date) return formatReviewDate(r.date);
  if (r.createTime) return formatReviewDate(r.createTime);
  return "";
}

function stableId(r, index) {
  const legacyId = typeof r.name === "string" ? r.name : "";
  if (legacyId) return legacyId;
  return `${index}-${getReviewerName(r)}-${String(r.comment || "").slice(0, 32)}`;
}

function shuffleArray(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickHomepageReviews(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  const strong = (r) => normalizeRating(r) >= 4;

  const inBand = (r, min, max) => {
    const len = String(r.comment || "").trim().length;
    return len >= min && len <= max;
  };

  let pool = raw.filter(strong).filter((r) => inBand(r, LEN_MIN, LEN_MAX));
  if (pool.length < 8) {
    pool = raw.filter(strong).filter((r) => inBand(r, FALLBACK_LEN_MIN, FALLBACK_LEN_MAX));
  }
  if (pool.length === 0) {
    pool = raw.filter((r) => String(r.comment || "").trim().length > 0);
  }

  return pool.slice(0, MAX_SLIDES).map((r, index) => ({
    id: stableId(r, index),
    name: getReviewerName(r),
    comment: String(r.comment || "").trim(),
    rating: normalizeRating(r),
    date: getReviewDate(r),
  }));
}

// shuffleReviews: randomize slide order on the client only (keeps SSR markup stable).
export default function Review({ shuffleReviews = false, headingClass = "" }) {
  const picked = useMemo(() => pickHomepageReviews(googleReviews), []);

  const [shuffled, setShuffled] = useState(null);

  useEffect(() => {
    if (!shuffleReviews) {
      setShuffled(null);
      return;
    }
    setShuffled(shuffleArray(picked));
  }, [shuffleReviews, picked]);

  const slides =
    shuffleReviews && shuffled != null ? shuffled : picked;

  const settings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: slides.length > 2,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      swipe: true,
      draggable: true,
      touchMove: true,
      swipeToSlide: true,
      autoplay: slides.length > 2,
      autoplaySpeed: 6000,
      pauseOnHover: true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: slides.length > 1,
            autoplay: slides.length > 1,
          },
        },
      ],
    }),
    [slides.length]
  );

  if (slides.length === 0) return null;

  return (
    <section className="max-w-screen-2xl mx-auto font-custom2 pt-8 md:pt-12 md:pb-10 px-4 md:px-6">

      <div className="flex flex-col items-center mb-8 md:mb-10">
        <p className={`text-black text-3xl md:text-5xl capitalize mb-10 md:mb-18 font-custom text-center ${headingClass}`}>
          What our clients say about us
        </p>
        <Link
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block opacity-95 hover:opacity-100 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 rounded"
          aria-label="Read our Google reviews (opens in a new tab)"
        >
          <Image
            src="/google-reviews-black.svg"
            alt=""
            width={156}
            height={35}
            className="h-10 w-auto md:h-12 mx-auto"
            unoptimized
          />
        </Link>
      </div>

      <div
        className="relative pb-8 md:pb-10 [&_.slick-list]:cursor-grab [&_.slick-list:active]:cursor-grabbing [&_.slick-list]:pt-1 [&_.slick-list]:pb-2 [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full"
      >
        <Slider {...settings}>
          {slides.map((review) => (
            <div key={review.id} className="box-border px-2 md:px-3 h-full">
              <blockquote className="box-border bg-white border border-neutral-200 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col w-full h-[15rem] sm:h-[16rem] md:h-[17rem]">
                <p className="text-center text-xl md:text-2xl text-black leading-snug md:leading-relaxed font-custom3 flex-1 min-h-0 overflow-y-auto overscroll-contain px-0.5">
                  “{review.comment}”
                </p>
                <footer className="mt-3 pt-3 border-t border-neutral-100 flex flex-col items-center justify-center gap-1.5 shrink-0">
                  <div className="flex items-center gap-0.5" aria-hidden>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-amber-500 w-4 h-4 md:w-[18px] md:h-[18px]"
                            : "text-neutral-200 w-4 h-4 md:w-[18px] md:h-[18px]"
                        }
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-0.5 text-center">
                    <cite className="not-italic text-sm md:text-[15px] font-semibold text-black font-custom2">
                      — {review.name}
                    </cite>
                    {review.date && (
                      <span className="text-xs text-neutral-500 font-custom3">
                        {review.date}
                      </span>
                    )}
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
