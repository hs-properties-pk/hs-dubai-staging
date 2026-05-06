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
  FaDumbbell,
  FaSpa,
  FaWifi,
  FaParking,
  FaShieldAlt,
  FaChartLine,
  FaMoneyBillWave,
  FaCreditCard,
  FaPassport,
  FaGlobe,
  FaCar,
  FaShoppingBag,
  FaUmbrellaBeach,
  FaPlane,
  FaSubway,
  FaRoad,
  FaCity,
  FaLightbulb,
  FaHeartbeat,
  FaLeaf,
  FaBriefcase,
  FaKey,
  FaHandHoldingUsd,
  FaTrophy,
  FaGem,
  FaCrown,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaDownload,
  FaCalendar,
  FaRuler,
  FaCouch,
  FaBed,
  FaHelicopter,
  FaWater,
  FaTree,
  FaYinYang,
  FaDoorOpen,
} from "react-icons/fa";

const apartmentTypes = [
  {
    name: "Studio Apartments",
    size: "Starting from 500 sq. ft.",
    icon: FaCouch,
    image: "/shahrukhz_by_danube/9.webp",
    features: [
      "Smart layouts",
      "Modern finishes",
      "Lake views",
      "Ideal for investors",
    ],
    units: "Multiple units available",
  },
  {
    name: "One Bedroom Apartments",
    size: "Starting from 700 sq. ft.",
    icon: FaBed,
    image: "/shahrukhz_by_danube/8.webp",
    features: [
      "Spacious living area",
      "Smart home tech",
      "Waterfront views",
      "Perfect for couples",
    ],
    units: "Multiple units available",
  },
  {
    name: "Two Bedroom Apartments",
    size: "Starting from 1,200 sq. ft.",
    icon: FaHome,
    image: "/shahrukhz_by_danube/14.webp",
    features: [
      "Family-sized living",
      "Premium finishes",
      "Panoramic views",
      "Flexible layouts",
    ],
    units: "Multiple units available",
  },
];

const wellnessAmenities = [
  {
    icon: FaSwimmingPool,
    title: "Luxurious Sky Pool",
    desc: "Rooftop infinity pool with breathtaking views",
  },
  {
    icon: FaSpa,
    title: "Japanese Onsen Baths",
    desc: "Traditional thermal wellness experience",
  },
  {
    icon: FaDumbbell,
    title: "Modern Fitness Center",
    desc: "State-of-the-art gym equipment",
  },
  {
    icon: FaYinYang,
    title: "Yoga & Meditation Spaces",
    desc: "Dedicated wellness zones for mindfulness",
  },
  {
    icon: FaTree,
    title: "Tranquility Garden",
    desc: "Peaceful outdoor relaxation areas",
  },
  {
    icon: FaHeartbeat,
    title: "Wellness-Centric Design",
    desc: "Health-focused living infrastructure",
  },
];

const smartFeatures = [
  {
    icon: FaLightbulb,
    title: "Smart Lighting",
    desc: "App-controlled illumination",
  },
  {
    icon: FaWifi,
    title: "Integrated Technology",
    desc: "Smart home automation",
  },
  {
    icon: FaShieldAlt,
    title: "Security Systems",
    desc: "24/7 monitoring & access control",
  },
  {
    icon: FaDoorOpen,
    title: "Temperature Control",
    desc: "Climate management systems",
  },
];

const locationHighlights = [
  {
    icon: FaUmbrellaBeach,
    title: "Palm Jumeirah",
    distance: "5 minutes",
    desc: "Luxury island resort destination",
  },
  {
    icon: FaCity,
    title: "Dubai Marina",
    distance: "3 minutes",
    desc: "Vibrant waterfront district",
  },
  {
    icon: FaShoppingBag,
    title: "Mall of the Emirates",
    distance: "10 minutes",
    desc: "Premium shopping & dining",
  },
  {
    icon: FaBuilding,
    title: "Jumeirah Lake Towers",
    distance: "8 minutes",
    desc: "Business & commercial hub",
  },
  {
    icon: FaPlane,
    title: "Dubai Int'l Airport",
    distance: "30 minutes",
    desc: "Global connectivity",
  },
  {
    icon: FaSubway,
    title: "DMCC Metro Station",
    distance: "Nearby",
    desc: "Public transport access",
  },
];

const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "High Returns",
    desc: "Premium location ensures strong ROI potential",
  },
  {
    icon: FaHandHoldingUsd,
    title: "70/30 Payment Plan",
    desc: "Flexible post-handover structure",
  },
  {
    icon: FaKey,
    title: "Freehold Ownership",
    desc: "Complete ownership for international buyers",
  },
  {
    icon: FaPassport,
    title: "Visa Eligibility",
    desc: "Qualifying investments for UAE residency",
  },
  {
    icon: FaTrophy,
    title: "Danube Reputation",
    desc: "Trusted developer with proven track record",
  },
  {
    icon: FaGem,
    title: "SRK Brand Value",
    desc: "Celebrity endorsement adds prestige",
  },
];

const prosConsData = {
  pros: [
    "High potential returns in premium Al Sufouh location",
    "Prime waterfront living with stunning panoramic views",
    "Modern wellness-centric amenities including sky pool and onsen",
    "Strong developer reputation (Danube Properties)",
    "Celebrity brand association with Shah Rukh Khan",
    "Flexible 70/30 post-handover payment plan",
    "Freehold ownership for international investors",
    "Smart home technology and contemporary finishes",
    "Close proximity to Dubai Marina and Palm Jumeirah",
    "Mixed-use development with residential and commercial units",
  ],
  cons: [
    "High initial investment starting from AED 2,100,000",
    "Real estate market volatility and economic uncertainties",
    "Ongoing maintenance and service charges",
    "Property liquidity concerns compared to other investments",
    "Regulatory risks and potential policy changes",
    "Construction completion timeline extends to 2028-2029",
    "Competitive luxury real estate market in Dubai",
    "Service charges for high-rise premium amenities",
  ],
};

const faqData = [
  {
    question: "What is Shahrukhz by Danube Tower?",
    answer:
      "Shahrukhz by Danube Tower is a luxury residential development in Al Sufouh, Dubai, created by Danube Properties in collaboration with Bollywood superstar Shah Rukh Khan. This 55-storey architectural gem features high-end apartments and modern office spaces, offering residents a combination of luxury living, waterfront views, and wellness amenities.",
  },
  {
    question: "What types of properties are available at Shahrukhz Tower?",
    answer:
      "Shahrukhz by Danube Tower offers a range of luxury apartments including studio apartments (starting from 500 sq. ft.), one-bedroom apartments (starting from 700 sq. ft.), and two-bedroom apartments (starting from 1,200 sq. ft.). All units feature modern finishes, flexible layouts, and smart home technology. Commercial office units are also available for business owners.",
  },
  {
    question: "What is the price range for apartments in Shahrukhz Tower?",
    answer:
      "Apartments in Shahrukhz Tower start from AED 2,100,000. The final price varies based on unit type, size, and location within the tower, with premium lake-facing apartments commanding higher prices due to their breathtaking views.",
  },
  {
    question: "What amenities are offered at Shahrukhz by Danube Tower?",
    answer:
      "Shahrukhz Tower provides extensive luxury amenities including waterfront living with stunning views, wellness facilities (Japanese onsen baths, yoga spaces, modern gym), luxurious sky pool, breathtaking rooftop helipad, concierge services, ample parking, 24-hour security, smart home features, and a tranquility garden for relaxation.",
  },
  {
    question: "What is the expected completion date for Shahrukhz Tower?",
    answer:
      "The expected completion date for Shahrukhz by Danube Tower is between Q4 2028 and Q4 2029. The project is currently under construction with bookings now open for registration.",
  },
  {
    question: "What is the payment plan for Shahrukhz Tower?",
    answer:
      "Shahrukhz by Danube Tower offers an affordable 70/30 post-handover payment plan. This means 70% is payable during construction, and the remaining 30% is due upon handover. Additionally, there is a 4% government fee (Dubai Land Department) applicable to the purchase.",
  },
  {
    question: "Is Shahrukhz by Danube Tower freehold?",
    answer:
      "Yes, Shahrukhz by Danube Tower offers freehold ownership, making it accessible to both UAE residents and international buyers. This provides a secure long-term investment opportunity in Dubai's luxury real estate market.",
  },
  {
    question: "How is Shahrukhz Tower connected to the rest of Dubai?",
    answer:
      "Shahrukhz Tower is strategically located in Al Sufouh with excellent connectivity. It offers direct access to Sheikh Zayed Road, proximity to DMCC Metro Station, and is just a short drive from Dubai Marina, Palm Jumeirah, Mall of the Emirates, and Dubai International Airport (30 minutes).",
  },
  {
    question: "What are the investment benefits of Shahrukhz Tower?",
    answer:
      "Key investment benefits include freehold ownership for international buyers, waterfront apartments with strong capital appreciation potential, prime Al Sufouh location near iconic landmarks, flexible 70/30 payment plan, celebrity brand association with SRK, and Danube Properties' proven development track record.",
  },
  {
    question: "Can I use apartments at Shahrukhz Tower for business purposes?",
    answer:
      "Yes, Shahrukhz Tower is a mixed-use development offering both residential apartments and elegant office spaces. Business owners can invest in commercial units featuring flexible layouts and contemporary style, creating an efficient professional work environment in this prime Al Sufouh location.",
  },
];

const galleryImages = [
  {
    src: "/shahrukhz_by_danube/1.webp",
    width: 800,
    height: 600,
    alt: "Shahrukhz Tower exterior glass facade",
  },
  {
    src: "/shahrukhz_by_danube/2.webp",
    width: 800,
    height: 600,
    alt: "Luxurious sky pool with panoramic views",
  },
  {
    src: "/shahrukhz_by_danube/3.webp",
    width: 800,
    height: 600,
    alt: "Grand lobby entrance",
  },
  {
    src: "/shahrukhz_by_danube/4.webp",
    width: 800,
    height: 600,
    alt: "Luxury apartment interior",
  },
  {
    src: "/shahrukhz_by_danube/5.webp",
    width: 800,
    height: 600,
    alt: "State-of-the-art fitness center",
  },
  {
    src: "/shahrukhz_by_danube/6.webp",
    width: 800,
    height: 600,
    alt: "Japanese onsen wellness facility",
  },
  {
    src: "/shahrukhz_by_danube/7.webp",
    width: 800,
    height: 600,
    alt: "Waterfront views from apartments",
  },
  {
    src: "/shahrukhz_by_danube/8.webp",
    width: 800,
    height: 600,
    alt: "Modern office spaces",
  },
  {
    src: "/shahrukhz_by_danube/9.webp",
    width: 800,
    height: 600,
    alt: "Tranquility garden relaxation area",
  },
  {
    src: "/shahrukhz_by_danube/10.webp",
    width: 800,
    height: 600,
    alt: "Rooftop helipad",
  },
  {
    src: "/shahrukhz_by_danube/11.webp",
    width: 800,
    height: 600,
    alt: "Rooftop helipad",
  },
  {
    src: "/shahrukhz_by_danube/12.webp",
    width: 800,
    height: 600,
    alt: "Rooftop helipad",
  },
  {
    src: "/shahrukhz_by_danube/13.webp",
    width: 800,
    height: 600,
    alt: "Rooftop helipad",
  },
  {
    src: "/shahrukhz_by_danube/14.webp",
    width: 800,
    height: 600,
    alt: "Rooftop helipad",
  },
];

const stepsTotal = 5;

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-[#d4af37]/20 last:border-b-0">
    <button
      className="flex justify-between items-center w-full py-6 text-left hover:text-[#d4af37] transition-colors"
      onClick={onClick}
    >
      <span className="font-semibold text-white pr-4">{faq.question}</span>
      <span className="text-[#d4af37] flex-shrink-0 ml-4">
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

const LuxuryBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute opacity-10"
        style={{
          width: Math.random() * 300 + 200,
          height: Math.random() * 300 + 200,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          borderRadius: "50%",
          background: `radial-gradient(circle, #d4af37, transparent)`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{
          duration: 12 + Math.random() * 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function ShahrukhzTowerLanding({ pixelId }) {
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

    // Clear errors for current step
    setFormErrors({});

    if (step < stepsTotal - 1) {
      setStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Get honeypot field value
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-shahrukhz-submissions", {
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
            source: "Shahrukhz by Danube - Al Sufouh",
          }),
        });

        if (res.ok) {
          // Redirect to thank you page after successful submission
          router.push("/shahrukhz_by_danube/thankyou");
        } else {
          // Handle error response
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
    <main className="bg-black text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <LuxuryBackground />

        <div className="absolute inset-0 z-0">
          <Image
            src="/shahrukhz_by_danube/7.webp"
            alt="Shahrukhz by Danube Tower"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
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
                className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 backdrop-blur-md rounded-full border-2 border-[#d4af37]/50 shadow-xl"
              >
                <FaCrown className="text-[#d4af37]" />
                <span className="text-sm font-bold text-[#d4af37] tracking-wider uppercase">
                  Presented by Shah Rukh Khan
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight"
              >
                <span className="text-white drop-shadow-2xl">
                  Shahrukhz Tower
                </span>
                <span className="block bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl font-light mt-3">
                  By Danube Properties
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed"
              >
                A 55-storey architectural masterpiece in Al Sufouh, offering
                luxury waterfront apartments with panoramic views, wellness
                amenities, and the prestige of SRK&apos;s vision.
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
                    value: "AED 2.1M",
                    icon: FaMoneyBillWave,
                  },
                  { label: "Payment", value: "70/30", icon: FaCreditCard },
                  { label: "Handover", value: "Q4 2028-29", icon: FaCalendar },
                  { label: "Ownership", value: "Freehold", icon: FaKey },
                ].map((stat) => {
                  const IconComp = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-white/5 backdrop-blur-sm rounded-xl px-3 py-3 border border-[#d4af37]/30 text-center hover:bg-white/10 transition-all"
                    >
                      <IconComp
                        className="text-[#d4af37] mx-auto mb-2"
                        size={20}
                      />
                      <p className="text-[9px] uppercase tracking-wider text-[#d4af37] mb-1">
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
                  className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black px-8 py-4 rounded-full font-bold text-base shadow-2xl shadow-[#d4af37]/50 hover:shadow-[#d4af37]/70 transition-all flex items-center justify-center gap-3"
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
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/50">
                <Image
                  src="/shahrukhz_by_danube/1.webp"
                  alt="Shahrukhz Tower Al Sufouh"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-[#d4af37]/30"
                  >
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-2xl text-[#d4af37]" />
                      <div>
                        <p className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold">
                          55-Storey Tower
                        </p>
                        <p className="text-white font-bold">
                          Architectural Marvel
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-[#d4af37]/30"
                  >
                    <div className="flex items-center gap-3">
                      <FaHelicopter className="text-2xl text-[#d4af37]" />
                      <div>
                        <p className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold">
                          Exclusive Feature
                        </p>
                        <p className="text-white font-bold">
                          Rooftop Helipad Access
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black px-5 py-2 rounded-full text-sm font-bold shadow-xl">
                    Al Sufouh Premium Location
                  </div>
                </div>
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
            className="flex flex-col items-center text-[#d4af37]"
          >
            <span className="text-sm mb-2">Discover More</span>
            <div className="w-6 h-10 border-2 border-[#d4af37]/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-[#d4af37] rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* KEY INFORMATION */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Project Overview
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Architectural Excellence Meets Celebrity Vision
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Shahrukhz by Danube Tower represents the pinnacle of luxury living
              in Al Sufouh, combining Danube Properties proven expertise with
              Shah Rukh Khan&apos;s iconic brand to create an unparalleled
              residential experience.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: FaBuilding,
                title: "55-Storey Tower",
                desc: "Soaring architectural landmark with glass-and-steel façade",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaWater,
                title: "Waterfront Living",
                desc: "Panoramic views of waterways, Palm Jumeirah and Dubai Marina",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaCrown,
                title: "SRK Brand Value",
                desc: "Celebrity endorsement adding prestige and investment confidence",
                gradient: "from-[#d4af37] to-[#f4d03f]",
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
                  className="group bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all border border-[#d4af37]/20"
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
              className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 border border-[#d4af37]/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaBuilding className="text-[#d4af37]" />
                Key Information
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Developer", value: "Danube Properties" },
                  { label: "Project Name", value: "Shahrukhz by Danube Tower" },
                  { label: "Location", value: "Al Sufouh, Dubai" },
                  {
                    label: "Property Types",
                    value: "Luxury Apartments, Penthouses, Commercial",
                  },
                  {
                    label: "Price Range",
                    value: "Starting from AED 2,100,000",
                  },
                  { label: "Payment Plan", value: "70/30 Post-handover" },
                  {
                    label: "Government Fee",
                    value: "4% (Dubai Land Department)",
                  },
                  { label: "Ownership", value: "Freehold" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-3 border-b border-[#d4af37]/20 last:border-b-0"
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
              className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 border border-[#d4af37]/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCalendar className="text-[#d4af37]" />
                Project Timeline
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Project Announcement", value: "2022" },
                  { label: "Construction Started", value: "Ongoing" },
                  { label: "Expected Completion", value: "Q4 2028 - Q4 2029" },
                  {
                    label: "Booking Status",
                    value: "Now Open for Registration",
                  },
                  { label: "Handover Date", value: "Q4 2028 - Q4 2029" },
                  {
                    label: "Unit Structure",
                    value: "55-Storey Commercial Tower",
                  },
                  { label: "Area", value: "Al Sufouh - Premium Location" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-3 border-b border-[#d4af37]/20 last:border-b-0"
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

      {/* ARCHITECTURAL FEATURES */}
      <section className="py-20 bg-black text-white border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Design & Innovation
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Architectural Design Features
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              A striking glass-and-steel façade combined with innovative design
              elements creates a modern architectural masterpiece in
              Dubai&apos;s skyline.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: FaBuilding,
                title: "Glass-and-Steel Façade",
                desc: "Modern luxurious appearance with innovative glass exterior creating stunning visual impact",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaHelicopter,
                title: "Rooftop Helipad",
                desc: "Breathtaking exclusive helipad access adding ultimate convenience and prestige",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaSwimmingPool,
                title: "Luxurious Sky Pool",
                desc: "Rooftop infinity pool offering panoramic views and resort-style relaxation",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaLightbulb,
                title: "Smart Layouts",
                desc: "Flexible interiors with intelligent space planning for residential and commercial needs",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaBriefcase,
                title: "Elegant Office Spaces",
                desc: "Modern commercial units with premium finishes for business owners and professionals",
                gradient: "from-[#d4af37] to-[#f4d03f]",
              },
              {
                icon: FaGem,
                title: "Premium Finishes",
                desc: "High-quality materials and contemporary design throughout all residences",
                gradient: "from-[#d4af37] to-[#f4d03f]",
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComp className="text-2xl text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Waterfront Living Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#d4af37]/10 to-[#f4d03f]/10 rounded-3xl p-8 border border-[#d4af37]/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaWater className="text-4xl text-[#d4af37]" />
              <h3 className="text-2xl font-bold text-white">
                Waterfront Living Excellence
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Shahrukhz Tower offers premium waterfront apartments in Al Sufouh
              with panoramic views of surrounding waterways, Palm Jumeirah, and
              Dubai Marina. Residents enjoy peaceful waterfront living while
              remaining close to Dubai&apos;s famous landmarks and entertainment
              destinations.
            </p>
            <p className="text-gray-400 text-sm">
              The luxurious sky pool provides the perfect spot to unwind while
              enjoying breathtaking views of Dubai&apos;s iconic skyline and
              waterfront vistas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WELLNESS & SMART HOME */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Wellness Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
                Health & Wellness
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
                Wellness-Centric Infrastructure
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Shahrukhz Tower incorporates comprehensive wellness amenities
                promoting a balanced and healthy lifestyle. From Japanese onsen
                baths to dedicated yoga spaces, every element is designed to
                support residents wellbeing.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {wellnessAmenities.map((amenity, i) => {
                  const IconComp = amenity.icon;
                  return (
                    <motion.div
                      key={amenity.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:shadow-lg hover:shadow-[#d4af37]/10 transition-all group"
                    >
                      <IconComp className="text-2xl text-[#d4af37] mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-white mb-1 text-sm">
                        {amenity.title}
                      </h4>
                      <p className="text-xs text-gray-400">{amenity.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Smart Home Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
                Technology
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
                Smart Home Features
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Each apartment is equipped with state-of-the-art smart home
                technology for ultimate ease of living. Control lighting,
                temperature, and security through integrated systems ensuring
                comfort and convenience at all times.
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
                      className="flex items-start gap-4 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:shadow-lg hover:shadow-[#d4af37]/10 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <IconComp className="text-xl text-black" />
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

              <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-2xl p-6 text-black">
                <p className="font-semibold mb-2">Smart Living Benefits</p>
                <p className="text-sm text-black/80">
                  Residents can control all aspects of their apartments
                  remotely, ensuring optimal comfort, security, and energy
                  efficiency throughout their home.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APARTMENT FLOOR PLANS */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950 border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Residence Options
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Apartment Floor Plans & Sizes
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Each Shahrukhz apartment is designed to provide optimal living
              space with smart layouts and modern finishes, suitable for all
              types of residents from investors to families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {apartmentTypes.map((apt, i) => {
              const IconComp = apt.icon;
              return (
                <motion.div
                  key={apt.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group bg-gradient-to-br from-zinc-900 to-black rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all border border-[#d4af37]/20"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-zinc-800 to-black">
                    <Image
                      src={apt.image}
                      alt={apt.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {apt.units}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[#d4af37]/30">
                          <IconComp className="text-[#d4af37] text-xl" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">
                            {apt.name}
                          </p>
                          <p className="text-[#d4af37] text-sm">{apt.size}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {apt.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-400"
                        >
                          <FaCheckCircle
                            className="text-[#d4af37] mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={openForm}
                      className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-black py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
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
            className="mt-12 bg-gradient-to-r from-zinc-900 to-black rounded-3xl p-8 border border-[#d4af37]/30"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaRuler className="text-3xl text-[#d4af37]" />
              <h3 className="text-2xl font-bold text-white">
                Apartment Sizes Overview
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-black rounded-2xl border border-[#d4af37]/20">
                <p className="text-3xl font-bold text-[#d4af37] mb-1">
                  500+ sq ft
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Studio Apartments
                </p>
              </div>
              <div className="text-center p-4 bg-black rounded-2xl border border-[#d4af37]/20">
                <p className="text-3xl font-bold text-[#d4af37] mb-1">
                  700+ sq ft
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  One Bedroom Apartments
                </p>
              </div>
              <div className="text-center p-4 bg-black rounded-2xl border border-[#d4af37]/20">
                <p className="text-3xl font-bold text-[#d4af37] mb-1">
                  1,200+ sq ft
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Two Bedroom Apartments
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOCATION & CONNECTIVITY */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Prime Location
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Location & Nearby Attractions
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Shahrukhz by Danube Tower is located in Al Sufouh, one of
              Dubai&apos;s most coveted areas, known for luxury homes and
              central location with easy access to iconic landmarks.
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
                  className="group bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp className="text-2xl text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{loc.title}</h3>
                      <p className="text-[#d4af37] font-semibold text-sm mb-2">
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
            className="bg-gradient-to-r from-zinc-900 to-black rounded-3xl p-8 border border-[#d4af37]/30"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaRoad className="text-[#d4af37]" />
              Location and Connectivity
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Shahrukhz Tower offers exceptional connectivity to major roads and
              transport hubs. Al Sufouh is a well-connected area, ideal for
              business owners and residents who need to be near major commercial
              and leisure places.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: FaRoad,
                  title: "Sheikh Zayed Road",
                  desc: "Direct access to Downtown Dubai and Dubai Marina",
                },
                {
                  icon: FaSubway,
                  title: "DMCC Metro Station",
                  desc: "Nearby metro for quick commutes",
                },
                {
                  icon: FaPlane,
                  title: "Dubai Airport",
                  desc: "30-minute drive for global travel",
                },
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-5 border border-[#d4af37]/20"
                  >
                    <IconComp className="text-2xl text-[#d4af37] mb-3" />
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
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950 border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Investment Opportunity
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Investment Benefits of Shahrukhz Tower
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Shahrukhz by Danube Tower is an excellent investment for residents
              and international investors, offering freehold ownership, high
              returns, and long-term value in Dubai&apos;s thriving real estate
              market.
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
                  className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <IconComp className="text-2xl text-black" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Key Investment Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-3xl p-8 text-black"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              Why Invest in Shahrukhz Tower?
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Waterfront Residences",
                  value:
                    "Lake-facing apartments with stunning views and high rental potential",
                },
                {
                  label: "Prime Location",
                  value:
                    "Al Sufouh luxury real estate in high demand for investments",
                },
                {
                  label: "Flexible Payment",
                  value: "70/30 post-handover plan provides buyer flexibility",
                },
                {
                  label: "Freehold Properties",
                  value: "Secure ownership for residents and investors",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/10 backdrop-blur-sm rounded-2xl p-5 border border-black/20 hover:bg-black/20 transition-all"
                >
                  <p className="font-bold text-black mb-2">{item.label}</p>
                  <p className="text-sm text-black/80">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INVESTMENT ADVANTAGES */}
      <section className="py-20 bg-gradient-to-b from-zinc-950 to-black border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
              Investment Excellence
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Investment Advantages
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Discover the compelling advantages that make Shahrukhz by Danube
              Tower an exceptional investment opportunity in Dubai&apos;s luxury
              real estate market.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Pros in elegant cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {prosConsData.pros.map((pro, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FaCheckCircle className="text-black" size={16} />
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
              className="mt-12 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] rounded-3xl p-8 text-black text-center"
            >
              <FaTrophy className="text-5xl mx-auto mb-4 text-black" />
              <h3 className="text-2xl font-bold mb-3">
                A Prestigious Investment Opportunity
              </h3>
              <p className="text-black/80 max-w-2xl mx-auto">
                Shahrukhz by Danube Tower combines celebrity brand prestige,
                prime waterfront location, and flexible payment options to
                create one of the most attractive luxury real estate investments
                in Dubai.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <LandingPageGallery
        images={galleryImages}
        title="Shahrukhz Tower Gallery"
        description="Explore the luxury, elegance, and architectural brilliance of Shahrukhz by Danube"
        className="bg-black"
      />

      {/* FAQ SECTION */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950 border-t border-[#d4af37]/20">
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
              Everything you need to know about Shahrukhz by Danube Tower
            </p>

            <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-xl border border-[#d4af37]/20 overflow-hidden p-6">
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
                Ready to Own Your Piece of Luxury?
              </h3>
              <p className="text-gray-400 mb-6 text-lg max-w-2xl mx-auto">
                Connect with our property specialists for exclusive floor plans,
                pricing details, and personalized viewings at Shahrukhz by
                Danube Tower in Al Sufouh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={openForm}
                  className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black px-8 py-4 rounded-full font-semibold hover:from-[#f4d03f] hover:to-[#d4af37] transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
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
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black px-6 py-4 rounded-full font-semibold shadow-2xl hover:shadow-[#d4af37]/50 transition-all flex items-center gap-3"
      >
        <FaCrown /> Get Info
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
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                      <FaCrown className="text-amber-600" />
                      Discover Shahrukhz Tower
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

                <div className="w-full bg-amber-100 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-gradient-to-r from-amber-600 to-amber-500 h-2 rounded-full"
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
                                  : "border-slate-200 focus:border-amber-500"
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
                                  : "border-slate-200 focus:border-amber-500"
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
                              styling={`w-full rounded-2xl border-2 transition-all bg-slate-50 px-5 py-4 ${
                                formErrors.phone
                                  ? "border-red-500 focus-within:border-red-600"
                                  : "border-slate-200 focus-within:border-amber-500"
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
                                "Studio",
                                "1-Bedroom",
                                "2-Bedroom",
                                "Commercial Unit",
                              ].map((type) => (
                                <button
                                  key={type}
                                  onClick={() =>
                                    updateField("propertyType", type)
                                  }
                                  className={`p-5 rounded-2xl border-2 text-left transition-all ${
                                    formData.propertyType === type
                                      ? "border-amber-500 bg-amber-50 text-amber-700 shadow-lg"
                                      : "border-slate-200 bg-slate-50 hover:border-amber-300"
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
                              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 focus:outline-none focus:border-amber-500 transition-colors"
                              placeholder="Budget range, preferred floor, move-in timeline, investment goals..."
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
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                          <FaCrown className="text-4xl text-white" />
                        </div>
                        <h4 className="text-3xl font-bold text-slate-900 mb-4">
                          Thank You, {formData.name}!
                        </h4>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
                          Our luxury property specialists will contact you
                          shortly with detailed information about Shahrukhz by
                          Danube Tower, including floor plans, pricing, and
                          exclusive offers.
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
                        className="ml-auto bg-gradient-to-r from-amber-600 to-amber-500 text-white px-10 py-3 rounded-2xl font-semibold hover:from-amber-700 hover:to-amber-600 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <footer className="bg-black py-16 border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-[#d4af37]" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-[#d4af37]" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-[#d4af37]" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="hover:text-[#d4af37] transition-colors"
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
                  className="w-12 h-12 border-2 border-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors text-[#d4af37] hover:text-black"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 border-2 border-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors text-[#d4af37] hover:text-black"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 border-2 border-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors text-[#d4af37] hover:text-black"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 border-2 border-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] transition-colors text-[#d4af37] hover:text-black"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d4af37]/20 pt-8 text-center text-gray-400">
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
