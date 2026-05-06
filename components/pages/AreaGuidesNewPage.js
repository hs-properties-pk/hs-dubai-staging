"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/Footer";
import AreaGuideCardNew from "@/components/AreaGuideCardNew";
import Fade from "react-reveal/Fade";
import HomeHeroHeading from "@/components/HomeHeroHeading";

function AreaGuidesNewPage({ emirates }) {
  const [loading, setLoading] = useState(!emirates);
  const [error, setError] = useState(null);
  const [emiratesList, setEmiratesList] = useState(emirates || []);

  useEffect(() => {
    // If emirates are not provided as props, fetch them
    if (!emirates) {
      const fetchEmiratesData = async () => {
        try {
          console.log("ðŸ”„ Fetching emirates from client-side...");
          const response = await fetch("/api/area-guides/emirates");
          console.log(`Response status: ${response.status}`);
          
          if (!response.ok) throw new Error(`Failed to fetch emirates: ${response.status}`);
          
          const data = await response.json();
          console.log("ðŸ“¦ Received data:", data);
          
          const emirates = data.data || [];
          console.log(`âœ… Emirates count: ${emirates.length}`);
          
          if (!emirates || emirates.length === 0) {
            setError("No emirates data received from API. Please ensure the backend is running.");
            setEmiratesList([]);
          } else {
            setEmiratesList(emirates);
          }
        } catch (err) {
          console.error("âŒ Error fetching emirates:", err);
          setError(`Error: ${err.message}`);
          setEmiratesList([]);
        } finally {
          setLoading(false);
        }
      };

      fetchEmiratesData();
    }
  }, [emirates]);

  if (loading) return <div className="text-center py-12">Loading area guides...</div>;
  if (error) return <div className="text-center py-12 px-4 max-w-2xl mx-auto"><div className="bg-red-50 border border-red-200 rounded-lg p-6"><h3 className="text-red-800 font-bold mb-2">Error Loading Area Guides</h3><p className="text-red-700 text-sm">{error}</p><p className="text-gray-600 text-xs mt-4">Check the browser console (F12) for more details.</p></div></div>;
  if (emiratesList.length === 0) return <div className="text-center py-12"><p className="text-gray-600">No emirates available. Ensure the backend API is running and returning data.</p></div>;

  return (
    <div className="overflow-hidden">
      <HomeHeroHeading
        image="/Bg-Imgs/area-guides-bg.jpg"
        title="Area Guides"
      />

      <SectionHeading
        title="Find Your Area Guide"
        subTitle="Explore detailed guides for all emirates and communities"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-6 max-w-screen-2xl mx-auto pt-6 pb-20 md:pb-28">
        {emiratesList.map((emirate, index) => (
          <Fade
            key={emirate.id}
            duration={1500}
            left={index % 2 === 0}
            right={index % 2 !== 0}
          >
            <AreaGuideCardNew
              image={emirate.featured_image || `/area-guides/${emirate.slug}.jpg`}
              title={emirate.name}
              href={`/area-guides/${emirate.slug}`}
            />
          </Fade>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default AreaGuidesNewPage;

