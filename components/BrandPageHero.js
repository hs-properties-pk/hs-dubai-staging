"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./NavBar";
import { MdOutlineNavigateNext } from "react-icons/md";

/**
 * Full-width brand hero: breadcrumbs, copy, primary CTA — same gradient + typography
 * theme as `PremiumPageHero`. Stats live in `BrandAboutStatsSection` below.
 */
export default function BrandPageHero({
  image = "/Bg-Imgs/off-plan-bg.jpg",
  imageAlt = "H&S Real Estate",
  eyebrow = "Developers · H&S Real Estate",
  brandName,
  headline,
  tagline,
  description,
  breadcrumbs = [],
  primaryCta,
  className = "",
}) {
  const h1Text = headline || brandName;

  return (
    <div
      className={`relative flex min-h-[68vh] flex-col md:min-h-[82vh] ${className}`}
    >
      <Navbar isHomeNavbar={false} />

      <div className="relative flex flex-1 flex-col md:min-h-[58vh]">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-zinc-950/88 to-black/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/88 via-transparent to-black/35 md:to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center px-4 pt-24 pb-12 md:px-8 md:pt-28 md:pb-16 lg:px-12 lg:pt-16 xl:pl-16">
          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1 font-custom2 text-sm text-white md:text-base"
            >
              {breadcrumbs.map((crumb, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.label}>
                    {i > 0 && (
                      <MdOutlineNavigateNext
                        className="shrink-0 text-white"
                        size={22}
                        aria-hidden
                      />
                    )}
                    {last || !crumb.href ? (
                      <span
                        className={
                          last
                            ? "font-medium capitalize text-white"
                            : "capitalize text-white"
                        }
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="capitalize text-white underline-offset-4 transition hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          <div className="w-full max-w-5xl">
            <div>
              {eyebrow && (
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="h-px w-8 shrink-0 bg-white md:w-10"
                    aria-hidden
                  />
                  <p className="font-custom2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
                    {eyebrow}
                  </p>
                </div>
              )}

              <h1 className="font-custom text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
                {h1Text}
              </h1>

              {tagline && (
                <p className="mt-3 font-custom2 text-lg font-medium text-white/95 md:text-xl">
                  {tagline}
                </p>
              )}

              {description && (
                <p className="mt-4 max-w-full whitespace-pre-line font-custom2 text-base leading-relaxed text-white/90 md:text-lg">
                  {description}
                </p>
              )}

              {primaryCta?.href && primaryCta?.label && (
                <div className="mt-8">
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center rounded-md border border-white bg-white px-6 py-3 font-custom2 text-sm font-semibold text-black transition hover:bg-transparent hover:text-white md:text-base"
                  >
                    {primaryCta.label}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
