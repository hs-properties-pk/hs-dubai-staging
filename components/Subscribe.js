import axios from "axios";
import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa6";

const Subscribe = () => {
  const source = "Subscribe";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const getTimestamp = () =>
    new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const [formData, setFormData] = useState({
    email: "",
    createdAt: getTimestamp(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      await axios.post("/api/send-submission-subscribe-newsletter", {
        ...formData,
        source,
      });

      setLoading(false);
      setSuccess(true);

      // Reset form
      setFormData({
        email: "",
        createdAt: getTimestamp(),
      });
    } catch (error) {
      setLoading(false);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      setSubmitError(message);
      console.error("Newsletter subscription failed:", error.response?.status, message);
    }
  };

  return (
    <div className="relative bg-gray-100 pt-14 pb-20 md:py-32 font-custom2">
      <div
        className="absolute inset-0 bg-fill  "
        style={{ backgroundImage: `url("/subscribe-bg.png")` }}
      ></div>

      <div className="relative max-w-screen-2xl mx-auto px-4 ">
        <h2 className="text-3xl md:text-6xl  text-black font-custom">
          Subscribe to <br className="hidden md:inline-block" /> Our Newsletter
        </h2>

        <p className="mt-4 text-base md:text-lg text-[#858585]">
          Sign up to our newsletter to get dynamic insights into the Real Estate
          market in the UAE and beyond
        </p>

        <div className="mt-8 flex ">
          <form
            onSubmit={handleSubmit}
            className="flex items-center border border-gray-300   max-w-lg w-full bg-white shadow-lg relative rounded-lg"
          >
            <span className="px-4 py-3">
              <FaRegEnvelope size="1.2em" />
            </span>

            <input
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="youremail123@gmail.com"
              className="w-full py-3 px-4 text-gray-700 focus:outline-none rounded-lg"
            />

            <button className="bg-black hover:bg-gray-800 duration-300 text-white px-6 md:px-8 py-3 md:py-4  text-sm  uppercase tracking-widest rounded-lg absolute -bottom-9 -right-2 md:-bottom-6 md:-right-6">
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
        {submitError && (
          <p className="w-full text-red-600 text-sm mt-4 tracking-wider">
            {submitError}
          </p>
        )}
        {success && (
          <h1 className="w-full text-black uppercase text-lg font-extrabold  mt-4 tracking-wider">
            Thank You for Subscribing!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
