"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./NavBar";
import HSGermanNavbar from "./HSGermanNavbar";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function PremiumPageHero({
  image,
  imageAlt = "H&S Real Estate",
  eyebrow,
  headline,
  titleBefore,
  titleAccent,
  tagline,
  description,
  breadcrumbs = [],
  stats = [],
  isGermanNavbar = false,
  setShowPopup,
  className = "",
}) {
  return (
    <div
      className={`relative flex min-h-[68vh] flex-col md:min-h-[82vh] ${className}`}
    >
      {isGermanNavbar ? (
        <HSGermanNavbar setShowPopup={setShowPopup} isGermanNavbar />
      ) : (
        <Navbar isHomeNavbar={false} />
      )}

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

        <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center px-4 pt-24 pb-10 md:px-8 md:pt-28 md:pb-18 lg:px-12 lg:pt-16 lg:pb-6 xl:pl-16">
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

          <h1 className="font-custom text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
            {headline ?? (
              <>
                {titleBefore && (
                  <span className="mr-2 inline text-white">{titleBefore}</span>
                )}
                {titleAccent && (
                  <span className="inline text-white">{titleAccent}</span>
                )}
              </>
            )}
          </h1>

          {tagline && (
            <p className="mt-4 font-custom2 text-xl font-medium text-white md:text-2xl">
              {tagline}
            </p>
          )}

          {description && (
            <p className="mt-4 max-w-2xl font-custom2 text-base leading-relaxed text-white md:text-lg">
              {description}
            </p>
          )}

          {stats.length > 0 && (
            <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 md:mt-12 md:gap-10 lg:max-w-3xl">
              {stats.map((item) => (
                <li key={item.label} className="text-left flex flex-col items-start">
                  <p className="font-custom text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-[2rem]">
                    {item.value}
                  </p>
                  <p className="mt-1 font-custom2 text-xs text-white md:text-sm">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
