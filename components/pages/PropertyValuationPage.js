"use client";
import Footer from "@/components/Footer";
import PageLinks from "@/components/PageLinks";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Fade } from "react-reveal";
import BelowHiddenText from "../BelowHiddenText";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "../CountrySelect";
import PremiumPageHero from "../PremiumPageHero";

const PropertyValuationPage = () => {
  const source = "Property Valuation";
  const [country, setCountry] = useState("AE");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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
    listingType: "",
    propertyAddress: "",
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
      const response = await axios.post(
        "/api/send-submission-property-valuation",
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
          fullName: "",
          email: "",
          phoneNumber: "",
          listingType: "",
          propertyAddress: "",
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

  const PropertyValuationTextSection = [
    {
      question: "Property Valuation Dubai",
      answer: `
    <div>
      <h1>Property Valuation Dubai - Professional Assessment Services</h1>
      <p>Are you curious about the value of your property in Dubai's ever-evolving real estate market? At H&S Real Estate, we specialize in delivering precise and reliable property valuation Dubai services. Whether you need an apartment valuation in Dubai, house valuation in Dubai, or an assessment for an off-plan property, our team provides comprehensive and data-driven insights tailored to your needs.</p><br>

      <h2>Dubai Property Valuation - Expert Analysis and Market Insights</h2>
      <p>With the help of our property valuation experts, you can make informed decisions about selling, renting, or investing in Dubai's competitive market. We leverage advanced tools and market analysis to ensure accurate Dubai property valuation results, making us one of the leading property valuation companies in Dubai.</p><br>

      <h2>Property Valuation in Dubai - Comprehensive Services</h2>
      <h3>Residential Valuations:</h3>
      <ul>
        <li>Villa and townhouse assessments</li>
        <li>Apartment and penthouse valuations</li>
        <li>Off-plan property evaluations</li>
        <li>Investment property analysis</li>
      </ul>
      <h3>Commercial Valuations:</h3>
      <ul>
        <li>Office building assessments</li>
        <li>Retail space valuations</li>
        <li>Industrial property evaluations</li>
        <li>Mixed-use development analysis</li>
      </ul>
      <h3>Specialized Services:</h3>
      <ul>
        <li>Mortgage valuation reports</li>
        <li>Insurance valuation assessments</li>
        <li>Legal dispute valuations</li>
        <li>Portfolio property reviews</li>
      </ul><br>

      <h2>Dubai Property Valuation - Methodology and Approach</h2>
      <ol>
        <li>Property Inspection: Detailed physical assessment of the property</li>
        <li>Market Analysis: Comprehensive study of comparable sales and rentals</li>
        <li>Location Assessment: Evaluation of area amenities and growth prospects</li>
        <li>Financial Modeling: Analysis of income potential and investment returns</li>
        <li>Report Generation: Professional valuation report with detailed findings</li>
      </ol><br>

      <h2>Property Valuation Dubai - Factors Affecting Property Value</h2>
      <ul>
        <li>Location and Accessibility: Proximity to key areas, transportation links</li>
        <li>Property Condition: Age, maintenance, and upgrade requirements</li>
        <li>Market Trends: Current supply and demand dynamics</li>
        <li>Amenities: Community facilities and property features</li>
        <li>Investment Potential: Rental yields and capital appreciation prospects</li>
        <li>Regulatory Environment: Government policies and development plans</li>
      </ul><br>

      <h2>Property Valuation in Dubai - Why Choose H&S Real Estate</h2>
      <ul>
        <li>Certified Valuers: RICS-qualified professionals with local expertise</li>
        <li>Comprehensive Reports: Detailed analysis with supporting documentation</li>
        <li>Quick Turnaround: Efficient service delivery within agreed timelines</li>
        <li>Market Knowledge: Deep understanding of Dubai's property markets</li>
        <li>Technology Integration: Advanced valuation tools and databases</li>
        <li>Client Support: Ongoing assistance and clarification services</li>
      </ul><br>

      <h2>Ready to find out what your property is worth?</h2>
      <p>Our team at H&S Real Estate is here to help. Simply fill out the form below, and one of our property valuation experts will get in touch with you shortly to schedule an assessment.</p><br>

      <h2>Frequently Asked Questions About Property Valuation Dubai</h2>
    </div>
  `,
    },
  ];

  const faqItems = [
    {
      question:
        "How often should I get a property valuation Dubai assessment for my investment?",
      answer:
        "We recommend getting a property valuation Dubai assessment annually for investment properties, before major decisions like selling or refinancing, and every 2-3 years for residential properties to track market value changes.",
    },
    {
      question:
        "What is the cost range for Dubai property valuation services in 2025?",
      answer:
        "Dubai property valuation costs vary based on property type and complexity: residential properties typically range from AED 1,500-3,500, while commercial properties and complex valuations can cost AED 3,000-8,000.",
    },
    {
      question:
        "How long does a complete property valuation in Dubai take from start to finish?",
      answer:
        "A standard property valuation in Dubai takes 3-5 business days from property inspection to final report delivery, though complex commercial properties or unique assets may require 7-10 business days.",
    },
    {
      question:
        "Do banks require property valuation Dubai reports for all mortgage applications?",
      answer:
        "Yes, all UAE banks require certified property valuation Dubai reports for mortgage applications to determine loan eligibility, loan-to-value ratios, and maximum financing amounts for both purchase and refinancing.",
    },
    {
      question:
        "Can property valuation Dubai services help determine rental income potential?",
      answer:
        "Yes, our property valuation Dubai services include rental yield analysis, comparing similar properties in the area, and providing detailed rental income projections based on current market conditions and property specifications.",
    },
    {
      question:
        "What qualifications should I look for in property valuation Dubai professionals?",
      answer:
        "Look for property valuation Dubai professionals with RICS (Royal Institution of Chartered Surveyors) certification, local Dubai market experience, RERA registration, and proven track record with banks and financial institutions.",
    },
    {
      question:
        "Is property valuation Dubai required for inheritance and estate planning purposes?",
      answer:
        "Yes, property valuation Dubai is essential for inheritance planning, estate distribution, tax planning, and legal documentation, providing official market value assessments recognized by UAE courts and authorities.",
    },
    {
      question:
        "How accurate are property valuation in Dubai reports compared to actual selling prices?",
      answer:
        "Professional property valuation in Dubai reports typically achieve 95-98% accuracy compared to actual selling prices, using comprehensive market analysis, comparable sales data, and standardized valuation methodologies.",
    },
    {
      question:
        "Can I use Dubai property valuation reports for insurance claim purposes?",
      answer:
        "Yes, Dubai property valuation reports are accepted by insurance companies for coverage determination, claim settlements, and policy renewals, providing official replacement cost and market value assessments.",
    },
    {
      question:
        "What factors can negatively impact my property valuation Dubai results?",
      answer:
        "Factors that can negatively impact property valuation Dubai include poor property maintenance, outdated fixtures, location disadvantages, market oversupply, economic conditions, and lack of proper documentation or legal compliance.",
    },
  ];

  return (
    <div>
      <PremiumPageHero
        image="/Bg-Imgs/property-valuation-bg.png"
        imageAlt="Property valuation in Dubai — H&S Real Estate"
        eyebrow="RERA-led valuations"
        titleBefore="Book a professional property valuation in Dubai"
        description="Accurate apartment, villa, and off-plan valuations for selling, buying, and mortgages—backed by certified valuers and market data."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property valuation", href: null },
        ]}
        stats={[
          { value: "100%", label: "Accuracy Guaranteed" },
          { value: "30min", label: "Response Time" },
          { value: "100k+", label: "Happy Clients" },
          { value: "30+", label: "Years Experience" },
        ]}
      />
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto pt-12 md:pt-20 pb-6 md:pb-10 px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-medium text-black font-custom text-center">
            Get Accurate Property Valuation Services with H&S Real Estate
          </h2>
        </div>
      </Fade>
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 font-custom2 flex flex-col gap-4 pb-16 md:pb-28">
          <p className="text-gray-600  text-base  md:text-lg  tracking-wider">
            Are you curious about the value of your property in Dubai’s
            ever-evolving real estate market? At H&S Real Estate, we specialize
            in delivering precise and reliable property valuation services in
            Dubai. Whether you need an apartment valuation in Dubai, house
            valuation in Dubai, or an assessment for an off-plan property, our
            team provides comprehensive and data-driven insights tailored to
            your needs.
          </p>
          <p className="text-gray-600  text-base  md:text-lg  tracking-wider">
            With the help of our property valuation experts, you can make
            informed decisions about selling, renting, or investing in Dubai’s
            competitive market. We leverage advanced tools and market analysis
            to ensure accurate results, making us one of the leading property
            valuation companies in Dubai.
          </p>
        </div>
      </Fade>
      <div className="relative flex items-center justify-center min-h-screen bg-gray-100 font-custom2">
        <div className="absolute inset-0 bg-cover bg-center blur-md">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/property-valuation/Image-1.jpg"
            alt="Image 2"
            className="w-full h-full object-cover "
            priority
          />
        </div>
        <div className="relative w-full max-w-2xl mx-4 px-4  py-6 md:py-6 bg-white rounded-xl shadow-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-black font-custom">
            Request Your Free Property Valuation Today
          </h2>
          <p className="mt-4 text-center text-gray-600 tracking-wider">
            Ready to find out what your property is worth? Our team at H&S Real
            Estate is here to help. Simply fill out the form below, and one of
            our valuation experts will get in touch with you shortly to schedule
            an assessment.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email*
              </label>
              <input
                id="email"
                name="email"
                required
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile*
              </label>
              <CountrySelect
                styling="border rounded"
                flags={flags}
                labels={en}
                value={country}
                onChange={setCountry}
                onPhoneChange={handlePhoneNumberChange}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Listing Type*
              </label>
              <span className="absolute bottom-3.5 right-0 flex items-center pr-3 pointer-events-none ">
                <IoIosArrowDown className="h-4 w-4 text-black bg-white rounded-full" />
              </span>
              <select
                id="listingType"
                name="listingType"
                required
                value={formData.listingType}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="" disabled>
                  Listing Type
                </option>
                <option>Sell</option>
                <option>Rent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Address*
              </label>
              <input
                id="propertyAddress"
                name="propertyAddress"
                required
                onChange={handleChange}
                type="text"
                placeholder="Property Address"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium text-white bg-black rounded-md hover:bg-gray-800"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {success && (
              <h1 className="w-full text-black uppercase text-base font-extrabold  mt-4 text-center tracking-wider">
                Thank You!
              </h1>
            )}
          </form>
        </div>
      </div>
      <PageLinks />
      <BelowHiddenText
        textSection={PropertyValuationTextSection}
        faqItems={faqItems}
      />
      <Footer />
    </div>
  );
};

export default PropertyValuationPage;
