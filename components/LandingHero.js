"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";

// Hero with full-bleed image; optional sidePanel (e.g. form) on large screens.
export default function LandingHero({
  imageSrc,
  imageAlt,
  badgeText,
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  showScrollIndicator = true,
  secondaryCtaHref,
  secondaryCtaLabel = "WhatsApp",
  sidePanel = null,
}) {
  const hasSidePanel = Boolean(sidePanel);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover scale-[1.01]"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Layered overlay: readability without flat gray wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />
      </div>

      <div
        className={
          hasSidePanel
            ? "relative z-10 flex min-h-[100dvh] items-center justify-center px-6 lg:px-24 py-20 md:py-24"
            : "relative z-10 flex min-h-[100dvh] items-center justify-center px-6 lg:px-24 pt-20 pb-28"
        }
      >
        <div
          className={
            hasSidePanel
              ? "w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)] gap-10 lg:gap-12 xl:gap-16 items-center"
              : "max-w-4xl text-center mx-auto w-full"
          }
        >
          <div className={hasSidePanel ? "text-left max-w-xl lg:max-w-2xl" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="space-y-7"
            >
              {badgeText && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-custom2"
                >
                  <span className="inline-block border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {badgeText}
                  </span>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] font-custom tracking-tight"
              >
                {title}
                {subtitle && (
                  <span
                    className="block text-white/90 mt-5 font-custom3 font-normal tracking-normal"
                    style={{ fontSize: "0.42em", lineHeight: 1.4 }}
                  >
                    {subtitle}
                  </span>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-base md:text-lg text-white/80 leading-relaxed font-custom3 ${
                  hasSidePanel ? "max-w-xl" : "max-w-2xl mx-auto"
                }`}
              >
                {description}
              </motion.p>

              {hasSidePanel && ctaText && onCtaClick && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col sm:flex-row gap-3 pt-2 items-stretch sm:items-center font-custom2"
                >
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="sm:min-w-[200px] px-8 py-3.5 bg-white text-neutral-950 text-sm font-semibold uppercase tracking-wide hover:bg-neutral-100 transition-colors"
                  >
                    {ctaText}
                  </button>
                  {secondaryCtaHref && (
                    <a
                      href={secondaryCtaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors"
                    >
                      <FaWhatsapp className="text-lg text-[#25D366]" aria-hidden />
                      {secondaryCtaLabel}
                    </a>
                  )}
                </motion.div>
              )}

              {!hasSidePanel && ctaText && onCtaClick && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 pt-2 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto font-custom2"
                >
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="sm:min-w-[200px] px-8 py-3.5 bg-white text-neutral-950 text-sm font-semibold uppercase tracking-wide hover:bg-neutral-100 transition-colors"
                  >
                    {ctaText}
                  </button>
                  {secondaryCtaHref && (
                    <a
                      href={secondaryCtaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors"
                    >
                      <FaWhatsapp className="text-lg text-[#25D366]" aria-hidden />
                      {secondaryCtaLabel}
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {hasSidePanel ? (
            <div className="hidden lg:block w-full min-w-0 shrink-0 justify-self-end">
              {sidePanel}
            </div>
          ) : null}
        </div>
      </div>

      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-12 left-1/2 z-20 w-full max-w-[min(100vw-2rem,28rem)] -translate-x-1/2 px-4"
        >
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 text-white/50">
            <a
              href="https://www.facebook.com/hspropertyrealestate/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 opacity-90 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              aria-label="H&S Real Estate on Facebook"
            >
              <Image
                src="/communities/facebook-reviews.svg"
                alt=""
                width={120}
                height={36}
                className="h-6 w-auto sm:h-8 md:h-9 lg:h-10"
                unoptimized
              />
            </a>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="flex flex-col items-center shrink-0"
            >
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-custom2 mb-1 sm:mb-2">
                Scroll
              </span>
              <div className="w-px h-5 sm:h-6 md:h-8 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
            <a
              href="https://share.google/J6Vdxu6wWMPiXBXTI"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 opacity-90 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              aria-label="H&S Real Estate on Google"
            >
              <Image
                src="/communities/google-reviews.svg"
                alt=""
                width={156}
                height={35}
                className="h-6 w-auto sm:h-8 md:h-9 lg:h-10"
                unoptimized
              />
            </a>
          </div>
        </motion.div>
      )}
    </section>
  );
}
