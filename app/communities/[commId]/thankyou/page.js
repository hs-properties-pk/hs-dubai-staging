import React from "react";
import Link from "next/link";
import MetaPixel from "@/components/MetaPixel";
import { FaCheckCircle, FaChevronLeft, FaHome } from "react-icons/fa";
import { getCommunityBySlug, getAllCommunitySlugs } from "@/data/communities";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllCommunitySlugs().map((slug) => ({ commId: slug }));
}

export async function generateMetadata({ params }) {
  const { commId } = await params;
  const data = getCommunityBySlug(commId);
  if (!data) return { title: "Thank You" };

  return {
    title: `Thank You - ${data.name} | HS Property`,
    description: `Thank you for your inquiry about ${data.name}. Our property specialist will contact you shortly.`,
    robots: "noindex, nofollow",
  };
}

export default async function CommunityThankYouPage({ params }) {
  const { commId } = await params;
  const data = getCommunityBySlug(commId);
  if (!data) notFound();

  const ty = data.thankyou;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6">
      <div className="max-w-xl w-full bg-gray-50 p-10 md:p-16 rounded-3xl shadow-lg text-center border border-gray-200">
        <div className="bg-black w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-5xl text-white" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-custom">
          Thank You!
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed font-custom3">
          {ty.description}
        </p>

        <div className="space-y-4">
          <Link
            href={`/communities/${commId}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 group font-custom2"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            {ty.returnLabel}
          </Link>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 group font-custom2"
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
