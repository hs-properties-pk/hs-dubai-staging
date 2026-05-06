import { BRAND_PROFILES } from "@/data/brand-profiles";

/**
 * Default “about” block when a slug has no custom `about` in `BRAND_PROFILES`.
 */
export function buildDefaultAbout(name, offPlanCount, communityCount) {
  const s = (n) => (n === 1 ? "" : "s");
  return {
    aboutSubtitle: `About ${name}`,
    aboutTitle: `Explore ${name} in Dubai with H&S`,
    description: [
      `H&S Real Estate lists ${offPlanCount} off-plan project${s(
        offPlanCount,
      )} by ${name} on hsproperty.ae — with filters for layout, price, and handover, plus direct links to project detail pages.${
        communityCount > 0
          ? ` We also feature ${communityCount} community guide${s(
              communityCount,
            )} for this developer, aligned with our main /communities section.`
          : ""
      }`,
      "Our RERA-registered team helps you compare payment plans, escrow rules, and early-phase incentives before you reserve — the same end-to-end support that earned DLD’s No.1 broker recognition (2025).",
    ],
    cta: {
      label: `Talk to a ${name} expert`,
      action: "expert",
    },
    stats: [
      { value: String(offPlanCount), label: "Off-plan projects (this site)" },
      { value: String(communityCount), label: "Community guides" },
      { value: "RERA", label: "Escrow oversight" },
      { value: "DLD 2025", label: "No.1 awarded broker" },
      { value: "Free", label: "Investor shortlisting" },
      { value: "24/7", label: "Whatsapp + calls" },
    ],
  };
}

/**
 * Serialisable page model for `/brands/[slug]`.
 */
export function resolveBrandPageProfile({
  slug,
  name,
  intro,
  offPlanCount,
  communityCount,
}) {
  const custom = (slug && BRAND_PROFILES[slug]) || {};
  const brandQuery = `/properties/off-plan?brand=${encodeURIComponent(name)}`;
  const defaults = buildDefaultAbout(name, offPlanCount, communityCount);

  const about = {
    aboutSubtitle: custom.about?.aboutSubtitle ?? defaults.aboutSubtitle,
    aboutTitle: custom.about?.aboutTitle ?? defaults.aboutTitle,
    description: Array.isArray(custom.about?.description) &&
    custom.about.description.length > 0
      ? custom.about.description
      : defaults.description,
    cta: {
      label: custom.about?.cta?.label ?? defaults.cta.label,
      action: custom.about?.cta?.action ?? defaults.cta.action,
      href: custom.about?.cta?.href ?? null,
    },
    stats:
      Array.isArray(custom.about?.stats) && custom.about.stats.length > 0
        ? custom.about.stats
        : defaults.stats,
  };

  return {
    logo:
      typeof custom.logo === "string" && custom.logo.length > 0
        ? custom.logo
        : null,
    headline: custom.headline ?? null,
    tagline: custom.tagline ?? null,
    heroBody: custom.heroBody ?? intro,
    heroImage: custom.heroImage ?? "/Bg-Imgs/off-plan-bg.jpg",
    heroCta: custom.heroCta ?? {
      label: "View all properties",
      href: brandQuery,
    },
    about,
    leadBanner:
      custom.leadBanner === false
        ? null
        : {
            title:
              custom.leadBanner?.title ??
              `Get expert access to new ${name} launches`,
            subtitle:
              custom.leadBanner?.subtitle ??
              "Share your budget and timeline — we’ll shortlist projects and payment options.",
            brochureUrl: custom.leadBanner?.brochureUrl ?? null,
            showWhatsapp: custom.leadBanner?.showWhatsapp !== false,
          },
    midCta: custom.midCta ?? {
      title: `Looking for a specific ${name} project?`,
      primaryLabel: "Ask an expert",
      secondaryLabel: "View all off-plan",
      secondaryHref: brandQuery,
    },
    paymentSection:
      custom.paymentSection === false
        ? null
        : {
            title:
              custom.paymentSection?.title ?? `Payment plans — ${name}`,
            body:
              custom.paymentSection?.body ??
              "Off-plan purchases use DLD-registered escrow and developer-specific schedules. We review the live payment plan with you before you reserve.",
            plans:
              Array.isArray(custom.paymentSection?.plans) &&
              custom.paymentSection.plans.length > 0
                ? custom.paymentSection.plans
                : [
                    { title: "Escrow", body: "Funds protected per RERA rules" },
                    { title: "Milestones", body: "Linked to construction stages" },
                    { title: "Handover", body: "Final % on completion" },
                    { title: "Expert review", body: "We verify every schedule" },
                  ],
            downloadLabel:
              custom.paymentSection?.downloadLabel ?? "Download payment plan",
            downloadUrl: custom.paymentSection?.downloadUrl ?? null,
          },
    /** Flat FAQ list: `faqs` or `faq` on BRAND_PROFILES[slug] with { question, answer } (or q/a). */
    faqSection: (() => {
      const raw = custom.faqs ?? custom.faq;
      if (!Array.isArray(raw) || raw.length === 0) return null;
      return {
        sectionLabel: custom.faqSectionLabel ?? "FAQ",
        heading:
          custom.faqHeading ?? `Frequently asked questions — ${name}`,
        description: custom.faqDescription ?? undefined,
        faqs: raw,
      };
    })(),
  };
}
