// app/FarmGardensLanding.js
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
  FaSwimmingPool,
  FaDumbbell,
  FaLaptop,
  FaShoppingBag,
  FaTree,
  FaFire,
  FaUsers,
  FaHome,
  FaShieldAlt,
  FaHeart,
  FaChild,
  FaSeedling,
  FaMapMarker,
  FaBuilding,
  FaCreditCard,
  FaChartLine,
  FaPassport,
  FaWifi,
  FaCar,
  FaSchool,
  FaHotel,
  FaShoppingCart,
  FaUmbrellaBeach,
  FaLeaf,
  FaTractor,
  FaSun,
  FaMountain,
  FaWater,
  FaWind,
  FaRoad,
  FaMoneyBillWave,
  FaRecycle,
  FaHandHoldingHeart,
} from "react-icons/fa";

const villaTypes = [
  {
    name: "4-Bedroom Horizon Villa",
    tag: "Horizontal lines, calm & contemporary",
    image: "/farm_garden_valley/9.webp",
    size: "4,950 - 6,500 sq ft",
    perks: [
      "Smooth horizontal forms blending into the desert horizon",
      "Expansive backyard ideal for pool, lounge and firepit",
      "Large glazing to capture garden and farm views",
      "Perfect for families wanting a refined, modern desert home",
    ],
  },
  {
    name: "5-Bedroom Horizon Villa",
    tag: "Space for big families & gatherings",
    image: "/farm_garden_valley/5.webp",
    size: "7,200 - 8,800 sq ft",
    perks: [
      "Generous living and dining areas that flow to the garden",
      "Extra bedroom for guests, live-in help or home office",
      "Ideal for multi-generational living in a gated enclave",
      "Backyards sized for outdoor kitchens & entertaining",
    ],
  },
  {
    name: "4-Bedroom Earth Villa",
    tag: "Indoor–outdoor living, grounded in nature",
    image: "/farm_garden_valley/15.png",
    size: "5,200 - 7,000 sq ft",
    perks: [
      "Warm earthy palette with stone and timber accents",
      "Deep terraces linking indoors with garden & pool",
      "Layouts optimised for cross-ventilation and natural light",
      "Set within a lush farm-style landscape of palms & ghaf",
    ],
  },
  {
    name: "5-Bedroom Earth Villa",
    tag: "The flagship farm villa residence",
    image: "/farm_garden_valley/7.webp",
    size: "8,500 - 10,004 sq ft",
    perks: [
      "Grand proportions with double-height spaces",
      "Room for formal lounge, family room and study",
      "Backyard large enough for pool, majlis and garden pods",
      "For those who want a statement country home in Dubai",
    ],
  },
];

const stepsTotal = 5;

// FAQ Data
const faqData = [
  {
    question: "What is Farm Gardens at The Valley?",
    answer:
      "Farm Gardens at The Valley is a luxury residential project by Emaar Properties located within the The Valley community in Dubai Land. It offers 4 and 5-bedroom villas designed to provide a modern living experience with farm-inspired, sustainable features.",
  },
  {
    question: "What are the prices of the villas in Farm Gardens?",
    answer:
      "The prices for the villas in Farm Gardens start from approximately AED 5.1 million, but the final price depends on the villa size, location, and amenities.",
  },
  {
    question: "When is the expected completion date for Farm Gardens?",
    answer:
      "The expected completion date for Farm Gardens at The Valley is August 2026. The project is currently under construction.",
  },
  {
    question: "What sizes are the villas in Farm Gardens?",
    answer:
      "The villas in Farm Gardens range in size from 4,950 square feet to 10,004 square feet, offering ample space for families.",
  },
  {
    question: "Are the villas in Farm Gardens vastu compliant?",
    answer:
      "Yes, the villas in Farm Gardens are designed according to Vastu Shastra principles, ensuring positive energy and harmony within the homes.",
  },
  {
    question: "What payment plan is available for Farm Gardens?",
    answer:
      "Farm Gardens offers an 80/20 payment plan. 80% of the payment is made during construction, and the remaining 20% is paid upon handover.",
  },
];

// Gallery images for Farm Gardens
const galleryImages = [
  {
    src: "/farm_garden_valley/1.webp",
    width: 800,
    height: 600,
    alt: "Farm Gardens exterior architecture with modern farmhouse design",
  },
  {
    src: "/farm_garden_valley/2.webp",
    width: 800,
    height: 600,
    alt: "Luxury villa living room with panoramic garden views",
  },
  {
    src: "/farm_garden_valley/3.webp",
    width: 800,
    height: 600,
    alt: "Modern kitchen with premium finishes in Farm Gardens villa",
  },
  {
    src: "/farm_garden_valley/4.webp",
    width: 800,
    height: 600,
    alt: "Infinity pool and outdoor relaxation area",
  },
  // {
  //   src: "/farm_garden_valley/5.webp",
  //   width: 800,
  //   height: 600,
  //   alt: "Master bedroom with luxurious ensuite bathroom",
  // },
  {
    src: "/farm_garden_valley/6.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
  {
    src: "/farm_garden_valley/7.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
  {
    src: "/farm_garden_valley/8.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
  {
    src: "/farm_garden_valley/9.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
  {
    src: "/farm_garden_valley/11.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
  {
    src: "/farm_garden_valley/12.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
  {
    src: "/farm_garden_valley/13.webp",
    width: 800,
    height: 600,
    alt: "Community amenities and recreational facilities",
  },
];

// Farm Features with nature-inspired icons
const farmFeatures = [
  {
    icon: FaSeedling,
    title: "Organic Farming",
    description: "Community gardens and farming allotments for fresh produce",
  },
  {
    icon: FaLeaf,
    title: "Hydroponics",
    description: "Advanced greenhouse technology for year-round farming",
  },
  {
    icon: FaTractor,
    title: "Farm Activities",
    description: "Hands-on farming experiences for the whole family",
  },
  {
    icon: FaTree,
    title: "Green Landscapes",
    description: "Lush gardens with native plants and shaded walkways",
  },
];

// Natural Amenities
const naturalAmenities = [
  {
    icon: FaWater,
    title: "Natural Swimming Pools",
    description: "Chemical-free swimming experiences",
  },
  {
    icon: FaWind,
    title: "Open Air Gym",
    description: "Fitness surrounded by nature",
  },
  {
    icon: FaSun,
    title: "Sunset Viewing Decks",
    description: "Perfect spots for evening relaxation",
  },
  {
    icon: FaMountain,
    title: "Desert Trails",
    description: "Walking and cycling paths through natural landscapes",
  },
];

// Location & Connectivity Features
const locationFeatures = [
  {
    icon: FaRoad,
    title: "Al Ain Road Access",
    description: "Direct access to central Dubai and key business districts",
  },
  {
    icon: FaCar,
    title: "Sheikh Mohammed Bin Zayed Road",
    description: "Major highway connecting to various parts of Dubai",
  },
  {
    icon: FaMapMarker,
    title: "Prime Location",
    description: "Close to Downtown Dubai, Burj Khalifa, and Palm Jumeirah",
  },
  {
    icon: FaBuilding,
    title: "Future Metro Extension",
    description: "Planned public transport access improvements",
  },
];

// Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "High ROI Potential",
    description:
      "Strong growth in Dubai's real estate market with Emaar's brand value",
  },
  {
    icon: FaMoneyBillWave,
    title: "Prime Location Value",
    description: "Proximity to major landmarks adds significant property value",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Eco-Conscious Appeal",
    description: "Growing market of sustainable property investors",
  },
  {
    icon: FaCreditCard,
    title: "80/20 Payment Plan",
    description: "Favorable payment terms with 20% on handover",
  },
];

// Sustainability Features
const sustainabilityFeatures = [
  {
    icon: FaRecycle,
    title: "Farm-to-Table Philosophy",
    description:
      "Community gardening and organic produce for sustainable living",
  },
  {
    icon: FaSeedling,
    title: "Hydroponics Greenhouse",
    description: "Advanced agricultural technology for year-round farming",
  },
  {
    icon: FaLeaf,
    title: "Reduced Environmental Impact",
    description: "Eco-friendly practices that support sustainable lifestyle",
  },
  {
    icon: FaTree,
    title: "Community Farming",
    description: "Residents can grow their own food and connect with nature",
  },
];

// FAQ Item Component
const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#8B4513]/20 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-6 text-left hover:text-[#8B4513] transition-colors duration-300"
        onClick={onClick}
      >
        <span className="font-semibold text-[#2F4F4F] pr-4">
          {faq.question}
        </span>
        <span className="text-[#8B4513] flex-shrink-0 ml-4">
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
              <p className="text-[#556B2F] leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Organic Background Elements
const OrganicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Natural gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5DC] via-[#FAF0E6] to-[#FFF8DC]" />

      {/* Organic shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: `${Math.random() * 50}% ${Math.random() * 50}% ${
              Math.random() * 50
            }% ${Math.random() * 50}%`,
            background: `linear-gradient(45deg, #8B4513, #556B2F)`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 5, -5, 0],
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
};

// Farm-inspired Hero Section
const FarmHero = ({ onOpenForm }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <OrganicBackground />

      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/farm_garden_valley/11.webp"
          alt="Farm Gardens at The Valley - Luxury Countryside Living"
          fill
          className="object-cover"
          priority
        />
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[#8B4513]/10" /> {/* Warm tint */}
      </div>

      {/* Floating leaves decoration - reduced opacity for better visibility */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              fontSize: Math.random() * 20 + 12,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaLeaf />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Organic Badge with better contrast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full border border-white/30 shadow-lg"
          >
            <FaSeedling className="text-[#8B4513]" />
            <span className="text-sm font-semibold text-[#8B4513] tracking-wider">
              ORGANIC LIVING COMMUNITY
            </span>
          </motion.div>

          {/* Enhanced Main Title with text shadows */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white drop-shadow-2xl">
              Farm Gardens The Valley By Emaar
            </span>
            <span className="block text-white/90 text-2xl sm:text-3xl lg:text-4xl font-light mt-4 drop-shadow-lg">
              Where Countryside Meets Luxury
            </span>
          </motion.h1>

          {/* Enhanced Description with better background */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-white/95 mb-8 max-w-3xl mx-auto"
          >
            Explore The Valley Farm Gardens - a private collection of 4 & 5 bedroom Dubai countryside villas set within Dubai&apos;s
            premier farm-inspired community. These Emaar Farm Gardens villas offer sustainable luxury
            living amidst organic gardens and open landscapes.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onOpenForm}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#8B4513] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:bg-[#A0522D] transition-all flex items-center gap-3 border-2 border-white/20"
            >
              <FaSeedling />
              Register Your Interest
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/90"
        >
          <span className="text-sm mb-2 drop-shadow-lg">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/80 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Additional decorative elements for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
    </section>
  );
};

// Location & Connectivity Section
const LocationConnectivity = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] mb-6">
            Prime Location & Connectivity
          </h2>
          <p className="text-xl text-[#556B2F] max-w-3xl mx-auto">
            Strategically located in Dubai Land with excellent connectivity to
            major landmarks and business districts through Al Ain Road and
            Sheikh Mohammed Bin Zayed Road.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locationFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-[#8B4513]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8B4513] transition-all duration-500">
                  <IconComponent className="text-3xl text-[#8B4513] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#2F4F4F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#556B2F] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Nearby Attractions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#FAF0E6] to-[#F5F5DC] rounded-3xl p-8 border border-[#8B4513]/10"
        >
          <h3 className="text-2xl font-bold text-[#2F4F4F] mb-6 text-center">
            Nearby Attractions & Landmarks
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              "Downtown Dubai & Burj Khalifa",
              "Dubai Marina",
              "Palm Jumeirah",
              "Global Village",
              "Dubai Outlet Mall",
              "Dubai Frame",
              "Meydan Racecourse",
              "Burj Al Arab",
            ].map((attraction, index) => (
              <motion.div
                key={attraction}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#8B4513]/10 hover:border-[#8B4513]/30 transition-all"
              >
                <p className="text-[#556B2F] font-medium">{attraction}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Investment Benefits Section
const InvestmentBenefits = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F5DC] to-[#FAF0E6]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] mb-6">
            Investment Benefits
          </h2>
          <p className="text-xl text-[#556B2F] max-w-3xl mx-auto">
            Farm Gardens The Valley villas for sale offer exceptional investment
            opportunities with high ROI potential, prime location advantages,
            and eco-conscious appeal in Dubai&apos;s growing real estate market. Discover The Valley Dubai villas that combine luxury with nature.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {investmentBenefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-[#556B2F]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#556B2F] transition-all duration-500">
                  <IconComponent className="text-3xl text-[#556B2F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#2F4F4F] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#556B2F] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Key Investment Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl p-8 border border-[#8B4513]/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-[#2F4F4F] mb-6 text-center">
            Key Investment Highlights
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Developer Reputation",
                value: "Emaar Properties",
                description: "Dubai's leading developer - Emaar The Valley homes",
              },
              {
                title: "Starting Price",
                value: "AED 5.1M",
                description: "Competitive entry point",
              },
              {
                title: "Villa Sizes",
                value: "4,950-10,004 sq ft",
                description: "Spacious family living",
              },
              {
                title: "Payment Plan",
                value: "80/20",
                description: "Favorable terms",
              },
              {
                title: "Completion",
                value: "August 2026",
                description: "Clear timeline",
              },
              {
                title: "Vastu Compliant",
                value: "Yes",
                description: "Harmonious design",
              },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-[#FAF0E6] rounded-2xl border border-[#8B4513]/10 hover:border-[#8B4513]/30 transition-all"
              >
                <div className="text-2xl font-bold text-[#8B4513] mb-2">
                  {highlight.value}
                </div>
                <div className="font-semibold text-[#2F4F4F] mb-1">
                  {highlight.title}
                </div>
                <div className="text-sm text-[#556B2F]">
                  {highlight.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Sustainability Vision Section
const SustainabilityVision = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] mb-6">
            Sustainability Vision
          </h2>
          <p className="text-xl text-[#556B2F] max-w-3xl mx-auto">
            Embracing a farm-to-table lifestyle with community gardening,
            hydroponics technology, and eco-friendly practices that promote
            sustainable living and connection with nature.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sustainabilityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-[#8B4513]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8B4513] transition-all duration-500">
                  <IconComponent className="text-3xl text-[#8B4513] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#2F4F4F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#556B2F] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Sustainability Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold text-[#2F4F4F] mb-6">
              Farm-to-Table Living Experience
            </h3>
            <div className="space-y-4 text-[#556B2F]">
              <p className="leading-relaxed">
                Farm Gardens promotes a sustainable lifestyle where residents
                can actively participate in community farming, grow their own
                organic produce, and embrace eco-conscious living.
              </p>
              <ul className="space-y-3">
                {[
                  "Community farming allotments for fresh produce",
                  "Hydroponics greenhouse for year-round farming",
                  "Hands-on agricultural experiences for families",
                  "Reduced environmental impact through sustainable practices",
                  "Connection with nature and organic lifestyle",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-[#8B4513] rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-80 rounded-3xl overflow-hidden border border-[#8B4513]/20"
          >
            <Image
              src="/farm_garden_valley/12.webp"
              alt="Sustainable farming and community gardens"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Farm-inspired Villa Cards
const FarmVillaSection = ({ onOpenForm }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF0E6] to-[#F5F5DC]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] mb-6">
            Horizon & Earth Collections
          </h2>
          <p className="text-xl text-[#556B2F] max-w-3xl mx-auto">
            Two distinct architectural philosophies, united by their harmony
            with nature and commitment to sustainable luxury living.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {villaTypes.map((villa, index) => (
            <motion.div
              key={villa.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#8B4513]/10 hover:border-[#8B4513]/30 transition-all duration-500">
                {/* Villa Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Villa Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                      {villa.name}
                    </span>
                  </div>

                  {/* Size Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="bg-white/90 text-[#2F4F4F] px-3 py-1 rounded-full text-xs font-semibold">
                      {villa.size}
                    </span>
                  </div>
                </div>

                {/* Villa Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[#8B4513] text-sm font-medium mb-2">
                        {villa.tag}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onOpenForm}
                      className="bg-[#556B2F] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#6B8E23] transition-colors flex items-center gap-2"
                    >
                      <FaLeaf size={12} />
                      Enquire
                    </motion.button>
                  </div>

                  <ul className="space-y-4">
                    {villa.perks.map((perk, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 text-[#556B2F]"
                      >
                        <div className="w-6 h-6 bg-[#8B4513]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#8B4513] rounded-full" />
                        </div>
                        <span className="leading-relaxed">{perk}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Farm Features Section
const FarmFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] mb-6">
            Farm-to-Table Living
          </h2>
          <p className="text-xl text-[#556B2F] max-w-3xl mx-auto">
            Embrace a sustainable lifestyle with community farming, organic
            produce, and hands-on agricultural experiences right at your
            doorstep.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {farmFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-[#8B4513]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8B4513] transition-all duration-500">
                  <IconComponent className="text-3xl text-[#8B4513] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#2F4F4F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#556B2F] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Natural Amenities Section
const NaturalAmenities = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F5DC] to-[#FAF0E6]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] mb-6">
            Nature-Infused Amenities
          </h2>
          <p className="text-xl text-[#556B2F] max-w-3xl mx-auto">
            Facilities designed to harmonize with the natural environment,
            promoting wellness and connection with the outdoors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {naturalAmenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#8B4513]/10 hover:border-[#8B4513]/30 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#556B2F] rounded-2xl flex items-center justify-center group-hover:bg-[#8B4513] transition-colors">
                    <IconComponent className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#2F4F4F] mb-3">
                      {amenity.title}
                    </h3>
                    <p className="text-[#556B2F] leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function FarmGardensLanding({ pixelId }) {
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
    villaType: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef(null);

  const progress = ((step + 1) / stepsTotal) * 100;

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

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
        const res = await fetch("/api/send-farm-gardens-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            villaType: formData.villaType,
            message: formData.message,
            website: websiteValue, // Honeypot field - should always be empty for legitimate users
            createdAt: new Date().toISOString(),
            source: "Farm Gardens - The Valley",
          }),
        });

        if (res.ok) {
          // Redirect to thank you page after successful submission
          router.push("/farm-garden-valley/thankyou");
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

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="bg-[#FAF0E6] text-[#2F4F4F] overflow-x-hidden">
      <FarmHero onOpenForm={openForm} />

      {/* REMOVED OrganicStats SECTION */}

      <FarmVillaSection onOpenForm={openForm} />
      <LocationConnectivity />
      <InvestmentBenefits />
      <SustainabilityVision />
      <FarmFeatures />
      <NaturalAmenities />

      {/* GALLERY SECTION */}
      <LandingPageGallery
        images={galleryImages}
        title="Farm Gardens Gallery"
        description="Experience the harmony of luxury and nature in our farm-inspired community"
        className="bg-white"
      />

      {/* FAQ SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF0E6]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2F4F4F] text-center mb-6">
              Common Questions
            </h2>
            <p className="text-xl text-[#556B2F] text-center mb-12 max-w-2xl mx-auto">
              Everything you need to know about Farm Gardens living
            </p>

            <div className="bg-white rounded-3xl shadow-2xl border border-[#8B4513]/10 overflow-hidden p-6">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>

            <div className="text-center mt-12 p-8 ">
              <h3 className="text-2xl font-bold text-[#2F4F4F] mb-4">
                Ready to Experience Farm-to-Table Living?
              </h3>
              <p className="text-[#556B2F] mb-6 text-lg max-w-2xl mx-auto">
                Join Dubai&apos;s premier farm-inspired community and discover
                the perfect blend of luxury and sustainability. Our farm experts
                will guide you through exclusive villa options and personalized
                farm living experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={openForm}
                  className="bg-[#8B4513] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A0522D] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaSeedling />
                  Schedule Farm Tour
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
        className="fixed bottom-6 right-6 z-50 bg-[#8B4513] text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:bg-[#A0522D] transition-all flex items-center gap-3"
      >
        <FaLeaf />
        Get Farm Brochure
      </motion.button>

      {/* ORGANIC FORM MODAL */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-[#8B4513]/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2F4F4F]">
                      Discover Farm Gardens
                    </h3>
                    <p className="text-[#556B2F] mt-2">
                      Step {step + 1} of {stepsTotal}
                    </p>
                  </div>
                  <button
                    onClick={closeForm}
                    className="text-[#8B4513] hover:text-[#A0522D] text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Organic Progress Bar */}
                <div className="w-full bg-[#8B4513]/10 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-[#8B4513] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>

                <div className="min-h-[300px]">
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
                            <label className="block text-[#2F4F4F] font-semibold">
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
                              className={`w-full bg-[#FAF0E6] border rounded-2xl px-4 py-3 text-[#2F4F4F] focus:outline-none transition-colors ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-[#8B4513]/20 focus:border-[#8B4513]"
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
                            <label className="block text-[#2F4F4F] font-semibold">
                              What&apos;s your email?
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
                              className={`w-full bg-[#FAF0E6] border rounded-2xl px-4 py-3 text-[#2F4F4F] focus:outline-none transition-colors ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-[#8B4513]/20 focus:border-[#8B4513]"
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
                            <label className="block text-[#2F4F4F] font-semibold">
                              Your mobile number?
                            </label>
                            <CountrySelect
                              styling={`w-full rounded-2xl border-2 transition-all bg-[#FAF0E6] px-4 py-3 ${
                                formErrors.phone
                                  ? "border-red-500 focus-within:border-red-600"
                                  : "border-[#8B4513]/20 focus-within:border-[#8B4513]"
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
                            <p className="text-xs text-[#556B2F] mt-2">
                              We&apos;ll contact you on this number
                            </p>
                          </>
                        )}

                        {step === 3 && (
                          <>
                            <label className="block text-[#2F4F4F] font-semibold">
                              Preferred villa type?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {villaTypes.map((villa) => (
                                <button
                                  key={villa.name}
                                  onClick={() =>
                                    updateField("villaType", villa.name)
                                  }
                                  className={`p-4 rounded-2xl border text-left transition-all ${
                                    formData.villaType === villa.name
                                      ? "border-[#8B4513] bg-[#8B4513]/10 text-[#8B4513]"
                                      : "border-[#8B4513]/20 bg-[#FAF0E6] hover:border-[#8B4513]/40"
                                  }`}
                                >
                                  <div className="font-semibold text-[#2F4F4F]">
                                    {villa.name}
                                  </div>
                                  <div className="text-sm text-[#556B2F] mt-1">
                                    {villa.size}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {step === 4 && (
                          <>
                            <label className="block text-[#2F4F4F] font-semibold">
                              Any specific requirements?
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                              rows={4}
                              className="w-full bg-[#FAF0E6] border border-[#8B4513]/20 rounded-2xl px-4 py-3 text-[#2F4F4F] focus:outline-none focus:border-[#8B4513] transition-colors"
                              placeholder="Budget, timeline, or special requests..."
                            />
                          </>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="w-20 h-20 bg-[#8B4513]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaSeedling className="text-3xl text-[#8B4513]" />
                        </div>
                        <h4 className="text-2xl font-bold text-[#2F4F4F] mb-4">
                          Thank You, {formData.name}!
                        </h4>
                        <p className="text-[#556B2F]">
                          Our farm living experts will contact you shortly with
                          detailed information about Farm Gardens villas and
                          pricing.
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
                    <div className="flex justify-between mt-8">
                      {step > 0 && (
                        <button
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="px-6 py-3 border border-[#8B4513]/20 rounded-2xl text-[#2F4F4F] hover:bg-[#FAF0E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="ml-auto bg-[#8B4513] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#A0522D] transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : step === stepsTotal - 1 ? (
                          <>
                            <FaLeaf />
                            Submit Inquiry
                          </>
                        ) : (
                          "Next"
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

      {/* ORGANIC FOOTER */}
      <footer className="bg-white py-16 border-t border-[#8B4513]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-[#2F4F4F]">Contact</h3>
              <div className="space-y-4 text-[#556B2F]">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-[#8B4513]" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-[#8B4513] transition-colors duration-300"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-[#8B4513]" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-[#8B4513] transition-colors duration-300"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-[#8B4513]" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="text-center md:text-left hover:text-[#8B4513] transition-colors duration-300"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-6 text-[#2F4F4F]">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  className="w-12 h-12 border border-[#8B4513]/30 rounded-full flex items-center justify-center hover:bg-[#8B4513] hover:border-[#8B4513] transition-colors text-[#8B4513] hover:text-white"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 border border-[#8B4513]/30 rounded-full flex items-center justify-center hover:bg-[#8B4513] hover:border-[#8B4513] transition-colors text-[#8B4513] hover:text-white"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 border border-[#8B4513]/30 rounded-full flex items-center justify-center hover:bg-[#8B4513] hover:border-[#8B4513] transition-colors text-[#8B4513] hover:text-white"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 border border-[#8B4513]/30 rounded-full flex items-center justify-center hover:bg-[#8B4513] hover:border-[#8B4513] transition-colors text-[#8B4513] hover:text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#8B4513]/10 pt-8 text-center text-[#556B2F]">
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
