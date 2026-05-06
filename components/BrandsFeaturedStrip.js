"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const FEATURED_SLUGS = [
  "emaar-properties",
  "damac-properties",
  "nakheel-properties",
  "sobha-realty",
  "meraas",
  "ellington-properties",
  "nshama",
];

const STRIP_STATS = [
  { value: "$1B+", label: "Record setting sales" },
  { value: "25+", label: "Years in UAE market" },
  { value: "150+", label: "Industry awards" },
  { value: "4", label: "Countries" },
  { value: "100+", label: "Communities" },
];

function FeaturedBrandLink({ name, slug, logoSrc }) {
  const [imgOk, setImgOk] = useState(!!logoSrc);
  const href = `/brands/${slug}`;

  return (
    <Link
      href={href}
      className="group relative flex h-full min-h-[3.5rem] w-full items-center justify-center px-2 py-3 transition sm:min-h-[4rem] sm:px-3 md:min-h-[4.5rem] md:px-4"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/[0.02] to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex h-10 w-full max-w-[6.5rem] items-center justify-center sm:h-11 sm:max-w-[7.5rem]">
        {logoSrc && imgOk ? (
          <Image
            src={logoSrc}
            alt={name}
            width={120}
            height={44}
            className="h-7 w-auto max-w-full object-contain grayscale transition duration-300 group-hover:grayscale-0 sm:h-8"
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="text-center font-custom text-[0.6rem] font-bold uppercase leading-tight tracking-[0.15em] text-neutral-500 transition group-hover:text-black sm:text-[0.65rem] sm:tracking-[0.2em]">
            {name}
          </span>
        )}
      </div>
      <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-black transition-all duration-300 group-hover:w-3/5" />
    </Link>
  );
}

// Home: partner logos and H&S stats; mobile stacks in one column.
export default function BrandsFeaturedStrip({ brands = [] }) {
  const bySlug = new Map(brands.map((b) => [b.slug, b]));
  const featured = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(Boolean);

  if (featured.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Featured developers and H&S milestones"
    >
      {/* Top: logos — light ground, strong grid */}
      <div className="relative border-y border-black/10 bg-zinc-50/80">
        <div className="pointer-events-none absolute left-4 top-0 h-px w-20 bg-gradient-to-r from-black/25 to-transparent md:left-6" />
        <div className="pointer-events-none absolute right-4 top-0 h-px w-20 bg-gradient-to-l from-black/25 to-transparent md:right-6" />
        <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6 md:py-10">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:pb-1">
            <div>
              <p className="font-custom2 text-[0.7rem] font-bold uppercase tracking-[0.4em] text-black">
                Development partners
              </p>
              <p className="mt-1 max-w-sm font-custom2 text-sm text-neutral-600">
                Direct relationships with the teams shaping Dubai — tap a mark to
                open projects and communities.
              </p>
            </div>
            <Link
              href="/brands"
              className="group font-custom2 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-black hover:text-white"
            >
              All developers
              <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)] mb-4">
            <div className="scrollbar-hide overflow-y-hidden flex snap-x snap-mandatory flex-nowrap items-stretch divide-x divide-black/10 overflow-x-auto sm:overflow-visible">
              {featured.map((b) => (
                <div
                  key={b.slug}
                  className="min-w-[42%] shrink-0 snap-center sm:min-w-0 sm:flex-1"
                >
                  <FeaturedBrandLink
                    name={b.name}
                    slug={b.slug}
                    logoSrc={b.logoSrc}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: stats — inverted */}
      <div className="relative bg-black text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 6px,
              rgba(255,255,255,0.04) 6px,
              rgba(255,255,255,0.04) 7px
            )`,
          }}
        />
        <div className="relative mx-auto max-w-screen-2xl px-4 py-10 md:px-6 md:py-12">
          <div className="flex w-full flex-col md:flex-row">
            {STRIP_STATS.map((row) => (
              <div
                key={row.label}
                className="group flex min-h-[6.5rem] flex-1 flex-col items-center justify-center gap-2 border-b border-white/20 px-3 py-6 text-center last:border-b-0 sm:px-4 md:min-h-[7rem] md:border-b-0 md:border-l md:py-8 md:first:border-l-0"
              >
                <p className="font-custom text-2xl font-bold leading-none tracking-tight text-white sm:text-3xl md:text-4xl">
                  {row.value}
                </p>
                <p className="max-w-[10rem] font-custom2 text-[0.6rem] font-medium uppercase leading-snug tracking-[0.25em] text-zinc-300 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  {row.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
