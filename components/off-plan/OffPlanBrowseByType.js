"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaRegBuilding } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { countOffPlanListingsByType } from "@/lib/offPlanTypeRoutes";

const CARDS = [
  {
    slug: "villa",
    title: "Off-Plan Villas",
    blurb: "Golf, beach, and family communities — Dubai Hills, Palm Jebel Ali, and more.",
    cta: "Explore villas",
    typeSlug: "villa",
    image: "/off-plan/villa/villa.jpg",
    imageAlt: "Beachfront villa-style off-plan property in Dubai",
    Icon: MdOutlineVilla,
  },
  {
    slug: "apartment",
    title: "Off-Plan Apartments",
    blurb: "Studios to penthouses in waterfront, downtown, and emerging districts.",
    cta: "Explore apartments",
    typeSlug: "apartment",
    image: "/off-plan/apartments/apartments.webp",
    imageAlt: "Contemporary off-plan high-rise residential tower in Dubai",
    Icon: FaRegBuilding,
  },
  {
    slug: "townhouse",
    title: "Off-Plan Townhouses",
    blurb: "Space and value in family-focused master plans across Dubai.",
    cta: "Explore townhouses",
    typeSlug: "townhouse",
    image: "/off-plan/townhouses/townhouse.webp",
    imageAlt: "Modern off-plan townhouse community in Dubai",
    Icon: IoHomeOutline,
  },
];

// Cards linking to off-plan type listing pages (villa, apartment, townhouse).
export default function OffPlanBrowseByType({ offPlanCategorySlug = null }) {
  const isCategoryPage = Boolean(offPlanCategorySlug);

  return (
    <section
      className="border-b border-neutral-200 bg-white py-8 md:py-10"
      aria-label="Browse off-plan by property type"
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
        {isCategoryPage ? (
          <div className="mb-6 max-w-2xl">
            <h2 className="font-custom text-lg font-bold tracking-tight text-black md:text-xl">
              Explore by type
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Open another off-plan category below, or return to the full list with the main filters.
            </p>
          </div>
        ) : (
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Browse by type
            </p>
            <h2 className="mt-2 font-custom text-2xl font-bold tracking-tight text-black md:text-3xl">
              Off-Plan Properties in Dubai
            </h2>
            <p className="mt-2 text-sm text-neutral-600 md:text-base">
              Pick a category below, or narrow results with the filters in the next section.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => {
            const count = countOffPlanListingsByType(card.typeSlug);
            const to = `/properties/off-plan/${card.slug}`;
            const CardIcon = card.Icon;
            const isCurrent = Boolean(
              offPlanCategorySlug && card.slug === offPlanCategorySlug
            );
            return (
              <Link
                key={card.slug}
                href={to}
                className={[
                  "group relative flex min-h-[280px] flex-col justify-end overflow-hidden p-5 text-white",
                  "rounded-2xl border border-neutral-200/80",
                  "shadow-sm transition hover:shadow-md",
                  isCurrent ? "ring-2 ring-black ring-offset-2" : "hover:ring-1 hover:ring-neutral-400/60",
                ].join(" ")}
                aria-current={isCurrent ? "true" : undefined}
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                {/* Dark scrim from bottom — strong at base, fades upward so copy stays readable */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%] bg-[linear-gradient(to_top,rgb(0,0,0)_0%,rgba(0,0,0,0.92)_18%,rgba(0,0,0,0.65)_42%,rgba(0,0,0,0.22)_72%,transparent_100%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,_rgba(255,255,255,0.08),_transparent_50%)]"
                  aria-hidden
                />
                <span
                  className="absolute right-3 top-3 z-10 rounded-md border border-white/20 bg-black/30 px-2.5 py-1 text-xs font-medium text-white/95 backdrop-blur-sm"
                  aria-label={`${count} matching projects`}
                >
                  {count}+ projects
                </span>
                <div className="relative z-10 [text-shadow:0_1px_12px_rgba(0,0,0,0.85)]">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 backdrop-blur-[2px]">
                    <CardIcon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-custom text-lg font-bold leading-snug text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-white/90">{card.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white group-hover:gap-2">
                    {isCurrent ? "Viewing" : card.cta}
                    {!isCurrent ? <FaArrowRight className="h-3 w-3" aria-hidden /> : null}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
