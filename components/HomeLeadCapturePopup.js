"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaSpinner, FaWhatsapp } from "react-icons/fa";
import { offPlanListings } from "@/data/off-plan-data";
import { communityListings } from "@/data/community-data";

const POPUP_STORAGE_KEY = "hs_home_lead_popup_state_v1";
/** Scroll depth (0–1) at which the H&S popup opens — avoids clashing with BrightCall’s timed widget. */
const SCROLL_DEPTH_THRESHOLD = 1 / 3;
const MIN_RESHOW_MS = 3 * 24 * 60 * 60 * 1000;
const OFF_PLAN_LISTING_URL = "/properties/off-plan";
const COMMUNITY_LISTING_URL = "/communities";
const WHATSAPP_URL =
  "https://wa.me/971526902884?text=Hello%21%20I%20want%20off-plan%20project%20recommendations%20based%20on%20my%20budget.";

function getTimestamp() {
  return new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function readPopupState() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(POPUP_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writePopupState(nextState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(nextState));
}

export default function HomeLeadCapturePopup() {
  const latestOffPlan = offPlanListings?.[0];
  const latestCommunity = communityListings?.[0];
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    budget: "",
    interestType: "off-plan",
  });

  const source = "Homepage Lead Popup";

  const canShow = useMemo(() => {
    const state = readPopupState();
    if (!state?.lastSeenAt) return true;
    return Date.now() - state.lastSeenAt > MIN_RESHOW_MS;
  }, []);

  useEffect(() => {
    if (!canShow) return;
    let shown = false;

    const revealPopup = () => {
      if (shown) return;
      shown = true;
      setIsVisible(true);
      writePopupState({ lastSeenAt: Date.now(), reason: "shown" });
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScrollable = doc.scrollHeight - window.innerHeight;
      if (maxScrollable <= 0) {
        /* Very short page: nothing to scroll — do not auto-open (keeps BrightCall as the only timed UI). */
        return;
      }
      const depth = window.scrollY / maxScrollable;
      if (depth >= SCROLL_DEPTH_THRESHOLD) revealPopup();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [canShow]);

  useEffect(() => {
    if (!isVisible) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    writePopupState({ lastSeenAt: Date.now(), reason: "dismissed" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phoneNumber) {
      setError("Please complete name, email, and phone number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/send-submission-contact", {
        firstName: formData.firstName.trim(),
        lastName: "",
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        inquiryType: formData.interestType === "community" ? "Community" : "Off Plan",
        subject:
          formData.interestType === "community"
            ? "Homepage community shortlist request"
            : "Homepage off-plan shortlist request",
        message: formData.budget
          ? `Interest: ${formData.interestType}. Preferred budget range: ${formData.budget}`
          : `Interest: ${formData.interestType}. Preferred budget range not selected.`,
        createdAt: getTimestamp(),
        source,
        notionPage: "/",
      });
      setSuccess(true);
      writePopupState({ lastSeenAt: Date.now(), reason: "submitted" });
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
        "We could not submit your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close popup overlay"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-black transition-colors text-lg leading-none"
          aria-label="Close popup"
        >
          ×
        </button>

        {!success ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0">
            {/* ── LEFT PANEL ── */}
            <div className="hidden lg:flex bg-[#111111] text-white p-6 md:p-8 flex-col gap-5">
              <div>
                <p className="font-custom2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Latest opportunities
                </p>
                <h3 className="font-custom text-2xl md:text-[1.75rem] leading-snug mb-2">
                  Contact Our Off-Plan Specialist
                </h3>
                <p className="font-custom2 text-sm text-gray-400 leading-relaxed">
                  Explore the newest off-plan and community options, then let our
                  RERA-certified team match the best fit for your budget.
                </p>
              </div>

              {/* Property Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 flex-1">
                <Link
                  href={`/properties/off-plan`}
                  className="group grid"
                  onClick={handleClose}
                >
                  <div className="relative h-full overflow-hidden rounded-xl border border-white/15">
                    <Image
                      src={"/off-plan/edit-at-d3/1.webp"}
                      alt="Latest off-plan"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-custom2 text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                        Latest off-plan
                      </p>
                      <p className="font-custom text-sm leading-snug">
                        Explore Off-Plan Projects →
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  href={`/communities`}
                  className="group block"
                  onClick={handleClose}
                >
                  <div className="relative h-full overflow-hidden rounded-xl border border-white/15">
                    <Image
                      src={latestCommunity?.coverPhoto?.url || "/home-image-2.jpg"}
                      alt="Latest community"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-custom2 text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">
                        Latest community
                      </p>
                      <p className="font-custom text-sm leading-snug">
                        Explore Community Listings →
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="p-6 md:p-8 flex flex-col gap-5 bg-white overflow-y-auto max-h-[85vh] lg:max-h-none">
              <div>
                <p className="font-custom2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Free consultation
                </p>
                <div className="h-px bg-gray-200 mb-4" />
                <h4 className="font-custom text-2xl md:text-[1.75rem] text-[#1a1a1a] leading-snug mb-2">
                  Get A Tailored Shortlist
                </h4>
                <p className="font-custom2 text-sm text-gray-500 leading-relaxed">
                  Tell us your interest and budget. We&apos;ll share the best
                  matched opportunities within your range.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <select
                  name="interestType"
                  value={formData.interestType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-custom2 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-800 transition"
                >
                  <option value="off-plan">I am interested in Off-Plan</option>
                  <option value="community">I am interested in Communities</option>
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 font-custom2 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-800 transition"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone / WhatsApp"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 font-custom2 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-800 transition"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 font-custom2 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-800 transition"
                />

                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-custom2 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-800 transition"
                >
                  <option value="">Select budget range (optional)</option>
                  <option value="Under AED 1M">Under AED 1M</option>
                  <option value="AED 1M - AED 2M">AED 1M – AED 2M</option>
                  <option value="AED 2M - AED 5M">AED 2M – AED 5M</option>
                  <option value="AED 5M+">AED 5M+</option>
                </select>

                {error && (
                  <p className="font-custom2 text-xs text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 font-custom2 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60 transition-colors"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Contact Specialist"
                  )}
                </button>
              </form>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-3 font-custom2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
              >
                <FaWhatsapp className="text-lg text-[#25D366]" aria-hidden />
                Ask on WhatsApp
              </a>

              <p className="font-custom2 text-[11px] text-gray-400 text-center leading-relaxed -mt-1">
                By submitting, you agree to be contacted by our specialist team.
                No spam, ever.
              </p>
            </div>
          </div>
        ) : (
          /* ── SUCCESS STATE ── */
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white text-2xl mb-1">
              ✓
            </div>
            <h3 className="font-custom text-2xl md:text-3xl text-[#1a1a1a]">
              Thank You!
            </h3>
            <p className="font-custom2 text-sm text-gray-500 max-w-sm leading-relaxed">
              We received your request. Our specialist will contact you shortly
              with the best matched opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href={OFF_PLAN_LISTING_URL}
                onClick={handleClose}
                className="rounded-lg bg-black px-6 py-3 font-custom2 text-sm font-semibold text-white hover:bg-gray-900 transition-colors"
              >
                Browse Off-Plan
              </Link>
              <Link
                href={COMMUNITY_LISTING_URL}
                onClick={handleClose}
                className="rounded-lg border-2 border-black bg-white px-6 py-3 font-custom2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
              >
                Browse Communities
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}