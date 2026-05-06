// app/MontivaVidaLanding.js
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LandingPageGallery from "@/components/LandingPageGallery";
import CountrySelect from "@/components/CountrySelect";
import MetaPixel from "@/components/MetaPixel";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaSwimmingPool,
  FaDumbbell,
  FaLaptop,
  FaShoppingBag,
  FaTree,
  FaFire,
  FaUsers,
  FaHome,
  FaShieldAlt,
  FaHeart,
  FaChild,
  FaSeedling,
  FaMapMarker,
  FaBuilding,
  FaCreditCard,
  FaChartLine,
  FaPassport,
  FaWifi,
} from "react-icons/fa";

const unitTypes = [
  {
    name: "Studio Apartments",
    tag: "Compact luxury for modern living",
    image: "/montiva_by_vida/13.webp",
    perks: [
      "Efficient layouts ideal for singles or investors",
      "Smart home technology integration",
      "VIDA-branded interiors with premium finishes",
      "Perfect investment in Dubai Creek Harbour",
    ],
  },
  {
    name: "1-Bedroom Apartments",
    tag: "Smart, nature-framed living",
    image: "/montiva_by_vida/12.webp",
    perks: [
      "Bright, efficient layouts ideal for singles or couples",
      "Floor-to-ceiling glazing with park & Creek views*",
      "VIDA-branded interiors with soft, earthy tones",
      "Spacious balconies with waterfront vistas",
    ],
  },
  {
    name: "2-Bedroom Apartments",
    tag: "Balanced home for modern families",
    image: "/montiva_by_vida/3.webp",
    perks: [
      "Open-plan living & dining with generous balcony*",
      "Space for work-from-home corner or reading nook",
      "Framed vistas over lush Green Gate District landscapes*",
      "Great for families seeking comfort & connectivity",
    ],
  },
  {
    name: "3-Bedroom Apartments",
    tag: "Spacious luxury for growing families",
    image: "/montiva_by_vida/2.webp",
    perks: [
      "Expansive layouts with separate living & sleeping zones",
      "Views that capture parks, green links & golf glimpses*",
      "Room for kids' room, guest suite or creative studio",
      "Ideal for families who value wellness and green space",
    ],
  },
];

const stepsTotal = 5;

// FAQ Data
const faqData = [
  {
    question: "What is the expected completion date for Montiva by Vida?",
    answer:
      "Montiva by Vida is scheduled for completion in September 2029. The project is currently in the off-plan phase, offering excellent investment opportunities with flexible payment plans.",
  },
  {
    question: "What types of apartments are available at Montiva by Vida?",
    answer:
      "Montiva by Vida offers a range of luxury apartments including Studio, 1-Bedroom, 2-Bedroom, and 3-Bedroom configurations. Each unit features smart home technology and premium VIDA-branded finishes.",
  },
  {
    question: "Where is Montiva by Vida located?",
    answer:
      "The project is situated in the Green Gate District of Dubai Creek Harbour, a prime waterfront development offering stunning views of the creek, parks, and Dubai's iconic skyline.",
  },
  {
    question: "What amenities are available to residents?",
    answer:
      "Residents will enjoy world-class amenities including an infinity pool, fitness center, co-working spaces, sky gardens, barbecue areas, smart home features, 24/7 security, wellness facilities, and landscaped gardens.",
  },
  {
    question: "What payment plans are available?",
    answer:
      "Montiva by Vida offers attractive payment plans tailored for investors. These include flexible installment options with a minimal down payment and construction-linked payment schedules. Contact us for detailed payment plan options.",
  },
  {
    question: "Is Montiva by Vida eligible for Golden Visa?",
    answer:
      "Yes, properties in Montiva by Vida qualify for the UAE Golden Visa program, offering long-term residency benefits to investors and their families.",
  },
  {
    question: "What is the starting price for apartments?",
    answer:
      "Apartments at Montiva by Vida start from AED 1.9 million. The exact pricing varies based on the unit type, size, and location within the development.",
  },
  {
    question: "Who is the developer of Montiva by Vida?",
    answer:
      "Montiva by Vida is developed by Emaar Properties, one of the most trusted and renowned real estate developers in Dubai, known for delivering high-quality projects like Burj Khalifa and Dubai Mall.",
  },
  {
    question: "What makes Dubai Creek Harbour a good investment?",
    answer:
      "Dubai Creek Harbour is a master-planned community with exceptional growth potential. It features future metro connectivity, proximity to key landmarks, extensive green spaces, and world-class infrastructure, making it a prime investment location.",
  },
  {
    question: "Are there any maintenance fees?",
    answer:
      "Like all premium developments in Dubai, Montiva by Vida will have annual service charges for maintenance of common areas and amenities. These fees cover security, cleaning, landscaping, and maintenance of shared facilities.",
  },
];

// Amenities data with icons
const amenities = [
  { name: "Infinity Pool", icon: FaSwimmingPool },
  { name: "Fitness Center", icon: FaDumbbell },
  { name: "Co-working Spaces", icon: FaLaptop },
  { name: "Retail Outlets", icon: FaShoppingBag },
  { name: "Sky Gardens", icon: FaTree },
  { name: "Barbecue Areas", icon: FaFire },
  { name: "Community Lounge", icon: FaUsers },
  { name: "Smart Home Features", icon: FaHome },
  { name: "24/7 Security", icon: FaShieldAlt },
  { name: "Wellness Facilities", icon: FaHeart },
  { name: "Children's Play Area", icon: FaChild },
  { name: "Landscaped Gardens", icon: FaSeedling },
];

// Investment benefits with icons
const investmentBenefits = [
  {
    title: "Prime Location",
    description:
      "Dubai Creek Harbour is one of the most sought-after waterfront communities",
    icon: FaMapMarker,
  },
  {
    title: "Emaar Brand Value",
    description: "Backed by Dubai's most trusted real estate developer",
    icon: FaBuilding,
  },
  {
    title: "Flexible Payment Plans",
    description: "Attractive payment options tailored for investors",
    icon: FaCreditCard,
  },
  {
    title: "High ROI Potential",
    description: "Strong capital appreciation in premium location",
    icon: FaChartLine,
  },
  {
    title: "Golden Visa Eligibility",
    description: "Qualify for UAE's long-term residency program",
    icon: FaPassport,
  },
  {
    title: "Smart Technology",
    description: "Future-ready homes with advanced smart features",
    icon: FaWifi,
  },
];

// Gallery images for Montiva Vida
const galleryImages = [
  {
    src: "/montiva_by_vida/1.webp",
    width: 800,
    height: 600,
    alt: "Montiva by Vida exterior architecture with modern design",
  },
  {
    src: "/montiva_by_vida/2.webp",
    width: 800,
    height: 600,
    alt: "Luxury living room with panoramic Dubai Creek views",
  },
  {
    src: "/montiva_by_vida/3.webp",
    width: 800,
    height: 600,
    alt: "Modern kitchen with premium VIDA-branded finishes",
  },
  {
    src: "/montiva_by_vida/4.webp",
    width: 800,
    height: 600,
    alt: "Infinity pool and wellness area overlooking Dubai Creek",
  },
  {
    src: "/montiva_by_vida/5.webp",
    width: 800,
    height: 600,
    alt: "Bedroom with floor-to-ceiling windows and park views",
  },
  {
    src: "/montiva_by_vida/6.webp",
    width: 800,
    height: 600,
    alt: "Fitness center with state-of-the-art equipment",
  },
  {
    src: "/montiva_by_vida/7.webp",
    width: 800,
    height: 600,
    alt: "Sky gardens and outdoor relaxation areas",
  },
  {
    src: "/montiva_by_vida/8.webp",
    width: 800,
    height: 600,
    alt: "VIDA-branded lobby and concierge services",
  },
  {
    src: "/montiva_by_vida/9.webp",
    width: 800,
    height: 600,
    alt: "Co-working spaces with modern amenities",
  },
  {
    src: "/montiva_by_vida/10.webp",
    width: 800,
    height: 600,
    alt: "Children's play area and family amenities",
  },
  {
    src: "/montiva_by_vida/11.webp",
    width: 800,
    height: 600,
    alt: "Smart home technology integration throughout",
  },
  {
    src: "/montiva_by_vida/12.webp",
    width: 800,
    height: 600,
    alt: "Landscaped gardens and outdoor BBQ areas",
  },
  {
    src: "/montiva_by_vida/13.webp",
    width: 800,
    height: 600,
    alt: "Landscaped gardens and outdoor BBQ areas",
  },
];

// FAQ Item Component
const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#e0d7c9] last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-6 text-left hover:text-[#3b6d57] transition-colors duration-300"
        onClick={onClick}
      >
        <span className="font-semibold text-[#252822] pr-4">
          {faq.question}
        </span>
        <span className="text-[#3b6d57] flex-shrink-0 ml-4">
          {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p className="text-[#5f6157] leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MontivaVidaLanding({ pixelId }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "AE",
    unitType: "",
    message: "",
  });

  const progress = ((step + 1) / stepsTotal) * 100;

  const validateStep = (currentStep) => {
    const errors = {};
    if (currentStep === 0 && !formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (currentStep === 1 && !formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      currentStep === 1 &&
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (currentStep === 2 && !formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (currentStep === 3 && !formData.unitType.trim()) {
      errors.unitType = "Please select a unit type";
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
      setIsSubmitting(true);
      try {
        // Get honeypot field value
        const websiteValue = honeypotRef.current?.value || "";
        const res = await fetch("/api/send-montiva-vida-submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            unitType: formData.unitType,
            message: formData.message,
            website: websiteValue, // Honeypot field - should always be empty for legitimate users
            createdAt: new Date().toISOString(),
            source: "Montiva by Vida - Dubai Creek Harbour",
          }),
        });

        if (res.ok) {
          // Redirect to thank you page after successful submission
          router.push("/montiva_by_vida/thankyou");
        } else {
          // Handle error response
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
    if (step > 0) setStep((s) => s - 1);
  };

  const openForm = () => {
    setIsFormOpen(true);
    setSubmitted(false);
    setStep(0);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#f5f1ea] text-[#2e302a] overflow-x-hidden">
      {/* Soft background shapes */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#d7ecdd]/60 blur-3xl" />
        <div className="absolute top-40 right-0 h-80 w-80 rounded-full bg-[#c9e6f3]/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#9ac3d8]/30 blur-3xl" />
      </div>

      {/* HERO SECTION WITH IMAGE */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 sm:px-10 lg:px-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/montiva_by_vida/1.webp"
            alt="Montiva by Vida Dubai Creek Harbour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center gap-8 text-white">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#d7ecdd]"
          >
            Montiva by Vida • Dubai Creek Harbour
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
          >
            Beyond ordinary,
            <span className="block bg-gradient-to-r from-[#d7ecdd] via-[#9ac3d8] to-[#cfa884] bg-clip-text text-transparent">
              inspired by nature.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl text-sm sm:text-base leading-relaxed text-gray-200"
          >
            Montiva by Vida rises within the lush Green Gate District at Dubai
            Creek Harbour – a vertical sanctuary woven into gardens, parkland
            and future metro connectivity. Luxury branded residences by Emaar
            featuring smart home technology and wellness-focused design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm"
          >
            <Tag>Studio, 1-3 BR Residences</Tag>
            <Tag>Smart Home Technology</Tag>
            <Tag>Infinity Pool & Deck</Tag>
            <Tag>Green Gate Park & Central Park</Tag>
            <Tag>Starting from AED 1.9M</Tag>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex gap-4 mt-4"
          >
            <button
              onClick={openForm}
              className="rounded-full bg-[#3b6d57] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#2f5443] transition-colors"
            >
              Get Pricing & Floorplans
            </button>
            <button
              onClick={openForm}
              className="rounded-full border border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#3b6d57] transition-colors"
            >
              Book Viewing
            </button>
          </motion.div>
        </div>
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="px-6 py-16 sm:px-10 lg:px-24 bg-white/50">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-[#252822]">
                Montiva by Vida Dubai Creek Harbour Overview
              </h2>
              <p className="text-[#5f6157] leading-relaxed">
                Montiva by Vida is a luxury residential project located in the
                heart of Dubai Creek Harbour. This prime waterfront development
                by Emaar Properties introduces modern living spaces featuring
                branded residences under the renowned Vida by Emaar brand.
              </p>
              <p className="text-[#5f6157] leading-relaxed">
                The project focuses on wellness-led design and nature-inspired
                living while offering modern luxury. It represents a striking
                addition to Dubai&apos;s skyline and is part of the broader
                vision for Dubai Creek Harbour, a waterfront enclave offering
                stunning views and eco-friendly living.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-semibold text-[#3b6d57]">
                    Property Types
                  </h3>
                  <p className="text-sm text-[#5f6157]">
                    Studio, 1, 2 & 3 Bedroom
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3b6d57]">Location</h3>
                  <p className="text-sm text-[#5f6157]">Dubai Creek Harbour</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3b6d57]">Brand</h3>
                  <p className="text-sm text-[#5f6157]">Vida by Emaar</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3b6d57]">Status</h3>
                  <p className="text-sm text-[#5f6157]">Off-Plan</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://a.storyblok.com/f/209096/1923x1300/93f3a88144/montiva-by-vida.jpg"
                alt="Montiva by Vida Dubai Creek Harbour"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* APARTMENT TYPES WITH IMAGES */}
      <section
        id="residences"
        className="px-6 py-16 sm:px-10 lg:px-24 bg-[#f0ebe2]"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#252822] mb-4">
              Montiva by Vida Apartment Types
            </h2>
            <p className="text-[#5f6157] max-w-2xl mx-auto">
              Discover a variety of living spaces designed to cater to different
              lifestyles and needs, each featuring smart home technology and
              luxury finishes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {unitTypes.map((unit, index) => (
              <motion.div
                key={unit.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#d7cfc1] hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={unit.image}
                    alt={unit.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#3b6d57] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {unit.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#3b6d57] text-sm mb-4 font-medium">
                    {unit.tag}
                  </p>
                  <ul className="space-y-3 text-sm text-[#5f6157]">
                    {unit.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3b6d57] flex-shrink-0" />
                        <span className="leading-relaxed">{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openForm}
                    className="w-full mt-6 py-3 text-sm font-semibold text-[#3b6d57] border-2 border-[#3b6d57] rounded-lg hover:bg-[#3b6d57] hover:text-white transition-all duration-300"
                  >
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES WITH ICONS */}
      <section className="px-6 py-16 sm:px-10 lg:px-24 bg-white/50">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#252822] text-center mb-12">
              Luxury Amenities at Montiva by Vida
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {amenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <motion.div
                    key={amenity.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-[#e0d7c9] hover:shadow-md transition-shadow group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-[#3b6d57] rounded-lg flex items-center justify-center group-hover:bg-[#2f5443] transition-colors">
                      <IconComponent className="text-white text-lg" />
                    </div>
                    <span className="text-[#5f6157] font-medium">
                      {amenity.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <LandingPageGallery
        images={galleryImages}
        title="Montiva by Vida Gallery"
        description="Experience the luxury of nature-inspired living at Dubai Creek Harbour"
        className="bg-[#f0ebe2]"
      />

      {/* LOCATION & CONNECTIVITY */}
      <section className="px-6 py-16 sm:px-10 lg:px-24 bg-[#f0ebe2]">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-semibold text-[#252822] mb-6">
                Prime Location & Excellent Connectivity
              </h2>

              <div className="space-y-4">
                <LocationItem
                  place="Dubai Creek Harbour"
                  description="Prime waterfront development with stunning views"
                />
                <LocationItem
                  place="Burj Khalifa & Dubai Mall"
                  description="Easy access to world-class shopping and entertainment"
                />
                <LocationItem
                  place="Dubai International Airport (DXB)"
                  description="Convenient travel connections"
                />
                <LocationItem
                  place="Future Metro Connectivity"
                  description="Upcoming Blue Line Metro access"
                />
                <LocationItem
                  place="Ras Al Khor Wildlife Sanctuary"
                  description="Close to natural attractions and green spaces"
                />
              </div>
            </div>

            <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
              <Image
                src="/montiva_by_vida/4.webp"
                alt="Dubai Creek Harbour Location"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* INVESTMENT BENEFITS WITH ICONS */}
      <section className="px-6 py-16 sm:px-10 lg:px-24 bg-white/50">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#252822] text-center mb-12">
              Why Invest in Montiva by Vida?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {investmentBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-[#e0d7c9] text-center hover:shadow-xl transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-[#3b6d57] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2f5443] transition-colors">
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <h3 className="font-semibold text-[#252822] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-[#5f6157] text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 py-16 sm:px-10 lg:px-24 bg-[#f0ebe2]">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#252822] text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#5f6157] text-center mb-12 max-w-2xl mx-auto">
              Find answers to the most common questions about Montiva by Vida.
              Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-[#d7cfc1] overflow-hidden p-6">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-[#5f6157] mb-4">
                Still have questions? We&apos;re here to help.
              </p>
              <button
                onClick={openForm}
                className="rounded-full bg-[#3b6d57] px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#2f5443] transition-colors"
              >
                Contact Our Sales Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-16 sm:px-10 lg:px-24 bg-gradient-to-r from-[#1c6d82] to-[#3b6d57] text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Invest in Montiva by Vida?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us today for detailed pricing, floor plans, and exclusive
              payment plans. Secure your luxury apartment in Dubai Creek
              Harbour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openForm}
                className="bg-white text-[#3b6d57] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Complete Details
              </button>
              <button
                onClick={openForm}
                className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#3b6d57] transition-colors"
              >
                Schedule Viewing
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ENHANCED FORM POPUP */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              className="bg-white rounded-2xl w-[90vw] md:w-[50vw] h-[70vh] overflow-visible border border-[#d7cfc1] shadow-2xl flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side - Image */}
              <div className="hidden md:block w-80 relative overflow-hidden h-full">
                <Image
                  src="/montiva_by_vida/form.png"
                  alt="Montiva by VIDA"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-[#3b6d57]/30 shadow-lg">
                    <h4 className="text-lg font-bold text-[#252822] mb-3">
                      Montiva by VIDA
                    </h4>
                    <div className="space-y-2 text-[#5f6157] text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#3b6d57] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Studio, 1-3 BR Residences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#3b6d57] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Smart Home Technology</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#3b6d57] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Green Gate District</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#3b6d57] flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Sep 2029 Completion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form Content */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto h-full relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-[#252822]">
                    Montiva by Vida Inquiry
                  </h3>
                  <button
                    onClick={closeForm}
                    className="text-[#7a7c70] hover:text-[#252822] transition-colors p-1"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <div className="h-2 bg-[#e0d7c9] rounded-full">
                    <div
                      className="h-full bg-[#3b6d57] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-[#7a7c70] mt-2 text-center">
                    Step {step + 1} of {stepsTotal}
                  </p>
                </div>

                {/* Honeypot field - hidden from users */}
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
                      {step === 0 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#252822]">
                            What is your full name?
                          </h4>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                            className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                              formErrors.name
                                ? "border-red-500"
                                : "border-[#d7cfc1] focus:border-[#3b6d57]"
                            }`}
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-sm mt-2">
                              {formErrors.name}
                            </p>
                          )}
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#252822]">
                            What is your email address?
                          </h4>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="Enter your email address"
                            className={`w-full p-3 border rounded-lg focus:outline-none transition-colors ${
                              formErrors.email
                                ? "border-red-500"
                                : "border-[#d7cfc1] focus:border-[#3b6d57]"
                            }`}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-2">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#252822]">
                            What is your phone number?
                          </h4>
                          <CountrySelect
                            styling={`w-full rounded-lg border-2 transition-all bg-white px-4 py-3 ${
                              formErrors.phone
                                ? "border-red-500 focus-within:border-red-600"
                                : "border-[#d7cfc1] focus-within:border-[#3b6d57]"
                            }`}
                            labels={en}
                            flags={flags}
                            value={formData.country}
                            onChange={(country) => {
                              updateField("country", country);
                              if (formErrors.phone) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  phone: "",
                                }));
                              }
                            }}
                            onPhoneChange={(phone) => {
                              updateField("phone", phone);
                              if (formErrors.phone) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  phone: "",
                                }));
                              }
                            }}
                          />
                          {formErrors.phone && (
                            <p className="text-red-500 text-sm mt-2">
                              {formErrors.phone}
                            </p>
                          )}
                          <p className="text-xs text-[#7a7c70] mt-2">
                            We&apos;ll contact you on this number
                          </p>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#252822]">
                            Which apartment type interests you?
                          </h4>
                          <div className="space-y-2">
                            {unitTypes.map((unit) => (
                              <button
                                key={unit.name}
                                onClick={() => {
                                  updateField("unitType", unit.name);
                                  if (formErrors.unitType) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      unitType: "",
                                    }));
                                  }
                                }}
                                className={`w-full p-3 text-left rounded-lg border transition-all ${
                                  formData.unitType === unit.name
                                    ? "border-[#3b6d57] bg-[#3b6d57]/10 text-[#3b6d57]"
                                    : "border-[#d7cfc1] hover:border-[#3b6d57] text-[#5f6157]"
                                }`}
                              >
                                {unit.name}
                              </button>
                            ))}
                          </div>
                          {formErrors.unitType && (
                            <p className="text-red-500 text-sm mt-2">
                              {formErrors.unitType}
                            </p>
                          )}
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h4 className="text-lg font-medium mb-4 text-[#252822]">
                            Any specific requirements or questions?
                          </h4>
                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              updateField("message", e.target.value)
                            }
                            placeholder="Tell us about your preferences, timeline, or any questions..."
                            rows={4}
                            className="w-full p-3 border border-[#d7cfc1] rounded-lg focus:border-[#3b6d57] focus:outline-none resize-none transition-colors"
                          />
                        </div>
                      )}

                      {formErrors.submit && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                          {formErrors.submit}
                        </p>
                      )}
                      <div className="flex justify-between pt-4">
                        {step > 0 && (
                          <button
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 border border-[#d7cfc1] text-[#5f6157] rounded-lg hover:bg-[#f5f1ea] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          disabled={isSubmitting}
                          className="ml-auto px-6 py-2.5 bg-[#3b6d57] text-white rounded-lg hover:bg-[#2f5443] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold mb-2 text-[#252822]">
                        Thank You, {formData.name}!
                      </h4>
                      <p className="text-[#5f6157]">
                        We&apos;ve received your inquiry and will contact you
                        within 24 hours with more information about Montiva by
                        Vida.
                      </p>
                      <button
                        onClick={closeForm}
                        className="mt-6 px-6 py-2.5 border border-[#3b6d57] text-[#3b6d57] rounded-lg hover:bg-[#3b6d57] hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CTA */}
      <button
        onClick={openForm}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#3b6d57] px-6 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-[#2f5443] transition-colors"
      >
        Enquire Now
      </button>

      {/* STANDARD FOOTER */}
      <footer className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-6 text-slate-800">Contact</h3>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaEnvelope className="text-[#3b6d57]" />
                  <a
                    href="mailto:info@hsproperty.ae"
                    className="hover:text-[#3b6d57] transition-colors duration-300"
                  >
                    info@hsproperty.ae
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaPhone className="text-[#3b6d57]" />
                  <a
                    href="tel:+971043454888"
                    className="hover:text-[#3b6d57] transition-colors duration-300"
                  >
                    +971 (0) 4 345 4888
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaMapMarkerAlt className="text-[#3b6d57]" />
                  <a
                    target="_blank"
                    href="https://maps.app.goo.gl/dQ6Tv5dBQQKkq1dP6"
                    className="text-center md:text-left hover:text-[#3b6d57] transition-colors duration-300"
                  >
                    Grey Square, Showroom 2, Umm Suqeim Road, Al Barsha 2
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-6 text-slate-800">
                Follow Us
              </h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://www.facebook.com/hspropertyrealestate"
                  target="_blank"
                  className="w-12 h-12 border border-slate-300 rounded-full flex items-center justify-center hover:bg-[#3b6d57] hover:border-[#3b6d57] transition-colors text-slate-600 hover:text-white"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hs_property/"
                  target="_blank"
                  className="w-12 h-12 border border-slate-300 rounded-full flex items-center justify-center hover:bg-[#3b6d57] hover:border-[#3b6d57] transition-colors text-slate-600 hover:text-white"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="w-12 h-12 border border-slate-300 rounded-full flex items-center justify-center hover:bg-[#3b6d57] hover:border-[#3b6d57] transition-colors text-slate-600 hover:text-white"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=971043454888&text=Hello%21&type=phone_number&app_absent=0"
                  target="_blank"
                  className="w-12 h-12 border border-slate-300 rounded-full flex items-center justify-center hover:bg-[#3b6d57] hover:border-[#3b6d57] transition-colors text-slate-600 hover:text-white"
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 text-center text-slate-500">
            <p>&copy; 2024 H&S Property. All rights reserved.</p>
            <p className="text-sm mt-2">
              Premium Real Estate Developments in Dubai
            </p>
          </div>
        </div>
      </footer>
      
      <MetaPixel pixelId={pixelId} />
    </main>
  );
}

// COMPONENTS
function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm px-3 py-1 text-xs text-white">
      <span className="mr-1.5 h-1 w-1 rounded-full bg-white" />
      <span>{children}</span>
    </span>
  );
}

function HighlightStat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-200 mt-1">{label}</div>
    </div>
  );
}

function LocationItem({ place, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-5 w-5 rounded-full bg-[#3b6d57] flex items-center justify-center flex-shrink-0 mt-0.5">
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </div>
      <div>
        <div className="font-medium text-[#252822]">{place}</div>
        <div className="text-sm text-[#5f6157]">{description}</div>
      </div>
    </div>
  );
}
