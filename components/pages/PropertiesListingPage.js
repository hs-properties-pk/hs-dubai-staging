"use client";
import Footer from "@/components/Footer";
import PropertyCardBig from "@/components/PropertyCardBig";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaRegMap, FaArrowRight, FaArrowTrendUp, FaPercent } from "react-icons/fa6";
import { FaHandHoldingUsd, FaCalendar, FaChartLine, FaKey, FaPaintRoller } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoBedOutline, IoCash, IoClose } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { TbBuildingCommunity, TbHomeExclamation } from "react-icons/tb";
import { Fade } from "react-reveal";
import { ClipLoader } from "react-spinners";
import { usePathname, useSearchParams } from "next/navigation";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import MapboxPropertyListing from "@/components/MapboxPropertyListing";
import BookPropertyPopUp from "@/components/BookPropertyPopUp";
import HomeHeroHeading from "../HomeHeroHeading";
import { offPlanListings } from "@/data/off-plan-data";
import { offPlanListingFaqItems } from "@/data/off-plan-listing-faq";
import { forSaleListingFaqItems } from "@/data/for-sale-listing-faq";
import { forRentListingFaqItems } from "@/data/for-rent-listing-faq";

const offPlanBrands = [...new Set(offPlanListings.map((p) => p.brand).filter(Boolean))].sort();
import BelowHiddenTextNew from "./BelowHiddenTextNew";
import Link from "next/link";
import PremiumPageHero from "../PremiumPageHero";
import OffPlanBrowseByType from "../off-plan/OffPlanBrowseByType";
import { getOffPlanTypeListingMetadata } from "@/lib/offPlanTypeRoutes";

/** Toggle: premium hero (breadcrumbs + stats) vs. classic image + centered title. */
const USE_PREMIUM_PROPERTY_LISTING_HERO = true;

const PROPERTY_LISTING_HERO_STATS = [
  { value: "AED 685K", label: "Starting From" },
  { value: "500+", label: "Projects" },
  { value: "25+", label: "Top Developers" },
  { value: "35+", label: "Years experience" },
];

function getPropertyListingHeroProps(purpose, options = {}) {
  const { offPlanCategorySlug = null } = options;
  const eyebrow = "Best real estate company in Dubai";
  const stats = PROPERTY_LISTING_HERO_STATS;

  if (purpose === "off-plan") {
    if (offPlanCategorySlug) {
      const m = getOffPlanTypeListingMetadata(offPlanCategorySlug);
      return {
        image: m.heroImage || "/Bg-Imgs/off-plan-bg.jpg",
        imageAlt: `${m.breadcrumbLabel} off-plan — H&S Real Estate`,
        eyebrow: "500+ projects · No.1 awarded broker (DLD 2025)",
        titleBefore: m.heroTitle,
        description: m.heroDescription,
        breadcrumbs: [
          { label: "Home", href: "/" },
          { label: "Off plan properties", href: "/properties/off-plan" },
          { label: m.breadcrumbLabel, href: null },
        ],
        stats,
      };
    }
    return {
      image: "/Bg-Imgs/off-plan-bg.jpg",
      imageAlt: "Off-plan properties in Dubai — H&S Real Estate",
      eyebrow: "500+ projects · No.1 awarded broker (DLD 2025)",
      titleBefore: "Off-Plan Properties in Dubai — 2026 Launch Projects",
      description:
        "Browse off-plan apartments, villas, and townhouses from Dubai's top developers — Emaar, DAMAC, Nakheel, Meraas, and Sobha. Compare flexible payment plans, handover dates, and prime locations across waterfront towers, golf communities, and family developments. As Dubai's No.1 awarded real estate broker (DLD 2025), H&S Real Estate helps you shortlist and secure the right off-plan investment in Dubai.",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Off plan properties", href: null },
      ],
      stats,
    };
  }

  if (purpose === "for-sale") {
    return {
      image: "/Bg-Imgs/for-sale-bg.jpg",
      imageAlt: "Properties for sale in Dubai — H&S Real Estate",
      eyebrow,
      titleBefore: "Properties for sale",
      tagline: "Find your next home or investment.",
      description:
        "Browse ready and under-construction homes across Dubai. Filter by community, budget, and layout to shortlist with confidence.",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Properties for sale", href: null },
      ],
      stats,
    };
  }

  if (purpose === "for-rent") {
    return {
      image: "/Bg-Imgs/for-rent-bg.jpg",
      imageAlt: "Properties for rent in Dubai — H&S Real Estate",
      eyebrow,
      titleBefore: "Properties for rent",
      tagline: "Live where you belong.",
      description:
        "Yearly and flexible rental options across Dubai. Discover apartments and villas that fit your commute and lifestyle.",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Properties for rent", href: null },
      ],
      stats,
    };
  }

  return getPropertyListingHeroProps("for-sale");
}

const PropertiesListingPage = ({ purpose, offPlanCategorySlug = null, cmsData = null }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showExpertPopup, setShowExpertPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [propertyPurpose, setPropertyPurpose] = useState(null);
  const [propertyID, setPropertyID] = useState(null);

  const handleBookViewing = (image, purpose, id) => {
    setSelectedImage(image);
    setPropertyPurpose(purpose);
    setPropertyID(id);
    setShowPopup(true);
  };

  const propertyUrl = `https://hsproperty.ae/properties/${propertyPurpose}/${propertyID}`;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMapVisible, setIsMapVisible] = useState(false);
  // Holds all normalized CMS listings (full set for client-side filtering)
  const cmsBaseListRef = useRef([]);
  const [totalNbPages, setTotalNbPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const API_PAGE_SIZE = 25;

  const propertyType = searchParams.get("propertyType");
  const subOption = searchParams.get("subOption");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const bedrooms = searchParams.get("bedrooms");
  const location = searchParams.get("location");
  const brand = searchParams.get("brand");
  const locationId = searchParams.get("locationId");

  const optionsMap = {
    "for-sale": [
      { valueShown: "Ready", value: "completed" },
      { valueShown: "Off-Plan", value: "under-construction" },
      { valueShown: "All", value: "all" },
    ],
    "for-rent": [
      { valueShown: "Yearly", value: "yearly" },
      { valueShown: "Quarterly", value: "quarterly" },
      { valueShown: "Monthly", value: "monthly" },
      { valueShown: "Clear", value: "" },
    ],
  };

  const [formData, setFormData] = useState({
    propertyType: offPlanCategorySlug || (propertyType ?? ""),
    buyRent: purpose,
    sortBy: "",
    subOption: subOption ?? optionsMap[purpose]?.[0]?.value,
    priceMin: priceMin ?? "",
    priceMax: priceMax ?? "",
    bedrooms: bedrooms ?? "",
    brand: brand ?? "",
  });

  const bedroomsValues = [
    { valueShown: "Studio", value: 0 },
    { valueShown: 1, value: 1 },
    { valueShown: 2, value: 2 },
    { valueShown: 3, value: 3 },
    { valueShown: 4, value: 4 },
    { valueShown: 5, value: 5 },
    { valueShown: 6, value: 6 },
    { valueShown: 7, value: 7 },
  ];
  const bedroomsValuesOffPlan = [
    { valueShown: "Studio", value: "Studio" },
    { valueShown: 1, value: 1 },
    { valueShown: 2, value: 2 },
    { valueShown: 3, value: 3 },
    { valueShown: 4, value: 4 },
    { valueShown: 5, value: 5 },
    { valueShown: 6, value: 6 },
    { valueShown: 7, value: 7 },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /** When on `/properties/off-plan/[villa|apartment|townhouse]`, keep URL in sync with the type filter. */
  const handleOffPlanPropertyTypeSelect = (e) => {
    const v = (e.target.value || "").toLowerCase();
    setFormData((prev) => ({ ...prev, propertyType: v }));

    if (purpose !== "off-plan" || !offPlanCategorySlug) return;

    if (!v) {
      router.push("/properties/off-plan");
      return;
    }
    if (OFF_PLAN_ROUTE_TYPES.has(v)) {
      router.push(`/properties/off-plan/${v}`);
      return;
    }
    router.push(`/properties/off-plan?propertyType=${encodeURIComponent(v)}`);
  };

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null ?? location);
  const [selectedLocationId, setSelectedLocationId] = useState(null); // Store location ID for API
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Off-plan pagination state
  const [allOffPlanListings, setAllOffPlanListings] = useState([]);
  /** Off-plan: 12 per page = 6 cards + CTA + 6 cards, then Next page. */
  const itemsPerPage = purpose === "off-plan" ? 12 : 25;

  const handlePageChange = (e) => {
    setPage(Number(e.target.value));
    scrollToSection("propertyListing");
  };

  const belowTextSection = {
    "off-plan": {
      faqSectionTitle:
        "Frequently Asked Questions About Off-Plan Properties Dubai",
      question:
        "Property for Sale in Dubai — Premium Off-Plan Properties Dubai",
      answer: `
    <div>
      <p>Dubai continues to set the global benchmark for real estate investing, and off-plan properties in Dubai remain the most dynamic segment of this booming market. Whether you are searching for an off-plan villa for sale in Dubai, a branded apartment in a waterfront tower, or a family townhouse in a master-planned community, Dubai&apos;s 2026 off-plan market offers unmatched choice across every budget and lifestyle.</p>
      <br />
      <p>With flexible payment plans, strong capital appreciation, and high-demand locations from Palm Jebel Ali to Dubai Creek Harbour, off-plan properties in Dubai are redefining modern investment. H&amp;S Real Estate — Dubai&apos;s No.1 awarded real estate broker (Dubai Land Department, 2025) — provides investors with exclusive early access to the most sought-after launches from Emaar, Nakheel, DAMAC, Meraas, and 20+ top developers.</p>
      <br />
      <p>Working with one of the best real estate brokers in Dubai means more than just access to listings. It means getting honest market analysis, developer credibility checks, payment plan structuring, and full legal documentation support — everything a serious investor needs to make the right decision in a fast-moving market.</p>
      <br />
      <h2>Buy Off-Plan Property in Dubai — Your Gateway to Future Investments</h2>
      <p>Off-plan properties are real estate units sold by developers before construction is complete. Buyers purchase these properties based on approved floor plans, architect renderings, and masterplans — often securing a significantly lower price compared to ready-to-move-in units in the same area.</p>
      <br />
      <p>This makes buying off-plan property in Dubai one of the most popular strategies for investors looking to capitalize on Dubai&apos;s real estate market at competitive entry prices. In the UAE, off-plan projects are strictly regulated: the Dubai Land Department requires all developer funds to be held in RERA-monitored escrow accounts, and project approvals must be obtained before any units are sold — making Dubai&apos;s off-plan market one of the most secure in the world.</p>
      <br />
      <p>H&amp;S Real Estate simplifies the entire off-plan buying journey for both local and international investors. From shortlisting the right project to managing legal documentation and post-handover support, our RERA-certified brokers handle every step — making real estate investing in Dubai smooth, transparent, and stress-free. This end-to-end approach is what has earned H&amp;S Real Estate recognition as a top real estate agency in Dubai by investors seeking reliable, long-term returns.</p>
      <br />
      <h2>Best Off-Plan Properties Dubai 2026 — Top Investment Opportunities</h2>
      <p>Dubai&apos;s 2026 real estate market is packed with high-potential off-plan launches that cater to every investor profile — from luxury waterfront living to family communities and golf-front residences. H&amp;S Real Estate provides exclusive access to the most in-demand projects from Dubai&apos;s leading developers. Here are the best off-plan properties in Dubai worth considering this year:</p>
      <div class="overflow-x-auto my-6 -mx-1">
        <table class="min-w-full border-collapse text-left text-sm text-gray-700">
          <thead>
            <tr class="border-b-2 border-gray-900 bg-gray-50">
              <th class="py-3 px-3 font-custom font-semibold text-black">Community</th>
              <th class="py-3 px-3 font-custom font-semibold text-black">Developer / Type</th>
              <th class="py-3 px-3 font-custom font-semibold text-black">Location</th>
              <th class="py-3 px-3 font-custom font-semibold text-black">Why Invest</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/nad-al-sheba-gardens-phase-8-by-meraas" target="_blank" rel="noopener noreferrer">Nad Al Sheba Gardens — Phase 8</a></td>
              <td class="py-3 px-3">Meraas | Villas &amp; Townhouses</td>
              <td class="py-3 px-3">Nad Al Sheba, Dubai</td>
              <td class="py-3 px-3">Modern freehold community, parks, city connectivity</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/montiva-by-vida" target="_blank" rel="noopener noreferrer">Montiva by VIDA</a></td>
              <td class="py-3 px-3">Emaar / VIDA | Branded Apartments</td>
              <td class="py-3 px-3">Dubai Creek Harbour</td>
              <td class="py-3 px-3">Hotel-style amenities, skyline views, strong yield</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/riverside-views" target="_blank" rel="noopener noreferrer">DAMAC Riverside Views</a></td>
              <td class="py-3 px-3">DAMAC | Apartments</td>
              <td class="py-3 px-3">Dubai Investment Park</td>
              <td class="py-3 px-3">Resort-style living, green spaces, fast city access</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/albero-at-dubai-creek-harbour" target="_blank" rel="noopener noreferrer">Albero Tower by Emaar</a></td>
              <td class="py-3 px-3">Emaar | Off-Plan Apartments</td>
              <td class="py-3 px-3">Dubai Creek Harbour</td>
              <td class="py-3 px-3">Modern layouts, lifestyle amenities, Emaar trust</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/selvara-grand-polo-club-and-resort" target="_blank" rel="noopener noreferrer">Selvara — Grand Polo Club &amp; Resort</a></td>
              <td class="py-3 px-3">Emaar | Luxury Villas &amp; Residences</td>
              <td class="py-3 px-3">Grand Polo, Dubai</td>
              <td class="py-3 px-3">Resort community, wellness amenities, high ROI</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/mina-rashid-by-emaar" target="_blank" rel="noopener noreferrer">Mina Rashid by Emaar</a></td>
              <td class="py-3 px-3">Emaar | Apartments &amp; Penthouses</td>
              <td class="py-3 px-3">Mina Rashid, Dubai</td>
              <td class="py-3 px-3">Waterfront living, rental appeal, iconic location</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-hills-estate" target="_blank" rel="noopener noreferrer">Dubai Hills Estate</a></td>
              <td class="py-3 px-3">Emaar | Villas, TH &amp; Apartments</td>
              <td class="py-3 px-3">Dubai Hills, Dubai</td>
              <td class="py-3 px-3">Premium master-planned, ideal for families &amp; investors</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/the-valley" target="_blank" rel="noopener noreferrer">The Valley by Emaar</a></td>
              <td class="py-3 px-3">Emaar | Villas &amp; Townhouses</td>
              <td class="py-3 px-3">Dubai–Al Ain Road</td>
              <td class="py-3 px-3">Affordable off-plan, excellent growth prospects</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-creek-harbour" target="_blank" rel="noopener noreferrer">Dubai Creek Harbour</a></td>
              <td class="py-3 px-3">Emaar | Apts, Villas &amp; TH</td>
              <td class="py-3 px-3">Ras Al Khor, Dubai</td>
              <td class="py-3 px-3">Iconic waterfront, skyline views, high demand</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/the-oasis" target="_blank" rel="noopener noreferrer">The Oasis by Emaar</a></td>
              <td class="py-3 px-3">Emaar | Ultra-Luxury Villas</td>
              <td class="py-3 px-3">MBR City, Dubai</td>
              <td class="py-3 px-3">High-net-worth buyers, ultra-luxury positioning</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/palm-jebel-ali" target="_blank" rel="noopener noreferrer">Palm Jebel Ali</a></td>
              <td class="py-3 px-3">Nakheel | Luxury Villas</td>
              <td class="py-3 px-3">Palm Jebel Ali, Dubai</td>
              <td class="py-3 px-3">Dubai&apos;s next iconic island, long-term capital growth</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-maritime-city" target="_blank" rel="noopener noreferrer">Dubai Maritime City</a></td>
              <td class="py-3 px-3">DMCA | Residential &amp; Commercial</td>
              <td class="py-3 px-3">Dubai Maritime City</td>
              <td class="py-3 px-3">Coastal hub, strong demand, future appreciation</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3"><a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/blogs/damac-hills-1-vs-damac-hills-2" target="_blank" rel="noopener noreferrer">Grand Polo Club &amp; Resort</a></td>
              <td class="py-3 px-3">DAMAC | Luxury Villas</td>
              <td class="py-3 px-3">Damac Hills 2, Dubai</td>
              <td class="py-3 px-3">Unique leisure &amp; exclusivity, resort lifestyle</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>These projects highlight why H&amp;S Real Estate is a preferred choice for luxury real estate Dubai and off-plan investment across all price points. Our team provides early access to launches, honest comparisons between projects, and clear guidance based on your individual investment goals — qualities that consistently earn us recognition as one of the top real estate brokers in Dubai.</p>
      <br />
      <h2>Properties for Sale in Dubai — Why Choose Off-Plan?</h2>
      <p>Dubai&apos;s off-plan market offers a diverse portfolio of property types, each designed to meet the specific needs of different investors and residents. Here is why choosing off-plan in Dubai makes compelling investment sense in 2026:</p>
      <ul class="list-disc space-y-3 pl-5 my-4 text-gray-700">
        <li><strong>Dubai Golf Course Communities</strong> — Set amidst sprawling championship golf courses, developments like <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/grand-polo-club" target="_blank" rel="noopener noreferrer">Grand Polo Club &amp; Resort</a> and <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-hills-estate" target="_blank" rel="noopener noreferrer">Dubai Hills Estate</a> offer luxury real estate Dubai living with premium amenities, greenery, and a leisure-focused lifestyle that drives both rental demand and long-term capital value.</li>
        <li><strong>Luxury Villa Collections</strong> — High-end off-plan villas in Dubai, including <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/the-oasis" target="_blank" rel="noopener noreferrer">The Oasis by Emaar</a> and <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/palm-jebel-ali" target="_blank" rel="noopener noreferrer">Palm Jebel Ali</a>, blend modern architecture with serene natural surroundings. These ultra-luxury developments are specifically designed for high-net-worth investors seeking exclusive off-plan villa for sale in Dubai.</li>
        <li><strong>Family Communities</strong> — Master-planned developments like <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/nad-al-sheba-gardens-phase-8-by-meraas" target="_blank" rel="noopener noreferrer">Nad Al Sheba Gardens Phase 8 (Meraas)</a>, <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/the-valley" target="_blank" rel="noopener noreferrer">The Valley by Emaar</a>, and <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-hills-estate" target="_blank" rel="noopener noreferrer">Dubai Hills Estate</a> feature spacious villas and townhouses, family parks, schools, and healthcare facilities — making them top picks for families and long-term residents.</li>
        <li><strong>Contemporary Townhouses</strong> — Located across family-friendly neighborhoods with lush landscapes and recreational areas, off-plan townhouses in Dubai offer the ideal balance of space, community living, and strong rental yields for investors in the real estate investing space.</li>
        <li><strong>Iconic High-Rises</strong> — Branded towers like <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/montiva-by-vida" target="_blank" rel="noopener noreferrer">Montiva by VIDA</a> and <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/properties/off-plan/albero-at-dubai-creek-harbour" target="_blank" rel="noopener noreferrer">Albero Tower by Emaar</a> in <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-creek-harbour" target="_blank" rel="noopener noreferrer">Dubai Creek Harbour</a> combine luxurious apartments with innovative architecture, hotel-style amenities, and waterfront views — delivering strong returns for both rental income and capital appreciation.</li>
        <li><strong>Premium Waterfront Developments</strong> — <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/mina-rashid-by-emaar" target="_blank" rel="noopener noreferrer">Mina Rashid by Emaar</a> and <a class="font-semibold text-black underline-offset-2 hover:underline" href="https://hsproperty.ae/dubai-maritime-city" target="_blank" rel="noopener noreferrer">Dubai Maritime City</a> offer waterfront living with strong lifestyle and rental appeal — the type of luxury real estate Dubai investors have consistently outperformed the market on over the last decade.</li>
      </ul>
      <p>Choosing the right off-plan project requires deep market knowledge, developer credibility assessment, and honest advisory. As one of the best real estate brokers in Dubai with 150+ verified industry awards, H&amp;S Real Estate ensures every client makes an informed, confident investment decision.</p>
      <br />
      <h2>What Makes H&amp;S Real Estate a Trusted Name in Dubai Real Estate?</h2>
      <p>In a competitive market filled with real estate brokers in Dubai, H&amp;S Real Estate has built a reputation that goes beyond sales volumes. Since 2016, we have been independently recognized by every major developer and government authority in the UAE — earning 150+ verified industry awards across 10 consecutive years.</p>
      <p>What truly sets H&amp;S Real Estate apart as a top real estate agency in Dubai is our commitment to transparency, personalized advice, and long-term client relationships. We do not just sell properties — we guide investors through:</p>
      <ul class="list-disc space-y-3 pl-5 my-4 text-gray-700">
        <li><strong>Market analysis and project selection</strong> — identifying the highest-potential off-plan opportunities</li>
        <li><strong>Developer credibility checks</strong> — we only recommend projects from proven, RERA-approved developers</li>
        <li><strong>Payment plan structuring</strong> — negotiating the most favorable terms for your budget and goals</li>
        <li><strong>Legal documentation and post-sales support</strong> — from SPA signing to DLD title deed registration</li>
        <li><strong>After-handover advisory</strong> — rental management, resale strategy, and portfolio review</li>
      </ul>
      <p>This expert-driven approach — backed by government recognition as Dubai&apos;s No.1 Sales Company (DLD, 2025) and No.1 Company in UAE (Nakheel, 2025) — is why H&amp;S Real Estate is consistently named among the top real estate brokers in Dubai by investors seeking reliable, profitable opportunities.</p>
      <div class="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <p class="font-custom text-2xl font-bold text-black">150+</p>
          <p class="mt-1 text-xs font-custom2 text-gray-600">Industry Awards</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <p class="font-custom text-lg font-bold leading-tight text-black">DLD No.1</p>
          <p class="mt-1 text-xs font-custom2 text-gray-600">Sales Company UAE 2025</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <p class="font-custom text-2xl font-bold text-black">$1B+</p>
          <p class="mt-1 text-xs font-custom2 text-gray-600">Sales Record</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <p class="font-custom text-2xl font-bold text-black">35+</p>
          <p class="mt-1 text-xs font-custom2 text-gray-600">Years Experience</p>
        </div>
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center col-span-2 sm:col-span-1 lg:col-span-1">
          <p class="font-custom text-2xl font-bold text-black">30 min</p>
          <p class="mt-1 text-xs font-custom2 text-gray-600">Response Guarantee</p>
        </div>
      </div>
      <div class="overflow-x-auto my-6 -mx-1">
        <table class="min-w-full border-collapse text-left text-sm text-gray-700">
          <thead>
            <tr class="border-b-2 border-gray-900 bg-gray-50">
              <th class="py-3 px-3 font-custom font-semibold text-black">Award / Credential</th>
              <th class="py-3 px-3 font-custom font-semibold text-black">What It Means for Your Investment</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3 font-semibold text-black">DLD No.1 Sales Company in UAE</td>
              <td class="py-3 px-3">2025 — Government&apos;s highest broker designation. The most authoritative trust signal in UAE real estate.</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3 font-semibold text-black">Emaar Annual Broker Award</td>
              <td class="py-3 px-3">Every year 2017–2025 — Top 20 brokerages from hundreds across the UAE, recognized at Armani Hotel Dubai.</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3 font-semibold text-black">Nakheel No.1 Company in UAE</td>
              <td class="py-3 px-3">2025 — Highest national sales across all Nakheel projects. Verified by developer.</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3 font-semibold text-black">Meraas Black Onyx Platinum</td>
              <td class="py-3 px-3">3 Consecutive Years — Platinum-tier recognition for sustained top-tier performance.</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3 font-semibold text-black">RERA Certified Agents</td>
              <td class="py-3 px-3">All advisors fully licensed under Dubai&apos;s regulatory framework.</td>
            </tr>
            <tr class="border-b border-gray-200 align-top">
              <td class="py-3 px-3 font-semibold text-black">150+ Total Awards (2016–2025)</td>
              <td class="py-3 px-3">No other independent brokerage in the UAE holds a comparable multi-developer award record.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
      faqItems: offPlanListingFaqItems,
    },
    "for-sale": {
      question:
        "Property for Sale in Dubai - Your Gateway to Premium Real Estate",
      answer: `
    <div>
      <p>Dubai's real estate market offers exceptional opportunities for investors and homebuyers seeking property for sale in Dubai. From luxury villas to modern apartments, the emirate presents a diverse portfolio of properties for sale in Dubai that cater to every lifestyle and budget. Whether you're looking to buy property in Dubai for investment or residence, the market provides unmatched value and growth potential.</p><br>

      <h2>Buy Property in Dubai - Prime Investment Destinations 2025</h2>
      <p>The demand for property for sale in Dubai continues to surge as the city establishes itself as a global hub. Smart investors recognize the advantages of choosing to buy property in Dubai, including tax-free ownership, world-class infrastructure, and strong rental yields. The current market conditions make it an ideal time to explore properties for sale in Dubai.</p><br>

      <h2>Premium Properties for Sale in Dubai - Top Locations</h2>
      <ul>
        <li><strong>Downtown Dubai:</strong> Iconic developments featuring luxury apartments and penthouses</li>
        <li><strong>Dubai Marina:</strong> Waterfront living with stunning canal and sea views</li>
        <li><strong>Palm Jumeirah:</strong> Exclusive island properties with private beaches</li>
        <li><strong>Jumeirah Beach Residence (JBR):</strong> Beachfront apartments with resort-style amenities</li>
        <li><strong>Business Bay:</strong> Modern high-rises perfect for professionals and investors</li>
        <li><strong>Dubai Hills Estate:</strong> Family-friendly villas and townhouses</li>
        <li><strong>Arabian Ranches:</strong> Gated community living with golf course views</li>
        <li><strong>Jumeirah Village Circle (JVC):</strong> Affordable yet premium residential options</li>
        <li><strong>Dubai South:</strong> Emerging area with excellent growth potential</li>
        <li><strong>Sobha Hartland:</strong> Luxury waterfront community development</li>
      </ul><br>

      <h2>Buy Property in Dubai - Investment Benefits</h2>
      <ul>
        <li><strong>Tax-Free Investment:</strong> No capital gains or income tax on property investments</li>
        <li><strong>Freehold Ownership:</strong> Full ownership rights for international buyers in designated areas</li>
        <li><strong>High Rental Yields:</strong> Average returns of 5-8% annually</li>
        <li><strong>Strategic Location:</strong> Gateway between East and West for global business</li>
        <li><strong>World-Class Infrastructure:</strong> Modern transportation, healthcare, and education systems</li>
        <li><strong>Stable Economy:</strong> Business-friendly environment with strong economic fundamentals</li>
      </ul><br>

      <h2>Properties for Sale in Dubai - Property Types Available</h2>
      <ul>
        <li><strong>Luxury Villas:</strong> Spacious family homes with private pools and gardens in premium communities</li>
        <li><strong>Modern Apartments:</strong> Contemporary units with state-of-the-art amenities and stunning views</li>
        <li><strong>Townhouses:</strong> Perfect balance of space and community living</li>
        <li><strong>Penthouses:</strong> Ultra-luxury living with panoramic city or sea views</li>
        <li><strong>Commercial Properties:</strong> Retail spaces, offices, and mixed-use developments</li>
      </ul><br>

      <h2>Frequently Asked Questions About Property for Sale in Dubai</h2>
    </div>
  `,
      faqItems: forSaleListingFaqItems,
    },
    "for-rent": {
      question: "Properties for Rent in Dubai - Premium Rental Market",
      answer: `
    <div>
      <p>Dubai's rental market offers exceptional properties for rent in Dubai, catering to diverse lifestyles and budgets. Whether you're seeking a luxury villa, modern apartment, or commercial space, the emirate provides world-class property for rent in Dubai options with flexible lease terms and competitive rates. The city's strategic location and business-friendly environment make it an ideal destination for rent to own properties in Dubai arrangements.</p><br>

      <h2>Property for Rent in Dubai - Prime Residential Areas</h2>
      <ul>
        <li><strong>Downtown Dubai:</strong> Luxury apartments near Burj Khalifa and Dubai Mall</li>
        <li><strong>Dubai Marina:</strong> Waterfront living with yacht club access and beach proximity</li>
        <li><strong>Jumeirah Beach Residence (JBR):</strong> Beachfront apartments with resort amenities</li>
        <li><strong>Arabian Ranches:</strong> Family villas with golf course views and community facilities</li>
        <li><strong>Dubai Hills Estate:</strong> Modern homes with parks and recreational areas</li>
        <li><strong>Business Bay:</strong> Contemporary apartments perfect for professionals</li>
        <li><strong>Palm Jumeirah:</strong> Exclusive island properties with private beaches</li>
        <li><strong>Jumeirah Village Circle (JVC):</strong> Affordable premium residential options</li>
        <li><strong>Dubai South:</strong> Emerging area with modern amenities and facilities</li>
        <li><strong>The Springs:</strong> Gated community with lakes and recreational facilities</li>
      </ul><br>

      <h2>Rent to Own Properties in Dubai - Flexible Ownership Solutions</h2>
      <p>For those interested in rent to own properties in Dubai, the market offers innovative solutions that combine rental flexibility with ownership potential. These arrangements allow tenants to gradually build equity while enjoying their chosen property, making homeownership more accessible for international residents and investors.</p><br>

      <h2>Properties for Rent in Dubai - Rental Process and Requirements</h2>
      <h3>Documentation Required:</h3>
      <ul>
        <li>Valid passport and visa</li>
        <li>Emirates ID (for residents)</li>
        <li>Salary certificate or employment contract</li>
        <li>Bank statements (last 3-6 months)</li>
        <li>Security deposit (typically 5-10% of annual rent)</li>
      </ul>
      <h3>Rental Payment Methods:</h3>
      <ul>
        <li>Single payment (often with discount)</li>
        <li>Two payments (bi-annually)</li>
        <li>Four payments (quarterly)</li>
        <li>Monthly payments (with service charges)</li>
      </ul><br>

      <h2>Property for Rent in Dubai - Amenities and Features</h2>
      <ul>
        <li><strong>Residential Communities:</strong> Swimming pools, gyms, children's play areas, and 24/7 security</li>
        <li><strong>Luxury Apartments:</strong> Concierge services, valet parking, and rooftop facilities</li>
        <li><strong>Villa Communities:</strong> Private pools, gardens, golf course access, and clubhouses</li>
        <li><strong>Commercial Spaces:</strong> Modern fit-outs, parking, and business support services</li>
      </ul><br>

      <h2>Properties for Rent in Dubai - Market Insights 2025</h2>
      <ul>
        <li><strong>Stable Rental Yields:</strong> Average 5-8% annual returns for property owners</li>
        <li><strong>Growing Demand:</strong> Increasing expatriate population driving rental demand</li>
        <li><strong>Diverse Options:</strong> From studio apartments to luxury mansions</li>
        <li><strong>Flexible Terms:</strong> Various lease options from 1 month to multi-year contracts</li>
        <li><strong>Prime Locations:</strong> Access to world-class dining, shopping, and entertainment</li>
      </ul><br>

      <h2>Frequently Asked Questions About Properties for Rent in Dubai</h2>
    </div>
  `,
      faqItems: forRentListingFaqItems,
    },
  };

  const aboveTextSection = {
    "off-plan": `
    <p>H&S Real Estate connects you with Dubai’s most sought-after off plan property developments, offering early access to high-demand projects with strong growth potential. Whether you’re seeking luxury beachfront apartments or innovative community living, we ensure you secure the right investment at the right stage. To support your purchase journey, we partner with trusted <a style="font-weight:700;" href="https://hsproperty.ae/mortgages">mortgage broker Dubai</a> experts who provide tailored financing solutions, making it easier for you to turn your investment plans into reality.</p>
    `,
    "for-sale": `
    <p>At H&S Real Estate, we present a handpicked collection of premium properties for sale in Dubai, ranging from modern city apartments to elegant villas in exclusive communities. Designed for homeowners and investors alike, our portfolio reflects the best of Dubai’s thriving real estate market. In addition to purchase opportunities, our expert team can also guide you through <a style="font-weight:700;" href="https://hsproperty.ae/properties/for-rent">properties for rent in Dubai</a>, ensuring you have the flexibility to explore both ownership and rental options that suit your lifestyle and investment goals.</p>
    `,
    "for-rent": `
    <p>Explore a diverse range of properties for rent in Dubai with H&S Real Estate: from stylish studios in the city’s vibrant hubs to spacious family residences in serene neighborhoods. We match every client with the right home for their needs, budget, and preferred location. And if you’re thinking about your next big investment, our specialists can also introduce you to exclusive <a style="font-weight:700;" href="https://hsproperty.ae/properties/off-plan">off plan property</a> opportunities in Dubai, enabling you to secure future-ready residences while enjoying your ideal rental today.</p>
    `,
  };

  // ---------------------------------------------------------------------------
  // CMS helpers — only active for for-sale / for-rent with server-provided data
  // ---------------------------------------------------------------------------

  const normalizeCmsProperty = (item) => {
    const getImg = () =>
      item.media?.cover_photo ||
      item.cover_photo ||
      item.featured_image ||
      item.image ||
      item.thumbnail ||
      "/placeholder-property.jpg";

    const getLocation = () => {
      if (Array.isArray(item.location)) {
        return item.location.map((l) =>
          typeof l === "string" ? { name: l } : l?.name ? l : { name: String(l) }
        );
      }
      // Real API shape: { country, city, community, sub_community, cluster, coordinates }
      if (item.location && typeof item.location === "object" && !item.location.name) {
        const locs = [];
        if (item.location.community?.name) locs.push({ name: item.location.community.name });
        if (item.location.sub_community?.name) locs.push({ name: item.location.sub_community.name });
        if (item.location.city?.name) locs.push({ name: item.location.city.name });
        return locs.length > 0 ? locs : [{ name: "Dubai" }];
      }
      if (item.location?.name) return [item.location];
      if (typeof item.location === "string" && item.location) return [{ name: item.location }];
      if (item.community) return [{ name: item.community }];
      if (item.area_name) return [{ name: item.area_name }];
      return [{ name: "Dubai" }];
    };

    const getArea = () => {
      const raw =
        item.area?.built_up ?? item.area?.size ?? item.area ??
        item.size ?? item.square_feet ?? item.sqft ?? 0;
      if (typeof raw === "object" && raw !== null) {
        const v = parseFloat(raw.built_up ?? raw.size ?? 0);
        return isNaN(v) ? 0 : v;
      }
      const v = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
      return isNaN(v) ? 0 : v;
    };

    const completionStatus =
      item.details?.completion_status ||
      item.completion_status ||
      item.completionStatus ||
      item.status ||
      "";

    return {
      slug: item.slug || String(item.id),
      id: item.id,
      title: item.title || item.name || "",
      price: Number(item.price) || 0,
      rooms: Number(item.bedrooms ?? item.rooms ?? item.details?.bedrooms ?? 0),
      baths: Number(item.bathrooms ?? item.baths ?? item.details?.bathrooms ?? 0),
      area: (() => { const raw = getArea(); const unit = item.area?.unit || item.area_unit || "sqm"; return unit === "sqm" ? Math.round(raw * 10.76391041671) : raw; })(),
      areaUnit: "sqft",
      coverPhoto: { url: getImg() },
      location: getLocation(),
      geography: {
        lat: item.location?.coordinates?.lat ?? item.latitude ?? item.lat ?? item.geography?.lat ?? null,
        lng: item.location?.coordinates?.lng ?? item.longitude ?? item.lng ?? item.geography?.lng ?? null,
      },
      purpose: item.purpose || purpose,
      category: [{ name: item.property_type || item.type?.sub || item.type?.main || item.type || "" }],
      completionStatus,
      createdAt: item.created_at || item.meta?.created_at
        ? Math.floor(new Date(item.created_at || item.meta?.created_at).getTime() / 1000)
        : Math.floor(Date.now() / 1000),
      price_period: item.price_period || "",
    };
  };

  // Populate cmsBaseListRef whenever the server-provided data changes
  useEffect(() => {
    if (!cmsData) return;
    const rawList =
      cmsData?.data ||
      cmsData?.results ||
      (Array.isArray(cmsData) ? cmsData : []);
    cmsBaseListRef.current = rawList.map(normalizeCmsProperty);
  }, [cmsData]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Ensure cmsBaseListRef is populated before filtering (handles initial render race). */
  const ensureCmsBaseList = () => {
    if (cmsBaseListRef.current.length === 0 && cmsData) {
      const rawList =
        cmsData?.data ||
        cmsData?.results ||
        (Array.isArray(cmsData) ? cmsData : []);
      cmsBaseListRef.current = rawList.map(normalizeCmsProperty);
    }
  };

  const applyCmsFilters = (page) => {
    ensureCmsBaseList();
    const convertCurrency = (v) =>
      typeof v === "string" ? parseInt(v.replace(/[^0-9]/g, ""), 10) : v;

    let filtered = cmsBaseListRef.current.filter((item) => {
      // Location text search
      if (selectedLocation) {
        const locMatch = item.location?.some((l) =>
          (l?.name || "").toLowerCase().includes(selectedLocation.toLowerCase())
        );
        if (!locMatch) return false;
      }

      // Bedrooms
      if (formData.bedrooms !== "" && formData.bedrooms !== null && formData.bedrooms !== undefined) {
        const bds = parseInt(formData.bedrooms);
        if (!isNaN(bds) && item.rooms !== bds) return false;
      }

      // Price range
      if (formData.priceMin) {
        const min = convertCurrency(formData.priceMin);
        if (!isNaN(min) && item.price < min) return false;
      }
      if (formData.priceMax) {
        const max = convertCurrency(formData.priceMax);
        if (!isNaN(max) && item.price > max) return false;
      }

      // Property type
      if (formData.propertyType) {
        const typeLower = formData.propertyType.toLowerCase().trim();
        const catLower = (item.category?.[0]?.name || "").toLowerCase();
        if (catLower && !catLower.includes(typeLower) && !typeLower.includes(catLower)) return false;
      }

      // Completion status (for-sale sub-option)
      if (formData.subOption && formData.subOption !== "all" && purpose === "for-sale") {
        const cs = (item.completionStatus || "").toLowerCase();
        if (formData.subOption === "completed" && !cs.includes("complet")) return false;
        if (formData.subOption === "under-construction" && cs.includes("complet")) return false;
      }

      // Price period (for-rent sub-option)
      if (formData.subOption && purpose === "for-rent") {
        const period = (item.price_period || "yearly").toLowerCase();
        if (period !== formData.subOption.toLowerCase()) return false;
      }

      return true;
    });

    // Sort
    if (formData.sortBy === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (formData.sortBy === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (formData.sortBy === "date-desc") {
      filtered = filtered.sort((a, b) => b.createdAt - a.createdAt);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalNbPages(totalPages || 1);
    setHasNextPage(page < totalPages - 1);

    const start = page * itemsPerPage;
    setListings(filtered.slice(start, start + itemsPerPage));
    setLoading(false);
  };

  // ---------------------------------------------------------------------------

  const fetchListings = async (page) => {
    // CMS path for for-sale / for-rent
    if (cmsData && purpose !== "off-plan") {
      applyCmsFilters(page);
      return;
    }

    if (purpose === "off-plan") {
      const filteredListings = applyCustomOffPlanFilters(offPlanListings);
      setAllOffPlanListings(filteredListings);

      const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
      setTotalNbPages(totalPages);
      setHasNextPage(page < totalPages - 1);

      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentPageListings = filteredListings.slice(startIndex, endIndex);

      setListings(currentPageListings);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const requestBody = {
        purpose: purpose,
      };

      // categories: array of strings per API docs
      if (formData.propertyType) {
        const categoryMap = {
          apartment: "apartments",
          apartments: "apartments",
          villa: "villas",
          villas: "villas",
          townhouse: "townhouses",
          townhouses: "townhouses",
          penthouse: "penthouse",
          plot: "residential-plots",
          "retail space": "shops",
        };
        const normalizedType = formData.propertyType.toLowerCase().trim();
        const category = categoryMap[normalizedType];
        if (category) {
          requestBody.categories = [category];
        }
      }

      // is_completed: boolean per API docs ("all" means no filter)
      if (formData.subOption && purpose === "for-sale" && formData.subOption !== "all") {
        if (formData.subOption === "completed") {
          requestBody.is_completed = true;
        } else if (formData.subOption === "under-construction") {
          requestBody.is_completed = false;
        }
      }

      // rooms: array of integers per API docs
      if (formData.bedrooms !== "" && formData.bedrooms !== null && formData.bedrooms !== undefined) {
        const bedroomsValue = parseInt(formData.bedrooms);
        if (!isNaN(bedroomsValue)) {
          requestBody.rooms = [bedroomsValue];
        }
      }

      if (formData.priceMin) {
        const priceMin = parseInt(String(formData.priceMin).replace(/AED|\s|,/g, ""));
        if (!isNaN(priceMin)) {
          requestBody.price_min = priceMin;
        }
      }
      if (formData.priceMax) {
        const priceMax = parseInt(String(formData.priceMax).replace(/AED|\s|,/g, ""));
        if (!isNaN(priceMax)) {
          requestBody.price_max = priceMax;
        }
      }

      // price_period filter for for-rent
      if (formData.subOption && purpose === "for-rent") {
        requestBody.price_period = formData.subOption;
      }

      // index: sort parameter per API docs
      const sortMap = {
        "verified-score": "popular",
        "date-desc": "latest",
        "price-asc": "lowest_price",
        "price-desc": "highest_price",
      };
      if (formData.sortBy && sortMap[formData.sortBy]) {
        requestBody.index = sortMap[formData.sortBy];
      }

      if (selectedLocationId) {
        requestBody.locations_ids = [selectedLocationId];
      }

      // Server-cached Bayut proxy — same body shape, fewer RapidAPI calls
      const response = await axios.post("/api/bayut/properties-search", {
        page,
        ...requestBody,
      });

      const responseData = response.data;

      const filteredData = applyCustomFilters(responseData);

      // API returns { results, count, page } where count is per-page count (not grand total).
      // Infer pagination from whether we got a full page of results.
      const rawHits = responseData.results || responseData.hits || responseData.data || (Array.isArray(responseData) ? responseData : []);
      const gotFullPage = rawHits.length >= API_PAGE_SIZE;
      setHasNextPage(gotFullPage);
      setTotalNbPages(gotFullPage ? page + 2 : page + 1);

      setListings(filteredData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setError("Error Fetching Properties");
      setLoading(false);
    }
  };

  // Helper function to normalize property data from API response
  const normalizeProperty = (property) => {
    // Extract cover photo URL - New API structure: media.cover_photo
    const getImageUrl = (prop) => {
      // New API structure: media.cover_photo (direct string URL)
      if (prop.media?.cover_photo) {
        return prop.media.cover_photo;
      }
      // Try media.photos array (first photo)
      if (prop.media?.photos && Array.isArray(prop.media.photos) && prop.media.photos.length > 0) {
        return prop.media.photos[0];
      }
      // Fallback to old structures
      if (prop.coverPhoto?.url) return prop.coverPhoto.url;
      if (prop.coverPhoto && typeof prop.coverPhoto === "string") return prop.coverPhoto;
      if (prop.thumbnail?.url) return prop.thumbnail.url;
      if (prop.thumbnail && typeof prop.thumbnail === "string") return prop.thumbnail;
      if (prop.images && Array.isArray(prop.images) && prop.images.length > 0) {
        const firstImg = prop.images[0];
        if (typeof firstImg === "string") return firstImg;
        if (firstImg?.url) return firstImg.url;
      }
      return "/placeholder-property.jpg"; // Fallback image
    };

    // Extract location - PropertyCardBig expects an array of objects with name property
    const getLocation = (prop) => {
      // If it's already an array, return it
      if (Array.isArray(prop.location)) {
        // Ensure each item has a name property
        return prop.location.map(item => 
          typeof item === "string" ? { name: item } : (item?.name ? item : { name: String(item) })
        );
      }
      // If it's an object with name, wrap it in array
      if (prop.location?.name) {
        return [prop.location];
      }
      // If it's a string, convert to array format
      if (typeof prop.location === "string") {
        return [{ name: prop.location }];
      }
      // If locations array exists
      if (Array.isArray(prop.locations)) {
        return prop.locations.map(item => 
          typeof item === "string" ? { name: item } : (item?.name ? item : { name: String(item) })
        );
      }
      // Try location hierarchy (common in real estate APIs)
      if (prop.location?.level1 || prop.location?.level2 || prop.location?.level3) {
        const locs = [];
        if (prop.location.level1) locs.push({ name: prop.location.level1 });
        if (prop.location.level2) locs.push({ name: prop.location.level2 });
        if (prop.location.level3) locs.push({ name: prop.location.level3 });
        return locs.length > 0 ? locs : [{ name: "Dubai" }];
      }
      // Fallback to Dubai
      return [{ name: "Dubai" }];
    };

    // Extract area/size - PropertyCardBig expects a number in sqft
    const getArea = (prop) => {
      // New API returns area as object: { built_up: 37.07, plot: null, unit: "sqm" }
      if (prop.area && typeof prop.area === "object") {
        const builtUp = parseFloat(prop.area.built_up);
        if (!isNaN(builtUp) && builtUp > 0) return builtUp;
        const plot = parseFloat(prop.area.plot);
        if (!isNaN(plot) && plot > 0) return plot;
      }
      if (typeof prop.area === "number" && prop.area > 0) return prop.area;
      if (prop.area && prop.area !== 0 && typeof prop.area !== "object") {
        const num = parseFloat(String(prop.area).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      // Try size field (common in some APIs)
      if (typeof prop.size === "number" && prop.size > 0) return prop.size;
      if (prop.size) {
        const num = parseFloat(String(prop.size).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      // Try details.area (if nested)
      if (prop.details?.area) {
        const num = parseFloat(String(prop.details.area).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      // Try other area field variations
      if (prop.areaRange) {
        const num = parseFloat(String(prop.areaRange).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      if (prop.sqft) {
        const num = parseFloat(String(prop.sqft).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      if (prop.squareFeet) {
        const num = parseFloat(String(prop.squareFeet).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      if (prop.areaSize) {
        const num = parseFloat(String(prop.areaSize).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      // Try nested area structures
      if (prop.area?.size) {
        const num = parseFloat(String(prop.area.size).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      if (prop.area?.min) {
        const num = parseFloat(String(prop.area.min).replace(/[^0-9.]/g, ""));
        if (!isNaN(num) && num > 0) return num;
      }
      // If area is 0 or missing, return 0 (component will handle display)
      return 0;
    };

    // Extract category/type - New API: type.sub or type.main
    const getCategory = (prop) => {
      // New API structure: type.sub or type.main
      if (prop.type) {
        if (prop.type.sub) {
          return [{ name: prop.type.sub }];
        }
        if (prop.type.main) {
          return [{ name: prop.type.main }];
        }
        // If type is an object with name
        if (prop.type.name) {
          return [{ name: prop.type.name }];
        }
        // If it's an array
        if (Array.isArray(prop.type)) {
          return prop.type.map(item => 
            typeof item === "string" ? { name: item } : (item?.name ? item : { name: String(item) })
          );
        }
        // If it's a string
        if (typeof prop.type === "string") {
          return [{ name: prop.type }];
        }
      }
      // Fallback to old structures
      if (prop.category) {
        if (Array.isArray(prop.category)) {
          return prop.category.map(item => 
            typeof item === "string" ? { name: item } : (item?.name ? item : { name: String(item) })
          );
        }
        if (typeof prop.category === "string") {
          return [{ name: prop.category }];
        }
        if (prop.category.name) {
          return [prop.category];
        }
        if (prop.category.slug) {
          return [{ name: prop.category.slug }];
        }
      }
      return [{ name: "" }];
    };

    // Extract price - ensure it's a number
    const getPrice = (prop) => {
      if (typeof prop.price === "number") return prop.price;
      if (prop.price) {
        const num = parseFloat(String(prop.price).replace(/[^0-9.]/g, ""));
        if (!isNaN(num)) return num;
      }
      return 0;
    };

    // Extract rooms/bedrooms - New API: details.bedrooms
    const getRooms = (prop) => {
      // New API structure: details.bedrooms
      if (typeof prop.details?.bedrooms === "number") return prop.details.bedrooms;
      if (prop.details?.bedrooms) {
        const num = parseInt(prop.details.bedrooms);
        if (!isNaN(num)) return num;
      }
      // Fallback to old structures
      if (typeof prop.rooms === "number") return prop.rooms;
      if (prop.rooms) {
        const num = parseInt(prop.rooms);
        if (!isNaN(num)) return num;
      }
      if (prop.bedrooms) {
        const num = parseInt(prop.bedrooms);
        if (!isNaN(num)) return num;
      }
      return 0;
    };

    // Extract baths - New API: details.bathrooms
    const getBaths = (prop) => {
      // New API structure: details.bathrooms
      if (typeof prop.details?.bathrooms === "number") return prop.details.bathrooms;
      if (prop.details?.bathrooms) {
        const num = parseInt(prop.details.bathrooms);
        if (!isNaN(num)) return num;
      }
      // Fallback to old structures
      if (typeof prop.baths === "number") return prop.baths;
      if (prop.baths) {
        const num = parseInt(prop.baths);
        if (!isNaN(num)) return num;
      }
      if (prop.bathrooms) {
        const num = parseInt(prop.bathrooms);
        if (!isNaN(num)) return num;
      }
      return 0;
    };

    // Extract createdAt date - New API: meta.created_at
    const getCreatedAt = (prop) => {
      // New API structure: meta.created_at (date string)
      if (prop.meta?.created_at) {
        const date = new Date(prop.meta.created_at);
        if (!isNaN(date.getTime())) return Math.floor(date.getTime() / 1000);
      }
      // Fallback to old structures
      if (prop.createdAt) {
        // If it's already a timestamp (number)
        if (typeof prop.createdAt === "number") return prop.createdAt;
        // If it's a date string, convert to timestamp
        const date = new Date(prop.createdAt);
        if (!isNaN(date.getTime())) return Math.floor(date.getTime() / 1000);
      }
      if (prop.created_at) {
        const date = new Date(prop.created_at);
        if (!isNaN(date.getTime())) return Math.floor(date.getTime() / 1000);
      }
      if (prop.meta?.updated_at) {
        const date = new Date(prop.meta.updated_at);
        if (!isNaN(date.getTime())) return Math.floor(date.getTime() / 1000);
      }
      // Return current timestamp as fallback
      return Math.floor(Date.now() / 1000);
    };

    // Extract title
    const getTitle = (prop) => {
      return prop.title || prop.name || prop.propertyTitle || "";
    };

    // Extract slug/ID - New API: id (number)
    const getSlug = (prop) => {
      // New API uses id as number, convert to string for URL
      if (prop.id) return String(prop.id);
      // Fallback to old structures
      return prop.slug || prop.externalID || String(prop.externalId) || "";
    };

    return {
      ...property,
      coverPhoto: {
        url: getImageUrl(property)
      },
      location: getLocation(property),
      area: (() => { const raw = getArea(property); const unit = property.area?.unit || property.area_unit || ""; return unit === "sqm" ? Math.round(raw * 10.76391041671) : raw; })(),
      category: getCategory(property),
      price: getPrice(property),
      rooms: getRooms(property),
      baths: getBaths(property),
      createdAt: getCreatedAt(property),
      title: getTitle(property),
      slug: getSlug(property),
      // Preserve completion status from new API structure
      completionStatus: property.details?.completion_status || property.completionStatus || property.status || "",
      // Preserve purpose
      purpose: property.purpose || "",
      // Preserve price_period for for-rent listings
      price_period: property.price_period || "",
    };
  };

  const applyCustomFilters = (data) => {
    // Handle different response structures - new API uses 'results'
    const hits = data.results || data.hits || data.data || (Array.isArray(data) ? data : []);
    if (!Array.isArray(hits)) return [];

    // Most filtering is now done server-side via API parameters
    // Only apply client-side filters for features not supported by API
    return hits
      .map(normalizeProperty)
      .filter((listing) => {
        if (selectedLocation && !selectedLocationId) {
          const location = listing.location;
          const locationMatch = location?.some(loc => 
            (typeof loc === "string" ? loc : loc?.name)?.toLowerCase().includes(selectedLocation.toLowerCase())
          );
          if (!locationMatch) return false;
        }

        return true;
      });
  };

  const applyCustomOffPlanFilters = (listings) => {
    const convertCurrency = (value) =>
      typeof value === "string"
        ? parseInt(value.replace(/[^0-9]/g, ""), 10)
        : value;

    function locationSearch(array, searchTerm) {
      return array.find(
        (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
      );
    }

    // Filter the listings
    const filteredListings = listings.filter((listing) => {
      const locations = listing.location;
      const price = convertCurrency(listing.price);
      const bedrooms = String(listing.rooms);
      const propertyTypeMatch = formData.propertyType
        ? listing.category
          ?.toLowerCase()
          .includes(formData.propertyType.toLowerCase())
        : true;

      const priceMinMatch = formData.priceMin
        ? price >= convertCurrency(formData.priceMin)
        : true;
      const priceMaxMatch = formData.priceMax
        ? price <= convertCurrency(formData.priceMax)
        : true;
      const bedroomsMatch = formData.bedrooms
        ? bedrooms.includes(String(formData.bedrooms))
        : true;

      const locationMatch = selectedLocation
        ? locationSearch(locations, selectedLocation)
        : true;

      // Off-plan title search: filter by query or selected title
      const titleMatch =
        purpose === "off-plan"
          ? selectedLocation
            ? (listing.fullTitle || listing.title || "") === selectedLocation
            : query
              ? (listing.fullTitle || listing.title || "")
                .toLowerCase()
                .includes(query.toLowerCase().trim())
              : true
          : true;

      const brandMatch = formData.brand
        ? (listing.brand || "").toLowerCase() === formData.brand.toLowerCase()
        : true;

      return (
        priceMinMatch &&
        priceMaxMatch &&
        bedroomsMatch &&
        propertyTypeMatch &&
        (purpose === "off-plan" ? titleMatch : locationMatch) &&
        brandMatch
      );
    });

    // Sort the filtered listings
    if (formData.sortBy === "price-desc") {
      return filteredListings.sort(
        (a, b) => convertCurrency(b.price) - convertCurrency(a.price)
      );
    } else if (formData.sortBy === "price-asc") {
      return filteredListings.sort(
        (a, b) => convertCurrency(a.price) - convertCurrency(b.price)
      );
    }

    return filteredListings; // Return the filtered listings if no sort option is applied
  };

  useEffect(() => {
    // Reset page to 0 when filters change
    setPage(0);
  }, [
    formData.sortBy,
    formData.propertyType,
    formData.subOption,
    formData.priceMin,
    formData.priceMax,
    formData.bedrooms,
    formData.brand,
    selectedLocation,
    query,
  ]);

  // Track previous filter values to detect changes and reset page
  const prevFiltersRef = useRef({});
  
  useEffect(() => {
    const currentFilters = {
      sortBy: formData.sortBy,
      propertyType: formData.propertyType,
      subOption: formData.subOption,
      priceMin: formData.priceMin,
      priceMax: formData.priceMax,
      bedrooms: formData.bedrooms,
      brand: formData.brand,
      locationId: selectedLocationId,
    };
    
    // Check if any filter changed (excluding page)
    const filtersChanged = JSON.stringify(currentFilters) !== JSON.stringify(prevFiltersRef.current);
    
    if (filtersChanged && page !== 0) {
      // Reset to page 0 when filters change
      prevFiltersRef.current = currentFilters;
      setPage(0);
      return; // Will trigger another useEffect call with page=0
    }
    
    // Update ref and fetch listings
    prevFiltersRef.current = currentFilters;
    fetchListings(page);
  }, [
    page,
    cmsData,
    formData.sortBy,
    formData.propertyType,
    formData.subOption,
    formData.priceMin,
    formData.priceMax,
    formData.bedrooms,
    formData.brand,
    selectedLocation,
    query,
    selectedLocationId,
  ]);

  useEffect(() => {
    setFormData({
      propertyType: offPlanCategorySlug || (propertyType ?? ""),
      buyRent: purpose,
      sortBy: "",
      subOption: subOption ?? optionsMap[purpose]?.[0]?.value,
      priceMin: priceMin ?? "",
      priceMax: priceMax ?? "",
      bedrooms: bedrooms ?? "",
      brand: brand ?? "",
    });
    setSelectedLocation(location ?? null);
    setSelectedLocationId(locationId ? parseInt(locationId, 10) : null);
    setQuery(searchParams.get("q") ?? "");
    setPage(0); // Reset page when URL params change
  }, [pathname, searchParams, offPlanCategorySlug, purpose]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
      scrollToSection("propertyListing");
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
      scrollToSection("propertyListing");
    }
  };

  const scrollToSection = (id, offset = 130) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery) return;
    if (purpose === "off-plan") {
      const search = searchQuery.toLowerCase().trim();
      const matches = offPlanListings.filter(
        (p) =>
          (p.fullTitle || "").toLowerCase().includes(search) ||
          (p.title || "").toLowerCase().includes(search)
      );
      const uniqueTitles = [...new Set(matches.map((p) => p.fullTitle || p.title))];
      setResults(uniqueTitles.map((name) => ({ name })));
      setShowDropdown(uniqueTitles.length > 0);
      return;
    }
    // CMS path: filter location names from already-loaded data
    if (cmsData) {
      const search = searchQuery.toLowerCase().trim();
      const nameSet = new Set();
      cmsBaseListRef.current.forEach((item) => {
        item.location?.forEach((l) => {
          const n = l?.name || "";
          if (n && n.toLowerCase().includes(search)) nameSet.add(n);
        });
      });
      const suggestions = [...nameSet].slice(0, 10).map((name) => ({ name }));
      setResults(suggestions);
      setShowDropdown(suggestions.length > 0);
      return;
    }
    try {
      const response = await axios.get("/api/bayut/locations-search", {
        params: { query: searchQuery },
      });
      const suggestions =
        response.data.hits || response.data.results || response.data || [];
      setResults(suggestions);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedLocation(null);
    setSelectedLocationId(null); // Clear location ID when query changes
    if (newQuery) {
      fetchSuggestions(newQuery);
    } else {
      setShowDropdown(false);
    }
  };
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className=" overflow-hidden">
      {USE_PREMIUM_PROPERTY_LISTING_HERO ? (
        <PremiumPageHero
          {...getPropertyListingHeroProps(purpose, { offPlanCategorySlug })}
        />
      ) : (
        <HomeHeroHeading
          image={
            purpose === "off-plan"
              ? "/Bg-Imgs/off-plan-bg.jpg"
              : purpose === "for-sale"
                ? "/Bg-Imgs/for-sale-bg.jpg"
                : "/Bg-Imgs/for-rent-bg.jpg"
          }
          title={
            purpose === "off-plan"
              ? "Off Plan Properties"
              : purpose === "for-sale"
                ? "Properties for sale"
                : "Properties for rent"
          }
        />
      )}
      {purpose === "off-plan" ? (
        <OffPlanBrowseByType offPlanCategorySlug={offPlanCategorySlug} />
      ) : null}
      <div className="flex flex-col items-center max-w-screen-2xl mx-auto py-6 pt-12 px-4 md:px-6">
        <div className="relative w-full ">
          <span className="absolute left-2 top-1 text-gray-400">
            <LuMapPin size="1.2em" />
          </span>
          {selectedLocation && (
            <div className=" absolute -top-1 left-8 flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-300 w-max">
              <span className="text-gray-700 text-sm">{selectedLocation}</span>
              <IoClose
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSelectedLocation(null);
                  setSelectedLocationId(null);
                  setQuery("");
                  setShowDropdown(false);
                  inputRef.current.focus();
                }}
              />
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            className="text-sm md:text-lg font-medium border-b border-[#858585] w-full pl-8 pb-4 focus:outline-none rounded-none"
            placeholder={!selectedLocation && (purpose === "off-plan" ? "Search by project name" : "Enter Location")}
            onFocus={() => query && setShowDropdown(true)}
          />
          {showDropdown && results.length > 0 && !selectedLocation && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
            >
              {results.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm flex items-center"
                  onClick={() => {
                    setSelectedLocation(item.name || item.location?.name || "");
                    // Store location ID if available (for API filtering)
                    if (item.id) {
                      setSelectedLocationId(item.id);
                    } else if (item.location?.id) {
                      setSelectedLocationId(item.location.id);
                    } else if (item.location_id) {
                      setSelectedLocationId(item.location_id);
                    }
                    setQuery("");
                    setShowDropdown(false);
                  }}
                >
                  {item.name || item.location?.name || ""}{" "}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Fade bottom duration={1500}>
        <div
          className="max-w-screen-2xl mx-auto px-4 md:px-6 font-custom2 "
          id="propertyListing"
        >
          <div
            className={`grid  gap-4 py-3 ${purpose === "off-plan"
              ? "grid-cols-1 lg:grid-cols-5"
              : "grid-cols-1 lg:grid-cols-6"
              }`}
          >
            {purpose !== "off-plan" && (
              <div className="flex flex-col gap-1 w-full">
                <span className=" text-sm font-bold tracking-wider">
                  {formData.buyRent === "for-sale"
                    ? "Completion Status"
                    : "Rent Frequency"}
                </span>
                <div className="relative w-full col-span-2 lg:col-span-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none h-full">
                    <TbHomeExclamation className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                    <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                  </span>
                  <select
                    id="subOption"
                    name="subOption"
                    value={formData.subOption}
                    onChange={handleChange}
                    className="appearance-none flex justify-center items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626] "
                  >
                    <option value="" disabled>
                      {formData.buyRent === "for-sale"
                        ? "Completion Status"
                        : "Rent Frequency"}
                    </option>
                    {formData.buyRent &&
                      optionsMap &&
                      (optionsMap[formData.buyRent] || []).map(
                        (option, index) => (
                          <option key={index} value={option.value}>
                            {option.valueShown}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
            )}
            {purpose === "off-plan" && !offPlanCategorySlug ? (
              <div className="flex flex-col gap-1">
                <span className=" text-sm font-bold tracking-wider">
                  Property Type
                </span>
                <div className="relative w-full col-span-2 sm:col-span-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <TbBuildingCommunity className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                    <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                  </span>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                  >
                    <option value="" disabled>
                      Property Type
                    </option>
                    {[
                      "Apartment",
                      "Villa",
                      "Sky Villa",
                      "Townhouse",
                      "Penthouse",
                      "Plot",
                      "Retail Space",
                      "Duplex Apartments",
                      "Mansion",
                      "Royal Suite",
                    ].map((value, index) => (
                      <option key={index} value={value.toLowerCase()}>
                        {value}
                      </option>
                    ))}
                    <option value="" onClick={handleClear}>
                      Clear
                    </option>
                  </select>
                </div>
              </div>
            ) : null}
            {purpose === "off-plan" && (
              <div className="flex flex-col gap-1">
                <span className=" text-sm font-bold tracking-wider">
                  All Developer
                </span>
                <div className="relative w-full col-span-2 sm:col-span-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BsBuilding className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                    <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                  </span>
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                  >
                    <option value="" disabled>
                      All Developer
                    </option>
                    {offPlanBrands.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                    <option value="" onClick={handleClear}>
                      Clear
                    </option>
                  </select>
                </div>
              </div>
            )}
            {purpose !== "off-plan" && (
              <div className="flex flex-col gap-1">
                <span className=" text-sm font-bold tracking-wider">
                  Property Type
                </span>
                <div className="relative w-full col-span-2 sm:col-span-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <TbBuildingCommunity className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                    <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                  </span>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                  >
                    <option value="" disabled>
                      Property Type
                    </option>
                    {["Apartments", "Villas", "Townhouses", "Penthouse"].map(
                      (value, index) => (
                        <option key={index} value={value.toLowerCase()}>
                          {value}
                        </option>
                      )
                    )}
                    <option value="" onClick={handleClear}>
                      Clear
                    </option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className=" text-sm font-bold tracking-wider">
                Price Min
              </span>
              <div className="relative w-full col-span-2 sm:col-span-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoCash className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                  <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                </span>
                <select
                  id="priceMin"
                  name="priceMin"
                  value={formData.priceMin}
                  onChange={handleChange}
                  className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                >
                  <option value="" disabled>
                    Price Min
                  </option>
                  <option>AED 100,000</option>
                  <option>AED 200,000</option>
                  <option>AED 400,000</option>
                  <option>AED 600,000</option>
                  <option>AED 800,000</option>
                  <option>AED 900,000</option>
                  <option>AED 1,000,000</option>
                  <option>AED 5,000,000</option>
                  <option>AED 10,000,000</option>
                  <option>AED 15,000,000</option>
                  <option>AED 20,000,000</option>
                  <option>AED 30,000,000</option>
                  <option>AED 40,000,000</option>
                  <option>AED 50,000,000</option>
                  <option>AED 60,000,000</option>
                  <option>AED 70,000,000</option>
                  <option value="" onClick={handleClear}>
                    Clear
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className=" text-sm font-bold tracking-wider">
                Price Max
              </span>
              <div className="relative w-full col-span-2 sm:col-span-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoCash className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                  <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                </span>
                <select
                  id="priceMax"
                  name="priceMax"
                  value={formData.priceMax}
                  onChange={handleChange}
                  className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                >
                  <option value="" disabled>
                    Price Max
                  </option>
                  <option>AED 100,000</option>
                  <option>AED 200,000</option>
                  <option>AED 400,000</option>
                  <option>AED 600,000</option>
                  <option>AED 800,000</option>
                  <option>AED 900,000</option>
                  <option>AED 1,000,000</option>
                  <option>AED 5,000,000</option>
                  <option>AED 10,000,000</option>
                  <option>AED 15,000,000</option>
                  <option>AED 20,000,000</option>
                  <option>AED 30,000,000</option>
                  <option>AED 40,000,000</option>
                  <option>AED 50,000,000</option>
                  <option>AED 60,000,000</option>
                  <option>AED 70,000,000</option>
                  <option value="" onClick={handleClear}>
                    Clear
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className=" text-sm font-bold tracking-wider">
                Bedrooms
              </span>
              <div className="relative w-full col-span-2 sm:col-span-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IoBedOutline className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ">
                  <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                </span>

                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                >
                  <option value="" disabled>
                    Bedrooms
                  </option>
                  {purpose === "off-plan"
                    ? bedroomsValuesOffPlan.map((value, index) => (
                      <option key={index} value={value.value}>
                        {value.valueShown}
                      </option>
                    ))
                    : bedroomsValues.map((value, index) => (
                      <option key={index} value={value.value}>
                        {value.valueShown}
                      </option>
                    ))}
                  <option value="" onClick={handleClear}>
                    Clear
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full">
            {!isMapVisible && (
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-5 w-full">
                <span className="text-lg font-semibold">
                  {purpose === "off-plan"
                    ? "Off Plan Properties"
                    : purpose === "for-sale"
                      ? "Properties for Sale"
                      : "Properties for Rent"}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-end  gap-4 md:gap-0">
                  {purpose === "off-plan" ? (
                    <div className="relative col-span-2 sm:col-span-1 w-full md:w-max md:-mr-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdOutlineSort className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                      </span>

                      <select
                        id="sortBy"
                        name="sortBy"
                        value={formData.sortBy}
                        onChange={handleChange}
                        className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                      >
                        <option value="" disabled>
                          Sort By
                        </option>

                        {[
                          { valueShown: "Lowest Price", value: "price-asc" },
                          { valueShown: "Highest Price", value: "price-desc" },
                        ].map((value, index) => (
                          <option
                            key={index}
                            value={value.value
                              .toLowerCase()
                              .split(" ")
                              .join("-")}
                          >
                            {value.valueShown}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="relative col-span-2 sm:col-span-1 w-full md:w-max md:-mr-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdOutlineSort className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <IoIosArrowDown className="h-6 w-6 text-black rounded-full" />
                      </span>

                      <select
                        id="sortBy"
                        name="sortBy"
                        value={formData.sortBy}
                        onChange={handleChange}
                        className="appearance-none flex items-center bg-white border rounded-md pl-10 pr-10 py-4 w-full border-[#262626]"
                      >
                        <option value="" disabled>
                          Sort By
                        </option>
                        {[
                          { valueShown: "Popular", value: "verified-score" },
                          { valueShown: "Newest", value: "date-desc" },
                          { valueShown: "Lowest Price", value: "price-asc" },
                          { valueShown: "Highest Price", value: "price-desc" },
                        ].map((value, index) => (
                          <option
                            key={index}
                            value={value.value
                              .toLowerCase()
                              .split(" ")
                              .join("-")}
                          >
                            {value.valueShown}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="relative col-span-2 sm:col-span-1 w-full md:w-max">
                    <button
                      className="flex items-center bg-white border rounded-md pl-3 pr-3 py-4 w-full border-[#262626]"
                      onClick={() => setIsMapVisible(true)}
                    >
                      <FaRegMap className="h-6 w-6 text-gray-500 pr-1 border-r border-black" />
                      <span className="pl-1 ">View on Map</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: aboveTextSection[`${purpose}`] || "",
            }}
            className="text-gray-600 text-base md:text-lg flex flex-col gap-4 tracking-wider"
          ></div> */}
        </div>
      </Fade>
      {isMapVisible && (
        <div className=" bg-white flex flex-col h-screen py-6">
          <div className="relative flex-1">
            <div
              onClick={() => setIsMapVisible(false)}
              className="flex gap-2 z-10  absolute left-4 top-4 px-4 py-3 bg-white hover:bg-black duration-500 text-black hover:text-white rounded-full items-center border-black  border cursor-pointer"
            >
              <RxCross2 size="1em" />
              <span className=" text-sm">Exit Map View</span>
            </div>
            <MapboxPropertyListing listings={listings} />
          </div>
        </div>
      )}
      {!isMapVisible &&
        (loading ? (
          <div className="max-w-screen-2xl mx-auto flex justify-center items-center py-20 ">
            <ClipLoader color="#000" size={60} />
          </div>
        ) : error ? (
          <div className="max-w-screen-2xl mx-auto flex justify-center items-center py-20 ">
            <h2 className="text-xl text-red-600 font-custom2">{error}</h2>
          </div>
        ) : listings.length === 0 ? (
          <div className="max-w-screen-2xl mx-auto flex justify-center items-center py-20 ">
            <h2 className="text-xl text-red-600 font-custom2">
              No Properties Found
            </h2>
          </div>
        ) : (
          <div className="max-w-screen-2xl mx-auto flex flex-col justify-center px-4 lg:px-6">
            {purpose === "off-plan" ? (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                {listings?.map((property, index) => (
                  <React.Fragment key={property.slug || index}>
                    {index === 6 && listings.length > 6 && (
                      <div className="col-span-1 my-4 rounded-xl bg-gray-900 px-6 py-8 text-center text-white md:px-12 lg:col-span-2">
                        <p className="mb-3 font-custom text-lg font-semibold md:text-xl">
                          Need help choosing the right off-plan property?
                        </p>
                        <p className="mx-auto mb-6 max-w-xl font-custom2 text-sm text-gray-400 md:text-base">
                          Speak to our specialists for expert guidance on Dubai&apos;s
                          best off-plan investments.
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowExpertPopup(true)}
                          className="rounded-lg cursor-pointer inline-flex items-center gap-2 bg-white px-6 py-3 font-custom2 font-semibold text-black transition hover:bg-gray-100"
                        >
                          TALK TO AN EXPERT <FaArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <Fade
                      bottom
                      duration={1000 + index * 20}
                      key={property.slug || index}
                    >
                      <PropertyCardBig
                        compactGrid
                        imagePriority={index < 2}
                        image={property.coverPhoto?.url}
                        title={property.location}
                        subTitle={property.fullTitle || property.title}
                        bedrooms={property.rooms}
                        baths={property.baths}
                        sizeRange={property.area}
                        id={property.slug}
                        location={property.location}
                        type={property.category}
                        brand={property.brand}
                        moreDetails={true}
                        homeOffPlan={false}
                        status={property.completionStatus}
                        date={property.createdAt}
                        price={property.price}
                        pricePeriod={property.price_period}
                        purpose={property.purpose}
                        onBookViewing={() =>
                          handleBookViewing(
                            property.coverPhoto?.url,
                            purpose,
                            property.slug
                          )
                        }
                      />
                    </Fade>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              listings?.map((property, index) => (
                <Fade
                  bottom
                  duration={1000 + index * 20}
                  key={property.slug || property.id || index}
                >
                  <PropertyCardBig
                    image={property.coverPhoto?.url || "/placeholder-property.jpg"}
                    title={
                      Array.isArray(property.location)
                        ? property.location.map((l) => l.name).join(", ")
                        : typeof property.location === "string"
                          ? property.location
                          : "Dubai"
                    }
                    subTitle={property.title || ""}
                    bedrooms={property.rooms ?? 0}
                    baths={property.baths ?? 0}
                    sizeRange={property.area ?? 0}
                    id={String(property.slug || property.id || "")}
                    location={property.location || [{ name: "Dubai" }]}
                    type={property.category || [{ name: "" }]}
                    brand={property.brand}
                    moreDetails={true}
                    homeOffPlan={false}
                    status={property.completionStatus || property.status}
                    date={property.createdAt || Math.floor(Date.now() / 1000)}
                    price={property.price ?? 0}
                    pricePeriod={property.price_period}
                    purpose={property.purpose || purpose}
                    onBookViewing={() =>
                      handleBookViewing(
                        property.coverPhoto?.url || "/placeholder-property.jpg",
                        property.purpose || purpose,
                        String(property.slug || property.id || "")
                      )
                    }
                  />
                </Fade>
              ))
            )}
          </div>
        ))}
      {/* Pagination - show when there's a previous or next page */}
      {!isMapVisible && !loading && (page > 0 || hasNextPage) && (
        <div className="max-w-screen-2xl mx-auto w-full flex items-center justify-between space-x-4 p-4 md:p-6 pb-12 font-custom2">
          <button
            onClick={handlePreviousPage}
            disabled={page <= 0}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-400 focus:outline-none"
          >
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span>Previous</span>
          </button>
          <div className="flex items-center space-x-1">
            {totalNbPages > 1 ? (
              <>
                <span>Page:</span>
                <select
                  value={page}
                  onChange={handlePageChange}
                  className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(Math.max(totalNbPages, page + 1))].map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                {totalNbPages > 0 && <span>of {totalNbPages}</span>}
              </>
            ) : (
              <span>Page {page + 1}</span>
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-400 focus:outline-none"
          >
            <span>Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      )}

      {showPopup && (
        <BookPropertyPopUp
          image={selectedImage}
          propertyUrl={propertyUrl}
          setShow={setShowPopup}
        />
      )}

      {/* Advantages of Off-Plan Investment */}
      {purpose === "off-plan" && (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 py-14 md:py-36">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="w-full lg:w-2/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-black" />
                <span className="text-black text-xs font-custom2 font-semibold tracking-widest uppercase">
                  Why Off-Plan
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-custom text-black mb-4">
                Advantages of Off-Plan Investment
              </h2>
              <p className="text-secondary text-base font-custom2 leading-relaxed mb-8">
                Off-plan properties are sold before construction is completed  allowing buyers to secure units at pre-construction prices with flexible payment plans.
              </p>
              <button
                type="button"
                onClick={() => setShowExpertPopup(true)}
                className="rounded-lg cursor-pointer inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-custom2 font-semibold hover:bg-gray-800 transition"
              >
                TALK TO AN EXPERT <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: FaHandHoldingUsd,
                  title: "Lower Entry Price",
                  description:
                    "Secure your Dubai off-plan property at pre-construction prices typically 15–30% below completed market value — the single biggest advantage of off-plan investing in Dubai.",
                },
                {
                  icon: FaCalendar,
                  title: "Flexible Payment Plans",
                  description:
                    "Dubai's top developers offer payment plans spread over 3–5 years with down payments as low as 10–20%. H&S Real Estate negotiates the best terms for every client.",
                },
                {
                  icon: FaArrowTrendUp,
                  title: "Capital Growth",
                  description:
                    "Off-plan property values in Dubai typically rise 20–40% during the construction period, making real estate investing in Dubai one of the highest-returning asset strategies globally.",
                },
                {
                  icon: FaPercent,
                  title: "High Rental Yield",
                  description:
                    "Dubai delivers gross rental yields of 6–10% per annum — among the highest in the world — making off-plan villas and apartments in Dubai ideal for income-focused investors.",
                },
                {
                  icon: FaPaintRoller,
                  title: "Customization",
                  description:
                    "Personalize finishes, layouts, and interiors before handover — an exclusive benefit only available with off-plan properties and not possible with ready properties in Dubai.",
                },
                {
                  icon: FaKey,
                  title: "Freehold for All",
                  description:
                    "Foreign investors can own 100% of off-plan properties in Dubai's designated freehold zones — no UAE residency required. Full ownership rights, zero property tax.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-5 bg-gray-50 border-l-4 border-black rounded-r"
                  >
                    <div className="flex-shrink-0 text-black">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold font-custom text-black mb-2">{item.title}</h3>
                      <p className="text-sm text-secondary font-custom2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {showExpertPopup && (
        <BookPropertyPopUp
          image="/Bg-Imgs/off-plan-bg.jpg"
          propertyUrl="https://hsproperty.ae/properties/off-plan"
          setShow={setShowExpertPopup}
        />
      )}

      <BelowHiddenTextNew textSection={belowTextSection[`${purpose}`]} />
      <Footer />
    </div>
  );
};

export default PropertiesListingPage;
