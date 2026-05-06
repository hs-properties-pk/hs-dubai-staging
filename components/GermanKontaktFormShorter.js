"use client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";

const GermanKontaktFormShorter = () => {
  const [country, setCountry] = useState("AE");
  const source = "Shorter German Contact";
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const timestamp = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    // nationality: "",
    // message: "",
    // propertyType: [],
    bedroomCount: [],
    // investmentType: [],
    // currentlyInDubai: "",
    // dubaiResident: "",
    createdAt: timestamp,
    source: source,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const current = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...current, value]
            : current.filter((v) => v !== value),
        };
      });
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
        "/api/send-german-submission-shorter-contact",
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
    setLoading(true);

    try {
      // Send email and await the response
      const response = await sendEmail();

      if (response) {
        setLoading(false);
        // setSuccess(true);
        setShowPopup(true);

        // Reset the form fields
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          //   nationality: "",
          //   message: "",
          //   propertyType: [],
          bedroomCount: [],
          //   investmentType: [],
          //   currentlyInDubai: "",
          //   dubaiResident: "",
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
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="bg-black text-white py-6 text-center gap-4 flex flex-col justify-center items-center">
        <Link href="/german" className="flex justify-center items-center">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src="/logos-icons/H&S-RealEstate-Logo-White.png"
            alt="logo"
            className="object-contain w-32"
            loading="lazy"
          />
        </Link>
        <h1 className="text-base tracking-widest">
          UNVERBINDLICHE BERATUNG ANFORDERN
        </h1>
      </div>

      <form
        className="max-w-screen-xl mx-auto p-4 md:p-8 space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-1">Vollständiger Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border-b border-gray-400 focus:outline-none"
            placeholder="Paul Smith"
          />
        </div>

        <div>
          <label className="block mb-1">E-Mail</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border-b border-gray-400 focus:outline-none"
            placeholder="example@site.com"
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="phone-number">
            Telefon
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
        <div>
          <label className="block font-semibold mb-2">
            Ich interessiere mich für:
          </label>
          <div className="space-y-1 flex flex-col justify-center">
            {[
              "Off-Plan (Neubauprojekt)",
              "Bezugsfertiges Apartment",
              "Beides - Ich möchte vergleichen",
              "Dubai Immobilien allgemein",
            ].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="bedroomCount"
                  value={item}
                  onChange={handleChange}
                  className="mr-2"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            {loading ? "Absenden..." : "Absenden"}
          </button>
          {/* {success && (
            <h1 className="w-full text-black uppercase text-lg font-extrabold  mt-4 text-center tracking-wider">
              Danke schön!
            </h1>
          )} */}
          <p className="text-xs text-gray-500 mt-4">
            Durch Klicken auf den Button stimmen Sie der Verarbeitung
            personenbezogener Daten zu und akzeptieren unsere
            Datenschutzerklärung.
          </p>
        </div>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-5 backdrop-filter backdrop-blur-sm opacity-900 blur-xs font-custom2 duration-300 ">
          <div className="bg-white relative rounded-lg shadow-lg flex flex-col  mx-6 bounce-in w-[23rem]">
            <div className="w-full p-4 ">
              <div className="bg-white p-1 absolute top-2 right-2 rounded-full">
                <svg
                  className="w-5 h-5  text-black cursor-pointer hover:scale-125 duration-300"
                  onClick={() => setShowPopup(false)}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center items-center mt-6">
                <h2 className="text-2xl font-bold mb-2"> Vielen Dank</h2>
                <p className="mb-6 text-gray-700">
                  Daten erfolgreich übermittelt
                </p>
                <Link
                  href="/german"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Fertig
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GermanKontaktFormShorter;
