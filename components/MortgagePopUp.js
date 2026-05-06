"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";
import { motion, AnimatePresence } from "framer-motion";

const MortgagePopUp = ({ image, details, setShow }) => {
  const [country, setCountry] = useState("AE");
  const source = "Mortgage Approval";

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const date = new Date();

  const timestamp = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    createdAt: timestamp,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const sendEmail = async () => {
    try {
      const response = await axios.post("/api/mortage-approval", {
        ...details,
        ...formData,
        source,
      });
      return response;
    } catch (error) {
      console.error(`Error: ${error.response?.data?.error || error.message}`);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      return;
    }

    setLoading(true);

    try {
      const response = await sendEmail();

      if (response && response.data?.success) {
        setLoading(false);
        setSuccess(true);

        // Reset the form fields
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          message: "",
          createdAt: timestamp,
        });
        setPrivacyAccepted(false);
      } else {
        setLoading(false);
        console.error("Form submission failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-black text-white p-6 rounded-t-xl relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-custom uppercase tracking-wider mb-2">
              Get a Mortgage Today
            </h2>
            <p className="text-gray-300 text-sm font-custom">
              Fill out the form below and our mortgage specialists will get back to you within 30 minutes.
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-black mb-2 font-custom">
                  Thank You!
                </h3>
                <p className="text-gray-600 font-custom">
                  We have received your inquiry and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-black mb-2 font-custom"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    onChange={handleChange}
                    value={formData.fullName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-black mb-2 font-custom"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-black mb-2 font-custom"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <CountrySelect
                    styling="border border-gray-300 rounded-lg"
                    flags={flags}
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    onPhoneChange={handlePhoneNumberChange}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-black mb-2 font-custom"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom resize-none"
                    placeholder="Tell us about your mortgage needs..."
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 mr-2"
                    required
                  />
                  <label
                    htmlFor="privacy"
                    className="text-xs text-gray-600 font-custom"
                  >
                    I agree to the terms and conditions and privacy policy.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !privacyAccepted}
                  className="w-full bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-custom"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT</span>
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MortgagePopUp;
