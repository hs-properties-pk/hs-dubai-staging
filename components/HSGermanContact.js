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
} from "react-icons/fa6";
import { LuMapPin, LuPhone } from "react-icons/lu";
import { RiFacebookFill } from "react-icons/ri";
import Fade from "react-reveal/Fade";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";

const HSGermanContact = () => {
  const source = "H&S German Contact";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const timestamp = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
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
      const response = await axios.post("/api/send-submission-contact", {
        ...formData,
        source,
      });
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

  const [country, setCountry] = useState("AE");

  return (
    <div className=" max-w-screen-2xl mx-auto font-custom2">
      <div className="flex flex-wrap md:h-[40rem] pb-20">
        <div className="w-full md:w-5/12 bg-[#F5F5F7] md:bg-white  text-white px-4 md:p-6 rounded-lg">
          <Fade left duration={1500}>
            <div className="bg-black flex flex-col justify-around h-full rounded-t-md md:rounded-md p-10">
              <div className="flex flex-col gap-4 items-center md:items-start">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl  font-custom ">
                    Kontaktinformationen
                  </h2>
                  <p className="mb-8 text-[#C9C9C9]">
                    Sagen Sie etwas, um einen Live-Chat zu starten!
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center md:items-start gap-6">
                  <div className="flex flex-col md:flex-row gap-5 hover:text-primary items-center ml-[2px]">
                    <LuPhone className="text-3xl md:text-xl" />
                    <Link
                      href="tel:+971566890515"
                      className="footer-contact-office-address tracking-wider"
                    >
                      +971 56 689 0515
                    </Link>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5 hover:text-primary items-center ml-[2px]">
                    <FaRegEnvelope className="text-3xl md:text-xl" />
                    <Link
                      href="mailto:max.dewald@hsproperties.ae"
                      className="footer-contact-office-address tracking-wider"
                    >
                      max.dewald@hsproperties.ae
                    </Link>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5  items-center hover:text-primary text-center md:text-start">
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

              <div className="flex  gap-4 items-center justify-center md:justify-start mt-12 md:mt-0">
                <Link
                  href="https://www.facebook.com/hs.realestate.german/"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 w-10 border border-white rounded-full mr-1 "
                >
                  <RiFacebookFill size="1.3em" fill="white" />
                </Link>
                <Link
                  href="https://www.instagram.com/hs_realestate_german/"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 w-10 border border-white  rounded-full mr-"
                >
                  <FaInstagram size="1.2em" fill="white" />
                </Link>

                {/* <Link
                  href="https://www.youtube.com/@HSRealEstate"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 w-10 border border-white  rounded-full "
                >
                  <AiOutlineYoutube size="1.4em" fill="white" />
                </Link> */}
                <Link
                  href="https://wa.me/971566890515?text=Hello!"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 w-10 border border-white  rounded-full mr-1 "
                >
                  <FaWhatsapp size="1.2em" fill="white" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/h-s-properties/"
                  target="_blank"
                  className="inline-flex items-center justify-center h-10 w-10 border border-white  rounded-full "
                >
                  <FaLinkedinIn size="1.1em" fill="white" />
                </Link>
              </div>
            </div>
          </Fade>
        </div>

        <div className="w-full md:w-7/12 bg-[#F5F5F7] md:bg-white px-4 md:p-10 rounded-lg ">
          <Fade right duration={1500}>
            <form
              onSubmit={handleSubmit}
              className="w-full h-full flex flex-col justify-center bg-white p-4"
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="first-name"
                  >
                    Vorname
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700  border-black border-b  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-300"
                    id="firstName"
                    name="firstName"
                    required
                    onChange={handleChange}
                    type="text"
                    placeholder="John"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="last-name"
                  >
                    Nachname
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700  border-black border-b  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-300"
                    id="lastName"
                    name="lastName"
                    required
                    onChange={handleChange}
                    type="text"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    E-Mail
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700  border-black border-b  py-3 px-4 leading-tight focus:outline-none  focus:border-gray-300"
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    type="email"
                    placeholder="example@example.com"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="phone-number"
                  >
                    Telefonnummer
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
                    htmlFor="subject"
                  >
                    Wählen Sie Betreff aus
                  </label>
                  <div className="items-center gap-6 grid grid-cols-2 md:grid-cols-4">
                    <div className="flex items-center ">
                      <input
                        type="radio"
                        id="subject"
                        name="subject"
                        required
                        onChange={handleChange}
                        value="General Inquiry"
                        className="mr-2"
                      />
                      <label
                        htmlFor="general-inquiry"
                        className="text-gray-700"
                      >
                        Allgemeine Anfrage
                      </label>
                    </div>
                    <div className="flex items-center ">
                      <input
                        id="subject"
                        name="subject"
                        required
                        onChange={handleChange}
                        type="radio"
                        value="Feedback"
                        className="mr-2"
                      />
                      <label htmlFor="feedback" className="text-gray-700">
                        Rückmeldung
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="subject"
                        name="subject"
                        required
                        onChange={handleChange}
                        type="radio"
                        value="Appointments"
                        className="mr-2"
                      />
                      <label htmlFor="appointments" className="text-gray-700">
                        Termine
                      </label>
                    </div>
                    <div className="flex items-center ">
                      <input
                        id="subject"
                        name="subject"
                        required
                        onChange={handleChange}
                        type="radio"
                        value="Other"
                        className="mr-2"
                      />
                      <label htmlFor="other" className="text-gray-700">
                        Andere
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                    htmlFor="message"
                  >
                    Nachricht
                  </label>
                  <textarea
                    className="appearance-none block w-full  text-gray-700   py-3 px-4 leading-tight focus:outline-none "
                    id="message"
                    name="message"
                    required
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write your message..."
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  className="bg-black rounded-lg hover:bg-gray-800 duration-300 text-white font-bold py-3 px-6  focus:outline-none focus:shadow-outline w-full md:w-max"
                  type="submit"
                >
                  {loading ? "Einreichen..." : "Einreichen"}
                </button>
              </div>
              {success && (
                <h1 className="w-full text-black uppercase text-lg font-extrabold  mt-4 text-center tracking-wider">
                  Danke schön!
                </h1>
              )}
            </form>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default HSGermanContact;
