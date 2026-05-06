"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { FaWhatsapp, FaArrowRight, FaPlus, FaMinus, FaChevronRight } from "react-icons/fa6";
import CountrySelect from "@/components/CountrySelect";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import MapboxPropertyDetails from "@/components/MapboxPropertyDetails";
import { getIcon } from "@/components/communityIconMap";
import ImageGallery from "@/components/ImageGallery";
import DowloadBrochurePopUp from "@/components/DowloadBrochurePopUp";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

function IconRenderer({ name, className }) {
  const Icon = getIcon(name);
  if (!Icon) return null;
  return <Icon className={className} />;
}

// Map amenity names to icons
function getAmenityIcon(amenityName) {
  const name = amenityName.toLowerCase();
  if (name.includes("pool") || name.includes("swimming")) return "FaSwimmingPool";
  if (name.includes("beach")) return "FaUmbrellaBeach";
  if (name.includes("gym") || name.includes("fitness")) return "FaDumbbell";
  if (name.includes("park") || name.includes("garden")) return "FaTree";
  if (name.includes("security") || name.includes("24")) return "FaShieldAlt";
  if (name.includes("parking")) return "FaParking";
  if (name.includes("smart") || name.includes("home")) return "FaHome";
  if (name.includes("kids") || name.includes("play")) return "FaChild";
  if (name.includes("lounge") || name.includes("social")) return "FaCouch";
  if (name.includes("wellness") || name.includes("yoga")) return "FaLeaf";
  if (name.includes("terrace") || name.includes("balcony")) return "FaBuilding";
  return "FaHome"; // Default icon
}

export default function OffPlanDetailsPage({ listings, propertyId }) {
  const [activeTab, setActiveTab] = useState("Book");
  const [showBrochurePopup, setShowBrochurePopup] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [country, setCountry] = useState("AE");
  const [viewingCountry, setViewingCountry] = useState("AE");
  const [bookLoading, setBookLoading] = useState(false);
  const [viewingLoading, setViewingLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [viewingSuccess, setViewingSuccess] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    propertyType: listings?.residences?.[0]?.displayName || "",
    message: "",
  });
  const [viewingFormData, setViewingFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    propertyType: listings?.residences?.[0]?.displayName || "",
    message: "",
    preferredDate: "",
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

  const handleViewingChange = (e) => {
    setViewingFormData({
      ...viewingFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleViewingPhoneChange = (value) => {
    setViewingFormData({
      ...viewingFormData,
      phoneNumber: value,
    });
  };

  const propertyUrl = `https://hsproperty.ae/properties/off-plan/${propertyId}`;
  const propertyTitle = listings?.fullTitle || listings?.title;
  const defaultPropertyType = listings?.residences?.[0]?.displayName || "";
  const whatsappInquiryHref = `https://wa.me/971526902884?text=${encodeURIComponent(
    `Hello! I would like to inquire about ${propertyTitle || "this off-plan property"}.`,
  )}`;

  const getTabClass = (tab) =>
    `flex-1 py-4 px-4 text-center font-custom2 text-sm font-semibold transition ${
      activeTab === tab ? "bg-gray-100 text-black border-b-2 border-black" : "text-gray-600 hover:text-black"
    }`;

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setBookLoading(true);

    try {
      const response = await axios.post("/api/send-submission-contact", {
        firstName: formData.fullName.split(" ")[0] || formData.fullName,
        lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        inquiryType: "Off Plan",
        subject: `Inquiry for ${propertyTitle}`,
        message: formData.message || `Interested in: ${formData.propertyType}`,
        source: `Off-Plan Details: ${propertyTitle}`,
        notionPage: `/properties/off-plan/${propertyId}`,
        propertySlug: propertyId,
        propertyTitle,
        propertyType: formData.propertyType,
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          propertyType: defaultPropertyType,
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookViewingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/send-submission-book-viewing", {
        fullName: viewingFormData.fullName,
        email: viewingFormData.email,
        phoneNumber: viewingFormData.phoneNumber,
        propertyUrl,
        source: `Off-Plan Book Viewing: ${propertyTitle}`,
        propertyType: viewingFormData.propertyType,
        message: viewingFormData.message,
        preferredDate: viewingFormData.preferredDate,
      });

      if (response.data.success) {
        setViewingSuccess(true);
        setViewingFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          propertyType: listings?.residences?.[0]?.displayName || "",
          message: "",
          preferredDate: "",
        });
        setTimeout(() => setViewingSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting viewing form:", error);
    } finally {
      setViewingLoading(false);
    }
  };

  return (
    <div className="bg-white">

      {/* Main Navigation */}
      <NavBar isHomeNavbar={true} />

      <div className="pt-20 md:pt-24">
        {/* Image Gallery */}
        <div className="my-8">
          <ImageGallery location={listings?.geography} images={listings?.photos} />
        </div>

        {/* Main Content Area */}
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-2/3 space-y-12">
              {/* Property Title Section */}
              <section>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-custom text-black mb-6">
                  {propertyTitle}
                </h1>

                {/* Key Metrics Bar */}
                {listings?.startingPrice && (
                  <div className="bg-gray-900 text-white py-4 px-6 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1 font-custom2">Starting Price</div>
                        <div className="text-lg md:text-xl font-bold font-custom">AED {listings.startingPrice}</div>
                      </div>
                      {listings?.handoverDate && (
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1 font-custom2">Handover</div>
                          <div className="text-lg md:text-xl font-bold font-custom">{listings.handoverDate}</div>
                        </div>
                      )}
                      {listings?.paymentPlanRatio && (
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1 font-custom2">Payment Plan</div>
                          <div className="text-lg md:text-xl font-bold font-custom">{listings.paymentPlanRatio}</div>
                        </div>
                      )}
                      {listings?.roiPercent && (
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1 font-custom2">ROI</div>
                          <div className="text-lg md:text-xl font-bold font-custom">{listings.roiPercent}%</div>
                        </div>
                      )}
                      {listings?.downPaymentPercent && (
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1 font-custom2">Down Payment</div>
                          <div className="text-lg md:text-xl font-bold font-custom">{listings.downPaymentPercent}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Project Highlights */}
              {listings?.highlights && listings.highlights.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold font-custom text-black mb-6 pb-4 border-b-2 border-gray-300">
                    Project Highlights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.highlights.map((highlight, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <IconRenderer name={highlight.icon} className="w-8 h-8 text-black" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold font-custom text-black mb-2">{highlight.title}</h3>
                            <p className="text-sm text-gray-600 font-custom2 leading-relaxed">{highlight.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Overview */}
              {listings?.description && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold font-custom text-black mb-6 pb-4 border-b-2 border-gray-300">
                    Overview
                  </h2>
                  <div
                    className="property-description off-plan-overview max-w-none font-custom2 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: listings.description.replace("www. hsproperty. ae", ""),
                    }}
                  />
                </section>
              )}

              {/* Residences & Pricing */}
              {listings?.residences && listings.residences.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold font-custom text-black mb-6 pb-4 border-b-2 border-gray-300">
                    Residences & Pricing
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 border-b-2 border-gray-300">
                          <th className="text-left py-4 px-4 font-bold font-custom text-black">Type</th>
                          <th className="text-left py-4 px-4 font-bold font-custom text-black">Size (Sq Ft)</th>
                          <th className="text-left py-4 px-4 font-bold font-custom text-black">Price From</th>
                          <th className="text-center py-4 px-4 font-bold font-custom text-black">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listings.residences.map((residence, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                            <td className="py-4 px-4 font-custom2 text-gray-700">{residence.type}</td>
                            <td className="py-4 px-4 font-custom2 text-gray-700">
                              {residence.sizeMin} - {residence.sizeMax}
                            </td>
                            <td className="py-4 px-4 font-custom2 text-gray-700 font-semibold">
                              {/on request/i.test(String(residence.priceFrom))
                                ? residence.priceFrom
                                : `AED ${residence.priceFrom}`}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => {
                                  setSelectedResidence(residence);
                                  setShowBrochurePopup(true);
                                }}
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition font-custom2 text-sm"
                              >
                                Enquire
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 font-custom2 italic">
                    *Prices are subject to change. Please contact us for the latest availability and pricing.
                  </p>
                </section>
              )}

              {/* Payment Plan */}
              {listings?.paymentPlans && listings.paymentPlans.length > 0 && (
                <section className="bg-gray-900 text-white p-8 rounded-2xl">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-5 border-b border-gray-700">
                    <h2 className="text-2xl md:text-3xl font-bold font-custom text-white">
                      Payment Plan
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedResidence(null);
                        setShowBrochurePopup(true);
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg hover:bg-gray-100 transition font-custom2 font-semibold text-sm whitespace-nowrap"
                    >
                      GET PAYMENT SCHEDULE <FaArrowRight />
                    </button>
                  </div>

                  {/* Steps */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    {listings.paymentPlans.map((plan, index) => (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center gap-2 w-[110px]">
                          <div className="w-[72px] h-[72px] rounded-full bg-white text-black flex items-center justify-center font-bold text-lg font-custom shadow-md">
                            {plan.valuePercentage}%
                          </div>
                          <p className="text-xs text-gray-400 font-custom2 text-center leading-snug">
                            {plan.description}
                          </p>
                        </div>
                        {index < listings.paymentPlans.length - 1 && (
                          <span className="hidden md:flex items-center mb-5">
                            <FaChevronRight className="text-gray-600 w-4 h-4 shrink-0" />
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Note */}
                  <div className="bg-gray-800 rounded-xl px-5 py-4 text-sm text-gray-400 font-custom2 leading-relaxed border border-gray-700">
                    A 4% Dubai Land Department (DLD) registration fee applies to the total property value. Mortgage options are available for eligible buyers. Please contact us for a detailed payment schedule and financing options.
                  </div>
                </section>
              )}

              {/* Amenities & Features */}
              {listings?.amenities && listings.amenities.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold font-custom text-black mb-6 pb-4 border-b-2 border-gray-300">
                    Amenities & Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listings.amenities.map((amenity, index) => (
                      <div key={index} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
                        <div className="text-gray-600 mb-2">
                          <IconRenderer name={getAmenityIcon(amenity)} className="w-6 h-6" />
                        </div>
                        <span className="text-sm text-center text-gray-700 font-custom2">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Location & Connectivity */}
              {listings?.geography && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold font-custom text-black mb-6 pb-4 border-b-2 border-gray-300">
                    Location & Connectivity
                  </h2>
                  <div className="bg-gray-900 rounded-lg overflow-hidden mb-6 relative" style={{ height: "400px" }}>
                    <MapboxPropertyDetails geography={listings.geography} round={false} />
                    <div className="absolute top-4 right-4 z-10">
                      <a
                        href={`https://www.google.com/maps?q=${listings.geography.lat},${listings.geography.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition font-custom2 text-sm font-semibold flex items-center gap-2"
                      >
                        OPEN IN GOOGLE MAPS <FaArrowRight />
                      </a>
                    </div>
                  </div>
                  {listings?.nearbyLocations && listings.nearbyLocations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {listings.nearbyLocations.map((location, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <IconRenderer name={location.icon} className="w-5 h-5 text-black flex-shrink-0" />
                          <div>
                            <div className="font-semibold font-custom text-black">{location.name}</div>
                            <div className="text-sm text-gray-600 font-custom2">{location.distance}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* FAQ */}
              {listings?.faqs && listings.faqs.length > 0 && (
                <section className="bg-white">
                  <h2 className="text-2xl md:text-3xl font-bold font-custom text-black mb-6 pb-4 border-b-2 border-gray-300">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {listings.faqs.map((item, index) => {
                      const isOpen = openFAQIndex === index;
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                            className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition font-custom2"
                          >
                            <h3 className="font-semibold pr-4">{item.question}</h3>
                            <span className="flex-shrink-0">
                              {isOpen ? <FaMinus className="w-5 h-5" /> : <FaPlus className="w-5 h-5" />}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="p-4 pt-0 text-gray-700 font-custom2 leading-relaxed">
                              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar - Contact Form */}
            <div id="contact-form-sidebar" className="w-full lg:w-1/3">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button type="button" onClick={() => setActiveTab("Book")} className={getTabClass("Book")}>
                    Book
                  </button>
                  <button type="button" onClick={() => setActiveTab("BookViewing")} className={getTabClass("BookViewing")}>
                    Book Viewing
                  </button>
                  <button type="button" onClick={() => setActiveTab("Brochure")} className={getTabClass("Brochure")}>
                    Brochure
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 bg-white">
                  {activeTab === "Book" && (
                    <form onSubmit={handleBookSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white font-custom2"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white font-custom2"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">
                          WhatsApp # / Phone #
                        </label>
                        <CountrySelect
                          styling="border rounded bg-white text-black"
                          flags={flags}
                          labels={en}
                          value={country}
                          onChange={setCountry}
                          onPhoneChange={handlePhoneNumberChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {listings?.residences?.length > 0 && (
                        <div>
                          <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">Interested Property Type</label>
                          <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white font-custom2"
                          >
                            {listings.residences.map((residence, index) => (
                              <option key={index} value={residence.displayName}>
                                {residence.displayName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">
                          Investment (Potential Interest)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white font-custom2"
                          placeholder="Enter your investment (Potential Interest)"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={bookLoading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-custom2 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {bookLoading ? (
                          <>
                            <FaSpinner className="animate-spin" aria-hidden />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MY ENQUIRY</span>
                            <FaArrowRight />
                          </>
                        )}
                      </button>
                      {success && (
                        <div className="text-green-600 text-sm text-center font-custom2">
                          Thank you! We&apos;ll contact you shortly.
                        </div>
                      )}
                      <Link href="tel:+971526902884" className="block text-center text-sm text-gray-600 hover:text-black transition font-custom2">
                        OR CONTACT DIRECTLY
                      </Link>
                      <Link
                        href={whatsappInquiryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-custom2 font-semibold flex items-center justify-center gap-2"
                      >
                        <FaWhatsapp className="w-5 h-5" /> WhatsApp Specialist Now
                      </Link>
                    </form>
                  )}
                  {activeTab === "BookViewing" && (
                    <form onSubmit={handleBookViewingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={viewingFormData.fullName}
                          onChange={handleViewingChange}
                          required
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-custom2"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={viewingFormData.email}
                          onChange={handleViewingChange}
                          required
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-custom2"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">
                          WhatsApp # / Phone #
                        </label>
                        <CountrySelect
                          styling="border rounded bg-white text-black"
                          flags={flags}
                          labels={en}
                          value={viewingCountry}
                          onChange={setViewingCountry}
                          onPhoneChange={handleViewingPhoneChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {listings?.residences?.length > 0 && (
                        <div>
                          <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">Interested Property Type</label>
                          <select
                            name="propertyType"
                            value={viewingFormData.propertyType}
                            onChange={handleViewingChange}
                            className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-custom2"
                          >
                            {listings.residences.map((residence, index) => (
                              <option key={index} value={residence.displayName}>
                                {residence.displayName}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={viewingFormData.preferredDate}
                          onChange={handleViewingChange}
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-custom2"
                          placeholder="Enter your preferred date"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 font-custom2 text-gray-800">
                          Additional Notes
                        </label>
                        <textarea
                          name="message"
                          value={viewingFormData.message}
                          onChange={handleViewingChange}
                          rows={3}
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 font-custom2"
                          placeholder="Enter your additional notes"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={viewingLoading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-custom2 font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {viewingLoading ? (
                          <>
                            <FaSpinner className="animate-spin" aria-hidden />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>REQUEST VIEWING</span>
                            <FaArrowRight />
                          </>
                        )}
                      </button>
                      {viewingSuccess && (
                        <div className="text-green-600 text-sm text-center font-custom2">
                          Thank you! We&apos;ll contact you shortly to schedule your viewing.
                        </div>
                      )}
                    </form>
                  )}
                  {activeTab === "Brochure" && (
                    <div className="text-center py-8">
                      <p className="text-gray-600 font-custom2 mb-4">Download the brochure for this property</p>
                      <a
                        href={`/Brochure/${propertyId}.pdf`}
                        download
                        className="inline-flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-custom2 font-semibold"
                      >
                        <FaArrowRight /> Download Brochure
                      </a>
                      <p className="text-xs text-gray-500 mt-3 font-custom2">
                        If the brochure is not available, please contact us.
                      </p>
                    </div>
                  )}

                  {/* Agent Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                    <Image
                      src="/logos-icons/fahad.jpeg"
                      alt="Agent"
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold font-custom text-black">Fahad Haq</div>
                      <div className="text-sm text-gray-600 font-custom2">SR. Off-Plan Specialist</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Popup - for Residences & Pricing Enquire button */}
      {showBrochurePopup && (
        <DowloadBrochurePopUp
          image={listings?.coverPhoto?.url || "/Bg-Imgs/hero-bg.jpg"}
          propertyUrl={propertyUrl}
          propertySlug={propertyId}
          propertyTitle={propertyTitle}
          propertyType={selectedResidence?.displayName || ""}
          setShow={setShowBrochurePopup}
        />
      )}

      <Footer />
    </div>
  );
}
