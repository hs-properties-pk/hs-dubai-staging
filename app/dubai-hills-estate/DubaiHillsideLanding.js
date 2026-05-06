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
  FaGolfBall,
  FaMountain,
  FaRoad,
  FaHeart,
  FaTree,
  FaShoppingBag,
  FaSwimmingPool,
  FaDumbbell,
  FaSchool,
  FaCrown,
  FaTrophy,
  FaShieldAlt,
  FaHome,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaLocationDot,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import LandingPageGallery from "@/components/LandingPageGallery";
import LandingHero from "@/components/LandingHero";
import LandingFaqs from "@/components/LandingFaqs";
import LandingCta from "@/components/LandingCta";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";

const unitTypes = [
  {
    name: "1-Bedroom Apartments",
    tag: "Ideal for professionals & investors",
    perks: [
      "Efficient open-plan layouts with thoughtful storage",
      "Floor-to-ceiling windows with park or city views",
      "Finishes reflecting luxury community standards",
      "Attractive rental & holiday home potential",
    ],
    image: "/palace_residences_hillside/11.webp",
  },
  {
    name: "2-Bedroom Apartments",
    tag: "For couples & growing families",
    perks: [
      "Generous living/dining zones for entertaining",
      "En-suite master with ample wardrobe space",
      "Balconies oriented towards greens or skyline",
      "Direct access to community amenities & pool deck",
    ],
    image: "/palace_residences_hillside/12.webp",
  },
  {
    name: "3-Bedroom Apartments",
    tag: "Spacious, corner-style homes",
    perks: [
      "Multiple orientations for natural light",
      "Space for study, guest room or playroom",
      "Premium finishes and modern design",
      "Perfect for end-users seeking more space",
    ],
    image: "/palace_residences_hillside/10.webp",
  },
  {
    name: "Townhouses & Villas",
    tag: "Private family living within Dubai Hills Estate",
    perks: [
      "Multi-level layouts for privacy & zoning",
      "Private gardens and terraces",
      "Easy access to parks & community amenities",
      "Great for families desiring indoor-outdoor living",
    ],
    image: "/palace_residences_hillside/5.webp",
  },
];

const propertyTypes = [
  "1-Bedroom Apartments",
  "2-Bedroom Apartments",
  "3-Bedroom Apartments",
  "Townhouses & Villas",
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

// Lifestyle features (for LIFESTYLE section – Mina Rashid style)
const lifestyleFeatures = [
  {
    icon: FaGolfBall,
    title: "Championship Golf",
    description: "18-hole Dubai Hills Golf Club with clubhouse, dining and pro shop at the heart of the community.",
  },
  {
    icon: FaTree,
    title: "Parks & Green Spaces",
    description: "Over 1.4 million sq.m of parks, Dubai Hills Park, and 54 km of cycling and jogging routes.",
  },
  {
    icon: FaHeart,
    title: "Family Living",
    description: "Schools, nurseries, healthcare, playgrounds and community facilities designed for family life.",
  },
  {
    icon: FaShoppingBag,
    title: "Mall & Retail",
    description: "Dubai Hills Mall with retail, entertainment and dining, plus local community centres.",
  },
];

// Community Statistics
const communityStats = [
  {
    value: "11M",
    label: "Total Area",
    description: "sq.m prime land",
  },
  { value: "1.4M+", label: "Community Parks", description: "sq.m green spaces" },
  {
    value: "54",
    label: "Cycling Routes",
    description: "km dedicated tracks",
  },
  {
    value: "18-Hole",
    label: "Golf Course",
    description: "Championship course",
  },
];

// Sub-communities data (with image for Mina Rashid–style cards)
const subCommunities = [
  {
    name: "Sidra",
    description: "Villa clusters with 3-5 bedroom homes near parks and schools. Family-focused with private plots and close access to amenities.",
    image: "/palace_residences_hillside/5.webp",
  },
  {
    name: "Maple",
    description: "Townhouse neighbourhoods with green corridors and community facilities. Green living, play areas and shared community spaces.",
    image: "/palace_residences_hillside/6.webp",
  },
  {
    name: "Golf Place",
    description: "Exclusive villa areas next to the championship golf course. Golf views, larger homes and premium location.",
    image: "/palace_residences_hillside/8.webp",
  },
  {
    name: "Collective",
    description: "Apartment buildings emphasizing shared spaces for professionals. Modern design, shared amenities and urban lifestyle.",
    image: "/palace_residences_hillside/10.webp",
  },
];

// Community Highlights
const highlights = [
  {
    icon: FaGolfBall,
    title: "Championship Golf Course",
    description:
      "18-hole championship golf course with club facilities and dining, offering stunning views of the Dubai skyline.",
  },
  {
    icon: FaShoppingBag,
    title: "Dubai Hills Mall",
    description:
      "Large regional mall with hundreds of retail outlets, hypermarket, entertainment, and dining options.",
  },
  {
    icon: FaTree,
    title: "Extensive Parks & Green Spaces",
    description:
      "Over 1.4 million square metres of parks and open spaces, including the central Dubai Hills Park.",
  },
  {
    icon: FaBuilding,
    title: "Emaar Master-Plan",
    description:
      "Developed by Emaar Properties, combining ideas from Emirates Hills, The Greens, and Arabian Ranches.",
  },
  {
    icon: FaRoad,
    title: "Central Location",
    description:
      "Positioned between Downtown Dubai and Dubai Marina, with easy access to Al Khail Road and Sheikh Zayed Road.",
  },
  {
    icon: FaHeart,  
    title: "Family-Focused Community",
    description:
      "Designed as a long-term, family-focused community with schools, healthcare, and recreational facilities.",
  },
];

// Amenities
const amenities = [
  {
    icon: FaGolfBall,
    title: "Dubai Hills Golf Club",
    description:
      "18-hole championship course with clubhouse, dining, and pro shop",
    image: "/palace_residences_hillside/1.webp",
  },
  {
    icon: FaTree,
    title: "Dubai Hills Park",
    description:
      "180,000 sq.m central park with sports courts, play areas, and lawns",
    image: "/palace_residences_hillside/9.webp",
  },
  {
    icon: FaShoppingBag,
    title: "Retail & Dining",
    description: "Dubai Hills Mall and local community retail centers",
    image: "/palace_residences_hillside/8.webp",
  },
  {
    icon: FaSchool,
    title: "Education Facilities",
    description: "Schools and nurseries including GEMS Wellington Academy",
    image: "/palace_residences_hillside/5.webp",
  },
  {
    icon: FaRoad,
    title: "Cycling & Jogging",
    description: "54 km of dedicated cycling and jogging routes",
    image: "/palace_residences_hillside/6.webp",
  },
  {
    icon: FaSwimmingPool,
    title: "Community Pools",
    description: "Swimming pools and wellness facilities throughout",
    image: "/palace_residences_hillside/7.webp",
  },
];

// Investment Benefits
const investmentBenefits = [
  {
    icon: FaChartLine,
    title: "Prime Location Investment",
    description:
      "Central location in Mohammed Bin Rashid City ensures strong capital appreciation",
  },
  {
    icon: FaBuilding,
    title: "Emaar Brand Assurance",
    description:
      "Backed by Emaar Properties, Dubai's most trusted real estate developer",
  },
  {
    icon: FaCalendar,
    title: "Off-Plan Opportunities",
    description:
      "Various off-plan properties and off-plan real estate available with flexible payment plan options",
  },
  {
    icon: FaUsers,
    title: "Strong Rental Demand",
    description: "High rental demand in Dubai's premier family community",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Investment",
    description:
      "Protected by UAE escrow laws and Emaar's established reputation",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Golden Visa Eligibility",
    description:
      "Qualify for UAE Golden Visa with eligible property investments",
  },
];

// Why Choose Dubai Hills Estate (for WHY CHOOSE section)
const whyChoosePoints = [
  "Prime location in Mohammed Bin Rashid City between Downtown Dubai and Dubai Marina",
  "18-hole championship golf course and 1.4M+ sq.m of parks and green spaces",
  "54 km of dedicated cycling and jogging routes for an active lifestyle",
  "Dubai Hills Mall and community retail within the estate",
  "Family-focused with schools, nurseries and healthcare facilities",
  "Emaar and Meraas development with strong investment and rental demand",
  "Freehold and Golden Visa eligible for qualified buyers",
];

// Location Features
const locationFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: "Downtown Dubai",
    description: "15 minutes drive",
  },
  {
    icon: FaCompass,
    title: "Dubai Marina",
    description: "15 minutes drive",
  },
  {
    icon: FaBuilding,
    title: "Dubai Hills Mall",
    description: "Within community",
  },
  {
    icon: FaWind,
    title: "DXB Airport",
    description: "20 minutes drive",
  },
];

// FAQ Data
const faqs = [
  {
    q: "What is Dubai Hills Estate?",
    a: "Dubai Hills Estate is a master-planned community by Emaar Properties within Mohammed Bin Rashid City. It's one of the first large residential communities in the area, offering a greener, low- to mid-rise alternative to dense urban districts while maintaining central connectivity. The community features an 18-hole championship golf course, Dubai Hills Mall, extensive parks, and diverse residential options.",
  },
  {
    q: "Where is Dubai Hills Estate located?",
    a: "Dubai Hills Estate is located off Al Khail Road, between Downtown Dubai and Dubai Marina, within the wider Mohammed Bin Rashid City. This central position allows residents to reach key business districts, major malls, and Dubai International Airport within a relatively short drive.",
  },
  {
    q: "What types of properties are available in Dubai Hills Estate?",
    a: "The community offers a wide mix of property types including 1-3 bedroom apartments in mid-rise buildings, 3-5 bedroom townhouses in communities like Maple and Club Villas, and larger villas & mansions in areas such as Sidra, Golf Place, Majestic Vistas, Hills View and Hills Grove.",
  },
  {
    q: "Who is the developer of Dubai Hills Estate?",
    a: "Dubai Hills Estate is developed by Emaar Properties in joint venture with Meraas. Emaar is one of the leading real estate companies in Dubai, known for large-scale communities such as Downtown Dubai, Dubai Marina, Arabian Ranches, and Emirates Hills.",
  },
  {
    q: "What are the main landmarks in Dubai Hills Estate?",
    a: "The three main landmarks are: 1) Dubai Hills Golf Club - an 18-hole championship course, 2) Dubai Hills Mall - a large regional mall with retail and entertainment, and 3) Dubai Hills Park - a central park with sports facilities and green spaces spanning about 180,000 square metres.",
  },
  {
    q: "Is Dubai Hills Estate family-friendly?",
    a: "Yes, Dubai Hills Estate is specifically designed as a family-focused community. It includes schools, nurseries, healthcare facilities, extensive parks, playgrounds, and 54 km of dedicated cycling and jogging routes. The low- to mid-rise layout creates a calmer environment than high-rise districts.",
  },
  {
    q: "Are there off-plan properties available in Dubai Hills Estate?",
    a: "Yes, Dubai Hills Estate continues to see new off-plan property launches. These off-plan real estate options typically come with structured payment plan arrangements during construction, offering opportunities for investors and end-users.",
  },
  {
    q: "What is the master plan of Dubai Hills Estate?",
    a: "The master plan covers around 2,700 acres (11 million square metres) laid out as a series of neighbourhoods around a central golf course, main park, and mall. Over 1.4 million square metres are dedicated to parks and open spaces, creating the 'Green Heart of Dubai'.",
  },
  {
    q: "How is the connectivity from Dubai Hills Estate?",
    a: "The community connects directly to Al Khail Road with easy links to Sheikh Zayed Road, Dubai International Airport, and other city parts. Most residents can reach Downtown Dubai or Dubai Marina in about 15 minutes, with similar travel times to major business districts.",
  },
  {
    q: "What lifestyle can residents expect in Dubai Hills Estate?",
    a: "Residents can expect a suburban-style lifestyle with strong emphasis on greenery, outdoor activities, and community living. The presence of parks, golf course, walking routes, retail centers, and schools supports day-to-day life without needing to leave the community frequently.",
  },
];

export default function DubaiHillsEstateLanding({ pixelId }) {
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

  const galleryImages = [
    {
      src: "/palace_residences_hillside/1.webp",
      width: 800,
      height: 600,
      alt: "Luxury living at Dubai Hills Estate by Emaar",
    },
    {
      src: "/palace_residences_hillside/2.webp",
      width: 800,
      height: 600,
      alt: "Modern community design in Dubai Hills Estate",
    },
    {
      src: "/palace_residences_hillside/3.webp",
      width: 800,
      height: 600,
      alt: "Panoramic views from Dubai Hills Estate residences",
    },
    {
      src: "/palace_residences_hillside/4.webp",
      width: 800,
      height: 600,
      alt: "Community amenities and facilities",
    },
    {
      src: "/palace_residences_hillside/5.webp",
      width: 800,
      height: 600,
      alt: "Townhouses and villas in Dubai Hills Estate",
    },
    {
      src: "/palace_residences_hillside/6.webp",
      width: 800,
      height: 600,
      alt: "Green spaces and parks in the community",
    },
    {
      src: "/palace_residences_hillside/7.webp",
      width: 800,
      height: 600,
      alt: "Dubai Hills Mall and retail facilities",
    },
    {
      src: "/palace_residences_hillside/8.webp",
      width: 800,
      height: 600,
      alt: "Golf course and leisure facilities",
    },
    {
      src: "/palace_residences_hillside/9.webp",
      width: 800,
      height: 600,
      alt: "Family-friendly community spaces",
    },
    {
      src: "/palace_residences_hillside/10.webp",
      width: 800,
      height: 600,
      alt: "Modern apartment interiors",
    },
    {
      src: "/palace_residences_hillside/11.webp",
      width: 800,
      height: 600,
      alt: "Community infrastructure and design",
    },
    {
      src: "/palace_residences_hillside/12.webp",
      width: 800,
      height: 600,
      alt: "Lifestyle amenities at Dubai Hills Estate",
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
        const res = await fetch("/api/send-dubai-hills-estate-contact", {
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
            source: "Dubai Hills Estate Landing Page",
          }),
        });

        if (res.ok) {
          router.push("/dubai-hills-estate/thankyou");
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

      <LandingHero
        imageSrc="/palace_residences_hillside/3.webp"
        imageAlt="Dubai Hills Estate community overview"
        badgeText="Emaar Properties"
        title="Dubai Hills Estate"
        subtitle="The Green Heart of Dubai"
        description="Dubai Hills Estate by Emaar Properties is one of Dubai's premier master-planned communities in Mohammed Bin Rashid City. Spanning 11 million square metres of prime land, it offers a greener, family-focused alternative to dense urban districts while maintaining excellent central connectivity."
        ctaText="Explore Properties"
        onCtaClick={openForm}
        showScrollIndicator
      />

      {/* Overview Section - Mina Rashid style */}
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
                  Dubai Hills Estate
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    Dubai Hills Estate by Emaar Properties is one of Dubai&apos;s premier master-planned communities in Mohammed Bin Rashid City. Emaar and Meraas developed it as a city within a city, offering a greener, low- to mid-rise alternative to dense urban districts while remaining central.
                  </p>
                  <p>
                    Set on around 11 million square metres of prime land, the community was designed around an 18-hole championship golf course, extensive parks, and neighbourhood centres. Today it includes apartments, townhouses, villas, Dubai Hills Mall, and Dubai Hills Park – often called the &quot;green heart of Dubai&quot; and known as a long-term, family-focused community.
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
                      <span className="text-gray-700">18-hole championship golf course</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">Dubai Hills Mall and community retail</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">1.4M+ sq.m parks and green spaces</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCheck className="text-black flex-shrink-0" />
                      <span className="text-gray-700">54 km cycling and jogging routes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emaar – Developer Profile */}
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
                Dubai Hills Estate reflects the vision of Emaar Properties, one of Dubai&apos;s most established and trusted real estate developers. Developed in joint venture with Meraas, the community brings Emaar&apos;s expertise in master-planned communities – from Downtown Dubai and Dubai Marina to Arabian Ranches and Emirates Hills – to create a greener, family-focused hub in Mohammed Bin Rashid City.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 font-custom3">
                The development emphasises quality construction, extensive green spaces, integrated retail and leisure, and long-term value, giving buyers confidence when considering Dubai Hills Estate by Emaar.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle – Dubai Hills Estate */}
      <section className="py-20 bg-white relative overflow-hidden">
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
              Dubai Hills Estate Lifestyle
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Living at Dubai Hills is built around golf, parks, family amenities and central connectivity
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lifestyleFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                  {(() => {
                    const Icon = feature.icon;
                    return <Icon className="text-black text-2xl" />;
                  })()}
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
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-custom">
              Everyday Living: Residents, Lifestyle & Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4 font-custom3">
                  Dubai Hills Estate is designed as a complete family community with schools, nurseries, healthcare, parks, and 54 km of cycling and jogging routes. Residents enjoy the 18-hole golf course, Dubai Hills Mall, and a low- to mid-rise layout that feels calmer than high-rise districts.
                </p>
                <p className="text-gray-700 font-custom3">
                  Positioned between Downtown Dubai and Dubai Marina with easy access to Al Khail Road and Sheikh Zayed Road, the community appeals to families, professionals and investors seeking a long-term home or a strong rental and capital appreciation story.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <FaUsers className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">Target Residents</h4>
                    <p className="text-gray-600 text-sm font-custom3">Families, professionals, investors</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <FaCalendar className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">Development Phase</h4>
                    <p className="text-gray-600 text-sm font-custom3">Mature community, resale and off-plan available</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <FaChartLine className="text-black text-2xl flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 font-custom2">Investment Type</h4>
                    <p className="text-gray-600 text-sm font-custom3">Freehold, Golden Visa eligible</p>
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
              Prime Location & Connectivity
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              The community connects directly to Al Khail Road with easy links to Sheikh Zayed Road, Dubai International Airport, and other city parts
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
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57805.472963545326!2d55.2375412!3d25.1072072!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6976ed4766a3%3A0xb2b2d7132a5134a8!2sDubai%20Hills%20Estate!5e0!3m2!1sen!2s!4v1772017331622!5m2!1sen!2s"
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
                    src="https://dubaioffplanfinder.com/wp-content/uploads/2024/08/PARKLAND_DHE_MASTERPLAN_MAP_page-0001-1-scaled.jpg"
                    alt="Dubai Hills Estate Location Map - Master Plan Layout"
                    width={1400}
                    height={800}
                    className="w-full h-auto"
                    priority
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
                  {(() => {
                    const Icon = feature.icon;
                    return <Icon className="text-2xl text-black" />;
                  })()}
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

      {/* Key Landmarks Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              LANDMARKS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Key Community Landmarks
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Three main landmarks define the Dubai Hills Estate lifestyle and experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <FaGolfBall className="text-gray-700 text-5xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                  Dubai Hills Golf Club
                </h3>
                <p className="text-gray-600 font-custom3">
                  18-hole championship golf course with views towards the
                  Downtown skyline, complete with club facilities, dining
                  options, and pro shop.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <FaShoppingBag className="text-gray-700 text-5xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                  Dubai Hills Mall
                </h3>
                <p className="text-gray-600 font-custom3">
                  Large regional mall spanning 282,000 square metres with
                  hundreds of retail outlets, hypermarket, entertainment venues,
                  and dining options.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <FaTree className="text-gray-700 text-5xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 font-custom2">
                  Dubai Hills Park
                </h3>
                <p className="text-gray-600 font-custom3">
                  Central park spanning about 180,000 square metres with jogging
                  tracks, play areas, sports courts, splash zones, and open
                  lawns for community activities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

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
              PROPERTIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Property Types in Dubai Hills Estate
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Dubai Hills real estate offers a wide mix of home types, making it
              suitable for different budgets and lifestyles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {unitTypes.map((unit, index) => (
              <motion.div
                key={unit.name}
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                      Dubai Hills
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
                    Inquire About {unit.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Highlights */}
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
              Community Highlights
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Dubai Hills Estate redefines luxury living with exclusive features and world-class amenities in Dubai&apos;s greenest community
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
                  {(() => {
                    const Icon = highlight.icon;
                    return <Icon className="text-black text-2xl" />;
                  })()}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 font-custom2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 font-custom3">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Amenities Section with Images */}
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
              Experience resort-style living with premium amenities designed for your comfort and wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
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
                  alt={`${amenity.title} at Dubai Hills Estate`}
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

      {/* Sub-Communities Section – Mina Rashid style image cards */}
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
              Major Sub-Communities & Neighbourhoods
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Dubai Hills Estate is divided into several distinct sub-communities, each with its own character and appeal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-custom">
                    {community.name}
                  </h3>
                  <p className="text-gray-200 font-custom3 text-sm leading-relaxed">
                    {community.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor Activities Section */}
      {/* <section className="py-20 bg-gray-50">
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
                  OUTDOOR LIVING
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
                  Parks, Open Spaces & Outdoor Activities
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed font-custom3">
                  <p>
                    One of the strongest features about Dubai Hills Estate is its
                    focus on outdoor living and active lifestyles with extensive Community Parks.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-black mt-1 flex-shrink-0" />
                      <span>Over 1.45 million sqm of parks and open spaces</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-black mt-1 flex-shrink-0" />
                      <span>
                        54 km of dedicated cycling and jogging routes weaving
                        through neighbourhoods
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-black mt-1 flex-shrink-0" />
                      <span>
                        Central park with play zones and sports facilities
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheck className="text-black mt-1 flex-shrink-0" />
                      <span>
                        Community Parks and corridors for safe walking and cycling
                      </span>
                    </li>
                  </ul>
                  <p>
                    This extensive network supports the &quot;green heart&quot; concept of
                    the masterplan, allowing residents to walk, run, or cycle
                    safely without frequently crossing major roads.
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
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/palace_residences_hillside/5.webp"
                  alt="Outdoor activities in Dubai Hills Estate"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Education & Healthcare Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-black font-bold tracking-widest mb-2 uppercase text-sm font-custom2">
              FAMILY SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-custom">
              Schools, Nurseries & Healthcare Facilities
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              Dubai Hills Estate is designed as a complete family community with essential services integrated into its layout
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <FaSchool className="text-black text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-custom2">
                  Education Facilities
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1" />
                  <div>
                    <p className="font-medium text-gray-700 font-custom3">Nurseries</p>
                    <p className="text-gray-600 text-sm font-custom3">
                      Blossom Dubai Hills, Raffles Early Childhood Centre
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1" />
                  <div>
                    <p className="font-medium text-gray-700 font-custom3">Schools</p>
                    <p className="text-gray-600 text-sm font-custom3">
                      GEMS Wellington Academy, GEMS New Millennium School
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1" />
                  <div>
                    <p className="font-medium text-gray-700 font-custom3">Curricula</p>
                    <p className="text-gray-600 text-sm font-custom3">
                      Various international curricula available
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <FaHeart className="text-black text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-custom2">
                  Healthcare Services
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1" />
                  <div>
                    <p className="font-medium text-gray-700 font-custom3">
                      Clinics & Medical Centres
                    </p>
                    <p className="text-gray-600 text-sm font-custom3">
                      Multiple healthcare facilities within the community
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1" />
                  <div>
                    <p className="font-medium text-gray-700 font-custom3">
                      Accessible Hospitals
                    </p>
                    <p className="text-gray-600 text-sm font-custom3">
                      Major hospitals within short driving distance
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="text-black mt-1" />
                  <div>
                    <p className="font-medium text-gray-700 font-custom3">
                      Pharmacy Services
                    </p>
                    <p className="text-gray-600 text-sm font-custom3">
                      Convenient pharmacy access throughout
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Why Choose Dubai Hills Estate */}
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
              Why Choose Dubai Hills Estate
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-custom3">
              <span className="font-semibold text-black">Dubai Hills Estate</span> stands out among Dubai&apos;s master-planned communities for several key reasons:
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
              Dubai Hills Estate offers a promising investment opportunity with strong capital appreciation potential and premium lifestyle benefits
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
                  {(() => {
                    const Icon = benefit.icon;
                    return <Icon className="text-black text-2xl" />;
                  })()}
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
        title="Dubai Hills Estate Gallery"
        description="Experience the Luxury Community Living at Dubai Hills Estate by Emaar"
        className="bg-white"
      />

      <LandingFaqs
        sectionLabel="FAQ"
        heading="Frequently Asked Questions"
        description="Everything you need to know about Dubai Hills Estate"
        faqs={faqs}
        className="bg-white"
      />

      <LandingCta
        openForm={openForm}
        sectionLabel="YOUR GREEN HEART OPPORTUNITY"
        title="Ready to Live in Dubai's Green Heart?"
        description="Join the exclusive community of Dubai Hills Estate homeowners. Limited properties available in Dubai's premier master-planned community with premium amenities and central location."
        ctaText="Get Exclusive Property Information"
        footnote="Limited availability • Prime locations • Various payment plans available"
        stats={[
          { value: "1-5 BR", label: "Property Types" },
          { value: "11M", label: "sq.m Total Area" },
          { value: "54 km", label: "Cycling Routes" },
          { value: "18", label: "Golf Holes" },
        ]}
      />

      {/* Footer */}
      <footer className="bg-black py-16 font-custom3">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-5">
                <span className="text-white font-bold text-xl font-custom">
                  DUBAI HILLS
                </span>
              </div>
              <p className="text-gray-400">
                Dubai&apos;s premier master-planned community by Emaar Properties.
                The Green Heart of Dubai, offering luxury living with world-class amenities.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 font-custom2">
                Quick Links
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dubai Hills Estate
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
              Premium Real Estate Communities in Dubai | Dubai Hills Estate by Emaar
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Form Popup */}
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
                      Dubai Hills Estate Inquiry
                    </h3>
                    <p className="text-gray-300 font-custom3">
                      Get details about properties in Dubai&apos;s green heart
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
                        Your Dubai Hills Estate inquiry has been received. Our
                        property specialists will contact you within 24 hours
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

      {/* Floating CTA */}
      {/* <motion.button
        onClick={openForm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3 hover:bg-gray-900 transition-all font-custom2"
      >
        <span className="font-bold">Get Property Info</span>
        <FaChevronRight />
      </motion.button> */}

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