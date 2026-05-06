"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaBuilding,
  FaUsers,
  FaShieldAlt,
  FaGlobe,
  FaHandshake,
  FaChartLine,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheck,
} from "react-icons/fa";
import Image from "next/image";

// DPS theme – match homepage: #073c75, #51779e, #0d4a8a
const DPS_PRIMARY = "#073c75";
const DPS_SECONDARY = "#51779e";
const DPS_DARK = "#0d4a8a";

// Animated counter for hero stats – runs when in view
const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2, decimals = 0 }) => (
  <CountUp
    end={end}
    prefix={prefix}
    suffix={suffix}
    duration={duration}
    decimals={decimals}
    enableScrollSpy
    scrollSpyOnce
    scrollSpyDelay={200}
  />
);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const StatCard = ({ icon, value, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative overflow-hidden bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/20 shadow-[0_10px_40px_rgba(66,153,255,0.15)]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(40rem 12rem at 50% -10%, rgba(93, 188, 255, 0.18), transparent)",
        }}
      />
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <div className="text-xl font-bold text-white mb-1 text-center">
        {value}
      </div>
      <div className="text-white/70 text-xs font-medium text-center">
        {label}
      </div>
    </motion.div>
  );
};


export default function HnsDpsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* --- HEADER --- */}
      <header className="bg-transparent absolute top-0 z-50 w-full p-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-10">
          <Image src="/dps-page/dps-logo.png" alt="H&S Dubai Logo" width={120} height={100} />
          <Image src="/dps-page/hs-logo.png" alt="H&S Dubai Logo" width={100} height={100} className="mt-1" />
        </div>
      </header>

      {/* --- HERO (Developers-page style) --- */}
      <section className="relative h-[60rem] lg:h-[50rem] flex items-center justify-center overflow-hidden bg-gradient-to-r from-slate-900 via-[#073c75] to-slate-900">
        {/* Floating blur elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#51779e]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block mb-10 bg-white/20 text-white border border-white/30 hover:bg-white/30 text-xs font-semibold px-6 py-3 rounded-full">
              Dubai Property Showcase
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let&apos;s Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#51779e] to-white">
                Property Journey
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Ready to discover Dubai&apos;s finest properties? Join 30+ leading developers at DPS. Our expert team is here to guide you through every step.
            </p>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-4xl mx-auto"
            >
              {/* Residents */}
              <StatCard
                icon={<FaUsers className="text-white text-lg" />}
                value={<AnimatedCounter end={4} suffix="M+" />}
                label="Dubai Residents"
                delay={0}
              />
              {/* Developers */}
              <StatCard
                icon={<FaBuilding className="text-white text-lg" />}
                value={<AnimatedCounter end={30} suffix="+" />}
                label="Premium Developers"
                delay={0.05}
              />
              {/* Market Value */}
              <StatCard
                icon={<svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.2"
                  viewBox="0 0 1000 870"
                  className="w-4 h-4 fill-white"
                >
                  <path
                    id="Layer copy"
                    className="s0"
                    d="m88.3 1c0.4 0.6 2.6 3.3 4.7 5.9 15.3 18.2 26.8 47.8 33 85.1 4.1 24.5 4.3 32.2 4.3 125.6v87h-41.8c-38.2 0-42.6-0.2-50.1-1.7-11.8-2.5-24-9.2-32.2-17.8-6.5-6.9-6.3-7.3-5.9 13.6 0.5 17.3 0.7 19.2 3.2 28.6 4 14.9 9.5 26 17.8 35.9 11.3 13.6 22.8 21.2 39.2 26.3 3.5 1 10.9 1.4 37.1 1.6l32.7 0.5v43.3 43.4l-46.1-0.3-46.3-0.3-8-3.2c-9.5-3.8-13.8-6.6-23.1-14.9l-6.8-6.1 0.4 19.1c0.5 17.7 0.6 19.7 3.1 28.7 8.7 31.8 29.7 54.5 57.4 61.9 6.9 1.9 9.6 2 38.5 2.4l30.9 0.4v89.6c0 54.1-0.3 94-0.8 100.8-0.5 6.2-2.1 17.8-3.5 25.9-6.5 37.3-18.2 65.4-35 83.6l-3.4 3.7h169.1c101.1 0 176.7-0.4 187.8-0.9 19.5-1 63-5.3 72.8-7.4 3.1-0.6 8.9-1.5 12.7-2.1 8.1-1.2 21.5-4 40.8-8.9 27.2-6.8 52-15.3 76.3-26.1 7.6-3.4 29.4-14.5 35.2-18 3.1-1.8 6.8-4 8.2-4.7 3.9-2.1 10.4-6.3 19.9-13.1 4.7-3.4 9.4-6.7 10.4-7.4 4.2-2.8 18.7-14.9 25.3-21 25.1-23.1 46.1-48.8 62.4-76.3 2.3-4 5.3-9 6.6-11.1 3.3-5.6 16.9-33.6 18.2-37.8 0.6-1.9 1.4-3.9 1.8-4.3 2.6-3.4 17.6-50.6 19.4-60.9 0.6-3.3 0.9-3.8 3.4-4.3 1.6-0.3 24.9-0.3 51.8-0.1 53.8 0.4 53.8 0.4 65.7 5.9 6.7 3.1 8.7 4.5 16.1 11.2 9.7 8.7 8.8 10.1 8.2-11.7-0.4-12.8-0.9-20.7-1.8-23.9-3.4-12.3-4.2-14.9-7.2-21.1-9.8-21.4-26.2-36.7-47.2-44l-8.2-3-33.4-0.4-33.3-0.5 0.4-11.7c0.4-15.4 0.4-45.9-0.1-61.6l-0.4-12.6 44.6-0.2c38.2-0.2 45.3 0 49.5 1.1 12.6 3.5 21.1 8.3 31.5 17.8l5.8 5.4v-14.8c0-17.6-0.9-25.4-4.5-37-7.1-23.5-21.1-41-41.1-51.8-13-7-13.8-7.2-58.5-7.5-26.2-0.2-39.9-0.6-40.6-1.2-0.6-0.6-1.1-1.6-1.1-2.4 0-0.8-1.5-7.1-3.5-13.9-23.4-82.7-67.1-148.4-131-197.1-8.7-6.7-30-20.8-38.6-25.6-3.3-1.9-6.9-3.9-7.8-4.5-4.2-2.3-28.3-14.1-34.3-16.6-3.6-1.6-8.3-3.6-10.4-4.4-35.3-15.3-94.5-29.8-139.7-34.3-7.4-0.7-17.2-1.8-21.7-2.2-20.4-2.3-48.7-2.6-209.4-2.6-135.8 0-169.9 0.3-169.4 1zm330.7 43.3c33.8 2 54.6 4.6 78.9 10.5 74.2 17.6 126.4 54.8 164.3 117 3.5 5.8 18.3 36 20.5 42.1 10.5 28.3 15.6 45.1 20.1 67.3 1.1 5.4 2.6 12.6 3.3 16 0.7 3.3 1 6.4 0.7 6.7-0.5 0.4-100.9 0.6-223.3 0.5l-222.5-0.2-0.3-128.5c-0.1-70.6 0-129.3 0.3-130.4l0.4-1.9h71.1c39 0 78 0.4 86.5 0.9zm297.5 350.3c0.7 4.3 0.7 77.3 0 80.9l-0.6 2.7-227.5-0.2-227.4-0.3-0.2-42.4c-0.2-23.3 0-42.7 0.2-43.1 0.3-0.5 97.2-0.8 227.7-0.8h227.2zm-10.2 171.7c0.5 1.5-1.9 13.8-6.8 33.8-5.6 22.5-13.2 45.2-20.9 62-3.8 8.6-13.3 27.2-15.6 30.7-1.1 1.6-4.3 6.7-7.1 11.2-18 28.2-43.7 53.9-73 72.9-10.7 6.8-32.7 18.4-38.6 20.2-1.2 0.3-2.5 0.9-3 1.3-0.7 0.6-9.8 4-20.4 7.8-19.5 6.9-56.6 14.4-86.4 17.5-19.3 1.9-22.4 2-96.7 2h-76.9v-129.7-129.8l220.9-0.4c121.5-0.2 221.6-0.5 222.4-0.7 0.9-0.1 1.8 0.5 2.1 1.2z"
                  />
                </svg>
                }
                value={<AnimatedCounter end={761} suffix="B" />}
                label="Market Value"
                delay={0.1}
              />
              {/* Deals */}
              <StatCard
                icon={<FaCalendarAlt className="text-white text-lg" />}
                value={<AnimatedCounter end={351} suffix="K+" />}
                label="Annual Deals"
                delay={0.15}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- WHAT WE DO / CORE FUNCTION --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-[#073c75] border border-blue-200">
              About DPS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Central <span className="text-gradient">Nervous System</span> of Dubai Real Estate
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              DPS is a permanent, hyper-connected showcase designed to orchestrate success for every stakeholder. We are the architect of convergence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Core Function</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We solve the problem of fragmented discovery and inefficient comparisons. By bringing the entire Dubai market under one roof, we provide the transparency needed for investors to decide with complete confidence.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#073c75] to-[#51779e] flex items-center justify-center mb-4 text-white">
                    <FaGlobe className="text-xl" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Centralized Discovery</h4>
                  <p className="text-sm text-gray-600">Replacing multiple site visits with a single, comprehensive comparison environment.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#073c75] to-[#51779e] flex items-center justify-center mb-4 text-white">
                    <FaChartLine className="text-xl" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Market Optimization</h4>
                  <p className="text-sm text-gray-600">Creating a network effect where developer visibility and buyer choice grow together.</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
                alt="Dubai Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* --- THE PURPOSE OF CONVERGENCE (Stakeholders) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-[#073c75] border border-blue-200">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            The Purpose of <span className="text-gradient">Convergence</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            From discovery to investment, we&apos;ve streamlined the entire process for every stakeholder.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#073c75] to-[#51779e] flex items-center justify-center mx-auto mb-6 text-white">
                <FaBuilding className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Developers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Establishing a permanent, premium presence to reach qualified international investors without the inefficiencies of fragmented marketing.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#073c75] to-[#51779e] flex items-center justify-center mx-auto mb-6 text-white">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Buyers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The ultimate destination for discovery. Compare layouts, ROI, and payment plans objectively across 30+ developers in one visit.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#073c75] to-[#51779e] flex items-center justify-center mx-auto mb-6 text-white">
                <FaHandshake className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Agents</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A professional ecosystem designed to facilitate seamless transactions, providing the tools and inventory to serve clients better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS (Authority Banner style) – Animated counters --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#073c75] via-[#0d4a8a] to-[#073c75] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Where Opportunities Converge</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            DPS isn&apos;t another marketing expenseit&apos;s your answer to fragmented discovery and missed opportunities.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <FaBuilding className="mx-auto mb-3 text-2xl text-white" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter end={30} suffix="+" duration={2} />
              </div>
              <div className="text-white/80 mt-2">Premium Developers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <FaUsers className="mx-auto mb-3 text-2xl text-white" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter end={10} suffix="K+" duration={2} />
              </div>
              <div className="text-white/80 mt-2">Monthly Visitors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <FaChartLine className="mx-auto mb-3 text-2xl text-white" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter end={500} suffix="+" duration={2} />
              </div>
              <div className="text-white/80 mt-2">Properties Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <FaShieldAlt className="mx-auto mb-3 text-2xl text-white" />
              <div className="text-3xl md:text-4xl font-bold text-white">
                <AnimatedCounter end={95} suffix="%" duration={2} />
              </div>
              <div className="text-white/80 mt-2">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE DPS --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-[#073c75] border border-blue-200">
              Why DPS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-gradient">DPS</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dubai Property Showcase stands out as the definitive destination for discovery, comparison, and transaction.
            </p>
          </div>
          <ul className="max-w-3xl mx-auto space-y-4">
            {[
              "Permanent exhibition centerone roof for 30+ premium developers, 365 days a year.",
              "Compare layouts, ROI, and payment plans side-by-side with zero pressure and full transparency.",
              "Reduces marketing and acquisition costs for developers while maximizing qualified buyer traffic.",
              "Trusted by agents, investors, and first-time buyers as the starting point for Dubai real estate.",
              "Strategic location in Dubai with easy access; live data and RERA-aligned information.",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <FaCheck className="flex-shrink-0 mt-1 text-[#073c75]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- BUILT ON TRANSPARENCY --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-[#073c75] border border-blue-200">
            Our Foundation
          </span>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#073c75] to-[#51779e] flex items-center justify-center mx-auto mb-6 text-white">
            <FaShieldAlt className="text-2xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Built on <span className="text-gradient">Transparency & Innovation</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            DPS is not just a platform; it is the new standard for how real estate is discovered and transacted in Dubai. We exist to ensure that every deal finds its perfect match through clarity, precision, and excellence.
          </p>
        </div>
      </section>

      {/* --- VISIT / CONTACT (footer-style bar) --- */}
      {/* <section id="contact" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-[#073c75] border border-blue-200">
              Visit Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="text-gradient">Showroom</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience DPS in person at our exhibition center. Open 365 days a year.
            </p>
          </div>
          <div className="bg-[#073c75] rounded-none border-t border-b border-[#0d4a8a] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="flex-shrink-0 text-white/90 mt-0.5 text-lg" />
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Address</p>
                    <p className="text-white text-sm leading-relaxed">
                      DPS Exhibition Center, Main Umm Suqeim Road, Barsha 2, Dubai, UAE
                    </p>
                    <a
                      href="https://www.google.com/maps/search/DPS+Exhibition+Center+Umm+Suqeim+Road+Barsha+2+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 text-sm font-medium hover:text-white mt-1 inline-block"
                    >
                      Get directions →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhone className="flex-shrink-0 text-white/90 mt-0.5 text-lg" />
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+971545727505" className="text-white text-sm hover:text-white/90 transition-colors">
                      +971 5 457 27505
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="flex-shrink-0 text-white/90 mt-0.5 text-lg" />
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@dpsexpo.com" className="text-white text-sm hover:text-white/90 transition-colors break-all">
                      info@dpsexpo.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaClock className="flex-shrink-0 text-white/90 mt-0.5 text-lg" />
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Hours</p>
                    <p className="text-white text-sm leading-relaxed">
                      Mon – Sun: 10:00 AM – 10:00 PM<br />
                      <span className="text-white/80">Open 365 days a year</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* --- FOOTER --- */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#073c75] text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/90 text-sm font-medium">
            DPS Property Expo  The central nervous system of Dubai real estate.
          </p>
          <p className="text-white/70 text-xs mt-2 max-w-2xl mx-auto">
            Where developers, agents, and buyers converge. One destination for discovery, comparison, and transaction.
          </p>
          <p className="text-white/60 text-xs mt-4">
            © 2026 DPS Property Expo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
