"use client";

import { useState } from "react";

export default function ChinaLps() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vchat: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Get honeypot field value from form
      const websiteValue = e.target.website?.value || "";
      const response = await fetch("/api/send-china-lps-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          website: websiteValue, // Honeypot field - should always be empty for legitimate users
          createdAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Form submitted successfully! We will contact you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          vchat: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Failed to submit form. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header className="bg-gradient-to-br from-gray-800 to-gray-900 text-white text-center py-24 text-3xl">
        <div className="w-4/5 mx-auto max-w-6xl">
          <h1 className="font-bold text-4xl mb-4">
            Welcome to H&S Real Estate
          </h1>
          <p className="text-xl">Your gateway to exclusive Dubai properties</p>
        </div>
      </header>

      <section className="py-16">
        <div className="w-4/5 mx-auto max-w-6xl">
          <h2 className="font-bold text-3xl mb-4">
            Official Dubai Real Estate
          </h2>
          <p className="text-lg mb-6">
            Certified by the Dubai Land Department and endorsed by global
            leaders such as Emaar, DAMAC, Nakheel, and Meraas.
          </p>
          <p className="text-lg mb-6">
            H&S Real Estate works with premier developers, ensuring that our
            clients have access to the most exclusive, high-quality real estate
            in Dubai. Whether you&lsquo;re looking for investment opportunities
            or your dream home, we provide a trusted and seamless experience
            every step of the way.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="w-4/5 mx-auto max-w-6xl">
          <h2 className="font-bold text-3xl mb-6">Get in Touch with Us</h2>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <label htmlFor="name" className="font-bold text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="p-4 text-base rounded border border-gray-300 my-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <label htmlFor="email" className="font-bold text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="p-4 text-base rounded border border-gray-300 my-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <label htmlFor="phone" className="font-bold text-base">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Your Phone"
              className="p-4 text-base rounded border border-gray-300 my-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <label htmlFor="vchat" className="font-bold text-base">
              vChat (WeChat)
            </label>
            <input
              type="text"
              id="vchat"
              name="vchat"
              value={formData.vchat}
              onChange={handleChange}
              placeholder="Your WeChat ID"
              className="p-4 text-base rounded border border-gray-300 my-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`p-4 text-lg rounded border-none transition-colors ${
                isSubmitting
                  ? "bg-yellow-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              } text-white`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-gray-900 text-white text-center py-16">
        <div className="w-4/5 mx-auto max-w-6xl">
          <h2 className="font-bold text-3xl mb-4">Enter Our Raffle!</h2>
          <p className="text-lg mb-6">
            Scan the QR code below to participate in our raffle and win a chance
            to visit Dubai. It’s as easy as scanning and entering your details!
          </p>
          <div className="mb-8">
            <img
              src="/vChat.png"
              alt="vChat (WeChat) QR Code"
              className="max-w-xs mx-auto rounded"
            />
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-5">
        <div className="w-4/5 mx-auto max-w-6xl">
          <p className="m-0 text-sm">
            &copy; 2025 H&S Real Estate. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
