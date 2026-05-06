"use client";
import React, { useState } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa6";
import {
  FaTrophy,
  FaLock,
  FaBolt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { LuPhone, LuMapPin } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import CountrySelect from "./CountrySelect";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en.json";
const Footer = () => {
  const source = "Newsletter";
  const consultationSource = "Footer Consultation";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [consultationLoading, setConsultationLoading] = useState(false);
  const [consultationError, setConsultationError] = useState(null);
  const [country, setCountry] = useState("AE");
  const date = new Date();

  const timestamp = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [formData, setFormData] = useState({
    email: "",
    createdAt: timestamp,
  });

  const [consultationFormData, setConsultationFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    propertyType: "",
    budget: "",
    message: "",
    createdAt: timestamp,
  });
  const sendEmail = async () => {
    try {
      const response = await axios.post(
        "/api/send-submission-subscribe-newsletter",
        {
          ...formData,
          source,
        }
      );
      return response;
    } catch (error) {
      console.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      // Send email and await the response
      const response = await sendEmail();

      if (response) {
        setLoading(false);
        setSuccess(true);

        // Reset the form fields
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        // Handle failure with appropriate error logging
        setLoading(false);
        console.error(
          "Form submission failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle network or other unexpected errors
      setLoading(false);
      console.error("An unexpected error occurred:", error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConsultationChange = (e) => {
    setConsultationFormData({
      ...consultationFormData,
      [e.target.name]: e.target.value,
    });
    setConsultationError(null);
  };

  const handlePhoneChange = (phone) => {
    setConsultationFormData({
      ...consultationFormData,
      phoneNumber: phone,
    });
    setConsultationError(null);
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setConsultationLoading(true);
    setConsultationError(null);
    setConsultationSuccess(false);

    // Validation
    if (!consultationFormData.firstName || !consultationFormData.email || !consultationFormData.phoneNumber) {
      setConsultationError("Please fill in all required fields.");
      setConsultationLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/send-footer-consultation", {
        ...consultationFormData,
        source: consultationSource,
      });

      setConsultationLoading(false);
      setConsultationSuccess(true);

      // Reset form
      setConsultationFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        propertyType: "",
        budget: "",
        message: "",
        createdAt: timestamp,
      });
      setCountry("AE");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setConsultationSuccess(false);
      }, 5000);
    } catch (error) {
      setConsultationLoading(false);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      setConsultationError(message);
      console.error("Consultation form submission failed:", error);
    }
  };
  return (
    <>
      <div className="bg-gray-50 font-custom2">
        <div className="bg-gradient-to-r from-black from-50% to-white to-50% border-y border-gray-200">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 relative">
            <div className="bg-black px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-white text-xs md:text-sm font-bold tracking-widest uppercase mb-2 font-custom2">
                  GET IN TOUCH
                </p>
                <div className="w-12 h-0.5 bg-white"></div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-custom leading-tight">
                Have Questions?
                <br />
                <span className="text-white">We&apos;re Here to Help</span>
              </h2>

              <p className="text-white/90 text-sm md:text-base mb-8 md:mb-10 leading-relaxed font-custom3">
                We&apos;re ready to answer your questions. Let our RERA-certified experts guide you every step of the way  from shortlisting to handover.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <FaCheckCircle className="text-white text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-1 font-custom">Free Consultation</h3>
                    <p className="text-white/70 text-xs md:text-sm font-custom3">No hidden fees – expert guidance only</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <FaTrophy className="text-white text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-1 font-custom">35+ Awards Won</h3>
                    <p className="text-white/70 text-xs md:text-sm font-custom3">Dubai&apos;s most awarded real estate agency</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <FaLock className="text-white text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-1 font-custom">RERA Certified</h3>
                    <p className="text-white/70 text-xs md:text-sm font-custom3">All agents fully licensed and certified</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <FaBolt className="text-white text-lg md:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-1 font-custom">30-Minute Response</h3>
                    <p className="text-white/70 text-xs md:text-sm font-custom3">During business hours, guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
              {consultationSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <FaCheckCircle className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-custom">Thank You!</h3>
                  <p className="text-gray-600 font-custom3">
                    We&apos;ll get back to you within 30 minutes.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 font-custom">
                    Request Free Consultation
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 font-custom3">
                    Fill in your details - we&apos;ll respond within 30 minutes
                  </p>

                  {/* Form */}
                  <form onSubmit={handleConsultationSubmit} className="space-y-4 md:space-y-5">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2">
                          FIRST NAME *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={consultationFormData.firstName}
                          onChange={handleConsultationChange}
                          placeholder="John"
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2">
                          LAST NAME *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={consultationFormData.lastName}
                          onChange={handleConsultationChange}
                          placeholder="Smith"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={consultationFormData.email}
                        onChange={handleConsultationChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2">
                        PHONE / WHATSAPP *
                      </label>
                      <div className="bg-gray-50 border border-gray-300 rounded-xl focus-within:border-black transition-colors px-4 py-1">
                        <CountrySelect
                          styling="w-full py-2 bg-transparent border-0 focus:outline-none text-sm md:text-base"
                          labels={en}
                          flags={flags}
                          value={country}
                          onChange={setCountry}
                          onPhoneChange={handlePhoneChange}
                        />
                      </div>
                    </div>

                    {/* Property Type & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="footer-consult-property-type"
                          className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2"
                        >
                          PROPERTY TYPE
                        </label>
                        <div className="relative">
                          <select
                            id="footer-consult-property-type"
                            name="propertyType"
                            value={consultationFormData.propertyType}
                            onChange={handleConsultationChange}
                            className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3 appearance-none cursor-pointer"
                          >
                            <option value="">Select Property Type</option>
                            <option value="Community">Community</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Mansion">Mansion</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Others">Others</option>
                          </select>
                          <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="footer-consult-budget"
                          className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2"
                        >
                          BUDGET
                        </label>
                        <div className="relative">
                          <select
                            id="footer-consult-budget"
                            name="budget"
                            value={consultationFormData.budget}
                            onChange={handleConsultationChange}
                            className="w-full px-4 py-3 pr-10 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3 appearance-none cursor-pointer"
                          >
                            <option value="">Select Budget</option>
                            <option value="AED 500K-1M">AED 500K-1M</option>
                            <option value="AED 1M-3M">AED 1M-3M</option>
                            <option value="AED 3M-5M">AED 3M-5M</option>
                            <option value="AED 5M-8M">AED 5M-8M</option>
                            <option value="AED 8M+">AED 8M+</option>
                            <option value="Not sure yet">Not sure yet</option>
                          </select>
                          <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2 font-custom2">
                        MESSAGE (OPTIONAL)
                      </label>
                      <textarea
                        name="message"
                        value={consultationFormData.message}
                        onChange={handleConsultationChange}
                        placeholder="Tell us what you're looking for..."
                        rows="3"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-black text-sm md:text-base font-custom3 resize-none"
                      />
                    </div>

                    {/* Error Message */}
                    {consultationError && (
                      <p className="text-red-500 text-sm font-custom3">{consultationError}</p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={consultationLoading}
                      className="w-full bg-black hover:bg-gray-900 text-white font-semibold uppercase tracking-wider py-3 md:py-4 px-6 md:px-8 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed font-custom2"
                    >
                      {consultationLoading ? (
                        <>
                          <FaSpinner className="animate-spin" aria-hidden />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          SEND ENQUIRY <FaArrowRight className="text-lg" />
                        </>
                      )}
                    </button>

                    {/* Privacy Policy */}
                    <p className="text-gray-500 text-xs md:text-sm text-center font-custom3">
                      By submitting you agree to our{" "}
                      <Link href="/privacy-policy" className="text-black underline hover:text-gray-700">
                        Privacy Policy
                      </Link>
                      . Your data is safe with us.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <footer className="pt-20 pb-20 max-w-screen-2xl mx-auto px-6">
          <div className="container mx-auto md:px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <div className="flex flex-col justify-center gap-4">
                <div className="flex gap-3 md:justify-center items-center text-gray-600 hover:text-black duration-300">
                  <LuMapPin className="text-4xl sm:text-2xl md:text-4xl" />
                  <Link
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="tracking-wider"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </Link>
                </div>
                <div className="flex gap-3 text-gray-600 hover:text-black duration-300 items-center ml-[2px]">
                  <LuPhone className="text-xl " />
                  <Link
                    href="tel:+971526902884"
                    className="footer-contact-office-address tracking-wider"
                  >
                    +971 (0) 4 345 4888
                  </Link>
                </div>
                <div className="flex gap-3 text-gray-600 hover:text-black duration-300 items-center ml-[2px]">
                  <FaRegEnvelope className="text-xl md:text-xl" />
                  <Link
                    href="mailto:info@hsproperty.ae"
                    className="footer-contact-office-address tracking-wider"
                  >
                    info@hsproperty.ae
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="flex flex-col justify-center gap-4 capitalize">
                <li>
                  <Link
                    href="/properties/for-sale"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Buy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties/for-rent"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Rent
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties/off-plan"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Off Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/communities"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Communities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/property-valuation"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Property Valuation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mortgages"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Mortgages
                  </Link>
                </li>

                <li>
                  <Link
                    href="/real-estate-brokers-in-dubai"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Our Approach
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">More Links</h3>
              <ul className="flex flex-col justify-center gap-4">
                <li>
                  <Link
                    href="/our-story"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/awards"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    News & Videos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/market-insights"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Market Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/area-guides"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    Area Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/client-reviews"
                    className="text-gray-600 hover:text-black duration-300 "
                  >
                    Client Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 hover:text-black duration-300 "
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col  gap-4">
              <div className="flex flex-col justify-center ">
                <h3 className="text-xl font-semibold mb-4">Connect with us</h3>
                <div className="flex  gap-4 items-center ">
                  <Link
                    href="https://www.facebook.com/hspropertyrealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="H&S Real Estate on Facebook (opens in a new tab)"
                    className="inline-flex items-center justify-center h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300 rounded-full mr-1 "
                  >
                    <RiFacebookFill size="1.6em" fill="white" aria-hidden />
                  </Link>
                  <Link
                    href="https://www.instagram.com/hs_property/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="H&S Real Estate on Instagram (opens in a new tab)"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full mr-"
                  >
                    <FaInstagram size="1.5em" fill="white" aria-hidden />
                  </Link>

                  <Link
                    href="https://www.youtube.com/@HSRealEstate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="H&S Real Estate on YouTube (opens in a new tab)"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full "
                  >
                    <AiOutlineYoutube size="1.7em" fill="white" aria-hidden />
                  </Link>
                  <Link
                    href="https://wa.me/971526902884?text=Hello!"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact H&S Real Estate on WhatsApp (opens in a new tab)"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full mr-1 "
                  >
                    <FaWhatsapp size="1.5em" fill="white" aria-hidden />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/h-s-properties/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="H&S Real Estate on LinkedIn (opens in a new tab)"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full "
                  >
                    <FaLinkedinIn size="1.4em" fill="white" aria-hidden />
                  </Link>
                </div>
                <div className="flex flex-wrap justify-between gap-3 sm:gap-4 items-center my-10">
                  <Link
                    href="https://www.facebook.com/hspropertyrealestate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook reviews — H&S Real Estate (opens in a new tab)"
                    className="inline-flex shrink-0 opacity-95 hover:opacity-100 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 rounded"
                  >
                    <Image
                      src="/facebook-reviews-black.svg"
                      alt=""
                      width={120}
                      height={36}
                      className="h-8 w-auto md:h-9"
                      unoptimized
                    />
                  </Link>
                  <Link
                    href="https://share.google/J6Vdxu6wWMPiXBXTI"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google reviews — H&S Real Estate (opens in a new tab)"
                    className="inline-flex shrink-0 opacity-95 hover:opacity-100 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800 rounded"
                  >
                    <Image
                      src="/google-reviews-black.svg"
                      alt=""
                      width={156}
                      height={35}
                      className="h-8 w-auto md:h-9"
                      unoptimized
                    />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full ">
                <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center space-x-2 gap-4"
                >
                  <input
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    disabled={loading}
                    className="border border-black py-2 px-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black hover:bg-gray-800 duration-300 text-white py-2 px-4 w-max self-end rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" aria-hidden />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
                {success && (
                  <h2 className="w-full text-black uppercase text-base font-extrabold  mt-4 text-center tracking-wider ">
                    Thank You!
                  </h2>
                )}
              </div>
            </div>
          </div>
        </footer>
        <div className="px-4 py-5 font-custom2 bg-black">
          <div className="container mx-auto text-center text-base  text-black flex flex-col items-center gap-2 tracking-widest">
            <div className="flex items-center gap-2">
              <Link
                href="/terms-and-conditions"
                className=" border-r-2 border-gray-100 pr-2 text-white"
              >
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy" className="text-white">Privacy Policy</Link>
            </div>
            <p className="text-white">Copyright © 2026 H&S Real Estate, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
