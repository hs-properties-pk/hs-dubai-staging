"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import {
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { LuMapPin, LuPhone } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Fade from "react-reveal/Fade";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";
import MapboxPropertyDetails from "./MapboxPropertyDetails";

const Contact = () => {
  const source = "Contact";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const getTimestamp = () =>
    new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    inquiryType: "",
    subject: "",
    message: "",
    createdAt: getTimestamp(),
  });

  const inquiryTypes = [
    "General Inquiry",
    "Buy Property",
    "Rent Property",
    "Off Plan",
    "Community Inquiry",
    "Valuation",
    "Book Appointment",
    "Others",
  ];

  const subjectMap = {
    "General Inquiry": "General Inquiry",
    "Buy Property": "Buy Property Inquiry",
    "Rent Property": "Rent Property Inquiry",
    "Off Plan": "Off Plan Investment!",
    "Community Inquiry": "Community Inquiry",
    Valuation: "Property Valuation Request",
    "Book Appointment": "Book Appointment",
    Others: "Other Inquiry",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Auto-populate subject when inquiry type changes
    if (name === "inquiryType" && subjectMap[value]) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: value,
        subject: subjectMap[value],
      }));
    }
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      setSubmitError("Please accept the privacy policy to continue.");
      return;
    }

    setLoading(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/send-submission-contact", {
        ...formData,
        source,
        country,
        notionPage: "/contact",
      });

      setLoading(false);
      setSuccess(true);

      // Reset the form fields (keep createdAt fresh)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        inquiryType: "",
        subject: "",
        message: "",
        createdAt: getTimestamp(),
      });
      setPrivacyAccepted(false);
    } catch (error) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again or contact us directly.";
      setSubmitError(message);
      console.error("Form submission failed:", error.response?.status, message);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const [country, setCountry] = useState("AE");

  const officeHours = [
    { day: "Monday - Thursday", time: "9:00 AM - 7:00 PM", status: "Open" },
    { day: "Friday", time: "9:00 AM - 12:00 PM & 2:00 PM - 7:00 PM", status: "Open" },
    { day: "Saturday", time: "9:00 AM - 7:00 PM", status: "Open" },
    { day: "Sunday", time: "Closed", status: "Closed" },
  ];

  const faqItems = [
    {
      question: "Do you charge buyers a commission fee?",
      answer:
        "No  H&S Real Estate does not charge buyers or tenants any agency fees. Our services are completely free for buyers and renters. Developers and landlords pay our fee, meaning you get expert guidance at zero cost.",
    },
    {
      question: "How quickly can I get a response after contacting you?",
      answer:
        "WhatsApp enquiries are typically answered within 5 minutes during office hours. Form submissions and email enquiries are responded to within 30 minutes during business hours (Mon–Sat, 9am–7pm). Urgent matters can always be escalated via WhatsApp.",
    },
    {
      question: "Can I visit the office without an appointment?",
      answer:
        "Absolutely  walk-ins are welcome at our Grey Square showroom, Al Barsha 2. Our team is available Mon–Thu 9am–7pm, Friday 9am–12pm & 2pm–7pm, and Saturday 9am–7pm. For guaranteed availability, booking in advance is appreciated but not required.",
    },
    {
      question:
        "Do your agents speak languages other than English?",
      answer:
        "Yes  our multilingual team covers Arabic, Hindi, Urdu, Russian, French, Chinese, and several other languages. We'll always match you with a consultant who can communicate in your preferred language.",
    },
    {
      question: "Can I get a free property valuation?",
      answer:
        "Yes, H&S Real Estate offers free property valuations for Dubai real estate. Simply contact us with your property details and we'll provide a comprehensive market analysis based on current DLD transaction data  no obligation whatsoever.",
    },
    {
      question: "Are your agents RERA certified?",
      answer:
        "Yes  every agent at H&S Real Estate is fully RERA (Real Estate Regulatory Agency) certified and licensed by the Dubai Land Department. We operate under strict DLD compliance, ensuring all transactions are legally secure and transparent.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto font-custom2">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Dark Background */}
        <div className="w-full lg:w-5/12 bg-black text-white px-4 md:p-6 lg:self-start order-2 lg:order-1">
          <Fade left duration={1500}>
            <div className="flex flex-col p-6">
              {/* Contact Information */}
              <div className="flex flex-col gap-4 items-center md:items-start mb-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-custom uppercase tracking-wider text-white mb-2">
                    CONTACT INFORMATION
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-custom2 text-white mb-4">
                    Say Hello  We&apos;re Ready to Help
                  </h3>
                  <p className="mb-8 text-[#C9C9C9] text-sm">
                    Get in touch with our expert team. We&apos;re here to assist you with all your real estate needs in Dubai.
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center md:items-start gap-6">
                  <div className="flex flex-col md:flex-row gap-5 hover:text-primary items-center ml-[2px]">
                    <LuPhone className="text-3xl md:text-xl" />
                    <Link
                      href="tel:+971526902884"
                      className="footer-contact-office-address tracking-wider"
                    >
                      +971 (0) 4 345 4888
                    </Link>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5 hover:text-primary items-center ml-[2px]">
                    <FaRegEnvelope className="text-3xl md:text-xl" />
                    <Link
                      href="mailto:info@hsproperty.ae"
                      className="footer-contact-office-address tracking-wider"
                    >
                      info@hsproperty.ae
                    </Link>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5 items-center hover:text-primary text-center md:text-start">
                    <LuMapPin className="text-4xl sm:text-2xl" />
                    <Link
                      target="_blank"
                      href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                      className="tracking-wider"
                    >
                      Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                    </Link>
                  </div>
                </div>
              </div>

              {/* Office Hours Section */}
              <div className="mb-8">
                <h3 className="text-xl font-custom uppercase tracking-wider text-white mb-4">
                  OFFICE HOURS
                </h3>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-700 pb-2"
                    >
                      <div>
                        <p className="text-white font-medium">{schedule.day}</p>
                        <p className="text-[#C9C9C9] text-sm">{schedule.time}</p>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          schedule.status === "Open"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-custom uppercase tracking-wider text-white mb-4">
                  FOLLOW US
                </h3>
                <div className="flex gap-4 items-center justify-center md:justify-start">
                  <Link
                    href="https://www.facebook.com/hspropertyrealestate"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 w-10 border border-white rounded-full mr-1 hover:border-white hover:text-white transition-colors"
                  >
                    <RiFacebookFill size="1.3em" fill="currentColor" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/hs_property/"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 w-10 border border-white rounded-full mr-1 hover:border-white hover:text-white transition-colors"
                  >
                    <FaInstagram size="1.2em" fill="currentColor" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@HSRealEstate"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 w-10 border border-white rounded-full hover:border-white hover:text-white transition-colors"
                  >
                    <AiOutlineYoutube size="1.4em" fill="currentColor" />
                  </Link>
                  <Link
                    href="https://wa.me/971526902884?text=Hello!"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 w-10 border border-white rounded-full mr-1 hover:border-white hover:text-white transition-colors"
                  >
                    <FaWhatsapp size="1.2em" fill="currentColor" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/h-s-properties/"
                    target="_blank"
                    className="inline-flex items-center justify-center h-10 w-10 border border-white rounded-full hover:border-white hover:text-white transition-colors"
                  >
                    <FaLinkedinIn size="1.1em" fill="currentColor" />
                  </Link>
                </div>
              </div>
            </div>
          </Fade>
        </div>

        {/* Right Side - Light Background */}
        <div className="w-full lg:w-7/12 bg-white px-4 md:p-6 order-1 lg:order-2">
          <Fade right duration={1500}>
            <div className="w-full h-full flex flex-col bg-white p-4">
              {/* Form Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-custom uppercase tracking-wider text-black mb-2">
                  SEND & MESSAGE
                </h2>
                <h3 className="text-3xl md:text-4xl font-custom2 text-black mb-2">
                  How Can We Help You?
                </h3>
                <p className="text-gray-600 mb-6 font-custom2">
                  Fill in the form below  a specialist will reach out within 30 minutes during business hours.
                </p>

                <form onSubmit={handleSubmit} className="w-full" aria-busy={loading}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="first-name"
                      >
                        First Name
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border-black border-b py-3 px-4 leading-tight focus:outline-none focus:border-gray-300"
                        id="firstName"
                        name="firstName"
                        required
                        onChange={handleChange}
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="last-name"
                      >
                        Last Name
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border-black border-b py-3 px-4 leading-tight focus:outline-none focus:border-gray-300"
                        id="lastName"
                        name="lastName"
                        required
                        onChange={handleChange}
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border-black border-b py-3 px-4 leading-tight focus:outline-none focus:border-gray-300"
                        id="email"
                        name="email"
                        required
                        onChange={handleChange}
                        type="email"
                        placeholder="example@example.com"
                        value={formData.email}
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="phone-number"
                      >
                        Phone Number
                      </label>
                      <CountrySelect
                        styling="border-b border-black"
                        flags={flags}
                        labels={en}
                        value={country}
                        onChange={setCountry}
                        onPhoneChange={handlePhoneNumberChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="inquiryType"
                      >
                        Inquiry Type
                      </label>
                      <select
                        className="appearance-none block w-full text-gray-700 border-black border-b py-3 px-4 leading-tight focus:outline-none focus:border-gray-300 bg-white"
                        id="inquiryType"
                        name="inquiryType"
                        required
                        onChange={handleChange}
                        value={formData.inquiryType}
                      >
                        <option value="">Select an option</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="subject"
                      >
                        Subject
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border-black border-b py-3 px-4 leading-tight focus:outline-none focus:border-gray-300"
                        id="subject"
                        name="subject"
                        required
                        onChange={handleChange}
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        className="appearance-none block w-full text-gray-700 py-3 px-4 leading-tight focus:outline-none border-black border-b"
                        id="message"
                        name="message"
                        required
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about what you're looking for  budget, location, property type, timeline..."
                        value={formData.message}
                      ></textarea>
                    </div>
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="mr-2"
                          required
                        />
                        <span className="text-sm text-gray-700 font-custom2">
                          By submitting, you agree to our Privacy Policy. We&apos;ll never share your data or send spam.
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      className="bg-black rounded-lg hover:bg-gray-800 duration-300 text-white font-bold py-3 px-6 focus:outline-none focus:shadow-outline w-full md:w-max flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <FaArrowRight />
                        </>
                      )}
                    </button>
                  </div>
                  {submitError && (
                    <p className="w-full text-red-600 text-sm mt-4 text-center">
                      {submitError}
                    </p>
                  )}
                  {success && (
                    <h1 className="w-full text-black uppercase text-lg font-extrabold mt-4 text-center tracking-wider">
                      Thank You!
                    </h1>
                  )}
                </form>
              </div>

            </div>
          </Fade>
        </div>
      </div>

      {/* Map and Find Us Section - Full Width */}
      <div className="w-full my-8">
        <div className="flex flex-col gap-6">
          {/* Map Section */}
          <div className="w-full h-[550px] md:h-[650px] overflow-hidden">
            <MapboxPropertyDetails
              round={false}
              geography={{
                lat: 25.107986965590694,
                lng: 55.22336464604849,
              }}
            />
          </div>

          {/* Find Us Section */}
          <div className="w-full bg-black text-white p-6 md:p-8 rounded-xl">
            <h3 className="text-xl font-custom uppercase tracking-wider text-white mb-2">
              VISIT OUR SHOWROOM
            </h3>
            <h4 className="text-2xl md:text-3xl font-custom2 text-white mb-4">
              Find Us in Al Barsha 2
            </h4>
            <p className="text-gray-300 mb-6 font-custom2">
              Visit our showroom to explore properties, meet our team, and get personalized advice on your real estate journey.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="font-semibold mb-1">By Metro:</p>
                <p className="text-gray-300 text-sm">
                  Al Barsha Metro Station (Red Line) - 5 minutes walk
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">By Car:</p>
                <p className="text-gray-300 text-sm">
                  Umm Suqeim Road, Al Barsha 2, Dubai
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Landmark:</p>
                <p className="text-gray-300 text-sm">
                  Grey Square, Showroom 2
                </p>
              </div>
            </div>
            <Link
              href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
            >
              GET DIRECTIONS <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section - Full Width */}
      <div className="w-full mb-8 mt-16">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-custom uppercase tracking-wider text-black mb-2">
            FAQ
          </h2>
          <h3 className="text-3xl md:text-4xl font-custom2 text-black mb-2">
            Common Questions
          </h3>
          <p className="text-gray-600 mb-6 font-custom2">
            Answers to the most common questions our clients ask before getting in touch. Can&apos;t find what you need? Just ask us.
          </p>
          <button
            onClick={() => {
              const formSection = document.querySelector('form');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mb-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-custom2"
          >
            ASK A QUESTION
          </button>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:text-black transition-colors"
                >
                  <h4 className="font-custom2">{item.question}</h4>
                  <span className="text-black">
                    {openFaqIndex === index ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </span>
                </button>
                <div
                  style={{
                    display: openFaqIndex === index ? "block" : "none",
                  }}
                >
                  <div className="p-4 text-gray-700 font-custom2">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
