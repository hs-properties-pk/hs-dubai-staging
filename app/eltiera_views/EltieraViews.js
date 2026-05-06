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
  FaSpa,
  FaFilm,
  FaChild,
  FaWater,
  FaBuilding,
  FaCreditCard,
  FaChartLine,
  FaPassport,
  FaCar,
  FaSchool,
  FaShoppingCart,
  FaUmbrellaBeach,
  FaHome,
  FaGlobe,
  FaShieldAlt,
  FaHeart,
  FaSun,
  FaMountain,
  FaWind,
  FaRoad,
  FaMoneyBillWave,
  FaEye,
  FaLeaf,
  FaGem,
  FaCompass,
  FaWaveSquare,
  FaDownload,
} from "react-icons/fa";

const apartmentTypes = [
  {
    name: "1-Bedroom Apartment",
    tag: "Perfect for professionals & investors",
    image: "/eltiera_views/12.webp",
    size: "Avg. 815 sq ft",
    units: "676 units available",
    perks: [
      "Efficient layouts maximizing lake and skyline views",
      "Full-height glazing for natural light",
      "Premium Ellington interior finishes",
      "Ideal for rental income or city professionals",
    ],
  },
  {
    name: "2-Bedroom Apartment",
    tag: "Space & sophistication combined",
    image: "/eltiera_views/15.webp",
    size: "Avg. 1,250 sq ft",
    units: "296 units available",
    perks: [
      "Generous living areas with panoramic views",
      "Open-plan kitchen with premium appliances",
      "Master suite with ensuite bathroom",
      "Perfect for couples and small families",
    ],
  },
  {
    name: "2-Bedroom + Maid",
    tag: "Added convenience & flexibility",
    image: "/eltiera_views/18.webp",
    size: "Avg. 1,400 sq ft",
    units: "100 units available",
    perks: [
      "Separate maid's room for live-in help",
      "Extra storage and utility space",
      "Ideal for families requiring assistance",
      "Enhanced privacy with dedicated quarters",
    ],
  },
  {
    name: "3-Bedroom Apartment",
    tag: "Family-sized waterfront living",
    image: "/eltiera_views/21.webp",
    size: "Avg. 1,620 sq ft",
    units: "100 units available",
    perks: [
      "Spacious layouts for growing families",
      "Multiple bathrooms and storage areas",
      "Expansive balconies with lake views",
      "Premium corner positions available",
    ],
  },
  {
    name: "3 & 4-Bedroom Penthouses",
    tag: "The pinnacle of island luxury",
    image: "/eltiera_views/18.webp",
    size: "Avg. 5,980 sq ft",
    units: "8 exclusive units",
    perks: [
      "Double-height ceilings and grand proportions",
      "Private rooftop terraces with panoramic views",
      "Exclusive penthouse-only amenities",
      "Ultimate statement residences in Jumeirah Islands",
    ],
  },
];

const stepsTotal = 5;

const faqData = [
  {
    question: "What is Eltiera Views by Ellington?",
    answer:
      "Eltiera Views is a premium four-tower residential development by Ellington Properties located in Jumeirah Islands, Dubai. It offers luxury 1, 2, and 3-bedroom apartments plus exclusive penthouses with panoramic lake views, modern design, and world-class amenities.",
  },
  {
    question: "What types of residences are available?",
    answer:
      "Eltiera Views offers 1-bedroom apartments (avg. 815 sq ft), 2-bedroom apartments (avg. 1,250 sq ft), 2-bedroom + maid units (avg. 1,400 sq ft), 3-bedroom apartments (avg. 1,620 sq ft), and exclusive 3 & 4-bedroom penthouses (avg. 5,980 sq ft).",
  },
  {
    question: "What is the payment plan for Eltiera Views?",
    answer:
      "Eltiera Views offers a 70/30 payment plan. 70% of the payment is spread across the construction period, with the remaining 30% due upon handover, making it accessible for both investors and end-users.",
  },
  {
    question: "When is the expected completion date?",
    answer:
      "The expected handover for Eltiera Views is Q4 2029. The development is currently under construction with steady progress.",
  },
  {
    question: "Can international buyers purchase at Eltiera Views?",
    answer:
      "Yes. Eltiera Views is located in a freehold zone, welcoming international buyers. Qualifying investments can also provide eligibility for UAE residency visas.",
  },
  {
    question: "What amenities does Eltiera Views offer?",
    answer:
      "Eltiera Views features Ellington's most extensive amenity platform including a 40-meter infinity pool, Japanese onsen baths, fitness studio, yoga and Pilates zones, spa and massage rooms, cinema room, dance studio, kids' club, outdoor lounges, and panoramic rooftop terraces.",
  },
];

const galleryImages = [
  {
    src: "/eltiera_views/1.webp",
    width: 800,
    height: 600,
    alt: "Eltiera Views waterfront facade",
  },
  {
    src: "/eltiera_views/2.webp",
    width: 800,
    height: 600,
    alt: "Hotel-style lobby entrance",
  },
  {
    src: "/eltiera_views/3.webp",
    width: 800,
    height: 600,
    alt: "Infinity pool with lake views",
  },
  {
    src: "/eltiera_views/4.webp",
    width: 800,
    height: 600,
    alt: "Luxury apartment interior",
  },
  {
    src: "/eltiera_views/5.webp",
    width: 800,
    height: 600,
    alt: "Master bedroom suite",
  },
  {
    src: "/eltiera_views/6.webp",
    width: 800,
    height: 600,
    alt: "Modern kitchen design",
  },
  {
    src: "/eltiera_views/7.webp",
    width: 800,
    height: 600,
    alt: "State-of-the-art fitness center",
  },
  {
    src: "/eltiera_views/8.webp",
    width: 800,
    height: 600,
    alt: "Japanese onsen spa",
  },
  {
    src: "/eltiera_views/9.webp",
    width: 800,
    height: 600,
    alt: "Panoramic lake views",
  },
  {
    src: "/eltiera_views/10.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/11.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/12.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/13.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/14.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/15.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/16.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/17.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/18.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/19.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/20.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/21.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
  {
    src: "/eltiera_views/22.webp",
    width: 800,
    height: 600,
    alt: "Rooftop terrace",
  },
];

const wellnessAmenities = [
  {
    icon: FaSwimmingPool,
    title: "40m Infinity Pool",
    desc: "Rooftop pool with panoramic lake views",
  },
  {
    icon: FaSpa,
    title: "Japanese Onsen",
    desc: "Traditional thermal baths and relaxation",
  },
  {
    icon: FaDumbbell,
    title: "Fitness Studio",
    desc: "Ellington's largest gym facility",
  },
  {
    icon: FaWind,
    title: "Yoga & Pilates",
    desc: "Indoor and outdoor wellness zones",
  },
];

const lifestyleAmenities = [
  { icon: FaFilm, title: "Cinema Room", desc: "Private screening experience" },
  {
    icon: FaChild,
    title: "Kids' Club",
    desc: "Dedicated children's play areas",
  },
  { icon: FaGem, title: "Spa & Salon", desc: "Beauty and massage services" },
  { icon: FaSun, title: "Rooftop Terrace", desc: "Panoramic sunset lounges" },
];

const locationFeatures = [
  { icon: FaCar, title: "Dubai Marina", desc: "5 minutes drive" },
  { icon: FaUmbrellaBeach, title: "Palm Jumeirah", desc: "10 minutes drive" },
  { icon: FaBuilding, title: "Downtown Dubai", desc: "20 minutes drive" },
  { icon: FaRoad, title: "Sheikh Zayed Road", desc: "Direct access" },
];

const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "High ROI",
    desc: "Up to 5.3% rental yields in Jumeirah Islands",
  },
  {
    icon: FaMoneyBillWave,
    title: "70/30 Plan",
    desc: "Flexible payment structure",
  },
  {
    icon: FaPassport,
    title: "Visa Eligibility",
    desc: "Golden Visa for qualifying investments",
  },
  {
    icon: FaShieldAlt,
    title: "Freehold",
    desc: "Full ownership for international buyers",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-sky-100 last:border-b-0">
    <button
      className="flex justify-between items-center w-full py-6 text-left hover:text-sky-600 transition-colors"
      onClick={onClick}
    >
      <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
      <span className="text-sky-600 flex-shrink-0 ml-4">
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
            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const WaterBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-slate-50 to-amber-50" />
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute opacity-5"
        style={{
          width: Math.random() * 300 + 150,
          height: Math.random() * 100 + 50,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          borderRadius: "50%",
          background: `linear-gradient(90deg, #0ea5e9, #0284c7)`,
        }}
        animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
        transition={{
          duration: 20 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default function EltieraViewsLanding({ pixelId }) {
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
    apartmentType: "",
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
        const res = await fetch("/api/send-eltiera-views-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            apartmentType: formData.apartmentType,
            message: formData.message,
            website: websiteValue, // Honeypot field - should always be empty for legitimate users
            createdAt: new Date().toISOString(),
            source: "Eltiera Views - Jumeirah Islands",
          }),
        });

        if (res.ok) {
          // Redirect to thank you page after successful submission
          router.push("/eltiera_views/thankyou");
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
    <main className="bg-slate-50 text-slate-800 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <WaterBackground />
        <div className="absolute inset-0 z-0">
          <Image
            src="/eltiera_views/23.webp"
            alt="Eltiera Views Jumeirah Islands"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full" // Remove any max-width constraints
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full border border-white/30 shadow-lg"
            >
              <FaCompass className="text-sky-600" />
              <span className="text-sm font-semibold text-sky-700 tracking-wider uppercase">
                Ellington Properties • Jumeirah Islands
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 leading-tight w-full" // Remove max-width
            >
              <span className="text-white drop-shadow-2xl">
                Eltiera Views By Ellington Apartments
              </span>
              <span className="block text-sky-200 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light mt-3">
                Where Every View Tells a Story
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 w-full max-w-4xl" // Increased text size and max-width
            >
              Four iconic waterfront towers offering 1-3 bedroom apartments and
              exclusive penthouses. Experience serene island living surrounded
              by lakes, gardens, and Dubai&apos;s most coveted vistas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-start w-full" // Changed to items-start for better alignment
            >
              <motion.button
                onClick={openForm}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-sky-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:bg-sky-700 transition-all flex items-center gap-3 border-2 border-white/20"
              >
                <FaEye /> Register Interest
              </motion.button>
            </motion.div>
          </motion.div>
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
            className="flex flex-col items-center text-white/80"
          >
            <span className="text-sm mb-2">Explore</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/80 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">
                About The Development
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-6">
                A New Chapter in Waterfront Living
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Eltiera Views by Ellington Properties is a premium four-tower
                residential complex in Jumeirah Islands, Dubai. The development
                blends serene natural surroundings with contemporary
                architectural excellence, offering residents an elegant and
                tranquil living experience.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Its thoughtfully crafted design emphasizes clean lines, layered
                materials, and a rhythmic façade that responds to sunlight.
                Every home is immersed in the beauty of nature, framed by
                endless views of lakes, landscaped gardens, and Dubai&apos;s
                stunning skyline.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Towers", value: "4 Buildings" },
                  { label: "Configuration", value: "G+3P+26" },
                  { label: "Total Units", value: "1,180+" },
                  { label: "Unit Types", value: "1-4 Bedroom" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                  >
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/eltiera_views/22.webp"
                  alt="Eltiera Views Overview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-sky-600 text-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold">AED 21</p>
                <p className="text-sm text-sky-100">
                  per sq. ft service charge
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APARTMENT TYPES */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">
              Residence Collection
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4">
              Choose Your Perfect View
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From efficient studios to grand penthouses, every residence is
              designed to maximize natural light, scenic views, and functional
              luxury.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartmentTypes.slice(0, 3).map((apt, index) => (
              <motion.div
                key={apt.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={apt.image}
                      alt={apt.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-sky-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        {apt.size}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-lg">{apt.name}</p>
                      <p className="text-sky-200 text-sm">{apt.units}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sky-600 text-sm font-medium mb-4">
                      {apt.tag}
                    </p>
                    <ul className="space-y-2">
                      {apt.perks.slice(0, 3).map((perk, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={openForm}
                      className="mt-6 w-full bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-700 py-3 rounded-xl font-semibold transition-all"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {apartmentTypes.slice(3).map((apt, index) => (
              <motion.div
                key={apt.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={apt.image}
                      alt={apt.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        {apt.size}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-lg">{apt.name}</p>
                      <p className="text-amber-200 text-sm">{apt.units}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-amber-600 text-sm font-medium mb-4">
                      {apt.tag}
                    </p>
                    <ul className="space-y-2">
                      {apt.perks.slice(0, 3).map((perk, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={openForm}
                      className="mt-6 w-full bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-700 py-3 rounded-xl font-semibold transition-all"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WELLNESS AMENITIES */}
      <section className="py-20 bg-gradient-to-br from-sky-900 via-slate-900 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sky-400 font-semibold text-sm uppercase tracking-wider">
              World-Class Amenities
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Ellington&apos;s Most Extensive Amenity Platform
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              A podium-level network of indoor and outdoor spaces connected
              across all four towers, combining wellness, leisure, and
              community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-sky-400 mb-6 flex items-center gap-3">
                <FaSpa /> Wellness & Fitness
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {wellnessAmenities.map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-sky-400/50 transition-all"
                    >
                      <IconComp className="text-2xl text-sky-400 mb-3" />
                      <h4 className="font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <FaHeart /> Lifestyle & Leisure
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {lifestyleAmenities.map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-amber-400/50 transition-all"
                    >
                      <IconComp className="text-2xl text-amber-400 mb-3" />
                      <h4 className="font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-sky-600/20 to-amber-600/20 rounded-3xl p-8 border border-white/10"
          >
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                "Dance Studio",
                "Co-working Spaces",
                "BBQ Areas",
                "Pet-Friendly Zones",
              ].map((amenity, i) => (
                <div key={amenity} className="py-4">
                  <p className="font-semibold text-white">{amenity}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOCATION & CONNECTIVITY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">
              Prime Location
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4">
              Connected to Everything That Matters
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Jumeirah Islands offers the perfect balance of secluded island
              living with easy access to Dubai&apos;s key destinations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {locationFeatures.map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-600 transition-colors">
                    <IconComp className="text-2xl text-sky-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-50 to-sky-50 rounded-3xl p-8 border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
              Nearby Landmarks & Amenities
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                "Dubai Marina Mall",
                "JBR Beach",
                "Emirates Golf Club",
                "American School of Dubai",
                "Ibn Battuta Mall",
                "Palm Jumeirah",
                "Media City",
                "Internet City",
              ].map((place, i) => (
                <motion.div
                  key={place}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 text-center border border-slate-100 hover:border-sky-300 transition-all"
                >
                  <p className="text-slate-700 font-medium text-sm">{place}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INVESTMENT BENEFITS */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">
              Investment Opportunity
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4">
              Why Invest in Eltiera Views?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Jumeirah Islands commands premium valuations with proven rental
              demand from professionals and families seeking island tranquility.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:border-sky-300 transition-all text-center"
                >
                  <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComp className="text-2xl text-sky-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-500">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Key Investment Highlights
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Developer", value: "Ellington" },
                { label: "Location", value: "Jumeirah Islands" },
                { label: "Payment", value: "70/30" },
                { label: "Handover", value: "Q4 2029" },
                { label: "Ownership", value: "Freehold" },
                { label: "Service Charge", value: "AED 21/sqft" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <p className="text-2xl font-bold text-sky-600 mb-1">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <LandingPageGallery
        images={galleryImages}
        title="Eltiera Views Gallery"
        description="Experience the elegance of waterfront living through our visual showcase"
        className="bg-white"
      />

      {/* FAQ SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Everything you need to know about Eltiera Views
            </p>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-6">
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
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Ready to Secure Your View?
              </h3>
              <p className="text-slate-600 mb-6 text-lg max-w-2xl mx-auto">
                Connect with our property specialists for exclusive floor plans,
                pricing details, and personalized viewings at Eltiera Views.
              </p>
              <button
                onClick={openForm}
                className="bg-sky-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-sky-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <FaEye /> Schedule a Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FLOATING CTA */}
      <motion.button
        onClick={openForm}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-sky-600 text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:bg-sky-700 transition-all flex items-center gap-3"
      >
        <FaWater /> Get Brochure
      </motion.button>

      {/* FORM MODAL */}
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
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-sky-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Discover Eltiera Views
                    </h3>
                    <p className="text-slate-500 mt-2">
                      Step {step + 1} of {stepsTotal}
                    </p>
                  </div>
                  <button
                    onClick={closeForm}
                    className="text-slate-400 hover:text-slate-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="w-full bg-sky-100 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-sky-600 h-2 rounded-full"
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
                            <label className="block text-slate-700 font-semibold">
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
                              className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-slate-800 focus:outline-none transition-colors ${
                                formErrors.name
                                  ? "border-red-500"
                                  : "border-slate-200 focus:border-sky-500"
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
                            <label className="block text-slate-700 font-semibold">
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
                              className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-slate-800 focus:outline-none transition-colors ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-slate-200 focus:border-sky-500"
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
                            <label className="block text-slate-700 font-semibold">
                              Your mobile number?
                            </label>
                            <CountrySelect
                              styling={`w-full rounded-2xl border-2 transition-all bg-slate-50 px-4 py-3 ${
                                formErrors.phone
                                  ? "border-red-500 focus-within:border-red-600"
                                  : "border-slate-200 focus-within:border-sky-500"
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
                            <p className="text-xs text-slate-500 mt-2">
                              We&apos;ll contact you on this number
                            </p>
                          </>
                        )}
                        {step === 3 && (
                          <>
                            <label className="block text-slate-700 font-semibold">
                              Preferred apartment type?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                "1-Bedroom",
                                "2-Bedroom",
                                "2-Bed + Maid",
                                "3-Bedroom",
                                "Penthouse",
                              ].map((type) => (
                                <button
                                  key={type}
                                  onClick={() =>
                                    updateField("apartmentType", type)
                                  }
                                  className={`p-4 rounded-2xl border text-left transition-all ${
                                    formData.apartmentType === type
                                      ? "border-sky-500 bg-sky-50 text-sky-700"
                                      : "border-slate-200 bg-slate-50 hover:border-sky-300"
                                  }`}
                                >
                                  <div className="font-semibold text-slate-800">
                                    {type}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                        {step === 4 && (
                          <>
                            <label className="block text-slate-700 font-semibold">
                              Any specific requirements?
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                              rows={4}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:border-sky-500 transition-colors"
                              placeholder="Budget, preferred floor, view preferences..."
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
                        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaWater className="text-3xl text-sky-600" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-800 mb-4">
                          Thank You, {formData.name}!
                        </h4>
                        <p className="text-slate-600">
                          Our property specialists will contact you shortly with
                          detailed information about Eltiera Views apartments
                          and pricing.
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
                          className="px-6 py-3 border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="ml-auto bg-sky-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-sky-700 transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : step === stepsTotal - 1 ? (
                          <>
                            <FaEye /> Submit Inquiry
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

      {/* FOOTER */}
      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-slate-800">Contact</h3>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-sky-600" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-sky-600 transition-colors"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-sky-600" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-sky-600 transition-colors"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-sky-600" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="hover:text-sky-600 transition-colors"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-6 text-slate-800">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:border-sky-600 transition-colors text-slate-600 hover:text-white"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:border-sky-600 transition-colors text-slate-600 hover:text-white"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:border-sky-600 transition-colors text-slate-600 hover:text-white"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center hover:bg-sky-600 hover:border-sky-600 transition-colors text-slate-600 hover:text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 text-center text-slate-500">
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
