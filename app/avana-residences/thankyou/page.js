import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Avana Residences | HS Property",
  description:
    "Thank you for your inquiry about Avana Residences. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function AvanaResidencesThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#186169] to-teal-900 text-white p-6">
      <div className="max-w-xl w-full bg-white text-slate-900 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-slate-200">
        <div className="bg-[#186169]/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-6xl text-[#186169]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-custom">
          Thank You!
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 leading-relaxed font-custom2">
          Your inquiry regarding Avana Residences has been successfully
          submitted. A property specialist will contact you within 24 hours
          with more information about premium residences in Jumeirah Village Circle.
        </p>

        <div className="space-y-4">
          <Link
            href="/avana-residences"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#186169] text-white rounded-lg font-bold shadow-xl hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 group font-custom2"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to Avana Residences Page
          </Link>
          
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 group font-custom2"
            >
              <FaHome className="mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
      
      <MetaPixel pixelId={process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
    </div>
  );
}
