// app/avana/AvanaLandingPage.js
"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaSwimmingPool,
  FaDumbbell,
  FaTree,
  FaChild,
  FaCar,
  FaShoppingBag,
  FaShieldAlt,
  FaCity,
  FaPlane,
  FaRoad,
  FaSchool,
  FaHospital,
  FaChartLine,
  FaHandHoldingUsd,
  FaKey,
  FaBuilding,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaChevronRight,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaWifi,
  FaTv,
  FaUtensils,
  FaCouch,
  FaBriefcase,
  FaSpa,
  FaCalendarAlt,
} from "react-icons/fa";
import LandingPageGallery from "@/components/LandingPageGallery";
import { FaFileContract, FaUserTie } from "react-icons/fa6";
import LandingPageFooter from "@/components/LandingPageFooter";
import CountrySelect from "@/components/CountrySelect";
import { useRouter } from "next/navigation";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import MetaPixel from "@/components/MetaPixel";

const AvanaLandingPage = ({ pixelId }) => {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("studio");
  const [step, setStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    residenceType: "",
    budget: "",
    purpose: "",
    message: "",
  });

  // Color theme
  const themeColors = {
    primary: "#186169", // Teal/Blue
    secondary: "#272727", // Dark Gray
    accent: "#ffffff", // White
  };

  // Gallery Images
  const galleryImages = [
    {
      src: "/avana-residences/4.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences swimming pool",
    },
    {
      src: "/avana-residences/1.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences exterior view",
    },
    {
      src: "/avana-residences/3.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences lobby area",
    },
    {
      src: "/avana-residences/5.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences gym facility",
    },
    {
      src: "/avana-residences/2.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences building facade",
    },
    {
      src: "/avana-residences/6.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences apartment interior",
    },
    {
      src: "/avana-residences/7.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences living room",
    },
    {
      src: "/avana-residences/8.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences kitchen",
    },
    {
      src: "/avana-residences/9.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences bedroom",
    },
    {
      src: "/avana-residences/10.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences bathroom",
    },
    {
      src: "/avana-residences/11.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences balcony view",
    },
    {
      src: "/avana-residences/12.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences rooftop view",
    },
    {
      src: "/avana-residences/13.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences kids play area",
    },
    {
      src: "/avana-residences/14.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences landscaped gardens",
    },
    {
      src: "/avana-residences/15.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences community lounge",
    },
    {
      src: "/avana-residences/16.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences amenities",
    },
    {
      src: "/avana-residences/17.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences outdoor space",
    },
    {
      src: "/avana-residences/18.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences modern design",
    },
    {
      src: "/avana-residences/19.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences premium finishes",
    },
    {
      src: "/avana-residences/20.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences interior design",
    },
    {
      src: "/avana-residences/21.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences lifestyle",
    },
    {
      src: "/avana-residences/22.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences community",
    },
    {
      src: "/avana-residences/23.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences architecture",
    },
    {
      src: "/avana-residences/24.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences facilities",
    },
    {
      src: "/avana-residences/25.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences views",
    },
    {
      src: "/avana-residences/26.webp",
      width: 800,
      height: 600,
      alt: "Avana Residences premium living",
    },
  ];

  // Residence Types
  const residenceTypes = useMemo(
    () => [
      {
        id: "studio",
        type: "Studio",
        units: 114,
        area: "373–496 sq.ft.",
        startingPrice: "AED 650,000",
        images: [
          "/avana-residences/19.webp",
          "/avana-residences/7.webp",
          "/avana-residences/8.webp",
        ],
        description:
          "Our studios elevate efficiency through intelligent design. Multi-functional spaces adapt to your needs throughout the day, while thoughtful finishes create an atmosphere of understated luxury.",
        detailedDescription:
          "Each studio at Avana Residences has been meticulously planned to maximize both functionality and comfort within a compact footprint. The thoughtful layout creates distinct zones for sleeping, living, and dining while maintaining an open, airy atmosphere. Ingenious storage solutions are integrated throughout, including custom-designed wardrobes, kitchen cabinetry with specialized organizers, and multifunctional furniture elements that adapt to different needs throughout the day.",
        features: [
          {
            icon: FaCouch,
            text: "Thoughtful Layout",
            description: "Distinct zones for sleeping, living, and dining",
          },
          {
            icon: FaRulerCombined,
            text: "Intelligent Design",
            description: "Maximized functionality in compact space",
          },
          {
            icon: FaBriefcase,
            text: "Premium Storage",
            description: "Custom-designed wardrobes and organizers",
          },
          {
            icon: FaUtensils,
            text: "Gourmet Kitchenette",
            description: "High-quality kitchen cabinetry",
          },
          {
            icon: FaSpa,
            text: "Luxury Bathroom",
            description: "Premium finishes and fixtures",
          },
          {
            icon: FaWifi,
            text: "Smart Technology",
            description: "Modern smart home features",
          },
        ],
        highlights: [
          "Natural light floods through expansive windows",
          "Select units include private balconies",
          "Same premium finishes as larger units",
          "Multifunctional furniture elements",
          "Enhanced sense of space and connection to outdoors",
        ],
      },
      {
        id: "1-bedroom",
        type: "1-Bedroom",
        units: 43,
        area: "635–788 sq.ft.",
        startingPrice: "AED 950,000",
        images: [
          "/avana-residences/25.webp",
          "/avana-residences/10.webp",
          "/avana-residences/11.webp",
        ],
        description:
          "Perfect for individuals and couples seeking the right balance of openness and privacy. These homes offer distinct zones for entertaining, working, and relaxing.",
        detailedDescription:
          "Our 1-bedroom residences offer a perfect balance of open living and private retreat. Thoughtfully designed floorplans feature seamless flow between living, dining, and kitchen areas, creating a spacious main zone ideal for daily life and entertaining. Clear separation of social and private spaces ensures the bedroom remains a tranquil sanctuary, with acoustic treatments enhancing the peaceful atmosphere.",
        features: [
          {
            icon: FaCouch,
            text: "Open Concept",
            description: "Seamless flow between living areas",
          },
          {
            icon: FaUtensils,
            text: "Integrated Appliances",
            description: "Modern kitchen with premium appliances",
          },
          {
            icon: FaSpa,
            text: "Luxury Bathroom",
            description: "Spa-like bathroom experience",
          },
          {
            icon: FaTree,
            text: "Private Outdoor Space",
            description: "Balcony for al fresco living",
          },
          {
            icon: FaBriefcase,
            text: "Work From Home",
            description: "Designated home office space",
          },
          {
            icon: FaWifi,
            text: "Smart Home",
            description: "Advanced smart home integration",
          },
        ],
        highlights: [
          "Private balcony for comfortable seating and dining",
          "Connection between indoor and outdoor living",
          "Designated work-from-home areas",
          "Acoustic treatments for peaceful atmosphere",
          "Consistent flooring materials throughout",
        ],
      },
      {
        id: "2-bedroom",
        type: "2-Bedroom",
        units: 10,
        area: "1,066–1,324 sq.ft.",
        startingPrice: "AED 1.5M",
        images: [
          "/avana-residences/26.webp",
          "/avana-residences/21.webp",
          "/avana-residences/22.webp",
        ],
        description:
          "Designed for families and those who value generous space, our two-bedroom residences provide room to grow, entertain, and retreat.",
        detailedDescription:
          "Our most spacious offering, the 2-bedroom residences are designed with family living and entertaining in mind. The thoughtfully conceived floor plans feature a generous open-concept main living area that creates a natural gathering space, with distinct zones for living, dining, and cooking that flow seamlessly together while maintaining their individual functionality.",
        features: [
          {
            icon: FaCouch,
            text: "Expansive Living",
            description: "Generous open-concept main area",
          },
          {
            icon: FaSpa,
            text: "Spa-Like Bath",
            description: "Luxurious en-suite bathroom",
          },
          {
            icon: FaBed,
            text: "Secondary Bedroom",
            description: "Flexible space for guests or office",
          },
          {
            icon: FaBath,
            text: "Guest Convenience",
            description: "Powder room for visitors",
          },
          {
            icon: FaTree,
            text: "Outdoor Living",
            description: "Expanded terrace as interior extension",
          },
          {
            icon: FaWifi,
            text: "Smart Living",
            description: "Zone-specific climate and lighting control",
          },
        ],
        highlights: [
          "Private primary suite with custom walk-in closet",
          "Expanded outdoor living area for year-round use",
          "Enhanced smart home features throughout",
          "Additional powder room for guests",
          "Expanded storage solutions in all areas",
        ],
      },
    ],
    []
  );

  // Amenities
  const amenities = useMemo(
    () => [
      {
        icon: FaSwimmingPool,
        title: "Infinity Pool",
        desc: "Stunning infinity pool with sun deck",
      },
      {
        icon: FaDumbbell,
        title: "Fitness Center",
        desc: "State-of-the-art gym equipment",
      },
      {
        icon: FaTree,
        title: "Landscaped Gardens",
        desc: "Beautifully designed green spaces",
      },
      {
        icon: FaChild,
        title: "Kids Play Zone",
        desc: "Safe and fun play areas",
      },
      {
        icon: FaCar,
        title: "Underground Parking",
        desc: "Designated parking spaces",
      },
      {
        icon: FaShoppingBag,
        title: "Retail Outlets",
        desc: "Convenience stores and cafes",
      },
      {
        icon: FaShieldAlt,
        title: "24/7 Security",
        desc: "Gated community with CCTV",
      },
      {
        icon: FaUsers,
        title: "Community Lounge",
        desc: "Social spaces for residents",
      },
    ],
    []
  );

  // Location Highlights
  const locationHighlights = useMemo(
    () => [
      {
        icon: FaCity,
        title: "Downtown Dubai",
        distance: "15 mins",
        desc: "Business and entertainment hub",
      },
      {
        icon: FaPlane,
        title: "Dubai International Airport",
        distance: "20 mins",
        desc: "DXB International Airport",
      },
      {
        icon: FaRoad,
        title: "Sheikh Zayed Road",
        distance: "10 mins",
        desc: "Main highway access",
      },
      {
        icon: FaSchool,
        title: "Schools & Universities",
        distance: "5-10 mins",
        desc: "Multiple educational options",
      },
      {
        icon: FaHospital,
        title: "Medical Facilities",
        distance: "10 mins",
        desc: "Hospitals and clinics",
      },
      {
        icon: FaShoppingBag,
        title: "Shopping Malls",
        distance: "10 mins",
        desc: "Mall of the Emirates, Ibn Battuta",
      },
    ],
    []
  );

  // Payment Plan
  const paymentPlan = useMemo(
    () => [
      {
        phase: "Booking",
        amount: "10%",
        timing: "Immediate",
        color: "from-teal-600 to-teal-700",
      },
      {
        phase: "After 1 Month",
        amount: "10%",
        timing: "30 days from booking",
        color: "from-teal-500 to-teal-600",
      },
      {
        phase: "During Construction",
        amount: "40%",
        timing: "1% monthly for 40 months",
        color: "from-teal-400 to-teal-500",
      },
      {
        phase: "Completion",
        amount: "10%",
        timing: "On Completion",
        color: "from-teal-300 to-teal-400",
      },
      {
        phase: "Post Handover",
        amount: "30%",
        timing: "1.25% monthly for 24 months",
        color: "from-teal-200 to-teal-300",
      },
    ],
    []
  );

  // FAQ Data
  const faqData = useMemo(
    () => [
      {
        question: "Where is Avana Residences located?",
        answer:
          "Avana Residences is strategically located in Jumeirah Village Circle (JVC), one of Dubai's most popular residential communities. It offers easy access to Sheikh Zayed Road, Downtown Dubai, Dubai Marina, and major shopping destinations like Mall of the Emirates.",
      },
      {
        question: "What types of residences are available?",
        answer:
          "Avana Residences offers Studio (373–496 sq.ft.), 1-Bedroom (635–788 sq.ft.), and 2-Bedroom (1,066–1,324 sq.ft.) apartments. Each residence features premium finishes, smart home technology, and intelligent design for modern living.",
      },
      {
        question: "Who is the developer of Avana Residences?",
        answer:
          "Avana Residences is developed by MAG Lifestyle Development, a premier real estate developer in the UAE known for creating exceptional residential communities that redefine luxury living in Dubai.",
      },
      {
        question: "What amenities are available?",
        answer:
          "Residents enjoy world-class amenities including an infinity pool, state-of-the-art fitness center, landscaped gardens, children's play zones, retail outlets, community lounges, and 24/7 security with CCTV surveillance.",
      },
      {
        question: "What is the payment plan?",
        answer:
          "Avana Residences offers a flexible payment plan: 10% on booking, 10% after 1 month, 40% during construction (1% monthly for 40 months), 10% on completion, and 30% post-handover (1.25% monthly for 24 months).",
      },
      {
        question: "When is the expected completion date?",
        answer:
          "Avana Residences is scheduled for completion in Q4 2026. Construction is progressing as per schedule with regular updates provided to investors.",
      },
      {
        question: "Is Avana Residences a good investment?",
        answer:
          "Yes, Avana Residences in JVC offers excellent investment potential with 6-8% annual capital growth and 7-9% rental yields. JVC has proven to be one of Dubai's most consistent performing residential communities.",
      },
      {
        question: "How can I book a residence?",
        answer:
          "You can book a residence by contacting our sales team at +971 4 345 4888 or filling out the enquiry form on this page. A 10% booking deposit is required to secure your unit.",
      },
    ],
    []
  );

  const activeResidence =
    residenceTypes.find((r) => r.id === activeTab) || residenceTypes[0];

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Form step management
  const stepsTotal = 6; // 5 questions + 1 confirmation step
  const progress = ((step + 1) / stepsTotal) * 100;

  // Residence type options for form
  const residenceTypeOptions = ["Studio", "1-Bedroom", "2-Bedroom"];

  // Budget options
  const budgetOptions = [
    { value: "below-700k", label: "Below 700,000 AED" },
    { value: "700k-1.1m", label: "700,000 to 1.1 Million AED" },
    { value: "1.1m-1.6m", label: "1.1 Million to 1.6 Million AED" },
    { value: "above-1.6m", label: "More than 1.6 Million AED" },
  ];

  // Purpose options
  const purposeOptions = [
    { value: "investor", label: "Investor" },
    { value: "personal-use", label: "Personal Use" },
    { value: "real-estate-broker", label: "Real Estate Broker" },
  ];

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateStep = (currentStep) => {
    const errors = {};
    switch (currentStep) {
      case 0: // Name and Email
        if (!formData.name.trim()) {
          errors.name = "Name is required";
        }
        if (!formData.email.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "Please enter a valid email address";
        }
        break;
      case 1: // Phone
        if (!formData.phone.trim()) {
          errors.phone = "Phone number is required";
        }
        break;
      case 2: // Residence Type
        if (!formData.residenceType.trim()) {
          errors.residenceType = "Please select a residence type";
        }
        break;
      case 3: // Budget
        if (!formData.budget.trim()) {
          errors.budget = "Please select a budget range";
        }
        break;
      case 4: // Purpose
        if (!formData.purpose.trim()) {
          errors.purpose = "Please select a purpose";
        }
        break;
      case 5: // Confirmation step - no validation needed
        break;
      default:
        break;
    }
    return errors;
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
      // Final step (confirmation) - submit the form
      setIsSubmitting(true);
      try {
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-avana-residences-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            budget: formData.budget,
            residenceType: formData.residenceType,
            purpose: formData.purpose,
            message: formData.message || "",
            website: websiteValue,
            createdAt: new Date().toISOString(),
            source: "Avana Residences",
          }),
        });

        if (res.ok) {
          router.push("/avana-residences/thankyou");
        } else {
          const errorData = await res.json().catch(() => ({}));
          setFormErrors({
            submit:
              errorData.message || "Failed to submit form. Please try again.",
          });
          setIsSubmitting(false);
        }
      } catch (error) {
        setFormErrors({
          submit: "Network error. Please check your connection and try again.",
        });
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setFormErrors({});
    }
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
    setStep(0);
    setFormErrors({});
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "AE",
      residenceType: "",
      budget: "",
      purpose: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setStep(0);
    setFormErrors({});
    setIsSubmitting(false);
  };

  return (
    <main
      className="bg-white text-gray-900"
      style={{
        "--primary-color": themeColors.primary,
        "--secondary-color": themeColors.secondary,
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/avana-residences/avana-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[black]/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* <div className="inline-flex items-center gap-2 bg-[#186169]/30 backdrop-blur-sm border border-[#186169]/40 rounded-full px-4 py-2 mb-6">
                <FaBuilding className="text-teal-300" />
                <span className="text-sm font-semibold font-custom2">
                  MAG Lifestyle Development
                </span>
              </div> */}

              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-custom">
                Avana Residences
                <span className="block text-2xl md:text-3xl mt-4 font-light font-custom">
                  Premium Living in Jumeirah Village Circle
                </span>
              </h1>

              <p className="text-xl mb-8 max-w-2xl mx-auto font-custom2">
                Experience modern sophistication with panoramic views, premium
                amenities, and intelligent design in one of Dubai&apos;s most
                sought-after communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleFormOpen}
                  className="bg-white text-[#186169] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-custom2"
                >
                  Enquire Now <FaArrowRight />
                </button>
                <button
                  onClick={() => scrollToSection("residences")}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors font-custom2"
                >
                  View Residences
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About The Project */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[#186169] mb-6">
                <div className="w-10 h-px bg-[#186169]"></div>
                <span className="font-semibold uppercase tracking-wider font-custom2">
                  The Project
                </span>
              </div>

              <h2 className="text-4xl font-bold mb-6 text-[#272727] font-custom">
                Architectural Innovation Meets
                <br />
                Timeless Sophistication
              </h2>

              <div className="space-y-4 text-gray-700 font-custom2">
                <p>
                  Avana Residences stands as a contemporary landmark in Jumeirah
                  Village Circle, where architectural innovation meets timeless
                  sophistication. Drawing inspiration from the fluid forms of
                  marine life, this apartment building offers an extraordinary
                  living experience with distinctive design elements and
                  world-class amenities that transform everyday living in Dubai.
                </p>

                <p>
                  Designed with a vision to create homes that are both visually
                  striking and exceptionally functional, this residential
                  building integrates premium finishes, intelligent space
                  planning, and distinctive shared amenities that establish a
                  new standard for urban living in JVC.
                </p>

                <p>
                  Every aspect of the development has been meticulously
                  considered to create an environment that supports modern
                  lifestyles while providing a sanctuary of comfort and elegance
                  for those seeking premium apartments in Dubai within a
                  well-connected community.
                </p>

                <p className="font-medium text-[#186169] font-custom2">
                  This apartment building is crafted to meet the expectations of
                  discerning residents who value design, convenience, and a
                  high-quality living environment.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <FaBuilding className="text-[#186169]" />
                  </div>
                  <div>
                    <div className="font-bold font-custom">
                      Marine-Inspired Design
                    </div>
                    <div className="text-sm text-gray-600 font-custom2">
                      Fluid architectural forms
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <FaStar className="text-[#186169]" />
                  </div>
                  <div>
                    <div className="font-bold font-custom">
                      Premium Finishes
                    </div>
                    <div className="text-sm text-gray-600 font-custom2">
                      High-quality materials throughout
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/avana-residences/10.webp')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#186169]/20 to-transparent"></div>
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/avana-residences/9.webp')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#186169]/20 to-transparent"></div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/avana-residences/3.webp')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#186169]/20 to-transparent"></div>
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/avana-residences/4.webp')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#186169]/20 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#186169] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-[#186169] rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-custom">
              Modern Living Redefined
            </h2>
            <p className="text-gray-600 text-lg font-custom2">
              Avana Residences offers a perfect blend of contemporary design,
              premium amenities, and strategic location in the heart of Jumeirah
              Village Circle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <FaBuilding className="text-[#186169] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-custom">
                Intelligent Architecture
              </h3>
              <p className="text-gray-600 font-custom2">
                Marine-inspired design with fluid forms creates visually
                striking facades while maximizing natural light and ventilation
                throughout every residence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-[#186169] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-custom">
                Community Focused
              </h3>
              <p className="text-gray-600 font-custom2">
                Designed for modern families and professionals, with amenities
                that promote community interaction and healthy living in a
                well-connected JVC location.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <FaChartLine className="text-[#186169] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-custom">
                Sustainable Investment
              </h3>
              <p className="text-gray-600 font-custom2">
                Located in JVC, one of Dubai&apos;s fastest-growing areas with
                excellent rental yields and capital appreciation potential
                backed by MAG&apos;s reputation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Residence Types */}
      <section id="residences" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-custom">
              Residence Types
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-custom2">
              Choose from our meticulously designed residences, each offering
              intelligent design and premium finishes.
            </p>
          </div>

          {/* Residence Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-300 p-1">
              {residenceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`px-6 py-3 rounded-md font-semibold transition-all ${
                    activeTab === type.id
                      ? "bg-[#186169] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type.type}
                </button>
              ))}
            </div>
          </div>

          {/* Active Residence Details */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="grid md:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative h-96 md:h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${activeResidence.images[0]}')`,
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-full px-4 py-2">
                  <span className="font-bold text-[#186169] font-custom">
                    {activeResidence.startingPrice}
                  </span>
                </div>
                {/* <div className="absolute bottom-4 right-4 flex gap-2">
                  {activeResidence.images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${img}')` }}
                      />
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 font-custom">
                      {activeResidence.type}
                    </h3>
                    <div className="flex items-center gap-6 text-gray-600 font-custom2">
                      <div className="flex items-center gap-2">
                        <FaBuilding />
                        <span>{activeResidence.units} Units</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRulerCombined />
                        <span>{activeResidence.area}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 font-custom2">
                  {activeResidence.description}
                </p>
                <p className="text-gray-600 mb-8 font-custom2">
                  {activeResidence.detailedDescription}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {activeResidence.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                        <feature.icon className="text-[#186169]" />
                      </div>
                      <div>
                        <div className="font-semibold">{feature.text}</div>
                        <div className="text-sm text-gray-600">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Highlights:</h4>
                  <ul className="space-y-2">
                    {activeResidence.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      residenceType: activeResidence.type,
                    });
                    handleFormOpen();
                  }}
                  className="w-full bg-[#186169] text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Enquire About {activeResidence.type}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-2">
            <h2 className="text-4xl font-bold mb-4 font-custom">Gallery</h2>
            <p className="text-gray-600 text-lg font-custom2">
              Explore the beauty and sophistication of Avana Residences through
              our visual journey.
            </p>
          </div>
          <LandingPageGallery images={galleryImages} title="" description="" />
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-custom text-4xl font-bold mb-4">
              World-Class Amenities
            </h2>
            <p className="font-custom2 text-gray-600 text-lg">
              Enjoy a lifestyle of comfort, convenience, and luxury with our
              premium facilities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100"
              >
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="text-[#186169] text-2xl" />
                </div>
                <h3 className="font-bold mb-2">{amenity.title}</h3>
                <p className="text-sm text-gray-600">{amenity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section
        className="py-20"
        style={{ backgroundColor: themeColors.secondary, color: "white" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-custom">
                Prime JVC Location
              </h2>
              <p className="text-gray-300 mb-8 font-custom2">
                Strategically located in Jumeirah Village Circle, Avana
                Residences offers unparalleled connectivity to Dubai&apos;s key
                destinations while providing a peaceful residential environment.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {locationHighlights.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/10 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <location.icon className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold font-custom">
                        {location.title}
                      </div>
                      <div className="text-teal-300 text-sm font-custom2">
                        {location.distance}
                      </div>
                      <div className="text-gray-300 text-sm font-custom2">
                        {location.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/avana-residences/27.webp')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#272727]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-custom text-4xl font-bold mb-4">
              A Smart Investment Choice
            </h2>
            <p className="font-custom2 text-xl text-gray-700 mb-8">
              Avana Residences represents not just a home but a sound investment
              in one of Dubai&apos;s most stable and growing communities.
            </p>
            <p className="font-custom2 text-gray-600">
              With strong rental demand, appreciation potential, and a
              transparent payment structure, Avana offers compelling value for
              both end-users and investors.
            </p>
          </div>

          {/* Investment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              {
                value: "6-8%",
                label: "Annual Capital Growth",
                desc: "Outperforming Dubai market average",
              },
              {
                value: "7-9%",
                label: "Rental Yields",
                desc: "Among Dubai's highest-performing areas",
              },
              {
                value: "4-5%",
                label: "Vacancy Rates",
                desc: "Lower than Dubai's 6-7% average",
              },
              {
                value: "JVC",
                label: "Proven Location",
                desc: "Consistent growth in established community",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-3xl font-bold text-[#186169] mb-2 font-custom">
                  {stat.value}
                </div>
                <div className="font-semibold mb-2 font-custom">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 font-custom2">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* JVC Investment Info */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-[#186169]">
                JVC: A Proven Investment Destination
              </h3>
              <p className="text-gray-700 mb-6">
                Jumeirah Village Circle has established itself as one of
                Dubai&apos;s most consistent performing residential communities,
                combining stable growth with strong rental returns.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaChartLine className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">
                      6–8% annual capital growth
                    </div>
                    <div className="text-sm text-gray-600">
                      Outperforming Dubai market by ~2%
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaHandHoldingUsd className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">7–9% rental yields</div>
                    <div className="text-sm text-gray-600">
                      Among Dubai&apos;s highest-performing areas
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaBuilding className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Infrastructure upgrades</div>
                    <div className="text-sm text-gray-600">
                      Boosting nearby property values
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUsers className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">
                      High demand & stable prices
                    </div>
                    <div className="text-sm text-gray-600">
                      Keeps transaction volume and prices stable
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Avana Advantages */}
            <div className="bg-[#186169] text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">The Avana Advantage</h3>
              <p className="text-teal-100 mb-6">
                Avana Residences stands apart from typical investment
                opportunities through a combination of premium quality,
                distinctive features, and strategic positioning.
              </p>
              <div className="space-y-4">
                {[
                  "Transparent payment plan with developer guarantees and milestones",
                  "Unique amenities like rooftop areas & octopus play zone boost value",
                  "Smart unit mix tailored for Dubai's core rental market segments",
                  "Durable construction ensures low upkeep and long-term asset appeal",
                  "Optional full-service property management enables passive ownership",
                  "Premium location in JVC with proven rental demand and appreciation",
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaStar className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span>{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plan */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#186169]/10 px-4 py-2 rounded-full mb-4">
              <FaHandHoldingUsd className="text-[#186169]" />
              <span className="text-sm font-semibold text-[#186169] uppercase tracking-wider font-custom2">
                Payment Plan
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-custom text-gray-900">
              Flexible & Secure Payment Plan
            </h2>
            <p className="text-xl text-gray-700 font-custom2 max-w-3xl mx-auto">
              Avana Residences offers a balanced structure aligned with
              construction milestones, designed for both convenience and
              financial flexibility.
            </p>
          </div>

          {/* Creative Timeline with Better Alignment */}
          <div className="relative max-w-6xl mx-auto mb-16">
            {/* Timeline Track - Improved Alignment */}
            <div className="absolute left-0 right-0 top-1/2 h-2 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-100 -translate-y-1/2 hidden md:block rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            </div>

            {/* Milestone Markers - Perfectly Aligned */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
              {[
                {
                  phase: "Booking",
                  amount: "10%",
                  timing: "Immediate",
                  icon: "🚀",
                },
                {
                  phase: "After 1 Month",
                  amount: "10%",
                  timing: "30 days from booking",
                  icon: "📅",
                },
                {
                  phase: "During Construction",
                  amount: "40%",
                  timing: "1% monthly for 40 months",
                  icon: "🏗️",
                },
                {
                  phase: "Completion",
                  amount: "10%",
                  timing: "On Handover",
                  icon: "🏠",
                },
                {
                  phase: "Post Handover",
                  amount: "30%",
                  timing: "1.25% monthly for 24 months",
                  icon: "⏳",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connecting Line (Mobile) */}
                  {index < 4 && (
                    <div className="absolute top-8 left-1/2 h-8 w-px bg-gray-200 md:hidden"></div>
                  )}

                  {/* Milestone Circle */}
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#186169] to-teal-700 flex items-center justify-center shadow-xl">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        <div className="text-2xl">{item.icon}</div>
                      </div>
                    </div>

                    {/* Percentage Badge */}
                    <div className="absolute -top-2 -right-2 md:-right-4 bg-white border-2 border-[#186169] rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold text-[#186169] font-custom">
                        {item.amount}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold mb-2 font-custom text-gray-900">
                      {item.phase}
                    </h3>
                    <p className="text-sm text-gray-600 font-custom2">
                      {item.timing}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="hidden md:block">
                    <div className="absolute top-10 left-1/2 w-32 h-1 bg-gradient-to-r from-[#186169] to-teal-400 -translate-x-1/2 -z-10"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Creative Payment Details Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Left Card - Visual Breakdown */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 font-custom flex items-center gap-3">
                  <FaChartLine className="text-[#186169]" />
                  Visual Payment Breakdown
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#186169]"></div>
                      <span className="font-semibold font-custom2">
                        Booking
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#186169] font-custom">
                        10%
                      </div>
                      <div className="text-sm text-gray-500 font-custom2">
                        Immediate
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-600"></div>
                      <span className="font-semibold font-custom2">
                        After 1 Month
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-teal-600 font-custom">
                        10%
                      </div>
                      <div className="text-sm text-gray-500 font-custom2">
                        30 days from booking
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                      <span className="font-semibold font-custom2">
                        Construction
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-teal-500 font-custom">
                        40%
                      </div>
                      <div className="text-sm text-gray-500 font-custom2">
                        Monthly installments
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-400"></div>
                      <span className="font-semibold font-custom2">
                        Completion
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-teal-400 font-custom">
                        10%
                      </div>
                      <div className="text-sm text-gray-500 font-custom2">
                        On handover
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-300"></div>
                      <span className="font-semibold font-custom2">
                        Post-Handover
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-teal-300 font-custom">
                        30%
                      </div>
                      <div className="text-sm text-gray-500 font-custom2">
                        Extended payments
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Percentage Visual */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold font-custom">
                      Total Investment
                    </span>
                    <span className="text-2xl font-bold text-[#186169] font-custom">
                      100%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#186169] via-teal-500 to-teal-300 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Right Card - Benefits & Features */}
              <div className="bg-gradient-to-br from-[#186169] to-teal-800 text-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 font-custom flex items-center gap-3">
                  <FaStar className="text-yellow-300" />
                  Key Benefits
                </h3>

                <div className="space-y-5">
                  {[
                    {
                      icon: FaShieldAlt,
                      title: "Developer Accountability",
                      description:
                        "Construction-linked payments ensure quality delivery",
                    },
                    {
                      icon: FaChartLine,
                      title: "Financial Flexibility",
                      description:
                        "Extended post-handover payments ease burden",
                    },
                    {
                      icon: FaCheckCircle,
                      title: "Transparent Structure",
                      description: "No hidden costs, clear payment schedule",
                    },
                    {
                      icon: FaBuilding,
                      title: "Bank Financing",
                      description:
                        "Flexible options available through partner banks",
                    },
                    {
                      icon: FaUsers,
                      title: "Investor Friendly",
                      description: "Designed for optimal ROI and cash flow",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold font-custom">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-teal-100 font-custom2 mt-1">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Payment Schedule Table - Creative Design */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 mb-12">
              <div className="bg-gradient-to-r from-[#186169] to-teal-700 text-white p-6">
                <h3 className="text-2xl font-bold font-custom flex items-center gap-3">
                  <FaCalendarAlt />
                  Detailed Payment Schedule
                </h3>
                <p className="text-teal-100 font-custom2 mt-2">
                  Complete breakdown of payment milestones and timelines
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left font-custom2 text-gray-700 border-b border-gray-200">
                        Phase
                      </th>
                      <th className="p-4 text-left font-custom2 text-gray-700 border-b border-gray-200">
                        Percentage
                      </th>
                      <th className="p-4 text-left font-custom2 text-gray-700 border-b border-gray-200">
                        Timeline
                      </th>
                      <th className="p-4 text-left font-custom2 text-gray-700 border-b border-gray-200">
                        Milestone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        phase: "Booking",
                        percentage: "10%",
                        timeline: "Immediate",
                        milestone: "Reservation secured",
                      },
                      {
                        phase: "After 1 Month",
                        percentage: "10%",
                        timeline: "30 days from booking",
                        milestone: "Confirmation of purchase",
                      },
                      {
                        phase: "During Construction",
                        percentage: "40%",
                        timeline: "40 monthly payments (1% each)",
                        milestone: "Construction progress linked",
                      },
                      {
                        phase: "On Completion",
                        percentage: "10%",
                        timeline: "Upon handover",
                        milestone: "Unit ready for possession",
                      },
                      {
                        phase: "Post-Handover",
                        percentage: "30%",
                        timeline: "24 monthly payments (1.25% each)",
                        milestone: "Extended financial flexibility",
                      },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                      >
                        <td className="p-4 font-semibold font-custom2 border-b border-gray-200">
                          {row.phase}
                        </td>
                        <td className="p-4 border-b border-gray-200">
                          <div className="inline-flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0
                                  ? "bg-[#186169]"
                                  : index === 1
                                    ? "bg-teal-600"
                                    : index === 2
                                      ? "bg-teal-500"
                                      : index === 3
                                        ? "bg-teal-400"
                                        : "bg-teal-300"
                              }`}
                            ></div>
                            <span className="text-lg font-bold font-custom text-[#186169]">
                              {row.percentage}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 font-custom2 border-b border-gray-200">
                          {row.timeline}
                        </td>
                        <td className="p-4 font-custom2 border-b border-gray-200">
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" />
                            <span>{row.milestone}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Investment CTA - Creative Design */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#186169] via-teal-700 to-teal-800 text-white p-10 md:p-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="lg:w-2/3">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                      <FaChartLine className="text-yellow-300" />
                      <span className="text-sm font-semibold font-custom2">
                        Investment Opportunity
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 font-custom">
                      Secure Your Investment Today
                    </h3>

                    <p className="text-lg text-teal-100 mb-6 font-custom2 max-w-2xl">
                      The Dubai real estate market demonstrates remarkable
                      resilience. Avana Residences offers premium living with
                      exceptional ROI potential in Dubai&apos;s most
                      sought-after community.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-300" />
                        <span className="font-custom2">
                          6-8% Annual Capital Growth
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-300" />
                        <span className="font-custom2">7-9% Rental Yields</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-300" />
                        <span className="font-custom2">
                          Proven JVC Location
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/3">
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            residenceType: "Investment",
                          });
                          handleFormOpen();
                        }}
                        className="w-full bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 font-custom2 flex items-center justify-center gap-3"
                      >
                        <FaUserTie />
                        Speak with Investment Advisor
                      </button>

                      <a
                        href="tel:+97143454888"
                        className="w-full inline-flex items-center justify-center gap-3 text-white font-custom2 hover:text-teal-200 transition-colors"
                      >
                        <FaPhone className="text-teal-300" />
                        <span>Call: +971 4 345 4888</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-white/20 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 font-custom">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 font-custom2">
              Find answers to common questions about Avana Residences.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                >
                  <span className="font-semibold text-lg font-custom">
                    {faq.question}
                  </span>
                  <FaChevronRight
                    className={`transition-transform ${
                      openFaqIndex === index
                        ? "rotate-90 text-[#186169]"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 font-custom2">
                        <div className="border-t pt-6">{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#186169] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-custom">
            Ready to Make Avana Your Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-custom2">
            Contact our sales team today to schedule a viewing or get more
            information about available units and payment plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleFormOpen}
              className="bg-white text-[#186169] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors font-custom2"
            >
              Book a Viewing
            </button>
            <a
              href="tel:+97143454888"
              className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors font-custom2"
            >
              Call Now: +971 4 345 4888
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#272727] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4 font-custom">
                Avana Residences
              </h3>
              <p className="text-gray-400 font-custom2">
                Premium residences in Jumeirah Village Circle.
                <br />
                <a
                  href="https://www.avanaresidences.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-300 hover:text-teal-200 mt-2 inline-block font-custom2"
                >
                  www.avanaresidences.ae
                </a>
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4 font-custom">
                Quick Links
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("residences")}
                  className="block text-gray-400 hover:text-white md:text-left mx-auto md:mx-0 font-custom2"
                >
                  Residence Types
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block text-gray-400 hover:text-white md:text-left mx-auto md:mx-0 font-custom2"
                >
                  FAQ
                </button>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4 font-custom">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href="mailto:info@hsproperty.ae"
                  className="flex items-center gap-3 text-gray-400 hover:text-white font-custom2 justify-center md:justify-start"
                >
                  <FaEnvelope /> info@hsproperty.ae
                </a>
                <a
                  href="tel:+97143454888"
                  className="flex items-center gap-3 text-gray-400 hover:text-white font-custom2 justify-center md:justify-start"
                >
                  <FaPhone /> +971 4 345 4888
                </a>
                <div className="flex items-start gap-3 text-gray-400 font-custom2 justify-center md:justify-start">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span>Jumeirah Village Circle, Dubai, UAE</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4 font-custom">Follow Us</h3>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971526902884"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p className="font-custom2">
              © {new Date().getFullYear()} H&S Property. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Multi-Step Contact Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3 font-custom">
                      <FaBuilding className="text-[#186169]" />
                      <span className="hidden sm:inline">
                        Avana Residences Enquiry
                      </span>
                      <span className="sm:hidden">Enquiry</span>
                    </h3>
                    <p className="text-slate-500 mt-2 font-custom2">
                      Step {step + 1} of {stepsTotal}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFormClose}
                    className="text-slate-400 hover:text-slate-700 text-2xl leading-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
                  <motion.div
                    className="bg-[#186169] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  ref={honeypotRef}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />

                <div className="min-h-[280px] sm:min-h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      className="space-y-6"
                    >
                      {step === 0 && (
                        <>
                          <label className="block text-slate-800 font-semibold text-lg mb-3 font-custom2">
                            What&apos;s your full name?
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            className={`w-full bg-white border-2 rounded-xl px-5 py-4 text-slate-900 focus:outline-none transition-colors text-lg font-custom2 mb-4 ${
                              formErrors.name
                                ? "border-red-500"
                                : "border-slate-200 focus:border-[#186169]"
                            }`}
                            placeholder="Enter your name"
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-sm mt-2 font-custom2">
                              {formErrors.name}
                            </p>
                          )}
                          <label className="block text-slate-800 font-semibold text-lg mb-3 font-custom2 mt-6">
                            What&apos;s your email address?
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            className={`w-full bg-white border-2 rounded-xl px-5 py-4 text-slate-900 focus:outline-none transition-colors text-lg font-custom2 ${
                              formErrors.email
                                ? "border-red-500"
                                : "border-slate-200 focus:border-[#186169]"
                            }`}
                            placeholder="your@email.com"
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-2 font-custom2">
                              {formErrors.email}
                            </p>
                          )}
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <label className="block text-slate-800 font-semibold text-lg mb-3 font-custom2">
                            Your mobile number?
                          </label>
                          <CountrySelect
                            styling={`w-full rounded-xl border-2 transition-all bg-white px-5 py-4 text-lg font-custom2 ${
                              formErrors.phone
                                ? "border-red-500 focus-within:border-red-600"
                                : "border-slate-200 focus-within:border-[#186169]"
                            }`}
                            labels={en}
                            flags={flags}
                            value={formData.country}
                            onChange={(country) =>
                              updateField("country", country)
                            }
                            onPhoneChange={(phone) =>
                              updateField("phone", phone)
                            }
                          />
                          {formErrors.phone && (
                            <p className="text-red-500 text-sm mt-2 font-custom2">
                              {formErrors.phone}
                            </p>
                          )}
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <label className="block text-slate-800 font-semibold text-lg mb-3 font-custom2">
                            How many beds are you interested in?
                          </label>
                          <div className="space-y-3">
                            {residenceTypeOptions.map((type) => (
                              <label
                                key={type}
                                className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer font-custom2 ${
                                  formData.residenceType === type
                                    ? "border-[#186169] bg-[#186169]/10 text-[#186169]"
                                    : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="residenceType"
                                  value={type}
                                  checked={formData.residenceType === type}
                                  onChange={() =>
                                    updateField("residenceType", type)
                                  }
                                  className="w-5 h-5 mr-3 text-[#186169] focus:ring-[#186169]"
                                />
                                <span className="text-lg">{type}</span>
                              </label>
                            ))}
                          </div>
                          {formErrors.residenceType && (
                            <p className="text-red-500 text-sm mt-2 font-custom2">
                              {formErrors.residenceType}
                            </p>
                          )}
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <label className="block text-slate-800 font-semibold text-lg mb-3 font-custom2">
                            How much is your budget?
                          </label>
                          <div className="space-y-3">
                            {budgetOptions.map((option) => (
                              <label
                                key={option.value}
                                className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer font-custom2 ${
                                  formData.budget === option.value
                                    ? "border-[#186169] bg-[#186169]/10 text-[#186169]"
                                    : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="budget"
                                  value={option.value}
                                  checked={formData.budget === option.value}
                                  onChange={() =>
                                    updateField("budget", option.value)
                                  }
                                  className="w-5 h-5 mr-3 text-[#186169] focus:ring-[#186169]"
                                />
                                <span className="text-lg">{option.label}</span>
                              </label>
                            ))}
                          </div>
                          {formErrors.budget && (
                            <p className="text-red-500 text-sm mt-2 font-custom2">
                              {formErrors.budget}
                            </p>
                          )}
                        </>
                      )}

                      {step === 4 && (
                        <>
                          <label className="block text-slate-800 font-semibold text-lg mb-3 font-custom2">
                            Are you looking to buy for investment or personal
                            use?
                          </label>
                          <div className="space-y-3">
                            {purposeOptions.map((option) => (
                              <label
                                key={option.value}
                                className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer font-custom2 ${
                                  formData.purpose === option.value
                                    ? "border-[#186169] bg-[#186169]/10 text-[#186169]"
                                    : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="purpose"
                                  value={option.value}
                                  checked={formData.purpose === option.value}
                                  onChange={() =>
                                    updateField("purpose", option.value)
                                  }
                                  className="w-5 h-5 mr-3 text-[#186169] focus:ring-[#186169]"
                                />
                                <span className="text-lg">{option.label}</span>
                              </label>
                            ))}
                          </div>
                          {formErrors.purpose && (
                            <p className="text-red-500 text-sm mt-2 font-custom2">
                              {formErrors.purpose}
                            </p>
                          )}
                        </>
                      )}

                      {step === 5 && (
                        <>
                          <div className="text-center py-6">
                            <div className="bg-[#186169]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FaCheckCircle className="text-[#186169] text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 font-custom">
                              Ready to Submit?
                            </h3>
                            <p className="text-slate-600 text-base mb-2 font-custom2">
                              By clicking Submit, your information will be sent
                              to our team.
                            </p>
                            <p className="text-slate-500 text-sm font-custom2">
                              We&apos;ll contact you within 24 hours with more
                              information about Avana Residences.
                            </p>
                          </div>
                        </>
                      )}

                      {formErrors.submit && (
                        <p className="text-red-500 text-sm mt-4 font-custom2">
                          {formErrors.submit}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-200 gap-3">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 sm:px-8 py-3 border-2 border-slate-200 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors font-custom2"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="ml-auto bg-[#186169] text-white px-6 sm:px-10 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg flex items-center gap-2 font-custom2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span> Submitting...
                      </>
                    ) : step === stepsTotal - 1 ? (
                      <>
                        <FaCheckCircle /> Submit
                      </>
                    ) : (
                      <>
                        Next <FaArrowRight />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meta Pixel */}
      <MetaPixel pixelId={pixelId} />
    </main>
  );
};

export default AvanaLandingPage;
