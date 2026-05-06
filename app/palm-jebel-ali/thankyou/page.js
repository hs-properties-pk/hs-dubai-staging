// app/palm-jebel-ali/thankyou/page.js
import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft } from "react-icons/fa";

export const metadata = {
  title: "Thank You - Palm Jebel Ali Villas by Nakheel | HS Property",
  description:
    "Thank you for your inquiry about Palm Jebel Ali villas. Our property specialist will contact you shortly.",
  robots: "noindex, nofollow",
};

export default function PalmJebelAliThankYouPage() {
  const pixelId = process.env.FB_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EAF1F8] text-[#0F2748] p-6">
      <div className="max-w-xl w-full bg-white/95 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl text-center border border-white/60">
        <FaCheckCircle className="text-8xl text-[#1C3D5A] mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A3D63] mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-[#2C3E50] font-custom3 mb-8">
          Your inquiry regarding Palm Jebel Ali villas has been successfully
          submitted. A property specialist will contact you shortly.
        </p>

        <Link
          href="/palm-jebel-ali"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#1C3D5A] text-white rounded-full font-semibold shadow-xl hover:bg-[#345E84] transition font-custom3 group"
        >
          <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          Return to Palm Jebel Ali Page
        </Link>
      </div>
      
      <MetaPixel pixelId={pixelId} />
    </div>
  );
}
