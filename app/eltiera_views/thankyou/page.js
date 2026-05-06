import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome, FaWater } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Eltiera Views | HS Property",
  description:
    "Thank you for your inquiry about Eltiera Views. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function EltieraViewsThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <div className="max-w-xl w-full bg-white backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-slate-200">
        <div className="bg-sky-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaWater className="text-5xl text-sky-600" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Your inquiry regarding Eltiera Views by Ellington Properties has been successfully
          submitted. A property specialist will contact you within 24 hours
          with more information about our luxury waterfront apartments at Jumeirah Islands.
        </p>

        <div className="space-y-4">
          <Link
            href="/eltiera_views"
            className="inline-flex items-center justify-center px-8 py-4 bg-sky-600 text-white rounded-full font-bold shadow-xl hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to Eltiera Views Page
          </Link>
          
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-full font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 group"
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





