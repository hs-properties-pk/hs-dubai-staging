"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MetaPixel from "@/components/MetaPixel";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaBed,
  FaRulerCombined,
  FaCheck,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaChartLine,
  FaHandHoldingUsd,
  FaAnchor,
  FaUmbrellaBeach,
  FaWater,
  FaShip,
  FaCompass,
  FaWind,
  FaLeaf,
  FaBuilding,
  FaUsers,
  FaCalendar,
  FaStar,
  FaChevronRight,
  FaChevronDown,
  FaPlayCircle,
  FaHorseHead,
  FaTree,
  FaHome,
  FaSwimmingPool,
  FaDumbbell,
  FaShieldAlt,
  FaCity,
  FaPlane,
  FaKey,
  FaCheckCircle,
  FaEye,
  FaRoad,
  FaSchool,
  FaShoppingBag,
  FaCar,
  FaHeart,
  FaHorse,
  FaParking,
  FaMountain,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaLocationDot,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import LandingPageGallery from "@/components/LandingPageGallery";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import LandingFaqs from "@/components/LandingFaqs";
import LandingCta from "@/components/LandingCta";
import LandingHero from "@/components/LandingHero";

// Property Types
const unitTypes = [
  {
    name: "3-5 Bedroom Villas",
    tag: "Luxury configurations with polo field views",
    perks: [
      "Private gardens",
      "Spacious layouts",
      "Premium finishes",
      "Polo field views",
    ],
    image: "/grand-polo-club/24.png",
  },
  {
    name: "Townhouses",
    tag: "Modern living spaces in Equestra cluster",
    perks: [
      "Green space access",
      "Modern architecture",
      "Community amenities",
      "Family-friendly",
    ],
    image: "/grand-polo-club/11.png",
  },
  {
    name: "Premium Villas",
    tag: "Ultra-luxury residences with exclusive access",
    perks: [
      "Larger plots",
      "Premium views",
      "Custom finishes",
      "Exclusive access",
    ],
    image: "/grand-polo-club/12.png",
  },
];

const userTypeOptions = [
  "Home buyer",
  "Investor",
  "Real estate agent",
];

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

// Community Statistics
const communityStats = [
  {
    value: "70%",
    label: "Green Coverage",
    description: "Extensive landscaped areas",
  },
  { value: "24/7", label: "Security", description: "Gated community" },
  {
    value: "Professional",
    label: "Polo Fields",
    description: "Equestrian facilities",
  },
  {
    value: "Resort-style",
    label: "Amenities",
    description: "World-class facilities",
  },
];

// Equestrian Features
const equestrianFeatures = [
  {
    icon: FaHorseHead,
    title: "Polo Fields",
    description: "Large grass fields for sporting and community events, forming the sporting heart of the community",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Resort Pools",
    description: "Multiple swimming pools with resort-style facilities for relaxation and recreation",
  },
  {
    icon: FaTree,
    title: "Green Parks",
    description: "Extensive landscaped gardens and walking trails throughout the community",
  },
  {
    icon: FaCompass,
    title: "Equestrian Club",
    description: "Clubhouse with viewing points over fields and equestrian facilities",
  },
];

// Neighborhood Clusters
const clusters = [
  {
    name: "Equestra",
    description: "Townhouses integrated with linear parks and open spaces",
    icon: FaTree,
    features: ["Townhouses", "Linear parks", "Green corridors", "Family-focused"],
    image: "/grand-polo-club/13.png",
  },
  {
    name: "Chevalia",
    description: "Villas with premium finishes and polo field proximity",
    icon: FaHorse,
    features: ["Premium villas", "Field views", "Private gardens", "Exclusive"],
    image: "/grand-polo-club/19.png",
  },
  {
    name: "Selvara",
    description: "Nature-inspired residences with forest-style walks",
    icon: FaLeaf,
    features: ["Nature walks", "Green spaces", "Wellness focus", "Tranquil"],
    image: "/grand-polo-club/16.png",
  },
];

// Community Amenities
const communityAmenities = [
  {
    icon: FaSwimmingPool,
    title: "Swimming Pools",
    description: "Multiple resort-style pools for relaxation and recreation",
    image: "/grand-polo-club/4.png",
  },
  {
    icon: FaDumbbell,
    title: "Fitness Center",
    description: "State-of-the-art gym and wellness facilities",
    image: "/grand-polo-club/7.png",
  },
  {
    icon: FaTree,
    title: "Green Parks",
    description: "Extensive landscaped gardens and walking trails",
    image: "/grand-polo-club/6.png",
  },
  {
    icon: FaShoppingBag,
    title: "Clubhouse",
    description: "Social hub with viewing areas and dining options",
    image: "/grand-polo-club/5.png",
  },
  {
    icon: FaHorseHead,
    title: "Equestrian Club",
    description: "Central polo fields and stables form the sporting heart",
    image: "/grand-polo-club/2.png",
  },
  {
    icon: FaShieldAlt,
    title: "24/7 Security",
    description: "Gated community with comprehensive security",
    image: "/grand-polo-club/8.png",
  },
];

// Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "Capital Growth",
    description: "Premium equestrian-themed community with strong appreciation potential",
  },
  {
    icon: FaBuilding,
    title: "Emaar Brand",
    description: "Developed by Dubai's most trusted real estate developer",
  },
  {
    icon: FaCalendar,
    title: "Off-Plan Opportunities",
    description: "Flexible payment plans with phased development",
  },
  {
    icon: FaUsers,
    title: "Rental Demand",
    description: "High demand for luxury villa communities",
  },
  {
    icon: FaLeaf,
    title: "Green Living",
    description: "Nature-focused sustainable community appeal",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Freehold Property",
    description: "Available to all nationalities with freehold ownership",
  },
];

// Location Features
const locationFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: "Expo City Dubai",
    description: "10 minutes drive",
  },
  {
    icon: FaCompass,
    title: "Al Maktoum Airport",
    description: "15 minutes drive",
  },
  {
    icon: FaBuilding,
    title: "Dubai Investments Park",
    description: "Adjacent",
  },
  {
    icon: FaWind,
    title: "Emirates Road",
    description: "Direct access",
  },
];

// FAQ Data
const faqs = [
  {
    q: "What is Grand Polo Club & Resort by Emaar?",
    a: "Grand Polo Club & Resort by Emaar is a large equestrian-themed residential community in Dubai, featuring villas, townhouses, polo fields, a clubhouse and resort-style amenities within a gated master plan.",
  },
  {
    q: "Where is Grand Polo Club and Resort Dubai located?",
    a: "The community is located in the Dubai Investments Park area, near the junction of Expo Road (E77) and Emirates Road (E611), with good connectivity to Expo City Dubai, Al Maktoum International Airport and other key destinations.",
  },
  {
    q: "What types of homes are available in Grand Polo by Emaar?",
    a: "The project offers mainly 3–5 bedroom villas and townhouses, with different clusters providing varied layouts, plot sizes and orientations. Some higher-spec villas are positioned closer to the polo fields or key landscaped areas.",
  },
  {
    q: "Is Grand Polo Club & Resort an off-plan project?",
    a: "Yes. Grand Polo Club & Resort is currently being developed in phases as an off-plan master community, making it part of the wider off plan project in UAE market. Specific launch phases may have different timelines and conditions.",
  },
  {
    q: "Who is the developer behind Emaar Grand Polo community?",
    a: "The community is developed by Emaar Properties, a leading real estate company in Dubai known for projects such as Downtown Dubai, Dubai Marina, Arabian Ranches and Dubai Hills Estate.",
  },
  {
    q: "What kind of lifestyle does Grand Polo Club & Resort offer?",
    a: "Residents can expect a low-density, green and resort-style lifestyle focused on outdoor activities, privacy and equestrian-inspired amenities, rather than a dense high-rise or city-centre environment.",
  },
];

export default function GrandPoloClubLanding({ pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [activeMapTab, setActiveMapTab] = useState("map");
  const honeypotRef = useRef(null);

  const stepsTotal = 4;
  const progress = ((step + 1) / stepsTotal) * 100;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    userType: "",
    budget: "",
    investTimeline: "",
  });

  const galleryImages = [
    { src: "/grand-polo-club/1.png", width: 800, height: 600, alt: "Grand Polo Club aerial view" },
    { src: "/grand-polo-club/2.png", width: 800, height: 600, alt: "Crystal lagoon and beach area" },
    { src: "/grand-polo-club/3.png", width: 800, height: 600, alt: "Modern coastal villas" },
    { src: "/grand-polo-club/4.png", width: 800, height: 600, alt: "Townhouse community layout" },
    { src: "/grand-polo-club/5.png", width: 800, height: 600, alt: "Marina and water sports facilities" },
    { src: "/grand-polo-club/6.png", width: 800, height: 600, alt: "Community amenities and parks" },
    { src: "/grand-polo-club/7.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/8.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/9.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/10.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/11.png", width: 800, height: 600, alt: "Townhouse exteriors" },
    { src: "/grand-polo-club/12.png", width: 800, height: 600, alt: "Premium villas" },
    { src: "/grand-polo-club/13.png", width: 800, height: 600, alt: "Equestra cluster" },
    { src: "/grand-polo-club/14.png", width: 800, height: 600, alt: "Community views" },
    { src: "/grand-polo-club/15.png", width: 800, height: 600, alt: "Landscaped gardens" },
    { src: "/grand-polo-club/16.png", width: 800, height: 600, alt: "Selvara nature walks" },
    { src: "/grand-polo-club/17.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/18.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/19.png", width: 800, height: 600, alt: "Chevalia villas" },
    { src: "/grand-polo-club/20.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/21.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/22.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/23.png", width: 800, height: 600, alt: "Community amenities" },
    { src: "/grand-polo-club/24.png", width: 800, height: 600, alt: "Luxury villas" },
  ];

  // Validation functions
  const validateStep = (currentStep) => {
    const errors = {};

    switch (currentStep) {
      case 0:
        if (!formData.userType.trim()) {
          errors.userType = "Please select an option";
        }
        break;
      case 1:
        if (!formData.budget.trim()) {
          errors.budget = "Please select a budget range";
        }
        break;
      case 2:
        if (!formData.investTimeline.trim()) {
          errors.investTimeline = "Please select an option";
        }
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

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: "" }));
    }
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
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-grand-polo-club-contact", {
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
            source: "Grand Polo Club Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/grand-polo-club/thankyou");
        } else {
          const errorData = await res.json();
          console.error("Submission error:", errorData);
          setIsSubmitting(false);
          setFormErrors({
            submit: errorData.message || "Failed to submit form. Please try again.",
          });
        }
      } catch (error) {
        console.error("Submission error:", error);
        setIsSubmitting(false);
        setFormErrors({
          submit: "Network error. Please check your connection and try again.",
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setFormErrors({});
    }
  };

  const openForm = () => {
    setIsFormOpen(true);
    setSubmitted(false);
    setStep(0);
    setFormErrors({});
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style jsx>{`
        .font-custom {
          font-family: TenorSans, sans-serif;
        }
        .font-custom2 {
          font-family: Urbanist, sans-serif;
        }
        .font-custom3 {
          font-family: Satoshi, sans-serif;
        }
      `}</style>

      {/* Clean Hero Section */}
      <LandingHero
        imageSrc="/grand-polo-club/1.png"
        imageAlt="Grand Polo Club & Resort"
        badgeText="Emaar Properties"
        title="Grand Polo Club & Resort"
        subtitle="Where equestrian heritage meets modern luxury living"
        description="Experience Dubai's premier polo-inspired residential community. Grand Polo Club & Resort by Emaar combines equestrian heritage with modern architecture in a low-density, nature-focused neighbourhood."
        ctaText="Explore Properties"
        onCtaClick={openForm}
        showScrollIndicator
      />

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="text-black font-bold tracking-widest mb-4 uppercase text-sm font-custom2">
                  OVERVIEW
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
                  Equestrian Heritage Meets Modern Luxury
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Grand Polo Club & Resort by Emaar is a modern tribute to polo and horse riding life. The Emaar Grand Polo community combines equestrian heritage with modern architecture, showing how a major real estate company in dubai can turn a niche lifestyle idea into a full real estate development.
                  </p>
                  <p>
                    The community is designed as a low-density, nature-focused neighbourhood with active sporting estate and residential harmony. Gated clusters with internal parks and amenities create a private, resort-style living environment.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gray-50 rounded-3xl p-10 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 font-custom">
                  Community Highlights
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  {communityStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden"
                    >
                      <div className="text-center p-6 bg-white hover:bg-gray-100 rounded-2xl transition-all duration-300 border border-gray-200 shadow-sm">
                        <div className="text-3xl font-bold mb-2 text-gray-900 font-custom2">
                          {stat.value}
                        </div>
                        <div className="text-sm font-semibold mb-1.5 text-gray-900 font-custom3">
                          {stat.label}
                        </div>
                        <div className="text-xs text-gray-600 font-custom3">
                          {stat.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300">
                  <h4 className="text-lg font-bold mb-4 text-gray-900 font-custom2">
                    Quick Facts
                  </h4>
                  <ul className="space-y-3 text-sm font-custom3">
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Low-density, nature-focused neighbourhood
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Active sporting estate with residential harmony
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Wellness, privacy and resort-style facilities
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Gated clusters with internal parks and amenities
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl mt-10 p-10 shadow-lg border border-gray-200"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-custom">
                  Equestrian-Inspired Design
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-custom3">
                  Central polo fields, stables and clubhouse form the sporting heart of the community. The design integrates equestrian facilities seamlessly with residential areas, creating a unique lifestyle experience.
                </p>
                <p className="text-gray-700 leading-relaxed font-custom3">
                  Green corridors connect neighbourhoods, while the clubhouse offers viewing points over the fields. This integration of sport and living makes Grand Polo Club & Resort truly distinctive among Dubai&apos;s luxury communities.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/grand-polo-club/3.png"
                  alt="Equestrian-inspired design"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emaar – Developer Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              DEVELOPER
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Emaar Properties – Developer Profile
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
              <p className="text-lg leading-relaxed text-gray-700 font-custom3 mb-6">
                The community is developed by Emaar Properties, a leading real estate company in Dubai known for projects such as Downtown Dubai, Dubai Marina, Arabian Ranches and Dubai Hills Estate. Emaar brings its expertise in master-planned communities to Grand Polo Club & Resort.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-custom3">
                The development follows Emaar&apos;s focus on quality construction, well-planned public spaces, and sustainable long-term value, adding confidence for buyers considering Grand Polo Club & Resort.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equestrian Lifestyle */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              LIFESTYLE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Equestrian & Resort Lifestyle
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Residents can expect a low-density, green and resort-style lifestyle focused on outdoor activities, privacy and equestrian-inspired amenities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equestrianFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="text-black text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-custom2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-custom3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-custom">
              Everyday Living: Residents, Lifestyle & Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4 font-custom3">
                  The community offers a unique blend of sporting facilities and residential comfort. Central polo fields and the equestrian club provide active recreation, while extensive parks and walking trails offer peaceful retreats.
                </p>
                <p className="text-gray-700 font-custom3">
                  Gated clusters ensure privacy and security, with internal parks and amenities serving each neighbourhood. The resort-style facilities create a vacation-like atmosphere year-round.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <FaUsers className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">
                      Target Residents
                    </h4>
                    <p className="text-gray-600 text-sm font-custom3">
                      Families, equestrian enthusiasts, luxury home seekers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <FaCalendar className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">
                      Development Phase
                    </h4>
                    <p className="text-gray-600 text-sm font-custom3">
                      Multi-phase off-plan development
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <FaChartLine className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">
                      Investment Type
                    </h4>
                    <p className="text-gray-600 text-sm font-custom3">
                      Freehold, off-plan opportunities available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Connectivity */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              LOCATION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Strategic Location & Connectivity
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The Emaar Grand Polo community is perfectly positioned within Dubai Investments Park area with excellent access to major routes and key destinations.
            </p>
          </motion.div>

          {/* Location Map with Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-6xl mx-auto"
          >
            <div className="flex gap-4 mb-4 justify-center">
              <button
                onClick={() => setActiveMapTab("map")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-custom2 ${activeMapTab === "map"
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Map
              </button>
              <button
                onClick={() => setActiveMapTab("visuals")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-custom2 ${activeMapTab === "visuals"
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Visuals
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeMapTab === "map" ? (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14467.119522923302!2d55.20950857833818!3d24.9736027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f730021d4dc01%3A0xf5a2e447365938cc!2sGrand%20Polo%20Club%20%26%20Resort!5e0!3m2!1sen!2s!4v1772188812672!5m2!1sen!2s"
                    width="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full lg:h-[600px] md:h-[400px] h-[250px]"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="visuals"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                >
                  <Image
                    src="https://manage.tanamiproperties.com/Project/Location_Map/2616/Thumb/2616.webp"
                    alt="Grand Polo Club Location Map"
                    width={1400}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="mb-10 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-custom2">
                Key Connections:
              </h3>
              <ul className="space-y-3 text-gray-700 font-custom3">
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Near Expo Road (E77) and Emirates Road (E611) junction</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Excellent connectivity to Expo City Dubai and Al Maktoum Airport</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Adjacent to Dubai Investments Park with shopping and dining</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>25 minutes to Downtown Dubai via major highways</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {locationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-2xl text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 font-custom2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-custom3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              PROPERTIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Signature Residences
            </h2>
            <p className="text-gray-700 text-lg max-w-7xl mx-auto leading-relaxed font-custom3">
              Discover luxury villas and townhouses at Grand Polo Club and Resort Dubai designed for the ultimate equestrian lifestyle and real estate investment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unitTypes.map((unit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-200"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={unit.image}
                    alt={unit.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                      Grand Polo
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-custom2">
                    {unit.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 font-custom3">
                    {unit.tag}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {unit.perks.map((perk, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700 font-custom3"
                      >
                        <FaCheck className="text-black mt-1 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      updateField("propertyType", unit.name);
                      openForm();
                    }}
                    className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg font-custom2"
                  >
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Plan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              MASTER PLAN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Master Plan & Neighborhood Clusters
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Distinct residential clusters offering varied lifestyles within the community, each with its own character and appeal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clusters.map((cluster, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={cluster.image}
                  alt={cluster.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <cluster.icon className="text-white" />
                    <h3 className="text-2xl font-bold font-custom">
                      {cluster.name}
                    </h3>
                  </div>
                  <p className="text-gray-200 font-custom3 mb-3">
                    {cluster.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cluster.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white font-custom3"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Amenities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              AMENITIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              World-Class Amenities
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Resort-style facilities designed for wellness, sport, and community living within this exclusive equestrian community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityAmenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-custom">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-200 font-custom3">
                    {amenity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Grand Polo Club */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              WHY CHOOSE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Why Choose Grand Polo Club & Resort
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              <span className="font-semibold text-black">Grand Polo Club & Resort by Emaar</span> stands out among Dubai&apos;s luxury communities for several key reasons:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Unique equestrian-themed community with active sporting estate
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Low-density, nature-focused neighbourhood with extensive green spaces
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Resort-style amenities with polo fields, pools and clubhouse
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Strategic location near Expo City and Al Maktoum Airport
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Backed by Emaar&apos;s trusted reputation in master-planned communities
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              INVESTMENT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Investment Benefits
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Why Emaar Grand Polo Club & Resort is a smart real estate investment choice
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <benefit.icon className="text-black text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 font-custom2">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-custom3">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <LandingPageGallery
        images={galleryImages}
        title="Lifestyle Gallery"
        description="Experience Grand Polo Club & Resort through our visual journey"
        className="bg-white"
      />

      {/* FAQ Section */}
      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about Grand Polo Club & Resort"
        faqs={faqs}
        className="bg-white"
      />

      {/* CTA Section */}
      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR EQUESTRIAN OPPORTUNITY"
        title="Ready for Equestrian Luxury Living?"
        description="Connect with our property specialists for exclusive insights on Grand Polo Club & Resort. Discover available properties, off-plan opportunities, and investment potential in this unique equestrian community."
        ctaText="Request Exclusive Property Details"
        footnote="Luxury villas & townhouses • Flexible off-plan payment plans • Equestrian lifestyle"
      />

      {/* Footer */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  GRAND POLO CLUB
                </span>
              </div>
              <p className="text-gray-400">
                Where equestrian heritage meets modern luxury living. Dubai&apos;s premier polo-inspired residential community by Emaar Properties.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Grand Polo Club Project
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Properties Available
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Master Plan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Payment Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Virtual Tour
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Contact Information
              </h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-white" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-white transition-colors"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-white" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-white transition-colors"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-white" />
                  <span>
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:text-gray-500 transition-all"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:text-gray-500 transition-all"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:text-gray-500 transition-all"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:text-gray-500 transition-all"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center hover:text-gray-500 transition-all"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2026 H&S Property. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Luxury Real Estate in Dubai | Grand Polo Club & Resort by Emaar
            </p>
          </div>
        </div>
      </footer>

      {/* Form Popup */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header */}
              <div className="bg-black p-8 rounded-t-3xl overflow-hidden">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-custom">
                      Grand Polo Club Inquiry
                    </h3>
                    <p className="text-gray-300 font-custom3">
                      Get details about luxury equestrian properties
                    </p>
                  </div>
                  <button
                    onClick={closeForm}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 overflow-visible relative z-10">
                <div className="mb-8">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center font-custom3">
                    Step {step + 1} of {stepsTotal}
                  </p>
                </div>

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
                        <div>
                          <h4 className="text-xl font-semibold mb-4 text-gray-900 font-custom2">
                            Are you a:
                          </h4>
                          <div className="grid gap-3">
                            {userTypeOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField("userType", opt)}
                                className={`p-4 text-left rounded-xl border-2 transition-all font-custom3 ${formData.userType === opt
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formErrors.userType && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.userType}</p>
                          )}
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <h4 className="text-xl font-semibold mb-4 text-gray-900 font-custom2">
                            What is your budget range?
                          </h4>
                          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
                            {budgetOptions.map((budget) => (
                              <button
                                key={budget}
                                type="button"
                                onClick={() => updateField("budget", budget)}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all font-custom3 ${formData.budget === budget
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                  }`}
                              >
                                {budget}
                              </button>
                            ))}
                          </div>
                          {formErrors.budget && (
                            <p className="text-red-500 text-sm mt-2">
                              {formErrors.budget}
                            </p>
                          )}
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h4 className="text-xl font-semibold mb-4 text-gray-900 font-custom2">
                            How soon are you planning to invest?
                          </h4>
                          <div className="grid gap-3">
                            {investTimelineOptions.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => updateField("investTimeline", opt)}
                                className={`p-4 text-left rounded-xl border-2 transition-all font-custom3 ${formData.investTimeline === opt
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {formErrors.investTimeline && (
                            <p className="text-red-500 text-sm mt-2">
                              {formErrors.investTimeline}
                            </p>
                          )}
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xl font-semibold mb-4 text-gray-900 font-custom2">
                              Your details
                            </h4>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-custom2">
                              Full name
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => updateField("name", e.target.value)}
                              placeholder="Enter your full name"
                              className={`w-full p-4 bg-gray-50 border rounded-xl focus:outline-none focus:border-black text-lg font-custom3 ${formErrors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formErrors.name && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-custom2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="Enter your email address"
                              className={`w-full p-4 bg-gray-50 border rounded-xl focus:outline-none focus:border-black text-lg font-custom3 ${formErrors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 font-custom2">
                              Phone number
                            </label>
                            <CountrySelect
                              styling={`w-full rounded-xl border-2 transition-all bg-gray-50 px-4 py-3 ${formErrors.phone
                                  ? "border-red-500 focus-within:border-red-600"
                                  : "border-gray-300 focus-within:border-black"
                                }`}
                              labels={en}
                              flags={flags}
                              value={formData.country}
                              onChange={(country) => updateField("country", country)}
                              onPhoneChange={(phone) => updateField("phone", phone)}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm mt-2">{formErrors.phone}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-8">
                        {step > 0 && (
                          <button
                            onClick={handleBack}
                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all font-custom2"
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          disabled={isSubmitting}
                          className={`ml-auto px-8 py-3 bg-black text-white rounded-full transition-all font-custom2 ${isSubmitting
                              ? "opacity-70 cursor-not-allowed"
                              : "hover:bg-gray-900"
                            }`}
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : step === stepsTotal - 1
                              ? "Submit Inquiry"
                              : "Continue"}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheck className="text-white text-3xl" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4 font-custom">
                        Thank You, {formData.name}!
                      </h4>
                      <p className="text-gray-600 mb-8 font-custom3">
                        Your Grand Polo Club inquiry has been received. Our luxury property specialists will contact you within 24 hours with exclusive details.
                      </p>
                      <button
                        onClick={closeForm}
                        className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-custom2"
                      >
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