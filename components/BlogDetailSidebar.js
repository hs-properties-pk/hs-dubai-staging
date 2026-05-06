"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { BlogExplorePromoCard } from "@/components/BlogListingSidebar";

const cardFrame =
  "rounded-xl bg-white px-5 py-6 border border-gray-200 shadow-sm";

const WHATSAPP_DETAIL_URL =
  "https://wa.me/971526902884?text=Hello%21%20I%27m%20interested%20in%20Dubai%20property%20and%20would%20like%20to%20speak%20with%20an%20expert.";

export default function BlogDetailSidebar() {
  return (
    <div className="w-full min-w-0 max-w-full space-y-6 sm:space-y-7 lg:space-y-8">
      <div className={cardFrame}>
        <p className="font-custom2 text-xs font-semibold uppercase tracking-[0.15em] text-[#606060] mb-2">
          Free consultation
        </p>
        <div className="h-px w-full bg-gray-200 mb-4" />
        <h3 className="font-custom text-xl md:text-2xl text-[#272D2C] leading-snug mb-3">
          Interested in Dubai Property?
        </h3>
        <p className="font-custom2 text-sm text-[#606060] mb-5 leading-relaxed">
          Our RERA-certified experts match you with the right investment based
          on your exact budget and goals.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/properties/off-plan"
            className="flex w-full items-center justify-center rounded-lg bg-black px-4 py-3 font-custom2 text-sm font-semibold text-white hover:bg-gray-900 transition-colors text-center"
          >
            Browse Off-Plan
          </Link>
          <a
            href={WHATSAPP_DETAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-3 font-custom2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
          >
            <FaWhatsapp className="text-xl text-[#25D366]" aria-hidden />
            Ask on WhatsApp
          </a>
        </div>
      </div>

      <BlogExplorePromoCard />
    </div>
  );
}
