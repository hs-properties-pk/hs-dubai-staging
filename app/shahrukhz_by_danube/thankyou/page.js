import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome, FaCrown } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Shahrukhz by Danube | HS Property",
  description:
    "Thank you for your inquiry about Shahrukhz by Danube Tower. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function ShahrukhzThankYouPage() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="max-w-xl w-full bg-gradient-to-br from-zinc-900 to-black backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-[#d4af37]/30">
        <div className="bg-gradient-to-br from-[#d4af37] to-[#f4d03f] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <FaCrown className="text-5xl text-black" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Your inquiry regarding Shahrukhz by Danube Tower has been successfully
          submitted. A property specialist will contact you within 24 hours
          with more information about this luxury 55-storey development in Al Sufouh.
        </p>

        <div className="space-y-4">
          <Link
            href="/shahrukhz_by_danube"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black rounded-full font-bold shadow-xl hover:from-[#f4d03f] hover:to-[#d4af37] transition-all duration-300 transform hover:scale-105 group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Return to Shahrukhz Tower Page
          </Link>
          
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#d4af37]/50 text-gray-300 rounded-full font-semibold hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300 group"
            >
              <FaHome className="mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
      
      <MetaPixel pixelId={pixelId} />
    </div>
  );
}





