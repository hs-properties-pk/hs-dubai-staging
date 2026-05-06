"use client";

import React, { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import LandingPageGallery from "@/components/LandingPageGallery";
import CountrySelect from "@/components/CountrySelect";
import MetaPixel from "@/components/MetaPixel";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaBuilding,
  FaStar,
  FaHome,
  FaShoppingBag,
  FaCheckCircle,
  FaEye,
  FaCompass,
  FaMap,
  FaIndustry,
  FaAnchor,
  FaCogs,
  FaArrowRight,
  FaTimes,
  FaUmbrellaBeach,
  FaPlane,
  FaCity,
  FaTree,
} from "react-icons/fa";
import { FaCar, FaMapPin } from "react-icons/fa6";

/* ---------------------------------------------
  DATA (Content-heavy for SEO)
--------------------------------------------- */

// Property Types (cards)
const propertyTypes = [
  {
    name: "Waterfront Apartments",
    size: "1–3 Bedroom Layouts",
    price: "Creek / skyline views",
    icon: FaHome,
    image: "/dubai-meritime-city/4.jpg",
    features: [
      "Creek or port views",
      "Modern finishes",
      "Balcony access",
      "Promenade & marina proximity",
    ],
    status: "Available",
  },
  {
    name: "Commercial Spaces",
    size: "Office & Retail",
    price: "Business-ready",
    icon: FaBuilding,
    image: "/dubai-meritime-city/5.webp",
    features: [
      "Maritime business hub",
      "Flexible layouts",
      "Retail & services potential",
      "Logistics accessibility nearby",
    ],
    status: "Leasing",
  },
  {
    name: "Mixed-Use Towers",
    size: "Residential + Office",
    price: "Live-work flexibility",
    icon: FaIndustry,
    image: "/dubai-meritime-city/6.jpeg",
    features: [
      "Combined residential & commercial",
      "Modern architecture",
      "Waterfront setting",
      "Long-term growth potential",
    ],
    status: "Off-plan",
  },
];

// Zoning / master plan blocks
const zones = [
  {
    name: "Maritime Industry Zone",
    description:
      "Designed for maritime services, ship-related operations, and industry activity across Dubai Maritime City.",
    icon: FaAnchor,
    color: "from-blue-600 to-cyan-500",
    features: [
      "Marine services",
      "Docks & logistics",
      "Commercial operations",
      "Business activity",
    ],
  },
  {
    name: "Residential Zone",
    description:
      "High-rise apartment living with waterfront views, promenades, and everyday community conveniences.",
    icon: FaHome,
    color: "from-slate-700 to-gray-600",
    features: [
      "Apartments & penthouses",
      "Water views",
      "Green pockets",
      "Community access",
    ],
  },
  {
    name: "Leisure & Retail Zone",
    description:
      "Planned dining, retail, and lifestyle spaces connected by scenic walkways and waterfront promenades.",
    icon: FaShoppingBag,
    color: "from-blue-700 to-indigo-500",
    features: [
      "Retail outlets",
      "Cafés & dining",
      "Promenades",
      "Lifestyle destinations",
    ],
  },
];

const locationHighlights = [
  {
    icon: FaAnchor,
    title: "Port Rashid",
    distance: "Nearby",
    desc: "A major port area and historic Dubai landmark.",
  },
  {
    icon: FaIndustry,
    title: "Dubai Dry Docks",
    distance: "Nearby",
    desc: "Ship repair and maritime services hub.",
  },
  {
    icon: FaCity,
    title: "Downtown Dubai",
    distance: "Approx. 15 minutes",
    desc: "Business, lifestyle, and attractions.",
  },
  {
    icon: FaPlane,
    title: "Dubai International Airport",
    distance: "Approx. 20 minutes",
    desc: "International connectivity.",
  },
  {
    icon: FaTree,
    title: "Ras Al Khor Wildlife Sanctuary",
    distance: "Approx. 10 minutes",
    desc: "Nature reserve and calm escape.",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Jumeirah Beach",
    distance: "Approx. 25 minutes",
    desc: "Coastal recreation and beachfront life.",
  },
];

// FAQ
const faqData = [
  {
    question: "What is Dubai Maritime City?",
    answer:
      "Dubai Maritime City is a large mixed-use development located along Dubai Creek, combining residential towers, commercial spaces, and maritime services within one master-planned waterfront community.",
  },
  {
    question: "Where is Dubai Maritime City located?",
    answer:
      "Dubai Maritime City is located between Port Rashid and Dubai Dry Docks, offering direct access to key city hubs such as Downtown Dubai, business districts, and Dubai International Airport.",
  },
  {
    question: "What types of properties are available in Dubai Maritime City?",
    answer:
      "Property options include waterfront apartments (1–3 bedrooms), luxury apartments and penthouses, mixed-use towers with residential and commercial components, and commercial office/retail spaces.",
  },
  {
    question: "Is Dubai Maritime City an off-plan project?",
    answer:
      "Yes. Dubai Maritime City includes ongoing and future off-plan projects in the UAE, offering opportunities for investors and end-users seeking long-term growth in a waterfront community.",
  },
  {
    question: "Who is developing Dubai Maritime City?",
    answer:
      "Dubai Maritime City is developed by DP World, a global leader in marine and logistics, alongside other key stakeholders involved in planning and delivery.",
  },
  {
    question: "Is Dubai Maritime City suitable for families?",
    answer:
      "Yes. With residential towers, promenades, planned everyday services, and strong connectivity to the rest of Dubai, Dubai Maritime City can suit families, professionals, and investors looking for a waterfront lifestyle.",
  },
  {
    question:
      "What is the everyday living experience like (views, activity, noise)?",
    answer:
      "Dubai Maritime City blends calm waterfront living with the atmosphere of a working port. Depending on tower position and proximity to operations, residents may notice maritime activity and sea traffic—ideal for those who like a dynamic waterfront environment.",
  },
  {
    question: "Are there retail and dining options in Dubai Maritime City?",
    answer:
      "Planned retail, cafés, restaurants, and everyday services are part of the community vision. In addition, residents have quick access to nearby dining and shopping areas across central Dubai.",
  },
];

const galleryImages = [
  {
    src: "/dubai_maritime_city/gallery1.webp",
    width: 800,
    height: 600,
    alt: "Dubai Maritime City aerial view",
  },
  {
    src: "/dubai_maritime_city/gallery2.webp",
    width: 800,
    height: 600,
    alt: "Waterfront apartments in Dubai Maritime City",
  },
  {
    src: "/dubai_maritime_city/gallery3.webp",
    width: 800,
    height: 600,
    alt: "Commercial port operations near Dubai Maritime City",
  },
  {
    src: "/dubai_maritime_city/gallery4.webp",
    width: 800,
    height: 600,
    alt: "Dubai Maritime City modern architecture",
  },
  {
    src: "/dubai_maritime_city/gallery5.webp",
    width: 800,
    height: 600,
    alt: "Dubai Maritime City marina and promenade",
  },
  {
    src: "/dubai_maritime_city/gallery6.webp",
    width: 800,
    height: 600,
    alt: "Industrial waterfront atmosphere at Dubai Maritime City",
  },
];

const stepsTotal = 5;

/* ---------------------------------------------
  SUB COMPONENTS
--------------------------------------------- */

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-blue-400/20 last:border-b-0">
    <button
      className="flex justify-between items-center w-full py-6 text-left hover:text-blue-300 transition-colors"
      onClick={onClick}
      type="button"
    >
      <span className="font-semibold text-white pr-4">{faq.question}</span>
      <span className="text-blue-300 flex-shrink-0 ml-4">
        {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
      </span>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="pb-6">
            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-blue-300/80">
    <span className="w-10 h-[1px] bg-blue-300/40" />
    <span>{children}</span>
  </div>
);

const Divider = () => <div className="h-px w-full bg-blue-500/15" />;

/* ---------------------------------------------
  MAIN
--------------------------------------------- */

export default function DubaiMaritimeCity({ pixelId }) {
  const router = useRouter();
  const honeypotRef = useRef(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    propertyType: "",
    message: "",
  });

  const progress = ((step + 1) / stepsTotal) * 100;

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 0 && !formData.name.trim())
      errors.name = "Name is required";

    if (currentStep === 1) {
      if (!formData.email.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errors.email = "Invalid email format";
    }

    if (currentStep === 2 && !formData.phone.trim())
      errors.phone = "Phone number is required";
    return errors;
  };

  const handleNext = async () => {
    const errors = validateStep(step);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    if (step < stepsTotal - 1) {
      setStep((s) => s + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      // Get honeypot field value
      const websiteValue = honeypotRef.current?.value || "";
      const res = await fetch("/api/send-maritime-city-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyType: formData.propertyType,
          message: formData.message,
          website: websiteValue, // Honeypot field - should always be empty for legitimate users
          createdAt: new Date().toISOString(),
          source: "Dubai Maritime City",
        }),
      });

      if (res.ok) {
        router.push("/dubai-meritime-city/thankyou");
      } else {
        const errorData = await res.json().catch(() => ({}));
        setFormErrors({
          submit:
            errorData.message || "Failed to submit form. Please try again.",
        });
        setIsSubmitting(false);
      }
    } catch (e) {
      setFormErrors({
        submit: "Network error. Please check your connection and try again.",
      });
      setIsSubmitting(false);
    }
  };

  const handleBack = () => step > 0 && setStep((s) => s - 1);

  const openForm = () => {
    setIsFormOpen(true);
    setSubmitted(false);
    setStep(0);
    setFormErrors({});
  };

  const closeForm = () => setIsFormOpen(false);

  const toggleFaq = (index) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const seoChecklist = useMemo(
    () => [
      "Master-planned waterfront community along Dubai Creek",
      "Strategic location between Port Rashid and Dubai Dry Docks",
      "Residential, commercial, and leisure zones in one district",
      "Promenades, marina lifestyle, and waterfront views",
      "Off-plan projects in UAE + long-term investment context",
    ],
    []
  );

  return (
    <main className="bg-gray-900 text-white overflow-x-hidden">
      {/* =========================
          HERO (Simple 100vh background image)
      ========================== */}
      <section id="hero" className="relative min-h-[100vh] flex items-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/dubai-meritime-city/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-gray-900" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 border border-white/15 bg-black/35 backdrop-blur rounded-full px-4 py-2">
              <FaAnchor className="text-blue-300" />
              <span className="text-white/90 text-sm font-semibold">
                Dubai Maritime City
              </span>
              <span className="text-white/25">•</span>
              <span className="text-white/70 text-sm">
                Waterfront master-planned community
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.02]"
            >
              Dubai Maritime City
              <span className="block mt-4 text-xl sm:text-2xl text-white/80 font-semibold">
                A working waterfront community with residential, commercial, and
                leisure life.
              </span>
            </motion.h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed">
              Explore Dubai Maritime City location advantages, master plan
              zoning, marina lifestyle, property types, and the investment
              context behind one of Dubai’s most distinctive mixed-use
              districts.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openForm}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 text-white px-7 py-4 font-semibold hover:bg-blue-700 transition-colors"
              >
                Request Details <FaArrowRight />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("overview")}
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/15 bg-white/10 px-7 py-4 font-semibold text-white hover:border-white/25 transition-colors"
              >
                Explore Community <FaCompass />
              </button>
            </div>

            <div className="mt-6 text-sm text-white/70">
              maritime city • dubai maritime city location map • master plan •
              floor plan • master-planned communities
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          OVERVIEW + HISTORY (Simple, not dramatic)
      ========================== */}
      <section id="overview" className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>Overview</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                A mixed-use waterfront district designed for work and everyday
                living.
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Dubai Maritime City is a visionary, master-planned waterfront
                development located along the shores of Dubai Creek. As one of Dubai&apos;s premier master-planned communities, this maritime city was initially
                conceived in the early 2000s and designed by a leading real estate company in dubai to combine
                industrial, commercial, residential, and leisure spaces in one
                integrated community.
              </p>

              <div className="space-y-3 pt-2">
                {seoChecklist.map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                    <span className="text-gray-200">{t}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("properties")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-500/25 bg-blue-500/10 px-6 py-4 font-semibold text-white hover:border-blue-500/40 transition-colors"
                >
                  View Property Types <FaEye />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-blue-500/15 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
                    <FaCogs className="text-blue-300" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200/80 uppercase tracking-widest">
                      History & Vision
                    </div>
                    <div className="text-xl font-bold">
                      Why Dubai Maritime City was planned
                    </div>
                  </div>
                </div>

                <div className="space-y-5 text-gray-300 leading-relaxed">
                  <p>
                    The goal was to create a hub for maritime businesses while
                    offering waterfront living and amenities. Today, Dubai
                    Maritime City blends modern residential towers with active
                    maritime operations, making it a central point for both
                    business and lifestyle.
                  </p>
                  <p>
                    The community includes residential apartments, commercial
                    office space, and leisure facilities, all connected by
                    promenades and planned green pockets. It is aimed at
                    professionals, families, and investors who want a waterfront
                    location with strong city access.
                  </p>
                </div>

                <div className="mt-8">
                  <Divider />
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-gray-300">
                      Want the master plan, floor plan details + updated availability?
                    </div>
                    <button
                      type="button"
                      onClick={openForm}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Request Info <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          LOCATION & CONNECTIVITY (More content)
      ========================== */}
      <section
        id="location"
        className="py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>Location</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Dubai Maritime City location & connectivity
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Dubai Maritime City sits on a man-made peninsula between Port
                Rashid and Dubai Dry Docks. It’s minutes from major hubs like
                Downtown Dubai and Dubai International Airport, with quick
                access to key roads and city districts.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The Dubai Maritime City location map highlights a “best of both
                worlds” position: close enough for city convenience, yet
                oriented around waterfront views and a calmer environment for
                residents.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={openForm}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-3 font-semibold hover:bg-white/90 transition-colors"
                >
                  Ask About Commute <FaArrowRight />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("masterplan")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/15 bg-transparent px-5 py-3 font-semibold text-white hover:border-white/25 transition-colors"
                >
                  View Master Plan <FaMap />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-blue-500/15 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
                    <FaMapPin className="text-blue-300" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200/80 uppercase tracking-widest">
                      Nearby landmarks
                    </div>
                    <div className="text-xl font-bold">
                      Key areas around Dubai Maritime City
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {locationHighlights.map((loc, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/10 p-4"
                    >
                      <div className="w-11 h-11 rounded-2xl border border-blue-500/20 bg-blue-500/10 flex items-center justify-center">
                        <loc.icon className="text-blue-300" />
                      </div>
                      <div>
                        <div className="font-bold">{loc.title}</div>
                        <div className="text-sm text-blue-200">
                          {loc.distance}
                        </div>
                        <div className="text-sm text-gray-300">{loc.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Divider />
                  <div className="mt-5 space-y-3 text-gray-300">
                    <p className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                      Road access supports quick travel to Downtown Dubai, Dubai
                      Marina, and Jumeirah Beach.
                    </p>
                    <p className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                      Public transport is accessible from nearby areas
                      (metro/bus connections depending on route).
                    </p>
                    <p className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                      Strong connectivity makes it practical for frequent city
                      commuting while living on the waterfront.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          MASTER PLAN & ZONING
      ========================== */}
      <section id="masterplan" className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>Master Plan</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Master plan & mixed-use zoning
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                The master plan of maritime city is designed to balance
                commercial, residential, and industrial elements. Distinct zones
                support maritime operations, offices, residential living, and
                leisure amenities in one district. This comprehensive master plan creates a self-sustaining waterfront community.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Residential areas are positioned to benefit from waterfront
                views, with planned parks, promenades, and everyday services.
                The goal is a well-rounded, self-sufficient community that
                supports both work and lifestyle.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid md:grid-cols-3 gap-6">
                {zones.map((zone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="rounded-3xl overflow-hidden border border-blue-500/15 bg-white/5"
                  >
                    <div className={`bg-gradient-to-br ${zone.color} p-[1px]`}>
                      <div className="bg-gray-900/70 p-6 rounded-3xl h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <zone.icon className="text-white" />
                          </div>
                          <div className="font-bold text-white">
                            {zone.name}
                          </div>
                        </div>
                        <div className="text-gray-300 text-sm leading-relaxed">
                          {zone.description}
                        </div>

                        <div className="mt-5 space-y-2">
                          {zone.features.map((f, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-white/20 mt-2" />
                              <span className="text-gray-300 text-sm">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-blue-500/15 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <FaMap className="text-blue-300" />
                  <div className="font-bold text-white">
                    Master-planned communities
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Dubai Maritime City is planned as an integrated community
                  where residents can access lifestyle amenities, retail, and
                  waterfront spaces without long internal travel—while the
                  district still functions as a maritime business hub.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => scrollToSection("properties")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Explore Property Types <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          WATERFRONT & MARINA FEATURES (added)
      ========================== */}
      <section
        id="waterfront"
        className="py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <SectionLabel>Waterfront</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Waterfront & marina features
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Living in Dubai Maritime City means true waterfront
                living—promenades, port views, and a marina-focused environment.
                Residents can walk along the waterfront, enjoy cafés, and
                experience Dubai Creek as part of daily life.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The marina is planned as a key lifestyle feature, supporting
                outdoor leisure, dining, and a relaxed waterfront
                atmosphere—alongside the working maritime identity of the
                district.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Promenade-style waterfront walking areas",
                  "Lifestyle cafés & dining potential",
                  "Docking / marina context as the community evolves",
                  "Views of creek, channels, and port activity",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                    <span className="text-gray-200">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-blue-500/15">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/dubai-meritime-city/1.jpeg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-black/35 backdrop-blur rounded-2xl border border-white/10 px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Water views
                  </div>
                  <div className="text-lg font-bold text-white">
                    A waterfront lifestyle shaped by maritime activity and
                    modern towers.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          PROPERTIES (cards)
      ========================== */}
      <section id="properties" className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <SectionLabel>Properties</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Property types in Dubai Maritime City
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Choose from waterfront apartments, commercial spaces, and
                mixed-use towers with detailed floor plan options. Dubai Maritime City includes both ready
                opportunities (where applicable) and off plan project in
                uae—supporting investors and end users in this growing real estate market.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={openForm}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700 transition-colors"
              >
                Request Brochure <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {propertyTypes.map((property, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-white/5 border border-blue-500/15 rounded-3xl overflow-hidden"
              >
                <div className="relative h-48 sm:h-56">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${property.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/10" />

                  <div className="absolute top-4 left-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        property.status === "Available"
                          ? "bg-green-500/15 text-green-300 border-green-500/20"
                          : property.status === "Leasing"
                            ? "bg-amber-500/15 text-amber-300 border-amber-500/20"
                            : "bg-blue-500/15 text-blue-700 border-blue-500/20"
                      }`}
                    >
                      {property.status}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <property.icon className="text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {property.name}
                      </h3>
                      <p className="text-gray-300 mt-1">{property.size}</p>
                      <p className="text-blue-200/90 text-sm mt-1">
                        {property.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {property.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                        <span className="text-gray-200 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        updateField("propertyType", property.name);
                        openForm();
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Enquire <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          LANDMARKS + RETAIL + SERVICES (added)
      ========================== */}
      <section
        id="services"
        className="py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>Community</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Retail, dining & everyday services
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Retail, dining, and everyday services in Dubai Maritime City are
                planned to support residents and workers—cafés, restaurants,
                supermarkets, and community conveniences within the district.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With quick access to nearby shopping and dining across central
                Dubai, Dubai Maritime City residents can enjoy both local
                convenience and city-wide variety.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Planned retail & waterfront dining",
                  "Everyday services for residents and office users",
                  "Promenades connecting spaces and towers",
                  "Easy access to nearby malls and districts",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                    <span className="text-gray-200">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-blue-500/15 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaAnchor className="text-blue-300" />
                  <div className="font-bold text-white">
                    Key landmarks & surrounding areas
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Dubai Maritime City is surrounded by landmarks that strengthen
                  its identity: Port Rashid, Dubai Dry Docks, and Ras Al Khor
                  Wildlife Sanctuary. This central position supports lifestyle
                  convenience and professional access—especially for those
                  connected to maritime and logistics industries.
                </p>
              </div>

              <div className="rounded-3xl border border-blue-500/15 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaCar className="text-blue-300" />
                  <div className="font-bold text-white">
                    Road access, public transport & connectivity
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Dubai Maritime City’s location offers excellent connectivity
                  to major Dubai districts via highways and arterial roads.
                  Metro and bus connections are accessible from nearby areas,
                  making commuting practical for both residents and
                  professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          LIFESTYLE + RESIDENTS + NOISE LEVELS (added)
      ========================== */}
      <section id="lifestyle" className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>Lifestyle</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Target residents & everyday living
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Dubai Maritime City appeals to professionals working in maritime
                and nearby business districts, investors seeking prime
                waterfront opportunities, and families who value a connected yet
                waterfront lifestyle.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Everyday life balances calm water views with the character of an
                active port. Depending on tower position and proximity, maritime
                sounds and sea traffic may be part of the atmosphere—an
                authentic “working waterfront” experience.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Professionals working in maritime and logistics",
                  "Investors focused on long-term growth potential",
                  "Families seeking waterfront views with strong connectivity",
                  "Lifestyle shaped by promenades, views, and port activity",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                    <span className="text-gray-200">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-blue-500/15">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/dubai-meritime-city/2.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-black/35 backdrop-blur rounded-2xl border border-white/10 px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Everyday feel
                  </div>
                  <div className="text-lg font-bold text-white">
                    Port views, movement on the water, and a modern waterfront
                    skyline.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          FUTURE DEVELOPMENT + INVESTMENT (added)
      ========================== */}
      <section
        id="investment"
        className="py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <SectionLabel>Investment</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Future development & investment context
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Dubai Maritime City is still under development, with multiple
                off plan projects in UAE and future phases planned across
                residential and commercial spaces. As the district grows, new
                towers and amenities are expected to strengthen the community
                experience.
              </p>
              <p className="text-gray-300 leading-relaxed">
                For investors, the combination of a waterfront setting and a
                maritime business hub creates a distinct long-term
                narrative—supporting demand from both lifestyle buyers and
                professionals connected to the industry.
              </p>

              <button
                type="button"
                onClick={() => {
                  updateField("propertyType", "Investment");
                  openForm();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-6 py-4 font-semibold hover:bg-blue-700 transition-colors"
              >
                Request Investment Details <FaArrowRight />
              </button>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-blue-500/15 bg-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaIndustry className="text-blue-300" />
                  <div className="font-bold text-white">
                    Why Dubai Maritime City stands out
                  </div>
                </div>

                <div className="space-y-3 text-gray-300">
                  {[
                    "A unique “working waterfront” identity in Dubai",
                    "Strong location between Port Rashid and major city hubs",
                    "Mixed-use master plan supporting residential + commercial demand",
                    "Ongoing development phases to add long-term value",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="text-blue-400 mt-1 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-blue-500/15 bg-blue-500/10 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-blue-200/80">
                      Next step
                    </div>
                    <div className="text-xl font-bold text-white">
                      Get the master plan, availability, and options.
                    </div>
                    <div className="text-gray-300 mt-2">
                      Share your unit type and goals—end-use or investment—and
                      we’ll shortlist what matches.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={openForm}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-3 font-semibold hover:bg-white/90 transition-colors"
                  >
                    Enquire <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <Divider />
          </div>
        </div>
      </section>

      {/* =========================
          FAQ (kept)
      ========================== */}
      <section id="faq" className="py-16 lg:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center space-y-4">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">
              FAQs about Dubai Maritime City
            </h2>
            <p className="text-gray-300 text-lg">
              Clear answers on location, property types, off-plan context, and
              lifestyle.
            </p>
          </div>

          <div className="mt-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-blue-500/15 p-6">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFaqIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={openForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-6 py-4 font-semibold hover:bg-blue-700 transition-colors"
            >
              Ask a Question <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          FLOATING CTA
      ========================== */}
      <motion.button
        type="button"
        onClick={openForm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-3 border border-blue-400/30"
      >
        <FaIndustry /> Get Info
      </motion.button>

      {/* =========================
          FORM MODAL (kept – same logic, blue theme)
      ========================== */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              className="bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                      <FaIndustry className="text-blue-300" />
                      Dubai Maritime City Enquiry
                    </h3>
                    <p className="text-gray-300 mt-2">
                      Step {step + 1} of {stepsTotal}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="text-gray-300 hover:text-white text-xl"
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>

                <div className="min-h-[320px] relative">
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <input
                    type="text"
                    ref={honeypotRef}
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                    aria-hidden="true"
                  />
                  
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -14 }}
                        className="space-y-6"
                      >
                        {step === 0 && (
                          <>
                            <label className="block text-white font-semibold text-lg">
                              Your full name
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => {
                                updateField("name", e.target.value);
                                if (formErrors.name)
                                  setFormErrors((p) => ({ ...p, name: "" }));
                              }}
                              className={`w-full bg-gray-700 border-2 rounded-xl px-5 py-4 text-white focus:outline-none transition-colors text-lg ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-gray-600 focus:border-blue-500"
                              }`}
                              placeholder="Enter your name"
                            />
                            {formErrors.name && (
                              <p className="text-red-500 text-sm">
                                {formErrors.name}
                              </p>
                            )}
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <label className="block text-white font-semibold text-lg">
                              Email address
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                updateField("email", e.target.value);
                                if (formErrors.email)
                                  setFormErrors((p) => ({ ...p, email: "" }));
                              }}
                              className={`w-full bg-gray-700 border-2 rounded-xl px-5 py-4 text-white focus:outline-none transition-colors text-lg ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-gray-600 focus:border-blue-500"
                              }`}
                              placeholder="your@email.com"
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-sm">
                                {formErrors.email}
                              </p>
                            )}
                          </>
                        )}

                        {step === 2 && (
                          <>
                            <label className="block text-white font-semibold text-lg">
                              Mobile number
                            </label>
                            <CountrySelect
                              styling={`w-full rounded-xl border-2 transition-all bg-gray-700 px-5 py-4 text-white ${
                                formErrors.phone
                                  ? "border-red-500 focus-within:border-red-600"
                                  : "border-gray-600 focus-within:border-blue-500"
                              }`}
                              labels={en}
                              flags={flags}
                              value={formData.country}
                              onChange={(country) => {
                                updateField("country", country);
                                if (formErrors.phone)
                                  setFormErrors((p) => ({ ...p, phone: "" }));
                              }}
                              onPhoneChange={(phone) => {
                                updateField("phone", phone);
                                if (formErrors.phone)
                                  setFormErrors((p) => ({ ...p, phone: "" }));
                              }}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm">
                                {formErrors.phone}
                              </p>
                            )}
                          </>
                        )}

                        {step === 3 && (
                          <>
                            <label className="block text-white font-semibold text-lg">
                              What are you interested in?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                "Residential",
                                "Commercial",
                                "Mixed-Use",
                                "Investment",
                              ].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() =>
                                    updateField("propertyType", type)
                                  }
                                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                                    formData.propertyType === type
                                      ? "border-blue-500 bg-blue-500/15 text-white"
                                      : "border-gray-600 bg-gray-700 hover:border-blue-400"
                                  }`}
                                >
                                  <div className="font-semibold">{type}</div>
                                  <div className="text-xs text-gray-300 mt-1">
                                    Available options
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {step === 4 && (
                          <>
                            <label className="block text-white font-semibold text-lg">
                              Any specific requirements?
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                              rows={5}
                              className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                              placeholder="Budget, timeline, preferred view, unit size..."
                            />
                          </>
                        )}
                        
                        {formErrors.submit && (
                          <p className="text-red-500 text-sm mt-4">
                            {formErrors.submit}
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <FaIndustry className="text-3xl text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-3">
                          Thank you, {formData.name}!
                        </h4>
                        <p className="text-gray-300">
                          We’ll contact you shortly with details and
                          availability.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!submitted && (
                  <>
                    {formErrors.submit && (
                      <p className="text-red-500 text-sm mt-4 text-center">
                        {formErrors.submit}
                      </p>
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t border-white/10 gap-3">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="px-6 sm:px-8 py-3 border-2 border-gray-600 rounded-xl text-gray-200 font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                          Back
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="ml-auto bg-blue-600 text-white px-6 sm:px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : step === stepsTotal - 1 ? (
                          <>
                            <FaStar /> Submit
                          </>
                        ) : (
                          <>
                            Next <FaArrowRight />
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          FOOTER (same structure you provided)
      ========================== */}
      <footer className="bg-gray-900 py-16 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-blue-400 transition-colors"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-blue-400" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-blue-400 transition-colors"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </a>
                </div>

                <div className="pt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "location", label: "Location" },
                    { id: "masterplan", label: "Master Plan" },
                    { id: "properties", label: "Properties" },
                    { id: "gallery", label: "Gallery" },
                    { id: "faq", label: "FAQ" },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => scrollToSection(l.id)}
                      className="text-sm text-gray-300 hover:text-blue-300 underline underline-offset-4 decoration-white/15 hover:decoration-blue-300 transition-colors"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-6 text-white">Follow Us</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border-2 border-blue-400 rounded-2xl flex items-center justify-center hover:bg-blue-400 transition-colors text-blue-400 hover:text-gray-900"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border-2 border-blue-400 rounded-2xl flex items-center justify-center hover:bg-blue-400 transition-colors text-blue-400 hover:text-gray-900"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border-2 border-blue-400 rounded-2xl flex items-center justify-center hover:bg-blue-400 transition-colors text-blue-400 hover:text-gray-900"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971043454888"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 border-2 border-blue-400 rounded-2xl flex items-center justify-center hover:bg-blue-400 transition-colors text-blue-400 hover:text-gray-900"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-400/20 pt-8 text-center text-gray-400">
            <p>&copy; 2024 H&amp;S Property. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <MetaPixel pixelId={pixelId} />
    </main>
  );
}
