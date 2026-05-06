"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AWARD_FILTER_TABS,
  awardsHistory,
  awardShowsNoOneBadge,
} from "@/data/awards-history-data";

export default function AwardsHistorySection() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return awardsHistory;
    return awardsHistory.filter((a) => a.filterTags.includes(active));
  }, [active]);

  return (
    <section className="border-t border-neutral-200/80 bg-neutral-50/60 font-custom2">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2 mb-4">
            Complete award history
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 leading-[1.15] font-custom tracking-tight">
            All 150+ Awards — 2016 to 2025
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-custom3 mt-5">
            Every verified award H&amp;S Real Estate has received. Filter by developer to explore our track record
            with each major partner.
          </p>
          <div className="mt-8 h-px max-w-xs mx-auto bg-neutral-300" aria-hidden />
        </motion.div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14"
          role="tablist"
          aria-label="Filter awards by developer"
        >
          {AWARD_FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] font-custom2 transition-colors ${
                active === tab.key
                  ? "bg-neutral-950 text-white"
                  : "bg-white text-neutral-800 border border-neutral-300 hover:border-neutral-950 hover:bg-neutral-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-neutral-600 font-custom3 py-12">No awards in this category.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 list-none p-0 m-0">
            {filtered.map((award, index) => (
              <motion.li
                key={`${award.id}-${award.image}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.4) }}
                className="flex flex-col rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-300 transition-shadow"
              >
                <div className="relative aspect-[4/3] w-full bg-neutral-100">
                  <Image
                    src={award.image}
                    alt={`${award.name} — ${award.brand}, ${award.year}`}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  {awardShowsNoOneBadge(award.name) && (
                    <span className="absolute top-2 right-2 bg-neutral-950 text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded font-custom2">
                      No. 1
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-4 pt-3 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500 font-custom3 tabular-nums mb-1">{award.year}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-950 font-custom2 mb-2 line-clamp-2">
                    {award.brand}
                  </p>
                  <p className="text-sm text-neutral-800 font-custom3 leading-snug line-clamp-4">{award.name}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
