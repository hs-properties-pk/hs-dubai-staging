"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MetaPixel from "@/components/MetaPixel";
import {
  FaCrown,
  FaWater,
  FaMapMarkerAlt,
  FaBuilding,
  FaShip,
  FaChartLine,
  FaHome,
  FaDumbbell,
  FaStar,
  FaAnchor,
  FaTree,
  FaBell,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaUsers,
  FaCalendar,
  FaRuler,
  FaDollarSign,
  FaEye,
  FaChild,
  FaUtensils,
  FaCar,
  FaShieldAlt,
  FaPalette,
  FaClock,
  FaBalanceScale,
  FaLandmark,
  FaPlane,
  FaShoppingBag,
  FaTrophy,
  FaSwimmer,
  FaCity,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaWifi,
  FaThermometerHalf,
  FaDoorOpen,
  FaUmbrellaBeach,
  FaMountain,
  FaBuilding as FaBuildingIcon,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FaInfinity,
  FaPersonRunning,
  FaPersonBiking,
  FaPersonSwimming,
} from "react-icons/fa6";
import LandingPageGallery from "@/components/LandingPageGallery"; // Import the gallery component
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";

const units = [
  {
    name: "1-Bedroom",
    tag: "Singles & Couples",
    perks: [
      "700-900 sq.ft spacious layouts",
      "Floor-to-ceiling windows with waterfront views",
      "Premium branded finishes",
      "Smart home technology integration",
      "Private balconies with marina views",
    ],
    price: "From AED 1.7M",
    size: "700-900 sq.ft",
    Icon: FaHome,
    image: "/baystar_by_vida/6.webp",
  },
  {
    name: "2-Bedroom",
    tag: "Small Families",
    perks: [
      "1,200-1,500 sq.ft family layouts",
      "Master suite with walk-in closet",
      "Direct marina and waterfront access",
      "Designer kitchen with premium appliances",
      "Spacious living areas with balcony",
    ],
    price: "AED 2.5M - 3.1M",
    size: "1,200-1,500 sq.ft",
    Icon: FaUsers,
    image: "/baystar_by_vida/7.webp",
  },
  {
    name: "3-Bedroom",
    tag: "Luxury Family Living",
    perks: [
      "1,700-2,000 sq.ft expansive layouts",
      "Large terraces with panoramic views",
      "En-suite bathrooms for all bedrooms",
      "Premium hotel-inspired interiors",
      "Open layouts with high ceilings",
    ],
    price: "AED 3.9M - 5.2M",
    size: "1,700-2,000 sq.ft",
    Icon: FaCrown,
    image: "/baystar_by_vida/8.webp",
  },
];

const highlights = [
  {
    Icon: FaCrown,
    title: "Rashid Yachts & Marina Branded Residences",
    desc: "Hotel-inspired luxury with premium standards",
  },
  {
    Icon: FaWater,
    title: "Waterfront Marina Views",
    desc: "Stunning Arabian Gulf panoramas and marina vistas",
  },
  {
    Icon: FaMapMarkerAlt,
    title: "Prime Dubai Location",
    desc: "Between Downtown Dubai and Dubai Marina",
  },
  {
    Icon: FaBuilding,
    title: "Emaar Development",
    desc: "Trusted developer with proven quality",
  },
  {
    Icon: FaShip,
    title: "Superyacht Marina Access",
    desc: "Direct access to prestigious marina facilities",
  },
  {
    Icon: FaChartLine,
    title: "High ROI Potential",
    desc: "Strong investment returns in premium location",
  },
];

const amenities = [
  { Icon: FaInfinity, title: "Infinity Pool", category: "swimming" },
  { Icon: FaDumbbell, title: "Fitness Center", category: "fitness" },
  { Icon: FaPersonRunning, title: "Yoga Decks", category: "wellness" },
  { Icon: FaAnchor, title: "Private Marina", category: "lifestyle" },
  { Icon: FaTree, title: "Landscaped Gardens", category: "outdoor" },
  { Icon: FaBell, title: "24/7 Concierge", category: "services" },
  { Icon: FaChild, title: "Kids Play Area", category: "family" },
  { Icon: FaUtensils, title: "BBQ Zones", category: "entertainment" },
  { Icon: FaPersonRunning, title: "Running Track", category: "fitness" },
  { Icon: FaWifi, title: "Smart Home", category: "technology" },
  { Icon: FaPersonBiking, title: "Sports Courts", category: "sports" },
  { Icon: FaUmbrellaBeach, title: "Community Parks", category: "outdoor" },
];

const faqs = [
  {
    q: "What types of apartments are available in Rashid Yachts & Marina by EMAAR?",
    a: "Rashid Yachts & Marina by EMAAR offers a selection of 1-bedroom, 2-bedroom, and 3-bedroom apartments with stunning marina-facing views and waterfront living options.",
  },
  {
    q: "Where is Rashid Yachts & Marina located?",
    a: "Rashid Yachts & Marina is located at Rashid Yachts & Marina, a prestigious waterfront development in Dubai. It offers easy access to Dubai Downtown, Dubai Marina, Dubai Mall, and other prime locations.",
  },
  {
    q: "When is the expected handover of Rashid Yachts & Marina?",
    a: "The expected handover date for Rashid Yachts & Marina is Q4 2029, with final delivery scheduled for June 2029.",
  },
  {
    q: "Can I get a UAE Golden Visa through investing in Rashid Yachts & Marina?",
    a: "Yes, investors in Rashid Yachts & Marina may be eligible for the UAE Golden Visa depending on the investment amount, providing long-term residency benefits.",
  },
  {
    q: "What makes Rashid Yachts & Marina different from other developments?",
    a: "Rashid Yachts & Marina stands out for its luxury waterfront apartments, marina-facing views, hotel-inspired living experience, and smart home features.",
  },
  {
    q: "What amenities are included in the project?",
    a: "The development features infinity swimming pools, fully equipped fitness centers, wellness spaces, private marina access, children's play areas, landscaped gardens, and multi-purpose courts.",
  },
  {
    q: "Is Rashid Yachts & Marina a good investment?",
    a: "Yes, Rashid Yachts & Marina offers strong ROI potential due to its prime waterfront location, luxury branded residences, high demand for marina-facing apartments, and Emaar's reputation.",
  },
];

const pros = [
  "Prime waterfront location in rapidly developing Rashid Yachts & Marina",
  "Rashid Yachts & Marina branded residences with hotel-style services and premium finishes",
  "Stunning marina and Arabian Gulf views from all apartments",
  "High ROI potential with premium rental yields",
  "Golden Visa eligibility for qualifying investors",
  "Modern smart home technology integration throughout",
  "Trusted Emaar developer with proven track record of quality",
  "Strong rental demand from residents and tourists",
  "Long-term capital growth in premium waterfront location",
];

const places = [
  { name: "Downtown Dubai", time: "10 min", Icon: FaCity },
  { name: "Dubai Marina", time: "8 min", Icon: FaWater },
  { name: "Kite Beach", time: "5 min", Icon: FaUmbrellaBeach },
  { name: "Superyacht Marina", time: "2 min", Icon: FaShip },
  { name: "Dubai Mall", time: "12 min", Icon: FaShoppingBag },
  { name: "Burj Khalifa", time: "12 min", Icon: FaBuilding },
];

const architecturalFeatures = [
  {
    Icon: FaBuilding,
    title: "Mid-rise Buildings",
    desc: "Contemporary materials and design",
  },
  {
    Icon: FaWifi,
    title: "Smart Home Tech",
    desc: "Integrated convenience features",
  },
  {
    Icon: FaPalette,
    title: "Rashid Yachts & Marina Interiors",
    desc: "Hotel-inspired luxury finishes",
  },
  {
    Icon: FaMountain,
    title: "Sky Terraces",
    desc: "Panoramic city and sea views",
  },
  { Icon: FaTree, title: "Landscaped Decks", desc: "Green podium spaces" },
  {
    Icon: FaPersonRunning,
    title: "Waterfront Yoga",
    desc: "Wellness and relaxation zones",
  },
];

// Gallery images data for the LandingPageGallery component
const galleryImages = [
  {
    src: "/baystar_by_vida/1.webp",
    width: 800,
    height: 600,
    alt: "Baystar VIDA exterior architecture with modern design",
  },
  {
    src: "/baystar_by_vida/2.webp",
    width: 800,
    height: 600,
    alt: "Luxury living room with panoramic marina views",
  },
  {
    src: "/baystar_by_vida/3.webp",
    width: 800,
    height: 600,
    alt: "Modern kitchen with premium VIDA-branded finishes",
  },
  {
    src: "/baystar_by_vida/4.webp",
    width: 800,
    height: 600,
    alt: "Infinity pool and wellness area overlooking Arabian Gulf",
  },
  {
    src: "/baystar_by_vida/5.webp",
    width: 800,
    height: 600,
    alt: "Private marina access and superyacht facilities",
  },
  {
    src: "/baystar_by_vida/6.webp",
    width: 800,
    height: 600,
    alt: "Master bedroom with floor-to-ceiling windows",
  },
  {
    src: "/baystar_by_vida/7.webp",
    width: 800,
    height: 600,
    alt: "Fitness center with state-of-the-art equipment",
  },
];

export default function RashidYachtsMarinaLanding({ pixelId }) {
  const router = useRouter();
  const [unit, setUnit] = useState(0);
  const [faq, setFaq] = useState(null);
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    budget: "",
    type: "",
  });
  const [done, setDone] = useState(false);
  const [vis, setVis] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) =>
        e.forEach(
          (x) =>
            x.isIntersecting && setVis((p) => ({ ...p, [x.target.id]: true }))
        ),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-a]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 0 && !form.name.trim()) {
      errors.name = "Name is required";
    }
    if (currentStep === 1) {
      if (!form.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    if (currentStep === 2) {
      if (!form.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-()]+$/.test(form.phone)) {
        errors.phone = "Please enter a valid phone number";
      }
    }
    if (currentStep === 3 && !form.budget.trim()) {
      errors.budget = "Budget range is required";
    }
    if (currentStep === 4 && !form.type.trim()) {
      errors.type = "Please select an apartment type";
    }
    return errors;
  };

  const next = async () => {
    const errors = validateStep(step);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit form
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/send-rashid-yachts-marina-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.name,
            email: form.email,
            phoneNumber: form.phone,
            budget: form.budget,
            propertyType: form.type,
            website: "", // Honeypot field - should always be empty
            createdAt: new Date().toISOString(),
            source: "Rashid Yachts & Marina",
          }),
        });

        if (res.ok) {
          // Redirect to thank you page after successful submission
          router.push("/rashid_yachts_marina/thankyou");
        } else {
          const errorData = await res.json();
          console.error("Submission error:", errorData);
          setFormErrors({
            submit:
              errorData.message || "Failed to submit form. Please try again.",
          });
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Submission error:", error);
        setFormErrors({
          submit: "Network error. Please check your connection and try again.",
        });
        setIsSubmitting(false);
      }
    }
  };

  const anim = (id) =>
    `transition-all duration-1000 ${
      vis[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  const filteredAmenities =
    activeCategory === "all"
      ? amenities
      : amenities.filter((a) => a.category === activeCategory);

  const categories = [
    "all",
    "swimming",
    "fitness",
    "wellness",
    "lifestyle",
    "family",
    "technology",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl" />

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/baystar_by_vida/1.webp')" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-cyan-400 text-sm mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            New Launch by Emaar Properties
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="block">EMAAR</span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Rashid Yachts & Marina
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Rashid Yachts and Marina offers luxury waterfront apartments with
            stunning Arabian Gulf views, smart home technology, and direct
            superyacht access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Marina View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" data-a className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-6xl mx-auto ${anim("overview")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Project Details
            </span>
            <h2 className="text-4xl font-bold mt-2">
              Rashid Yachts and Marina Overview
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Rashid Yachts and Marina is a luxury waterfront apartment
                development by Emaar Properties offering branded residences.
                Located in the prestigious Rashid Yachts & Marina, it combines
                modern design with smart home technology and stunning Arabian
                Gulf views.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: FaBuilding,
                    label: "Developer",
                    value: "Emaar Properties",
                  },
                  {
                    icon: FaMapMarkerAlt,
                    label: "Location",
                    value: "Rashid Yachts & Marina",
                  },
                  { icon: FaBalanceScale, label: "DLD Fee", value: "4%" },
                  { icon: FaShieldAlt, label: "Escrow", value: "Compliant" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                  >
                    <item.icon className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs text-slate-400">{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <Image
                src="/baystar_by_vida/2.webp"
                alt="Baystar VIDA Development"
                fill
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <FaBuilding className="w-16 h-16 text-cyan-400/30 relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Units */}
      <section id="un" data-a className="py-20 px-6">
        <div className={`max-w-6xl mx-auto ${anim("un")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Collections
            </span>
            <h2 className="text-4xl font-bold mt-2">Apartment Types</h2>
          </div>

          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {units.map((u, i) => (
              <button
                key={i}
                onClick={() => setUnit(i)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  unit === i
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 hover:bg-white/10 text-slate-300"
                }`}
              >
                <u.Icon className="w-4 h-4" />
                {u.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image Section - Updated with actual images */}
            <div className="aspect-video bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
              {/* Background Image with Fallback */}
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <Image
                  src={units[unit].image}
                  alt={`${units[unit].name} apartment at Baystar VIDA`}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback Icon */}
                <div className="hidden absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 items-center justify-center">
                  <FaBuilding className="w-16 h-16 text-cyan-400/50" />
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-cyan-500 rounded-full font-bold text-sm shadow-lg">
                {units[unit].price}
              </div>

              {/* Size Badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 rounded-full text-xs text-white backdrop-blur-sm border border-white/20">
                {units[unit].size}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaEye className="w-8 h-8 text-white/80" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <span className="text-cyan-400 text-sm">{units[unit].tag}</span>
              <h3 className="text-2xl font-bold mt-1 mb-4">
                {units[unit].name} Apartments
              </h3>
              <p className="text-slate-400 mb-6 flex items-center gap-2">
                <FaRuler className="w-4 h-4" />
                {units[unit].size} • Marina Views • Smart Home Features
              </p>
              <div className="space-y-2 mb-6">
                {units[unit].perks.map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{p}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setModal(true)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
              >
                Request {units[unit].name} Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Features */}
      <section id="architecture" data-a className="py-20 px-6">
        <div className={`max-w-6xl mx-auto ${anim("architecture")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Design Excellence
            </span>
            <h2 className="text-4xl font-bold mt-2">
              Architectural Brilliance
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {architecturalFeatures.map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                  <feature.Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="hl" data-a className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-6xl mx-auto ${anim("hl")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Why Rashid Yachts & Marina
            </span>
            <h2 className="text-4xl font-bold mt-2">Project Highlights</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                  <h.Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{h.title}</h3>
                <p className="text-slate-400 text-sm">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="loc" data-a className="py-20 px-6">
        <div className={`max-w-6xl mx-auto ${anim("loc")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Location
            </span>
            <h2 className="text-4xl font-bold mt-2">Prime Dubai Location</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Strategically positioned with excellent connectivity to
              Dubai&apos;s key destinations via Al Khail Road, Sheikh Zayed
              Road, and Sheikh Mohammed Bin Zayed Road.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((p, i) => (
              <div
                key={i}
                className="p-5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4 hover:border-cyan-500/50 transition-all"
              >
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <p.Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-cyan-400 text-sm">{p.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section using LandingPageGallery Component */}
      <LandingPageGallery
        images={galleryImages}
        title="Rashid Yachts and Marina Gallery"
        description="Experience the luxury of waterfront living at Rashid Yachts & Marina
"
        className="bg-slate-900"
      />

      {/* Amenities */}
      <section id="am" data-a className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-6xl mx-auto ${anim("am")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Lifestyle
            </span>
            <h2 className="text-4xl font-bold mt-2">Luxury Amenities</h2>
            <p className="text-slate-400 mt-4">
              Resort-style living with premium Rashid Yachts & Marina amenities
              and services by EMAAR
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                  activeCategory === category
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {category === "all" ? "All Amenities" : category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredAmenities.map((a, i) => (
              <div
                key={i}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
              >
                <a.Icon className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs text-slate-300">{a.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pros/Cons */}
      <section id="pc" data-a className="py-20 px-6">
        <div className={`max-w-6xl mx-auto ${anim("pc")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Investment Analysis
            </span>
            <h2 className="text-4xl font-bold mt-2">Investment Overview</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <FaCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">
                  Key Advantages
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {pros.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <FaCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Investment */}
      <section
        id="inv"
        data-a
        className="py-20 px-6 bg-gradient-to-r from-cyan-950/30 to-blue-950/30"
      >
        <div className={`max-w-4xl mx-auto text-center ${anim("inv")}`}>
          <span className="text-cyan-400 text-sm uppercase tracking-wider">
            Investment
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Why Invest in Rashid Yachts and Marina?
          </h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Prime waterfront location, Rashid Yachts & Marina brand premium,
            Golden Visa eligibility, Emaar construction quality, and strong
            rental demand in Dubai&apos;s premium marina district.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { I: FaChartLine, t: "High ROI Potential", d: "Premium returns" },
              { I: FaShieldAlt, t: "Golden Visa", d: "Eligibility" },
              { I: FaBuilding, t: "Emaar Quality", d: "Trusted developer" },
            ].map((x, i) => (
              <div
                key={i}
                className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-all"
              >
                <x.I className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-sm font-medium mb-1">{x.t}</div>
                <div className="text-xs text-slate-400">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="fq" data-a className="py-20 px-6 bg-slate-900/50">
        <div className={`max-w-2xl mx-auto ${anim("fq")}`}>
          <div className="text-center mb-12">
            <span className="text-cyan-400 text-sm uppercase tracking-wider">
              Questions
            </span>
            <h2 className="text-4xl font-bold mt-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
              >
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-all"
                >
                  <span className="font-medium text-sm text-slate-200">
                    {f.q}
                  </span>
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${
                      faq === i ? "rotate-180 text-cyan-400" : "text-slate-400"
                    }`}
                  />
                </button>
                {faq === i && (
                  <div className="px-4 pb-4 text-slate-400 text-sm border-t border-white/10 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-cyan-950/50 to-blue-950/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Ready for Waterfront Living?
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Limited marina-view apartments available. Secure your Rashid Yachts
            & Marina-branded residence with stunning Arabian Gulf views and
            premium amenities.
          </p>
          <button
            onClick={() => setModal(true)}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
          >
            Get Exclusive Pricing & Floor Plans
          </button>
          <p className="text-cyan-400 text-sm mt-4">
            • Golden Visa Eligible • Limited Waterfront Units
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-cyan-400" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-cyan-300 transition-colors duration-300"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-cyan-400" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-cyan-300 transition-colors duration-300"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="text-center md:text-left hover:text-cyan-300 transition-colors duration-300"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-6 text-white">Follow Us</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  className="w-12 h-12 border border-slate-600 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-colors text-slate-400 hover:text-white"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 border border-slate-600 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-colors text-slate-400 hover:text-white"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 border border-slate-600 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-colors text-slate-400 hover:text-white"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 border border-slate-600 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 transition-colors text-slate-400 hover:text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 H&S Property. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Real Estate Developments in Dubai
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-slate-300 rounded-2xl w-[90vw] md:w-[50vw] h-[70vh] overflow-visible flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side - Image */}
              <div className="hidden md:block w-80 relative overflow-hidden h-full">
                <Image
                  src="/baystar_by_vida/1.webp"
                  alt="Baystar by VIDA"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/30 shadow-lg">
                    <h4 className="text-lg font-bold text-slate-800 mb-3">
                      Rashid Yachts & Marina by EMAAR
                    </h4>
                    <div className="space-y-2 text-slate-600 text-sm">
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-cyan-500 flex-shrink-0" />
                        <span>1-3 Bedroom Luxury Apartments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-cyan-500 flex-shrink-0" />
                        <span>Waterfront Marina Views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-cyan-500 flex-shrink-0" />
                        <span>Hotel-Inspired Living</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-cyan-500 flex-shrink-0" />
                        <span>Q4 2029 Completion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form Content */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto h-full relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                    Rashid Yachts & Marina by EMAAR Inquiry
                  </h3>
                  <button
                    onClick={() => setModal(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {!isSubmitting && !formErrors.submit ? (
                  <>
                    <div className="mb-6">
                      <div className="h-2 bg-slate-200 rounded-full">
                        <motion.div
                          className="h-full bg-cyan-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((step + 1) / 5) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-slate-500 text-xs mt-2 text-center">
                        Step {step + 1} of 5
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-xl font-bold mb-6 text-slate-800">
                          {step === 0 && "What is your full name?"}
                          {step === 1 && "What is your email address?"}
                          {step === 2 && "What is your phone number?"}
                          {step === 3 && "What is your budget range?"}
                          {step === 4 && "Which apartment type interests you?"}
                        </h3>

                        {step < 4 ? (
                          <div>
                            {step === 2 ? (
                              <CountrySelect
                                styling={`w-full rounded-xl border-2 transition-all ${
                                  formErrors.phone
                                    ? "border-red-500 focus-within:border-red-600"
                                    : "border-slate-300 focus-within:border-cyan-500"
                                } bg-slate-50 px-4 py-3 text-slate-800`}
                                labels={en}
                                flags={flags}
                                value={form.country}
                                onChange={(country) => {
                                  setForm({ ...form, country });
                                  if (formErrors.country) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      country: "",
                                    }));
                                  }
                                }}
                                onPhoneChange={(phone) => {
                                  setForm({ ...form, phone });
                                  if (formErrors.phone) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      phone: "",
                                    }));
                                  }
                                }}
                              />
                            ) : (
                              <input
                                type={step === 1 ? "email" : "text"}
                                value={
                                  step === 0
                                    ? form.name
                                    : step === 1
                                      ? form.email
                                      : form.budget
                                }
                                onChange={(e) => {
                                  setForm({
                                    ...form,
                                    [["name", "email", "budget"][step]]:
                                      e.target.value,
                                  });
                                  // Clear error when user starts typing
                                  const fieldName = ["name", "email", "budget"][
                                    step
                                  ];
                                  if (formErrors[fieldName]) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      [fieldName]: "",
                                    }));
                                  }
                                }}
                                placeholder={
                                  step === 0
                                    ? "Enter your full name"
                                    : step === 1
                                      ? "Enter your email address"
                                      : "e.g., AED 2M - 3M"
                                }
                                className={`w-full p-4 bg-slate-50 border rounded-xl focus:outline-none text-slate-800 placeholder-slate-400 text-lg ${
                                  formErrors[["name", "email", "budget"][step]]
                                    ? "border-red-500"
                                    : "border-slate-300 focus:border-cyan-500"
                                }`}
                              />
                            )}
                            {formErrors[
                              ["name", "email", "phone", "budget"][step]
                            ] && (
                              <p className="text-red-500 text-sm mt-2">
                                {
                                  formErrors[
                                    ["name", "email", "phone", "budget"][step]
                                  ]
                                }
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="space-y-3">
                              {["1-Bedroom", "2-Bedroom", "3-Bedroom"].map(
                                (t) => (
                                  <button
                                    key={t}
                                    onClick={() => {
                                      setForm({ ...form, type: t });
                                      if (formErrors.type) {
                                        setFormErrors((prev) => ({
                                          ...prev,
                                          type: "",
                                        }));
                                      }
                                    }}
                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                                      form.type === t
                                        ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                                        : "border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50"
                                    }`}
                                  >
                                    {t}
                                  </button>
                                )
                              )}
                            </div>
                            {formErrors.type && (
                              <p className="text-red-500 text-sm mt-2">
                                {formErrors.type}
                              </p>
                            )}
                          </div>
                        )}

                        {formErrors.submit && (
                          <p className="text-red-500 text-sm mt-4">
                            {formErrors.submit}
                          </p>
                        )}

                        {/* Honeypot field - hidden from users */}
                        <input
                          type="text"
                          name="website"
                          tabIndex="-1"
                          autoComplete="off"
                          style={{
                            position: "absolute",
                            left: "-9999px",
                            width: "1px",
                            height: "1px",
                            opacity: 0,
                            pointerEvents: "none",
                          }}
                          aria-hidden="true"
                          readOnly
                        />
                        <div className="flex gap-3 mt-8">
                          {step > 0 && (
                            <button
                              onClick={() => setStep(step - 1)}
                              className="px-6 py-3 bg-slate-50 border border-slate-300 rounded-xl hover:bg-slate-100 text-slate-700 transition-all font-medium"
                            >
                              Back
                            </button>
                          )}
                          <button
                            onClick={next}
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-cyan-500 rounded-xl font-semibold text-white hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                          >
                            {isSubmitting
                              ? "Submitting..."
                              : step === 4
                                ? "Submit Inquiry"
                                : "Continue"}
                          </button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="w-8 h-8 text-cyan-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-800">
                      Thank You!
                    </h3>
                    <p className="text-slate-600">
                      We&apos;ll contact you within 24 hours with Rashid Yachts
                      & Marina pricing and availability.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
      <button
        onClick={() => setModal(true)}
        className="fixed bottom-5 right-5 z-40 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium shadow-lg shadow-cyan-500/30 hover:shadow-xl transition-all text-sm hover:scale-105"
      >
        Get Marina Prices
      </button>

      <MetaPixel pixelId={pixelId} />
    </div>
  );
}
