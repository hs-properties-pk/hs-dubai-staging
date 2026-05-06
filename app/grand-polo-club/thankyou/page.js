import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Grand Polo Club & Resort | HS Property",
  description:
    "Thank you for your inquiry about Grand Polo Club & Resort. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function GrandPoloClubThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 p-6">
      <div className="max-w-xl w-full bg-slate-900 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-slate-700">
        <div className="bg-amber-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-6xl text-amber-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Thank You!
        </h1>

        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
          Your inquiry regarding Grand Polo Club & Resort by Emaar has been successfully
          submitted. A property specialist will contact you within 24 hours with
          more information about our luxury equestrian-themed community.
        </p>

        <div className="space-y-4">
          <Link
            href="/grand-polo-club"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-white rounded-lg font-bold shadow-xl hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to Grand Polo Club & Resort Page
          </Link>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-800 hover:border-slate-500 transition-all duration-300 group"
            >
              <FaHome className="mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>

      <MetaPixel
        pixelId={process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID}
      />
    </div>
  );
}

