"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Fade } from "react-reveal";
import {
  FaRegBuilding,
  FaWhatsapp,
  FaRegHeart,
  FaTrophy,
  FaLock,
  FaSackDollar,
  FaEarthAmericas,
  FaBolt,
} from "react-icons/fa6";
import { TbBuildingCommunity } from "react-icons/tb";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import Footer from "@/components/Footer";
import PremiumPageHero from "@/components/PremiumPageHero";
import BrandLogo from "@/components/BrandLogo";
import BrandEnquiryModal from "@/components/BrandEnquiryModal";

const HERO_STATS = [
  { value: "25+", label: "Developers" },
  { value: "500+", label: "Off-plan projects" },
  { value: "AED 685K", label: "From" },
  { value: "DLD 2025", label: "No.1 broker" },
];

const BRANDS_WHatsapp_URL = `https://api.whatsapp.com/send/?phone=971526902884&text=${encodeURIComponent("Hello! I'd like help choosing the right developer in Dubai.")}&type=phone_number&app_absent=0`;

const ADVANTAGE_CARDS = [
  {
    title: "Official partner with all major developers",
    body: "We have direct, authorized relationships with every major Dubai developer — better access, faster deals, and sometimes exclusive pre-launch pricing.",
    Icon: FaRegHeart,
  },
  {
    title: "150+ industry awards",
    body: "Recognised by Emaar, DAMAC, Nakheel and more as a top-performing partner. Our track record speaks louder than any claim.",
    Icon: FaTrophy,
  },
  {
    title: "RERA-certified agents",
    body: "Every consultant is fully licensed by the Real Estate Regulatory Authority (RERA) — Dubai’s regulatory body for property professionals.",
    Icon: FaLock,
  },
  {
    title: "100% free service",
    body: "Our consultancy is free to buyers and investors. We are compensated directly by developers — you pay nothing extra.",
    Icon: FaSackDollar,
  },
  {
    title: "25+ years of experience",
    body: "A subsidiary of Haqsons Group — operating in the UAE, Pakistan, Angola, and Japan since 1999. Deep expertise, global reach.",
    Icon: FaEarthAmericas,
  },
  {
    title: "30-minute response",
    body: "Submit an enquiry and a dedicated consultant will respond within 30 minutes during business hours. No waiting, no delays.",
    Icon: FaBolt,
  },
];

/** Brands list with `logoSrc` from server (`data/brand-profiles` via `getBrandLogoSrc`). */
export default function BrandsPage({ brands = [] }) {
  const [q, setQ] = useState("");
  const [enquireBrand, setEnquireBrand] = useState(null);
  const [enquireSubheading, setEnquireSubheading] = useState(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return brands;
    return brands.filter((b) => {
      const blob = [
        b.name,
        b.shortDescription,
        b.propertyTypes,
        b.communitySearchText || "",
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(s);
    });
  }, [brands, q]);

  return (
    <div className="w-full min-h-screen">
      <PremiumPageHero
        image="/Bg-Imgs/brands-bg.jpg"
        imageAlt="Dubai off-plan property developers"
        eyebrow="500+ projects · H&S Real Estate"
        titleBefore="Property developers in Dubai"
        description="Compare Dubai’s leading developers — off-plan projects, community guides, and open listings. Enquire for expert shortlisting or open every project and community page we host for that brand."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: null },
        ]}
        stats={HERO_STATS}
      />

      <section className="mx-auto max-w-screen-2xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-custom text-2xl text-black md:text-3xl">
              Browse by Developer
            </div>
            <p className="mt-2 max-w-2xl font-custom2 text-sm text-neutral-600 md:text-base">
              Search by developer or brand. Each card highlights the total number of off-plan projects along with the featured community pages associated with that developer.
            </p>
          </div>
        </div>

        <div className="relative mb-10 max-w-xl">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <FaSearch className="h-4 w-4" />
          </span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search brands…"
            className="w-full rounded-lg border border-neutral-300 py-3 pl-10 pr-4 font-custom2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black md:text-base"
            aria-label="Search brands"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center font-custom2 text-neutral-600">
            No brands match your search. Try a different name.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b, index) => (
              <Fade key={b.slug} bottom duration={800 + index * 40}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
                  <div className="p-5">
                    <BrandLogo name={b.name} logoSrc={b.logoSrc} />
                    <h2 className="mt-4 font-custom text-lg font-semibold text-neutral-900">
                      {b.name}
                    </h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
                      {b.offPlanCount > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          <FaRegBuilding className="h-4 w-4" aria-hidden />
                          {b.offPlanCount} off-plan project
                          {b.offPlanCount === 1 ? "" : "s"}
                        </span>
                      )}
                      {b.communityCount > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          <TbBuildingCommunity
                            className="h-4 w-4 shrink-0"
                            aria-hidden
                          />
                          {b.communityCount} communit
                          {b.communityCount === 1 ? "y" : "ies"}
                        </span>
                      )}
                    </p>
                    <p className="mt-3 line-clamp-3 font-custom2 text-sm leading-relaxed text-neutral-600">
                      {b.shortDescription}
                    </p>
                    {b.propertyTypes ? (
                      <p className="mt-2 line-clamp-2 font-custom2 text-xs text-neutral-500">
                        {b.propertyTypes}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-auto flex flex-col gap-2 border-t border-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEnquireSubheading(null);
                        setEnquireBrand(b.name);
                      }}
                      className="order-2 rounded-md border border-neutral-300 px-4 py-2.5 text-center text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 sm:order-1"
                    >
                      Enquire
                    </button>
                    <Link
                      href={`/brands/${b.slug}`}
                      className="order-1 inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-neutral-800 sm:order-2"
                    >
                      View projects
                      <FaArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-neutral-800 bg-black text-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-12 md:px-6 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-custom text-2xl font-bold leading-tight text-white md:text-3xl">
              Not sure which developer is right for you?
            </h2>
            <p className="mt-4 font-custom2 text-sm leading-relaxed text-neutral-400 md:text-base">
              Our RERA-certified consultants work with all {brands.length}+
              developers on this hub and can personally recommend the best match
              for your budget, lifestyle, and investment goals — completely
              free of charge.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setEnquireSubheading(
                  "Tell us a little about your budget and goals — a consultant will recommend suitable developers and projects, at no cost to you."
                );
                setEnquireBrand("Dubai off-plan");
              }}
              className="rounded-lg cursor-pointer inline-flex w-full items-center justify-center border-2 border-white bg-white px-5 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-transparent hover:text-white sm:w-auto"
            >
              Get free advice
            </button>
            <a
              href={BRANDS_WHatsapp_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg cursor-pointer inline-flex w-full items-center justify-center gap-2 border-2 border-white bg-transparent px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:w-auto"
            >
              <FaWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden />
              WhatsApp us now
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 md:px-6 md:py-16">
          <p className="font-custom2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            — Why choose H&amp;S
          </p>
          <h2 className="mt-2 font-custom text-2xl font-bold text-black md:text-3xl lg:text-4xl">
            The H&amp;S advantage
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGE_CARDS.map(({ title, body, Icon }) => (
              <li
                key={title}
                className="border border-neutral-200 border-l-4 border-l-black bg-neutral-50 p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-black">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <h3 className="font-custom text-base font-semibold text-black">
                  {title}
                </h3>
                <p className="mt-2 font-custom2 text-sm leading-relaxed text-neutral-600">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
      {enquireBrand && (
        <BrandEnquiryModal
          brandName={enquireBrand}
          subheading={enquireSubheading || undefined}
          onClose={() => {
            setEnquireBrand(null);
            setEnquireSubheading(null);
          }}
        />
      )}
    </div>
  );
}
