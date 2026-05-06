"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

// FAQ accordion for landing pages (light or dark variant).
export default function LandingFaqs({
  sectionLabel = "FAQ",
  heading = "Frequently Asked Questions",
  description,
  faqs = [],
  className = "",
  variant = "light",
  tag = "section",
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const isDark = variant === "dark";
  const Wrapper = tag === "div" ? "div" : "section";

  const surface = isDark
    ? "border-white/10 bg-neutral-950"
    : "border-neutral-200/80 bg-white";

  const wrapperProps =
    tag === "div"
      ? { role: "region", "aria-label": sectionLabel || "FAQ" }
      : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`py-24 md:py-28 border-t ${surface} ${className}`.trim()}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <p
            className={`text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] font-custom2 mb-4 ${
              isDark ? "text-[#C5A059]" : "text-neutral-500"
            }`}
          >
            {sectionLabel}
          </p>
          <h2
            className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] font-custom tracking-tight ${
              isDark ? "text-white" : "text-neutral-950"
            }`}
          >
            {heading}
          </h2>
          {description && (
            <p
              className={`text-base md:text-lg leading-relaxed font-custom3 mt-5 max-w-2xl mx-auto ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              {description}
            </p>
          )}
        </motion.div>

        <div className={isDark ? "space-y-0" : "space-y-3"}>
          {faqs.map((faq, idx) => {
            const question = faq.q ?? faq.question ?? "";
            const answer = faq.a ?? faq.answer ?? "";
            if (!question) return null;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.04, 0.24), duration: 0.45 }}
                className={`overflow-hidden transition-colors duration-300 ${
                  isDark
                    ? "rounded-none border-0 border-b border-white/15 bg-transparent last:border-b-0"
                    : "bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-neutral-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full px-5 md:px-6 py-5 text-left flex justify-between items-start gap-4 transition-colors ${
                    isDark ? "hover:bg-white/[0.04]" : "hover:bg-neutral-50/80"
                  }`}
                >
                  <span
                    className={`text-base font-semibold font-custom2 leading-snug ${
                      isDark ? "text-white" : "text-neutral-950"
                    }`}
                  >
                    {question}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform ${
                      isDark
                        ? openFaq === idx
                          ? "rotate-180 border border-[#C5A059] bg-[#C5A059]/15"
                          : "border border-[#C5A059]/40 bg-transparent"
                        : openFaq === idx
                          ? "rotate-180 bg-neutral-950 border-neutral-950"
                          : "bg-neutral-100 border border-neutral-200"
                    }`}
                  >
                    <FaChevronDown
                      className={`text-sm ${
                        isDark
                          ? "text-[#C5A059]"
                          : openFaq === idx
                            ? "text-white"
                            : "text-neutral-700"
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-5 md:px-6 pb-5 leading-relaxed text-sm md:text-base font-custom3 border-t pt-4 ${
                          isDark
                            ? "text-neutral-300 border-white/10"
                            : "text-neutral-600 border-neutral-200"
                        }`}
                      >
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
}
