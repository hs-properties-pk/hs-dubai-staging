"use client";

import React, { useState, useEffect } from "react";
import HomeHeroHeading from "@/components/HomeHeroHeading";
import AreaGuideCityCardNew from "@/components/AreaGuideCityCardNew";
import Footer from "@/components/Footer";
import Fade from "react-reveal/Fade";
import SectionHeading from "@/components/SectionHeading";

function AreaGuidesNewCityPage({ emirateSlug, emirateData, areasData }) {
  const [loading, setLoading] = useState(!emirateData || !areasData);
  const [error, setError] = useState(null);
  const [emirate, setEmirate] = useState(emirateData || null);
  const [areas, setAreas] = useState(areasData?.data || []);

  useEffect(() => {
    // If data is not provided as props, fetch it
    if (!emirateData || !areasData) {
      const fetchAreasData = async () => {
        try {
          const response = await fetch(`/api/area-guides/emirates/${emirateSlug}/areas`);
          if (!response.ok) throw new Error("Failed to fetch areas");
          const data = await response.json();

          if (!data.success) {
            setError("Area Guide Not Found");
            return;
          }

          setEmirate(data.emirate);
          setAreas(data.data || []);
        } catch (err) {
          console.error("Error fetching areas:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAreasData();
    }
  }, [emirateSlug, emirateData, areasData]);

  if (loading) return <div className="text-center py-12">Loading areas...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  if (!emirate) return <div className="text-center py-12">Emirate not found</div>;

  return (
    <>
      <HomeHeroHeading
        image={emirate.featured_image || "/area-guides/" + emirate.slug + ".jpg"}
        title={emirate.name}
      />

      <SectionHeading
        title={`${emirate.name} Area Guides`}
        subTitle="Discover the best areas and communities in this emirate"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <Fade
              key={area.id}
              duration={1500}
              left={index % 2 === 0}
              right={index % 2 !== 0}
            >
              <AreaGuideCityCardNew
                image={area.featured_image}
                title={area.title}
                href={`/area-guides/${emirateSlug}/${area.slug}`}
              />
            </Fade>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AreaGuidesNewCityPage;

