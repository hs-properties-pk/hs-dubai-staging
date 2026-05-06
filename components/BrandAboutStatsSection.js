"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

/**
 * “About + stats” block below the hero — black & white / neutral gray only.
 * Figures in `stats` should be verified periodically against developer reporting.
 */
export default function BrandAboutStatsSection({
  aboutSubtitle,
  aboutTitle,
  description = [],
  cta,
  stats = [],
  onExpertClick,
}) {
  return (
    <section
      className="border-b border-neutral-300 bg-white"
      aria-labelledby="brand-about-heading"
    >
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 md:gap-12 md:px-6 md:py-16 lg:grid-cols-2 lg:items-start">
        <div>
          {aboutSubtitle && (
            <p className="font-custom2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              — {aboutSubtitle}
            </p>
          )}
          <h2
            id="brand-about-heading"
            className="mt-3 font-custom text-3xl font-bold leading-tight text-black md:text-4xl"
          >
            {aboutTitle}
          </h2>
          <div className="mt-5 space-y-4 font-custom2 text-sm leading-relaxed text-neutral-600 md:text-base">
            {description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {cta?.label && (
            <div className="mt-8">
              {cta.action === "link" && cta.href ? (
                <Link
                  href={cta.href}
                  className="rounded-lg cursor-pointer inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-3 font-custom2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-black md:text-base"
                >
                  {cta.label}
                  <FaArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onExpertClick}
                  className="rounded-lg cursor-pointer inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-3 font-custom2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-black md:text-base"
                >
                  {cta.label}
                  <FaArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          <p className="mt-6 max-w-md font-custom2 text-xs text-neutral-500">
            Key figures are compiled from public developer reporting and industry
            sources; verify current numbers with official announcements.
          </p>
        </div>

        {stats.length > 0 && (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stats.map((item) => (
              <li
                key={item.label}
                className="border border-neutral-200 border-l-4 border-l-black bg-white px-4 py-4"
              >
                <p className="font-custom text-2xl font-bold tracking-tight text-black md:text-[1.65rem]">
                  {item.value}
                </p>
                <p className="mt-1 font-custom2 text-xs text-neutral-600 md:text-sm">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
