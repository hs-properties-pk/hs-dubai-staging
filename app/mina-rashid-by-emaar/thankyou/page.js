import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Mina Rashid by Emaar | HS Property",
  description:
    "Thank you for your inquiry about Mina Rashid by Emaar. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function MinaRashidThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 text-white p-6">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-white/20">
        <div className="bg-cyan-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-cyan-400">
          <FaCheckCircle className="text-6xl text-cyan-400" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-white/90 mb-8 leading-relaxed">
          Your inquiry regarding Mina Rashid by Emaar has been successfully
          submitted. A property specialist will contact you within 24 hours
          with more information about waterfront properties at Mina Rashid Marina.
        </p>

        <div className="space-y-4">
          <Link
            href="/mina-rashid-by-emaar"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to Mina Rashid Page
          </Link>
          
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300 group"
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
