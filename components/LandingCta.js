"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";

// Bottom CTA band; inverted = dark styling for some landing pages.
export default function LandingCta({
  openForm,
  sectionLabel,
  title,
  description,
  ctaText,
  footnote,
  stats = [],
  inverted = false,
  secondaryCtaHref,
  secondaryCtaLabel = "WhatsApp",
}) {
  const shell = inverted
    ? "bg-neutral-950 text-white border-t border-white/10"
    : "bg-white text-black border-t border-neutral-200/80";

  const labelCls = inverted
    ? "text-neutral-500"
    : "text-gray-400";

  const titleCls = inverted ? "text-white" : "text-black";

  const descCls = inverted ? "text-neutral-400" : "text-gray-800";

  const statCard = inverted
    ? "bg-white/5 border border-white/10"
    : "bg-gray-50";

  const statVal = inverted ? "text-white" : "text-gray-900";
  const statLbl = inverted ? "text-neutral-500" : "text-gray-600";

  const primaryBtn = inverted
    ? "bg-white text-neutral-950 hover:bg-neutral-200"
    : "bg-black text-white hover:bg-neutral-800";

  const secondaryBtn = inverted
    ? "border border-white/30 text-white hover:bg-white/10"
    : "border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-50 bg-white";

  const footnoteCls = inverted ? "text-neutral-500" : "text-gray-400";

  return (
    <section className={`py-24 md:py-28 relative overflow-hidden ${shell}`}>
      {!inverted && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,0,0,0.04),transparent)] pointer-events-none" />
      )}
      {inverted && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent"
          aria-hidden
        />
      )}

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="space-y-8"
        >
          <div>
            <span
              className={`text-xs font-semibold tracking-[0.25em] uppercase font-custom2 ${labelCls}`}
            >
              {sectionLabel}
            </span>
          </div>

          <h2 className={`text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight font-custom ${titleCls}`}>
            {title}
          </h2>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-custom3 ${descCls}`}>
            {description}
          </p>

          {stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
              {stats.map((stat, idx) => (
                <div key={idx} className={`text-center p-4 rounded-lg ${statCard}`}>
                  <div className={`text-xl md:text-2xl font-bold mb-1 font-custom2 ${statVal}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs font-custom3 ${statLbl}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center pt-4">
            <motion.button
              type="button"
              onClick={openForm}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`px-10 py-4 text-sm font-semibold uppercase tracking-wide transition-colors font-custom2 ${primaryBtn}`}
            >
              {ctaText}
            </motion.button>
            {secondaryCtaHref && (
              <motion.a
                href={secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-semibold uppercase tracking-wide transition-colors font-custom2 ${secondaryBtn}`}
              >
                <FaWhatsapp className="text-xl text-[#25D366]" aria-hidden />
                {secondaryCtaLabel}
              </motion.a>
            )}
          </div>

          {footnote && (
            <p className={`text-sm mt-8 max-w-lg mx-auto font-custom3 ${footnoteCls}`}>
              {footnote}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
