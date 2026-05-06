"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import { communityListings } from "@/data/community-data";

const NEWSLETTER_SOURCE = "Blog listing sidebar";
const WHATSAPP_URL =
  "https://wa.me/971526902884?text=Hello%21%20I%20have%20a%20question%20after%20reading%20your%20blog.";

const cardFrame =
  "rounded-xl bg-white px-5 py-6 border border-gray-200 shadow-sm";

const OFF_PLAN_IMAGE = "/off-plan/edit-at-d3/1.webp";

/**
 * Compact off-plan + community promos (same pattern as HomeLeadCapturePopup property cards).
 */
export function BlogExplorePromoCard() {
  const latestCommunity = communityListings?.[0];
  const communityImg =
    latestCommunity?.coverPhoto?.url || "/home-image-2.jpg";

  return (
    <div className={cardFrame}>
      <p className="font-custom2 text-xs font-semibold uppercase tracking-[0.15em] text-[#606060] mb-2">
        Explore
      </p>
      <div className="h-px w-full bg-gray-200 mb-3" />
      <div className="grid grid-cols-1 gap-2">
        <Link
          href="/properties/off-plan"
          className="group relative block overflow-hidden rounded-lg border border-gray-200"
        >
          <div className="relative h-[120px] w-full">
            <Image
              src={OFF_PLAN_IMAGE}
              alt="Off-plan properties in Dubai"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="font-custom2 text-[9px] uppercase tracking-widest text-gray-300 mb-0.5">
                Off-plan
              </p>
              <p className="font-custom text-xs text-white leading-tight">
                Explore projects →
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/communities"
          className="group relative block overflow-hidden rounded-lg border border-gray-200"
        >
          <div className="relative h-[120px] w-full">
            <Image
              src={communityImg}
              alt="Dubai communities"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="font-custom2 text-[9px] uppercase tracking-widest text-gray-300 mb-0.5">
                Communities
              </p>
              <p className="font-custom text-xs text-white leading-tight">
                View listings →
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function BlogListingSidebar() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const date = new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      await axios.post("/api/send-submission-subscribe-newsletter", {
        email: email.trim(),
        createdAt: date,
        source: NEWSLETTER_SOURCE,
      });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-6 sm:space-y-7 lg:space-y-3">
      {/* Newsletter */}
      <div className={cardFrame}>
        <h3 className="font-custom text-xl md:text-2xl text-[#272D2C] leading-snug mb-3">
          Stay Ahead of the Market
        </h3>
        <p className="font-custom2 text-sm text-[#606060] mb-5 leading-relaxed">
          Get weekly Dubai property insights delivered to your inbox — market
          reports, new launches, investment tips.
        </p>
        {success ? (
          <p className="font-custom2 text-sm text-[#272D2C]">
            Thanks — you&apos;re subscribed. Check your inbox soon.
          </p>
        ) : (
          <form onSubmit={handleNewsletter} className="space-y-3">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 font-custom2 text-sm text-[#272D2C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-900"
            />
            {error && (
              <p className="font-custom2 text-xs text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3 font-custom2 text-sm font-bold uppercase tracking-wide text-white hover:bg-gray-900 disabled:opacity-60 transition-colors"
            >
              {loading ? "Please wait…" : "Subscribe free"}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-4 py-3 font-custom2 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors"
            >
              <FaWhatsapp className="text-xl text-[#25D366]" aria-hidden />
              WhatsApp an expert
            </a>
          </form>
        )}
      </div>

      <BlogExplorePromoCard />
    </div>
  );
}
