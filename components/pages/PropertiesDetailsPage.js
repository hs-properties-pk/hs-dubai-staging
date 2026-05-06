"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { LuBath, LuMapPin, LuPhone } from "react-icons/lu";
import {
  IoBedOutline,
  IoCalendarClearOutline,
  IoStorefrontSharp,
} from "react-icons/io5";
import { TbBuildingCommunity } from "react-icons/tb";
import { PiHandHeartFill, PiResize } from "react-icons/pi";
import { Fade } from "react-reveal";
import ClipLoader from "react-spinners/ClipLoader";
import {
  FaBook,
  FaDownload,
  FaFireFlameCurved,
  FaGlobe,
  FaRegEnvelope,
  FaStreetView,
  FaWhatsapp,
  FaCircleCheck,
  FaBuilding,
} from "react-icons/fa6";
import PaymentPlan from "@/components/PaymentPlan";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import BookPropertyPopUp from "@/components/BookPropertyPopUp";
import {
  FaCouch,
  FaBolt,
  FaSnowflake,
  FaDumbbell,
  FaSwimmingPool,
  FaTrash,
  FaBusinessTime,
  FaSatellite,
  FaDog,
  FaConciergeBell,
  FaHotTub,
  FaHandHoldingWater,
  FaBath,
  FaTree,
  FaPray,
  FaHome,
  FaBed,
  FaWheelchair,
  FaParking,
} from "react-icons/fa";
import {
  MdOutlineCleaningServices,
  MdOutlineSecurity,
  MdOutlineChildFriendly,
  MdOutlineRoomService,
  MdOutlineKitchen,
  MdOutlineLocalLaundryService,
  MdOutlineLocalAtm,
  MdOutlineBalcony,
  MdOutlineMeetingRoom,
  MdElevator,
  MdOutlineWindow,
  MdMiscellaneousServices,
} from "react-icons/md";
import { GiFirstAidKit } from "react-icons/gi";
import { BsBuilding, BsReception4 } from "react-icons/bs";
import { BiSolidCctv } from "react-icons/bi";
import FAQSectionAll from "@/components/FAQSectionAll";
import DowloadBrochurePopUp from "@/components/DowloadBrochurePopUp";
import Link from "next/link";
import { offPlanListings } from "@/data/off-plan-data";
import OffPlanDetailsPage from "@/components/pages/OffPlanDetailsPage";

const subDetailsWithIcons = [
  // ── CMS amenities (exact names from /api/properties/amenities) ──
  { name: "Balcony", icon: MdOutlineBalcony },
  { name: "Barbecue Area", icon: FaConciergeBell },
  { name: "Built in Wardrobes", icon: IoStorefrontSharp },
  { name: "Central A/C", icon: FaSnowflake },
  { name: "Children's Play Area", icon: MdOutlineChildFriendly },
  { name: "Children's Pool", icon: FaSwimmingPool },
  { name: "Concierge", icon: FaConciergeBell },
  { name: "Covered Parking", icon: FaParking },
  { name: "Kitchen Appliances", icon: MdOutlineKitchen },
  { name: "Lobby in Building", icon: BsBuilding },
  { name: "Maid Service", icon: MdOutlineRoomService },
  { name: "Maids Room", icon: MdOutlineRoomService },
  { name: "Pets Allowed", icon: FaDog },
  { name: "Private Garden", icon: FaTree },
  { name: "Security", icon: MdOutlineSecurity },
  { name: "Shared Gym", icon: FaDumbbell },
  { name: "Shared Pool", icon: FaSwimmingPool },
  { name: "Study", icon: FaBook },
  { name: "Vastu-compliant", icon: FaHome },
  { name: "View of Landmark", icon: FaStreetView },
  { name: "View of Water", icon: FaStreetView },
  { name: "Walk-in Closet", icon: IoStorefrontSharp },
  // ── Bayut / legacy names ──
  { name: "Furnished", icon: FaCouch },
  { name: "Electricity Backup", icon: FaBolt },
  { name: "Centrally Air-Conditioned", icon: FaSnowflake },
  { name: "Central AC", icon: FaSnowflake },
  { name: "Air Conditioning", icon: FaSnowflake },
  { name: "Central Heating", icon: FaFireFlameCurved },
  { name: "Double Glazed Windows", icon: MdOutlineWindow },
  { name: "Storage Areas", icon: IoStorefrontSharp },
  { name: "Walk-in Closet", icon: IoStorefrontSharp },
  { name: "Study Room", icon: FaBook },
  { name: "Gym or Health Club", icon: FaDumbbell },
  { name: "Gym", icon: FaDumbbell },
  { name: "Health Club", icon: FaDumbbell },
  { name: "Fitness Center", icon: FaDumbbell },
  { name: "Swimming Pool", icon: FaSwimmingPool },
  { name: "Private Pool", icon: FaSwimmingPool },
  { name: "Pool", icon: FaSwimmingPool },
  { name: "Kids Play Area", icon: MdOutlineChildFriendly },
  { name: "Childrens Play Area", icon: MdOutlineChildFriendly },
  { name: "Play Area", icon: MdOutlineChildFriendly },
  { name: "Barbeque Area", icon: FaConciergeBell },
  { name: "BBQ Area", icon: FaConciergeBell },
  { name: "Waste Disposal", icon: FaTrash },
  { name: "Maintenance Staff", icon: MdOutlineCleaningServices },
  { name: "Business Center", icon: FaBusinessTime },
  { name: "Business Centre", icon: FaBusinessTime },
  { name: "Security Staff", icon: MdOutlineSecurity },
  { name: "24/7 Security", icon: MdOutlineSecurity },
  { name: "CCTV Security", icon: BiSolidCctv },
  { name: "CCTV", icon: BiSolidCctv },
  { name: "Broadband Internet", icon: FaGlobe },
  { name: "Internet", icon: FaGlobe },
  { name: "WiFi", icon: FaGlobe },
  { name: "Pet Policy", icon: FaDog },
  { name: "24 Hours Concierge", icon: FaConciergeBell },
  { name: "Concierge Service", icon: FaConciergeBell },
  { name: "Maid's Room", icon: MdOutlineRoomService },
  { name: "Sauna", icon: FaHotTub },
  { name: "ATM Facility", icon: MdOutlineLocalAtm },
  { name: "ATM", icon: MdOutlineLocalAtm },
  { name: "Satellite/Cable TV", icon: FaSatellite },
  { name: "Satellite TV", icon: FaSatellite },
  { name: "Cable TV", icon: FaSatellite },
  { name: "Intercom", icon: FaHandHoldingWater },
  { name: "Shared Kitchen", icon: MdOutlineKitchen },
  { name: "Kitchen", icon: MdOutlineKitchen },
  { name: "Laundry Room", icon: MdOutlineLocalLaundryService },
  { name: "Conference Room", icon: MdOutlineMeetingRoom },
  { name: "Cleaning Services", icon: MdOutlineCleaningServices },
  { name: "Day Care Center", icon: PiHandHeartFill },
  { name: "Lawn or Garden", icon: FaTree },
  { name: "Garden", icon: FaTree },
  { name: "Lawn", icon: FaTree },
  { name: "Cafeteria or Canteen", icon: FaConciergeBell },
  { name: "Facilities for Disabled", icon: FaWheelchair },
  { name: "First Aid Medical Center", icon: GiFirstAidKit },
  { name: "Steam Room", icon: FaHotTub },
  { name: "Jacuzzi", icon: FaBath },
  { name: "Balcony or Terrace", icon: MdOutlineBalcony },
  { name: "Terrace", icon: MdOutlineBalcony },
  { name: "Lobby", icon: BsBuilding },
  { name: "Prayer Room", icon: FaPray },
  { name: "Mosque", icon: FaPray },
  { name: "Freehold", icon: FaHome },
  { name: "Laundry Facility", icon: MdOutlineLocalLaundryService },
  { name: "Service Elevators", icon: MdElevator },
  { name: "Elevators in Building", icon: MdElevator },
  { name: "Elevator", icon: MdElevator },
  { name: "Lift", icon: MdElevator },
  { name: "Reception/Waiting Room", icon: BsReception4 },
  { name: "Reception", icon: BsReception4 },
  { name: "Number of Bedrooms", icon: FaBed },
  { name: "Number of Bathrooms", icon: FaBath },
  { name: "View", icon: FaStreetView },
  { name: "Sea View", icon: FaStreetView },
  { name: "City View", icon: FaStreetView },
  { name: "Parking Spaces", icon: FaParking },
  { name: "Parking", icon: FaParking },
];

const findAmenityIcon = (amenityName) => {
  if (!amenityName) return MdMiscellaneousServices;
  // Exact match first
  const exact = subDetailsWithIcons.find((d) => d.name === amenityName);
  if (exact) return exact.icon;
  // Case-insensitive fallback
  const lower = amenityName.toLowerCase();
  const ci = subDetailsWithIcons.find((d) => d.name.toLowerCase() === lower);
  return ci ? ci.icon : MdMiscellaneousServices;
};

export default function PropertiesDetailsPage({
  params,
  serverData,
  serverError,
  cmsPropertyData = null,
}) {
  const { purpose, propertyId } = params;
  const [showPopup, setShowPopup] = useState(false);
  const [downloadBrochureShowPopup, setDownloadBrochureShowPopup] =
    useState(false);

  // Normalize server data from new API structure
  const normalizePropertyData = (payload) => {
    if (!payload) return null;

    // Unwrap { results: [ listing ] } shape from search/detail API
    let data = payload;
    if (
      Array.isArray(payload.results) &&
      payload.results.length > 0 &&
      typeof payload.results[0] === "object"
    ) {
      data = payload.results[0];
    } else if (payload.hit && typeof payload.hit === "object") {
      data = payload.hit;
    }
    
    // If it's already normalized (off-plan), return as is
    if (data.slug && data.fullTitle) return data;
    
    // Convert date string to Unix timestamp
    const dateToTimestamp = (dateString) => {
      if (!dateString) return null;
      const ts = new Date(dateString).getTime();
      return isNaN(ts) ? null : Math.floor(ts / 1000);
    };
    
    // Normalize new API structure
    // Extract type values safely to avoid rendering the type object
    const typeMain = data.type?.main;
    const typeSub = data.type?.sub;
    
    // Create normalized object, removing problematic fields that could cause rendering errors
    const normalized = {
      ...data,
      // Remove the raw type object to prevent rendering it (it has {main, sub} structure)
      // Setting to undefined still includes it in the object, so we'll delete it after
      type: undefined,
      // Store type values as separate string properties
      typeMain: typeMain,
      typeSub: typeSub,
      // Normalize location to array format
      // Handle new API structure: location object with country, city, community, sub_community, cluster
      location: Array.isArray(data.location) 
        ? data.location 
        : data.location && typeof data.location === "object"
        ? (() => {
            const locationArray = [];
            if (data.location.country?.name) locationArray.push({ name: data.location.country.name });
            if (data.location.city?.name) locationArray.push({ name: data.location.city.name });
            if (data.location.community?.name) locationArray.push({ name: data.location.community.name });
            if (data.location.sub_community?.name) locationArray.push({ name: data.location.sub_community.name });
            if (data.location.cluster?.name) locationArray.push({ name: data.location.cluster.name });
            return locationArray.length > 0 ? locationArray : [{ name: "Dubai" }];
          })()
        : data.location?.name 
        ? [{ name: data.location.name }]
        : [{ name: "Dubai" }],
      // Normalize images/photos - ImageGallery expects array of objects with { url }
      photos: (() => {
        // media.photos is an array of URL strings from Bayut API
        const mediaPhotos = Array.isArray(data.media?.photos) && data.media.photos.length > 0
          ? data.media.photos
              .filter(p => p != null && p !== "")
              .map(p => typeof p === "string" ? { url: p } : (p.url ? { url: p.url } : null))
              .filter(Boolean)
          : [];
        // Root-level photos (some API shapes use this)
        const rootPhotos = Array.isArray(data.photos) && data.photos.length > 0
          ? data.photos
              .filter(p => p != null && p !== "")
              .map(p => typeof p === "string" ? { url: p } : (p.url ? { url: p.url } : null))
              .filter(Boolean)
          : [];
        // Merge and dedupe
        const merged = [...mediaPhotos, ...rootPhotos];
        const seen = new Set();
        const deduped = merged.filter(p => {
          if (seen.has(p.url)) return false;
          seen.add(p.url);
          return true;
        });
        if (deduped.length > 0) return deduped;
        // Fallback to cover photo
        if (data.media?.cover_photo) return [{ url: data.media.cover_photo }];
        if (data.coverPhoto?.url) return [{ url: data.coverPhoto.url }];
        if (typeof data.coverPhoto === "string") return [{ url: data.coverPhoto }];
        return [];
      })(),
      // Normalize coverPhoto for popups and other uses (empty {} from API is truthy — use .url)
      coverPhoto: (() => {
        const fromCover =
          data.coverPhoto?.url && String(data.coverPhoto.url).trim()
            ? data.coverPhoto
            : null;
        if (fromCover) return fromCover;
        if (data.media?.cover_photo && String(data.media.cover_photo).trim()) {
          return { url: data.media.cover_photo };
        }
        if (typeof data.coverPhoto === "string" && data.coverPhoto.trim()) {
          return { url: data.coverPhoto };
        }
        return null;
      })(),
      // Ensure description is preserved
      description: data.description || "",
      // Normalize geography for map - extract coordinates from location object
      geography: data.geography || (data.location?.coordinates?.lat && data.location?.coordinates?.lng 
        ? { lat: data.location.coordinates.lat, lng: data.location.coordinates.lng } 
        : (data.location?.lat && data.location?.lng ? { lat: data.location.lat, lng: data.location.lng } : null)),
      // Normalize bedrooms from details.bedrooms
      rooms: (data.rooms != null) ? data.rooms : (data.details?.bedrooms != null ? data.details.bedrooms : 0),
      // Normalize bathrooms from details.bathrooms
      baths: (data.baths != null) ? data.baths : (data.details?.bathrooms != null ? data.details.bathrooms : 0),
      // Normalize area - handle new API structure with area.built_up; convert sqm → sqft
      area: (() => { const raw = data.area !== undefined ? (typeof data.area === "number" ? data.area : (data.area?.built_up || data.area?.plot || 0)) : 0; const unit = data.area?.unit || data.area_unit || ""; return unit === "sqm" ? Math.round(raw * 10.76391041671) : raw; })(),
      // Normalize completion status from details.completion_status
      completionStatus: data.completionStatus || data.details?.completion_status || "",
      // Normalize price - ensure it's a number
      price: typeof data.price === "number" ? data.price : (parseFloat(data.price) || 0),
      // Normalize category/property type from type.sub or type.main
      // Keep original category if it's a string (off-plan), otherwise normalize to array format
      category: typeof data.category === "string" 
        ? data.category 
        : (data.category || (typeSub ? [{ name: typeSub }] : (typeMain ? [{ name: typeMain }] : [{ name: "" }]))),
      // Normalize createdAt from meta.created_at (convert to Unix timestamp)
      createdAt: data.createdAt || dateToTimestamp(data.meta?.created_at),
      // Normalize amenities - API can return grouped structure (type/items) or simple array of strings
      amenities: (() => {
        if (!data.amenities) return [];
        if (!Array.isArray(data.amenities)) return [];
        if (data.amenities.length === 0) return [];
        
        // Check if it's grouped structure (first item has type and items)
        const firstItem = data.amenities[0];
        if (firstItem && typeof firstItem === "object" && firstItem.type && Array.isArray(firstItem.items)) {
          // Grouped structure: flatten all items from all groups
          const allAmenities = [];
          data.amenities.forEach(group => {
            if (group && group.items && Array.isArray(group.items)) {
              group.items.forEach(item => {
                if (typeof item === "string" && item.trim() !== "") {
                  allAmenities.push(item.trim());
                }
              });
            }
          });
          return allAmenities;
        }
        
        // Simple array of strings
        return data.amenities
          .map(amenity => {
            if (typeof amenity === "string") return amenity.trim();
            if (typeof amenity === "object" && amenity !== null) {
              return amenity.name || amenity.text || String(amenity);
            }
            return String(amenity || "");
          })
          .filter(amenity => amenity !== "" && amenity.length > 0);
      })(),
      // Normalize payment_plans from new API structure to match PaymentPlan component expectations
      paymentPlans: data.paymentPlans || (data.payment_plans && Array.isArray(data.payment_plans) && data.payment_plans.length > 0 
        ? data.payment_plans.map(plan => {
            const normalizedPlan = {};
            
            // Down Payment
            if (plan.down_payment_percent !== null && plan.down_payment_percent !== undefined) {
              normalizedPlan.downPayment = { valuePercentage: plan.down_payment_percent };
            }
            
            // Pre-Handover Installments
            if (plan.pre_handover_percent !== null && plan.pre_handover_percent !== undefined) {
              normalizedPlan.preHandoverInstallments = [{ 
                valuePercentage: plan.pre_handover_percent, 
                description: "Pre-handover" 
              }];
            } else {
              normalizedPlan.preHandoverInstallments = [];
            }
            
            // Handover Payment
            if (plan.handover_percent !== null && plan.handover_percent !== undefined) {
              normalizedPlan.handoverPayment = { valuePercentage: plan.handover_percent };
            }
            
            // Post-Handover Installments
            if (plan.post_handover_percent !== null && plan.post_handover_percent !== undefined) {
              normalizedPlan.postHandoverInstallments = [{ 
                valuePercentage: plan.post_handover_percent, 
                description: "Post-handover" 
              }];
            } else {
              normalizedPlan.postHandoverInstallments = [];
            }
            
            // Only return plan if it has at least one payment component
            const hasPaymentData = normalizedPlan.downPayment || 
                                 (normalizedPlan.preHandoverInstallments && normalizedPlan.preHandoverInstallments.length > 0) ||
                                 normalizedPlan.handoverPayment ||
                                 (normalizedPlan.postHandoverInstallments && normalizedPlan.postHandoverInstallments.length > 0);
            
            return hasPaymentData ? normalizedPlan : null;
          }).filter(plan => plan !== null) // Remove null/empty plans
        : []),
    };
    
    // Remove problematic objects that could cause "Objects are not valid as a React child" errors
    // Delete the type object (it has {main, sub} structure that could be rendered accidentally)
    delete normalized.type;
    
    // Remove any items field that might have {type, items} structure
    if (normalized.items && typeof normalized.items === 'object') {
      delete normalized.items;
    }
    
    // Remove agency and agent details (we don't want to show these)
    delete normalized.agency;
    delete normalized.agent;

    // Popups (BookPropertyPopUp) need a non-empty image src — prefer first gallery photo
    const firstPhoto =
      Array.isArray(normalized.photos) && normalized.photos[0]?.url
        ? String(normalized.photos[0].url).trim()
        : "";
    const coverStr = normalized.coverPhoto?.url
      ? String(normalized.coverPhoto.url).trim()
      : "";
    if (coverStr) {
      normalized.coverPhoto = { url: coverStr };
    } else if (firstPhoto) {
      normalized.coverPhoto = { url: firstPhoto };
    } else {
      normalized.coverPhoto = { url: "/placeholder-property.jpg" };
    }

    return normalized;
  };

  // Use server data directly, no need for loading state initially.
  // CMS data (for-sale/for-rent) is passed as cmsPropertyData and takes priority.
  const [listings, setListings] = useState(
    normalizePropertyData(cmsPropertyData || serverData)
  );
  const [error, setError] = useState(serverError);
  const [loading, setLoading] = useState(
    !cmsPropertyData && !serverData && !serverError
  );

  // Client-side fallback if server data is not available (Bayut path — not used for CMS properties)
  useEffect(() => {
    if (!serverData && !serverError && !cmsPropertyData) {
      const fetchListings = async () => {
        if (purpose === "off-plan") {
          setLoading(false);
          setListings(offPlanListings.find((item) => item.slug === propertyId));
          return;
        }

        try {
          const numericId = propertyId.replace(/\D/g, '');
          if (!numericId) throw new Error("Invalid property ID");

          const res = await fetch(
            `/api/bayut/property/${numericId}?purpose=${encodeURIComponent(purpose)}`
          );
          const payload = await res.json();

          if (!res.ok || payload.error || !payload.data) {
            throw new Error(payload.error || "Failed to load property");
          }

          let data = payload.data;

          // Unwrap results array (API route may return raw object)
          if (Array.isArray(data?.results) && data.results.length > 0) {
            data = data.results[0];
          } else if (data?.hit) {
            data = data.hit;
          }

          const normalizedData = normalizePropertyData(data);
          setListings(normalizedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching property details:", error);
          setError("Error Fetching Property Details");
          setLoading(false);
        }
      };

      fetchListings();
    }
  }, [propertyId, purpose, serverData, serverError, cmsPropertyData]);

  const formateDate = (date) => {
    if (!date) return "N/A";
    const options = { day: "numeric", month: "long", year: "numeric" };
    // Handle both Unix timestamp (number) and date string
    let dateObj;
    if (typeof date === "number") {
      dateObj = new Date(date * 1000);
    } else if (typeof date === "string") {
      dateObj = new Date(date);
    } else {
      return "N/A";
    }
    
    if (isNaN(dateObj.getTime())) return "N/A";
    
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const propertyUrl = `https://hsproperty.ae/properties/${purpose}/${propertyId}`;

  // Loading state
  if (loading) {
    return (
      <div className="overflow-hidden">
        <div className="max-w-screen-2xl h-screen mx-auto flex justify-center items-center">
          <ClipLoader color="#000" size={60} />
        </div>
      </div>
    );
  }

  // Error state
  if (error && !listings) {
    return (
      <div className="overflow-hidden">
        <div className="max-w-screen-2xl h-screen mx-auto flex justify-center items-center">
          <h2 className="text-xl text-red-600 font-custom2">{error}</h2>
        </div>
      </div>
    );
  }

  // If no listings found
  if (!listings) {
    return (
      <div className="overflow-hidden">
        <div className="max-w-screen-2xl h-screen mx-auto flex justify-center items-center">
          <h2 className="text-xl text-red-600 font-custom2">
            Property not found
          </h2>
        </div>
      </div>
    );
  }

  // Render new off-plan UI if it's an off-plan property
  if (purpose === "off-plan") {
    return <OffPlanDetailsPage listings={listings} propertyId={propertyId} />;
  }

  return (
    <div className="overflow-hidden">
      <div>
        <div className="relative">
          <NavBar isHomeNavbar={true} />
          <div className="pt-24 md:pt-32 pb-4 md:pb-8 px-4 md:px-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
              <div className="font-custom text-black w-full md:w-9/12">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {purpose === "off-plan"
                    ? (typeof listings?.fullTitle === "string" ? listings.fullTitle : String(listings?.fullTitle || "Property Details"))
                    : (typeof listings?.title === "string" ? listings.title : String(listings?.title || "Property Details"))}
                </h1>
              </div>
              {purpose === "off-plan" && (
                <div
                  onClick={() => setDownloadBrochureShowPopup(true)}
                  className="flex w-max gap-2 bg-black text-white items-center p-2 lg:p-4 rounded-lg tracking-wider hover:bg-gray-800 duration-500 cursor-pointer"
                >
                  <FaDownload className="w-4 h-4" />
                  <p className="text-sm lg:text-lg font-semibold">
                    Download Brochure
                  </p>
                </div>
              )}
            </div>
            {purpose !== "off-plan" && (
              <div className="font-custom2 text-gray-500">
                <p className="text-base md:text-xl pt-4 capitalize tracking-wider">
                  {Array.isArray(listings?.location) && listings.location.length > 0
                    ? (() => {
                        // Show the most specific location part (cluster → sub_community → community)
                        const loc = listings.location[listings.location.length - 1];
                        return typeof loc === "string" ? loc : (loc?.name || "");
                      })()
                    : ""}
                </p>
              </div>
            )}
          </div>
          <ImageGallery
            location={listings?.geography}
            images={listings?.photos || []}
          />
        </div>

        <div className="max-w-screen-2xl mx-auto py-6 px-4 md:px-6 font-custom2">
          {/* Price + Key Highlights */}
          <div className="py-4 md:py-8 font-custom2 text-black">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <p className="text-2xl md:text-3xl font-bold">
                {purpose === "off-plan"
                  ? `Starting From AED ${listings?.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  : `AED ${listings?.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${
                      listings?.purpose === "for-rent"
                        ? ` / ${({ yearly: "Year", quarterly: "Quarter", monthly: "Month", weekly: "Week", daily: "Day" })[listings?.price_period?.toLowerCase()] || "Year"}`
                        : ""
                    }`}
              </p>
            </div>
          </div>

          {/* Quick Stats Row */}
          {purpose !== "off-plan" && (
            <div className="flex flex-wrap gap-3 md:gap-4 pb-6 border-b border-gray-200 mb-8">
              {listings?.typeSub && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                  <FaBuilding className="text-xs" />
                  {listings.typeSub}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                <IoBedOutline className="text-sm" />
                {listings?.rooms === 0 ? "Studio" : `${listings?.rooms} Bed${listings?.rooms > 1 ? "s" : ""}`}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                <LuBath className="text-sm" />
                {listings?.baths} Bath{listings?.baths > 1 ? "s" : ""}
              </span>
              {listings?.area > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                  <PiResize className="text-sm" />
                  {Math.round(listings.area).toLocaleString()} sq.ft
                </span>
              )}
              {listings?.details?.is_furnished === true && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <FaCouch className="text-xs" />
                  Furnished
                </span>
              )}
              {listings?.details?.is_furnished === false && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1.5 rounded-full">
                  Unfurnished
                </span>
              )}
              {listings?.completionStatus && (
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${
                  listings.completionStatus === "completed"
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}>
                  {listings.completionStatus === "completed" ? "Ready" : "Under Construction"}
                </span>
              )}
              {listings?.verification?.is_verified && (
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  <FaCircleCheck className="text-xs" />
                  Verified
                </span>
              )}
              {listings?.purpose && (
                <span className={`inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full ${
                  listings.purpose === "for-sale"
                    ? "bg-violet-50 text-violet-700"
                    : "bg-sky-50 text-sky-700"
                }`}>
                  {listings.purpose === "for-sale" ? "For Sale" : "For Rent"}
                </span>
              )}
            </div>
          )}

          {/* Reference / Legal / Bayut Link Row */}
          {purpose !== "off-plan" && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">
              {listings?.legal?.dld_property_sk && String(listings.legal.dld_property_sk).trim().length > 1 && (
                <span>
                  <span className="font-semibold text-gray-800">DLD:</span>{" "}
                  {listings.legal.dld_property_sk}
                </span>
              )}
              {listings?.legal?.permit_number && listings.legal.permit_number.trim() !== "" && (
                <span>
                  <span className="font-semibold text-gray-800">Permit:</span>{" "}
                  {listings.legal.permit_number}
                </span>
              )}
              {listings?.project?.developer?.name && listings.project.developer.name.trim() !== "" && (
                <span>
                  <span className="font-semibold text-gray-800">Developer:</span>{" "}
                  {listings.project.developer.name}
                </span>
              )}
            </div>
          )}

          {/* Keywords */}
          {purpose !== "off-plan" &&
            Array.isArray(listings?.keywords) &&
            listings.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {listings.keywords.map((kw, i) => (
                  <span
                    key={`kw-${i}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 capitalize"
                  >
                    {kw}
                  </span>
                ))}
              </div>
          )}

          <div className="flex flex-col lg:flex-row gap-12 mt-4">
            <div className="w-full lg:w-2/3 text-lg tracking-wider text-black flex flex-col gap-2 order-2 md:-order-1 property-description">
              <div className="font-custom text-black">
                <h2 className="!text-2xl !md:text-3xl !font-semibold">
                  Property Description
                </h2>
              </div>
              <div
                className="leading-8 flex flex-col gap-2"
                dangerouslySetInnerHTML={{
                  __html: listings?.description
                    ?.replace(
                      /\[redacted phone number\]/g,
                      `<a href="tel:${listings?.phoneNumber?.proxyPhone}" className="phone-link">${listings?.phoneNumber?.proxyPhone}</a><br />`
                    )
                    .replace(/\bEmail: \[redacted email address\]/g, "")
                    .replace("www. hsproperty. ae", ""),
                }}
              />
              
              {/* Amenities Section */}
              {(listings?.amenities && Array.isArray(listings.amenities) && listings.amenities.length > 0) && (
                <div className="flex flex-col gap-8 mt-8">
                  <div className="font-custom text-black">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                      Amenities
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listings.amenities.map((amenity, index) => {
                      // API returns simple array of strings
                      const amenityName = typeof amenity === "string" ? amenity : String(amenity || "");
                      if (!amenityName) return null;
                      const IconComponent = findAmenityIcon(amenityName);

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                          <IconComponent className="text-2xl mb-2 text-black" />
                          <span className="text-center text-gray-700 text-base font-medium">
                            {amenityName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            <Fade right duration={1500}>
              <div className="w-full lg:w-1/3 h-max">
                <div className="bg-[#F8F8F8] shadow-sm px-4 pt-4 md:px-6 md:pt-6 flex justify-between rounded-t-lg border-t border-x">
                  <h2 className="text-base font-semibold py-1 px-2 mb-6 border border-black rounded-xl w-max">
                    Property Information
                  </h2>
                  {listings?.completionStatus === "under-construction" && (
                    <h2 className="text-base font-semibold py-1 px-2 mb-6 border bg-black text-white border-black rounded-xl w-max">
                      Off Plan
                    </h2>
                  )}
                </div>
                <div className="space-y-4 bg-[#F8F8F8] border-b border-x rounded-b-lg px-4 pb-4 md:px-6 md:pb-6 text-sm md:text-base">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TbBuildingCommunity size="1.5em" stroke="#606060" />
                      <span>Property Type</span>
                    </span>
                    <span className="self-end">
                      {(() => {
                        if (purpose === "off-plan") {
                          if (typeof listings?.category === "string") return listings.category;
                          if (Array.isArray(listings?.category) && listings.category.length > 0) {
                            return listings.category[0]?.name || String(listings.category[0] || "N/A");
                          }
                          return "N/A";
                        } else {
                          // For non off-plan: use normalized type values
                          const typeValue = listings?.typeSub || listings?.typeMain;
                          if (typeValue) return String(typeValue);
                          // Fallback to category
                          if (Array.isArray(listings?.category) && listings.category.length > 0) {
                            return String(listings.category[0]?.name || "N/A");
                          }
                          if (typeof listings?.category === "string") return listings.category;
                          return "N/A";
                        }
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <LuMapPin size="1.5em" stroke="#606060" />
                      <span>Location</span>
                    </span>
                    <span className="self-end">
                      {Array.isArray(listings?.location) && listings.location.length > 0
                        ? listings.location
                            .slice(0, 3)
                            .map((item) => (typeof item === "string" ? item : item?.name || item))
                            .reverse()
                            .join(" , ")
                        : listings?.location?.name || listings?.location || "Dubai"}
                    </span>
                  </div>
                  {purpose === "off-plan" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <IoBedOutline size="1.5em" stroke="#606060" />
                          <span>Bedroom</span>
                        </span>
                        {listings?.rooms === 0
                          ? "Studio"
                          : `${listings?.rooms} ${listings?.rooms > 1 ? "Bedrooms" : "Bedroom"}`}
                      </div>

                      {listings?.roomsOptional && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <IoBedOutline size="1.5em" stroke="#606060" />
                            <span>Bedroom (2)</span>
                          </span>
                          {`${listings?.roomsOptional} Bedrooms`}
                        </div>
                      )}
                      {listings?.roomsOptionalOther && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <IoBedOutline size="1.5em" stroke="#606060" />
                            <span>Bedroom (3)</span>
                          </span>
                          {`${listings?.roomsOptionalOther} Bedrooms`}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <IoBedOutline size="1.5em" stroke="#606060" />
                        <span>Bedroom</span>
                      </span>
                      {listings?.rooms === 0
                        ? "Studio"
                        : `${listings?.rooms} ${
                            listings?.rooms > 1 ? "Bedrooms" : "Bedroom"
                          }`}
                    </div>
                  )}
                  {purpose !== "off-plan" && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <LuBath size="1.5em" stroke="#606060" />
                        <span>Bathroom</span>
                      </span>
                      {`${listings?.baths} ${
                        listings?.baths > 1 ? "Bathrooms" : "Bathroom"
                      }`}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <PiResize
                        size="1.75em"
                        strokeWidth={1.3}
                        color="#606060"
                      />
                      <span>Size</span>
                    </span>
                    {purpose === "off-plan"
                      ? listings?.area
                      : `${Math.round(listings?.area || 0).toLocaleString()} Sq Ft`}
                  </div>
                  {listings?.areaOptional && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <PiResize
                          size="1.75em"
                          strokeWidth={1.3}
                          color="#606060"
                        />
                        <span>Size (2)</span>
                      </span>
                      {purpose === "off-plan"
                        ? listings?.areaOptional
                        : `${Math.round(listings?.areaOptional || 0).toLocaleString()} Sq Ft`}
                    </div>
                  )}
                  {listings?.areaOptionalOther && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <PiResize
                          size="1.75em"
                          strokeWidth={1.3}
                          color="#606060"
                        />
                        <span>Size (3)</span>
                      </span>
                      {purpose === "off-plan"
                        ? listings?.areaOptionalOther
                        : `${Math.round(listings?.areaOptionalOther || 0).toLocaleString()} Sq Ft`}
                    </div>
                  )}
                  {purpose !== "off-plan" && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <IoCalendarClearOutline
                          size="1.5em"
                          strokeWidth={1.3}
                          color="#606060"
                          className="ml-0.5"
                        />
                        <span>Posted Date</span>
                      </span>
                      {formateDate(listings?.createdAt)}
                    </div>
                  )}
                </div>
                {listings?.completionDetails && (
                  <div className="bg-[#F8F8F8] flex flex-col items-start gap-6 mx-auto shadow-sm border mt-6 px-4 py-4 md:px-6 md:py-6 rounded-lg">
                    <h2 className="text-base font-semibold py-1 px-2 border border-black rounded-xl w-max">
                      Completion Details
                    </h2>
                    <div className="space-y-4 bg-[#F8F8F8] w-full">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <IoCalendarClearOutline
                            size="1.5em"
                            strokeWidth={1.3}
                            color="#606060"
                            className="ml-0.5"
                          />
                          <span>Start Date</span>
                        </span>
                        {formateDate(listings?.completionDetails?.startDate)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <IoCalendarClearOutline
                            size="1.5em"
                            strokeWidth={1.3}
                            color="#606060"
                            className="ml-0.5"
                          />
                          <span>Completion Date</span>
                        </span>
                        {formateDate(
                          listings?.completionDetails?.completionDate
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-8 mx-auto rounded-lg justify-between p-4 border mt-6">
                  <div className="flex items-center gap-2 cursor-default">
                    <Image
                      src="/logos-icons/fahad.jpeg"
                      alt="Agent"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-sm">Fahad</p>
                      <p className="text-xs text-gray-500">Haq</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-3 justify-between">
                    <Link
                      href="tel:+971526902884"
                      className="flex gap-2 tracking-wide items-center bg-gray-100 hover:bg-black hover:text-white duration-300 border font-medium rounded-xl text-xs md:text-sm p-2 md:p-4"
                    >
                      <LuPhone size="1.3em" />
                      Call
                    </Link>
                    <Link
                      target="_blank"
                      href="https://wa.me/971526902884?text=Hello!"
                      className="flex gap-2 tracking-wide items-center bg-gray-100 hover:bg-black hover:text-white duration-300 border font-medium rounded-xl text-xs md:text-sm p-2 md:p-4"
                    >
                      <FaWhatsapp size="1.3em" />
                      Whatsapp
                    </Link>
                    <button
                      onClick={() => setShowPopup(true)}
                      type="submit"
                      className="flex gap-2 tracking-wide items-center bg-gray-100 hover:bg-black hover:text-white duration-300 border font-medium rounded-xl text-xs md:text-sm p-2 md:p-4"
                    >
                      <FaRegEnvelope size="1.3em" />
                      Book a Viewing
                    </button>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          {showPopup && (
            <BookPropertyPopUp
              image={listings?.coverPhoto?.url}
              propertyUrl={propertyUrl}
              setShow={setShowPopup}
            />
          )}
          {downloadBrochureShowPopup && (
            <DowloadBrochurePopUp
              image={listings?.coverPhoto?.url}
              propertyUrl={propertyUrl}
              setShow={setDownloadBrochureShowPopup}
            />
          )}
        </div>

        {/* Payment Plans Section - Show if available, or show message if empty */}
        {(listings?.paymentPlans && Array.isArray(listings.paymentPlans) && listings.paymentPlans.length > 0) ? (
          purpose === "off-plan" ? (
            <div className="w-screen relative container sm:p-6 font-custom2 mb-8 md:mb-16">
              <div
                className="w-screen absolute inset-0 bg-fill bg-center mx-auto bg-no-repeat"
                style={{
                  backgroundImage: `url("/subscribe-bg.png")`,
                }}
              ></div>
              <Fade bottom duration={1500}>
                <div className="w-screen text-center pb-8 md:pb-12 font-custom">
                  <h2 className="text-3xl md:text-7xl text-black">
                    Payment Plan
                  </h2>
                </div>
              </Fade>
              <Fade bottom duration={1500}>
                <div className="w-screen">
                  <div className="bg-white bg-opacity-20 p-4 md:p-8 rounded-lg shadow-lg mx-auto w-10/12 md:w-[38%] border border-[#0000004D]">
                    <ul className="text-center text-black space-y-4 text-lg md:text-2xl">
                      {listings?.paymentPlans.map((plan, index) => (
                        <li key={index}>
                          {typeof plan === "object" && plan !== null
                            ? (plan.valuePercentage !== undefined ? `${plan.valuePercentage}%` : "") + 
                              (plan.description ? ` - ${plan.description}` : "")
                            : String(plan || "")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Fade>
            </div>
          ) : (
            <div className="w-screen relative container sm:p-6 font-custom2 mb-16 md:mb-24">
              <div
                className="w-screen absolute inset-0 bg-fill bg-center mx-auto bg-no-repeat"
                style={{
                  backgroundImage: `url("/subscribe-bg.png")`,
                }}
              ></div>
              <Fade bottom duration={1500}>
                <div className="w-screen text-center pb-12 md:pb-16 font-custom">
                  <h2 className="text-3xl md:text-7xl text-black">
                    Payment Plan
                  </h2>
                </div>
              </Fade>
              <Fade bottom duration={1500}>
                <div className="w-screen">
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-lg mx-auto w-10/12 md:w-[38%] border border-[#0000004D]">
                    <PaymentPlan plan={listings?.paymentPlans} />
                  </div>
                </div>
              </Fade>
            </div>
          )
        ) : null}
        {purpose === "off-plan" && <FAQSectionAll faqItems={listings?.faqs} />}
        <Footer />
      </div>
    </div>
  );
}
