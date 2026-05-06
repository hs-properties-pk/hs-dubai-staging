"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  awardsYearShowcase,
  formatAwardCountLabel,
} from "@/data/awards-year-showcase-data";

export default function AwardsYearShowcase() {
  const scrollerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const dragOrigin = useRef({ pageX: 0, scrollLeft: 0 });

  const onMouseDown = useCallback((e) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDragging(true);
    dragOrigin.current = {
      pageX: e.pageX,
      scrollLeft: el.scrollLeft,
    };
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const el = scrollerRef.current;
      if (!el) return;
      const dx = e.pageX - dragOrigin.current.pageX;
      el.scrollLeft = dragOrigin.current.scrollLeft - dx;
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <section className="border-t border-neutral-200/80 bg-white font-custom2">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 md:mb-10"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2">
            10 years of consecutive recognition
          </p>
        </motion.div>

        <div
          ref={scrollerRef}
          role="region"
          aria-label="Awards by year, scroll horizontally"
          className={[
            "awards-year-scroll flex gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4",
            "-mx-4 px-4 md:-mx-6 md:px-6 touch-pan-x select-none",
            dragging ? "cursor-grabbing" : "cursor-grab",
          ].join(" ")}
          onMouseDown={onMouseDown}
        >
          {awardsYearShowcase.map((row) => (
            <div
              key={row.year}
              className="flex w-[min(100%,calc(100vw-2rem))] shrink-0 items-stretch gap-4 border-r border-neutral-200 pr-4 last:border-r-0 last:pr-0 sm:w-[calc(50vw-1.25rem)] sm:max-w-[28rem] md:gap-6 md:pr-6 mr-1"
            >
              <div className="flex w-[5.5rem] shrink-0 flex-col justify-between py-1 md:w-24">
                <span className="font-custom text-3xl font-bold leading-none tracking-tight text-neutral-950 md:text-4xl lg:text-5xl">
                  {row.year}
                </span>
                <span className="mt-2 text-xs text-neutral-500 font-custom3 md:text-sm">
                  {formatAwardCountLabel(row.total)}
                </span>
              </div>
              <div
                className="hidden w-px shrink-0 bg-neutral-200 sm:block self-stretch min-h-[4.5rem]"
                aria-hidden
              />
              <div className="flex min-w-[12rem] max-w-[min(70vw,22rem)] flex-wrap content-center gap-2 py-1 md:min-w-[16rem] md:max-w-[24rem]">
                {row.chips.map((label, i) => (
                  <span
                    key={`${row.year}-chip-${i}-${label}`}
                    className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-800 font-custom2 md:text-xs"
                  >
                    {label}
                  </span>
                ))}
                {row.moreCount > 0 && (
                  <span className="inline-flex items-center rounded-md border border-dashed border-neutral-400 bg-neutral-50 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-600 font-custom2 md:text-xs">
                    +{row.moreCount} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
