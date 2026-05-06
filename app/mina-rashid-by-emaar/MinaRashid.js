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

const unitTypes = [
  {
    name: "1-Bedroom Apartments",
    tag: "Ideal for professionals & waterfront enthusiasts",
    perks: [
      "Modern layouts with marina or sea views",
      "Floor-to-ceiling windows capturing waterfront panoramas",
      "Premium finishes by Emaar Properties",
      "Strong rental potential for waterfront living",
    ],
    image: "/mina-rashid/7.webp",
  },
  {
    name: "2-Bedroom Apartments",
    tag: "Perfect for couples & small families",
    perks: [
      "Spacious living areas with water views",
      "Private balconies overlooking marina or community parks",
      "En-suite master bedrooms with walk-in closets",
      "Direct access to waterfront amenities",
    ],
    image: "/mina-rashid/9.webp",
  },
  {
    name: "3-Bedroom Apartments",
    tag: "Luxury waterfront living with ample space",
    perks: [
      "Corner units with panoramic sea views",
      "Multiple balconies for indoor-outdoor living",
      "Premium fixtures and modern kitchen designs",
      "Ideal for families seeking marina lifestyle",
    ],
    image: "/mina-rashid/10.webp",
  },
  {
    name: "Penthouses",
    tag: "Exclusive top-floor residences",
    perks: [
      "Expansive terraces with private pools",
      "360-degree views of marina and Dubai skyline",
      "Premium luxury finishes throughout",
      "Private elevator access",
    ],
    image: "/mina-rashid/16.jpg",
  },
];

const propertyTypes = ["Townhouse", "Villa", "Apartment"];

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

// Updated Community Statistics
const communityStats = [
  {
    value: "Prime",
    label: "Waterfront Location",
    description: "Historic Port Rashid",
  },
  { value: "Emaar", label: "Developer", description: "Trusted brand" },
  {
    value: "Full-Service",
    label: "Marina",
    description: "Yacht berths available",
  },
  {
    value: "Modern",
    label: "Apartments",
    description: "1-3 Bedrooms + Penthouses",
  },
];

// Updated Waterfront Features
const waterfrontFeatures = [
  {
    icon: FaShip,
    title: "Full-Service Marina",
    description:
      "Yacht berths for various vessel sizes with complete marina services at Mina Rashid Marina",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Canal-Style Pool",
    description:
      "Large central pool with cabanas, sun decks, and resort-style lounging areas",
  },
  {
    icon: FaCompass,
    title: "Waterfront Promenade",
    description:
      "Scenic boardwalk for evening strolls along the marina with dining and retail",
  },
  {
    icon: FaAnchor,
    title: "Cruise Terminal Access",
    description:
      "Proximity to cruise terminals adding international travel atmosphere",
  },
];

// Updated Community Amenities
const communityAmenities = [
  {
    icon: FaWater,
    title: "Swimming Pools",
    description:
      "Multiple pools including family pools and children's play areas",
    image: "/mina-rashid/3.webp",
  },
  {
    icon: FaLeaf,
    title: "Fitness Centers",
    description: "State-of-the-art gyms and wellness facilities for residents",
    image: "/mina-rashid/13.webp",
  },
  {
    icon: FaBuilding,
    title: "Landscaped Parks",
    description: "Green spaces with seating, play areas, and open lawns",
    image: "/mina-rashid/14.webp",
  },
  {
    icon: FaStar,
    title: "Retail & Dining",
    description: "Marina-front restaurants, cafés, and retail outlets",
    image: "/mina-rashid/hero.webp",
  },
  {
    icon: FaCompass,
    title: "Cycling Paths",
    description: "Dedicated jogging and cycling tracks around waterfront",
    image: "/mina-rashid/15.jpg",
  },
  {
    icon: FaUsers,
    title: "Hotels",
    description: "Boutique hotels and hospitality options within community",
    image: "/mina-rashid/16.webp",
  },
];

// Updated Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "Waterfront Appreciation",
    description:
      "Prime waterfront location ensures strong capital growth potential for Mina Rashid project",
  },
  {
    icon: FaBuilding,
    title: "Emaar Brand Value",
    description:
      "Developed by Emaar Mina Rashid, Dubai's most trusted real estate developer",
  },
  {
    icon: FaCalendar,
    title: "Off-Plan Opportunities",
    description:
      "Structured payment plans with 80/20 options available for buy in Mina Rashid",
  },
  {
    icon: FaUsers,
    title: "High Rental Demand",
    description:
      "Strong demand for waterfront properties near city center in Mina Rashid",
  },
  {
    icon: FaAnchor,
    title: "Heritage Location",
    description:
      "Historic Port Rashid area with unique character for Mina Rashid Emaar",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Freehold Property",
    description: "Eligible for freehold ownership with Golden Visa potential",
  },
];

// Comparison with other communities
const communityComparison = [
  {
    name: "Mina Rashid",
    features: [
      "Historic port heritage",
      "Cruise terminal access",
      "Less dense",
      "Marina-focused lifestyle",
    ],
  },
  {
    name: "Dubai Marina",
    features: [
      "High-density",
      "Nightlife hub",
      "Established",
      "More expensive",
    ],
  },
  {
    name: "Dubai Creek Harbour",
    features: [
      "Creek views",
      "Modern development",
      "Skyline focus",
      "Still developing",
    ],
  },
  {
    name: "Palm Jumeirah",
    features: [
      "Iconic location",
      "Villa-heavy",
      "Luxury positioning",
      "Tourist-focused",
    ],
  },
];

// Location Connectivity
const locationFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: "Downtown Dubai",
    description: "10-15 minute drive",
  },
  {
    icon: FaCompass,
    title: "Sheikh Zayed Road",
    description: "Direct access",
  },
  {
    icon: FaBuilding,
    title: "DIFC",
    description: "Short commute",
  },
  {
    icon: FaWind,
    title: "DXB Airport",
    description: "15 minutes drive",
  },
];

export default function MinaRashidLanding({ pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [activeMapTab, setActiveMapTab] = useState("map"); // "map" or "visuals"
  const honeypotRef = useRef(null);

  // Sub-Communities Data
  const subCommunities = [
    {
      name: "Sirdhana",
      description: "Sirdhana is a premium waterfront residential project in Mina Rashid, offering modern apartments, marina views, and high-end amenities.",
      image: "/mina-rashid/1.webp",
    },
    {
      name: "Seascape",
      description: "Seascape is a contemporary off-plan project featuring luxury apartments, private beach access, and a vibrant waterfront lifestyle.",
      image: "/mina-rashid/2.webp",
    },
    {
      name: "Seashore",
      description: "Seashore is a beachfront residential project known for direct promenade access, resort-style amenities, and panoramic sea views.",
      image: "/mina-rashid/3.webp",
    },
    {
      name: "Cape Hayat",
      description: "Cape Hayat is an elegant waterfront sub-community offering peaceful living, stylish apartments, and premium facilities.",
      image: "/mina-rashid/4.webp",
    },
    {
      name: "Ocean Cove",
      description: "Ocean Cove is a modern off-plan residential project in Mina Rashid, offering spacious layouts, community views, and strong investment potential.",
      image: "/mina-rashid/Ocean_Cove.webp",
    },
    {
      name: "Marina Place",
      description: "Marina Place is an exclusive marina-facing residential project offering a yachting lifestyle, luxury apartments, and proximity to world-class amenities.",
      image: "/mina-rashid/6.webp",
    },
  ];

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
    {
      src: "/mina-rashid/1.webp",
      width: 800,
      height: 600,
      alt: "Mina Rashid waterfront apartments with marina views",
    },
    {
      src: "/mina-rashid/2.webp",
      width: 800,
      height: 600,
      alt: "Modern apartment interiors at Mina Rashid",
    },
    {
      src: "/mina-rashid/3.webp",
      width: 800,
      height: 600,
      alt: "Marina lifestyle at Mina Rashid by Emaar",
    },
    {
      src: "/mina-rashid/4.webp",
      width: 800,
      height: 600,
      alt: "Waterfront promenade and amenities",
    },
    {
      src: "/mina-rashid/5.webp",
      width: 800,
      height: 600,
      alt: "Community pools and recreational facilities",
    },
    {
      src: "/mina-rashid/6.webp",
      width: 800,
      height: 600,
      alt: "Historic Port Rashid transformation",
    },
    {
      src: "/mina-rashid/7.webp",
      width: 800,
      height: 600,
      alt: "Waterfront views from Mina Rashid",
    },
    {
      src: "/mina-rashid/8.webp",
      width: 800,
      height: 600,
      alt: "Exclusive penthouses with panoramic views",
    },
    {
      src: "/mina-rashid/9.webp",
      width: 800,
      height: 600,
      alt: "Luxury waterfront living with ample space",
    },
    {
      src: "/mina-rashid/10.webp",
      width: 800,
      height: 600,
      alt: "Marina-front residential buildings",
    },
    {
      src: "/mina-rashid/11.webp",
      width: 800,
      height: 600,
      alt: "Residential towers and marina views",
    },
    {
      src: "/mina-rashid/12.webp",
      width: 800,
      height: 600,
      alt: "Waterfront promenade and marina lifestyle",
    },
  ];

  // FAQ Data
  const faqs = [
    {
      q: "Where is Mina Rashid located?",
      a: "Mina Rashid is near Port Rashid on Dubai's coastline. It lies between Old Dubai (Bur Dubai / Deira side) and the main city. It has easy access to major roads and Dubai International Airport.",
    },
    {
      q: "What types of properties are available in Mina Rashid?",
      a: "Primarily 1–3 bedroom apartments in mid-rise buildings, with some larger units and penthouses depending on the phase.",
    },
    {
      q: "Is Mina Rashid freehold?",
      a: "Yes, eligible buyers can buy Mina Rashid Emaar residential buildings as freehold property. These buildings are part of a larger master community.",
    },
    {
      q: "Is Mina Rashid ready or still under construction?",
      a: "Mina Rashid is a multi-phase development. Some buildings are complete and handed over, while others are under construction or newly launched as off plan projects.",
    },
    {
      q: "Who is Mina Rashid suitable for?",
      a: "It suits end-users who want a quieter marina lifestyle near the city. It also suits investors who want branded waterfront off-plan opportunities in a growing port-side district.",
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
    // Clear error when user starts typing
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

    // Clear errors for current step
    setFormErrors({});

    if (step < stepsTotal - 1) {
      setStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Get honeypot field value
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-mina-rashid-contact", {
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
            source: "Mina Rashid Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/mina-rashid-by-emaar/thankyou");
        } else {
          const errorData = await res.json();
          console.error("Submission error:", errorData);
          setIsSubmitting(false);
          setFormErrors({
            submit:
              errorData.message || "Failed to submit form. Please try again.",
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
        .font-custom4 {
          font-family: WingSong, sans-serif;
        }
      `}</style>

      {/* Clean Hero Section */}
      <LandingHero
        imageSrc="/mina-rashid/hero.webp"
        imageAlt="Mina Rashid Marina Waterfront"
        badgeText="Emaar Properties"
        title="Mina Rashid by Emaar"
        subtitle="Waterfront Community in Port Rashid Dubai"
        description="Discover the transformation of historic Port Rashid into Dubai's premier waterfront community. Experience marina living redefined with luxury residences by Emaar."
        ctaText="Explore Properties"
        onCtaClick={openForm}
        showScrollIndicator
      />

      {/* Overview Section - Split from Hero */}
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
                  Mina Rashid by Emaar
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Mina Rashid by Emaar is a master-planned waterfront residential community developed along Dubai&apos;s historic Port Rashid coastline. Commonly known as Mina Rashid Marina or Rashid Yachts & Marina, the community features a full-service marina, residential buildings, hotels, and retail spaces overlooking the Arabian Gulf.
                  </p>
                  <p>
                    Planned by Emaar, Mina Rashid offers modern seaside apartments, yacht berths, and a promenade-style lifestyle while remaining close to Old Dubai, Deira, and Bur Dubai. When people refer to the Mina Rashid project, they typically mean the entire master development rather than a single residential building. Buyers in Mina Rashid can choose between marina-facing apartments, residences overlooking landscaped internal park areas, and buildings located near the central pool and retail promenade in Port Rashid Dubai.

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
                        Full-service marina with yacht berths
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Modern mid-rise apartment buildings
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Canal-style pool and waterfront promenade
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">
                        Proximity to cruise terminals
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
                  From Historic Port to Modern Marina (Heritage / Throwback)
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-custom3">
                  Before becoming Mina Rashid Emaar, this area was famous simply as Port Rashid a key commercial and passenger port for Dubai. Cruise ships, cargo, and ferry passengers all used this hub for decades.
                </p>
                <p className="text-gray-700 leading-relaxed font-custom3">
                  Dubai plans to change older waterfront industrial zones into mixed-use neighborhoods. The change into a marina community is part of this plan. Cruise terminals, the historic QE2 ship nearby, and the older dock infrastructure give Mina Rashid a clear throwback feel. You do not see this in newer, man-made islands.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/mina-rashid/2.webp"
                  alt="Historic Port Rashid transformation to Mina Rashid"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-custom2">
                  <div className="text-sm font-semibold">
                    Historic Port Rashid
                  </div>
                  <div className="text-xs opacity-90">
                    Now Mina Rashid Marina
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* Waterfront Lifestyle - Redesigned */}
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
              Mina Rashid Marina & Waterfront Lifestyle
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Living in Mina Rashid Marina is built around direct contact with the water
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
                  Mina Rashid Marina is the centerpiece of the community and defines its waterfront lifestyle. Designed as a modern yacht marina, the area includes berthing facilities, a marina promenade, and leisure-focused open spaces that enhance everyday living.
                </p>
                <p className="text-gray-700 font-custom3">
                  Residents enjoy scenic sea views, pedestrian-friendly walkways, and easy access to dining and leisure venues along the waterfront. As part of the wider Port Rashid redevelopment, Mina Rashid Marina combines relaxed coastal living with the convenience of a centrally located Dubai community.

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
                      Professionals, families, investors
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
                      Multi-phase, some complete, others off-plan
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

      {/* Location & Connectivity - Redesigned */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16" z
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              LOCATION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Location & Connectivity – Port Rashid Dubai
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Located in Port Rashid Dubai, Mina Rashid by Emaar benefits from excellent connectivity to major destinations across the city.

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
            {/* Tab Buttons */}
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

            {/* Tab Content */}
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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14432.87154107616!2d55.28682864670109!3d25.26325489100919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43d555eed1c3%3A0x8862f7c1ce1313d6!2sEmaar%20Mina%20Rashid%20Yacht%20%26%20Marina!5e0!3m2!1sen!2s!4v1769595704566!5m2!1sen!2s"
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
                    src="/mina-rashid/map.png"
                    alt="Mina Rashid Location Map - Master Plan Layout"
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
                  <span>Easy access to Sheikh Rashid Road.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>
                    Close to Old Dubai, Deira, and Bur Dubai.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Short drive to Downtown Dubai.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1 flex-shrink-0" />
                  <span>Convenient access to Dubai International Airport.</span>
                </li>
              </ul>
              <p className="text-gray-600 mt-6 leading-relaxed font-custom3">
                Its location within the historic Port Rashid area allows residents to enjoy a calm waterfront environment while staying well connected to Dubai&apos;s commercial, cultural, and business districts.
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

      {/* Property Types - Redesigned */}
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
              Residential Options in Mina Rashid
            </h2>
            <p className="text-gray-700 text-lg max-w-7xl mx-auto leading-relaxed font-custom3">
              Mina Rashid offers a selection of modern waterfront apartments designed to suit a variety of lifestyle needs. Residential options include apartments with direct marina views, residences overlooking landscaped internal parks, and homes located near the central pool and retail promenade.</p>
            <p className="text-gray-700 text-lg max-w-7xl mx-auto leading-relaxed font-custom3">
              Apartments in Mina Rashid feature contemporary layouts, open-plan interiors, and access to community amenities. Buyers interested in residential opportunities can explore a range of apartments for sale in Mina Rashid, suitable for both end-users and long-term investors seeking waterfront properties in Port Rashid Dubai.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
                    alt={unit.name + " at Mina Rashid"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                      Mina Rashid
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

      {/* Master Plan - Redesigned */}
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
              Master Development at Mina Rashid
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The Mina Rashid master development represents a large-scale transformation of Dubai’s historic port area into a modern residential and lifestyle destination. Rather than focusing on a single building, the development integrates residential communities, marina facilities, hospitality offerings, retail outlets, and public waterfront spaces into one cohesive master plan.
              .
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaBuilding className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Residential Buildings
              </h3>
              <p className="text-gray-700 font-custom3">
                Residential mid-rise buildings with marina or sea views
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaShip className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Hotels & Hospitality
              </h3>
              <p className="text-gray-700 font-custom3">
                Hotels and boutique hotels along the waterfront
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaWater className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Central Canal Pool
              </h3>
              <p className="text-gray-700 font-custom3">
                A large central canal-style pool and boardwalk
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaAnchor className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Cruise Terminals
              </h3>
              <p className="text-gray-700 font-custom3">
                Cruise terminals and yacht berths
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaStar className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Retail Promenade
              </h3>
              <p className="text-gray-700 font-custom3">
                Retail, cafés, and restaurants along the promenade
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <FaLeaf className="text-black text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                Landscaped Parks
              </h3>
              <p className="text-gray-700 font-custom3">
                Multiple landscaped parks and open spaces
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Amenities - Redesigned with Images */}
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
              Mina Rashid is planned with a wide mix of amenities that support both residents and visitors. All of this makes Emaar Mina Rashid more than just a group of buildings – it becomes a full waterfront lifestyle destination.
            </p>
          </motion.div>

          {/* Image Grid with All Amenity Cards */}
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
                  alt={`${amenity.title} at Mina Rashid`}
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
              SUB-COMMUNITIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Sub-Communities & Current Projects
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Within the wider Mina Rashid project, different clusters are launched as separate off-plan phases. These are typically mid-rise apartment buildings with distinct characteristics.
            </p>
          </motion.div>

          {/* Sub-Communities Grid - 3 columns, 2 rows */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {subCommunities.map((community, index) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-custom">
                    {community.name}
                  </h3>
                  <p className="text-gray-200 font-custom3">
                    {community.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-custom">
              Comparing Off-Plan Phases at Mina Rashid
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed font-custom3">
              Each phase usually offers 1–3 bedroom apartments with slightly
              different layouts, views, and amenity access. For anyone researching off plan projects at Mina Rashid is helpful to compare:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700 font-custom3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>
                  Proximity to the marina versus internal community parks
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-custom3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Building height and orientation (view lines)</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 font-custom3">
                <FaCheck className="text-black mt-1 flex-shrink-0" />
                <span>Planned retail and school / nursery options nearby</span>
              </li>
            </ul>
          </div> */}
        </div>
      </section>

      {/* Why Choose Mina Rashid by Emaar */}
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
              Why Choose Mina Rashid by Emaar
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              <span className="font-semibold text-black">Mina Rashid by Emaar</span> stands out among Dubai&apos;s waterfront communities for several key reasons:
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
                    Prime waterfront location in Port Rashid Dubai
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Marina-focused lifestyle at Mina Rashid Marina
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Central connectivity near Old Dubai and Bur Dubai
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Limited supply of marina communities in Dubai
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Strong long-term investment and lifestyle potential
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700 font-custom3">
                  <FaCheck className="text-black mt-1 flex-shrink-0 text-xl" />
                  <span className="text-lg leading-relaxed">
                    Backed by the trusted Emaar Mina Rashid development vision
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Benefits - Redesigned */}
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
                Emaar Mina Rashid
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

          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gray-50 rounded-3xl p-10 shadow-2xl border border-gray-200"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 font-custom">
              Off-Plan Structure & Payment Plans
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="font-custom3">
                <p className="mb-4 leading-relaxed text-gray-700">
                  Many new phases at Mina Rashid are sold as off plan projects,
                  which means buyers commit during construction with structured
                  payment plans rather than paying the full amount upfront.
                </p>
                <p className="leading-relaxed text-gray-700">
                  A common payment plan for similar launches is the 80/20 style.
                  Buyers pay a larger part during construction and a smaller
                  part on handover. The exact ratios and schedules depend on the
                  specific launch and official offer at the time. For someone
                  planning to buy in Mina Rashid for investment, these are key considerations.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
                <h4 className="font-bold text-lg mb-4 text-gray-900 font-custom2">
                  Key Considerations for Investors
                </h4>
                <ul className="space-y-3 font-custom3">
                  <li className="flex items-start gap-3">
                    <FaCheck className="text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Entry price versus other waterfront areas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheck className="text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Expected rental demand once more buildings and amenities
                      are complete
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheck className="text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Timeline of handover for the chosen phase
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Community Comparison - Redesigned */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 font-custom2">
              COMPARISON
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-custom">
              Comparison with Other Waterfront Communities
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto font-custom3">
              Mina Rashid offers unique advantages compared to other Dubai
              waterfront areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityComparison.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-2xl p-6 ${community.name === "Mina Rashid"
                  ? "bg-gray-900 text-white shadow-2xl hover:scale-105 border border-gray-700"
                  : "bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-200"
                  } transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold font-custom2">
                    {community.name}
                  </h3>
                  {community.name === "Mina Rashid" && (
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold font-custom2">
                      Recommended
                    </span>
                  )}
                </div>
                <ul className="space-y-3">
                  {community.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm font-custom3"
                    >
                      <FaCheck
                        className={`mt-1 flex-shrink-0 ${community.name === "Mina Rashid"
                          ? "text-gray-300"
                          : "text-black"
                          }`}
                      />
                      <span
                        className={
                          community.name === "Mina Rashid"
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 max-w-2xl mx-auto font-custom3">
              This comparison helps position Mina Rashid clearly for buyers
              comparing multiple seafront options. Mina Rashid combines historic
              port heritage with modern marina living in a unique waterfront
              setting.
            </p>
          </div>
        </div>
      </section> */}

      {/* gallery section */}

      <LandingPageGallery
        images={galleryImages}
        title="Lifestyle Gallery"
        description="Experience the Mina Rashid by Emaar through our visual journey"
        className="bg-white"
      />

      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about Mina Rashid"
        faqs={faqs}
        className="bg-white"
      />

      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR WATERFRONT OPPORTUNITY"
        title="Ready to Buy in Mina Rashid?"
        description="Join the exclusive community transforming Dubai's historic Port Rashid into a premium waterfront destination. Explore off-plan opportunities and secure your place in Mina Rashid today."
        ctaText="Request Exclusive Property Details"
        footnote="Limited waterfront availability at Mina Rashid • Heritage location benefits • Flexible 80/20 payment plans available"
      />

      {/* Footer - Redesigned */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  MINA RASHID
                </span>
              </div>
              <p className="text-gray-400">
                Transforming Dubai&apos;s historic Port Rashid into a premium
                waterfront community by Emaar Properties.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mina Rashid Project
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
              Premium Waterfront Real Estate in Dubai | Mina Rashid by Emaar
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Form Popup - Redesigned */}
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
                      Mina Rashid Inquiry
                    </h3>
                    <p className="text-gray-300 font-custom3">
                      Get details about properties in Mina Rashid
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
                        Your Mina Rashid inquiry has been received. Our
                        waterfront specialists will contact you within 24 hours
                        with exclusive property details.
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
      
      {/* Meta Pixel */}
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
            Are you a first-time:
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
            What is your budget?
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