"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
  FaSwimmingPool,
  FaWater,
  FaWifi,
  FaShieldAlt,
  FaChartLine,
  FaMoneyBillWave,
  FaCreditCard,
  FaPassport,
  FaGlobe,
  FaCar,
  FaUmbrellaBeach,
  FaPlane,
  FaRoad,
  FaCity,
  FaLightbulb,
  FaLeaf,
  FaKey,
  FaHandHoldingUsd,
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaCalendar,
  FaRuler,
  FaBed,
  FaBath,
  FaTree,
  FaShip,
  FaBicycle,
  FaChild,
  FaShoppingBag,
  FaUniversity,
  FaHeart,
  FaAnchor,
} from "react-icons/fa";

const propertyTypes = [
  {
    name: "3-4 Bedroom Townhouses",
    size: "2,100 - 3,000 sq. ft.",
    icon: FaHome,
    image: "/damac_island_two/15.webp",
    features: [
      "Modern coastal design",
      "Private terraces",
      "Lagoon views",
      "Family-sized living",
    ],
    units: "Limited collection",
  },
  {
    name: "4-6 Bedroom Villas",
    size: "3,500 - 6,500+ sq. ft.",
    icon: FaBuilding,
    image: "/damac_island_two/16.webp",
    features: [
      "Waterfront locations",
      "Private beach access",
      "Luxury finishes",
      "Spacious layouts",
    ],
    units: "Premium collection",
  },
  {
    name: "Studio & Apartments",
    size: "450 - 1,150 sq. ft.",
    icon: FaBed,
    image: "/damac_island_two/25.webp",
    features: [
      "Efficient layouts",
      "Lagoon views",
      "Modern kitchens",
      "Future phases",
    ],
    units: "Coming soon",
  },
];

const amenities = [
  {
    icon: FaWater,
    title: "Crystal Lagoons",
    desc: "Pristine lagoon pools with crystal-clear waters",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Private Beaches",
    desc: "Exclusive beach access for residents",
  },
  {
    icon: FaShip,
    title: "Private Marina",
    desc: "Boat docking and water access facilities",
  },
  {
    icon: FaBicycle,
    title: "Cycling Tracks",
    desc: "Scenic routes throughout the community",
  },
  {
    icon: FaAnchor,
    title: "Water Sports",
    desc: "Dedicated area for aquatic activities",
  },
  {
    icon: FaChild,
    title: "Kids' Zones",
    desc: "Safe play areas for children",
  },
];

const smartFeatures = [
  {
    icon: FaLightbulb,
    title: "Smart Lighting",
    desc: "Automated illumination systems",
  },
  {
    icon: FaWifi,
    title: "Climate Control",
    desc: "Intelligent temperature management",
  },
  {
    icon: FaShieldAlt,
    title: "Keyless Entry",
    desc: "Advanced security access systems",
  },
  {
    icon: FaLeaf,
    title: "Energy Efficient",
    desc: "Sustainable living technologies",
  },
];

const locationHighlights = [
  {
    icon: FaPlane,
    title: "Dubai Airport",
    distance: "20-25 minutes",
    desc: "International travel convenience",
  },
  {
    icon: FaCity,
    title: "Downtown Dubai",
    distance: "Quick access",
    desc: "Business and entertainment hub",
  },
  {
    icon: FaWater,
    title: "Dubai Marina",
    distance: "Nearby",
    desc: "Luxury waterfront district",
  },
  {
    icon: FaShoppingBag,
    title: "Mall of Emirates",
    distance: "Short drive",
    desc: "Premium shopping destination",
  },
  {
    icon: FaUniversity,
    title: "Top Schools",
    distance: "Accessible",
    desc: "International education institutions",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Beach Resorts",
    distance: "Adjacent",
    desc: "Luxury hospitality options",
  },
];

const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "High Rental Yields",
    desc: "Strong returns from waterfront properties",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Flexible Payment",
    desc: "Customized payment plans available",
  },
  {
    icon: FaKey,
    title: "Freehold Ownership",
    desc: "100% ownership for all nationalities",
  },
  {
    icon: FaPassport,
    title: "Golden Visa",
    desc: "Residency eligibility for investors",
  },
  {
    icon: FaTrophy,
    title: "Prime Location",
    desc: "Dubai Islands master development",
  },
  {
    icon: FaHeart,
    title: "Family Living",
    desc: "Perfect environment for families",
  },
];

const prosData = [
  "Waterfront living with crystalline lagoons and private beaches",
  "Limited collection of luxury villas ensuring exclusivity",
  "Modern townhouses with contemporary coastal architecture",
  "Part of prestigious Dubai Islands master development",
  "Strong appreciation potential in growing waterfront community",
  "Flexible payment plans tailored to investor needs",
  "Golden Visa eligibility for qualifying property investments",
  "Smart home features with energy-efficient technologies",
  "Close proximity to Dubai Marina and Downtown Dubai",
  "Comprehensive amenities including marina and water sports",
];

const faqData = [
  {
    question: "What is DAMAC Island 2?",
    answer:
      "DAMAC Island 2 is a luxury waterfront community offering villas, townhouses, and future apartment options within the Dubai Islands master development.",
  },
  {
    question: "Who is the developer of DAMAC Island 2?",
    answer:
      "The project is developed by DAMAC Properties, known for creating premium residential communities across Dubai.",
  },
  {
    question: "What types of properties are available?",
    answer:
      "The community includes 3-4 bedroom townhouses, 4-6 bedroom villas, and planned studio to 2-bedroom waterfront apartments.",
  },
  {
    question: "Is the project freehold?",
    answer:
      "Yes, DAMAC Island 2 offers 100% freehold ownership for all nationalities.",
  },
  {
    question: "What is the expected handover date?",
    answer: "The expected completion is between Q4 2028 and Q2 2029.",
  },
  {
    question: "Is a payment plan available?",
    answer:
      "Yes, DAMAC Properties typically offers flexible payment plans. Details vary depending on the unit type and booking phase.",
  },
  {
    question: "What amenities will be available in the community?",
    answer:
      "Residents can expect crystal lagoons, private beaches, parks, a marina, cycling tracks, water sports areas, and a clubhouse.",
  },
  {
    question: "How far is DAMAC Island 2 from key Dubai locations?",
    answer:
      "It is around 20-25 minutes from Dubai International Airport and has quick access to Downtown, Dubai Marina, and major highways.",
  },
  {
    question: "Are smart home features included?",
    answer:
      "Yes, the homes are designed with modern smart systems for lighting, climate control, and home security.",
  },
  {
    question: "Is this project good for investment?",
    answer:
      "Yes, waterfront communities in Dubai have strong rental returns and capital appreciation, making DAMAC Island 2 a solid investment choice.",
  },
];

const galleryImages = [
  {
    src: "/damac_island_two/1.webp",
    width: 800,
    height: 600,
    alt: "DAMAC Island 2 waterfront community",
  },
  {
    src: "/damac_island_two/2.webp",
    width: 800,
    height: 600,
    alt: "Crystal lagoon and beach area",
  },
  {
    src: "/damac_island_two/3.webp",
    width: 800,
    height: 600,
    alt: "Modern coastal villas",
  },
  {
    src: "/damac_island_two/4.webp",
    width: 800,
    height: 600,
    alt: "Townhouse community layout",
  },
  {
    src: "/damac_island_two/5.webp",
    width: 800,
    height: 600,
    alt: "Marina and water sports facilities",
  },
  {
    src: "/damac_island_two/6.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/7.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/8.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/9.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/10.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/11.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/12.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/13.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/14.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/15.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/16.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/17.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/18.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },

  {
    src: "/damac_island_two/19.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/20.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/21.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/22.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/23.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/24.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
  {
    src: "/damac_island_two/25.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and parks",
  },
];

const stepsTotal = 5;

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-blue-200/20 last:border-b-0">
    <button
      className="flex justify-between items-center w-full py-6 text-left hover:text-blue-400 transition-colors"
      onClick={onClick}
    >
      <span className="font-semibold text-white pr-4">{faq.question}</span>
      <span className="text-blue-400 flex-shrink-0 ml-4">
        {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
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

const WaterBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute opacity-10"
        style={{
          width: Math.random() * 200 + 100,
          height: Math.random() * 200 + 100,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          background: `radial-gradient(circle, #00b4d8, transparent)`,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function DamacIslandTwo({ pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    propertyType: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef(null);

  const progress = ((step + 1) / stepsTotal) * 100;
  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 0 && !formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (currentStep === 1 && !formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      currentStep === 1 &&
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (currentStep === 2 && !formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    return errors;
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
        // Get honeypot field value
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-damac-island-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            propertyType: formData.propertyType,
            message: formData.message,
            website: websiteValue, // Honeypot field - should always be empty for legitimate users
            createdAt: new Date().toISOString(),
            source: "DAMAC Island 2 - Dubai Islands",
          }),
        });

        if (res.ok) {
          router.push("/damac_island_2/thankyou");
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

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };
  const openForm = () => {
    setIsFormOpen(true);
    setSubmitted(false);
    setStep(0);
  };
  const closeForm = () => setIsFormOpen(false);
  const toggleFaq = (index) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <main className="bg-slate-900 text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <WaterBackground />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-blue-900/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-blue-900/20 z-10" />
          <Image
            src="/damac_island_two/10.webp"
            alt="DAMAC Island 2"
            fill
            className="object-cover absolute inset-0"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-md rounded-full border-2 border-blue-400/50 shadow-xl"
              >
                <FaWater className="text-cyan-400" />
                <span className="text-sm font-bold text-cyan-400 tracking-wider uppercase">
                  Dubai Islands Master Development
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight"
              >
                <span className="text-white drop-shadow-2xl">
                  DAMAC Island 2
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl font-light mt-3">
                  Coastal Luxury Living
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed"
              >
                Experience waterfront living at its finest in Dubai Islands.
                Limited collection of villas and townhouses with crystal
                lagoons, private beaches, and modern coastal architecture.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
              >
                {[
                  {
                    label: "Starting From",
                    value: "AED 2.75M",
                    icon: FaMoneyBillWave,
                  },
                  { label: "Handover", value: "2028-29", icon: FaCalendar },
                  { label: "Ownership", value: "Freehold", icon: FaKey },
                  {
                    label: "Properties",
                    value: "Villas & Townhouses",
                    icon: FaHome,
                  },
                ].map((stat) => {
                  const IconComp = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white/5 backdrop-blur-sm rounded-xl px-3 py-3 border border-cyan-400/30 text-center hover:bg-white/10 transition-all"
                    >
                      <IconComp
                        className="text-cyan-400 mx-auto mb-2"
                        size={20}
                      />
                      <p className="text-[9px] uppercase tracking-wider text-cyan-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={openForm}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all flex items-center justify-center gap-3"
                >
                  <FaEye /> Register Interest
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Visual Feature */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-400/50">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src="/damac_island_two/8.webp"
                    alt="DAMAC Island 2 Luxury Residences"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3 z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-cyan-400/30 hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FaWater className="text-white text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                          Waterfront Community
                        </p>
                        <p className="text-white font-bold text-sm">
                          Crystal Lagoons & Private Beaches
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          Stunning waterfront views with direct beach access
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-cyan-400/30 hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FaShip className="text-white text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                          Exclusive Feature
                        </p>
                        <p className="text-white font-bold text-sm">
                          Private Marina Access
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          Boat docking and premium water sports facilities
                        </p>
                      </div>
                    </div>
                  </motion.div> */}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-cyan-400/30 hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FaUmbrellaBeach className="text-white text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                          Resort Living
                        </p>
                        <p className="text-white font-bold text-sm">
                          Premium Amenities
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          Clubhouse, pools, and leisure activities included
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm">
                    Dubai Islands Premium Location
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/50 rounded-br-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-cyan-400"
          >
            <span className="text-sm mb-2">Explore Community</span>
            <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* KEY INFORMATION */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Project Overview
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Coastal Masterpiece in Dubai Islands
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              DAMAC Island 2 combines resort-style living with premium amenities
              and natural beaches, offering long-term investment value in one of
              Dubai&apos;s most attractive waterfront communities.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: FaWater,
                title: "Waterfront Living",
                desc: "Crystalline lagoons and private beach access with stunning views",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: FaBuilding,
                title: "Modern Architecture",
                desc: "Coastal-style designs with open-plan interiors and natural light",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: FaChartLine,
                title: "Investment Value",
                desc: "Strong appreciation potential in growing Dubai Islands community",
                gradient: "from-cyan-500 to-blue-600",
              },
            ].map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all border border-cyan-400/20"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-shadow`}
                  >
                    <IconComp className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Info Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-cyan-400/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaBuilding className="text-cyan-400" />
                Key Information
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Developer", value: "DAMAC Properties" },
                  { label: "Project Name", value: "DAMAC Island 2" },
                  { label: "Location", value: "Dubai Islands" },
                  {
                    label: "Property Types",
                    value: "Villas, Townhouses, Apartments",
                  },
                  {
                    label: "Price Range",
                    value: "Starting from AED 2,750,000",
                  },
                  {
                    label: "Payment Plan",
                    value: "Flexible options available",
                  },
                  { label: "Government Fee", value: "4% (DLD registration)" },
                  { label: "Ownership", value: "100% Freehold" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-3 border-b border-cyan-400/20 last:border-b-0"
                  >
                    <span className="text-gray-400 font-medium">
                      {item.label}
                    </span>
                    <span className="text-white font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-cyan-400/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCalendar className="text-cyan-400" />
                Project Timeline
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Project Announcement", value: "2025" },
                  { label: "Construction", value: "Infrastructure ongoing" },
                  { label: "Expected Completion", value: "Q4 2028 - Q2 2029" },
                  { label: "Booking Status", value: "2025 Launch Phase" },
                  { label: "Handover Date", value: "Q4 2028 - Q2 2029" },
                  { label: "Unit Structure", value: "Villas & Townhouses" },
                  { label: "Area", value: "Dubai Islands - Premium" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-3 border-b border-cyan-400/20 last:border-b-0"
                  >
                    <span className="text-gray-400 font-medium">
                      {item.label}
                    </span>
                    <span className="text-white font-semibold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-cyan-400/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Residence Options
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Property Types & Floor Plans
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Choose from our limited collection of luxury villas and
              townhouses, each designed with modern coastal architecture and
              premium finishes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {propertyTypes.map((property, i) => {
              const IconComp = property.icon;
              return (
                <motion.div
                  key={property.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all border border-cyan-400/20"
                >
                  <div className="relative z-[-10px] h-64 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                    {property.image && (
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent z-10" />

                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {property.units}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-cyan-400/30">
                          <IconComp className="text-cyan-400 text-xl" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">
                            {property.name}
                          </p>
                          <p className="text-cyan-400 text-sm">
                            {property.size}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {property.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-400"
                        >
                          <FaCheckCircle
                            className="text-cyan-400 mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={openForm}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      Enquire Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 border border-cyan-400/30"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaRuler className="text-3xl text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">
                Property Sizes Overview
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-800 rounded-2xl border border-cyan-400/20">
                <p className="text-3xl font-bold text-cyan-400 mb-1">
                  2,100-3,000
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Townhouses (sq ft)
                </p>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-2xl border border-cyan-400/20">
                <p className="text-3xl font-bold text-cyan-400 mb-1">
                  3,500-6,500+
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Villas (sq ft)
                </p>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-2xl border border-cyan-400/20">
                <p className="text-3xl font-bold text-cyan-400 mb-1">
                  450-1,150
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Apartments (sq ft)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AMENITIES & SMART FEATURES */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 border-t border-cyan-400/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Amenities Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                Community Living
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
                Premium Amenities
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                DAMAC Island 2 offers comprehensive resort-style amenities
                designed for luxury coastal living, from water sports to
                family-friendly facilities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {amenities.map((amenity, i) => {
                  const IconComp = amenity.icon;
                  return (
                    <motion.div
                      key={amenity.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
                    >
                      <IconComp className="text-2xl text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-white mb-1 text-sm">
                        {amenity.title}
                      </h4>
                      <p className="text-xs text-gray-400">{amenity.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Smart Features Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                Technology
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
                Smart Home Features
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every residence is equipped with cutting-edge smart home
                technology for ultimate comfort, security, and energy
                efficiency.
              </p>

              <div className="space-y-4 mb-8">
                {smartFeatures.map((feature, i) => {
                  const IconComp = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <IconComp className="text-xl text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
                <p className="font-semibold mb-2">Sustainable Living</p>
                <p className="text-sm text-white/80">
                  All smart features are designed with energy efficiency in
                  mind, aligning with Dubai&apos;s 2040 Urban Master Plan for
                  sustainable development.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION & CONNECTIVITY */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-cyan-400/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Prime Location
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Location & Connectivity
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Strategically located in Dubai Islands with excellent connectivity
              to key destinations across Dubai, offering the perfect balance of
              tranquil living and urban convenience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {locationHighlights.map((loc, i) => {
              const IconComp = loc.icon;
              return (
                <motion.div
                  key={loc.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{loc.title}</h3>
                      <p className="text-cyan-400 font-semibold text-sm mb-2">
                        {loc.distance}
                      </p>
                      <p className="text-xs text-gray-400">{loc.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Connectivity Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 border border-cyan-400/30"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaRoad className="text-cyan-400" />
              Strategic Connectivity
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              DAMAC Island 2 offers exceptional connectivity through the new
              Dubai Islands bridges to Sheikh Zayed Road, providing fast access
              to Bur Dubai, Deira, Dubai Marina, and Downtown Dubai.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: FaRoad,
                  title: "Corniche Road",
                  desc: "Direct access to waterfront routes",
                },
                {
                  icon: FaCar,
                  title: "Sheikh Zayed Road",
                  desc: "Main highway connectivity",
                },
                {
                  icon: FaPlane,
                  title: "Dubai Airport",
                  desc: "20-25 minute drive",
                },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-slate-700/40 backdrop-blur-sm rounded-2xl p-5 border border-cyan-400/20"
                  >
                    <IconComp className="text-2xl text-cyan-400 mb-3" />
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INVESTMENT BENEFITS */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 border-t border-cyan-400/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Investment Opportunity
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Investment Benefits
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              DAMAC Island 2 represents one of Dubai&apos;s most promising
              investment opportunities, combining waterfront luxury with strong
              growth potential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {investmentBenefits.map((benefit, i) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <IconComp className="text-2xl text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Investment Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-3xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Why Invest in DAMAC Island 2?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Waterfront Premium",
                  value:
                    "Limited lagoon-front villas with high rental potential",
                },
                {
                  label: "Dubai Islands",
                  value: "Prime position in flagship master development",
                },
                {
                  label: "Payment Flexibility",
                  value: "Customized plans for investor convenience",
                },
                {
                  label: "Freehold Security",
                  value: "100% ownership for international buyers",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <p className="font-bold text-white mb-2">{item.label}</p>
                  <p className="text-sm text-white/80">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INVESTMENT ADVANTAGES */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-cyan-400/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Investment Excellence
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Key Investment Advantages
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Discover the compelling advantages that make DAMAC Island 2 an
              exceptional investment opportunity in Dubai&apos;s luxury
              waterfront market.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Pros in elegant cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {prosData.map((pro, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FaCheckCircle className="text-white" size={16} />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{pro}</p>
                </motion.div>
              ))}
            </div>

            {/* Investment Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 text-white text-center"
            >
              <FaTrophy className="text-5xl mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-3">
                Premier Waterfront Investment
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto">
                DAMAC Island 2 combines the prestige of Dubai Islands location,
                limited collection exclusivity, and DAMAC&apos;s proven track
                record to create one of the most attractive luxury real estate
                investments in Dubai&apos;s waterfront market.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <LandingPageGallery
        images={galleryImages}
        title="DAMAC Island 2 Gallery"
        description="Explore the luxury, elegance, and coastal beauty of DAMAC Island 2 in Dubai Islands"
        className="bg-slate-900"
      />

      {/* FAQ SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 border-t border-cyan-400/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Everything you need to know about DAMAC Island 2
            </p>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-xl border border-cyan-400/20 overflow-hidden p-6">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>

            <div className="text-center mt-12 p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Invest in Waterfront Luxury?
              </h3>
              <p className="text-gray-400 mb-6 text-lg max-w-2xl mx-auto">
                Connect with our property specialists for exclusive floor plans,
                pricing details, and personalized investment consultations at
                DAMAC Island 2 in Dubai Islands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={openForm}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <FaEye /> Schedule Consultation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FLOATING CTA */}
      <motion.button
        onClick={openForm}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-3"
      >
        <FaWater /> Get Info
      </motion.button>

      {/* FORM MODAL */}
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      <FaWater className="text-cyan-600" />
                      Discover DAMAC Island 2
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Step {step + 1} of {stepsTotal}
                    </p>
                  </div>
                  <button
                    onClick={closeForm}
                    className="text-slate-400 hover:text-slate-600 text-3xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <div className="w-full bg-cyan-100 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-600 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="min-h-[320px]">
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    ref={honeypotRef}
                    tabIndex="-1"
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px" }}
                    aria-hidden="true"
                  />
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {step === 0 && (
                          <>
                            <label className="block text-slate-700 font-semibold text-lg">
                              What&apos;s your full name?
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => {
                                updateField("name", e.target.value);
                                if (formErrors.name) {
                                  setFormErrors((prev) => ({
                                    ...prev,
                                    name: "",
                                  }));
                                }
                              }}
                              className={`w-full bg-slate-50 border-2 rounded-2xl px-5 py-4 text-slate-800 focus:outline-none transition-colors text-lg ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-slate-200 focus:border-cyan-500"
                              }`}
                              placeholder="Enter your name"
                            />
                            {formErrors.name && (
                              <p className="text-red-500 text-sm mt-2">
                                {formErrors.name}
                              </p>
                            )}
                          </>
                        )}
                        {step === 1 && (
                          <>
                            <label className="block text-slate-700 font-semibold text-lg">
                              What&apos;s your email address?
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                updateField("email", e.target.value);
                                if (formErrors.email) {
                                  setFormErrors((prev) => ({
                                    ...prev,
                                    email: "",
                                  }));
                                }
                              }}
                              className={`w-full bg-slate-50 border-2 rounded-2xl px-5 py-4 text-slate-800 focus:outline-none transition-colors text-lg ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-slate-200 focus:border-cyan-500"
                              }`}
                              placeholder="your@email.com"
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-sm mt-2">
                                {formErrors.email}
                              </p>
                            )}
                          </>
                        )}
                        {step === 2 && (
                          <>
                            <label className="block text-slate-700 font-semibold text-lg">
                              Your mobile number?
                            </label>
                            <CountrySelect
                              styling={`text-black w-full rounded-2xl border-2 transition-all bg-slate-50 px-5 py-4 ${
                                formErrors.phone
                                  ? "border-red-500 focus-within:border-red-600"
                                  : "border-slate-200 focus-within:border-cyan-500"
                              }`}
                              labels={en}
                              flags={flags}
                              value={formData.country}
                              onChange={(country) => {
                                updateField("country", country);
                                if (formErrors.phone) {
                                  setFormErrors((prev) => ({
                                    ...prev,
                                    phone: "",
                                  }));
                                }
                              }}
                              onPhoneChange={(phone) => {
                                updateField("phone", phone);
                                if (formErrors.phone) {
                                  setFormErrors((prev) => ({
                                    ...prev,
                                    phone: "",
                                  }));
                                }
                              }}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm mt-2">
                                {formErrors.phone}
                              </p>
                            )}
                            <p className="text-sm text-slate-500 mt-2">
                              We&apos;ll contact you on this number
                            </p>
                          </>
                        )}
                        {step === 3 && (
                          <>
                            <label className="block text-slate-700 font-semibold text-lg">
                              Which property type interests you?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                "Townhouses",
                                "Villas",
                                "Apartments",
                                "Investment",
                              ].map((type) => (
                                <button
                                  key={type}
                                  onClick={() =>
                                    updateField("propertyType", type)
                                  }
                                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                                    formData.propertyType === type
                                      ? "border-cyan-500 bg-cyan-50 text-cyan-700 shadow-lg"
                                      : "border-slate-200 bg-slate-50 hover:border-cyan-300"
                                  }`}
                                >
                                  <div className="font-semibold text-slate-900">
                                    {type}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-1">
                                    Available now
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                        {step === 4 && (
                          <>
                            <label className="block text-slate-700 font-semibold text-lg">
                              Any specific requirements or questions?
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                              rows={5}
                              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                              placeholder="Budget range, preferred unit type, investment goals..."
                            />
                          </>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                          <FaWater className="text-4xl text-white" />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 mb-4">
                          Thank You, {formData.name}!
                        </h4>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                          Our luxury property specialists will contact you
                          shortly with detailed information about DAMAC Island
                          2, including floor plans, pricing, and exclusive
                          investment opportunities.
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
                    <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                      {step > 0 && (
                        <button
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="px-8 py-3 border-2 border-slate-300 rounded-2xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="ml-auto bg-gradient-to-r from-cyan-600 to-blue-500 text-white px-10 py-3 rounded-2xl font-semibold hover:from-cyan-700 hover:to-blue-600 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : step === stepsTotal - 1 ? (
                          <>
                            <FaStar /> Submit Inquiry
                          </>
                        ) : (
                          <>
                            Next <FaChevronDown className="rotate-[-90deg]" />
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

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 border-t border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-cyan-400" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-cyan-400" />
                  <a
                    href="tel:+971526902884"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="hover:text-cyan-400 transition-colors"
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
                  className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors text-cyan-400 hover:text-slate-900"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors text-cyan-400 hover:text-slate-900"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors text-cyan-400 hover:text-slate-900"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971526902884&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors text-cyan-400 hover:text-slate-900"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-400/20 pt-8 text-center text-gray-400">
            <p>&copy; 2024 H&S Property. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Real Estate Developments in Dubai
            </p>
          </div>
        </div>
      </footer>
      
      <MetaPixel pixelId={pixelId} />
    </main>
  );
}
