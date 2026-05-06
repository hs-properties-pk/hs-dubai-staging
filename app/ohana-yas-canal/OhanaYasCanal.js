"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LandingPageGallery from "@/components/LandingPageGallery";
import CountrySelect from "@/components/CountrySelect";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import {
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHome,
  FaBed,
  FaRuler,
  FaDollarSign,
  FaSwimmingPool,
  FaDumbbell,
  FaUtensils,
  FaWater,
  FaTree,
  FaTrophy,
  FaBuilding,
  FaShip,
  FaBicycle,
  FaChild,
  FaHeart,
  FaEye,
  FaDownload,
  FaGlobe,
  FaArrowUp,
  FaYoutube,
  FaWhatsapp,
  FaCheck,
} from "react-icons/fa";

// Form Modal Component - Step by Step
const FormModal = ({
  isOpen,
  onClose,
  formData,
  updateField,
  formErrors,
  handleNext,
  handleBack,
  step,
  stepsTotal,
  progress,
  isSubmitting,
  submitted,
  honeypotRef,
  budgetOptions
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-[#002a5a] to-[#001838] rounded-2xl max-w-2xl w-full my-8 border-2 border-cyan-400/30 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#001838] to-[#002a5a] p-6 border-b border-cyan-400/30 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Ohana Yas Canal Inquiry
              </h3>
              <p className="text-cyan-400 text-sm">
                Get details about properties in Ohana Yas Canal
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-cyan-400 transition-colors p-2"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-visible relative z-10">
            <div className="mb-8">
              <div className="h-2 bg-[#001838] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-cyan-400 mt-3 text-center">
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
                  {renderFormStep(step, formData, updateField, formErrors, budgetOptions)}

                  <div className="flex justify-between pt-8">
                    {step > 0 && (
                      <button
                        onClick={handleBack}
                        className="px-8 py-3 border-2 border-cyan-400/50 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all font-semibold"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="ml-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-white text-3xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Thank You, {formData.fullName.split(' ')[0]}!
                  </h4>
                  <p className="text-gray-300 mb-8">
                    Your Ohana Yas Canal inquiry has been received. Our
                    specialists will contact you within 24 hours with exclusive
                    property details.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 border-2 border-cyan-400/50 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all font-semibold"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Helper function to render form steps
function renderFormStep(step, formData, updateField, formErrors, budgetOptions) {
  switch (step) {
    case 0:
      return (
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">
            Are you a first-time:
          </h4>
          <div className="grid gap-3">
            {["Home buyer", "Investor", "Real estate agent"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateField("userType", opt)}
                className={`p-4 text-left rounded-xl border-2 transition-all ${formData.userType === opt
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                  : "border-cyan-400/30 hover:border-cyan-400/50 text-gray-300"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {formErrors.userType && (
            <p className="text-red-400 text-sm mt-2">{formErrors.userType}</p>
          )}
        </div>
      );
    case 1:
      return (
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">
            Which property interests you?
          </h4>
          <div className="grid gap-3">
            {["Townhouse", "Twin Villa", "4 BR Villa", "5 BR Villa", "Maisonette"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateField("propertyType", type)}
                className={`p-4 text-left rounded-xl border-2 transition-all ${formData.propertyType === type
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                  : "border-cyan-400/30 hover:border-cyan-400/50 text-gray-300"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
          {formErrors.propertyType && (
            <p className="text-red-400 text-sm mt-2">
              {formErrors.propertyType}
            </p>
          )}
        </div>
      );
    case 2:
      return (
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">
            What is your budget?
          </h4>
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {budgetOptions.map((budget) => (
              <button
                key={budget}
                type="button"
                onClick={() => updateField("budget", budget)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${formData.budget === budget
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                  : "border-cyan-400/30 hover:border-cyan-400/50 text-gray-300"
                  }`}
              >
                {budget}
              </button>
            ))}
          </div>
          {formErrors.budget && (
            <p className="text-red-400 text-sm mt-2">
              {formErrors.budget}
            </p>
          )}
        </div>
      );
    case 3:
      return (
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">
            How soon are you planning to invest?
          </h4>
          <div className="grid gap-3">
            {["This month", "Within 3 months", "More than 3 months"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateField("investTimeline", opt)}
                className={`p-4 text-left rounded-xl border-2 transition-all ${formData.investTimeline === opt
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                  : "border-cyan-400/30 hover:border-cyan-400/50 text-gray-300"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {formErrors.investTimeline && (
            <p className="text-red-400 text-sm mt-2">
              {formErrors.investTimeline}
            </p>
          )}
        </div>
      );
    case 4:
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">
              Your details
            </h4>
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Full name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Enter your full name"
              className={`w-full p-4 bg-[#001838] border rounded-xl focus:outline-none focus:border-cyan-400 text-white text-lg ${formErrors.fullName ? "border-red-500" : "border-cyan-400/30"
                }`}
            />
            {formErrors.fullName && (
              <p className="text-red-400 text-sm mt-2">{formErrors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Enter your email address"
              className={`w-full p-4 bg-[#001838] border rounded-xl focus:outline-none focus:border-cyan-400 text-white text-lg ${formErrors.email ? "border-red-500" : "border-cyan-400/30"
                }`}
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm mt-2">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Phone number
            </label>
            <CountrySelect
              styling={`w-full rounded-xl border-2 transition-all bg-[#001838] px-4 py-3 ${formErrors.phone
                ? "border-red-500 focus-within:border-red-600"
                : "border-cyan-400/30 focus-within:border-cyan-400"
                }`}
              labels={en}
              flags={flags}
              value={formData.country}
              onChange={(country) => updateField("country", country)}
              onPhoneChange={(phone) => updateField("phone", phone)}
            />
            {formErrors.phone && (
              <p className="text-red-400 text-sm mt-2">{formErrors.phone}</p>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Floor Plan Popup Component - floorPlans: array of { src, label }
const FloorPlanPopup = ({ isOpen, onClose, floorPlans, propertyName }) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  if (!isOpen || !floorPlans || floorPlans.length === 0) return null;

  const currentPlan = floorPlans[currentPlanIndex];
  const currentSrc = typeof currentPlan === "string" ? currentPlan : currentPlan.src;
  const currentLabel = typeof currentPlan === "string" ? `Floor ${currentPlanIndex + 1}` : currentPlan.label;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#001838] rounded-2xl max-w-6xl w-full my-8 border-2 border-cyan-400 flex flex-col max-h-[calc(100vh-4rem)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - fixed */}
          <div className="flex-shrink-0 bg-gradient-to-r from-[#001838] to-[#002a5a] p-6 border-b border-cyan-400/30 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {propertyName} Floor Plans
              </h3>
              <p className="text-cyan-400 text-sm font-medium">
                {currentLabel} · {currentPlanIndex + 1} of {floorPlans.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-cyan-400 transition-colors p-2"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Scrollable body: image + thumbnails */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {/* Floor Plan Image - constrained so thumbnails fit in viewport */}
            <div className="relative bg-black p-4 md:p-8 flex items-center justify-center min-h-[280px] max-h-[55vh]">
              <Image
                src={currentSrc}
                alt={`${propertyName} ${currentLabel}`}
                width={1200}
                height={800}
                className="max-w-full w-full h-auto object-contain max-h-[50vh]"
              />

              {/* Floor label badge on image */}
              <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#001838]/90 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold border border-cyan-400/50">
                {currentLabel}
              </span>

              {/* Navigation */}
              {floorPlans.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentPlanIndex(
                        currentPlanIndex === 0
                          ? floorPlans.length - 1
                          : currentPlanIndex - 1
                      )
                    }
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 text-white p-3 md:p-4 rounded-full transition-colors"
                  >
                    <FaChevronDown className="rotate-90" size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPlanIndex(
                        currentPlanIndex === floorPlans.length - 1
                          ? 0
                          : currentPlanIndex + 1
                      )
                    }
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-600 text-white p-3 md:p-4 rounded-full transition-colors"
                  >
                    <FaChevronDown className="-rotate-90" size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails with labels - always visible in scroll area */}
            {floorPlans.length > 1 && (
              <div className="flex-shrink-0 bg-[#001838] p-4 border-t border-cyan-400/30">
                <div className="flex gap-4 justify-center overflow-x-auto flex-wrap">
                  {floorPlans.map((plan, index) => {
                    const planSrc = typeof plan === "string" ? plan : plan.src;
                    const planLabel = typeof plan === "string" ? `Floor ${index + 1}` : plan.label;
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentPlanIndex(index)}
                        className={`flex-shrink-0 flex flex-col items-center gap-1 rounded-lg overflow-hidden transition-all ${currentPlanIndex === index
                          ? ""
                          : "border-transparent opacity-50 hover:opacity-75"
                          }`}
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                          <Image
                            src={planSrc}
                            alt={planLabel}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-cyan-400 text-xs font-medium whitespace-nowrap">
                          {planLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function OhanaYasCanalLanding({ pixelId }) {
  // Add custom scrollbar styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #001838;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #00bcd4;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #00acc1;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "AE",
    userType: "",
    propertyType: "",
    budget: "",
    investTimeline: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef(null);

  const stepsTotal = 5;
  const progress = ((step + 1) / stepsTotal) * 100;

  // Form step options
  const userTypeOptions = ["Home buyer", "Investor", "Real estate agent"];
  const propertyTypeOptions = [
    "Townhouse",
    "Twin Villa",
    "4 BR Villa",
    "5 BR Villa",
    "Maisonette",
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

  // Property Types with Floor Plans
  const propertyTypes = [
    {
      name: "Townhouse",
      plotAreaSqft: "2,153",
      plotAreaSqm: "200",
      sellableBUA: "2,476",
      sellableBUASqm: "230",
      price: "AED 4,500,000",
      images: [
        "/ohana-yas-canal/townhouse-pic-1.webp",
        "/ohana-yas-canal/townhouse-pic-2.webp",
      ],
      floorPlans: [
        { src: "/ohana-yas-canal/townhouse-floor-plan-ground.webp", label: "Ground Floor" },
        { src: "/ohana-yas-canal/townhouse-floor-plan-first.webp", label: "First Floor" },
      ],
    },
    {
      name: "Twin Villa",
      plotAreaSqft: "2,691",
      plotAreaSqm: "250",
      sellableBUA: "2,949",
      sellableBUASqm: "274",
      price: "AED 5,900,000",
      images: [
        "/ohana-yas-canal/twin-villa-pic-1.webp",
        "/ohana-yas-canal/twin-villa-pic-2.webp",
      ],
      floorPlans: [
        { src: "/ohana-yas-canal/twin-villa-floor-plan-ground.webp", label: "Ground Floor" },
        { src: "/ohana-yas-canal/twin-villa-floor-plan-first.webp", label: "First Floor" },
      ],
    },
    {
      name: "4 BR Villa",
      plotAreaSqft: "4,306",
      plotAreaSqm: "400",
      sellableBUA: "3,229",
      sellableBUASqm: "300",
      price: "AED 6,900,000",
      images: [
        "/ohana-yas-canal/4-bedroom-pic-1.webp",
        "/ohana-yas-canal/4-bedroom-pic-2.webp",
      ],
      floorPlans: [
        { src: "/ohana-yas-canal/4-bedroom-floor-plan-ground.webp", label: "Ground Floor" },
        { src: "/ohana-yas-canal/4-bedroom-floor-plan-first.webp", label: "First Floor" },
      ],
    },
    {
      name: "5 BR Villa",
      plotAreaSqft: "6,458",
      plotAreaSqm: "600",
      sellableBUA: "4,822",
      sellableBUASqm: "448",
      price: "AED 9,300,000",
      images: [
        "/ohana-yas-canal/5-bedroom-pic-1.webp",
        "/ohana-yas-canal/5-bedroom-pic-2.webp",
      ],
      floorPlans: [
        { src: "/ohana-yas-canal/5-bedroom-floor-plan-gorund.webp", label: "Ground Floor" },
        { src: "/ohana-yas-canal/5-bedroom-floor-plan-first.webp", label: "First Floor" },
      ],
    },
    {
      name: "Maisonette",
      plotAreaSqft: "11,302",
      plotAreaSqm: "1,050",
      sellableBUA: "18,492",
      sellableBUASqm: "1,718",
      price: "AED 36,500,000",
      images: [
        "/ohana-yas-canal/maisonette-pic-1.webp",
        "/ohana-yas-canal/maisonette-pic-2.webp",
      ],
      floorPlans: [
        { src: "/ohana-yas-canal/maisonette-floor-plan-ground.webp", label: "Ground Floor" },
        { src: "/ohana-yas-canal/maisonette-floor-plan-first.webp", label: "First Floor" },
        { src: "/ohana-yas-canal/maisonette-floor-plan-second.webp", label: "Second Floor" },
        { src: "/ohana-yas-canal/maisonette-floor-plan-third.webp", label: "Third Floor" },
      ],
    },
  ];

  // Payment Plans
  const paymentPlan50 = [
    { label: "Booking", percentage: "5%", schedule: "on Booking" },
    { label: "Down Payment", percentage: "5%", schedule: "Signing of the SPA" },
    { label: "1st Installment", percentage: "5%", schedule: "After 3 Months of signing the SPA" },
    { label: "2nd Installment", percentage: "5%", schedule: "After 8 Months of signing the SPA" },
    { label: "3rd Installment", percentage: "5%", schedule: "After 12 Months of signing the SPA" },
    { label: "4th Installment", percentage: "5%", schedule: "After 16 Months of signing the SPA" },
    { label: "5th Installment", percentage: "5%", schedule: "After 20 Months of signing the SPA" },
    { label: "6th Installment", percentage: "5%", schedule: "After 24 Months of signing the SPA" },
    { label: "7th Installment", percentage: "5%", schedule: "After 28 Months of signing the SPA" },
    { label: "8th Installment", percentage: "5%", schedule: "After 32 Months of signing the SPA" },
    { label: "9th Installment", percentage: "50%", schedule: "On Delivery" },
  ];

  const paymentPlan75 = [
    { label: "Booking", percentage: "5%", schedule: "on Booking" },
    { label: "Down Payment", percentage: "20%", schedule: "Signing of the SPA" },
    { label: "1st Installment", percentage: "6.25%", schedule: "After 4 Months of signing the SPA" },
    { label: "2nd Installment", percentage: "6.25%", schedule: "After 8 Months of signing the SPA" },
    { label: "3rd Installment", percentage: "6.25%", schedule: "After 12 Months of signing the SPA" },
    { label: "4th Installment", percentage: "6.25%", schedule: "After 16 Months of signing the SPA" },
    { label: "5th Installment", percentage: "6.25%", schedule: "After 20 Months of signing the SPA" },
    { label: "6th Installment", percentage: "6.25%", schedule: "After 24 Months of signing the SPA" },
    { label: "7th Installment", percentage: "6.25%", schedule: "After 28 Months of signing the SPA" },
    { label: "8th Installment", percentage: "6.25%", schedule: "After 32 Months of signing the SPA" },
    { label: "9th Installment", percentage: "25%", schedule: "On Delivery" },
  ];

  // Main Amenities Categories
  const mainAmenities = [
    {
      category: "LIFESTYLE & SPORTS",
      image: "/ohana-yas-canal/sporrt-complex.webp",
      items: [
        {
          title: "THE BRAND'S ACADEMY",
          description:
            "Anchored by the Brand Academy clubhouse, acting as the social and athletic heart of the development.",
          image: "/ohana-yas-canal/brand-academy.webp",
        },
        {
          title: "THE CENTRAL GARDEN",
          description:
            "It serves as a lush landmark, visible from elevated views.",
          image: "/ohana-yas-canal/central-garden.webp",
        },
        {
          title: "SPORTS COMPLEX",
          description:
            "Integrated football pitch, youth academy, wellness trails, and community greenspaces.",
          image: "/ohana-yas-canal/sporrt-complex.webp",
        },
      ],
    },
    {
      category: "SIGNATURE",
      image: "/ohana-yas-canal/heritage-center.webp",
      items: [
        {
          title: "HERITAGE CENTER",
          description:
            "An elegant cultural hub curated exhibits and immersive storytelling, and living tribute to tradition, and champions.",
          image: "/ohana-yas-canal/heritage-center.webp",
        },
        {
          title: "SKYBOX LOUNGE",
          description:
            "Acting as the social and athletic heart of the development.",
          image: "/ohana-yas-canal/skybox-lougue.webp",
        },
        {
          title: "TROPHY GALLERY",
          description:
            "Designed as a signature landmark within the residences.",
          image: "/ohana-yas-canal/trophy-gallery.webp",
        },
      ],
    },
    {
      category: "WATERFRONT & OUTDOOR",
      image: "/ohana-yas-canal/CANAL-SPORTSLOUNGE.webp",
      items: [
        {
          title: "CANAL SPORTS LOUNGE",
          description:
            "An elegant waterfront lounge overlooking the canal and Yas Island, designed as a serene retreat for residents.",
          image: "/ohana-yas-canal/CANAL-SPORTSLOUNGE.webp",
        },
        {
          title: "WATERSPORTS CLUB",
          description:
            "A vibrant hub for adventure and leisure, with direct access to the canal and sea with kayaking, paddleboarding, sailing, and more.",
          image: "/ohana-yas-canal/WATERSPORTS-CLUB.webp",
        },
        {
          title: "RECOVERY PIER",
          description:
            "An exclusive waterfront retreat dedicated to wellness and regeneration.",
          image: "/ohana-yas-canal/RECOVERY-PIER.webp",
        },
        {
          title: "CANAL PROMENADE",
          description:
            "A lively waterfront promenade lined with cafes, boutique retail, and shaded walkways.",
          image: "/ohana-yas-canal/CANAL-PROMENADE.webp",
        },
      ],
    },
    {
      category: "WELLNESS & RECOVERY",
      image: "/ohana-yas-canal/OXYGEN-THERAPY-ROOM.webp",
      items: [
        {
          title: "OXYGEN THERAPY ROOM",
          description:
            "A state of the art recovery space where resident athletes can immerse themselves in high-concentration sessions.",
          image: "/ohana-yas-canal/OXYGEN-THERAPY-ROOM.webp",
        },
        {
          title: "HYDROTHERAPY CIRCUIT",
          description:
            "A state of the art wellness zone inspired by elite athlete recovery.",
          image: "/ohana-yas-canal/HYDROTHERAPY-CIRCUIT.webp",
        },
        {
          title: "GYM & FITNESS CENTER",
          description:
            "A world class fitness center featuring panoramic views of the canal and sea.",
          image: "/ohana-yas-canal/GYM-FITNESS-CENTER.webp",
        },
        {
          title: "ALTITUDE / HEAT ROOM",
          description:
            "A high performance conditioning environment that simulates extreme climates to enhance stamina and recovery.",
          image: "/ohana-yas-canal/ALTITUDE-HEAT-ROOM.webp",
        },
      ],
    },
  ];

  // Social Club Amenities (separate section)
  const socialClubAmenities = [
    {
      title: "LOBBY",
      description:
        "The grand lobby sets the tone for luxury from the very first step. Designed with soaring ceilings, marble finishes in beige and gold, and navy accents.",
      image: "/ohana-yas-canal/LOBBY.webp",
    },
    {
      title: "FINE DINING ORGANIC",
      description:
        "An elegant restaurant offering a curated organic menu crafted from seasonal ingredients.",
      image: "/ohana-yas-canal/FINE-DINING-ORGANIC.webp",
    },
    {
      title: "THE CAFE",
      description:
        "A stylish cafe concept that brings together Spanish flair and European cafe culture.",
      image: "/ohana-yas-canal/THE-CAFE.webp",
    },
    {
      title: "ROOF TOP POOL",
      description:
        "A glamorous rooftop retreat overlooking the canal and skyline.",
      image: "/ohana-yas-canal/ROOF-TOP-POOL.webp",
    },
  ];

  // Flatten all amenities into a single array for display
  const allAmenities = [
    ...mainAmenities.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.category,
      }))
    ),
    ...socialClubAmenities.map((amenity) => ({
      ...amenity,
      category: "SOCIAL CLUB",
    })),
  ];

  // Gallery Images - All images except logos
  const galleryImages = [
    // Property Images
    ...propertyTypes.flatMap((type) =>
      type.images.map((img) => ({
        src: img,
        alt: `${type.name} - Ohana Yas Canal`,
      }))
    ),
    // Amenity Images
    ...mainAmenities.flatMap((category) =>
      category.items.map((item) => ({
        src: item.image,
        alt: `${item.title} - ${category.category}`,
      }))
    ),
    ...socialClubAmenities.map((amenity) => ({
      src: amenity.image,
      alt: `${amenity.title} - Social Club`,
    })),
    // Partnership Image
    {
      src: "/ohana-yas-canal/title-win.webp",
      alt: "Manchester City Title Win - Ohana Partnership",
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
        if (!formData.propertyType.trim()) {
          errors.propertyType = "Please select a property type";
        }
        break;
      case 2:
        if (!formData.budget.trim()) {
          errors.budget = "Please select a budget range";
        }
        break;
      case 3:
        if (!formData.investTimeline.trim()) {
          errors.investTimeline = "Please select an option";
        }
        break;
      case 4:
        if (!formData.fullName.trim()) errors.fullName = "Full name is required";
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
      // Final step - submit form
      setIsSubmitting(true);
      try {
        // Get honeypot field value
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-ohana-yas-canal-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            userType: formData.userType,
            propertyType: formData.propertyType,
            budget: formData.budget,
            investTimeline: formData.investTimeline,
            website: websiteValue,
            createdAt: new Date().toISOString(),
            source: "Ohana Yas Canal",
          }),
        });

        if (res.ok) {
          const result = await res.json();
          setSubmitted(true);
          setIsSubmitting(false);
        } else {
          const errorData = await res.json();
          console.error("Submission error:", errorData);
          setFormErrors({
            submit:
              errorData.message || "Failed to submit form. Please try again.",
          });
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Submission error:", error);
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

  const openForm = () => {
    setIsFormOpen(true);
    setSubmitted(false);
    setStep(0);
    setFormErrors({});
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "AE",
      userType: "",
      propertyType: "",
      budget: "",
      investTimeline: "",
    });
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setStep(0);
    setSubmitted(false);
    setFormErrors({});
  };

  const openFloorPlan = (property) => {
    setSelectedFloorPlan({
      name: property.name,
      plans: property.floorPlans,
    });
  };

  return (
    <main className="bg-[#001838] text-white overflow-x-hidden">
      {/* HERO SECTION - Video Only */}
      <section className="relative h-[60vh] md:h-[80vh] lg:h-screen w-full overflow-hidden">
        <video
          src="/ohana-yas-canal/ohana-hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001838]/80 via-[#001838]/40 to-transparent" />
      </section>

      {/* COLLABORATION SECTION */}
      <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-wider">
              Visionaries United in Excellence
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="relative w-64 h-32">
                <Image
                  src="/ohana-yas-canal/ohana-logo.svg"
                  alt="Ohana Development"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent hidden md:block" />
              <div className="relative w-48 h-32">
                <Image
                  src="/ohana-yas-canal/mancity.svg"
                  alt="Manchester City"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MANCHESTER CITY & OHANA PARTNERSHIP SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#001838] to-[#002a5a]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left - Content */}
            <div>
              <p className="text-cyan-400 text-sm uppercase tracking-widest mb-4 font-semibold">
                PARTNERSHIP
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                A Legacy of Champions
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Manchester City, one of the world&apos;s most celebrated football clubs, brings its championship-winning legacy to Yas Island through an unprecedented partnership with Ohana Development. This collaboration represents the world&apos;s first sports-inspired residential project, combining Manchester City&apos;s values of excellence, teamwork, and high performance with Ohana&apos;s 35+ years of real estate expertise.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Together, Ohana and Manchester City are creating more than just homes—they&apos;re building a community where the spirit of champions lives on. This partnership brings world-class sports facilities, wellness amenities, and a unique lifestyle experience that reflects the dedication and achievement that defines both brands.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="text-cyan-400 font-bold text-xl">Excellence in Every Detail</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400" />
              </div>
            </div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-cyan-400/30 shadow-2xl"
            >
              <Image
                src="/ohana-yas-canal/title-win.webp"
                alt="Manchester City Title Win - Ohana Partnership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001838]/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT OVERVIEW SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#001838] to-[#002a5a]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              WE BUILD MORE THAN HOMES, WE BUILD LEGACY
            </h2>
            <div className="bg-[#002a5a] rounded-2xl p-8 border-2 border-cyan-400/30 text-left">
              <h3 className="text-3xl font-bold text-white mb-4">Ohana Yas Residences</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Discover Mancity Yas Residences, a premium waterfront community on Yas Island offering an exclusive selection of 1 to 5 bedroom luxury villas, twin villas, townhouses, maisonettes, and upscale apartments. Designed with modern Mediterranean architecture and refined interiors, residences feature canal-facing views and private outdoor spaces. Prices start from AED 4,500,000 with flexible 50/50 and 75/25 payment plans. Residents enjoy signature lifestyle amenities, anchored by the Brand Academy clubhouse, sports complex, football pitches, wellness trails, and green spaces, minutes from Yas Island&apos;s top attractions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* HEADQUARTERS DESIGN SECTION */}
      {/* <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#002a5a] rounded-2xl p-8 border-2 border-cyan-400/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Headquarters Design and Strategy</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The Manchester City Yas Residences Headquarters stands as a distinctive architectural and landscaped landmark, uniting workspaces, wellness amenities, and social areas. Rooftop terraces incorporate landscaped gathering spaces, outdoor dining zones, and fitness facilities, while water features and green pathways enhance tranquility. The design prioritizes abundant natural light, climate-sensitive shading, and smooth indoor–outdoor connectivity. Adaptable offices, meeting spaces, and garden retreats encourage productivity, creativity, and well-being, forming a sustainable and iconic centerpiece on Yas Island.
            </p>
          </motion.div>
        </div>
      </section> */}



      {/* PRIME LOCATION SECTION */}
      <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-cyan-400 text-sm uppercase tracking-widest mb-4 font-semibold">
              LOCATION
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prime Location & Connectivity
            </h2>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto">
              Situated on Yas Island, the development enjoys immediate access to Abu Dhabi&apos;s leading leisure and cultural attractions, including Yas Mall, Ferrari World, Warner Bros. World, Yas Waterworld, Yas Marina Circuit, and SeaWorld Abu Dhabi. Zayed International Airport is easily accessible, while major landmarks such as Louvre Abu Dhabi, Sheikh Zayed Grand Mosque, Emirates Palace, and Etihad Towers are within convenient reach. This strategic location places the residences at the heart of lifestyle living, tourism activity, and future investment growth.
            </p>
          </motion.div>
        </div>

        {/* Full Width Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full bg-gray-100"
        >
          <div className="relative w-full aspect-auto overflow-hidden">
            <Image
              src="/ohana-yas-canal/map.webp"
              alt="Ohana Yas Canal Location Map"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Legend Overlay - Desktop: Absolute positioned, Mobile: Below map */}
          <div className="absolute bottom-6 right-6 md:block hidden bg-[#001838]/95 backdrop-blur-md text-white rounded-xl p-6 max-w-sm shadow-xl border-2 border-cyan-400/30">
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Points of Interest</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Yas Mall</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Ferrari World</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Warner Bros. World</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Yas Waterworld</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">5.</span>
                <span>Yas Marina Circuit</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">6.</span>
                <span>SeaWorld Abu Dhabi</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">7.</span>
                <span>Zayed International Airport</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">8.</span>
                <span>Louvre Abu Dhabi</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">9.</span>
                <span>Sheikh Zayed Grand Mosque</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Points of Interest Card - Mobile: Below map */}
        <div className="container mx-auto px-6 max-w-6xl mt-6 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#001838] backdrop-blur-md text-white rounded-xl p-6 shadow-xl border-2 border-cyan-400/30"
          >
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Points of Interest</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Yas Mall</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Ferrari World</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Warner Bros. World</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Yas Waterworld</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">5.</span>
                <span>Yas Marina Circuit</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">6.</span>
                <span>SeaWorld Abu Dhabi</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">7.</span>
                <span>Zayed International Airport</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">8.</span>
                <span>Louvre Abu Dhabi</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold">9.</span>
                <span>Sheikh Zayed Grand Mosque</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROPERTY TYPES SECTION */}
      <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Property Types
            </h2>
            <p className="text-xl text-gray-300">
              Discover our exclusive collection of luxury residences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyTypes.map((property, index) => (
              <motion.div
                key={property.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#002a5a] to-[#001838] rounded-2xl overflow-hidden border-2 border-cyan-400/30 hover:border-cyan-400 transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.images[0]}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001838] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {property.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {property.name}
                  </h3>
                  <div className="space-y-2 mb-6 text-gray-300">
                    <div className="flex justify-between">
                      <span>Plot Area:</span>
                      <span className="text-white font-semibold">
                        {property.plotAreaSqft} sqft ({property.plotAreaSqm} sqm)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sellable BUA:</span>
                      <span className="text-white font-semibold">
                        {property.sellableBUA} sqft ({property.sellableBUASqm} sqm)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openFloorPlan(property)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <FaEye /> View Floor Plans
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-cyan-400 text-sm uppercase tracking-widest mb-4 font-semibold">
              AMENITIES
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Amenities Within the Community
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl">
              Ohana Yas Canal is planned with a wide mix of amenities designed to
              enhance your lifestyle. From wellness facilities to waterfront
              experiences, every detail is crafted for luxury living.
            </p>
          </motion.div>

          {/* All Amenities Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {allAmenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative h-[400px] rounded-xl overflow-hidden group cursor-pointer border-2 border-cyan-400/20 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20"
              >
                {/* Image */}
                <div className="relative h-full">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001838]/95 via-[#001838]/50 to-transparent" />

                  {/* Category Badge - Top */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-cyan-500/90 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-400/50">
                      <p className="text-white text-xs font-semibold uppercase tracking-wider">
                        {amenity.category}
                      </p>
                    </div>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-wide">
                      {amenity.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPOLOGIES AND PRICES TABLE */}
      <section className="py-20 bg-gradient-to-b from-[#002a5a] to-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Typologies and Prices
            </h2>
          </motion.div>

          <div className="bg-[#002a5a] rounded-2xl overflow-hidden border-2 border-cyan-400/30">
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead className="bg-cyan-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Unit Type</th>
                    <th className="px-6 py-4 text-left font-bold">Plot Area Sqft</th>
                    <th className="px-6 py-4 text-left font-bold">Plot Area Sqm</th>
                    <th className="px-6 py-4 text-left font-bold">Sellable BUA Area Sqft</th>
                    <th className="px-6 py-4 text-left font-bold">Sellable BUA Area Sqm</th>
                    <th className="px-6 py-4 text-left font-bold">Starting Prices</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-cyan-400/20 hover:bg-[#001838] transition-colors">
                    <td className="px-6 py-4 font-semibold">Townhouse</td>
                    <td className="px-6 py-4">2,153</td>
                    <td className="px-6 py-4">200</td>
                    <td className="px-6 py-4">2,476</td>
                    <td className="px-6 py-4">230</td>
                    <td className="px-6 py-4 text-cyan-400 font-bold">AED 4,500,000</td>
                  </tr>
                  <tr className="border-b border-cyan-400/20 hover:bg-[#001838] transition-colors">
                    <td className="px-6 py-4 font-semibold">Twin Villa</td>
                    <td className="px-6 py-4">2,691</td>
                    <td className="px-6 py-4">250</td>
                    <td className="px-6 py-4">2,949</td>
                    <td className="px-6 py-4">274</td>
                    <td className="px-6 py-4 text-cyan-400 font-bold">AED 5,900,000</td>
                  </tr>
                  <tr className="border-b border-cyan-400/20 hover:bg-[#001838] transition-colors">
                    <td className="px-6 py-4 font-semibold">4 BR Villa</td>
                    <td className="px-6 py-4">4,306</td>
                    <td className="px-6 py-4">400</td>
                    <td className="px-6 py-4">3,229</td>
                    <td className="px-6 py-4">300</td>
                    <td className="px-6 py-4 text-cyan-400 font-bold">AED 6,900,000</td>
                  </tr>
                  <tr className="border-b border-cyan-400/20 hover:bg-[#001838] transition-colors">
                    <td className="px-6 py-4 font-semibold">5 BR Villa</td>
                    <td className="px-6 py-4">6,458</td>
                    <td className="px-6 py-4">600</td>
                    <td className="px-6 py-4">4,822</td>
                    <td className="px-6 py-4">448</td>
                    <td className="px-6 py-4 text-cyan-400 font-bold">AED 9,300,000</td>
                  </tr>
                  <tr className="hover:bg-[#001838] transition-colors">
                    <td className="px-6 py-4 font-semibold">Maisonette</td>
                    <td className="px-6 py-4">11,302</td>
                    <td className="px-6 py-4">1,050</td>
                    <td className="px-6 py-4">18,492</td>
                    <td className="px-6 py-4">1,718</td>
                    <td className="px-6 py-4 text-cyan-400 font-bold">AED 36,500,000</td>
                  </tr>
                  <tr className="bg-[#001838] border-t-2 border-cyan-400/30">
                    <td className="px-6 py-4 font-semibold">Apartment</td>
                    <td className="px-6 py-4 col-span-4 text-center">-</td>
                    <td className="px-6 py-4 col-span-4 text-center">-</td>
                    <td className="px-6 py-4 col-span-4 text-center">-</td>
                    <td className="px-6 py-4 col-span-4 text-center">-</td>
                    <td className="px-6 py-4 text-cyan-400 font-bold">AED 2,100/sqft</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT PLANS SECTION */}
      <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Flexible Payment Plans
            </h2>
            <p className="text-xl text-gray-300">
              Choose the payment plan that works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Option 1: 50/50 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#002a5a] to-[#001838] rounded-2xl p-8 border-2 border-cyan-400/30"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">OPTION 1</h3>
                <div className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-full font-bold text-xl">
                  50/50 PAYMENT PLAN
                </div>
              </div>
              <div className="space-y-3">
                {paymentPlan50.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-cyan-400/20 last:border-b-0"
                  >
                    <div>
                      <p className="text-white font-semibold">{item.label}</p>
                      <p className="text-gray-400 text-sm">{item.schedule}</p>
                    </div>
                    <span className="text-cyan-400 font-bold text-lg">
                      {item.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Option 2: 75/25 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#002a5a] to-[#001838] rounded-2xl p-8 border-2 border-cyan-400/30"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">OPTION 2</h3>
                <div className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-full font-bold text-xl">
                  75/25 PAYMENT PLAN
                </div>
              </div>
              <div className="space-y-3">
                {paymentPlan75.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-cyan-400/20 last:border-b-0"
                  >
                    <div>
                      <p className="text-white font-semibold">{item.label}</p>
                      <p className="text-gray-400 text-sm">{item.schedule}</p>
                    </div>
                    <span className="text-cyan-400 font-bold text-lg">
                      {item.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE & INTERIORS SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#002a5a] to-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Architecture & Interiors
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              The architectural concept blends contemporary Mediterranean influences with refined luxury details, resulting in a sophisticated and enduring visual identity. Sleek lines, floor-to-ceiling glazing, and waterfront-oriented layouts enhance natural light and views. Interiors showcase premium materials, custom finishes, and practical layouts that balance elegance with everyday comfort. Subtle Manchester City branding elements throughout shared spaces strengthen the identity while preserving understated luxury suited to long-term living and premium investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LIFESTYLE & AMENITIES DETAILED SECTION */}
      <section className="py-20 bg-[#001838]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#002a5a] rounded-2xl p-8 border-2 border-cyan-400/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Manchester City Yas Residences Amenities</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Manchester City Yas Residences by Ohana offers world-class amenities blending luxury, wellness, and active living. Residents enjoy elite sports facilities, including the Football Academy, rooftop pitches, and youth programs, alongside wellness retreats with hydrotherapy, cryo suites, and meditation spaces. Waterfront promenades, crystal lagoons, infinity pools, fine dining, and vibrant social hubs create an unmatched lifestyle and investment-worthy living experience on Abu Dhabi&apos;s iconic Yas Island.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#001838] rounded-xl p-6 border border-cyan-400/20">
                <h3 className="text-xl font-bold text-white mb-4">Sports Facilities</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Football academy</li>
                  <li>Rooftop pitches</li>
                  <li>Training areas</li>
                  <li>Tactical analysis rooms</li>
                </ul>
              </div>
              <div className="bg-[#001838] rounded-xl p-6 border border-cyan-400/20">
                <h3 className="text-xl font-bold text-white mb-4">Waterfront Living</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Crystal lagoons</li>
                  <li>Scenic promenades</li>
                  <li>Watersports clubs</li>
                  <li>Infinity pools</li>
                  <li>Marina lounges</li>
                </ul>
              </div>
              <div className="bg-[#001838] rounded-xl p-6 border border-cyan-400/20">
                <h3 className="text-xl font-bold text-white mb-4">Wellness</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Advanced recovery and medical facilities</li>
                  <li>Hydrotherapy zones</li>
                  <li>Cryotherapy and infrared suites</li>
                  <li>Spa and sauna areas</li>
                  <li>Meditation spaces</li>
                  <li>Performance-driven training environments</li>
                </ul>
              </div>
              <div className="bg-[#001838] rounded-xl p-6 border border-cyan-400/20">
                <h3 className="text-xl font-bold text-white mb-4">Social Life</h3>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Signature restaurants</li>
                  <li>Cafés</li>
                  <li>Match-day terraces</li>
                  <li>Rooftop lounges</li>
                  <li>Curated resident events</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-[#001838]">
        <LandingPageGallery
          images={galleryImages}
          title="Gallery"
          description="Experience the Luxury of Ohana Yas Canal"
          id="gallery"
        />
      </section>

      {/* FORM CTA SECTION */}
      <section className="py-20 bg-[#001838] relative overflow-hidden">
        {/* Background Pattern - Geometric Lines */}
        <div className="absolute inset-0 opacity-20">
          {/* Top Left Pattern */}
          <svg
            className="absolute top-0 left-0 w-96 h-96"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="0"
              x2="400"
              y2="400"
              stroke="cyan"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="50"
              y1="0"
              x2="400"
              y2="350"
              stroke="cyan"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <circle cx="100" cy="100" r="3" fill="cyan" />
            <circle cx="200" cy="200" r="2" fill="cyan" />
            <circle cx="300" cy="300" r="2" fill="cyan" />
          </svg>
          {/* Bottom Left Pattern */}
          <svg
            className="absolute bottom-0 left-0 w-96 h-96"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="400"
              x2="400"
              y2="0"
              stroke="cyan"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="50"
              y1="400"
              x2="400"
              y2="50"
              stroke="cyan"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <circle cx="100" cy="300" r="3" fill="cyan" />
            <circle cx="200" cy="200" r="2" fill="cyan" />
            <circle cx="300" cy="100" r="2" fill="cyan" />
          </svg>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Expression of Interest
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Register your interest in Ohana Yas Canal
            </p>
            <motion.button
              onClick={openForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
text-[#001838]
font-bold
py-4 px-12
rounded-full
shadow-2xl
transition-all
uppercase
tracking-widest
text-lg
bg-[linear-gradient(135deg,#C9A24D,#A8832F,#E0C06B)]
hover:bg-[linear-gradient(135deg,#E0C06B,#C9A24D,#A8832F)]
"
            >
              Register Your Interest
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Floor Plan Popup */}
      {selectedFloorPlan && (
        <FloorPlanPopup
          isOpen={!!selectedFloorPlan}
          onClose={() => setSelectedFloorPlan(null)}
          floorPlans={selectedFloorPlan.plans}
          propertyName={selectedFloorPlan.name}
        />
      )}

      {/* FOOTER */}
      <footer className="bg-[#001838] text-white border-t border-gray-700/30">
        {/* Top Row - Logo and Social */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left - Logo */}
              <div className="relative w-48 h-24">
                <Image
                  src="/ohana-yas-canal/ohana-logo.svg"
                  alt="Ohana Development"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right - Language & Social */}
              <div className="flex items-center gap-6">

                {/* Social Media Icons */}
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/hspropertyrealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/hs_property/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/h-s-properties/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                </div>
                {/* Vertical Separator */}
                <div className="w-px h-8 bg-gray-700/50" />
                {/* Back to Top */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-white hover:text-cyan-400 transition-colors underline text-sm ml-4 flex items-center gap-1"
                >
                  Back to the top <FaArrowUp size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-6 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Details */}
              <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                  Contact Us
                </h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                    <a
                      href="tel:+971043454888"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      +971 (0) 4 345 4888
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                    <a
                      href="mailto:info@hsproperty.ae"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      info@hsproperty.ae
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                    <div>
                      <p>Grey Square, Showroom 2, Umm Suqeim Road</p>
                      <p className="text-sm text-gray-400">Al Barsha 2, Dubai, UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                  Company
                </h4>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>
                    <strong className="text-white">H&S Property</strong>
                  </p>
                  <p>Premium Real Estate Developments</p>
                  <p>
                    <a
                      href="https://www.hsproperty.ae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      www.hsproperty.ae
                    </a>
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  <a
                    href="/contact"
                    className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#"
                    className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Sitemap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Copyright */}
        <div className="border-t border-gray-700/50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} H&S Property. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm text-center md:text-right">
                Premium Real Estate Developments in Dubai
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Form Modal */}
      <FormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        formData={formData}
        updateField={updateField}
        formErrors={formErrors}
        handleNext={handleNext}
        handleBack={handleBack}
        step={step}
        stepsTotal={stepsTotal}
        progress={progress}
        isSubmitting={isSubmitting}
        submitted={submitted}
        honeypotRef={honeypotRef}
        budgetOptions={budgetOptions}
      />

      {/* Sticky Lead Form Button - Left Side */}
      <motion.button
        onClick={openForm}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-full px-6 py-4 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 group flex items-center gap-3 font-bold uppercase tracking-wider text-sm"
        aria-label="Open Expression of Interest Form"
      >
        <span className="hidden sm:inline">Register Interest</span>
        <span className="sm:hidden">Register</span>
        <FaEnvelope size={20} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Sticky WhatsApp Button - Right Side */}
      <motion.a
        href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21%20I%20am%20interested%20in%20Ohana%20Yas%20Canal&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={28} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </motion.a>
    </main >
  );
}
