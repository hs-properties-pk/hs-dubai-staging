import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";

const PLACEHOLDER = "/placeholder-property.jpg";

const BookPropertyPopUp = ({ image, propertyUrl, setShow }) => {
  const imageSrc =
    image && String(image).trim() ? String(image).trim() : PLACEHOLDER;
  // const [showPopup, setShowPopup] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("AE");
  const source = "Book a Viewing";
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
      const response = await axios.post("/api/send-submission-book-viewing", {
        ...formData,
        source,
        propertyUrl,
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-5 backdrop-filter backdrop-blur-sm opacity-900 blur-xs font-custom2 duration-300 ">
      <div className="bg-white relative rounded-lg shadow-lg flex flex-col  mx-6 bounce-in w-[23rem]">
        <div className="w-full hidden md:block">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={imageSrc}
            alt="H&S Residence"
            className="w-full h-52 object-cover rounded-t-lg  saturate-150"
            unoptimized
            loading="lazy"
          />
        </div>

        <div className="w-full p-4 ">
          <div className="bg-white p-1 absolute top-2 right-2 rounded-full">
            <svg
              className="w-5 h-5  text-black cursor-pointer hover:scale-125 duration-300"
              onClick={() => setShow(false)}
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
          <h2 className="text-xl font-bold mb-2 text-center">
            Register Your Interest
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-2 ">
              <label
                className="block text-sm font-semibold mb-1 "
                htmlFor="phoneNumber"
              >
                Phone Number
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
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mx-auto rounded-xl text-xs uppercase leading-6 text-white border-2 tracking-widest hover:bg-gray-800 duration-300 transition ease-in-out bg-black py-2 px-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" aria-hidden />
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-400">
                I agree to share my data with H&S Real Estate Dubai, and allow
                H&S Real Estate Dubai or its affiliates to collect, control or
                process my data in accordance with their privacy policy and
                process the same for communication purposes. Should I wish to
                unsubscribe, I will send an email to{" "}
                <a
                  href="mailto:info@hsproperty.ae"
                  className=" font-bold text-gray-800"
                >
                  info@hsproperty.ae
                </a>
              </p>
            </div>
            {success && (
              <h1 className="w-full text-black uppercase text-sm font-extrabold  mt-4 text-center tracking-wider">
                Thank You!
              </h1>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookPropertyPopUp;
