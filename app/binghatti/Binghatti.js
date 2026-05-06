"use client";

import React, { useState, useEffect, useRef } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import "./binghatti.css";

// React Icons imports
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaCheck,
  FaStar,
  FaBuilding,
  FaTrophy,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaUsers,
  FaCrown,
  FaBolt,
} from "react-icons/fa";
import { GiSparkles, GiWaterDrop } from "react-icons/gi";
import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

// Country Select Component (inline)
const CountrySelect = ({
  styling,
  value,
  onChange,
  labels,
  flagComponents,
  onPhoneChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(
    value ? getCountryCallingCode(value) : "971"
  );

  const handleSelection = (country) => {
    onChange(country);
    setCountryCode(getCountryCallingCode(country));
    setIsOpen(false);
    setSearchQuery("");
  };

  const handlePhoneNumberChange = (e) => {
    const phone = e.target.value.replace(/\D/g, "");
    setPhoneNumber(phone);
    onPhoneChange(`+${countryCode}${phone}`);
  };

  const filteredCountries = getCountries().filter((country) => {
    const countryLabel = labels[country];
    return (
      countryLabel &&
      countryLabel.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="relative">
      <div className={styling}>
        <button
          type="button"
          className="flex items-center justify-center px-2 outline-none shrink-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value && flagComponents[value] && (
            <>
              {React.createElement(flagComponents[value], {
                className: "mr-2 w-5 h-5",
              })}
              <span className="text-white">+{countryCode}</span>
            </>
          )}
          <span className="ml-1 text-gray-400">{isOpen ? "▲" : "▼"}</span>
        </button>

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          className="grow pl-4 focus:outline-none bg-transparent text-white placeholder-gray-600"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 border border-gray-700 bg-gray-900 w-full rounded-b shadow-xl max-h-80 mt-1">
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full px-4 py-2 focus:outline-none border-b border-gray-700 text-white bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => {
              const Flag = flagComponents[country];
              return (
                <li
                  key={country}
                  className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer text-white"
                  onClick={() => handleSelection(country)}
                >
                  {Flag && <Flag className="mr-2 w-5 h-5" />}
                  <span>
                    {labels[country]} +{getCountryCallingCode(country)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
};

const BinghattiLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectInterest: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("AE");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryScrollRef = useRef(null);

  // Refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  const refs = {
    home: heroRef,
    about: aboutRef,
    project: projectRef,
    gallery: galleryRef,
    contact: contactRef,
  };

  // Lightbox functions
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixed Intersection Observer for mobile
  useEffect(() => {
    const observerOptions = {
      threshold: 0.01,
      rootMargin: "50px 0px 50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only update active section, don't add animation classes
          if (entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Observe all sections for active state tracking only
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        observer.observe(section);
        section.style.opacity = "1";
        section.style.visibility = "visible";
      });
      const projectCards = document.querySelectorAll(".project-card");
      projectCards.forEach((card) => {
        card.style.opacity = "1";
        card.style.visibility = "visible";
      });

      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.style.opacity = "1";
        img.style.visibility = "visible";
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
  // Force animation on mobile after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if project section is in viewport on mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile && projectRef.current) {
        const rect = projectRef.current.getBoundingClientRect();
        const isInViewport =
          rect.top <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0;

        if (isInViewport) {
          projectRef.current.classList.add("animate-in");
          setActiveSection("project");
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsMenuOpen(false);
  };

  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = 400;
      galleryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setSubmitStatus(null);

    try {
      // Get honeypot field value from form
      const websiteValue = e.target.website?.value || "";
      const res = await fetch("/api/send-binghatti-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          projectInterest: formData.projectInterest,
          message: formData.message,
          website: websiteValue, // Honeypot field - should always be empty for legitimate users
          createdAt: new Date().toISOString(),
          source: "Binghatti Developments",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      const result = await res.json();

      if (result.success === false) {
        throw new Error(result.message || "Failed to send email");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectInterest: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Project Data
  const projects = {
    moonlight: {
      id: "moonlight",
      title: "Binghatti Moonlight",
      tagline: "Modern Luxury in Al Jaddaf",
      icon: <GiSparkles className="text-yellow-400" />,
      projectNo: "3722",
      completion: "June 2026",
      location: "Al Jaddaf, Dubai",
      mapLink: "https://maps.app.goo.gl/3vCTUPjvNyZ1Q2Um9",
      description: "4B + G + 3P + 3 OFF. + 1 OFF. & RES. + 17 + MECH. + R",
      totalUnits: "236 Apartments, 47 Offices, 3 Retail",
      units: [
        { type: "1BR", count: 126, price: "1,429,999", size: "746" },
        { type: "2BR", count: 106, price: "1,899,999", size: "932" },
        { type: "3BR", count: 4, price: "3,046,999", size: "1,647" },
      ],
      serviceCharge: "18 AED/sqft",
      paymentPlan: {
        title: "70/30 Payment Plan",
        breakdown: [
          { stage: "Down Payment", percentage: "20%" },
          { stage: "During Construction", percentage: "50%" },
          { stage: "Upon Completion", percentage: "30%" },
        ],
      },
      image: {
        src: "/binghatti/moonlight/1.jpg",
        width: 800,
        height: 600,
      },
    },
    jacobco: {
      id: "jacobco",
      title: "Burj Binghatti Jacob&Co Residences",
      tagline: "World's Tallest Branded Residential Tower",
      icon: <FaCrown className="text-yellow-400" />,
      projectNo: "2480",
      completion: "Q4 2026",
      location: "Business Bay, Dubai",
      mapLink: "https://goo.gl/maps/NZDJyorN4m45kJPC9",
      description: "6B+G+5P+98F+R - Record Breaking Skyscraper",
      totalUnits: "299 Ultra-Luxury Apartments & Sky Villas",
      units: [
        {
          type: "Sapphire Sky Villa",
          count: "2.5BR",
          price: "Contact",
          size: "3,336",
        },
        {
          type: "Emerald Sky Villa",
          count: "2BR",
          price: "Contact",
          size: "3,333",
        },
        {
          type: "Ruby Sky Villa",
          count: "3BR",
          price: "Contact",
          size: "3,299",
        },
      ],
      serviceCharge: "Premium Service",
      paymentPlan: {
        title: "70/30 - 3 Years Payment Plan",
        breakdown: [
          { stage: "Down Payment", percentage: "30%" },
          { stage: "After 1 Month", percentage: "5%" },
          { stage: "During Construction", percentage: "35%" },
          { stage: "Upon Completion", percentage: "30%" },
        ],
      },
      image: {
        src: "/binghatti/burj_binghatti/1.webp",
        width: 800,
        height: 600,
      },
    },
    aquarise: {
      id: "aquarise",
      title: "Binghatti Aquarise",
      tagline: "Waterfront Living in Business Bay",
      icon: <GiWaterDrop className="text-blue-400" />,
      projectNo: "3585",
      completion: "March 2027",
      location: "Business Bay, Dubai",
      mapLink: "https://maps.app.goo.gl/PPYs9KbPWJaRABkKA",
      description: "3B + G + MEZZ. + 25F + MECH. + ROOF",
      totalUnits: "1,566 Apartments, 30 Retail",
      units: [
        { type: "Studio", count: 688, price: "1,109,000", size: "423-528" },
        { type: "1BR", count: 736, price: "1,949,000", size: "713-1,021" },
        { type: "2BR", count: 128, price: "2,944,000", size: "1,047-1,301" },
      ],
      serviceCharge: "20 AED/sqft",
      paymentPlan: {
        title: "2 Years Payment Plan - 70/30",
        breakdown: [
          { stage: "Down Payment", percentage: "20%" },
          { stage: "During Construction", percentage: "50%" },
          { stage: "Upon Completion", percentage: "30%" },
        ],
      },
      image: {
        src: "/binghatti/aquarise/1.webp",
        width: 800,
        height: 600,
      },
    },
    skyblade: {
      id: "skyblade",
      title: "Binghatti Skyblade",
      tagline: "Ultra-Luxury in Downtown Dubai",
      icon: <FaBolt className="text-purple-400" />,
      projectNo: "Launching 09/09/2025",
      completion: "November 2027",
      location: "Downtown Dubai",
      mapLink: "https://maps.app.goo.gl/3jAV2EkvDdjspQx48",
      description: "4B + G + 3P + 61 + R - 61-Storey Iconic Tower",
      totalUnits: "621 Luxury Residences",
      units: [
        { type: "Studio", count: 396, price: "1,674,999", size: "Various" },
        {
          type: "Premium Studio + Jacuzzi",
          count: 208,
          price: "1,774,999",
          size: "Various",
        },
        {
          type: "1BR Royal Suite + Lap Pool",
          count: 100,
          price: "3,649,999",
          size: "Various",
        },
      ],
      serviceCharge: "Premium Service",
      paymentPlan: {
        title: "Flexible Payment Plans",
        breakdown: [
          { stage: "Down Payment", percentage: "20%" },
          { stage: "During Construction", percentage: "50%" },
          { stage: "Upon Completion", percentage: "30%" },
        ],
      },
      image: {
        src: "/binghatti/skyblade/3.webp",
        width: 800,
        height: 600,
      },
    },
  };

  const galleryImages = [
    { src: "/binghatti/moonlight/1.jpg", width: 800, height: 600 },
    { src: "/binghatti/moonlight/2.jpg", width: 800, height: 600 },
    { src: "/binghatti/moonlight/3.jpg", width: 800, height: 600 },
    { src: "/binghatti/moonlight/5.webp", width: 800, height: 600 },
    { src: "/binghatti/burj_binghatti/1.webp", width: 800, height: 600 },
    { src: "/binghatti/burj_binghatti/2.webp", width: 800, height: 600 },
    { src: "/binghatti/burj_binghatti/3.webp", width: 800, height: 600 },
    { src: "/binghatti/burj_binghatti/4.webp", width: 800, height: 600 },
    { src: "/binghatti/burj_binghatti/5.webp", width: 800, height: 600 },
    { src: "/binghatti/skyblade/3.webp", width: 800, height: 600 },
    { src: "/binghatti/skyblade/1.webp", width: 800, height: 600 },
    { src: "/binghatti/skyblade/2.webp", width: 800, height: 600 },
    { src: "/binghatti/aquarise/1.webp", width: 800, height: 600 },
    { src: "/binghatti/aquarise/2.webp", width: 800, height: 600 },
    { src: "/binghatti/aquarise/3.webp", width: 800, height: 600 },
    { src: "/binghatti/aquarise/4.webp", width: 800, height: 600 },
  ];

  const faqs = [
    {
      q: "What is Binghatti Moonlight?",
      a: "Binghatti Moonlight is a premium mixed-use development located in Al Jaddaf, Dubai, featuring 236 residential apartments, 47 offices, and 3 retail spaces. The project combines modern architecture with smart home technology and world-class amenities.",
    },
    {
      q: "What is the payment plan?",
      a: "We offer a flexible 70/30 payment plan: 20% down payment, 50% during construction, and 30% upon completion in June 2026. This structure makes it easier for investors and end-users to own their dream property.",
    },
    {
      q: "What amenities are included?",
      a: "The project features outdoor office amenities, a roof gym, an infinity pool on the roof, outdoor sitting areas, smart-home systems, and fully equipped kitchens. All designed to provide a luxurious lifestyle experience.",
    },
    {
      q: "How accessible is the location?",
      a: "Al Jaddaf is strategically located with easy access to major landmarks. It's just 3 minutes from Palazzo Versace, 5 minutes from Al Jaddaf Metro Station, 9 minutes from Dubai Mall, and 9 minutes from Dubai International Airport.",
    },
    {
      q: "What are the service charges?",
      a: "The expected service charges are 18 AED per square foot, which covers maintenance of common areas, facilities, and building upkeep to ensure your investment retains its value.",
    },
  ];

  const ProjectCard = ({ project, isMain = false }) => (
    <div
      className={`project-card card-hover bg-gradient-to-br from-gray-900 to-black ${
        isMain ? "p-6 md:p-12" : "p-6"
      } mb-8 w-full`}
    >
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Image */}
        <div
          className={`${
            isMain ? "h-80 md:h-96" : "h-64 md:h-80"
          } bg-gray-800 overflow-hidden relative`}
        >
          <Image
            loading="lazy"
            src={project.image.src}
            alt={project.title}
            width={project.image.width}
            height={project.image.height}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Right Column - Basic Info */}
        <div>
          <h3
            className={`${
              isMain ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
            } font-black mb-4`}
          >
            {project.title}
          </h3>
          <p className="text-gray-400 flex items-center mb-4">
            <FaMapMarkerAlt size={20} className="mr-2" /> {project.location}
          </p>
          <p className="text-gray-300 mb-6 text-sm md:text-base">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-800 p-3 md:p-4">
              <div className="text-gray-500 text-xs md:text-sm mb-1">
                Project No.
              </div>
              <div className="font-bold text-lg md:text-xl">
                {project.projectNo}
              </div>
            </div>
            <div className="border border-gray-800 p-3 md:p-4">
              <div className="text-gray-500 text-xs md:text-sm mb-1">
                Completion
              </div>
              <div className="font-bold text-lg md:text-xl">
                {project.completion}
              </div>
            </div>
            <div className="border border-gray-800 p-3 md:p-4 col-span-2">
              <div className="text-gray-500 text-xs md:text-sm mb-1">
                Total Units
              </div>
              <div className="font-bold text-sm md:text-base">
                {project.totalUnits}
              </div>
            </div>
          </div>

          <a
            href={project.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm md:text-base"
          >
            <FaMapMarkerAlt size={18} />
            View on Map
            <FaArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Unit Types */}
      <div className="border-t border-gray-800 pt-6 md:pt-8 mb-6 md:mb-8">
        <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Unit Types & Pricing
        </h4>
        <div
          className={`grid ${
            isMain
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          } gap-4`}
        >
          {project.units
            .slice(0, isMain ? project.units.length : 3)
            .map((unit, idx) => (
              <div
                key={idx}
                className="bg-black border border-gray-800 p-4 md:p-6"
              >
                <div className="text-lg md:text-xl font-black mb-2 md:mb-3">
                  {unit.type}
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs md:text-sm text-gray-500">
                      {typeof unit.count === "number"
                        ? "Available Units"
                        : "Configuration"}
                    </div>
                    <div className="font-bold text-sm md:text-base">
                      {unit.count}{" "}
                      {typeof unit.count === "number" ? "Units" : ""}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-500">
                      Starting From
                    </div>
                    <div className="text-base md:text-lg font-bold text-white">
                      {unit.price === "Contact" || unit.price === "TBC"
                        ? unit.price
                        : `AED ${unit.price}`}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-500">
                      Size From
                    </div>
                    <div className="font-bold text-sm md:text-base">
                      {unit.size} SqFt
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Payment Plan */}
      <div className="border-t border-gray-800 pt-6 md:pt-8 mb-6 md:mb-8">
        <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
          {project.paymentPlan.title}
        </h4>
        <div
          className={`grid ${
            isMain
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-2 md:grid-cols-4"
          } gap-3 md:gap-4`}
        >
          {project.paymentPlan.breakdown.map((item, idx) => (
            <div
              key={idx}
              className="bg-black border border-gray-800 p-3 md:p-4 text-center"
            >
              <div className="text-xl md:text-2xl font-black mb-1 md:mb-2">
                {item.percentage}
              </div>
              <div className="text-gray-400 text-xs md:text-sm">
                {item.stage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
        <button
          onClick={() => scrollToSection(contactRef)}
          className="bg-white text-black px-6 py-3 md:px-8 md:py-3 font-bold hover:bg-gray-200 transition-all inline-flex items-center gap-2 text-sm md:text-base"
        >
          INQUIRE ABOUT {project.title.split(" ")[1].toUpperCase()}{" "}
          <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/binghatti/moonlight/1.jpg"
            alt="Binghatti Moonlight"
            fill
            className="object-cover object-top"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 w-full">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6 slide-in-left">
              <GiSparkles className="text-white" size={20} />
              <span className="text-xs md:text-sm tracking-widest text-gray-300">
                PREMIUM DEVELOPMENTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 slide-in-left">
              BINGHATTI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                MOONLIGHT
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl fade-in">
              Experience luxury living in the heart of Al Jaddaf
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-12 fade-in">
              <FaMapMarkerAlt className="inline mr-2" size={18} />
              Al Jaddaf, Dubai | Completion: June 2026
            </p>
            <div className="flex flex-col sm:flex-row gap-4 scale-in">
              <button
                onClick={() => scrollToSection(projectRef)}
                className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                EXPLORE PROJECTS <FaArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base"
              >
                BOOK NOW
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20 fade-in">
            <div className="text-center stagger-1">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 text-white">
                4
              </div>
              <div className="text-gray-300 text-xs md:text-sm">
                Premium Projects
              </div>
            </div>
            <div className="text-center stagger-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 text-white">
                2,722
              </div>
              <div className="text-gray-300 text-xs md:text-sm">
                Total Units
              </div>
            </div>
            <div className="text-center stagger-3">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 text-white">
                70/30
              </div>
              <div className="text-gray-300 text-xs md:text-sm">
                Payment Plan
              </div>
            </div>
            <div className="text-center stagger-4">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 text-white">
                2027
              </div>
              <div className="text-gray-300 text-xs md:text-sm">
                Latest Completion
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection(aboutRef)}
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        >
          <FaChevronDown size={24} className="text-white" />
        </button>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                ABOUT <span className="text-gray-500">BINGHATTI</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Established in 2008, Binghatti has emerged as one of
                Dubai&apos;s most recognizable real estate developers, known for
                creating distinctive architectural landmarks that define the
                city&apos;s skyline.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                With over 50 completed projects and 30,000+ satisfied residents,
                we continue to push the boundaries of innovative design while
                maintaining our commitment to quality, sustainability, and
                customer satisfaction.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Our portfolio spans residential, commercial, and mixed-use
                developments across Dubai&apos;s most sought-after locations,
                offering investors and homeowners exceptional value and returns.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  icon: <FaTrophy size={20} className="md:w-6 md:h-6" />,
                  title: "Award-Winning",
                  desc: "Design Excellence",
                },
                {
                  icon: <FaBuilding size={20} className="md:w-6 md:h-6" />,
                  title: "50+ Projects",
                  desc: "Delivered",
                },
                {
                  icon: <FaStar size={20} className="md:w-6 md:h-6" />,
                  title: "Premium",
                  desc: "Quality Standards",
                },
                {
                  icon: <FaUsers size={20} className="md:w-6 md:h-6" />,
                  title: "30K+",
                  desc: "Happy Residents",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="card-hover bg-gradient-to-br from-gray-900 to-black p-4 md:p-6"
                >
                  <div className="mb-2 md:mb-4">{item.icon}</div>
                  <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Card Section - Fixed for Mobile */}
      <section
        id="project"
        ref={projectRef}
        className="py-16 md:py-24 bg-black project-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              OUR <span className="text-gray-500">PROJECTS</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Discover Our Premium Developments
            </p>
          </div>

          {/* Main Project - Moonlight */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <GiSparkles className="text-yellow-400" size={24} />
              <h3 className="text-2xl md:text-3xl font-black">
                Featured Project
              </h3>
            </div>
            <ProjectCard project={projects.moonlight} isMain={true} />
          </div>

          {/* Side Projects */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <FaBuilding className="text-gray-400" size={24} />
              <h3 className="text-2xl md:text-3xl font-black text-gray-400">
                Other Premium Projects
              </h3>
            </div>
            <div className="space-y-8">
              <ProjectCard project={projects.jacobco} />
              <ProjectCard project={projects.aquarise} />
              <ProjectCard project={projects.skyblade} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        ref={galleryRef}
        className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              PROJECT <span className="text-gray-500">GALLERY</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Visual Journey Through Excellence
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollGallery("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 md:p-3 transition-all"
            aria-label="Previous"
          >
            <FaChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>

          <div
            ref={galleryScrollRef}
            className="gallery-scroll flex gap-4 md:gap-6 overflow-x-auto px-4 pb-4"
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative shrink-0 w-64 h-48 md:w-96 md:h-64 group overflow-hidden cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={img.src}
                  alt={`Gallery ${idx + 1}`}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-3xl md:text-5xl font-light">
                    +
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollGallery("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 md:p-3 transition-all"
            aria-label="Next"
          >
            <FaChevronRight size={24} className="md:w-8 md:h-8" />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-16 md:py-24 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              GET IN <span className="text-gray-500">TOUCH</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Contact Us for Project Inquiries
            </p>
          </div>

          <div className="card-hover bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 md:p-8 lg:p-12 border-2 border-gray-800">
            <div className="mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-1 h-6 md:h-8 bg-white"></div>
              <h3 className="text-xl md:text-2xl font-bold">Inquiry Form</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-black border-2 ${
                      formErrors.name ? "border-red-500" : "border-gray-800"
                    } focus:outline-none focus:border-white transition-all text-white placeholder-gray-600 text-sm md:text-base`}
                  />
                  {formErrors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 bg-black border-2 ${
                      formErrors.email ? "border-red-500" : "border-gray-800"
                    } focus:outline-none focus:border-white transition-all text-white placeholder-gray-600 text-sm md:text-base`}
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-400">
                  Phone Number *
                </label>
                <CountrySelect
                  styling={`flex items-center w-full px-4 py-2.5 bg-black border-2 ${
                    formErrors.phone ? "border-red-500" : "border-gray-800"
                  } focus-within:border-white transition-all text-sm md:text-base`}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  labels={en}
                  flagComponents={flags}
                  onPhoneChange={(phone) => setFormData({ ...formData, phone })}
                  error={formErrors.phone}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-400">
                  Project Interest
                </label>
                <select
                  value={formData.projectInterest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectInterest: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-black border-2 border-gray-800 focus:outline-none focus:border-white transition-all text-white text-sm md:text-base"
                >
                  <option value="">Select a project</option>
                  <option value="Binghatti Moonlight">
                    Binghatti Moonlight
                  </option>
                  <option value="Burj Binghatti Jacob&Co Residences">
                    Burj Binghatti Jacob&Co Residences
                  </option>
                  <option value="Binghatti Aquarise">Binghatti Aquarise</option>
                  <option value="Binghatti Skyblade">Binghatti Skyblade</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-400">
                  Message
                </label>
                <textarea
                  placeholder="Tell us which project you're interested in or any specific requirements..."
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border-2 border-gray-800 focus:outline-none focus:border-white transition-all resize-none text-white placeholder-gray-600 text-sm md:text-base"
                ></textarea>
              </div>

              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px" }}
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black px-6 py-3 md:px-8 md:py-4 font-bold hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 relative overflow-hidden group text-sm md:text-base"
              >
                <span className="relative z-10">
                  {isSubmitting ? "SUBMITTING..." : "SEND INQUIRY"}
                </span>
                {!isSubmitting && (
                  <FaArrowRight size={18} className="relative z-10" />
                )}
              </button>

              {submitStatus === "success" && (
                <div className="bg-green-900/30 border-2 border-green-500 text-green-400 px-4 py-3 md:px-6 md:py-4 text-center font-semibold text-sm md:text-base">
                  <FaCheck className="inline mr-2" />
                  Thank you! We&apos;ll contact you within 24 hours.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-900/30 border-2 border-red-500 text-red-400 px-4 py-3 md:px-6 md:py-4 text-center font-semibold text-sm md:text-base">
                  ✗ Failed to submit. Please try again or call us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="text-gray-500">FAQ</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Common Questions Answered
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card-hover bg-gray-900 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-4 py-4 md:px-6 md:py-5 text-left flex justify-between items-center"
                >
                  <span className="font-semibold text-base md:text-lg pr-4">
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`transition-transform shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 md:px-6 md:pb-5 text-gray-400 leading-relaxed border-t border-gray-800 pt-3 md:pt-4 text-sm md:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 md:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
            {/* Contact Info - Left Side */}
            <div className="text-center md:text-left flex flex-col md:items-start items-center">
              <h3 className="font-bold text-lg mb-3 md:mb-4">Contact</h3>
              <div className="space-y-2 md:space-y-3 text-gray-500">
                <div className="flex items-start">
                  <FaEnvelope size={16} className="mr-2 mt-1 shrink-0" />
                  <Link
                    href="mailto:info@hsproperty.ae"
                    className="text-sm md:text-base hover:text-white transition-colors duration-300"
                  >
                    info@hsproperty.ae
                  </Link>
                </div>
                <div className="flex items-start">
                  <FaPhone size={16} className="mr-2 mt-1 shrink-0" />
                  <Link
                    href="tel:+971526902884"
                    className="text-sm md:text-base hover:text-white transition-colors duration-300"
                  >
                    +971 (0) 4 345 4888
                  </Link>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt size={16} className="mr-2 mt-1 shrink-0" />
                  <Link
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="text-sm md:text-base hover:text-white transition-colors duration-300 text-left"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Links - Right Side */}
            <div className="text-center md:text-right flex flex-col md:items-end items-center">
              <h3 className="font-bold text-lg mb-3 md:mb-4">Follow Us</h3>
              <div className="flex gap-3 mb-4 md:mb-6">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 border border-gray-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 border border-gray-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 border border-gray-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                >
                  <FaLinkedinIn size={16} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971526902884&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 border border-gray-800 flex items-center justify-center hover:border-white hover:bg-white hover:text-black transition-all"
                >
                  <BsWhatsapp size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright - Bottom */}
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-gray-500">
            <p className="text-sm md:text-base">
              &copy; Copyright 2025 H&S Real Estate, All Rights Reserved
            </p>
            <p className="text-xs md:text-sm mt-2">
              Premium Real Estate Developments in Dubai
            </p>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Close gallery"
          >
            <IoClose size={36} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 md:left-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Previous image"
          >
            <FaChevronLeft size={32} />
          </button>

          <div className="max-w-7xl w-full">
            <div className="flex items-center justify-center">
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={`Gallery ${lightboxIndex + 1}`}
                width={1920}
                height={1080}
                loading="lazy"
                className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain"
              />
            </div>
            <div className="text-center text-white mt-4 md:mt-6 text-base md:text-lg font-medium">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 md:right-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Next image"
          >
            <FaChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BinghattiLandingPage;
