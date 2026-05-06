"use client";

import React from "react";
import { motion } from "framer-motion";
export const awardsDeveloperBreakdown = [
  {
    id: "emaar",
    name: "Emaar",
    totalDisplay: "30+",
    awards: [
      { title: "Annual Broker Award", period: "2025" },
      { title: "H1 Broker Award — No.10", period: "2025" },
      { title: "Top 5 Performing Broker", period: "Q2 2025" },
      { title: "Annual Broker Award", period: "2024" },
      { title: "Annual Broker Award (x2)", period: "2023" },
      { title: "Q3 — No.4 Performing Broker", period: "2023" },
      { title: "Annual Broker Award", period: "2022" },
      { title: "Outstanding Performance", period: "2022" },
      { title: "No.1 Top Performing Broker", period: "Q3 2021" },
      { title: "Annual Broker Award", period: "2020" },
    ],
  },
  {
    id: "nakheel-meraas",
    name: "Nakheel & Meraas",
    totalDisplay: "13",
    awards: [
      { title: "No.1 Company in UAE", period: "2025" },
      { title: "Top Sales Company in UAE", period: "2025" },
      { title: "Black Onyx — Platinum Award", period: "2025" },
      { title: "Black Onyx Awards", period: "2025" },
      { title: "The Black Onyx Awards", period: "2024" },
      { title: "Black Onyx — Platinum Cert.", period: "2024" },
      { title: "The Black Onyx Awards", period: "2023" },
      { title: "Top Performing Agency", period: "2019" },
      { title: "Port de La Mer Appreciation", period: "2018" },
    ],
  },
  {
    id: "dld",
    name: "Dubai Land Dept.",
    totalDisplay: "4",
    awards: [
      { title: "No.1 Sales Company in UAE", period: "2025" },
      { title: "Best Sales Service in Dubai", period: "2025" },
      { title: "DLD & RERA Gold Award", period: "2022" },
      { title: "DLD & RERA Gold Award", period: "2021" },
    ],
  },
  {
    id: "damac",
    name: "DAMAC",
    totalDisplay: "6",
    awards: [
      { title: "DAMAC Broker Awards — 16th", period: "2022" },
      { title: "Q1 Broker Awards — 10th", period: "2021" },
      { title: "Broker Awards Q3 — 11th", period: "2021" },
      { title: "No.3 Highest Selling Brokerage", period: "2020" },
    ],
  },
  {
    id: "tilal-aldar",
    name: "Tilal Al Ghaf · Aldar",
    totalDisplay: "3",
    awards: [
      { title: "1st Performing Broker Award", period: "2023" },
      { title: "Envoy Award Q4", period: "2024" },
    ],
  },
  {
    id: "binghatti-ardee-octa",
    name: "Binghatti · ARDEE · OCTA",
    totalDisplay: "5",
    awards: [
      { title: "Star Performing Broker Award", period: "2025" },
      { title: "Horizon Awards — Rising Star (x2)", period: "2025" },
      { title: "No.1 Sales Performance", period: "2022" },
      { title: "Top Performing Agency (DarGlobal)", period: "2023" },
    ],
  },
];


export default function AwardsBreakdownSection() {
  return (
    <section className="border-t border-neutral-200/80 bg-white font-custom2">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-28">
        {/* Intro callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 md:mb-20 rounded-lg border border-neutral-200 bg-neutral-50/80 pl-5 pr-6 py-6 md:pl-6 md:pr-10 md:py-8 border-l-4 border-l-neutral-950"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 font-custom2 mb-4">
            Who is the most awarded real estate company in Dubai?
          </h2>
          <p className="text-neutral-700 text-base md:text-lg leading-relaxed font-custom3 font-normal">
            H&amp;S Real Estate is Dubai&apos;s most awarded real estate brokerage with 150+ verified industry awards
            between 2016 and 2025. Recognized by the Dubai Land Department as No.1 Sales Company in UAE (2025), by
            Emaar Properties with 30+ broker awards, by Nakheel as No.1 Company in UAE (2025), and by Meraas with
            the Black Onyx Platinum Award for three consecutive years no other brokerage in the UAE holds a
            comparable record across all major developers simultaneously.
          </p>
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2 mb-4">
            Award breakdown by developer
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 leading-[1.15] font-custom tracking-tight">
            Gulf Real Estate Awards —{" "}
            <em className="italic font-normal text-neutral-700">Every Major Name</em>
          </h3>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-custom3 mt-5">
            From government authorities to the UAE&apos;s largest private developers, H&amp;S Real Estate has been
            recognized across every segment of Dubai&apos;s property market.
          </p>
          <div className="mt-8 h-px max-w-xs mx-auto bg-neutral-300" aria-hidden />
        </motion.div>

        {/* Developer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 rounded-xl overflow-hidden border border-neutral-200">
          {awardsDeveloperBreakdown.map((dev, index) => (
            <motion.article
              key={dev.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="bg-white p-6 md:p-8 flex flex-col min-h-[280px] relative"
            >
              <div className="flex items-start justify-between gap-3 mb-6">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950 font-custom2 pr-2">
                  {dev.name}
                </p>
                <span
                  className="shrink-0 text-4xl md:text-5xl font-bold tabular-nums text-neutral-200 font-custom leading-none select-none"
                  aria-hidden
                >
                  {dev.totalDisplay}
                </span>
              </div>
              <ul className="space-y-3.5 flex-1">
                {dev.awards.map((row, i) => (
                  <li key={`${dev.id}-${i}`} className="flex gap-3 items-start justify-between text-sm md:text-[0.9375rem]">
                    <span className="flex gap-2 min-w-0">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-950" aria-hidden />
                      <span className="text-neutral-800 font-custom3 leading-snug">{row.title}</span>
                    </span>
                    <span className="shrink-0 text-neutral-500 font-custom3 tabular-nums text-right pl-2">
                      {row.period}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
