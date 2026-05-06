"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import { FaTimes, FaCheck, FaArrowRight, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { communityListings } from "@/data/community-data";

const budgetOptions = [
  {
    value: "under-1.5m",
    title: "Under AED 1.5M",
    description: "Starter apartments and value-for-money picks",
  },
  {
    value: "1.5m-5m",
    title: "AED 1.5M – AED 5M",
    description: "Mid-range apartments, townhouses, starter villas",
  },
  {
    value: "5m-15m",
    title: "AED 5M – AED 15M",
    description: "Premium villas, luxury apartments, signature homes",
  },
  {
    value: "15m-plus",
    title: "AED 15M+",
    description: "Ultra-luxury mansions, private beach estates",
  },
];

const primaryGoalOptions = [
  {
    value: "live",
    title: "I want to live there",
    description: "Looking for my dream home or family residence",
  },
  {
    value: "invest",
    title: "Investment / Rental Income",
    description: "Looking for highest yield and capital growth",
  },
  {
    value: "both",
    title: "Both  Live & Invest",
    description: "Want to enjoy the property and earn on it too",
  },
];

const lifestyleOptions = [
  {
    value: "waterfront",
    title: "Waterfront & Beach Life",
    description: "I want sea views, beach access, marina living",
  },
  {
    value: "family",
    title: "Family & Community",
    description: "I need good schools, parks, safe environment",
  },
  {
    value: "urban",
    title: "Urban City Living",
    description: "I want to be in the heart of everything",
  },
  {
    value: "villa",
    title: "Villa & Green Living",
    description: "I prefer privacy, space, and garden lifestyle",
  },
];

const timelineOptions = [
  {
    value: "3months",
    title: "Within 3 Months",
    description: "I'm ready to move quickly  show me ready properties",
  },
  {
    value: "6-12months",
    title: "Within 6–12 Months",
    description: "I'm actively searching  ready and off-plan options",
  },
  {
    value: "exploring",
    title: "Just Exploring",
    description: "Researching options  off-plan investments welcome",
  },
];

// Improved data-driven matching algorithm - scalable for future communities
const findMatchingCommunities = (answers) => {
  const { primaryGoal, lifestyle, budget, timeline } = answers;
  
  // Keyword mappings for lifestyle preferences
  const lifestyleKeywords = {
    waterfront: [
      "waterfront", "beach", "marina", "coastal", "island", "creek", "harbour", 
      "sea", "ocean", "water", "shore", "bay", "coastline"
    ],
    family: [
      "family", "schools", "parks", "community", "safe", "green", "nature", 
      "residential", "master", "amenities", "recreation", "wellness"
    ],
    urban: [
      "urban", "city", "downtown", "central", "commercial", "mixed-use", 
      "apartments", "high-rise", "metropolitan", "business", "retail"
    ],
    villa: [
      "villa", "townhouse", "private", "spacious", "garden", "landscaped", 
      "luxury", "exclusive", "residential", "estate", "country"
    ]
  };

  // Budget range inference based on community characteristics
  const budgetRanges = {
    "under-1.5m": {
      preferredTypes: ["Apartments", "Studio"],
      preferredCategories: ["Sub-Community", "Mixed-Use Community"],
      keywords: ["starter", "value", "affordable", "apartments"]
    },
    "1.5m-5m": {
      preferredTypes: ["Apartments", "Townhouses", "Villas"],
      preferredCategories: ["Master Community", "Sub-Community"],
      keywords: ["mid-range", "townhouse", "starter villas"]
    },
    "5m-15m": {
      preferredTypes: ["Villas", "Penthouses", "Townhouses"],
      preferredCategories: ["Master Community", "Waterfront Community"],
      keywords: ["premium", "luxury", "signature", "villa"]
    },
    "15m-plus": {
      preferredTypes: ["Villas", "Mansions", "Penthouses"],
      preferredCategories: ["Master Community", "Waterfront Community", "Island Community"],
      keywords: ["ultra-luxury", "mansion", "exclusive", "private", "beach estate"]
    }
  };

  // Helper function to check if text contains keywords
  const containsKeywords = (text, keywords) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
  };

  // Helper function to calculate keyword match score
  const calculateKeywordScore = (text, keywords, maxScore = 15) => {
    if (!text) return 0;
    const lowerText = text.toLowerCase();
    const matches = keywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    ).length;
    return Math.min((matches / keywords.length) * maxScore, maxScore);
  };

  // Score each community based on quiz answers
  const scoredCommunities = communityListings.map((community) => {
    let score = 0;
    const description = community.description || "";
    const communityType = community.communityType || "";
    const category = community.category || "";
    
    // 1. Lifestyle matching (highest weight - 40 points)
    if (lifestyle && lifestyleKeywords[lifestyle]) {
      const keywords = lifestyleKeywords[lifestyle];
      
      // Exact category match (20 points)
      if (lifestyle === "waterfront" && category === "Waterfront Community") {
        score += 20;
      } else if (lifestyle === "family" && category === "Master Community") {
        score += 20;
      } else if (lifestyle === "urban" && category === "Mixed-Use Community") {
        score += 20;
      }
      
      // Community type match (15 points)
      if (containsKeywords(communityType, keywords)) {
        score += 15;
      }
      
      // Description keyword match (15 points)
      score += calculateKeywordScore(description, keywords, 15);
      
      // Bonus for exact lifestyle match in community type (5 points)
      if (lifestyle === "waterfront" && communityType.includes("Waterfront")) {
        score += 5;
      } else if (lifestyle === "family" && (communityType.includes("Villas") || communityType.includes("Townhouses"))) {
        score += 5;
      } else if (lifestyle === "urban" && communityType.includes("Apartments")) {
        score += 5;
      } else if (lifestyle === "villa" && (communityType.includes("Villas") || communityType.includes("Townhouses"))) {
        score += 5;
      }
    }
    
    // 2. Primary goal matching (30 points)
    if (primaryGoal === "live") {
      // For living, prioritize master communities and family-friendly areas
      if (category === "Master Community") {
        score += 20;
      }
      // Bonus for family-friendly keywords
      if (containsKeywords(description, ["family", "residential", "community", "parks", "schools"])) {
        score += 10;
      }
    } else if (primaryGoal === "invest") {
      // For investment, prioritize waterfront and high-growth areas
      if (category === "Waterfront Community" || category === "Island Community") {
        score += 20;
      }
      // Bonus for investment-friendly keywords
      if (containsKeywords(description, ["investment", "growth", "development", "off-plan", "tourism"])) {
        score += 10;
      }
    } else if (primaryGoal === "both") {
      // For both, balance between lifestyle and investment
      if (category === "Master Community" || category === "Waterfront Community") {
        score += 15;
      }
      // Bonus for communities that offer both
      if (containsKeywords(description, ["luxury", "amenities", "investment", "residential"])) {
        score += 10;
      }
    }
    
    // 3. Budget matching (25 points)
    if (budget && budgetRanges[budget]) {
      const budgetRange = budgetRanges[budget];
      
      // Community type match (10 points)
      const typeMatch = budgetRange.preferredTypes.some(type => 
        communityType.includes(type)
      );
      if (typeMatch) {
        score += 10;
      }
      
      // Category match (8 points)
      const categoryMatch = budgetRange.preferredCategories.some(cat => 
        category === cat
      );
      if (categoryMatch) {
        score += 8;
      }
      
      // Description keyword match (7 points)
      score += calculateKeywordScore(description, budgetRange.keywords, 7);
    }
    
    // 4. Timeline matching (20 points)
    if (timeline === "3months") {
      // Ready properties - prioritize established communities
      // Master communities and established areas are more likely to have ready properties
      if (category === "Master Community" || category === "Sub-Community") {
        score += 15;
      }
      // Bonus for communities with established infrastructure
      if (containsKeywords(description, ["established", "ready", "completed", "existing"])) {
        score += 5;
      }
    } else if (timeline === "6-12months") {
      // Both ready and off-plan - balanced scoring
      // All communities are viable
      score += 10;
      // Slight preference for master communities
      if (category === "Master Community") {
        score += 5;
      }
    } else if (timeline === "exploring") {
      // Off-plan investments welcome - prioritize new developments
      if (category === "Island Community" || category === "Waterfront Community") {
        score += 15;
      }
      // Bonus for new development keywords
      if (containsKeywords(description, ["new", "development", "off-plan", "upcoming", "future"])) {
        score += 5;
      }
    }
    
    // 5. Brand reputation bonus (5 points)
    // Premium developers get a small boost
    const premiumBrands = ["Emaar Properties", "Nakheel Properties"];
    if (premiumBrands.includes(community.brand)) {
      score += 5;
    }
    
    return { ...community, score };
  });
  
  // Sort by score (highest first)
  const sortedMatches = scoredCommunities
    .sort((a, b) => {
      // First sort by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // If scores are equal, prefer premium brands
      const premiumBrands = ["Emaar Properties", "Nakheel Properties"];
      const aIsPremium = premiumBrands.includes(a.brand);
      const bIsPremium = premiumBrands.includes(b.brand);
      if (aIsPremium && !bIsPremium) return -1;
      if (!aIsPremium && bIsPremium) return 1;
      // Otherwise maintain order
      return 0;
    });
  
  // Return top 3 matches, but ensure minimum quality threshold
  const topMatches = sortedMatches.slice(0, 3);
  
  // If top match has a reasonable score (at least 30), return top 3
  // Otherwise, return top 3 regardless (fallback to show something)
  if (topMatches[0]?.score >= 30) {
    return topMatches;
  }
  
  // Fallback: return top 3 even if scores are low (better than nothing)
  return topMatches.length > 0 ? topMatches : sortedMatches.slice(0, 3);
};

export default function CommunityQuizModal({ isOpen, onClose }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const honeypotRef = useRef(null);
  const [matchingCommunities, setMatchingCommunities] = useState([]);

  const stepsTotal = 5;
  const progress = ((step + 1) / stepsTotal) * 100;

  const [quizData, setQuizData] = useState({
    primaryGoal: "",
    lifestyle: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    country: "AE",
  });

  const validateStep = (currentStep) => {
    const errors = {};
    switch (currentStep) {
      case 0:
        if (!quizData.primaryGoal.trim()) errors.primaryGoal = "Please select an option";
        break;
      case 1:
        if (!quizData.lifestyle.trim()) errors.lifestyle = "Please select an option";
        break;
      case 2:
        if (!quizData.budget.trim()) errors.budget = "Please select a budget range";
        break;
      case 3:
        if (!quizData.timeline.trim()) errors.timeline = "Please select an option";
        break;
      case 4:
        if (!quizData.name.trim()) errors.name = "Name is required";
        if (!quizData.email.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quizData.email)) {
          errors.email = "Please enter a valid email address";
        }
        if (!quizData.phone.trim()) {
          errors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s-()]+$/.test(quizData.phone)) {
          errors.phone = "Please enter a valid phone number";
        }
        break;
      default:
        break;
    }
    return errors;
  };

  const updateField = (key, value) => {
    setQuizData((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) setFormErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleNext = async () => {
    const errors = validateStep(step);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    // On step 3 (after timeline), find matching communities
    if (step === 3) {
      const matches = findMatchingCommunities({
        primaryGoal: quizData.primaryGoal,
        lifestyle: quizData.lifestyle,
        timeline: quizData.timeline,
      });
      setMatchingCommunities(matches);
    }

    if (step < stepsTotal - 1) {
      setStep((s) => s + 1);
    } else {
      // Submit form
      setIsSubmitting(true);
      try {
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-community-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            website: websiteValue,
            fullName: quizData.name,
            email: quizData.email,
            phoneNumber: quizData.phone,
            primaryGoal: quizData.primaryGoal,
            lifestyle: quizData.lifestyle,
            budget: quizData.budget,
            timeline: quizData.timeline,
            matchingCommunities: matchingCommunities.map((c) => c.slug),
            createdAt: new Date().toISOString(),
            source: "Community Quiz",
          }),
        });
        if (res.ok) {
          setSubmitted(true);
          setIsSubmitting(false);
        } else {
          const errorData = await res.json();
          setIsSubmitting(false);
          setFormErrors({ submit: errorData.message || "Failed to submit. Please try again." });
        }
      } catch (error) {
        setIsSubmitting(false);
        setFormErrors({ submit: "Network error. Please check your connection and try again." });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setFormErrors({});
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setStep(0);
    setSubmitted(false);
    setShowResults(false);
    setFormErrors({});
    setQuizData({
      primaryGoal: "",
      lifestyle: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      country: "AE",
    });
    setMatchingCommunities([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl md:rounded-3xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[95vh] md:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-black p-4 md:p-8 rounded-t-2xl md:rounded-t-3xl flex-shrink-0">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-2xl font-bold text-white font-custom">
                  {showResults ? "Your Matched Communities" : "Community Quiz"}
                </h3>
                <p className="text-xs md:text-base text-gray-300 font-custom3 mt-1">
                  {showResults
                    ? "Based on your preferences"
                    : "Find your perfect community in 60 seconds"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors flex-shrink-0"
              >
                <FaTimes size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          <div className="p-4 md:p-8 flex-1 min-h-0 overflow-y-auto">
            {!showResults ? (
              <>
                <div className="mb-4 md:mb-8">
                  <div className="h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3 text-center font-custom3">
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
                      className="space-y-4 md:space-y-6"
                    >
                      {/* Step 0: Primary Goal */}
                      {step === 0 && (
                        <div>
                          <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900 font-custom">
                            What&apos;s your primary goal?
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-custom3">
                            This helps us understand what matters most to you
                          </p>
                          <div className="grid gap-2 md:gap-3">
                            {primaryGoalOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => updateField("primaryGoal", opt.value)}
                                className={`p-3 md:p-4 text-left rounded-xl border-2 transition-all font-custom3 ${
                                  quizData.primaryGoal === opt.value
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                }`}
                              >
                                <div className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{opt.title}</div>
                                <div className="text-xs md:text-sm text-gray-600">{opt.description}</div>
                              </button>
                            ))}
                          </div>
                          {formErrors.primaryGoal && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.primaryGoal}</p>
                          )}
                        </div>
                      )}

                      {/* Step 1: Lifestyle */}
                      {step === 1 && (
                        <div>
                          <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900 font-custom">
                            Which lifestyle suits you best?
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-custom3">
                            We&apos;ll match communities that fit your daily life
                          </p>
                          <div className="grid gap-2 md:gap-3">
                            {lifestyleOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => updateField("lifestyle", opt.value)}
                                className={`p-3 md:p-4 text-left rounded-xl border-2 transition-all font-custom3 ${
                                  quizData.lifestyle === opt.value
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                }`}
                              >
                                <div className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{opt.title}</div>
                                <div className="text-xs md:text-sm text-gray-600">{opt.description}</div>
                              </button>
                            ))}
                          </div>
                          {formErrors.lifestyle && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.lifestyle}</p>
                          )}
                        </div>
                      )}

                      {/* Step 2: Budget */}
                      {step === 2 && (
                        <div>
                          <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900 font-custom">
                            What&apos;s your budget range?
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-custom3">
                            Purchase price in AED
                          </p>
                          <div className="grid gap-2 md:gap-3">
                            {budgetOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => updateField("budget", opt.value)}
                                className={`p-3 md:p-4 text-left rounded-xl border-2 transition-all font-custom3 ${
                                  quizData.budget === opt.value
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                }`}
                              >
                                <div className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{opt.title}</div>
                                <div className="text-xs md:text-sm text-gray-600">{opt.description}</div>
                              </button>
                            ))}
                          </div>
                          {formErrors.budget && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.budget}</p>
                          )}
                        </div>
                      )}

                      {/* Step 3: Timeline */}
                      {step === 3 && (
                        <div>
                          <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900 font-custom">
                            When are you looking to buy?
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-custom3">
                            This helps us prioritise ready vs off-plan options
                          </p>
                          <div className="grid gap-2 md:gap-3">
                            {timelineOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => updateField("timeline", opt.value)}
                                className={`p-3 md:p-4 text-left rounded-xl border-2 transition-all font-custom3 ${
                                  quizData.timeline === opt.value
                                    ? "border-black bg-gray-100 text-black"
                                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                                }`}
                              >
                                <div className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{opt.title}</div>
                                <div className="text-xs md:text-sm text-gray-600">{opt.description}</div>
                              </button>
                            ))}
                          </div>
                          {formErrors.timeline && (
                            <p className="text-red-500 text-sm mt-2">{formErrors.timeline}</p>
                          )}
                        </div>
                      )}

                      {/* Step 4: Contact Info */}
                      {step === 4 && (
                        <div className="space-y-4 md:space-y-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900 font-custom">
                              Get Your Matched Communities
                            </h4>
                            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-custom3">
                              Enter your details to receive your personalized community matches
                            </p>
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 font-custom2">
                              Full name
                            </label>
                            <input
                              type="text"
                              value={quizData.name}
                              onChange={(e) => updateField("name", e.target.value)}
                              placeholder="Enter your full name"
                              className={`w-full p-3 md:p-4 bg-gray-50 border rounded-xl focus:outline-none focus:border-black text-sm md:text-lg font-custom3 ${
                                formErrors.name ? "border-red-500" : "border-gray-300"
                              }`}
                            />
                            {formErrors.name && (
                              <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">{formErrors.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 font-custom2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={quizData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="Enter your email address"
                              className={`w-full p-3 md:p-4 bg-gray-50 border rounded-xl focus:outline-none focus:border-black text-sm md:text-lg font-custom3 ${
                                formErrors.email ? "border-red-500" : "border-gray-300"
                              }`}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">{formErrors.email}</p>
                            )}
                          </div>
                          <div className="relative" style={{ zIndex: 10000, overflow: 'visible' }}>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2 font-custom2">
                              Phone number
                            </label>
                            <div className="relative" style={{ zIndex: 10000, overflow: 'visible' }}>
                              <CountrySelect
                                styling={`w-full rounded-xl border-2 transition-all bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base ${
                                  formErrors.phone
                                    ? "border-red-500 focus-within:border-red-600"
                                    : "border-gray-300 focus-within:border-black"
                                }`}
                                labels={en}
                                flags={flags}
                                value={quizData.country}
                                onChange={(country) => updateField("country", country)}
                                onPhoneChange={(phone) => updateField("phone", phone)}
                              />
                            </div>
                            {formErrors.phone && (
                              <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">{formErrors.phone}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {formErrors.submit && (
                        <p className="text-red-500 text-xs md:text-sm text-center">{formErrors.submit}</p>
                      )}

                      <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-0 pt-4 md:pt-8">
                        {step > 0 && (
                          <button
                            onClick={handleBack}
                            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all font-custom2 text-sm md:text-base"
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          disabled={isSubmitting}
                          className={`w-full sm:w-auto sm:ml-auto px-6 md:px-8 py-2.5 md:py-3 bg-black text-white rounded-full transition-all font-custom2 flex items-center justify-center gap-2 text-sm md:text-base ${
                            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-900"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin shrink-0" aria-hidden />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              {step === stepsTotal - 1 ? "Get My Matches" : "Continue"}
                              {step === stepsTotal - 1 && (
                                <FaArrowRight className="text-xs md:text-sm" />
                              )}
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 md:py-12"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                        <FaCheck className="text-white text-2xl md:text-3xl" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 font-custom">
                        Thank You, {quizData.name}!
                      </h4>
                      <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 font-custom3 px-2">
                        Your quiz results are ready! Click below to see your matched communities.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                        <button
                          onClick={handleShowResults}
                          className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-black text-white rounded-full transition-all font-custom2 hover:bg-gray-900 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          View My Matches <FaArrowRight className="text-xs md:text-sm" />
                        </button>
                        <button
                          onClick={onClose}
                          className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-custom2 text-sm md:text-base"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="text-center mb-4 md:mb-8">
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 font-custom">
                    Your Top 3 Matched Communities
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 font-custom3 px-2">
                    Based on your preferences, here are the communities that best match your needs
                  </p>
                </div>

                <div className="grid gap-4 md:gap-6">
                  {matchingCommunities.map((community, index) => (
                    <Link
                      key={community.slug}
                      href={`/communities/${community.slug}`}
                      className="block group"
                    >
                      <div className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl overflow-hidden hover:border-black transition-all hover:shadow-xl">
                        <div className="grid md:grid-cols-3 gap-0">
                          <div className="relative h-48 md:h-full min-h-[200px]">
                            <Image
                              src={community.coverPhoto.url}
                              alt={community.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-black text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold font-custom2">
                              #{index + 1} Match
                            </div>
                          </div>
                          <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1 md:mb-2">
                                <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider font-custom2">
                                  {community.category}
                                </span>
                              </div>
                              <h5 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 font-custom group-hover:text-black">
                                {community.title}
                              </h5>
                              <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3 font-custom3 line-clamp-2">
                                {community.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                <span className="text-[10px] md:text-xs bg-gray-100 text-gray-700 px-2 md:px-3 py-0.5 md:py-1 rounded-full font-custom3">
                                  {community.communityType}
                                </span>
                                <span className="text-[10px] md:text-xs bg-gray-100 text-gray-700 px-2 md:px-3 py-0.5 md:py-1 rounded-full font-custom3">
                                  {community.brand}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-black font-semibold text-sm md:text-base font-custom2 group-hover:gap-3 transition-all">
                              View Details <FaArrowRight className="text-xs md:text-sm" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6">
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-custom2 text-sm md:text-base"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-black text-white rounded-full transition-all font-custom2 hover:bg-gray-900 text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
