"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaHome,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTimes,
  FaCheck,
  FaChevronRight,
  FaChevronLeft,
  FaStar,
  FaHeart,
  FaChartLine,
  FaKey,
  FaUsers,
  FaBuilding,
  FaTree,
  FaDumbbell,
  FaCar,
  FaShieldAlt,
  FaWifi,
} from "react-icons/fa";

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    propertyType: "",
    lifestyle: "",
    budget: "",
    timeline: "",
    priority: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form steps configuration
  const formSteps = [
    {
      id: "welcome",
      type: "welcome",
      title: "Find Your Dream Home at Avana Residence",
      subtitle:
        "Answer a few quick questions and we'll match you with your perfect property in less than 2 minutes.",
      buttonText: "Start Your Journey",
    },
    {
      id: "name",
      type: "input",
      question: "First, what's your name?",
      placeholder: "Enter your name",
      field: "name",
      icon: <FaUsers className="w-6 h-6" />,
    },
    {
      id: "propertyType",
      type: "choice",
      question: (name) =>
        `Nice to meet you, ${name}! What type of property interests you?`,
      field: "propertyType",
      icon: <FaBuilding className="w-6 h-6" />,
      options: [
        { value: "studio", label: "Studio", icon: "🏠" },
        { value: "1br", label: "1 Bedroom", icon: "🛏️" },
        { value: "2br", label: "2 Bedrooms", icon: "🏡" },
        { value: "3br", label: "3 Bedrooms", icon: "🏘️" },
        { value: "penthouse", label: "Penthouse", icon: "👑" },
      ],
    },
    {
      id: "lifestyle",
      type: "choice",
      question: "What best describes your lifestyle goal?",
      field: "lifestyle",
      icon: <FaHeart className="w-6 h-6" />,
      options: [
        { value: "family", label: "Family Living", icon: "👨‍👩‍👧‍👦" },
        { value: "investment", label: "Investment Property", icon: "💰" },
        { value: "luxury", label: "Luxury Lifestyle", icon: "✨" },
        { value: "first-home", label: "First Home", icon: "🔑" },
      ],
    },
    {
      id: "budget",
      type: "choice",
      question: "What's your estimated budget?",
      field: "budget",
      icon: <FaChartLine className="w-6 h-6" />,
      options: [
        { value: "under-1m", label: "Under 1M AED", icon: "💵" },
        { value: "1m-2m", label: "1M - 2M AED", icon: "💰" },
        { value: "2m-3m", label: "2M - 3M AED", icon: "💎" },
        { value: "3m-5m", label: "3M - 5M AED", icon: "👑" },
        { value: "above-5m", label: "Above 5M AED", icon: "🌟" },
      ],
    },
    {
      id: "timeline",
      type: "choice",
      question: "When are you planning to buy?",
      field: "timeline",
      icon: <FaKey className="w-6 h-6" />,
      options: [
        { value: "ready", label: "Ready to Move", icon: "🚀" },
        { value: "3-6months", label: "3-6 Months", icon: "📅" },
        { value: "6-12months", label: "6-12 Months", icon: "🗓️" },
        { value: "exploring", label: "Just Exploring", icon: "🔍" },
      ],
    },
    {
      id: "priority",
      type: "choice",
      question: "What matters most to you?",
      field: "priority",
      icon: <FaStar className="w-6 h-6" />,
      options: [
        { value: "location", label: "Prime Location", icon: "📍" },
        { value: "amenities", label: "Luxury Amenities", icon: "🏊" },
        { value: "roi", label: "Investment ROI", icon: "📈" },
        { value: "design", label: "Modern Design", icon: "🎨" },
      ],
    },
    {
      id: "email",
      type: "input",
      question: (name) =>
        `Great choices, ${name}! Where should we send your personalized property matches?`,
      placeholder: "your@email.com",
      field: "email",
      inputType: "email",
      icon: <FaEnvelope className="w-6 h-6" />,
    },
    {
      id: "phone",
      type: "input",
      question: (name) =>
        `Thanks ${name}! What's the best number to reach you?`,
      placeholder: "+971 XX XXX XXXX",
      field: "phone",
      inputType: "tel",
      icon: <FaPhone className="w-6 h-6" />,
    },
    {
      id: "success",
      type: "success",
      title: (name) => `Perfect, ${name}! 🎉`,
      subtitle:
        "We're preparing your personalized property matches. Our team will contact you within 24 hours with exclusive listings tailored to your preferences.",
    },
  ];

  const openForm = () => {
    setIsFormOpen(true);
    setCurrentStep(0);
    document.body.style.overflow = "hidden";
  };

  const closeForm = () => {
    setIsFormOpen(false);
    document.body.style.overflow = "auto";
    if (submitSuccess) {
      setCurrentStep(0);
      setFormData({
        name: "",
        propertyType: "",
        lifestyle: "",
        budget: "",
        timeline: "",
        priority: "",
        email: "",
        phone: "",
      });
      setSubmitSuccess(false);
    }
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChoice = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(() => nextStep(), 400);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputSubmit = () => {
    const currentField = formSteps[currentStep].field;
    if (formData[currentField]) {
      if (currentStep === formSteps.length - 2) {
        // Last input step, submit form
        handleSubmit();
      } else {
        nextStep();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate form submission without API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    nextStep();
  };

  const progress = (currentStep / (formSteps.length - 1)) * 100;
  const currentStepData = formSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-orange-200/15 to-rose-200/20 animate-pulse-slow"></div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-orange-800/30 to-rose-900/40 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt="Avana Residence"
            className="w-full h-full object-cover transform scale-105 animate-zoom-slow"
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-amber-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-orange-300 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-rose-400 rounded-full animate-float"></div>

        {/* Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg border border-amber-200/50 animate-fade-in">
            <FaStar className="w-5 h-5 text-amber-600 animate-spin-slow" />
            <span className="text-sm font-semibold text-gray-800 tracking-wide">
              NOW SELLING
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-tight animate-slide-up">
            Welcome to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 animate-gradient">
              Avana Residence
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto drop-shadow-lg animate-slide-up delay-100">
            Where Modern Living Meets Natural Serenity
          </p>

          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto drop-shadow-lg animate-slide-up delay-200">
            Discover your perfect home in Dubai&aposs most sought-after
            community. Premium residences with world-class amenities, surrounded
            by lush landscapes.
          </p>

          <button
            onClick={openForm}
            className="group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 animate-bounce-gentle shadow-2xl"
          >
            <span className="bg-white/20 rounded-full p-1">
              <FaHome className="w-5 h-5" />
            </span>
            Find Your Perfect Home
            <FaChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto animate-slide-up delay-300">
            {[
              { label: "Premium Units", value: "320+" },
              { label: "Completion", value: "2026" },
              { label: "Payment Plan", value: "60/40" },
              { label: "ROI", value: "8-10%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50/50 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Life at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Avana
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience a lifestyle designed around your comfort and
              convenience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTree className="w-8 h-8" />,
                title: "Landscaped Gardens",
                desc: "Lush green spaces and walking trails throughout the community",
              },
              {
                icon: <FaDumbbell className="w-8 h-8" />,
                title: "Premium Gym",
                desc: "State-of-the-art fitness center with modern equipment",
              },
              {
                icon: <FaUsers className="w-8 h-8" />,
                title: "Family Pools",
                desc: "Multiple swimming pools including kids splash area",
              },
              {
                icon: <FaCar className="w-8 h-8" />,
                title: "Covered Parking",
                desc: "Dedicated parking spaces for residents and guests",
              },
              {
                icon: <FaShieldAlt className="w-8 h-8" />,
                title: "24/7 Security",
                desc: "Round-the-clock security with CCTV surveillance",
              },
              {
                icon: <FaWifi className="w-8 h-8" />,
                title: "Smart Homes",
                desc: "Integrated smart home technology in every unit",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-amber-100 relative overflow-hidden"
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                <div className="text-amber-600 mb-4 group-hover:scale-110 transition-transform relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)] animate-pulse-slow"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Take our quick 2-minute questionnaire and get matched with your
            perfect property
          </p>
          <button
            onClick={openForm}
            className="bg-white text-orange-600 px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 group shadow-2xl"
          >
            <span className="bg-orange-100 rounded-full p-1 group-hover:scale-110 transition-transform">
              <FaKey className="w-5 h-5" />
            </span>
            Start Your Property Journey
            <FaChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(251,191,36,0.1)_0%,_transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Avana Residence
              </h3>
              <p className="text-gray-400">
                Your gateway to premium living in Dubai
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-pointer">
                  <FaEnvelope className="w-4 h-4" /> info@hsproperty.ae
                </p>
                <p className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-pointer">
                  <FaPhone className="w-4 h-4" /> +971 (0) 4 345 4888
                </p>
                <p className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-pointer">
                  <FaMapMarkerAlt className="w-4 h-4" /> Dubai, UAE
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  {
                    icon: FaInstagram,
                    href: "https://www.instagram.com/hs_property/",
                  },
                  {
                    icon: FaFacebook,
                    href: "https://www.facebook.com/hspropertyrealestate",
                  },
                  {
                    icon: FaLinkedin,
                    href: "https://www.linkedin.com/company/h-s-properties/",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Avana Residence. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Interactive Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-scale-in">
            {/* Progress Bar */}
            {currentStepData.type !== "welcome" &&
              currentStepData.type !== "success" && (
                <div className="w-full h-2 bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

            {/* Close Button */}
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-300 z-20 hover:scale-110 hover:shadow-lg"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {/* Welcome Screen */}
              {currentStepData.type === "welcome" && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                    <FaHome className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {currentStepData.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    {currentStepData.subtitle}
                  </p>
                  <button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-3 group"
                  >
                    {currentStepData.buttonText}
                    <FaChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {/* Input Screen */}
              {currentStepData.type === "input" && (
                <div className="animate-slide-in">
                  <div className="text-amber-600 mb-6">
                    {currentStepData.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {typeof currentStepData.question === "function"
                      ? currentStepData.question(formData.name)
                      : currentStepData.question}
                  </h2>
                  <input
                    type={currentStepData.inputType || "text"}
                    value={formData[currentStepData.field]}
                    onChange={(e) =>
                      handleInputChange(currentStepData.field, e.target.value)
                    }
                    onKeyPress={(e) => e.key === "Enter" && handleInputSubmit()}
                    placeholder={currentStepData.placeholder}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-amber-500 focus:outline-none transition-colors hover:border-amber-300 focus:shadow-lg"
                    autoFocus
                  />
                  <div className="flex gap-4 mt-8">
                    {currentStep > 1 && (
                      <button
                        onClick={prevStep}
                        className="px-6 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 hover:shadow-lg hover:scale-105"
                      >
                        <FaChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleInputSubmit}
                      disabled={
                        !formData[currentStepData.field] || isSubmitting
                      }
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          Continue
                          <FaChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Choice Screen */}
              {currentStepData.type === "choice" && (
                <div className="animate-slide-in">
                  <div className="text-amber-600 mb-6">
                    {currentStepData.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {typeof currentStepData.question === "function"
                      ? currentStepData.question(formData.name)
                      : currentStepData.question}
                  </h2>
                  <div className="space-y-3">
                    {currentStepData.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleChoice(currentStepData.field, option.value)
                        }
                        className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 hover:border-amber-500 hover:bg-amber-50 hover:scale-105 hover:shadow-lg ${
                          formData[currentStepData.field] === option.value
                            ? "border-amber-500 bg-amber-50 shadow-lg scale-105"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="text-3xl">{option.icon}</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {option.label}
                        </span>
                        {formData[currentStepData.field] === option.value && (
                          <FaCheck className="w-6 h-6 text-amber-600 ml-auto animate-bounce-in" />
                        )}
                      </button>
                    ))}
                  </div>
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="mt-6 px-6 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 hover:shadow-lg hover:scale-105"
                    >
                      <FaChevronLeft className="w-5 h-5" />
                      Back
                    </button>
                  )}
                </div>
              )}

              {/* Success Screen */}
              {currentStepData.type === "success" && (
                <div className="text-center py-8 animate-scale-in">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                    <FaCheck className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {currentStepData.title(formData.name)}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    {currentStepData.subtitle}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={closeForm}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:scale-105 transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(0);
                        setFormData({
                          name: "",
                          propertyType: "",
                          lifestyle: "",
                          budget: "",
                          timeline: "",
                          priority: "",
                          email: "",
                          phone: "",
                        });
                        setSubmitSuccess(false);
                      }}
                      className="px-8 py-4 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors hover:shadow-lg hover:scale-105"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-5deg);
          }
        }

        @keyframes zoom-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .animate-zoom-slow {
          animation: zoom-slow 20s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
