"use client";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";

const GermanKontaktForm = () => {
  const [country, setCountry] = useState("AE");
  const source = "German Contact";
  // const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const timestamp = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
    investmentType: [],
    investmentAmount: [],
    propertyType: [],
    bedroomCount: [],
    currentlyInDubai: "",
    dubaiResident: "",
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
      const response = await axios.post("/api/send-german-submission-contact", {
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
    setLoading(true);

    try {
      const response = await sendEmail();

      if (response) {
        setLoading(false);
        // setSuccess(true);
        setShowPopup(true);
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          message: "",
          investmentType: [],
          investmentAmount: [],
          propertyType: [],
          bedroomCount: [],
          currentlyInDubai: "",
          dubaiResident: "",
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
          <label className="block font-semibold mb-1">Vollständiger Name</label>
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
          <label className="block font-semibold mb-1" htmlFor="phone-number">
            Telefonnummer (WhatsApp bevorzugt)
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
          <label className="block font-semibold mb-1">E-Mail-Adresse</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border-b border-gray-400 focus:outline-none"
            placeholder="example@site.com"
          />
        </div>

        {/* <div>
          <label className="block mb-1">Nationalität</label>
          <input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            type="text"
            className="w-full border-b border-gray-400 focus:outline-none"
            placeholder="United Arab Emirates"
          />
        </div> */}

        <div>
          <label className="block font-semibold mb-1">
            Anmerkungen oder Wünsche{" "}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none"
            placeholder="Comment"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Art der Investition?
          </label>
          <div className="space-y-1 flex flex-col justify-center">
            {[
              "Eigennutzung",
              "Kapitalanlage",
              "Bezugsfertig",
              "Off-Plan (Neubauprojekt)",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="investmentType"
                  value={item}
                  onChange={handleChange}
                  className="mr-2"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-2">
            Geplante Investitionssumme:
          </label>
          <div className="space-y-1 flex flex-col justify-center">
            {[
              "unter 300.000 €",
              "300.000 – 600.000 €",
              "600.000 – 1 Mio. €",
              "über 1 Mio. €",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="investmentAmount"
                  value={item}
                  onChange={handleChange}
                  className="mr-2"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-2">Art der Immobilie:</label>
          <div className="space-y-1 flex flex-col justify-center">
            {["Apartment", "Villa / Haus", "Penthouse", "Gewerbeimmobilie"].map(
              (item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    name="propertyType"
                    value={item}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {item}
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Anzahl der Schlafzimmer
          </label>
          <div className="space-y-1 flex flex-col justify-center">
            {[
              "Studio",
              "1 Schlafzimmer",
              "2 Schlafzimmer",
              "3 Schlafzimmer",
              "4 Schlafzimmer",
              "5+ Schlafzimmer",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
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

        <div>
          <label className="block font-semibold mb-2">
            Befinden Sie sich derzeit in Dubai?
          </label>
          <div className="space-y-1 flex flex-col justify-center">
            {["Ja", "Nein"].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="currentlyInDubai"
                  value={item}
                  onChange={handleChange}
                  className="mr-2"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Haben Sie ein UAE Residence Visa?
          </label>
          <div className="space-y-1 flex flex-col justify-center">
            {[
              "Ja, ich habe United Arab Emirates Residence Visa",
              "Nein, ich habe kein United Arab Emirates Residence Visa",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="dubaiResident"
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

export default GermanKontaktForm;
