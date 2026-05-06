"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MetaPixel from "@/components/MetaPixel";
import LandingPageGallery from "@/components/LandingPageGallery";
import LandingFaqs from "@/components/LandingFaqs";
import LandingCta from "@/components/LandingCta";
import LandingHero from "@/components/LandingHero";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import { getIcon } from "@/components/communityIconMap";
import {
  FaCheck,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedinIn,
  FaUsers,
  FaCalendar,
  FaChartLine,
  FaSpinner,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Review from "@/components/Review";
// import CommunitiesListingModal from "./CommunitiesListingModal";
import CommunityListingsCarousel from "./CommunityListingsCarousel";

const userTypeOptions = ["Home buyer", "Investor", "Real estate agent"];

const budgetOptions = [
  "0 – AED 500,000",
  "AED 500,000 – AED 700,000",
  "AED 700,000- AED 1,000,000",
  "AED 1,000,000 – AED 1,300,000",
  "AED 1,300,000 – AED 1,500,000",
  "AED 1,500,000 – AED 1,800,000",
  "AED 1,800,000 – AED 2,000,000",
  "AED 2,000,000 - AED 2,500,000",
  "AED 2,500,000 – AED 3,000,000",
  "AED 3,000,000 – AED 3,500,000",
  "AED 3,500,000 – AED 4,000,000",
  "AED 4,000,000 – AED 4,500,000",
  "AED 4,500,000 – AED 5,000,000",
  "AED 5,000,000 - AED 6,000,000",
  "AED 6,000,000 - AED 7,000,000",
  "AED 7,000,000 – AED 8,000,000",
  "AED 8,000,000 - AED 9,000,000",
  "AED 9,000,000 - AED 10,000,000",
  "Above AED 10,000,000",
];

const investTimelineOptions = [
  "This month",
  "Within 3 months",
  "More than 3 months",
];

function IconRenderer({ name, className }) {
  const Icon = getIcon(name);
  if (!Icon) return null;
  return <Icon className={className} />;
}

/** Centered eyebrow + title + subtitle (editorial rhythm, shared across sections) */
function SectionHeaderCenter({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14 md:mb-16 max-w-4xl mx-auto"
    >
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2 mb-4">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 leading-[1.15] font-custom tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-custom3 mt-5 max-w-3xl mx-auto">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}

function CommunityHeroLeadForm({ formData, formErrors, updateField, onSubmit, isSubmitting, heroHoneypotRef }) {
  return (
    <div className="rounded-2xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/5 overflow-hidden flex flex-col max-h-[calc(100dvh-12rem)] lg:max-h-[calc(100dvh-11rem)]">
      <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
        <div className="relative flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-3.5 space-y-2">
          <input
            type="text"
            name="website"
            ref={heroHoneypotRef}
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          />
          <div>
            <label htmlFor="hero-name" className="block text-[10px] font-medium text-gray-600 mb-0.5 font-custom2 uppercase tracking-wide">
              Name
            </label>
            <input
              id="hero-name"
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className={`w-full p-2 sm:p-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-950/15 focus:border-neutral-950 text-sm font-custom3 ${
                formErrors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="hero-email" className="block text-[10px] font-medium text-gray-600 mb-0.5 font-custom2 uppercase tracking-wide">
              Email
            </label>
            <input
              id="hero-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full p-2 sm:p-2.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-950/15 focus:border-neutral-950 text-sm font-custom3 ${
                formErrors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {formErrors.email && <p className="text-red-600 text-xs mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <span className="block text-[10px] font-medium text-gray-600 mb-0.5 font-custom2 uppercase tracking-wide">Phone</span>
            <CountrySelect
              styling={`w-full rounded-lg border transition-all bg-white px-2 sm:px-2.5 py-1 sm:py-1.5 text-sm ${formErrors.phone ? "border-red-500 focus-within:border-red-600" : "border-gray-200 focus-within:border-neutral-950"}`}
              labels={en}
              flags={flags}
              value={formData.country}
              onChange={(country) => updateField("country", country)}
              onPhoneChange={(phone) => updateField("phone", phone)}
            />
            {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
          </div>
          <div>
            <label htmlFor="hero-budget" className="block text-[10px] font-medium text-gray-600 mb-0.5 font-custom2 uppercase tracking-wide">
              Budget
            </label>
            <select
              id="hero-budget"
              value={formData.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className={`w-full p-2 sm:p-2.5 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950/15 focus:border-neutral-950 font-custom3 ${
                formErrors.budget ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select range</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {formErrors.budget && <p className="text-red-600 text-xs mt-1">{formErrors.budget}</p>}
          </div>
          <div>
            <label htmlFor="hero-message" className="block text-[10px] font-medium text-gray-600 mb-0.5 font-custom2 uppercase tracking-wide">
              Message <span className="text-gray-400 font-normal normal-case">(optional)</span>
            </label>
            <textarea
              id="hero-message"
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Anything we should know?"
              rows={2}
              className="w-full p-2 sm:p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-950/15 focus:border-neutral-950 text-sm font-custom3 resize-none min-h-[2.5rem] max-h-[4rem]"
            />
          </div>
          {formErrors.submit && <p className="text-red-600 text-sm text-center">{formErrors.submit}</p>}
        </div>
        <div className="shrink-0 border-t border-gray-100 px-3 py-2.5 sm:px-4 sm:py-3 bg-neutral-50/80">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-neutral-950 text-white text-sm font-semibold uppercase tracking-wide font-custom2 transition-colors ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-neutral-800"
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin shrink-0" aria-hidden />
                <span>Sending</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CommunityLandingTemplate({ data, pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const honeypotRef = useRef(null);
  const heroHoneypotRef = useRef(null);

  const stepsTotal = 4;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    userType: "",
    budget: "",
    investTimeline: "",
    message: "",
  });

  const validateStep = (currentStep) => {
    const errors = {};
    switch (currentStep) {
      case 0:
        if (!formData.userType.trim()) errors.userType = "Please select an option";
        break;
      case 1:
        if (!formData.budget.trim()) errors.budget = "Please select a budget range";
        break;
      case 2:
        if (!formData.investTimeline.trim()) errors.investTimeline = "Please select an option";
        break;
      case 3:
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) {
          errors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
          errors.phone = "Please enter a valid phone number";
        }
        break;
      default:
        break;
    }
    return errors;
  };

  const postCommunityLead = async (websiteValue) => {
    const res = await fetch("/api/send-community-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        website: websiteValue,
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        userType: formData.userType,
        budget: formData.budget,
        investTimeline: formData.investTimeline,
        createdAt: new Date().toISOString(),
        source: data.form.sourceLabel,
        communitySlug: data.slug,
      }),
    });
    if (res.ok) {
      router.push(`/communities/${data.slug}/thankyou`);
      return;
    }
    let message = "Failed to submit form. Please try again.";
    try {
      const errorData = await res.json();
      if (errorData.message) message = errorData.message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  };

  const validateHeroForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.budget.trim()) errors.budget = "Please select a budget range";
    return errors;
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    const merged = validateHeroForm();
    if (Object.keys(merged).length > 0) {
      setFormErrors(merged);
      return;
    }
    setFormErrors({});
    setIsSubmitting(true);
    try {
      await postCommunityLead(heroHoneypotRef.current?.value || "");
    } catch (error) {
      setIsSubmitting(false);
      const msg =
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection and try again.";
      setFormErrors({ submit: msg });
    }
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleNext = async () => {
    const errors = validateStep(step);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    if (step < stepsTotal - 1) {
      setStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      try {
        await postCommunityLead(honeypotRef.current?.value || "");
      } catch (error) {
        setIsSubmitting(false);
        const msg =
          error instanceof Error
            ? error.message
            : "Network error. Please check your connection and try again.";
        setFormErrors({ submit: msg });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) { setStep((s) => s - 1); setFormErrors({}); }
  };

  const openForm = () => {
    setIsFormOpen(true);
    setSubmitted(false);
    setStep(0);
    setFormErrors({});
  };

  const closeForm = () => setIsFormOpen(false);

  const communityWhatsappHref = `https://api.whatsapp.com/send/?phone=971526902884&text=${encodeURIComponent(
    `Hello! I'm interested in ${data.hero?.title || "this community"}. I'd like more information.`
  )}&type=phone_number&app_absent=0`;

  const sectionPad = "py-24 md:py-28";

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style jsx>{`
        .font-custom { font-family: TenorSans, sans-serif; }
        .font-custom2 { font-family: Urbanist, sans-serif; }
        .font-custom3 { font-family: Satoshi, sans-serif; }
      `}</style>

      <Navbar />

      {/* ── Hero ── */}
      <LandingHero
        imageSrc={data.hero.imageSrc}
        imageAlt={data.hero.imageAlt}
        badgeText={data.hero.badgeText}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        description={data.hero.description}
        ctaText="Enquire now"
        onCtaClick={openForm}
        showScrollIndicator
        secondaryCtaHref={communityWhatsappHref}
        secondaryCtaLabel="WhatsApp"
        sidePanel={
          <CommunityHeroLeadForm
            formData={formData}
            formErrors={formErrors}
            updateField={updateField}
            onSubmit={handleHeroSubmit}
            isSubmitting={isSubmitting}
            heroHoneypotRef={heroHoneypotRef}
          />
        }
      />

      {/* ── Welcome Modal (timed auto-open disabled in component) ── */}
      {/* <CommunitiesListingModal data={data} /> */}

      {/* ── Overview ── */}
      <section className={`${sectionPad} bg-neutral-50/70 border-t border-neutral-200/80`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2 mb-4">
                Overview
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-950 leading-[1.15] mb-6 font-custom tracking-tight">
                {data.overview.title}
              </h2>
              <div className="space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-custom3">
                {data.overview.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative">
              <div className="rounded-xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 font-custom2 mb-8 text-center">
                  Community highlights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {data.overview.stats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}>
                      <div className="text-center p-5 rounded-lg border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:border-neutral-300 transition-colors duration-300">
                        <div className="text-lg md:text-xl font-bold text-neutral-950 font-custom2">{stat.value}</div>
                        <div className="text-xs font-semibold mt-1 text-neutral-900 font-custom3">{stat.label}</div>
                        <div className="text-xs text-neutral-500 font-custom3 mt-1">{stat.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 font-custom2 mb-4">
                    Quick facts
                  </h4>
                  <ul className="space-y-3 text-sm font-custom3">
                    {data.overview.quickFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-3 text-neutral-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0" aria-hidden />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {data.overview.visionTitle && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mt-16 md:mt-20 rounded-xl border border-neutral-200 bg-white p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-950 mb-5 font-custom tracking-tight">{data.overview.visionTitle}</h3>
                  {data.overview.visionParagraphs.map((p, i) => (
                    <p key={i} className="text-neutral-600 mb-4 last:mb-0 leading-relaxed font-custom3">{p}</p>
                  ))}
                </div>
                {data.overview.visionImage && (
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-neutral-200">
                    <Image src={data.overview.visionImage} alt={data.overview.visionImageAlt || ""} fill className="object-cover transition-transform duration-[1.2s] hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Developer Profile ── */}
      <section className={`${sectionPad} bg-white border-t border-neutral-200/80`}>
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeaderCenter label="Developer" title={data.developer.title} subtitle={null} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6 text-left mt-10">
            {data.developer.paragraphs.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-neutral-600 font-custom3">{p}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mid-page lead strip (editorial, matches closing CTA) ── */}
      <section className={`relative bg-neutral-950 ${sectionPad} overflow-hidden`}>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent"
          aria-hidden
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 font-custom2">
              Register interest
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight font-custom">
              {data.hero?.title || "This community"}
            </h3>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-custom3 max-w-xl mx-auto">
              Request availability, floor plans, pricing, and payment options. No obligation — our RERA-registered team replies within one business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center pt-2">
              <button
                type="button"
                onClick={openForm}
                className="sm:min-w-[200px] px-8 py-3.5 bg-white text-neutral-950 text-sm font-semibold uppercase tracking-wide hover:bg-neutral-100 transition-colors font-custom2"
              >
                Get the details
              </button>
              <a
                href={communityWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/35 text-white text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors font-custom2"
              >
                <FaWhatsapp className="text-lg text-[#25D366]" aria-hidden />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Lifestyle ── */}
      <section className={`${sectionPad} bg-white border-t border-neutral-200/80 relative`}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeaderCenter label="Lifestyle" title={data.lifestyle.title} subtitle={data.lifestyle.subtitle} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {data.lifestyle.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="bg-white rounded-xl border border-neutral-200 p-7 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-neutral-950 flex items-center justify-center mb-5">
                  <IconRenderer name={feature.icon} className="text-xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-3 font-custom2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed font-custom3">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {(data.lifestyle.detailsTitle || data.lifestyle.targetResidents) && (
            <div className="mt-16 md:mt-20 rounded-xl border border-neutral-200 bg-neutral-50/50 p-8 md:p-10 shadow-sm">
              {data.lifestyle.detailsTitle && <h3 className="text-2xl font-bold text-neutral-950 mb-8 font-custom tracking-tight">{data.lifestyle.detailsTitle}</h3>}
              <div className="grid md:grid-cols-2 gap-10">
                {data.lifestyle.detailsParagraphs && data.lifestyle.detailsParagraphs.length > 0 && (
                  <div>
                    {data.lifestyle.detailsParagraphs.map((p, i) => (
                      <p key={i} className="text-neutral-600 mb-4 last:mb-0 font-custom3 leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}
                {(data.lifestyle.targetResidents || data.lifestyle.developmentPhase || data.lifestyle.investmentType) && (
                  <div className="space-y-3">
                    {data.lifestyle.targetResidents && (
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 bg-white">
                        <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center shrink-0">
                          <FaUsers className="text-white text-lg" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-950 text-sm font-custom2">Target residents</h4>
                          <p className="text-neutral-600 text-sm font-custom3 mt-1">{data.lifestyle.targetResidents}</p>
                        </div>
                      </div>
                    )}
                    {data.lifestyle.developmentPhase && (
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 bg-white">
                        <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center shrink-0">
                          <FaCalendar className="text-white text-lg" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-950 text-sm font-custom2">Development phase</h4>
                          <p className="text-neutral-600 text-sm font-custom3 mt-1">{data.lifestyle.developmentPhase}</p>
                        </div>
                      </div>
                    )}
                    {data.lifestyle.investmentType && (
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 bg-white">
                        <div className="w-10 h-10 rounded-lg bg-neutral-950 flex items-center justify-center shrink-0">
                          <FaChartLine className="text-white text-lg" />
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-950 text-sm font-custom2">Investment type</h4>
                          <p className="text-neutral-600 text-sm font-custom3 mt-1">{data.lifestyle.investmentType}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Location & Connectivity ── */}
      <section className={`${sectionPad} bg-neutral-50/70 border-t border-neutral-200/80`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeaderCenter label="Location" title={data.location.title} subtitle={data.location.subtitle} />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12 max-w-7xl mx-auto">
            <div className="relative rounded-xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
              <iframe
                src={data.location.mapEmbedUrl}
                width="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
                className="w-full lg:h-[600px] md:h-[400px] h-[250px]"
              />
            </div>
          </motion.div>

          {data.location.keyConnections && data.location.keyConnections.length > 0 && (
            <div className="mb-12 max-w-7xl mx-auto">
              <div className="rounded-xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 font-custom2 mb-6">
                  Key connections
                </h3>
                <ul className="space-y-4 text-neutral-700 font-custom3">
                  {data.location.keyConnections.map((conn, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0" aria-hidden />
                      <span>{conn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.location.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="bg-white p-7 rounded-xl text-center border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-neutral-950 flex items-center justify-center mx-auto mb-4">
                  <IconRenderer name={feature.icon} className="text-xl text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 text-neutral-950 font-custom2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm font-custom3 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-neutral-200/80">
        <Review shuffleReviews headingClass="font-bold" />
      </section>

      {/* ── Key Features (optional) ── */}
      {data.keyFeatures && (
        <section className={`${sectionPad} bg-white border-t border-neutral-200/80`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeaderCenter label="Key features" title={data.keyFeatures.title} subtitle={data.keyFeatures.subtitle} />
            <div className="grid md:grid-cols-3 gap-6 md:gap-7">
              {data.keyFeatures.features.map((feature, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="bg-white rounded-xl p-8 border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300">
                  <div className="w-14 h-14 rounded-lg bg-neutral-950 flex items-center justify-center mb-5">
                    <IconRenderer name={feature.icon} className="text-xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-950 mb-3 font-custom2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-custom3">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Property / Unit Types ── */}
      <section className={`${sectionPad} bg-neutral-50/70 border-t border-neutral-200/80`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeaderCenter label="Properties" title={data.propertyTypes.title} subtitle={data.propertyTypes.subtitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {data.propertyTypes.types.map((unit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 group flex flex-col">
                <div className="relative h-56 overflow-hidden border-b border-neutral-200">
                  <Image src={unit.image} alt={unit.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-neutral-950 text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider font-custom2">{data.propertyTypes.badgeText || data.name}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-neutral-950 mb-1 font-custom2">{unit.name}</h3>
                  <p className="text-neutral-500 text-xs mb-4 font-custom3 uppercase tracking-wide">{unit.tag}</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {unit.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-600 font-custom3">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-950 shrink-0" aria-hidden />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={openForm} className="w-full py-3 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wide hover:bg-neutral-800 transition-colors font-custom2">Enquire</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Master Plan (optional) ── */}
      {data.masterPlan && (
        <section className={`${sectionPad} bg-white border-t border-neutral-200/80`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeaderCenter label="Master plan" title={data.masterPlan.title} subtitle={data.masterPlan.subtitle} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {data.masterPlan.items.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="bg-white rounded-xl p-7 border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-neutral-950 flex items-center justify-center mb-4">
                    <IconRenderer name={item.icon} className="text-lg text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-950 mb-2 font-custom2">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed text-sm font-custom3">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sub-Communities (optional) ── */}
      {data.subCommunities && (
        <section className={`${sectionPad} bg-neutral-50/70 border-t border-neutral-200/80`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeaderCenter label="Sub-communities" title={data.subCommunities.title} subtitle={data.subCommunities.subtitle} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {data.subCommunities.items.map((community, i) => (
                <motion.div key={community.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="relative h-80 md:h-96 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group">
                  <Image src={community.image} alt={community.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-custom tracking-tight">{community.name}</h3>
                    <p className="text-white/85 font-custom3 text-sm leading-relaxed">{community.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Clusters / Neighborhoods (optional) ── */}
      {data.clusters && (
        <section className={`${sectionPad} bg-white border-t border-neutral-200/80`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeaderCenter label="Neighborhoods" title={data.clusters.title} subtitle={data.clusters.subtitle} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {data.clusters.items.map((cluster, i) => (
                <motion.div key={cluster.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="relative h-72 md:h-80 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group">
                  <Image src={cluster.image} alt={cluster.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-md bg-white/15 flex items-center justify-center backdrop-blur-sm">
                        <IconRenderer name={cluster.icon} className="text-white text-sm" />
                      </span>
                      <h3 className="text-lg md:text-xl font-bold font-custom tracking-tight">{cluster.name}</h3>
                    </div>
                    <p className="text-white/85 font-custom3 text-sm mb-3 leading-relaxed">{cluster.description}</p>
                    {cluster.features && (
                      <div className="flex flex-wrap gap-2">
                        {cluster.features.slice(0, 3).map((f, idx) => (
                          <span key={idx} className="text-[10px] uppercase tracking-wider bg-white/15 backdrop-blur-sm px-2 py-1 text-white font-custom2 border border-white/20">{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Community Amenities ── */}
      <section className={`${sectionPad} bg-neutral-50/70 border-t border-neutral-200/80`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeaderCenter label="Amenities" title={data.amenities.title} subtitle={data.amenities.subtitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {data.amenities.items.map((amenity, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="relative h-72 md:h-80 rounded-xl overflow-hidden border border-neutral-200 shadow-sm group">
                <Image src={amenity.image} alt={`${amenity.title} at ${data.name}`} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 font-custom tracking-tight">{amenity.title}</h3>
                  <p className="text-white/85 font-custom3 text-sm leading-relaxed">{amenity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose (optional) ── */}
      {data.whyChoose && (
        <section className={`${sectionPad} bg-white border-t border-neutral-200/80`}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeaderCenter label="Why choose" title={data.whyChoose.title} subtitle={data.whyChoose.subtitle} />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-8 md:p-12 shadow-sm">
                <ul className="space-y-5">
                  {data.whyChoose.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-4 text-neutral-700 font-custom3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-950 shrink-0" aria-hidden />
                      <span className="text-base md:text-lg leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Investment Benefits ── */}
      <section className={`${sectionPad} bg-neutral-50/70 border-t border-neutral-200/80`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeaderCenter label="Investment" title={data.investmentBenefits.title} subtitle={data.investmentBenefits.subtitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {data.investmentBenefits.benefits.map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }} className="bg-white rounded-xl p-8 border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300">
                <div className="w-14 h-14 rounded-lg bg-neutral-950 flex items-center justify-center mb-5">
                  <IconRenderer name={benefit.icon} className="text-xl text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-neutral-950 font-custom2">{benefit.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm font-custom3">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <LandingCta
        openForm={openForm}
        sectionLabel={data.cta.sectionLabel}
        title={data.cta.title}
        description={data.cta.description}
        ctaText={data.cta.ctaText}
        footnote={data.cta.footnote}
        inverted
        secondaryCtaHref={communityWhatsappHref}
        secondaryCtaLabel="WhatsApp"
      />

      {/* ── Gallery ── */}
      <LandingPageGallery
        images={data.gallery.images}
        title={data.gallery.title}
        description={data.gallery.description}
        className="bg-white"
      />

      {/* ── FAQ ── */}
      <LandingFaqs
        sectionLabel="FAQ"
        heading={data.faq.heading}
        description={data.faq.description}
        faqs={data.faq.faqs}
        className="bg-white"
      />

      <CommunityListingsCarousel
        variant="landing"
        excludeSlug={data.slug}
        title="Explore other master-planned communities"
        sliderRootClass="community-lp-other-communities"
      />

      <Footer />

      {/* ── Lead form (minimal chrome, step segments) ── */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[min(90vh,calc(100dvh-2rem))] flex flex-col overflow-hidden min-w-0"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="shrink-0 border-b border-gray-100 bg-white px-5 py-4 flex items-start justify-between gap-3">
                <div className="min-w-0 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 font-custom2 mb-1">
                    Step {step + 1} of {stepsTotal}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 font-custom leading-snug">{data.form.title}</h3>
                  <p className="text-sm text-gray-500 font-custom3 mt-0.5 line-clamp-2">{data.form.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={closeForm}
                  className="shrink-0 p-2 -mr-1 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </header>

              <div className="shrink-0 px-5 pt-4 pb-2 bg-neutral-50/80 border-b border-gray-100">
                <div className="flex gap-1.5">
                  {Array.from({ length: stepsTotal }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-neutral-950" : "bg-gray-200"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 relative">
                <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true" />
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-5">
                      {step === 0 && (
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 font-custom2 mb-3">You are a</h4>
                          <div className="grid gap-2">
                            {userTypeOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField("userType", opt)}
                                className={`w-full p-3.5 text-left text-sm rounded-lg border transition-all font-custom3 ${formData.userType === opt ? "border-neutral-950 bg-neutral-950 text-white" : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formErrors.userType && <p className="text-red-600 text-sm mt-2">{formErrors.userType}</p>}
                        </div>
                      )}
                      {step === 1 && (
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 font-custom2 mb-3">Budget range</h4>
                          <div className="max-h-[min(48vh,360px)] overflow-y-auto pr-1 space-y-2">
                            {budgetOptions.map((budget) => (
                              <button
                                key={budget}
                                type="button"
                                onClick={() => updateField("budget", budget)}
                                className={`w-full p-3.5 text-left text-sm rounded-lg border transition-all font-custom3 ${formData.budget === budget ? "border-neutral-950 bg-neutral-950 text-white" : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"}`}
                              >
                                {budget}
                              </button>
                            ))}
                          </div>
                          {formErrors.budget && <p className="text-red-600 text-sm mt-2">{formErrors.budget}</p>}
                        </div>
                      )}
                      {step === 2 && (
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 font-custom2 mb-3">When do you plan to buy?</h4>
                          <div className="grid gap-2">
                            {investTimelineOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField("investTimeline", opt)}
                                className={`w-full p-3.5 text-left text-sm rounded-lg border transition-all font-custom3 ${formData.investTimeline === opt ? "border-neutral-950 bg-neutral-950 text-white" : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formErrors.investTimeline && <p className="text-red-600 text-sm mt-2">{formErrors.investTimeline}</p>}
                        </div>
                      )}
                      {step === 3 && (
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-gray-900 font-custom2">Contact</h4>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-custom2 uppercase tracking-wide">Full name</label>
                            <input type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Name" className={`w-full p-3.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-950/15 focus:border-neutral-950 text-base font-custom3 ${formErrors.name ? "border-red-500" : "border-gray-200"}`} />
                            {formErrors.name && <p className="text-red-600 text-sm mt-1.5">{formErrors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-custom2 uppercase tracking-wide">Email</label>
                            <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@example.com" className={`w-full p-3.5 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-950/15 focus:border-neutral-950 text-base font-custom3 ${formErrors.email ? "border-red-500" : "border-gray-200"}`} />
                            {formErrors.email && <p className="text-red-600 text-sm mt-1.5">{formErrors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-custom2 uppercase tracking-wide">Phone</label>
                            <CountrySelect styling={`w-full rounded-lg border transition-all bg-white px-3 py-2.5 ${formErrors.phone ? "border-red-500 focus-within:border-red-600" : "border-gray-200 focus-within:border-neutral-950"}`} labels={en} flags={flags} value={formData.country} onChange={(country) => updateField("country", country)} onPhoneChange={(phone) => updateField("phone", phone)} />
                            {formErrors.phone && <p className="text-red-600 text-sm mt-1.5">{formErrors.phone}</p>}
                          </div>
                        </div>
                      )}
                      {formErrors.submit && <p className="text-red-600 text-sm text-center">{formErrors.submit}</p>}
                      <div className="flex justify-between items-center gap-3 pt-4 border-t border-gray-100 mt-2">
                        {step > 0 ? (
                          <button type="button" onClick={handleBack} className="text-sm font-medium text-gray-600 hover:text-neutral-950 font-custom2 px-2 py-2">
                            Back
                          </button>
                        ) : (
                          <span />
                        )}
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={isSubmitting}
                          className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-950 text-white text-sm font-semibold uppercase tracking-wide font-custom2 transition-colors ${isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-neutral-800"}`}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin shrink-0" aria-hidden />
                              <span>Sending</span>
                            </>
                          ) : step === stepsTotal - 1 ? (
                            "Submit"
                          ) : (
                            "Continue"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 px-2">
                      <div className="w-14 h-14 bg-neutral-950 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FaCheck className="text-white text-2xl" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 font-custom">Thank you, {formData.name}</h4>
                      <p className="text-gray-600 text-sm font-custom3 mb-8 leading-relaxed">We will be in touch shortly with next steps.</p>
                      <button type="button" onClick={closeForm} className="px-8 py-3 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors font-custom2">
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MetaPixel pixelId={pixelId} />
    </main>
  );
}
