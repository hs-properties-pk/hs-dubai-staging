"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import { FaTimes, FaCheck, FaSpinner } from "react-icons/fa";

export default function CommunitiesListingModal({ data }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const honeypotRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* Timed welcome modal paused — re-enable when you want auto-open after delay.
  useEffect(() => {
    if (!isMounted || !data?.slug) return;

    const modalKey = `community-modal-${data.slug}`;

    let hasSeenModal = false;
    if (typeof window !== "undefined") {
      hasSeenModal = localStorage.getItem(modalKey);
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isMounted, data?.slug]);
  */

  if (!data || !data.slug || !isMounted) {
    return null;
  }

  const closeModal = () => {
    setIsOpen(false);
    const modalKey = `community-modal-${data.slug}`;
    if (typeof window !== "undefined") {
      localStorage.setItem(modalKey, "true");
    }
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
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
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const websiteValue = honeypotRef.current?.value || "";
      const res = await fetch("/api/send-community-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: websiteValue,
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phone.trim(),
          userType: "",
          budget: "",
          investTimeline: "",
          createdAt: new Date().toISOString(),
          source: `${data.form.sourceLabel} - Welcome Modal`,
          communitySlug: data.slug,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        const modalKey = `community-modal-${data.slug}`;
        if (typeof window !== "undefined") {
          localStorage.setItem(modalKey, "true");
        }
        setTimeout(() => {
          router.push(`/communities/${data.slug}/thankyou`);
        }, 2000);
      } else {
        const errorData = await res.json();
        setFormErrors({ submit: errorData.message || "Failed to submit. Please try again." });
        setIsSubmitting(false);
      }
    } catch (error) {
      setFormErrors({ submit: "Network error. Please check your connection and try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-3 md:p-4 overflow-y-auto overscroll-contain"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl md:rounded-3xl w-full max-w-3xl shadow-2xl max-h-[min(95vh,100dvh)] flex flex-col min-h-0 min-w-0 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Image */}
            <div className="relative h-40 md:h-56 overflow-hidden rounded-t-2xl md:rounded-t-3xl flex-shrink-0">
              <Image
                src={data.hero.imageSrc}
                alt={data.hero.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
                aria-label="Close modal"
              >
                <FaTimes size={18} className="md:w-5 md:h-5" />
              </button>
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 text-white">
                <div className="text-xs font-bold tracking-widest uppercase mb-1 md:mb-2 font-custom2 opacity-90">
                  {data.hero.badgeText}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 font-custom">
                  {data.name}
                </h2>
                <p className="text-sm md:text-lg font-custom3 opacity-90">
                  {data.hero.subtitle}
                </p>
              </div>
            </div>

            {/* Content — scrolls inside modal on short viewports */}
            <div className="p-4 md:p-6 flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
              {!submitted ? (
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 flex-1 min-h-0 min-w-0 w-full overflow-y-auto overscroll-contain touch-pan-y pr-1 md:pr-0 [scrollbar-gutter:stable]">
                  {/* Left: Basic Community Info */}
                  <div className="order-2 md:order-1 hidden md:block pr-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-custom">
                      About {data.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 mb-2 md:mb-4 leading-relaxed font-custom3">
                      {data.hero.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-1 md:space-y-2">
                      {data.overview.quickFacts.slice(0, 4).map((fact, i) => (
                        <div key={i} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-gray-700 font-custom3">
                          <FaCheck className="text-black mt-1 flex-shrink-0 text-xs md:text-sm" />
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Form */}
                  <div className="order-1 md:order-2 relative min-w-0 w-full max-w-full z-[1]">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-custom">
                      Get More Information
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4 font-custom3">
                      Fill in your details and we&apos;ll send you exclusive information about {data.name}.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-2 relative">
                      <input
                        type="text"
                        name="website"
                        ref={honeypotRef}
                        tabIndex="-1"
                        autoComplete="off"
                        style={{ position: "absolute", left: "-9999px" }}
                        aria-hidden="true"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-custom2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder="Enter your full name"
                          className={`w-full min-w-0 max-w-full box-border p-2 md:p-3 bg-gray-50 border rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3 ${formErrors.name ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 font-custom2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="Enter your email address"
                          className={`w-full min-w-0 max-w-full box-border p-2 md:p-3 bg-gray-50 border rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3 ${formErrors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div className="relative min-w-0 w-full max-w-full z-[2]">
                        <label className="block text-sm font-medium text-gray-700 font-custom2">
                          Phone Number *
                        </label>
                        <div className="relative min-w-0 w-full max-w-full">
                          <CountrySelect
                            styling={`w-full min-w-0 max-w-full rounded-xl border-2 transition-all bg-gray-50 px-2 md:px-4 py-2.5 md:py-3 text-sm md:text-base ${formErrors.phone
                                ? "border-red-500 focus-within:border-red-600"
                                : "border-gray-300 focus-within:border-black"
                              }`}
                            labels={en}
                            flags={flags}
                            value={formData.country}
                            onChange={(country) => updateField("country", country)}
                            onPhoneChange={(phone) => updateField("phone", phone)}
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      {formErrors.submit && (
                        <p className="text-red-500 text-sm">{formErrors.submit}</p>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 min-w-0 w-full">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 min-w-0 px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-custom2 text-sm md:text-base"
                        >
                          Maybe Later
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`flex-1 min-w-0 inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-xl transition-all font-custom2 text-sm md:text-base ${isSubmitting
                              ? "opacity-70 cursor-not-allowed"
                              : "hover:bg-gray-900"
                            }`}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin shrink-0" aria-hidden />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            "Get Information"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 md:py-12 overflow-y-auto overscroll-contain flex-1 min-h-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <FaCheck className="text-white text-2xl md:text-3xl" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 font-custom">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-custom3 px-4">
                    Your inquiry about {data.name} has been received. Our team will contact you within 24 hours with more information.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
