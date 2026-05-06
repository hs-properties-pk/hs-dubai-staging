import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome, FaSeedling } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Farm Gardens | HS Property",
  description:
    "Thank you for your inquiry about Farm Gardens at The Valley. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function FarmGardensThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF0E6] text-[#2F4F4F] p-6">
      <div className="max-w-xl w-full bg-white backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-[#8B4513]/20">
        <div className="bg-[#8B4513]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaSeedling className="text-5xl text-[#8B4513]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-[#2F4F4F] mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-[#556B2F] mb-8 leading-relaxed">
          Your inquiry regarding Farm Gardens at The Valley has been successfully
          submitted. A property specialist will contact you within 24 hours
          with more information about our luxury farm-inspired villas.
        </p>

        <div className="space-y-4">
          <Link
            href="/farm-garden-valley"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#8B4513] text-white rounded-full font-bold shadow-xl hover:bg-[#A0522D] transition-all duration-300 transform hover:scale-105 group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to Farm Gardens Page
          </Link>
          
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#8B4513]/30 text-[#556B2F] rounded-full font-semibold hover:bg-[#FAF0E6] hover:border-[#8B4513] transition-all duration-300 group"
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


