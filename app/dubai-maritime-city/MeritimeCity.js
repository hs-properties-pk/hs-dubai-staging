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
  FaIndustry,
  FaCogs,
  FaShoppingBag,
  FaCheckCircle,
  FaEye,
  FaMap,
  FaMapPin,
  FaCar,
  FaPlane,
  FaCity,
  FaTree,
  FaHome,
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
    name: "Waterfront Apartments",
    tag: "1–3 Bedroom Layouts with Creek or skyline views",
    perks: [
      "Creek or port views",
      "Modern finishes",
      "Balcony access",
      "Promenade & marina proximity",
    ],
    image: "/dubai-meritime-city/4.jpg",
  },
  {
    name: "Commercial Spaces",
    tag: "Office & Retail - Business-ready",
    perks: [
      "Maritime business hub",
      "Flexible layouts",
      "Retail & services potential",
      "Logistics accessibility nearby",
    ],
    image: "/dubai-meritime-city/5.webp",
  },
  {
    name: "Mixed-Use Towers",
    tag: "Residential + Office - Live-work flexibility",
    perks: [
      "Combined residential & commercial",
      "Modern architecture",
      "Waterfront setting",
      "Long-term growth potential",
    ],
    image: "/dubai-meritime-city/6.jpeg",
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
    value: "Mixed-Use",
    label: "Development",
    description: "Residential, commercial & leisure",
  },
  { value: "DP World", label: "Developer", description: "Global maritime leader" },
  {
    value: "Waterfront",
    label: "Location",
    description: "Along Dubai Creek",
  },
  {
    value: "Strategic",
    label: "Position",
    description: "Between Port Rashid & Dry Docks",
  },
];

// Waterfront Features
const waterfrontFeatures = [
  {
    icon: FaAnchor,
    title: "Maritime Heritage",
    description: "A working waterfront community with authentic port character and maritime activity",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Waterfront Promenades",
    description: "Scenic walkways along Dubai Creek with planned cafés and dining",
  },
  {
    icon: FaCompass,
    title: "Marina Lifestyle",
    description: "Docking and marina context as the community evolves",
  },
  {
    icon: FaWater,
    title: "Creek Views",
    description: "Stunning views of creek, channels, and port activity",
  },
];

// Zoning / master plan blocks
const zones = [
  {
    name: "Maritime Industry Zone",
    description: "Designed for maritime services, ship-related operations, and industry activity across Dubai Maritime City.",
    icon: FaAnchor,
    features: ["Marine services", "Docks & logistics", "Commercial operations", "Business activity"],
    image: "/dubai-meritime-city/hero.jpg",
  },
  {
    name: "Residential Zone",
    description: "High-rise apartment living with waterfront views, promenades, and everyday community conveniences.",
    icon: FaHome,
    features: ["Apartments & penthouses", "Water views", "Green pockets", "Community access"],
    image: "/dubai-meritime-city/1.jpeg",
  },
  {
    name: "Leisure & Retail Zone",
    description: "Planned dining, retail, and lifestyle spaces connected by scenic walkways and waterfront promenades.",
    icon: FaShoppingBag,
    features: ["Retail outlets", "Cafés & dining", "Promenades", "Lifestyle destinations"],
    image: "/dubai-meritime-city/2.jpg",
  },
];

// Community Amenities
const communityAmenities = [
  {
    icon: FaWater,
    title: "Swimming Pools",
    description: "Multiple pools and recreational areas",
    image: "/dubai-meritime-city/4.jpg",
  },
  {
    icon: FaLeaf,
    title: "Fitness Centers",
    description: "State-of-the-art gym and wellness facilities",
    image: "/dubai-meritime-city/1.jpeg",
  },
  {
    icon: FaBuilding,
    title: "Commercial Spaces",
    description: "Office and retail areas within the community",
    image: "/dubai-meritime-city/5.webp",
  },
  {
    icon: FaStar,
    title: "Retail & Dining",
    description: "Planned retail outlets, cafés, and restaurants",
    image: "/dubai-meritime-city/2.jpg",
  },
  {
    icon: FaCompass,
    title: "Promenades",
    description: "Scenic walkways along the waterfront",
    image: "/dubai-meritime-city/hero.jpg",
  },
  {
    icon: FaUsers,
    title: "Community Spaces",
    description: "Social hubs and gathering areas",
    image: "/dubai-meritime-city/6.jpeg",
  },
];

// Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "Capital Growth",
    description: "Waterfront location with ongoing development phases adds long-term value",
  },
  {
    icon: FaBuilding,
    title: "DP World Brand",
    description: "Developed by global maritime leader with strong track record",
  },
  {
    icon: FaCalendar,
    title: "Off-Plan Opportunities",
    description: "Multiple off-plan phases planned across residential and commercial",
  },
  {
    icon: FaUsers,
    title: "Strong Demand",
    description: "Appeals to maritime professionals and waterfront lifestyle seekers",
  },
  {
    icon: FaAnchor,
    title: "Unique Identity",
    description: "A 'working waterfront' concept distinctive in Dubai",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Freehold Property",
    description: "Available to all nationalities with freehold ownership rights",
  },
];

// Location Connectivity
const locationFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: "Downtown Dubai",
    description: "15 minutes drive",
  },
  {
    icon: FaCompass,
    title: "Dubai Airport",
    description: "20 minutes drive",
  },
  {
    icon: FaBuilding,
    title: "Port Rashid",
    description: "Nearby",
  },
  {
    icon: FaWind,
    title: "Ras Al Khor",
    description: "10 minutes drive",
  },
];

// FAQ Data
const faqs = [
  {
    q: "What is Dubai Maritime City?",
    a: "Dubai Maritime City is a large mixed-use development located along Dubai Creek, combining residential towers, commercial spaces, and maritime services within one master-planned waterfront community.",
  },
  {
    q: "Where is Dubai Maritime City located?",
    a: "Dubai Maritime City is located between Port Rashid and Dubai Dry Docks, offering direct access to key city hubs such as Downtown Dubai, business districts, and Dubai International Airport.",
  },
  {
    q: "What types of properties are available in Dubai Maritime City?",
    a: "Property options include waterfront apartments (1–3 bedrooms), luxury apartments and penthouses, mixed-use towers with residential and commercial components, and commercial office/retail spaces.",
  },
  {
    q: "Is Dubai Maritime City an off-plan project?",
    a: "Yes. Dubai Maritime City includes ongoing and future off-plan projects in the UAE, offering opportunities for investors and end-users seeking long-term growth in a waterfront community.",
  },
  {
    q: "Who is developing Dubai Maritime City?",
    a: "Dubai Maritime City is developed by DP World, a global leader in marine and logistics, alongside other key stakeholders involved in planning and delivery.",
  },
  {
    q: "Is Dubai Maritime City suitable for families?",
    a: "Yes. With residential towers, promenades, planned everyday services, and strong connectivity to the rest of Dubai, Dubai Maritime City can suit families, professionals, and investors looking for a waterfront lifestyle.",
  },
  {
    q: "What is the everyday living experience like?",
    a: "Dubai Maritime City blends calm waterfront living with the atmosphere of a working port. Depending on tower position and proximity to operations, residents may notice maritime activity and sea trafficideal for those who like a dynamic waterfront environment.",
  },
  {
    q: "Are there retail and dining options in Dubai Maritime City?",
    a: "Planned retail, cafés, restaurants, and everyday services are part of the community vision. In addition, residents have quick access to nearby dining and shopping areas across central Dubai.",
  },
];

export default function DubaiMaritimeCityLanding({ pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [activeMapTab, setActiveMapTab] = useState("map");
  const honeypotRef = useRef(null);

  // Sub-Communities Data (Zones)
  const subCommunities = zones.map(zone => ({
    name: zone.name,
    description: zone.description,
    image: zone.image,
  }));

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
    { src: "/dubai_maritime_city/gallery1.webp", width: 800, height: 600, alt: "Dubai Maritime City aerial view" },
    { src: "/dubai_maritime_city/gallery2.webp", width: 800, height: 600, alt: "Waterfront apartments in Dubai Maritime City" },
    { src: "/dubai_maritime_city/gallery3.webp", width: 800, height: 600, alt: "Commercial port operations near Dubai Maritime City" },
    { src: "/dubai_maritime_city/gallery4.webp", width: 800, height: 600, alt: "Dubai Maritime City modern architecture" },
    { src: "/dubai_maritime_city/gallery5.webp", width: 800, height: 600, alt: "Dubai Maritime City marina and promenade" },
    { src: "/dubai_maritime_city/gallery6.webp", width: 800, height: 600, alt: "Industrial waterfront atmosphere at Dubai Maritime City" },
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
        const res = await fetch("/api/send-maritime-city-contact", {
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
            source: "Dubai Maritime City Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/dubai-maritime-city/thankyou");
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
        imageSrc="/dubai-meritime-city/hero.jpg"
        imageAlt="Dubai Maritime City Waterfront"
        badgeText="DP World"
        title="Dubai Maritime City"
        subtitle="A working waterfront community with residential, commercial, and leisure life"
        description="Explore Dubai Maritime City location advantages, master plan zoning, marina lifestyle, property types, and the investment context behind one of Dubai's most distinctive mixed-use districts."
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
                  Dubai Maritime City
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Dubai Maritime City is a visionary, master-planned waterfront development located along the shores of Dubai Creek. As one of Dubai&apos;s premier master-planned communities, this maritime city was initially conceived in the early 2000s to combine industrial, commercial, residential, and leisure spaces in one integrated community.
                  </p>
                  <p>
                    The goal was to create a hub for maritime businesses while offering waterfront living and amenities. Today, Dubai Maritime City blends modern residential towers with active maritime operations, making it a central point for both business and lifestyle.
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
                        Master-planned waterfront community along Dubai Creek
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Strategic location between Port Rashid and Dubai Dry Docks
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Residential, commercial, and leisure zones in one district
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Promenades, marina lifestyle, and waterfront views
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
                  History & Vision
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-custom3">
                  The community includes residential apartments, commercial office space, and leisure facilities, all connected by promenades and planned green pockets. It is aimed at professionals, families, and investors who want a waterfront location with strong city access.
                </p>
                <p className="text-gray-700 leading-relaxed font-custom3">
                  Dubai Maritime City is planned as an integrated community where residents can access lifestyle amenities, retail, and waterfront spaces without long internal travelwhile the district still functions as a maritime business hub.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/dubai-meritime-city/1.jpeg"
                  alt="Dubai Maritime City development"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DP World – Developer Profile */}
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
              DP World – Developer Profile
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
                Dubai Maritime City is developed by DP World, a global leader in marine and logistics, alongside other key stakeholders involved in planning and delivery. DP World brings its expertise in maritime infrastructure and global port operations to this distinctive waterfront community.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-custom3">
                The development reflects DP World&apos;s commitment to creating integrated communities that combine industrial capability with modern urban living, adding confidence for buyers considering Dubai Maritime City.
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
              Waterfront & Marina Lifestyle
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Living in Dubai Maritime City means true waterfront livingpromenades, port views, and a marina-focused environment.
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
                  The marina is planned as a key lifestyle feature, supporting outdoor leisure, dining, and a relaxed waterfront atmospherealongside the working maritime identity of the district.
                </p>
                <p className="text-gray-700 font-custom3">
                  Dubai Maritime City blends calm waterfront living with the character of an active port. Depending on tower position and proximity to operations, residents may notice maritime activity and sea trafficideal for those who like a dynamic waterfront environment.
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
                      Professionals, families, maritime industry workers
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
                      Ongoing development with multiple off-plan phases
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
              Location & Connectivity – Dubai Creek
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Dubai Maritime City sits on a man-made peninsula between Port Rashid and Dubai Dry Docks, minutes from major hubs like Downtown Dubai and Dubai International Airport.
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57726.250386632615!2d55.271532549999996!3d25.2742637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4384740a5241%3A0xe6d78cfd14c6ada3!2sMadinat%20Dubai%20Al%20Melaheyah%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1772184745419!5m2!1sen!2s"
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
                    src="https://manage.tanamiproperties.com/Project/Location_Map/2221/Thumb/2221.webp"
                    alt="Dubai Maritime City Location Map"
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
                  <span>Road access supports quick travel to Downtown Dubai, Dubai Marina, and Jumeirah Beach</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Public transport accessible from nearby areas (metro/bus connections depending on route)</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Strong connectivity makes it practical for frequent city commuting while living on the waterfront</span>
                </li>
              </ul>
              <p className="text-gray-600 mt-6 leading-relaxed font-custom3">
                Dubai Maritime City&apos;s location offers excellent connectivity to major Dubai districts via highways and arterial roads, making it a central point for both business and lifestyle.
              </p>
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
              Property Types in Dubai Maritime City
            </h2>
            <p className="text-gray-700 text-lg max-w-7xl mx-auto leading-relaxed font-custom3">
              Choose from waterfront apartments, commercial spaces, and mixed-use towers. Dubai Maritime City includes both ready opportunities and off-plan projectssupporting investors and end users in this growing real estate market.
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
                      Maritime City
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
              Master Plan & Mixed-Use Zoning
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The master plan of maritime city is designed to balance commercial, residential, and industrial elements. Distinct zones support maritime operations, offices, residential living, and leisure amenities in one district.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaAnchor className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Maritime Industry Zone
              </h3>
              <p className="text-gray-700 font-custom3">
                Designed for maritime services, ship-related operations, and industry activity across Dubai Maritime City.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaHome className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Residential Zone
              </h3>
              <p className="text-gray-700 font-custom3">
                High-rise apartment living with waterfront views, promenades, and everyday community conveniences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaShoppingBag className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Leisure & Retail Zone
              </h3>
              <p className="text-gray-700 font-custom3">
                Planned dining, retail, and lifestyle spaces connected by scenic walkways and waterfront promenades.
              </p>
            </div>
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
              Amenities Within the Community
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Dubai Maritime City is planned with a wide mix of amenities that support both residents and workers. This makes the community more than just a group of buildings – it becomes a complete waterfront lifestyle destination.
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
                  alt={`${amenity.title} at Dubai Maritime City`}
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

      {/* Sub-Communities & Current Projects */}
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
              ZONES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Districts & Zones
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Within the wider Dubai Maritime City project, different zones are planned with distinct characteristicseach designed to serve specific functions within the master community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {subCommunities.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={zone.image}
                  alt={zone.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-custom">
                    {zone.name}
                  </h3>
                  <p className="text-gray-200 font-custom3">
                    {zone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Dubai Maritime City */}
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
              Why Choose Dubai Maritime City
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              <span className="font-semibold text-black">Dubai Maritime City</span> stands out among Dubai&apos;s waterfront communities for several key reasons:
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
                    A unique &quot;working waterfront&quot; identity in Dubai
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Strong location between Port Rashid and major city hubs
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Mixed-use master plan supporting residential + commercial demand
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Ongoing development phases to add long-term value
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Backed by DP World&apos;s global maritime expertise
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
              Investment Potential & Off-Plan Structure
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              From an investment point of view,{" "}
              <span className="font-semibold text-black">
                Dubai Maritime City
              </span>{" "}
              combines several strong points
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
      {/* <LandingPageGallery
        images={galleryImages}
        title="Lifestyle Gallery"
        description="Experience Dubai Maritime City through our visual journey"
        className="bg-white"
      /> */}

      {/* FAQ Section */}
      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about Dubai Maritime City"
        faqs={faqs}
        className="bg-white"
      />

      {/* CTA Section */}
      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR WATERFRONT OPPORTUNITY"
        title="Ready to Invest in Dubai Maritime City?"
        description="Connect with our property specialists for exclusive insights on this unique waterfront community. Discover available properties, off-plan opportunities, and investment potential in Dubai's distinctive working waterfront."
        ctaText="Request Exclusive Property Details"
        footnote="Waterfront residences • Commercial spaces • Flexible off-plan payment plans"
      />

      {/* Footer */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  DUBAI MARITIME CITY
                </span>
              </div>
              <p className="text-gray-400">
                A working waterfront community with residential, commercial, and leisure life by DP World.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dubai Maritime City Project
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
              Premium Waterfront Real Estate in Dubai | Dubai Maritime City
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
                      Dubai Maritime City Inquiry
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
                      {renderFormStep(step, formData, updateField, formErrors)}

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
                        Your Dubai Maritime City inquiry has been received. Our waterfront specialists will contact you within 24 hours with exclusive property details.
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

// Helper function to render form steps
function renderFormStep(step, formData, updateField, formErrors) {
  switch (step) {
    case 0:
      return (
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
      );
    case 1:
      return (
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
      );
    case 2:
      return (
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
      );
    case 3:
      return (
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
      );
    default:
      return null;
  }
}