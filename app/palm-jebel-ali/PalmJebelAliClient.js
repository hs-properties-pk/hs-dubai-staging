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
  FaCrown,
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
  FaCar,
  FaHammer,
  FaMobileAlt,
  FaHotel,
  FaGraduationCap,
  FaUtensils,
  FaExternalLinkAlt,
  FaSearchLocation,
  FaClock,
  FaMapMarkedAlt,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaLocationDot,
  FaYoutube,
  FaXTwitter,
  FaInfinity,
} from "react-icons/fa6";
import { GiModernCity, GiIsland } from "react-icons/gi";
import { MdOutlineBalcony } from "react-icons/md";
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
    name: "4-Bedroom Villas",
    tag: "Beach Collection - Perfect for families",
    perks: [
      "7,300 – 8,500 sq. ft. spacious layouts",
      "Double-height living areas",
      "Beachfront terrace with private pool",
      "Two-car garage with shaded parking",
      "Open-plan design with seamless indoor-outdoor flow",
    ],
    price: "From AED 18.6M",
    size: "7,300 – 8,500 sq. ft.",
    image: "/off-plan/palm-jebel-ali-by-nakheel/1.webp",
  },
  {
    name: "5-Bedroom Villas",
    tag: "Coral Collection - Elegant entertaining spaces",
    perks: [
      "9,000 – 11,000 sq. ft. expansive layouts",
      "Show kitchen + prep kitchen",
      "Family lounge on upper level",
      "Staff room with separate access",
      "Panoramic sea-facing balconies",
    ],
    price: "From AED 19.6M",
    size: "9,000 – 11,000 sq. ft.",
    image: "/off-plan/palm-jebel-ali-by-nakheel/2.webp",
  },
  {
    name: "6-Bedroom Villas",
    tag: "Flagship Residences - Ultimate luxury",
    perks: [
      "12,000+ sq. ft. grand layouts",
      "Grand foyer with statement staircase",
      "Spa-style primary suite",
      "Lift-ready core for elevator installation",
      "Deep shaded verandas with sea views",
    ],
    price: "From AED 32.8M",
    size: "12,000+ sq. ft.",
    image: "/off-plan/palm-jebel-ali-by-nakheel/3.webp",
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
]
const investTimelineOptions = [
  "This month",
  "Within 3 months",
  "More than 3 months",
];

// Community Statistics
const communityStats = [
  {
    value: "Nakheel",
    label: "Developer",
    description: "Creator of Palm Islands",
  },
  {
    value: "Q4 2028",
    label: "Handover",
    description: "Expected completion",
  },
  {
    value: "Iconic",
    label: "Location",
    description: "Palm Jebel Ali Island",
  },
  {
    value: "4-6 BR",
    label: "Villas",
    description: "Luxury sea-facing homes",
  },
];

// Waterfront Features
const waterfrontFeatures = [
  {
    icon: FaShip,
    title: "Private Fronds",
    description: "Exclusive villa communities on scenic waterfront plots with direct beach access",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Beachfront Living",
    description: "Direct access to pristine private beaches with crystal-clear Arabian Gulf waters",
  },
  {
    icon: FaCompass,
    title: "Panoramic Views",
    description: "360-degree sea views from every villa with floor-to-ceiling glazing",
  },
  {
    icon: FaAnchor,
    title: "Waterfront Promenade",
    description: "Scenic walkways along the fronds with retail and dining options",
  },
];

// Project Highlights
const highlights = [
  {
    icon: GiIsland,
    title: "Iconic Palm Island",
    description: "Nakheel's legendary Palm Islands concept reimagined for luxury waterfront living",
  },
  {
    icon: FaBuilding,
    title: "Nakheel Development",
    description: "Creator of Palm Jumeirah and The World Islands with proven expertise",
  },
  {
    icon: FaChartLine,
    title: "Strong ROI Potential",
    description: "Premium island location ensures exceptional capital appreciation",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Strategic Location",
    description: "Off Jebel Ali coast with direct access to Sheikh Zayed Road",
  },
  {
    icon: FaShieldAlt,
    title: "Golden Visa Eligible",
    description: "Qualify for UAE Golden Visa with eligible property investment",
  },
  {
    icon: FaMobileAlt,
    title: "Smart Home Technology",
    description: "Climate & lighting control via My Nakheel App",
  },
];

// Community Amenities
const communityAmenities = [
  {
    icon: FaSwimmingPool,
    title: "Private Pools",
    description: "Each villa features a private pool and landscaped garden",
    image: "/off-plan/palm-jebel-ali-by-nakheel/4.webp",
  },
  {
    icon: FaDumbbell,
    title: "Fitness Facilities",
    description: "State-of-the-art wellness centers and fitness amenities",
    image: "/off-plan/palm-jebel-ali-by-nakheel/5.webp",
  },
  {
    icon: FaTree,
    title: "Landscaped Gardens",
    description: "Beautifully landscaped parks and green spaces throughout",
    image: "/off-plan/palm-jebel-ali-by-nakheel/6.webp",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Private Beaches",
    description: "Exclusive beach access for residents with pristine sands",
    image: "/off-plan/palm-jebel-ali-by-nakheel/7.webp",
  },
  {
    icon: FaCompass,
    title: "Waterfront Dining",
    description: "Retail malls and waterfront restaurants within the community",
    image: "/off-plan/palm-jebel-ali-by-nakheel/8.webp",
  },
  {
    icon: FaShieldAlt,
    title: "24/7 Security",
    description: "Smart security systems with round-the-clock monitoring",
    image: "/off-plan/palm-jebel-ali-by-nakheel/9.webp",
  },
];

// Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "Island Appreciation",
    description: "Iconic Palm Island location ensures strong long-term capital growth",
  },
  {
    icon: FaBuilding,
    title: "Nakheel Brand Value",
    description: "Developed by Dubai's legendary island creator with proven track record",
  },
  {
    icon: FaCalendar,
    title: "Off-Plan Opportunity",
    description: "Secure units at early prices with flexible payment plans",
  },
  {
    icon: FaUsers,
    title: "High Rental Demand",
    description: "Exceptional demand for beachfront villas on Palm Islands",
  },
  {
    icon: GiIsland,
    title: "Iconic Address",
    description: "Live on one of Dubai's most famous island developments",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Freehold Property",
    description: "Freehold ownership for UAE nationals and international buyers",
  },
];

// Location Features
const locationFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: "Sheikh Zayed Road",
    description: "Direct access",
  },
  {
    icon: FaCompass,
    title: "Al Maktoum Airport",
    description: "25 minutes",
  },
  {
    icon: FaBuilding,
    title: "Dubai Marina",
    description: "20 minutes",
  },
  {
    icon: FaWind,
    title: "Downtown Dubai",
    description: "35 minutes",
  },
];

// FAQ Data
const faqs = [
  {
    q: "What is Palm Jebel Ali?",
    a: "Nakheel's Palm Jebel Ali is a luxury island community bringing back the iconic Palm Islands concept. This development by Nakheel Properties offers premium sea-facing villas, private beaches, and green, walkable neighborhoods in Dubai. Every villa in Palm Jebel Ali provides world-class waterfront living on one of Dubai's most prestigious Palm Islands.",
  },
  {
    q: "Who is the developer?",
    a: "Nakheel Properties, the creator of Palm Jumeirah, The World Islands, and Dubai Islands.",
  },
  {
    q: "What villa types are available?",
    a: "4, 5, and 6-bedroom villas across two collections: Beach Collection and Coral Collection.",
  },
  {
    q: "What are the starting prices?",
    a: "A villa in Palm Jebel Ali starts from AED 18.6M for Beach Collection, AED 19.6M for Coral Collection, with premium beachfront villas from AED 32.8M.",
  },
  {
    q: "What are the villa sizes?",
    a: "Approx. 7,300–8,500 sq ft (4BR), 9,000–11,000 sq ft (5BR), and 12,000+ sq ft (6BR).",
  },
  {
    q: "When is the handover?",
    a: "Expected completion and handover by Q4 2028.",
  },
  {
    q: "Is ownership freehold?",
    a: "Yes, villas are freehold for UAE nationals and international buyers.",
  },
  {
    q: "Is there a payment plan?",
    a: "Yes, flexible payment plans are available with secure payments via the My Nakheel App. Buyers begin with a 20% down payment, followed by 60% across construction, and 20% on handover.",
  },
  {
    q: "What makes the Beach vs. Coral Collections different?",
    a: "Both are luxury. Beach Collection focuses on sleek beachfront minimalism; Coral Collection adds organic, curvilinear design cues inspired by coral forms.",
  },
  {
    q: "Can I get a UAE Golden Visa?",
    a: "Yes, investors who buy property in Palm Jebel Ali may qualify for the Dubai Golden Visa, a long-term residency program providing multiple benefits including the right to live, work, and study in the UAE.",
  },
];

export default function PalmJebelAliLanding({ pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [activeMapTab, setActiveMapTab] = useState("map");
  const honeypotRef = useRef(null);
  const [selectedUnit, setSelectedUnit] = useState(0);

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
    { src: "/off-plan/palm-jebel-ali-by-nakheel/1.webp", width: 800, height: 600, alt: "Palm Jebel Ali villa exterior" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/2.webp", width: 800, height: 600, alt: "Luxury villa interior with sea views" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/3.webp", width: 800, height: 600, alt: "Private pool and garden" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/4.webp", width: 800, height: 600, alt: "Beachfront terrace" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/5.webp", width: 800, height: 600, alt: "Modern kitchen design" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/6.webp", width: 800, height: 600, alt: "Master bedroom suite" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/7.webp", width: 800, height: 600, alt: "Community amenities" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/8.webp", width: 800, height: 600, alt: "Palm Jebel Ali aerial view" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/9.webp", width: 800, height: 600, alt: "Waterfront promenade" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/10.webp", width: 800, height: 600, alt: "Sunset over the Arabian Gulf" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/11.webp", width: 800, height: 600, alt: "Villa architectural details" },
    { src: "/off-plan/palm-jebel-ali-by-nakheel/12.webp", width: 800, height: 600, alt: "Palm Island concept" },
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
        const res = await fetch("/api/send-palm-jebel-ali-contact", {
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
            source: "Palm Jebel Ali Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/palm-jebel-ali/thankyou");
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
        imageSrc="/off-plan/palm-jebel-ali-by-nakheel.jpg"
        imageAlt="Palm Jebel Ali Island"
        badgeText="Nakheel Properties"
        title="Palm Jebel Ali"
        subtitle="Luxury Villas on Dubai's Iconic Palm Island"
        description="Discover Palm Jebel Ali villas by Nakheel. Premium 4-6 bedroom sea-facing villas with private beaches, smart home technology, and flexible payment plans. Freehold ownership from AED 18.6M on one of Dubai's most prestigious Palm Islands."
        ctaText="Explore Villas"
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
                  Nakheel&apos;s Palm Jebel Ali
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Nakheel&apos;s Palm Jebel Ali is one of Dubai&apos;s most famous upcoming destinations. It is a masterpiece of design, luxury, and waterfront living. This exclusive development is set in the Arabian Gulf, bringing back the legendary concept of Palm Islands. Each villa in Palm Jebel Ali offers a calm escape with premium finishes, green landscapes, and world-class amenities.
                  </p>
                  <p>
                    Every home in this iconic Palm Islands development reflects Nakheel Properties vision for the future of luxury living in Dubai. The island features private fronds, beachfront villas, and world-class amenities, offering residents an exclusive waterfront lifestyle with easy access to the rest of Dubai.
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
                        Developer: Nakheel Properties - Creator of Palm Islands
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Project Type: Luxury Sea-Facing Villas
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Collections: Beach Collection & Coral Collection
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Payment Plan: 20% down, 60% during construction, 20% on handover
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
                  Iconic Palm Island Design
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-custom3">
                  Nakheel&apos;s Palm Jebel Ali brings back the legendary Palm Islands concept with an exclusive waterfront community featuring private fronds and beachfront access. Every villa in Palm Jebel Ali offers the grandeur of living on one of Dubai&apos;s most iconic Palm Islands developments.
                </p>
                <p className="text-gray-700 leading-relaxed font-custom3">
                  The sustainable master plan includes green landscapes, waterfront living on the Arabian Gulf, and world-class amenities throughout. This iconic development represents Nakheel&apos;s vision for the future of luxury island living.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/off-plan/palm-jebel-ali-by-nakheel/12.webp"
                  alt="Iconic Palm Island Design"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nakheel – Developer Profile */}
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
              Nakheel Properties – Developer Profile
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
                Nakheel Properties is the creator of Palm Jumeirah, The World Islands, and Dubai Islands. As one of Dubai&apos;s most legendary developers, Nakheel brings unparalleled expertise in island development to Palm Jebel Ali. This iconic project continues Nakheel&apos;s legacy of creating world-class waterfront communities.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-custom3">
                The development follows Nakheel&apos;s focus on innovative design, sustainable master planning, and creating iconic destinations that redefine luxury living. Palm Jebel Ali represents the next chapter in Nakheel&apos;s vision for Dubai&apos;s coastline.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waterfront Lifestyle */}
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
              Island Waterfront Living
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Experience the ultimate Palm Island lifestyle with private beaches, panoramic sea views, and world-class amenities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {waterfrontFeatures.map((feature, index) => (
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
                  Palm Jebel Ali is designed with wellness and relaxation at its core. Enjoy scenic parks, open green spaces, and walkable streets surrounded by lush landscapes for a peaceful and balanced lifestyle on the prestigious Palm Islands.
                </p>
                <p className="text-gray-700 font-custom3">
                  Every villa features high-end imported materials, floor-to-ceiling windows, and sophisticated interiors that blend modern elegance with natural beauty. Smart home integration provides ultimate convenience at your fingertips.
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
                      Ultra-high-net-worth families, investors, island lifestyle seekers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <FaCalendar className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">
                      Handover
                    </h4>
                    <p className="text-gray-600 text-sm font-custom3">
                      Q4 2028 - Phased completion
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
                      Freehold, Golden Visa eligible
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
              Prime Island Location & Connectivity
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Strategically positioned for seamless access to Dubai&apos;s key destinations while offering an exclusive island retreat
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57853.487004959425!2d54.99167205!3d25.00545235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f10f22909222f%3A0xeee8c736a7748d68!2sPalm%20Jebel%20Ali!5e0!3m2!1sen!2s!4v1772257167616!5m2!1sen!2s"
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
                    src="/off-plan/palm-jebel-ali/map.png"
                    alt="Palm Jebel Ali Location Map"
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
                  <span>Direct access to Sheikh Zayed Road (E11) for seamless travel to Dubai and Abu Dhabi</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>25 minutes to Al Maktoum International Airport</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>20 minutes to Dubai Marina and Jebel Ali Village</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>35 minutes to Downtown Dubai via major highways</span>
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
              Choose Your Villa
            </h2>
            <p className="text-gray-700 text-lg max-w-7xl mx-auto leading-relaxed font-custom3">
              Select from our collection of meticulously designed 4, 5, and 6-bedroom villas across Beach Collection and Coral Collection
            </p>
          </motion.div>

          {/* Unit Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {unitTypes.map((u, i) => {
              const active = selectedUnit === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedUnit(i)}
                  className={`px-6 py-3 rounded-full font-bold transition-all font-custom2 ${active
                      ? "bg-black text-white shadow-lg scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  <FaBed className="inline mr-2" />
                  {u.name}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[unitTypes[selectedUnit]].map((unit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-200 md:col-span-2"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <Image
                      src={unit.image}
                      alt={unit.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                        Palm Jebel Ali
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-bold">
                        {unit.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-custom2">
                      {unit.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 font-custom3">
                      {unit.tag} • {unit.size}
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
                      onClick={openForm}
                      className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg font-custom2"
                    >
                      Enquire {unit.name}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plan */}
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
              PAYMENT PLAN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Palm Jebel Ali Villas Payment Plan
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Buyers begin with a 20% down payment, followed by 60% across construction, and 20% on handover.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: "20%", label: "Down Payment", icon: FaHandHoldingUsd },
              { value: "60%", label: "During Construction", icon: FaHammer },
              { value: "20%", label: "On Handover", icon: FaCheckCircle },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-black" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2 font-custom2">
                  {item.value}
                </div>
                <div className="text-gray-600 font-custom3">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Highlights */}
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
              HIGHLIGHTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Features & Amenities
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Experience world-class living with premium facilities and thoughtfully designed spaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <highlight.icon className="text-black text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 font-custom2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 font-custom3">{highlight.desc}</p>
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
              Resort-style facilities designed for wellness, leisure, and island living
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

      {/* Design & Innovation */}
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
              DESIGN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Design & Innovation
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Where architectural excellence meets cutting-edge technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <GiModernCity className="text-black text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-custom2">
                  Architectural Design
                </h3>
              </div>
              <p className="text-gray-700 font-custom3 mb-6">
                Inspired by oceanic forms with modern, elegant lines. Smooth indoor-outdoor transitions and expansive glazing bring in natural light and sea views.
              </p>
              <ul className="space-y-3">
                {[
                  "High-end finishes and imported materials",
                  "Private pools and landscaped gardens",
                  "Spacious balconies with panoramic sea views",
                  "B+G+2 structure with floor-to-ceiling glazing",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheck className="text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-600 font-custom3">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaMobileAlt className="text-black text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-custom2">
                  Smart Home & Services
                </h3>
              </div>
              <p className="text-gray-700 font-custom3 mb-6">
                Control your home seamlessly with integrated smart technology and personalized services at your fingertips.
              </p>
              <ul className="space-y-3">
                {[
                  "Climate & lighting control via My Nakheel App",
                  "Smart security systems with 24/7 monitoring",
                  "Remote access and automation",
                  "Service requests & live interaction options",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheck className="text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-600 font-custom3">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Palm Jebel Ali */}
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
              WHY CHOOSE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Why Choose Palm Jebel Ali
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              <span className="font-semibold text-black">Palm Jebel Ali by Nakheel</span> stands out among Dubai&apos;s island communities for several key reasons:
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
                    Iconic Palm Islands community by Nakheel, creator of Palm Jumeirah
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Private fronds with exclusive beachfront villas
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Stunning sea views from every villa with floor-to-ceiling windows
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Smart home technology with My Nakheel App integration
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Flexible payment plan: 20% down, 60% during construction, 20% on handover
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Golden Visa eligible for qualifying investors
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Benefits */}
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
              INVESTMENT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Investment Benefits
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Why Palm Jebel Ali is a smart real estate investment choice
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
        title="Palm Jebel Ali Gallery"
        description="Experience the luxury of island living at Palm Jebel Ali by Nakheel"
        className="bg-white"
      />

      {/* FAQ Section */}
      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about Palm Jebel Ali"
        faqs={faqs}
        className="bg-white"
      />

      {/* Golden Visa Note */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-gray-700 shadow-sm">
            <p className="font-custom3">
              <strong className="font-custom2 font-bold text-gray-900">Dubai Golden Visa:</strong> Investors who buy property in Palm Jebel Ali may qualify for the Dubai Golden Visa, a long-term residency program from the UAE government. This visa provides several benefits, including the right to live, work, and study in the UAE without a national sponsor. It offers multiple-entry privileges and family sponsorship options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR ISLAND OPPORTUNITY"
        title="Ready to Own Your Dream Villa on Palm Jebel Ali?"
        description="Discover your dream villa in Palm Jebel Ali on the iconic Palm Islands. Get floor plans, payment schedules, and available units in your inbox. Connect with our specialists for exclusive insights on this legendary island development."
        ctaText="Request Exclusive Villa Details"
        footnote="Beach & Coral Collections • Flexible payment plans • Freehold ownership • Golden Visa eligible"
      />

      {/* Footer */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  PALM JEBEL ALI
                </span>
              </div>
              <p className="text-gray-400">
                Luxury villas on Dubai&apos;s iconic Palm Island by Nakheel Properties. Experience the legendary Palm Islands lifestyle with private beaches and world-class amenities.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Palm Jebel Ali Project
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Villas Available
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
            <p>&copy; {new Date().getFullYear()} H&S Property. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Island Real Estate in Dubai | Palm Jebel Ali by Nakheel
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
                      Palm Jebel Ali Inquiry
                    </h3>
                    <p className="text-gray-300 font-custom3">
                      Get details about luxury island villas
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
                        Your Palm Jebel Ali inquiry has been received. Our luxury villa specialists will contact you within 24 hours with exclusive property details and island living information.
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