"use client";
import Footer from "@/components/Footer";
import { Fade } from "react-reveal";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "@/components/PropertyCard";
import Image from "next/image";
import FAQSectionAll from "@/components/FAQSectionAll";
import MortgagePopUp from "@/components/MortgagePopUp";
import HomeHeroHeading from "../HomeHeroHeading";
import { offPlanListings } from "@/data/off-plan-data";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa6";
import {
  FaHome,
  FaCalculator,
  FaHandshake,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaChartLine,
  FaFileAlt,
  FaUserTie,
  FaStar,
  FaSpinner,
} from "react-icons/fa";
import {
  FaPercent,
  FaMoneyBillWave,
} from "react-icons/fa6";
import axios from "axios";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "@/components/CountrySelect";
import PremiumPageHero from "../PremiumPageHero";

const MortgagesPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState(9800000);
  const [deposit, setDeposit] = useState(1960000);
  const [mortgagePeriod, setMortgagePeriod] = useState(20);
  const [interestRate, setInterestRate] = useState(5);
  const [activeRateTab, setActiveRateTab] = useState("UAE Residents");

  // Preserve all existing math calculations exactly as they were
  const loanAmount = propertyPrice - deposit;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = mortgagePeriod * 12;

  const monthlyPayment =
    (loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments))) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  const totalPurchaseCosts = propertyPrice;
  const totalRequiredUpfront = deposit + totalPurchaseCosts;

  // Form state for "How Much Can You Borrow?" section
  const [borrowFormData, setBorrowFormData] = useState({
    monthlyIncome: "",
    monthlyCommitments: "",
    buyerStatus: "",
    propertyValue: "",
  });
  const [borrowStep, setBorrowStep] = useState(1); // 1 = calculation step, 2 = contact info step
  const [borrowLoading, setBorrowLoading] = useState(false);
  const [borrowSuccess, setBorrowSuccess] = useState(false);
  const [estimatedBorrowing, setEstimatedBorrowing] = useState(null);
  const [borrowContactData, setBorrowContactData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "AE",
  });

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-10 md:-bottom-20 left-1/2 translate-x-6 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronRight className="text-sm md:text-2xl" />
      </div>
    );
  }
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-12 w-10 h-10 md:w-14 md:h-14 text-black hover:text-white border-2 border-black rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-black transition duration-300"
        onClick={onClick}
      >
        <FaChevronLeft className="text-sm md:text-2xl" />
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Updated FAQs
  const faqItems = [
    {
      question: "Do you charge a fee for mortgage brokering?",
      answer:
        "No  H&S Real Estate's mortgage advisory service is completely free to you. We receive a referral fee from the lender upon successful mortgage completion. You get expert guidance, rate comparisons, and end-to-end support at zero cost.",
    },
    {
      question: "How much deposit do I need for a Dubai mortgage?",
      answer:
        "For properties under AED 5M: expat residents need min. 20% down payment (80% LTV). UAE nationals: min. 15% (85% LTV). For properties above AED 5M: min. 30% for expats, 25% for nationals. Non-residents require at least 40% (60% LTV).",
    },
    {
      question: "How long does mortgage pre-approval take?",
      answer:
        "With complete documentation, we typically secure pre-approval within 5–7 working days for salaried applicants and 7–10 days for business owners. Our team fast-tracks submissions through dedicated bank relationships, often achieving faster turnaround.",
    },
    {
      question: "Can non-residents get a mortgage in Dubai?",
      answer:
        "Yes  non-residents can secure UAE mortgages up to 60% LTV through select partner banks including HSBC, Mashreq, and Standard Chartered. Foreign income in most major currencies is accepted. Our specialist team handles all non-resident applications.",
    },
    {
      question: "What documents do I need to apply?",
      answer:
        "Salaried employees: passport, visa, Emirates ID, salary certificate, last 3 payslips, 6 months bank statements, and details of existing liabilities. Self-employed: trade license, 2 years audited financials, 12 months bank statements, and ownership documents. Our team will provide a personalised checklist.",
    },
    {
      question: "What interest rates can I expect in the UAE?",
      answer:
        "As of early 2025, fixed rates typically range from 2.99% to 4.5% p.a., while variable rates (EIBOR-linked) range from EIBOR+1.5% to EIBOR+2.5%. Your actual rate depends on your financial profile, down payment amount, and chosen lender. H&S negotiates competitive rates on your behalf.",
    },
    {
      question: "What additional costs should I budget for?",
      answer:
        "Beyond the down payment: DLD transfer fee (4% of property value), mortgage registration fee (0.25% of loan), property valuation fee (AED 2,500–3,500), bank arrangement fee (0.5–1% of loan, often waived via H&S), and agent commission (if applicable). Budget approximately 6–8% above the property price in total.",
    },
  ];

  // Expert Guidance cards data
  const expertGuidanceCards = [
    {
      icon: FaUserTie,
      title: "In-depth advice",
      description: "Work with experienced mortgage specialists who understand the UAE market",
    },
    {
      icon: FaClock,
      title: "Assistance 24/7",
      description: "Get support whenever you need it, around the clock",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Process",
      description: "Your data and financial information are protected with bank-level security",
    },
    {
      icon: FaHandshake,
      title: "Zero Broker Fee",
      description: "No hidden costs or broker fees - we're paid by lenders, not you",
    },
    {
      icon: FaChartLine,
      title: "Best Rates",
      description: "Access competitive rates from multiple lenders across the UAE",
    },
    {
      icon: FaCheckCircle,
      title: "Guaranteed Service",
      description: "100% commitment to finding you the best mortgage solution",
    },
  ];

  // Find the Right Mortgage cards data
  const mortgageTypeCards = [
    {
      icon: FaHome,
      title: "Ready-Made Mortgage",
      description: "Pre-approved mortgages for quick property purchases",
    },
    {
      icon: FaMoneyBillWave,
      title: "Refinancing",
      description: "Lower your monthly payments with better rates",
    },
    {
      icon: FaPercent,
      title: "Fixed Rate",
      description: "Lock in your interest rate for peace of mind",
    },
    {
      icon: FaChartLine,
      title: "Variable Rate",
      description: "Benefit from potential rate decreases over time",
    },
    {
      icon: FaFileAlt,
      title: "Local & International Mortgage",
      description: "Mortgage solutions for residents and non-residents",
    },
    {
      icon: FaCalculator,
      title: "Investment Property",
      description: "Mortgage solutions for property investors",
    },
  ];

  // Mortgage Journey Steps
  const journeySteps = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Discuss your financial situation and property goals with our experts",
    },
    {
      step: "2",
      title: "Documentation & Submission",
      description: "We help you gather and submit all required documents",
    },
    {
      step: "3",
      title: "Pre-Approval",
      description: "Get pre-approved to know your borrowing capacity",
    },
    {
      step: "4",
      title: "Property Selection",
      description: "Find your dream property with our real estate team",
    },
    {
      step: "5",
      title: "Approval & Completion",
      description: "Receive approval and complete your property purchase",
    },
  ];

  // UAE Mortgage Rates Data by Tab
  const mortgageRatesData = {
    "UAE Residents": [
      {
        bank: "Emirates NBD",
        bankShort: "ENBD",
        product: "Fixed 2yr then Variable",
        rate: "2.99%",
        type: "FIXED",
        maxLTV: "80%",
        term: "25 yrs",
        isBest: true,
      },
      {
        bank: "ADCB",
        bankShort: "ADCB",
        product: "Fixed 3 Years",
        rate: "3.25%",
        type: "FIXED",
        maxLTV: "80%",
        term: "25 yrs",
        isBest: false,
      },
      {
        bank: "First Abu Dhabi Bank",
        bankShort: "FAB",
        product: "Variable EIBOR Linked",
        rate: "EIBOR+1.6%",
        type: "VARIABLE",
        maxLTV: "80%",
        term: "25 yrs",
        isBest: false,
      },
      {
        bank: "Mashreq Bank",
        bankShort: "MSRQ",
        product: "Fixed 1 Year Intro",
        rate: "3.49%",
        type: "FIXED",
        maxLTV: "75%",
        term: "25 yrs",
        isBest: false,
      },
      {
        bank: "HSBC UAE",
        bankShort: "HSBC",
        product: "Premier Variable",
        rate: "EIBOR+1.75%",
        type: "VARIABLE",
        maxLTV: "80%",
        term: "25 yrs",
        isBest: false,
      },
      {
        bank: "RAK Bank",
        bankShort: "RAK",
        product: "Fixed 5 Years",
        rate: "3.75%",
        type: "FIXED",
        maxLTV: "75%",
        term: "20 yrs",
        isBest: false,
      },
    ],
    "Non-Residents": [
      {
        bank: "HSBC UAE",
        bankShort: "HSBC",
        product: "Non-Resident Fixed",
        rate: "3.49%",
        type: "FIXED",
        maxLTV: "60%",
        term: "20 yrs",
        isBest: true,
      },
      {
        bank: "Mashreq Bank",
        bankShort: "MSRQ",
        product: "Non-Resident Variable",
        rate: "EIBOR+2.0%",
        type: "VARIABLE",
        maxLTV: "60%",
        term: "20 yrs",
        isBest: false,
      },
      {
        bank: "Standard Chartered",
        bankShort: "SC",
        product: "Non-Resident Fixed",
        rate: "3.75%",
        type: "FIXED",
        maxLTV: "55%",
        term: "20 yrs",
        isBest: false,
      },
    ],
    "Islamic Finance": [
      {
        bank: "Dubai Islamic Bank",
        bankShort: "DIB",
        product: "Murabaha Home Finance",
        rate: "3.25%",
        type: "ISLAMIC",
        maxLTV: "80%",
        term: "25 yrs",
        isBest: true,
      },
      {
        bank: "Abu Dhabi Islamic",
        bankShort: "ADIB",
        product: "Murabaha Fixed",
        rate: "3.49%",
        type: "ISLAMIC",
        maxLTV: "80%",
        term: "25 yrs",
        isBest: false,
      },
      {
        bank: "Emirates Islamic",
        bankShort: "EI",
        product: "Ijara Finance",
        rate: "EIBOR+1.8%",
        type: "ISLAMIC",
        maxLTV: "75%",
        term: "25 yrs",
        isBest: false,
      },
      {
        bank: "Ajman Bank",
        bankShort: "AB",
        product: "Diminishing Musharaka",
        rate: "3.99%",
        type: "ISLAMIC",
        maxLTV: "75%",
        term: "20 yrs",
        isBest: false,
      },
    ],
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Ahmed Al Maktoum",
      rating: 5,
      comment:
        "H&S Real Estate made the mortgage process incredibly smooth. Their expert guidance helped me secure the best rate, and the zero broker fee was a huge bonus. Highly recommended!",
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "As a first-time buyer, I was overwhelmed by the mortgage process. The team at H&S walked me through every step and found me a perfect solution. Thank you!",
    },
    {
      name: "Mohammed Hassan",
      rating: 5,
      comment:
        "Fast approval, competitive rates, and excellent service. The mortgage advisors at H&S are truly professionals who care about their clients.",
    },
  ];

  // Calculate borrowing capacity
  const calculateBorrowing = () => {
    const income = parseFloat(borrowFormData.monthlyIncome) || 0;
    const commitments = parseFloat(borrowFormData.monthlyCommitments) || 0;
    const propertyValue = parseFloat(borrowFormData.propertyValue) || 0;

    if (!income || !borrowFormData.buyerStatus) return null;

    // Get LTV from buyer status
    const ltvMatch = borrowFormData.buyerStatus.match(/(\d+)%/);
    let ltv = ltvMatch ? parseFloat(ltvMatch[1]) / 100 : 0.8;
    // Handle edge case where LTV is 0 (treat as 80%)
    if (ltv === 0) ltv = 0.8;

    // Calculate available income (50% rule - max 50% of income can go to debt)
    const maxMonthlyDebt = income * 0.5;
    const availableForMortgage = maxMonthlyDebt - commitments;

    if (availableForMortgage <= 0) return 0;

    // Estimate annual borrowing capacity (simplified calculation)
    // Assuming average interest rate of 4% and 25-year term
    const annualIncome = income * 12;
    const estimatedBorrowing = Math.min(
      annualIncome * 7, // Up to 7x annual salary
      propertyValue * ltv // Or property value * LTV
    );

    return Math.round(estimatedBorrowing);
  };

  // Handle step 1: Calculate borrowing capacity
  const handleBorrowCalculate = (e) => {
    e.preventDefault();
    const borrowing = calculateBorrowing();
    if (borrowing !== null) {
      setEstimatedBorrowing(borrowing);
      setBorrowStep(2); // Move to step 2
    }
  };

  // Handle step 2: Submit with contact info
  const handleBorrowSubmit = async (e) => {
    e.preventDefault();
    setBorrowLoading(true);

    try {
      const response = await axios.post("/api/mortage-approval", {
        ...borrowFormData,
        ...borrowContactData,
        source: "Borrowing Capacity Calculator",
        estimatedBorrowing: estimatedBorrowing,
        createdAt: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      });

      if (response?.data?.success) {
        setBorrowSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setBorrowLoading(false);
    }
  };

  // Handle phone number change
  const handleBorrowPhoneChange = (value) => {
    setBorrowContactData({
      ...borrowContactData,
      phoneNumber: value,
    });
  };

  return (
    <div className="overflow-hidden">
      {/* <HomeHeroHeading
        image="/Bg-Imgs/mortgage-bg.jpg"
        title="Mortgage Broker Dubai"
      /> */}

      <PremiumPageHero
        image="/Bg-Imgs/mortgage-bg.jpg"
        imageAlt="H&S Real Estate Mortgages"
        eyebrow="RERA Certified · 25+ Years Experience · 35+ Bank Partners"
        titleBefore="Dubai's Trusted Mortgage Brokers at Your Service"
        tagline="Your mortgage journey starts here."
        description="We compare rates from 35+ UAE banks and lenders to secure the most competitive mortgage solution tailored to your income, goals, and timeline. Free advice, no hidden fees."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "mortgages", href: null },
        ]}
        stats={[
          { value: "AED 4B+", label: "Mortgages Arranged" },
          { value: "35+", label: "Bank Partners" },
          { value: "2.5%", label: "Rates From" },
          { value: "24hrs", label: "Pre-Approval" },
        ]}
      />

      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto pt-12 md:pt-16 pb-6 md:pb-10 px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-medium text-black font-custom text-center">
            Find the Perfect Mortgage Solution for You
          </h2>
        </div>
      </Fade>

      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 font-custom flex flex-col gap-4 pb-8">
          <p className="text-gray-600 text-base md:text-lg tracking-wider">
            At H&S Real Estate, we are committed to making the journey of home
            buying an exciting and stress-free experience. Our mortgage broker
            Dubai team offers tailored solutions and expert guidance to help you
            secure the most competitive mortgage options. Whether you&apos;re a
            first-time buyer or a seasoned investor, our mortgage advisors in
            Dubai and expert mortgage brokers ensure that your needs are met
            every step of the way.
          </p>
          <p className="text-gray-600 text-base md:text-lg tracking-wider">
            We provide comprehensive support, including personalized mortgage
            advice Dubai to help you make informed decisions. With our team of
            mortgage consultants in Dubai, achieving the best mortgage solution
            in Dubai has never been easier.
          </p>
        </div>
      </Fade>

      {/* Calculator Section - Keep as is */}
      <div className="max-w-screen-2xl mx-auto font-custom2 bg-[#F5F5F7] p-4 md:p-6 rounded-lg shadow-lg my-6 md:my-10">
        <h2 className="text-3xl font-bold text-black font-custom text-center mb-6">
          UAE Mortgage Calculator
        </h2>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black font-custom">
            Calculate Your Monthly Payments
          </h2>
          <p className="text-gray-600 tracking-wider">
            Use our UAE mortgage calculator to explore financing options that
            suit your needs. By entering details such as the property price,
            deposit amount, and mortgage period, you&apos;ll get an instant
            estimate of your monthly payments. This tool, combined with the
            expertise of our mortgage brokers in UAE, empowers you to plan your
            budget confidently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 md:my-10">
          {/* Sidebar */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 font-custom">
              Adjust Your Preferences
            </h2>
            <div className="space-y-6">
              {/* Property Price */}
              <div className="space-y-2">
                <div className="text-lg font-semibold font-custom">Property Price</div>
                <input
                  type="range"
                  min="200000"
                  max="50000000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-600 rounded-lg cursor-pointer appearance-none"
                />
                <div className="flex justify-between text-sm">
                  <span>200,000 AED</span>
                  <span>50,000,000 AED</span>
                </div>
                <input
                  type="text"
                  value={propertyPrice.toLocaleString()}
                  className="w-full p-2 border rounded-md font-custom"
                  readOnly
                />
              </div>

              {/* Deposit */}
              <div className="space-y-2">
                <div className="text-lg font-semibold font-custom">Deposit</div>
                <div className="relative">
                  <input
                    type="range"
                    min={propertyPrice * 0.1}
                    max={propertyPrice * 0.2}
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-600 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex justify-between text-sm">
                    <div>{(propertyPrice * 0.1).toLocaleString()} AED</div>
                    <div>{(propertyPrice * 0.2).toLocaleString()} AED</div>
                  </div>
                </div>
                <input
                  type="text"
                  value={deposit.toLocaleString()}
                  className="w-full p-2 border rounded-md font-custom"
                  readOnly
                />
              </div>

              {/* Mortgage Period */}
              <div className="space-y-2">
                <div className="text-lg font-semibold font-custom">Mortgage Period</div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={mortgagePeriod}
                    onChange={(e) => setMortgagePeriod(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-600 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex justify-between text-sm">
                    <div>1 Year</div>
                    <div>25 Years</div>
                  </div>
                </div>
                <input
                  type="text"
                  value={mortgagePeriod}
                  className="w-full p-2 border rounded-md font-custom"
                  readOnly
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="text-lg font-semibold font-custom">Interest Rate</div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-gray-200 to-gray-600 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex justify-between text-sm">
                    <div>1%</div>
                    <div>10%</div>
                  </div>
                </div>
                <input
                  type="text"
                  value={`${interestRate}%`}
                  className="w-full p-2 border rounded-md font-custom"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col justify-evenly">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center font-custom">
              Your Mortgage Summary
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-lg font-semibold font-custom">Monthly Payment</div>
                <div className="text-4xl font-bold text-black font-custom">
                  AED {Math.round(monthlyPayment)}
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="text-sm font-custom">
                  Total Purchase Costs:{" "}
                  <span className="font-semibold">
                    AED {totalPurchaseCosts.toLocaleString()} + Fees
                  </span>
                </div>
                <div className="text-sm font-custom">
                  Total Required Upfront:{" "}
                  <span className="font-semibold">
                    AED {totalRequiredUpfront.toLocaleString()} + Fees
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-4 font-custom">
                  Our mortgage specialists are here to assist you. Get in touch
                  to secure the best rates.
                </p>
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-black text-white font-semibold py-2 px-6 rounded-full font-custom hover:bg-gray-800 transition-colors"
                >
                  Get Pre-Approved
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expert Guidance. Zero Broker Fee. Section */}
      <Fade bottom duration={1500}>
        <div className="bg-white py-12 md:py-16">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black font-custom text-center mb-2">
              Expert Guidance. Zero Broker Fee.
            </h2>
            <p className="text-gray-600 text-center mb-8 md:mb-12 font-custom">
              Get your mortgage journey started with us. We have the best products and solutions for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expertGuidanceCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col justify-center items-center"
                  >
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                      <Icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2 font-custom">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 font-custom">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Fade>

      {/* Find the Right Mortgage for You Section */}
      <Fade bottom duration={1500}>
        <div className="bg-white py-12 md:py-16">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black font-custom text-center mb-2">
              Find the Right Mortgage for You
            </h2>
            <p className="text-gray-600 text-center mb-8 md:mb-12 font-custom">
              We provide comprehensive mortgage solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mortgageTypeCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                  >
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                      <Icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2 font-custom">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 font-custom mb-4">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Fade>

      {/* Your Mortgage Journey in 5 Simple Steps - Step Style */}
      <Fade bottom duration={1500}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16 md:py-24">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-black font-custom mb-3 tracking-tight">
              Your Mortgage Journey in 5 Simple Steps
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-custom max-w-xl mx-auto">
              From consultation to completion, we guide you every step of the way.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">

            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-gray-200 z-0" />

            {journeySteps.map((step, index) => (
              <div key={index} className="relative z-10 group">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 p-6 h-full flex flex-col">

                  {/* Step badge + number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold font-custom">{step.step}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-custom">
                      Step {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-black font-custom mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-custom leading-relaxed flex-1">
                    {step.description}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={() => setShowPopup(true)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black font-custom group-hover:gap-2.5 transition-all duration-200"
                  >
                    Get Started
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fade>

      {/* UAE Mortgage Rates Table Section with Tabs */}
      <Fade bottom duration={1500}>
        <div className="bg-black py-12 md:py-16">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-8 bg-gray-400"></div>
                  <span className="text-gray-400 text-sm uppercase tracking-wider font-custom">CURRENT RATES</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-custom mb-2">
                  UAE Mortgage Rates
                </h2>
                <p className="text-gray-300 font-custom italic">
                  Indicative 2026
                </p>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors font-custom mt-4 md:mt-0"
              >
                GET BEST RATE FOR YOU
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-gray-700">
              {["UAE Residents", "Non-Residents", "Islamic Finance"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveRateTab(tab)}
                  className={`px-6 py-3 font-custom transition-colors ${activeRateTab === tab
                    ? "bg-white text-black border-b-2 border-white"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Rates Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-gray-300 uppercase text-sm font-custom">BANK / LENDER</th>
                    <th className="px-6 py-4 text-center text-gray-300 uppercase text-sm font-custom">RATE (P.A.)</th>
                    <th className="px-6 py-4 text-center text-gray-300 uppercase text-sm font-custom">TYPE</th>
                    <th className="px-6 py-4 text-center text-gray-300 uppercase text-sm font-custom">MAX LTV</th>
                    <th className="px-6 py-4 text-center text-gray-300 uppercase text-sm font-custom">TERM</th>
                  </tr>
                </thead>
                <tbody>
                  {mortgageRatesData[activeRateTab]?.map((rate, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 border border-gray-700 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold font-custom">{rate.bankShort}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold font-custom">{rate.bank}</span>
                              {rate.isBest && (
                                <span className="bg-white text-black text-xs px-2 py-1 rounded font-bold font-custom">
                                  BEST
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm font-custom">{rate.product}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-white font-bold text-lg font-custom">{rate.rate}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded text-xs font-bold font-custom ${rate.type === "FIXED"
                            ? "bg-green-600 text-white"
                            : rate.type === "VARIABLE"
                              ? "bg-white text-black"
                              : "bg-gray-700 text-white"
                            }`}
                        >
                          {rate.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-white font-custom">{rate.maxLTV}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-white font-custom">{rate.term}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <p className="text-gray-400 text-xs mt-6 font-custom">
              *Rates are indicative and subject to change based on individual credit assessment. Actual rates depend on your financial profile, property type, and lender criteria. Contact H&S for live personalized quotes.
            </p>
          </div>
        </div>
      </Fade>

      {/* How Much Can You Borrow? Section */}
      <Fade bottom duration={1500}>
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black font-custom mb-4">
                How Much Can You Borrow?
              </h2>
              <p className="text-gray-600 mb-8 font-custom">
                There are some key factors that determine how much you can borrow.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMoneyBillWave className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1 font-custom">Your Income</h3>
                    <p className="text-gray-600 font-custom">Banks typically lend up to 7x your annual salary</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHome className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1 font-custom">Property Value</h3>
                    <p className="text-gray-600 font-custom">Maximum loan-to-value ratio varies by property type</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1 font-custom">Debt-to-Income Ratio</h3>
                    <p className="text-gray-600 font-custom">Your total monthly debt should not exceed 50% of income</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <FaFileAlt className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1 font-custom">Credit History</h3>
                    <p className="text-gray-600 font-custom">A good credit score improves your borrowing capacity</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-2 font-custom">Quick Eligibility Check</h3>
              <p className="text-gray-600 mb-6 font-custom">
                Get an instant estimate of your borrowing power  no credit check, no commitment.
              </p>

              {/* Step Indicators */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-custom font-bold ${borrowStep >= 1 ? "bg-black text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                    1
                  </div>
                  <div className={`w-16 md:w-24 h-1 mx-2 ${borrowStep >= 2 ? "bg-black" : "bg-gray-300"
                    }`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-custom font-bold ${borrowStep >= 2 ? "bg-black text-white" : "bg-gray-300 text-gray-600"
                    }`}>
                    2
                  </div>
                </div>
              </div>

              {borrowSuccess ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-5xl text-black mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-2 font-custom">
                    Thank You!
                  </h3>
                  {estimatedBorrowing !== null && (
                    <div className="bg-gray-100 p-6 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 mb-2 font-custom">Estimated Borrowing Capacity</p>
                      <p className="text-3xl font-bold text-black font-custom">
                        AED {estimatedBorrowing.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <p className="text-gray-600 font-custom">
                    We&apos;ve received your inquiry and will get back to you shortly with your borrowing capacity assessment.
                  </p>
                </div>
              ) : borrowStep === 1 ? (
                // Step 1: Calculation Form
                <form onSubmit={handleBorrowCalculate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2 font-custom">
                      Monthly Gross Income (AED)
                    </label>
                    <input
                      type="number"
                      required
                      value={borrowFormData.monthlyIncome}
                      onChange={(e) =>
                        setBorrowFormData({
                          ...borrowFormData,
                          monthlyIncome: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                      placeholder="e.g. 25,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2 font-custom">
                      Existing Monthly Commitments (AED)
                    </label>
                    <input
                      type="number"
                      required
                      value={borrowFormData.monthlyCommitments}
                      onChange={(e) =>
                        setBorrowFormData({
                          ...borrowFormData,
                          monthlyCommitments: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                      placeholder="e.g. 3,000 (car loans, etc.)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2 font-custom">
                      Buyer Status
                    </label>
                    <select
                      required
                      value={borrowFormData.buyerStatus}
                      onChange={(e) =>
                        setBorrowFormData({
                          ...borrowFormData,
                          buyerStatus: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom bg-white"
                    >
                      <option value="">Select Buyer Status</option>
                      <option value="UAE Resident/Expat (00% LTV)">UAE Resident/Expat (00% LTV)</option>
                      <option value="UAE Resident/Expat (80% LTV)">UAE Resident/Expat (80% LTV)</option>
                      <option value="Non-Resident (60% LTV)">Non-Resident (60% LTV)</option>
                      <option value="UAE National (85% LTV)">UAE National (85% LTV)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2 font-custom">
                      Approximate Property Value (AED)
                    </label>
                    <input
                      type="number"
                      required
                      value={borrowFormData.propertyValue}
                      onChange={(e) =>
                        setBorrowFormData({
                          ...borrowFormData,
                          propertyValue: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                      placeholder="e.g. 2,500,000"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-custom"
                  >
                    <span>Calculate My Borrowing Capacity</span>
                    <FaArrowRight />
                  </button>
                </form>
              ) : (
                // Step 2: Contact Information Form
                <div>
                  {estimatedBorrowing !== null && (
                    <div className="bg-gray-100 p-6 rounded-lg mb-6">
                      <p className="text-sm text-gray-600 mb-2 font-custom">Your Estimated Borrowing Capacity</p>
                      <p className="text-3xl font-bold text-black font-custom">
                        AED {estimatedBorrowing.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <form onSubmit={handleBorrowSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 font-custom">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={borrowContactData.fullName}
                        onChange={(e) =>
                          setBorrowContactData({
                            ...borrowContactData,
                            fullName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 font-custom">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={borrowContactData.email}
                        onChange={(e) =>
                          setBorrowContactData({
                            ...borrowContactData,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors font-custom"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 font-custom">
                        Phone Number
                      </label>
                      <CountrySelect
                        styling="border border-gray-300 rounded-lg"
                        flags={flags}
                        labels={en}
                        value={borrowContactData.country}
                        onChange={(value) =>
                          setBorrowContactData({
                            ...borrowContactData,
                            country: value,
                          })
                        }
                        onPhoneChange={handleBorrowPhoneChange}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setBorrowStep(1)}
                        className="flex-1 bg-gray-200 text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-custom"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={borrowLoading}
                        className="flex-1 bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-custom"
                      >
                        {borrowLoading ? (
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
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fade>

      {/* Testimonials Section */}
      <Fade bottom duration={1500}>
        <div className="bg-[#F5F5F7] py-12 md:py-16">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black font-custom text-center mb-8 md:mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating
                          ? "text-black"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 font-custom italic">
                    &quot;{testimonial.comment}&quot;
                  </p>
                  <p className="text-black font-semibold font-custom">
                    - {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>

      {/* Latest Off-Plan Launches */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 pt-10">
        <Fade left duration={1500}>
          <h2 className="text-black text-2xl md:text-4xl capitalize mb-4 md:mb-10 font-custom">
            latest off-plan launches
          </h2>
        </Fade>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 pb-16 md:pb-36">
        <Slider {...settings} className="custom-slider">
          {offPlanListings.map((property, index) => (
            <PropertyCard
              key={index}
              image={property.coverPhoto?.url}
              title={property.title}
              id={property.slug}
              price={property.price}
              location={property.location}
              purpose="off-plan"
            />
          ))}
        </Slider>
      </div>

      {/* FAQ Section - Moved to Bottom */}
      <FAQSectionAll faqItems={faqItems} />

      {/* Mortgage Popup */}
      {showPopup && (
        <MortgagePopUp
          image="/Bg-Imgs/mortgage-bg.jpg"
          details={{
            propertyPrice,
            deposit,
            mortgagePeriod,
            interestRate,
            loanAmount,
            monthlyPayment,
            totalPurchaseCosts,
            totalRequiredUpfront,
          }}
          setShow={setShowPopup}
        />
      )}
      <Footer />
    </div>
  );
};

export default MortgagesPage;
