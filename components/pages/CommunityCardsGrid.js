"use client";

import React, { useState, useMemo } from "react";
import PropertyCard from "../PropertyCard";
import BookPropertyPopUp from "../BookPropertyPopUp";
import MapboxCommunityListing from "../MapboxCommunityListing";
import { communityListings } from "@/data/community-data";
import { FaRegMap } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { TbLayoutGrid, TbBuildingCommunity, TbBrandOffice } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import CommunityQuizSection from "../CommunityQuizSection";

export default function CommunityCardsGrid() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [propertyPurpose, setPropertyPurpose] = useState(null);
  const [propertyID, setPropertyID] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Get unique categories from community listings
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(communityListings.map((c) => c.category))];
    return uniqueCategories.sort();
  }, []);

  // Get unique brands from community listings
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(communityListings.map((c) => c.brand).filter(Boolean))];
    return uniqueBrands.sort();
  }, []);

  // Filter communities based on selected category and brand
  const filteredCommunities = useMemo(() => {
    let filtered = communityListings;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((community) => community.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter((community) => community.brand === selectedBrand);
    }

    return filtered;
  }, [selectedCategory, selectedBrand]);

  const handleBookViewing = (image, purpose, id) => {
    setSelectedImage(image);
    setPropertyPurpose(purpose);
    setPropertyID(id);
    setShowPopup(true);
  };

  const propertyUrl = `https://hsproperty.ae/${propertyID}`;

  return (
    <>
      <section className="max-w-screen-2xl mx-auto px-4 md:px-6 pb-20 md:pb-24">
        <CommunityQuizSection />
        {/* Filter Dropdowns and Map Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Category Filter Dropdown */}
            <div className="flex flex-col gap-1 w-full sm:w-auto sm:min-w-[200px]">
              <span className="text-sm font-bold tracking-wider font-custom2">
                Filter by Category
              </span>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <TbBuildingCommunity className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626] font-custom2"
                >
                  <option value="" disabled>
                    Category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="">Clear</option>
                </select>
              </div>
            </div>

            {/* Brand Filter Dropdown */}
            <div className="flex flex-col gap-1 w-full sm:w-auto sm:min-w-[200px]">
              <span className="text-sm font-bold tracking-wider font-custom2">
                Filter by Brand
              </span>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <TbBrandOffice className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                </span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626] font-custom2"
                >
                  <option value="" disabled>
                    Brand
                  </option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                  <option value="">Clear</option>
                </select>
              </div>
            </div>
          </div>

          {/* Map Toggle Button */}
          <div className="flex-shrink-0 self-end md:self-auto">
            {!isMapVisible ? (
              <button
                className="flex items-center gap-2 bg-white border border-black rounded-lg px-4 md:px-6 py-2 md:py-3 hover:bg-black hover:text-white transition-all duration-300 font-custom2 text-sm md:text-base"
                onClick={() => setIsMapVisible(true)}
              >
                <FaRegMap className="h-4 w-4 md:h-5 md:w-5" />
                <span>View on Map</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-2 bg-black text-white border-2 border-black rounded-lg px-4 md:px-6 py-2 md:py-3 hover:bg-white hover:text-black transition-all duration-300 font-custom2 text-sm md:text-base"
                onClick={() => setIsMapVisible(false)}
              >
                <TbLayoutGrid className="h-4 w-4 md:h-5 md:w-5" />
                <span>Grid View</span>
              </button>
            )}
          </div>
        </div>

        {/* Grid View */}
        {!isMapVisible && (
          <>
            {filteredCommunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredCommunities.map((community, index) => (
                  <PropertyCard
                    key={index}
                    image={community.coverPhoto?.url}
                    title={community.title}
                    id={community.slug}
                    price={null}
                    location={community.location}
                    purpose="communities"
                    category={community.category}
                    brand={community.brand}
                    communityType={community.communityType}
                    onBookViewing={handleBookViewing}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg font-custom3">
                  No communities found in this category.
                </p>
              </div>
            )}
          </>
        )}

        {/* Map View */}
        {isMapVisible && (
          <div className="relative w-full" style={{ height: "600px" }}>
            <MapboxCommunityListing listings={filteredCommunities} />

            {/* Close button for map */}
            <button
              className="absolute top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
              onClick={() => setIsMapVisible(false)}
              title="Close Map"
            >
              <RxCross2 className="h-6 w-6 text-black" />
            </button>
          </div>
        )}
      </section>

      {/* Booking Popup */}
      {showPopup && (
        <BookPropertyPopUp
          image={selectedImage}
          propertyUrl={propertyUrl}
          setShow={setShowPopup}
        />
      )}
    </>
  );
}
