"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en";
import CountrySelect from "./CountrySelect";

const getTimestamp = () =>
  new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function BrandEnquiryModal({
  brandName,
  onClose,
  subheading,
  /** Notion "Page" column — e.g. `/brands` or `/brands/emaar` */
  notionPage = "/brands",
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("AE");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    createdAt: getTimestamp(),
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((p) => ({ ...p, phoneNumber: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName?.trim() || !formData.email?.trim() || !formData.phoneNumber?.trim()) {
      setError("Please add your name, email, and phone number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/send-submission-contact", {
        firstName: formData.firstName.trim(),
        lastName: (formData.lastName || "").trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        country,
        inquiryType: "Off Plan",
        subject: `Brand enquiry: ${brandName}`,
        message:
          (formData.message || "").trim() ||
          `I would like to know more about ${brandName} projects in Dubai.`,
        createdAt: formData.createdAt,
        source: "Brands — developer enquiry",
        notionPage,
      });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not send your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 font-custom2 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-enquiry-title"
    >
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-black"
          aria-label="Close"
        >
          <IoClose className="h-6 w-6" />
        </button>
        <h2
          id="brand-enquiry-title"
          className="mb-1 font-custom text-xl text-neutral-900 md:text-2xl"
        >
          Enquire about {brandName}
        </h2>
        <p className="mb-6 text-sm text-neutral-600">
          {subheading ||
            "Leave your details and our team will get back to you about off-plan projects by this developer."}
        </p>
        {success ? (
          <p className="font-medium text-green-700">
            Thank you — we have received your enquiry and will contact you
            shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name *"
                className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                autoComplete="given-name"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                autoComplete="family-name"
              />
            </div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              autoComplete="email"
            />
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600">
                Phone *
              </label>
              <CountrySelect
                styling="rounded-md border border-neutral-300 bg-white px-1 focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                flags={flags}
                labels={en}
                value={country}
                onChange={setCountry}
                onPhoneChange={handlePhoneChange}
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message (optional)"
              rows={3}
              className="resize-none rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-black py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {loading && <FaSpinner className="h-4 w-4 animate-spin" />}
              Submit enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
