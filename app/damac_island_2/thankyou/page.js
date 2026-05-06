import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome, FaWater } from "react-icons/fa";

export const metadata = {
  title: "Thank You - DAMAC Island 2 | HS Property",
  description:
    "Thank you for your inquiry about DAMAC Island 2. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function DamacIslandTwoThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">
      <div className="max-w-xl w-full bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-cyan-400/30">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FaWater className="text-5xl text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Your inquiry regarding DAMAC Island 2 has been successfully
          submitted. A property specialist will contact you within 24 hours
          with more information about our luxury waterfront residences at Dubai Islands.
        </p>

        <div className="space-y-4">
          <Link
            href="/damac_island_2"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to DAMAC Island 2 Page
          </Link>
          
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-cyan-400/50 text-gray-300 rounded-full font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 group"
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

