"use client";
import React, { useState } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";
import { LuPhone, LuMapPin } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineYoutube } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
const HSGermanFooter = () => {
  const source = "Newsletter";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const scrollToSection = (id, offset = 130) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendEmail();
      if (response) {
        setLoading(false);
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
      } else {
        setLoading(false);
        console.error(
          "Form submission failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
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
  return (
    <>
      <div className="bg-gray-50 font-custom2">
        <div className="relative">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/footer-img.jpg"
            alt="H&S Towers"
            className="w-full h-[45rem] object-cover md:object-fill"
            loading="lazy"
          />
          <div className="bg-black text-white flex justify-between items-center max-w-screen-2xl mx-auto p-4 md:p-8 gap-2 2xl:rounded-xl absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-full">
            <div className=" md:px-4 flex flex-col justify-center gap-3">
              <h2 className="text-lg md:text-2xl font-semibold">
                Haben Sie Fragen? Wir sind hier, um zu helfen
              </h2>
              <p>
                Wir sind bereit, Ihre Fragen zu beantworten. Lassen Sie sich bei
                jedem Schritt von unseren Experten begleiten.
              </p>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-white text-black hover:bg-gray-200 duration-300 py-3 px-6 rounded-lg tracking-wider"
            >
              Kontakt
            </button>
          </div>
        </div>

        <footer className="bg-[#F8F8F8] pt-32 pb-12 max-w-screen-2xl mx-auto px-6">
          <div className="container mx-auto md:px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div>
              <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
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
                    href="tel:+971566890515"
                    className="footer-contact-office-address tracking-wider"
                  >
                    +971 56 689 0515
                  </Link>
                </div>
                <div className="flex gap-3 text-gray-600 hover:text-black duration-300 items-center ml-[2px]">
                  <FaRegEnvelope className="text-xl md:text-xl" />
                  <Link
                    href="mailto:max.dewald@hsproperties.ae"
                    className="footer-contact-office-address tracking-wider"
                  >
                    max.dewald@hsproperties.ae
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Quicklinks</h3>
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
                    href="/careers"
                    className="text-gray-600 hover:text-black duration-300"
                  >
                    careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quicklinks</h3>
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
              </ul>
            </div>
            <div className="flex flex-col  gap-4">
              <div className="flex flex-col justify-center ">
                <h3 className="text-xl font-semibold mb-4">
                  Vernetzen Sie sich mit uns
                </h3>
                <div className="flex  gap-4 items-center ">
                  <Link
                    href="https://www.facebook.com/hs.realestate.german/"
                    target="_blank"
                    className="inline-flex items-center justify-center h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300 rounded-full mr-1 "
                  >
                    <RiFacebookFill size="1.6em" fill="white" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/hs_realestate_german/"
                    target="_blank"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full mr-"
                  >
                    <FaInstagram size="1.5em" fill="white" />
                  </Link>

                  {/* <Link
                    href="https://www.youtube.com/@HSRealEstate"
                    target="_blank"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full "
                  >
                    <AiOutlineYoutube size="1.7em" fill="white" />
                  </Link> */}
                  <Link
                    href="https://wa.me/971566890515?text=Hello!"
                    target="_blank"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full mr-1 "
                  >
                    <FaWhatsapp size="1.5em" fill="white" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/h-s-properties/"
                    target="_blank"
                    className="inline-flex items-center justify-center  h-12 w-12 border bg-[#6E6E73] hover:bg-black duration-300  rounded-full "
                  >
                    <FaLinkedinIn size="1.4em" fill="white" />
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
                    className="border border-black py-2 px-4 rounded-lg"
                  />
                  <button className="bg-black hover:bg-gray-800 duration-300 text-white py-2 px-4  w-max self-end rounded-lg">
                    {loading ? "Abonnieren..." : "Abonnieren"}
                  </button>
                </form>
                {success && (
                  <h1 className="w-full text-black uppercase text-base font-extrabold  mt-4 text-center tracking-wider ">
                    Danke schön!
                  </h1>
                )}
              </div>
            </div>
          </div>
        </footer>
        <div className="bg-white px-4 py-5 font-custom2">
          <div className="container mx-auto text-center text-base  text-black flex flex-col items-center gap-2 tracking-widest">
            <div className="flex items-center gap-2">
              <Link
                href="/terms-and-conditions"
                className=" border-r-2 border-gray-600 pr-2"
              >
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
            <p>Copyright © 2025 H&S Property, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HSGermanFooter;
