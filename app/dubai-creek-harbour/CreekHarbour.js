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
  FaTree,
  FaShoppingBag,
  FaSwimmingPool,
  FaDumbbell,
  FaShieldAlt,
  FaCity,
  FaPlane,
  FaKey,
  FaCheckCircle,
  FaHistory,
  FaRoad,
  FaRecycle,
  FaHandshake,
  FaInfinity,
  FaMapPin,
  FaHome,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaLocationDot,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import LandingPageGallery from "@/components/LandingPageGallery";
import LandingFaqs from "@/components/LandingFaqs";
import LandingCta from "@/components/LandingCta";
import LandingHero from "@/components/LandingHero";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";

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

// Community Statistics
const communityStats = [
  {
    value: "Waterfront",
    label: "Living",
    description: "Creek-side residences",
  },
  { value: "Emaar", label: "Developer", description: "Trusted brand" },
  {
    value: "Mixed-Use",
    label: "Community",
    description: "Residential & retail",
  },
  {
    value: "Urban",
    label: "Lifestyle",
    description: "Modern living",
  },
];

// Districts/Sub-Communities
const districts = [
  {
    name: "Creek Island",
    description: "Central hub with residential towers, hotels and Creek Marina",
    icon: FaBuilding,
    features: ["Residential towers", "Hotels", "Creek Marina", "Central gathering space"],
    image: "/dubai-creek-harbour/2.webp",
  },
  {
    name: "Creek Beach",
    description: "Resort-like mid-rise buildings with direct beach access",
    icon: FaUmbrellaBeach,
    features: ["Man-made beach", "Promenade", "Waterfront dining", "Family-friendly"],
    image: "/dubai-creek-harbour/5.webp",
  },
  {
    name: "The Cove & Savanna",
    description: "Named towers with unique architectural identities",
    icon: FaHome,
    features: ["Branded residences", "Premium finishes", "Exclusive amenities", "Architectural design"],
    image: "/dubai-creek-harbour/3.webp",
  },
];

// Property Types
const propertyTypes = [
  {
    name: "1-3 Bedroom Apartments",
    tag: "Modern living spaces",
    perks: [
      "Balconies with creek views",
      "Modern shared facilities",
      "High-rise living",
      "Waterfront access",
    ],
    units: "Available now",
    image: "/dubai-creek-harbour/7.webp",
  },
  {
    name: "Luxury Penthouses",
    tag: "Expansive terraces with premium views",
    perks: [
      "Premium skyline views",
      "Private terraces",
      "Luxury finishes",
      "Exclusive access",
    ],
    units: "Limited units",
    image: "/dubai-creek-harbour/8.webp",
  },
  {
    name: "Waterfront Residences",
    tag: "Direct promenade access",
    perks: [
      "Creek Marina views",
      "Ground floor access",
      "Private entrances",
      "Beach proximity",
    ],
    units: "Creek Beach area",
    image: "/dubai-creek-harbour/9.webp",
  },
];

// Waterfront Features
const waterfrontFeatures = [
  {
    icon: FaWater,
    title: "Creek Marina",
    description: "Modern marina with promenade cafés and yacht berths",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Creek Beach",
    description: "Man-made beach with waterfront dining and recreational areas",
  },
  {
    icon: FaCompass,
    title: "Waterfront Promenade",
    description: "Scenic walkways along the creek for evening strolls",
  },
  {
    icon: FaAnchor,
    title: "Marina Access",
    description: "Direct access to marina facilities and water activities",
  },
];

// Community Amenities
const communityAmenities = [
  {
    icon: FaSwimmingPool,
    title: "Swimming Pools",
    description: "Multiple pools and recreational areas",
    image: "/dubai-creek-harbour/4.webp",
  },
  {
    icon: FaDumbbell,
    title: "Fitness Centers",
    description: "State-of-the-art gym and wellness facilities",
    image: "/dubai-creek-harbour/6.webp",
  },
  {
    icon: FaTree,
    title: "Parks & Promenades",
    description: "Green spaces and walking routes throughout",
    image: "/dubai-creek-harbour/2.webp",
  },
  {
    icon: FaShoppingBag,
    title: "Retail & Dining",
    description: "Waterfront restaurants and boutique shops",
    image: "/dubai-creek-harbour/10.webp",
  },
  {
    icon: FaBuilding,
    title: "Community Spaces",
    description: "Social hubs and gathering areas",
    image: "/dubai-creek-harbour/11.webp",
  },
  {
    icon: FaShieldAlt,
    title: "24/7 Security",
    description: "Gated community with round-the-clock security",
    image: "/dubai-creek-harbour/12.webp",
  },
];

// Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "Capital Growth",
    description: "Prime waterfront location ensures strong capital appreciation potential",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Rental Yield",
    description: "High demand for creek-side properties with strong rental returns",
  },
  {
    icon: FaKey,
    title: "Freehold Ownership",
    description: "Available to all nationalities with freehold ownership rights",
  },
  {
    icon: FaBuilding,
    title: "Emaar Brand",
    description: "Developed by Dubai's most trusted real estate developer",
  },
  {
    icon: FaLeaf,
    title: "Sustainable Living",
    description: "Eco-friendly community design with smart city integration",
  },
  {
    icon: FaUsers,
    title: "Growing Community",
    description: "Long-term development vision with phased expansion",
  },
];

// Location Features
const locationFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: "Downtown Dubai",
    description: "10 minutes drive",
  },
  {
    icon: FaCompass,
    title: "Dubai Airport",
    description: "15 minutes drive",
  },
  {
    icon: FaBuilding,
    title: "Business Bay",
    description: "Direct highway access",
  },
  {
    icon: FaTree,
    title: "Ras Al Khor",
    description: "Adjacent wildlife sanctuary",
  },
];

// FAQ Data
const faqs = [
  {
    q: "What is Dubai Creek Harbour?",
    a: "Dubai Creek Harbour is a large waterfront community on Dubai Creek, developed with residential towers, hotels, retail, offices, marinas, parks and promenades in one master-planned district.",
  },
  {
    q: "Is Dubai Creek Harbour the same as Dubai Creek?",
    a: "No. Dubai Creek is the natural waterway that runs through older parts of the city, while Dubai Creek Harbour is a new development built along a section of that creek near Ras Al Khor.",
  },
  {
    q: "What types of homes are available?",
    a: "Most homes are apartments in mid- and high-rise towers, ranging from 1–3 bedroom units to larger apartments and penthouses. Many are designed as waterfront residences with creek or skyline views.",
  },
  {
    q: "Is it good for waterfront living?",
    a: "Yes. The community was planned specifically around waterfront living, with marinas, promenades and creek-facing towers, giving residents easy access to the water's edge and open views.",
  },
  {
    q: "How does it compare to Dubai Harbour or Emaar Beachfront?",
    a: "Dubai Harbour and Emaar Beachfront are positioned more directly on the Arabian Gulf near Dubai Marina, while Dubai Creek Harbour is on the creek, closer to older parts of the city and Downtown Dubai.",
  },
  {
    q: "Are there off-plan projects available?",
    a: "Yes. Dubai Creek Harbour regularly sees new towers and phases launched as off-plan projects, as part of the wider UAE real estate market.",
  },
  {
    q: "Who is developing Dubai Creek Harbour?",
    a: "The area is being developed by Emaar, working alongside government-related partners. Emaar is one of the best-known names in real estate and a leading real estate company in Dubai.",
  },
  {
    q: "Is it family-friendly?",
    a: "Dubai Creek Harbour offers parks, promenades, play areas and planned social infrastructure that can suit families, especially those comfortable with apartment living and an urban waterfront environment.",
  },
  {
    q: "How easy is it to reach other parts of Dubai?",
    a: "The community connects to major city roads, making it relatively straightforward to reach Downtown Dubai, Business Bay, the airport and other established districts by car or taxi.",
  },
  {
    q: "Can visitors access Dubai Creek Harbour if they don't live there?",
    a: "Yes. Public areas such as Creek Marina, waterfront promenades, retail and dining outlets are open to visitors, making Dubai Creek Harbour both a place to live and a place to visit.",
  },
];

export default function DubaiCreekHarbourLanding({ pixelId }) {
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
    { src: "/dubai-creek-harbour/1.webp", width: 800, height: 600, alt: "Dubai Creek Harbour waterfront view" },
    { src: "/dubai-creek-harbour/2.webp", width: 800, height: 600, alt: "Creek Island residential towers" },
    { src: "/dubai-creek-harbour/3.webp", width: 800, height: 600, alt: "The Cove architectural design" },
    { src: "/dubai-creek-harbour/4.webp", width: 800, height: 600, alt: "Community amenities and pools" },
    { src: "/dubai-creek-harbour/5.webp", width: 800, height: 600, alt: "Creek Beach waterfront access" },
    { src: "/dubai-creek-harbour/6.webp", width: 800, height: 600, alt: "Fitness and wellness facilities" },
    { src: "/dubai-creek-harbour/7.webp", width: 800, height: 600, alt: "Modern apartment interiors" },
    { src: "/dubai-creek-harbour/8.webp", width: 800, height: 600, alt: "Luxury penthouse with skyline views" },
    { src: "/dubai-creek-harbour/9.webp", width: 800, height: 600, alt: "Waterfront residences" },
    { src: "/dubai-creek-harbour/10.webp", width: 800, height: 600, alt: "Retail and dining promenade" },
    { src: "/dubai-creek-harbour/11.webp", width: 800, height: 600, alt: "Community spaces and landscaping" },
    { src: "/dubai-creek-harbour/12.webp", width: 800, height: 600, alt: "Dubai Creek Harbour skyline" },
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
        const res = await fetch("/api/send-dubai-creek-harbour-submissions", {
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
            source: "Dubai Creek Harbour Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/dubai-creek-harbour/thankyou");
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
        imageSrc="/dubai-creek-harbour/12.webp"
        imageAlt="Dubai Creek Harbour Waterfront"
        badgeText="Emaar Properties"
        title="Dubai Creek Harbour"
        subtitle="Where historic creek waters meet modern urban living"
        description="Experience Dubai's visionary waterfront community. Creek harbour is more than a developmentit's a vision for the future of waterfront living and real estate in Dubai."
        ctaText="Explore Properties"
        onCtaClick={openForm}
        showScrollIndicator
      />


      {/* Overview Section */}
      <section id="overview" className="py-20 bg-gray-50">
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
                  Redefining Urban Waterfront Living
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Conceived as Dubai&apos;s &apos;future downtown,&apos; blending high-rise living with waterfront charm.
                    Strategically positioned on historic Dubai Creek near Ras Al Khor Wildlife Sanctuary and Dubai Creek Park.
                  </p>
                  <p>
                    This mixed-use development features residential towers, commercial spaces, and leisure facilities
                    in one master-planned district. Ongoing phases continue to add new amenities and enhance Dubai&apos;s skyline.
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
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 font-custom">
                  At a Glance
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { value: "Waterfront", label: "Living", description: "Creek-side residences" },
                    { value: "Mixed-Use", label: "Community", description: "Residential & retail" },
                    { value: "Emaar", label: "Developer", description: "Trusted brand" },
                    { value: "Urban", label: "Lifestyle", description: "Modern living" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-xl font-bold mb-1 text-gray-900 font-custom2">
                        {stat.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-700 font-custom3">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300">
                  <h4 className="text-lg font-bold mb-4 text-gray-900 font-custom2">
                    Key Facts
                  </h4>
                  <ul className="space-y-3 text-sm font-custom3">
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Master-planned waterfront community</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Adjacent to Ras Al Khor Wildlife Sanctuary</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Multiple residential towers and districts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Creek Marina and waterfront promenade</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History & Vision Section */}
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
                  HISTORY & VISION
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
                  The &apos;Future Downtown&apos;
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Conceived as a joint venture led by Emaar, a premier real estate company in Dubai,
                    Dubai Creek Harbour was envisioned as Dubai&apos;s new &apos;future downtown&apos; - a place where
                    high-rise towers, modern harbours, retail, parks and cultural spaces converge along
                    the historic Dubai Creek waterway.
                  </p>
                  <p>
                    Uniquely positioned adjacent to the Ras Al Khor Wildlife Sanctuary, this development
                    maintains a visual and environmental connection to one of Dubai&apos;s key natural assets
                    while delivering modern urban living.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/dubai-creek-harbour/6.webp"
                alt="Dubai Creek Harbour development vision"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emaar Mina Rashid – Developer Profile */}
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
              Emaar Mina Rashid – Developer Profile
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
                Emaar Mina Rashid reflects the vision of Emaar, one of Dubai&apos;s most established and trusted real estate developers. Known for delivering master-planned communities across the city, Emaar brings its expertise in design, infrastructure, and community development to Mina Rashid.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-custom3">
                The development follows Emaar&apos;s focus on quality construction, well-planned public spaces, and sustainable long-term value, adding confidence for buyers considering Mina Rashid by Emaar.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waterfront Lifestyle */}
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
              Waterfront Living Redefined
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Experience life along the historic Dubai Creek with world-class amenities and stunning views
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
              Prime Location & Connectivity
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Strategically located on historic Dubai Creek with excellent connectivity to major destinations
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14440.356389840326!2d55.355408204023725!3d25.20021765020736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f679fadfb563d%3A0x15e90d8fe66e02f2!2sRas%20Al%20Khor%20-%20Dubai%20Creek%20Harbour%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1772093993291!5m2!1sen!2s"
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
                    src="https://manage.tanamiproperties.com/Project/LayoutPlan/1729/Gallery/1759.webp"
                    alt="Dubai Creek Harbour Location Map"
                    width={1400}
                    height={800}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

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

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-custom2">
              Key Connections:
            </h3>
            <ul className="space-y-3 text-gray-700 font-custom3">
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Major road connections to E311, E11, and E44</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Planned public transport enhancements</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Proximity to Dubai Metro expansion areas</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Internal pedestrian-friendly network</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section id="properties" className="py-20 bg-gray-50">
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
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Discover our curated collection of waterfront living residences and real estate opportunities
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
                      Dubai Creek
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-bold">
                      {property.units}
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
                    {property.perks.map((perk, idx) => (
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
                    Request Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Plan & Districts */}
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
              MASTER PLAN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Master Plan & Districts
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Explore the carefully planned districts that make up Creek Harbor, each offering unique waterfront living experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {districts.map((district, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={district.image}
                  alt={district.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <district.icon className="text-white" />
                    <h3 className="text-2xl font-bold font-custom">
                      {district.name}
                    </h3>
                  </div>
                  <p className="text-gray-200 font-custom3 mb-3">
                    {district.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {district.features.slice(0, 3).map((feature, idx) => (
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
              World-Class Amenities
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Everything you need for modern waterfront living
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
                  <div className="flex items-center gap-2 mb-2">
                    <amenity.icon className="text-white" />
                    <h3 className="text-2xl font-bold font-custom">
                      {amenity.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 font-custom3">
                    {amenity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability & Innovation */}
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
              SUSTAINABILITY
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Built for the Future
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Eco-conscious design with smart city integration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                {
                  icon: FaRecycle,
                  title: "Eco-Conscious Design",
                  desc: "High-density, walkable districts reduce car dependency while maintaining connection to the Ras Al Khor Wildlife Sanctuary."
                },
                {
                  icon: FaLeaf,
                  title: "Climate-Responsive Landscaping",
                  desc: "Native plant species, shaded walkways, and water-efficient irrigation systems designed for Dubai's climate."
                },
                {
                  icon: FaBuilding,
                  title: "Smart City Integration",
                  desc: "Modern infrastructure supporting digital connectivity, smart home capabilities, and efficient community management."
                },
                {
                  icon: FaTree,
                  title: "Wildlife Coexistence",
                  desc: "Unique positioning allows residents to enjoy urban amenities while living alongside important bird sanctuaries."
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="text-black text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-custom2">{item.title}</h3>
                    <p className="text-gray-600 font-custom3">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/dubai-creek-harbour/11.webp"
                alt="Sustainable design at Dubai Creek Harbour"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
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
              Investment Perspective
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Why Dubai Creek Harbour is a smart investment choice
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
        title="Dubai Creek Harbour Gallery"
        description="Experience Dubai Creek Harbour through our visual journey"
        className="bg-white"
      />

      {/* FAQ Section */}
      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about Dubai Creek Harbour"
        faqs={faqs}
        className="bg-white"
      />

      {/* CTA Section */}
      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR WATERFRONT OPPORTUNITY"
        title="Ready to Experience Dubai Creek Harbour?"
        description="Connect with our property specialists for exclusive insights on Dubai's premier waterfront community. Discover available properties, off-plan opportunities, and investment potential."
        ctaText="Schedule a Viewing"
        footnote="Waterfront residences • Flexible payment plans • Off-plan opportunities"
      />

      {/* Footer */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  DUBAI CREEK HARBOUR
                </span>
              </div>
              <p className="text-gray-400">
                Where historic creek waters meet modern urban living. Dubai&apos;s visionary waterfront community by Emaar Properties.
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
                  <button onClick={() => scrollToSection("properties")} className="hover:text-white transition-colors">
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("amenities")} className="hover:text-white transition-colors">
                    Amenities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("location")} className="hover:text-white transition-colors">
                    Location
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("faq")} className="hover:text-white transition-colors">
                    FAQ
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
            <p>&copy; 2026 H&S Property. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Waterfront Real Estate in Dubai | Dubai Creek Harbour by Emaar
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
                      Dubai Creek Harbour Inquiry
                    </h3>
                    <p className="text-gray-300 font-custom3">
                      Get details about waterfront properties
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
                        Your Dubai Creek Harbour inquiry has been received. Our waterfront
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
}