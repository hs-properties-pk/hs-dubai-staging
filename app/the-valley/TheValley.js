"use client";

import React, { useMemo, useState, useRef } from "react";
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
  FaTree,
  FaHome,
  FaSwimmingPool,
  FaDumbbell,
  FaShieldAlt,
  FaCity,
  FaPlane,
  FaKey,
  FaCheckCircle,
  FaEnvelope as FaEnvelopeIcon,
  FaPhone as FaPhoneIcon,
  FaArrowRight,
  FaEye,
  FaRoad,
  FaSchool,
  FaShoppingBag,
  FaCar,
  FaSun,
  FaMountain,
  FaChild,
  FaHeart,
  FaHistory,
  FaMap,
  FaCalendar as FaCalendarIcon,
  FaHandshake,
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
import LandingCta from "@/components/LandingCta";
import LandingFaqs from "@/components/LandingFaqs";
import LandingHero from "@/components/LandingHero";

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
];;

const investTimelineOptions = [
  "This month",
  "Within 3 months",
  "More than 3 months",
];

const TheValley = () => {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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
    message: "",
  });

  // Gallery Images
  const galleryImages = [
    {
      src: "/the-valley/1.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar garden",
    },
    {
      src: "/the-valley/2.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar garden 2",
    },
    {
      src: "/the-valley/3.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar sitting area",
    },
    {
      src: "/the-valley/4.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar sight view",
    },
    {
      src: "/the-valley/5.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar house",
    },
    {
      src: "/the-valley/6.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar fire pit",
    },
    {
      src: "/the-valley/7.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar dining area",
    },
    {
      src: "/the-valley/8.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar bedroom",
    },
    {
      src: "/the-valley/9.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar house with garage",
    },
    {
      src: "/the-valley/11.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar area view",
    },
    {
      src: "/the-valley/12.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar dining park",
    },
    {
      src: "/the-valley/13.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar pool",
    },
    {
      src: "/the-valley/14.webp",
      width: 800,
      height: 600,
      alt: "the valley by emaar community gate",
    },
    {
      src: "/the-valley/15.png",
      width: 800,
      height: 600,
      alt: "the valley by emaar house with garage two",
    },
    {
      src: "/the-valley/16.jpg",
      width: 800,
      height: 600,
      alt: "the valley by emaar pond",
    },
    {
      src: "/the-valley/eden.jpg",
      width: 800,
      height: 600,
      alt: "the valley by emaar eden",
    },
    {
      src: "/the-valley/rivana.jpg",
      width: 800,
      height: 600,
      alt: "the valley by emaar rivana",
    },
    {
      src: "/the-valley/town.jpg",
      width: 800,
      height: 600,
      alt: "the valley by emaar town centre",
    },
    {
      src: "/the-valley/talia.jpg",
      width: 800,
      height: 600,
      alt: "the valley by emaar talia",
    },
  ];

  // Property Types
  const propertyTypes = useMemo(
    () => [
      {
        name: "3-4 Bedroom Townhouses",
        tag: "Modern garden town residences",
        perks: [
          "Landscaped streets & parks",
          "Green walking paths",
          "Family-friendly layouts",
          "Community amenities",
          "Multiple architectural styles",
          "Low-rise, family-focused character",
        ],
        units: "Eden, Nara, Talia, Orania, Nima, Elora Clusters",
        image: "/the-valley/talia.jpg",
      },
      {
        name: "Farm Gardens Villas",
        tag: "Premium standalone residences",
        perks: [
          "Larger plots with gardens",
          "Rural farm-inspired design",
          "Premium finishes",
          "Quiet cul-de-sac streets",
          "More rural, farm-inspired feel",
          "Spacious family living",
        ],
        units: "Farm Gardens, Farm Gardens 2 Clusters",
        image: "/the-valley/1.webp",
      },
      {
        name: "Twin Villas & Townhouses",
        tag: "Semi-detached luxury homes",
        perks: [
          "Modern architectural styles",
          "Green buffer zones",
          "Pedestrian-friendly",
          "Proximity to amenities",
          "Twin villas in later phases",
          "Varied product mix",
        ],
        units: "Rivana, Alana, Avena, Velora / Velora 2 Clusters",
        image: "/the-valley/rivana.jpg",
      },
    ],
    []
  );

  // Sub-Communities
  const communities = useMemo(
    () => [
      {
        name: "Eden",
        description:
          "First phase setting the tone for townhouse living at The Valley",
        icon: FaTree,
        features: [
          "Townhouses",
          "Parks",
          "Community feel",
          "Early phase",
          "Landscaped green corridors",
        ],
        image: "/the-valley/eden.jpg",
      },
      {
        name: "Farm Gardens",
        description: "Larger villa plots with farm-inspired design",
        icon: FaLeaf,
        features: [
          "Villas",
          "Gardens",
          "Rural feel",
          "Spacious plots",
          "Farm-inspired design",
        ],
        image: "/the-valley/1.webp",
      },
      {
        name: "Golden Beach",
        description:
          "30,000 sqm man-made beach-style area with water features, play spaces and seating",
        icon: FaWater,
        features: [
          "Water features",
          "Play spaces",
          "Seating areas",
          "Recreation",
          "30,000 sqm area",
          "Beach-style living",
        ],
        image: "/the-valley/16.jpg",
      },
      {
        name: "Town Centre",
        description:
          "32,000 sqm hub for retail, markets, cafés and community events",
        icon: FaShoppingBag,
        features: [
          "Retail",
          "Dining",
          "Markets",
          "Community events",
          "32,000 sqm",
          "Community hub",
        ],
        image: "/the-valley/town.jpg",
      },
      {
        name: "Kids' Dale",
        description:
          "13,000 sqm dedicated to children's play, learning and adventure-style equipment",
        icon: FaChild,
        features: [
          "Children's play",
          "Learning areas",
          "Adventure equipment",
          "13,000 sqm",
          "Family-friendly",
        ],
        image: "/the-valley/12.webp",
      },
      {
        name: "Sports Village",
        description:
          "20,000–25,000 sqm of sports courts, tracks and outdoor fitness areas",
        icon: FaDumbbell,
        features: [
          "Sports courts",
          "Running tracks",
          "Outdoor fitness",
          "20,000-25,000 sqm",
          "Active lifestyle",
        ],
        image: "/the-valley/13.webp",
      },
      {
        name: "Parks & Green Corridors",
        description:
          "Linear parks, green corridors and landscaped walking and cycling paths linking neighbourhoods",
        icon: FaTree,
        features: [
          "Walking paths",
          "Cycling routes",
          "Landscaped greenery",
          "Nature connectivity",
          "Family-friendly",
        ],
        image: "/the-valley/4.webp",
      },
      {
        name: "Community Pool & Recreation",
        description:
          "Pool areas, splash zones and outdoor recreation for residents of all ages",
        icon: FaSwimmingPool,
        features: [
          "Swimming pools",
          "Splash zones",
          "Outdoor recreation",
          "Resident access",
          "Leisure",
        ],
        image: "/the-valley/13.webp",
      },
    ],
    []
  );

  // Why Choose The Valley (for WHY CHOOSE section)
  const whyChoosePoints = [
    "Suburban, nature-inspired master community by Emaar along Dubai–Al Ain Road",
    "Signature zones: Golden Beach, Town Centre, Kids' Dale and Sports Village",
    "Townhouses and villas in phased clusters with landscaped green corridors",
    "Family-focused with parks, play areas and community events",
    "Self-sustained community with retail, dining and daily conveniences",
    "Off-plan and ready homes with flexible payment plans",
    "Freehold and Golden Visa eligible for qualified buyers",
  ];

  // Community Statistics
  const communityStats = [
    {
      value: "200+",
      label: "Total Area",
      description: "hectares master community",
    },
    {
      value: "30,000",
      label: "Golden Beach",
      description: "sqm beach-style area",
    },
    {
      value: "32,000",
      label: "Town Centre",
      description: "sqm community hub",
    },
    {
      value: "13,000",
      label: "Kids' Dale",
      description: "sqm children's area",
    },
  ];

  // Location Highlights
  const locationHighlights = useMemo(
    () => [
      {
        icon: FaMapMarkerAlt,
        title: "Downtown Dubai",
        description: "20-25 minutes drive",
      },
      {
        icon: FaWind,
        title: "Dubai International Airport",
        description: "25-30 minutes drive",
      },
      {
        icon: FaRoad,
        title: "Dubai-Al Ain Road (E66)",
        description: "Direct access",
      },
      {
        icon: FaBuilding,
        title: "Dubai Silicon Oasis",
        description: "Short drive",
      },
    ],
    []
  );

  // Development Timeline
  const developmentTimeline = useMemo(
    () => [
      {
        year: "2019",
        title: "Vision & Introduction",
        desc: "Emaar introduced The Valley as a new suburban neighborhood on Dubai's outskirts, designed as a self-sustained community away from the busy city center.",
      },
      {
        year: "Phase 1",
        title: "Master Community Launch",
        desc: "Planned from the start as a nature-inspired master community with townhouses and villas among landscaped green corridors.",
      },
      {
        year: "Ongoing",
        title: "Phased Development",
        desc: "Multiple phases delivered over several years including Eden, Nara, Talia, Farm Gardens, Rivana and more clusters.",
      },
      {
        year: "Future",
        title: "Long-term Vision",
        desc: "Continued expansion with new phases, amenities and the establishment of a complete suburban town.",
      },
    ],
    []
  );

  // Investment Benefits
  const investmentBenefits = useMemo(
    () => [
      {
        icon: FaChartLine,
        title: "Capital Growth Potential",
        description:
          "Emaar reputation and master community development support steady appreciation",
      },
      {
        icon: FaHandHoldingUsd,
        title: "Strong Rental Demand",
        description:
          "Strong demand for suburban family homes and community living",
      },
      {
        icon: FaKey,
        title: "Freehold Ownership",
        description:
          "Available to all nationalities - part of UAE's off-plan projects",
      },
      {
        icon: FaBuilding,
        title: "Emaar Brand Value",
        description:
          "Trusted real estate company with a proven track record in Dubai",
      },
      {
        icon: FaLeaf,
        title: "Green Living Appeal",
        description:
          "Nature focus with green buffers between neighbourhoods increases long-term appeal",
      },
      {
        icon: FaUsers,
        title: "Growing Community",
        description:
          "Phased development over several years with future expansion and new phases",
      },
    ],
    []
  );

  // FAQ Data
  const faqs = [
    {
      question: "What is The Valley by Emaar?",
      answer:
        "The Valley by Emaar is a large suburban community along Dubai–Al Ain Road, built mainly around townhouses and villas, with key amenities such as Golden Beach, Town Centre, Kids' Dale and Sports Village. It is designed as a nature-inspired, family-focused neighbourhood and represents one of Emaar's key off-plan projects in the UAE.",
    },
    {
      question: "Where is The Valley located in Dubai?",
      answer:
        "The community sits on the outer side of Dubai, along the Dubai–Al Ain Road (E66), close to the wider Dubailand area. This gives residents a quieter setting while keeping key parts of the city reachable by car. The valley emaar location offers direct highway access from this suburban position.",
    },
    {
      question: "What property types are available in The Valley?",
      answer:
        "Most homes in The Valley are 3–4 bedroom townhouses, along with semi-detached and standalone villas in select phases like Farm Gardens and Rivana. Future phases in off plan projects in UAE may introduce new layouts and façade styles, while keeping the same low-rise, family-focused character.",
    },
    {
      question: "Is The Valley a good place for families?",
      answer:
        "Yes. The community has been planned with families in mind, with parks, play areas, nursery options, and large lifestyle hubs such as Kids' Dale and Sports Village that encourage outdoor activity and social interaction. It's designed as a calm, family-friendly community that's quieter than urban projects like Downtown Dubai or Dubai Hills Estate.",
    },
    {
      question: "Are there schools and healthcare options near The Valley?",
      answer:
        "Maple Bear Nursery is already operating within The Valley, and several schools and medical facilities are reachable in surrounding districts within a short drive. As the community grows, more education and healthcare options are expected to open nearby. Daily facilities like supermarkets and pharmacies are also slowly growing as more phases are completed.",
    },
    {
      question: "Does The Valley offer off-plan properties?",
      answer:
        "Yes. Many phases in The Valley are launched as off-plan townhouses or villas, with structured payment arrangements typical of Emaar and other major developers. Buyers interested in off plan projects in the UAE often consider Emaar The Valley and compare it to other Emaar developments like Dubai Hills Estate and Dubai Creek Harbour.",
    },
    {
      question: "Who is developing The Valley?",
      answer:
        "The Valley is developed by Emaar Properties, one of Dubai's best-known names in real estate and a leading real estate company behind communities such as Downtown Dubai, Dubai Marina and Dubai Hills Estate. Emaar uses its experience as a top Dubai real estate company to develop this master community.",
    },
    {
      question: "What kind of lifestyle can residents expect at The Valley?",
      answer:
        "Residents can expect a quieter, suburban lifestyle centred around green spaces, safe streets and family-friendly amenities. The lifestyle is suburban and calm, focusing on parks, playgrounds, and community events rather than intense retail or nightlife. It suits those who prioritise space, parks and community living over being right in the middle of the city.",
    },
    {
      question: "What are the key landmarks in The Valley?",
      answer:
        "Key landmarks include Golden Beach (30,000 sqm man-made beach-style area), Town Centre (32,000 sqm retail and community hub), Kids' Dale (13,000 sqm children's area), and Sports Village (20,000-25,000 sqm sports facilities). These zones give The Valley by Emaar its own identity and support community living all year round.",
    },
    {
      question: "How is The Valley connected to Dubai?",
      answer:
        "The Valley has direct connection to Dubai–Al Ain Road (E66), which links to major highways. Residents can reach Downtown Dubai in 20-25 minutes, Dubai International Airport in 25-30 minutes, and other areas like Dubai Silicon Oasis and Dubai Outlet Mall within a short drive. Most residents use private cars or ride-hailing services.",
    },
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
        const res = await fetch("/api/send-the-valley-contact", {
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
            message: formData.message,
            createdAt: new Date().toISOString(),
            source: "The Valley Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/the-valley/thankyou");
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
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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

      <LandingHero
        imageSrc="/the-valley/12.webp"
        imageAlt="The Valley by Emaar community overview"
        badgeText="Emaar Properties"
        title="The Valley by Emaar"
        subtitle="A modern garden suburb master community for a new beginning"
        description="Desert serenity, greener streets, and a family-first lifestyle with community living  designed as a low-rise, self-sustained community with parks, lifestyle zones, and outdoor living at its center. Explore the perfect balance of nature and urban sophistication."
        ctaText="Explore Properties"
        onCtaClick={openForm}
        showScrollIndicator
      />

      {/* Overview Section - Mina Rashid style */}
      <section id="overview" className="py-20 bg-white">
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
                  The Valley by Emaar
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    The Valley by Emaar is a large suburban community along Dubai–Al Ain Road, built mainly around townhouses and villas. Emaar introduced it in 2019 as a self-sustained, nature-inspired master community away from the busy city center, with key amenities such as Golden Beach, Town Centre, Kids&apos; Dale and Sports Village.
                  </p>
                  <p>
                    Designed so residents can live, play, and relax in one place without needing to go to central Dubai for daily needs. It is a key off-plan project in the UAE and a calmer, family-friendly alternative to urban projects like Downtown Dubai or Dubai Hills Estate.
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
                      <span className="text-gray-700">Golden Beach, Town Centre, Kids&apos; Dale, Sports Village</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Townhouses and villas in landscaped clusters</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Family-focused, nature-inspired master community</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Direct access to Dubai–Al Ain Road (E66)</span>
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
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500 font-custom2 uppercase tracking-widest">
                  Development Timeline
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 font-custom">
                  From concept to growing community
                </h3>
              </div>
            </div>
            <div className="space-y-6">
              {developmentTimeline.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-3 sm:col-span-2">
                    <div className="text-sm font-bold text-gray-900 font-custom">
                      {item.year}
                    </div>
                  </div>
                  <div className="col-span-9 sm:col-span-10">
                    <div className="font-bold text-gray-900 font-custom">
                      {item.title}
                    </div>
                    <div className="text-gray-600 font-custom3 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Developer Section */}
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
              DEVELOPER
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Emaar – Developer Profile
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
                The Valley reflects the vision of Emaar Properties, one of Dubai&apos;s most established and trusted real estate developers. Known for master-planned communities such as Downtown Dubai, Dubai Marina, Dubai Hills Estate and Arabian Ranches, Emaar brings its expertise in design, infrastructure and family-focused development to The Valley.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-custom3">
                The development emphasises quality construction, nature-inspired landscaping, and long-term value, giving buyers confidence when considering The Valley by Emaar.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle Section */}
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
              LIFESTYLE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Built for weekends, routines, and a quieter pace
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The Valley leans into outdoor time, social hubs, and lower-density
              streets  ideal for families who want space and a community feel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Nature-Inspired Living",
                desc: "Desert greenery, dunes, meadows and river-like landscaping",
                icon: FaLeaf,
              },
              {
                title: "Family Focused",
                desc: "Parks, play areas, and safer streets for families",
                icon: FaUsers,
              },
              {
                title: "Outdoor Activity",
                desc: "Cycling routes, walking paths, and sports facilities",
                icon: FaSun,
              },
              {
                title: "Community Events",
                desc: "Markets, pop-ups, and seasonal moments at the Town Centre",
                icon: FaHeart,
              },
              {
                title: "Quiet Suburban",
                desc: "A calmer alternative to inner-city districts",
                icon: FaMountain,
              },
              {
                title: "Self-Sustained",
                desc: "Live, play, and relax in one place without needing central Dubai",
                icon: FaHome,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  {(() => {
                    const Icon = item.icon;
                    return <Icon className="text-black text-2xl" />;
                  })()}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 font-custom2">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-custom3">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Location & Connectivity */}
      <section id="location" className="py-20 bg-white">
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
              The Valley location along Dubai–Al Ain Road
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The valley emaar location is along the Dubai–Al Ain Road (E66),
              on the outer side of the city near the Dubailand area. It has a
              suburban position with direct highway access.
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.684579494348!2d55.443952900000006!3d25.010831699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f7d5b6e348abf%3A0x200f43e8226e0a1c!2sThe%20Valley%20by%20Emaar!5e0!3m2!1sen!2s!4v1772088203072!5m2!1sen!2s"
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
                    src="https://manage.tanamiproperties.com/Project/Location_Map/578/Thumb/578.webp"
                    alt="The Valley Location Map"
                    width={1400}
                    height={800}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {locationHighlights.map((feature, index) => (
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

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-custom2">
              Key Connections:
            </h3>
            <ul className="space-y-3 text-gray-700 font-custom3">
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Direct connection to Dubai–Al Ain Road (E66)</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Internal roads planned as neighbourhood loops and cul-de-sacs</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Limited through-traffic in residential streets</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Pedestrian-friendly pathways and cycling routes internally</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              RESIDENCES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Townhouse and Villa Property Types
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The Valley is mostly a community of townhouses and villas, designed
              for those who want more space than city apartments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypes.map((property, index) => (
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
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                      The Valley
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-bold">
                      {property.units.split(',')[0]}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-custom2">
                    {property.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 font-custom3">
                    {property.tag}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {property.perks.slice(0, 4).map((perk, idx) => (
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
                    Inquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Master Plan Section */}
      <section id="masterplan" className="py-20 bg-white">
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
                  MASTER PLAN
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
                  A modern garden town design
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    The Valley covers over 200 hectares and is designed as a modern
                    garden town with a green area in the center that connects all
                    homes to the main facilities.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  {[
                    "Inspired by natural elements: dunes, meadows and river-like landscaping",
                    "Low- to mid-rise townhouse and villa streets",
                    "Green buffers between neighbourhoods",
                    "Pedestrian-friendly pathways and cycling routes",
                    "Focus on desert greenery, open skies, and quieter suburban feel",
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FaCheck className="text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-custom3">{t}</span>
                    </div>
                  ))}
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
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 font-custom2 uppercase tracking-widest">
                      Design Philosophy
                    </div>
                    <div className="text-xl font-bold text-gray-900 font-custom">
                      Nature-inspired community planning
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaHome className="text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 font-custom">
                        Low-rise Residential Character
                      </div>
                      <div className="text-gray-600 font-custom3">
                        Townhouses and villas arranged in neighbourhood loops
                        and cul-de-sacs to limit through-traffic
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaTree className="text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 font-custom">
                        Green Connectivity
                      </div>
                      <div className="text-gray-600 font-custom3">
                        Linear parks and green corridors running between
                        townhouse rows, connecting all areas
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaRoad className="text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 font-custom">
                        Transport Planning
                      </div>
                      <div className="text-gray-600 font-custom3">
                        Direct connection to Dubai–Al Ain Road, internal
                        neighbourhood loops for limited traffic
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-gray-50">
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
              Signature community zones
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Within Emaar The Valley, several signature community zones stand
              out, giving The Valley its own identity and supporting community
              living all year with a focus on outdoor activity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.slice(2, 8).map((amenity, index) => (
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
                  alt={amenity.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-custom">
                    {amenity.name}
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

      {/* Sub-Communities Section */}
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
              SUB-COMMUNITIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Multiple phases, one community vision
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The Valley is being delivered in multiple phases, each with its
              own name, style and location within the master plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <community.icon className="text-white" />
                    <h3 className="text-2xl font-bold font-custom">
                      {community.name}
                    </h3>
                  </div>
                  <p className="text-gray-200 font-custom3 mb-3">
                    {community.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {community.features.slice(0, 3).map((feature, idx) => (
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

      {/* Why Choose The Valley */}
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
              Why Choose The Valley by Emaar
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              <span className="font-semibold text-black">The Valley by Emaar</span> stands out among Dubai&apos;s suburban communities for several key reasons:
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
              <ul className="space-y-4">
                {whyChoosePoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-gray-700 font-custom3"
                  >
                    <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                    <span className="text-lg leading-relaxed">{point}</span>
                  </li>
                ))}
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
              A practical case for long-term value
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Demand for family suburban communities, Emaar delivery confidence,
              and phased expansion support the investment narrative for The Valley.
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
        id="gallery"
        images={galleryImages}
        title="Lifestyle Gallery"
        description="Experience The Valley by Emaar through our visual journey"
        className="bg-white"
      />

      {/* FAQ Section */}
      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about The Valley"
        faqs={faqs}
        className="bg-white"
      />

      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR GARDEN COMMUNITY OPPORTUNITY"
        title="Ready to Explore The Valley by Emaar?"
        description="Tell us what you're looking for in this master community  we'll share current availability, phase details, off-plan opportunities, and the best match for your family or investment needs."
        ctaText="Get Started"
        footnote="Townhouses & villas • Flexible payment plans • Off-plan opportunities"
      />

      {/* Footer */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  THE VALLEY
                </span>
              </div>
              <p className="text-gray-400">
                A modern garden suburb master community by Emaar Properties.
                Desert serenity, greener streets, and a family-first lifestyle.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection("overview")} className="hover:text-white transition-colors">
                    Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("history")} className="hover:text-white transition-colors">
                    History & Vision
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("properties")} className="hover:text-white transition-colors">
                    Residences
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("masterplan")} className="hover:text-white transition-colors">
                    Master Plan
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("location")} className="hover:text-white transition-colors">
                    Location
                  </button>
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
            <p>&copy; 2026 H&S Propert..y. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Real Estate Communities in Dubai | The Valley by Emaar
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
                      The Valley Inquiry
                    </h3>
                    <p className="text-gray-300 font-custom3">
                      Get details about properties in The Valley
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
                        Your The Valley inquiry has been received. Our property
                        specialists will contact you within 24 hours with exclusive
                        property details.
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
};

export default TheValley;