"use client";

import React, { useState } from "react";
import CommunityQuizModal from "./CommunityQuizModal";

export default function CommunityQuizSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-black w-full p-6 rounded-lg mb-16 md:mb-24">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="">
            <h2 className="text-xl md:text-2xl font-bold text-white font-custom">
              Not Sure Which Community Suits You?
            </h2>
            <p className="text-md text-white leading-relaxed font-custom3">
              Take our 60-second lifestyle quiz and get matched to your top 3 communities in Dubai.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black hover:bg-gray-200 duration-300 py-3 px-4 rounded-lg tracking-wider font-custom2 whitespace-nowrap"
          >
            Start Community Quiz
          </button>
        </div>
      </div>
      <CommunityQuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}