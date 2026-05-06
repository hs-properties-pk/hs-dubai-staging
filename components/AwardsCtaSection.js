"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AwardsCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-white pb-20 md:pb-28 font-custom2">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"
        aria-hidden
      />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-black font-custom2">
            Dubai&apos;s most trusted brokerage
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-black leading-[1.12] font-custom tracking-tight">
            Work With an Award-Winning Team
          </h2>
          <p className="text-black text-base md:text-lg leading-relaxed font-custom3 max-w-xl mx-auto">
            150+ awards. 10 consecutive years. $1 billion in sales. Your property deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center pt-2">
            <Link
              href="/properties/off-plan"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wide bg-black text-white hover:bg-neutral-900 transition-colors font-custom2"
            >
              Browse Off Plans
            </Link>
            <Link
              href="/communities"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wide bg-black text-white hover:bg-neutral-900 transition-colors font-custom2"
            >
              Browse Communities
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wide border border-black/30 text-black hover:bg-black/10 transition-colors font-custom2"
            >
              Contact us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
