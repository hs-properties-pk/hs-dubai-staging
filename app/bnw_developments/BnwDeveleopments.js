"use client";
import React, { useState, useEffect, useRef } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import Image from "next/image";
import "./bnw.css";

// React Icons imports
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaCheck,
  FaAward,
  FaUsers,
  FaBuilding,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

// Country Select Component
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
              <span className="text-gray-700">+{countryCode}</span>
            </>
          )}
          <span className="ml-1 text-gray-500">{isOpen ? "▲" : "▼"}</span>
        </button>

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          className="grow pl-4 focus:outline-none bg-transparent text-gray-900"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 border border-gray-300 bg-white w-full rounded-b shadow-xl max-h-80 mt-1">
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full px-4 py-2 focus:outline-none border-b border-gray-200 text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => {
              const Flag = flagComponents[country];
              return (
                <li
                  key={country}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

const BNWLandingPage = () => {
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  // Map section names to refs
  const refs = {
    home: heroRef,
    about: aboutRef,
    projects: projectsRef,
    gallery: galleryRef,
    contact: contactRef,
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          if (entry.target.id) setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
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
      const res = await fetch("/api/send-bnw-submissions", {
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
          source: "BNW Developments",
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
        throw new Error(result.message || "Failed to send inquiry");
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
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  const primaryProjects = [
    {
      title: "Aqua Maya",
      location: "Al Marjan Island 4, Ras Al Khaimah",
      description:
        "An Elegant Lifestyle Awaits! Fully furnished residences designed for calm & comfort near the upcoming Wynn Resort",
      image: "/bnw_developments/aqua_maya/2.webp",
      features: [
        "Fully Furnished",
        "Near Wynn Resort",
        "Q4 2027",
        "From AED 1.78M",
      ],
      completion: "Q4 2027",
      price: "Starting from AED 1.78M",
      units: "1/2/3/4 BR",
      payment: "20% Booking | 30% Construction | 50% Completion",
      tag: "Primary",
    },
    {
      title: "Fashion TV Acacia",
      location: "Al Marjan Island 4, Ras Al Khaimah",
      description:
        "FashionTV-branded residences offering luxury living near the upcoming Wynn Resort",
      image: "/bnw_developments/acasia/2.webp",
      features: [
        "FashionTV Branded",
        "Fully Furnished",
        "Q2 2028",
        "From AED 1.9M",
      ],
      completion: "Q2 2028",
      price: "Starting from AED 1.9M",
      units: "1/2/3 BR",
      payment: "Flexible Payment Plans Available",
      tag: "Featured",
    },
    {
      title: "TAJ Wellington Mews",
      location: "Al Marjan Island 4, Ras Al Khaimah",
      description:
        "Hotel branded residence by Taj offering stress-free, hassle-free investment opportunity",
      image: "/bnw_developments/taj/1.webp",
      features: ["Taj Branded", "Studios to 3BR", "Q1 2028", "From AED 1.5M"],
      completion: "Q1 2028",
      price: "Starting from AED 1.5M",
      units: "Studios / 1/2/3 BR",
      payment: "20% Booking | 60% Construction | 30% Completion",
      tag: "Featured",
    },
  ];

  const galleryImages = [
    "/bnw_developments/aqua_maya/2.webp",
    "/bnw_developments/aqua_maya/3.webp",
    "/bnw_developments/aqua_maya/4.webp",
    "/bnw_developments/aqua_maya/5.webp",
    "/bnw_developments/acasia/2.webp",
    "/bnw_developments/taj/1.webp",
    "/bnw_developments/taj/2.webp",
    "/bnw_developments/taj/3.webp",
    "/bnw_developments/taj/4.webp",
  ];

  const faqs = [
    {
      q: "What makes BNW Developments unique?",
      a: "Its emphasis on developing serene and design-forward spaces offering a perfect blend of luxury and excellence makes it a unique real estate development company. It strives to develop futuristic real estate to set new development standards.",
    },
    {
      q: "What are some popular projects of BNW Developments?",
      a: "Aqua Arc, Taj Wellington Mews, Aquino, Pelagia, Aqua Maya, and Fashion TV Acacia are some of the most popular projects. We develop futuristic real estate to meet the needs and preferences of investors.",
    },
    {
      q: "Are BNW Developments' properties suitable for investment?",
      a: "Yes. This property company develops luxury real estate projects to extend excellent investment opportunities. No matter whether you seek a comfortable living space or high returns on investment, investing in its projects is considered a decent choice.",
    },
    {
      q: "Why consider BNW Developments' projects for real estate investment?",
      a: "This property company develops luxury real estate and strives to offer long-term value to property investors. Its projects offer both elegant living spaces and excellent returns.",
    },
    {
      q: "What payment plans are available?",
      a: "We offer flexible payment plans including options like 20% on booking, with the remaining amount split between construction and completion phases. Contact us for specific payment plan details for your chosen project.",
    },
  ];

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/bnw_developments/hero.webp"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 floating text-white drop-shadow-lg">
            Building <span className="gradient-text">Dreams</span>
            <br />
            Creating <span className="gradient-text">Legacies</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto drop-shadow-md px-4">
            Premium real estate developments that redefine luxury living and set
            new standards in architectural excellence
          </p>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow"
          >
            Explore Our Projects
          </button>
        </div>

        <button
          onClick={() => scrollToSection(aboutRef)}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white"
        >
          <FaChevronDown size={32} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="slide-in-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                About <span className="gradient-text">BNW</span> Developments
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                BNW is a prominent real estate development company known for
                developing sanctuaries of sophistication. Our developments
                embody an elegant lifestyle where you can experience a seamless
                blend of luxury, modernity and simplicity.
              </p>
              <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                We build something more than just ordinary living places to meet
                the diverse needs of our clients. We intend to offer refined
                living experiences, allowing residents to live to the fullest
                and realize their dream way of living.
              </p>
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center scale-in stagger-1">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-2">
                    6+
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm lg:text-md">
                    Iconic Projects
                  </div>
                </div>
                <div className="text-center scale-in stagger-2">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-2">
                    2021
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm lg:text-md">
                    Founded In
                  </div>
                </div>
                <div className="text-center scale-in stagger-3">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold gradient-text mb-2">
                    5★
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm lg:text-md">
                    Luxury Living
                  </div>
                </div>
              </div>
            </div>
            <div className="relative slide-in-right">
              <Image
                src="/bnw_developments/acasia/1.webp"
                alt="About BNW"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl w-full h-auto"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-choose"
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Why Choose <span className="gradient-text">BNW</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Excellence in every aspect of development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaAward className="w-12 h-12 text-yellow-600" />,
                title: "Sanctuaries of Sophistication",
                description:
                  "Developing serene and design-forward spaces offering a perfect blend of luxury and excellence",
              },
              {
                icon: <FaUsers className="w-12 h-12 text-yellow-600" />,
                title: "Refined Living Experiences",
                description:
                  "More than just living places - we create spaces where residents can live to the fullest",
              },
              {
                icon: <FaBuilding className="w-12 h-12 text-yellow-600" />,
                title: "Futuristic Real Estate",
                description:
                  "Setting new development standards with innovative and unique projects",
              },
              {
                icon: <FaChartLine className="w-12 h-12 text-yellow-600" />,
                title: "Excellent Returns",
                description:
                  "Properties that offer both elegant living spaces and long-term investment value",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`card-hover bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center fade-in-up stagger-${
                  idx + 1
                }`}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Projects */}
      <section id="projects" ref={projectsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Flagship <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Discover our most prestigious developments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {primaryProjects.map((project, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 bg-gradient-to-r ${
                      project.tag === "Featured"
                        ? "from-blue-600 to-blue-500"
                        : "from-yellow-600 to-orange-500"
                    }  text-white px-4 py-1 rounded-full text-sm font-semibold`}
                  >
                    {project.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 mb-3 flex items-start text-sm">
                    <FaMapMarkerAlt
                      size={16}
                      className="mr-2 mt-0.5 shrink-0"
                    />{" "}
                    {project.location}
                  </p>

                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Units:</span>
                      <span className="font-semibold text-gray-900">
                        {project.units}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="font-semibold text-yellow-600">
                        {project.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completion:</span>
                      <span className="font-semibold text-gray-900">
                        {project.completion}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 font-medium mb-1">
                      Payment Plan:
                    </p>
                    <p className="text-xs text-gray-700">{project.payment}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <FaCheck
                          size={14}
                          className="mr-1.5 text-yellow-600 shrink-0"
                        />{" "}
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" ref={galleryRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Project <span className="gradient-text">Gallery</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              A visual journey through our finest creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="card-hover relative h-64 rounded-xl overflow-hidden group shadow-md cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  loading="lazy"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-5xl font-light">+</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        ref={contactRef}
        className="py-12 sm:py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              Let&apos;s discuss your dream property
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Image */}
            <div className="relative order-2 lg:order-1 hidden lg:block">
              <Image
                src="/bnw_developments/aqua_maya/3.webp"
                alt="Contact Us"
                width={800}
                loading="lazy"
                height={600}
                className="rounded-2xl shadow-2xl w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl -z-10"></div>

              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-900">
                  Visit Our Office
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                </p>
                <div className="flex items-center text-gray-600 mb-2 text-sm sm:text-base">
                  <FaPhone size={16} className="mr-2 sm:mr-3 shrink-0" />
                  <span>+971 (0) 4 345 4888</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm sm:text-base">
                  <FaEnvelope size={16} className="mr-2 sm:mr-3 shrink-0" />
                  <span className="break-all">info@hsproperty.ae</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2 w-full">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border ${
                      formErrors.name ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all text-sm sm:text-base`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border ${
                      formErrors.email ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all text-sm sm:text-base`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <CountrySelect
                    styling={`flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border ${
                      formErrors.phone ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus-within:border-yellow-600 focus-within:ring-2 focus-within:ring-yellow-200 transition-all text-sm sm:text-base`}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    labels={en}
                    flagComponents={flags}
                    onPhoneChange={(phone) =>
                      setFormData({ ...formData, phone })
                    }
                    error={formErrors.phone}
                  />
                </div>

                <div>
                  <select
                    value={formData.projectInterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectInterest: e.target.value,
                      })
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all text-gray-900 text-sm sm:text-base"
                  >
                    <option value="">Select Project Interest</option>
                    <option value="Aqua Maya">Aqua Maya</option>
                    <option value="Fashion TV Acacia">Fashion TV Acacia</option>
                    <option value="TAJ Wellington Mews">
                      TAJ Wellington Mews
                    </option>
                    <option value="Aqua Arc">Aqua Arc</option>
                    <option value="Aquino">Aquino</option>
                    <option value="Pelagia">Pelagia</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition-all resize-none text-sm sm:text-base"
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
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-500 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center text-sm sm:text-base">
                    <FaCheck className="inline mr-2" />
                    Thank you! We&apos;ve received your inquiry and will contact
                    you within 24 hours.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-500 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center text-sm sm:text-base">
                    Something went wrong. Please try again or contact us
                    directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Everything you need to know
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold md:text-lg text-sm text-gray-900">
                    {faq.q}
                  </span>
                  <FaChevronDown
                    className={`transition-transform text-gray-600 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info - Centered */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-6 text-gray-900">
                Contact Info
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center justify-center md:justify-start">
                  <FaEnvelope size={18} className="mr-3 shrink-0" />
                  <Link
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-gray-900 transition-colors duration-300"
                  >
                    info@hsproperty.ae
                  </Link>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <FaPhone size={18} className="mr-3 shrink-0" />
                  <Link
                    href="tel:+971526902884"
                    className="hover:text-gray-900 transition-colors duration-300"
                  >
                    +971 (0) 4 345 4888
                  </Link>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <FaMapMarkerAlt size={18} className="mr-3 shrink-0" />
                  <Link
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="text-center md:text-left hover:text-gray-900 transition-colors duration-300"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Links - Centered */}
            <div className="text-center md:text-left flex flex-col md:items-end items-ceter">
              <h3 className="font-semibold text-lg mb-6 text-gray-900">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-500 hover:text-white transition-all text-gray-700"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-500 hover:text-white transition-all text-gray-700"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-500 hover:text-white transition-all text-gray-700"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971526902884&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-500 hover:text-white transition-all text-gray-700"
                >
                  <BsWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 text-center text-gray-600">
            <p>Copyright &copy; 2025 H&S Real Estate, All Rights Reserved</p>
          </div>
        </div>
      </footer>
      {/* Lightbox Gallery Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Close gallery"
          >
            <IoClose size={36} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Previous image"
          >
            <FaChevronLeft size={40} />
          </button>

          <div className="max-w-7xl w-full">
            <div className="flex items-center justify-center">
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Gallery ${lightboxIndex + 1}`}
                width={1920}
                height={1080}
                loading="lazy"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </div>
            <div className="text-center text-white mt-6 text-lg font-medium">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Next image"
          >
            <FaChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BNWLandingPage;
