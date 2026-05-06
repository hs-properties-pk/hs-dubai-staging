"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Fade } from "react-reveal";
import { FaRegMap, FaArrowRight } from "react-icons/fa6";
import { IoBedOutline, IoClose, IoCash } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineSort } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbBuildingCommunity } from "react-icons/tb";
import PropertyCardBig from "@/components/PropertyCardBig";
import MapboxPropertyListing from "@/components/MapboxPropertyListing";
import BookPropertyPopUp from "@/components/BookPropertyPopUp";
import Footer from "@/components/Footer";
import BrandPageHero from "@/components/BrandPageHero";
import BrandAboutStatsSection from "@/components/BrandAboutStatsSection";
import BrandEnquiryModal from "@/components/BrandEnquiryModal";
import LandingFaqs from "@/components/LandingFaqs";
import {
  getListingsForBrandName,
  getCommunitiesForBrandName,
} from "@/lib/brands";
import { resolveBrandPageProfile } from "@/lib/brandProfile";

const itemsPerPage = 12;
const purpose = "off-plan";

function listingMatchesCommunity(listing, comm) {
  if (!comm) return true;
  const t = `${listing.slug || ""} ${listing.fullTitle || ""} ${listing.title || ""
    }`.toLowerCase();
  const area = Array.isArray(listing.location)
    ? listing.location.map((x) => x?.name).join(" ")
    : "";
  const blob = `${t} ${area}`.toLowerCase();
  return (
    blob.includes(comm.slug) ||
    blob.includes((comm.title || "").toLowerCase().slice(0, 18))
  );
}

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

function convertCurrency(value) {
  if (typeof value === "string")
    return parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
  return typeof value === "number" ? value : 0;
}

function applyFilters(listings, formData, query, selectedTitle) {
  return listings.filter((listing) => {
    const price = convertCurrency(listing.price);
    const bedrooms = String(listing.rooms);
    const propertyTypeMatch = formData.propertyType
      ? (listing.category || "")
        .toLowerCase()
        .includes(String(formData.propertyType).toLowerCase())
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
    const titleMatch = selectedTitle
      ? (listing.fullTitle || listing.title || "") === selectedTitle
      : query
        ? (listing.fullTitle || listing.title || "")
          .toLowerCase()
          .includes(query.toLowerCase().trim())
        : true;
    return (
      propertyTypeMatch &&
      priceMinMatch &&
      priceMaxMatch &&
      bedroomsMatch &&
      titleMatch
    );
  });
}

function sortListings(listings, sortBy) {
  if (sortBy === "price-desc") {
    return [...listings].sort(
      (a, b) => convertCurrency(b.price) - convertCurrency(a.price)
    );
  }
  if (sortBy === "price-asc") {
    return [...listings].sort(
      (a, b) => convertCurrency(a.price) - convertCurrency(b.price)
    );
  }
  return listings;
}

export default function BrandProjectsPage({ brandName, brandSlug, intro, profile: profileProp }) {
  const base = useMemo(
    () => getListingsForBrandName(brandName),
    [brandName]
  );
  const communities = useMemo(
    () => getCommunitiesForBrandName(brandName),
    [brandName]
  );

  const [selectedCommunitySlug, setSelectedCommunitySlug] = useState("");
  const [leadEnquireOpen, setLeadEnquireOpen] = useState(false);

  const pageProfile = useMemo(() => {
    if (profileProp) return profileProp;
    return resolveBrandPageProfile({
      slug: brandSlug,
      name: brandName,
      intro,
      offPlanCount: base.length,
      communityCount: communities.length,
    });
  }, [profileProp, brandSlug, brandName, intro, base.length, communities.length]);

  const baseForLocation = useMemo(() => {
    if (!selectedCommunitySlug) return base;
    const comm = communities.find((c) => c.slug === selectedCommunitySlug);
    if (!comm) return base;
    return base.filter((l) => listingMatchesCommunity(l, comm));
  }, [base, communities, selectedCommunitySlug]);

  const [formData, setFormData] = useState({
    propertyType: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    sortBy: "",
  });
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showExpertPopup, setShowExpertPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const propertyUrl = `https://hsproperty.ae/properties/${purpose}/${propertyId}`;

  const filteredSorted = useMemo(() => {
    const f = applyFilters(
      baseForLocation,
      formData,
      query,
      selectedLocation
    );
    return sortListings(f, formData.sortBy);
  }, [baseForLocation, formData, query, selectedLocation]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / itemsPerPage));
  const hasNextPage = (page + 1) * itemsPerPage < filteredSorted.length;
  const listings = filteredSorted.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    setPage(0);
  }, [formData, query, selectedLocation, brandName, selectedCommunitySlug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleInputChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    setSelectedLocation(null);
    if (!v) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const search = v.toLowerCase().trim();
    const matches = baseForLocation.filter(
      (p) =>
        (p.fullTitle || "").toLowerCase().includes(search) ||
        (p.title || "").toLowerCase().includes(search)
    );
    const uniqueTitles = [
      ...new Set(matches.map((p) => p.fullTitle || p.title)),
    ];
    setResults(uniqueTitles.map((name) => ({ name })));
    setShowDropdown(uniqueTitles.length > 0);
  };

  const handleBookViewing = (image, id) => {
    setSelectedImage(image);
    setPropertyId(id);
    setShowPopup(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const offPlanQuery = `/properties/off-plan?brand=${encodeURIComponent(brandName)}`;
  const waLead = `https://api.whatsapp.com/send/?phone=971526902884&text=${encodeURIComponent(
    `Hello! I'd like information about ${brandName} new launches.`
  )}&type=phone_number&app_absent=0`;

  return (
    <div className="w-full min-h-screen">
      <BrandPageHero
        image={pageProfile.heroImage}
        imageAlt={`${brandName} in Dubai — off-plan and communities`}
        eyebrow="Developers · H&S Real Estate"
        brandName={brandName}
        headline={pageProfile.headline}
        tagline={pageProfile.tagline}
        description={pageProfile.heroBody}
        primaryCta={pageProfile.heroCta}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Brands", href: "/brands" },
          { label: brandName, href: null },
        ]}
      />

      {pageProfile.about && (
        <BrandAboutStatsSection
          aboutSubtitle={pageProfile.about.aboutSubtitle}
          aboutTitle={pageProfile.about.aboutTitle}
          description={pageProfile.about.description}
          cta={pageProfile.about.cta}
          stats={pageProfile.about.stats}
          onExpertClick={() => setShowExpertPopup(true)}
        />
      )}

      {communities.length > 0 && (
        <section
          className="mx-auto max-w-screen-2xl px-4 py-8 md:px-6"
          id="brandCommunities"
        >
          <h2 className="font-custom text-2xl text-neutral-900 md:text-3xl">
            Communities
          </h2>
          <p className="mt-1 max-w-2xl font-custom2 text-sm text-neutral-600 md:text-base">
            In-depth area guides and community pages on hsproperty.ae for this
            developer (same as our{" "}
            <Link href="/communities" className="font-medium text-black underline">
              communities
            </Link>{" "}
            hub).
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((c) => (
              <Link
                key={c.slug}
                href={`/communities/${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={c.coverPhoto?.url || "/placeholder-property.jpg"}
                    alt={c.title || c.slug}
                    fill
                    className="object-cover transition group-hover:opacity-95"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-custom text-lg font-semibold text-neutral-900 group-hover:underline">
                    {c.title}
                  </h3>
                  {c.communityType ? (
                    <p className="mt-1 font-custom2 text-xs text-neutral-500">
                      {c.communityType}
                    </p>
                  ) : null}
                  {c.description ? (
                    <p className="mt-2 line-clamp-3 font-custom2 text-sm text-neutral-600">
                      {c.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {base.length === 0 && communities.length > 0 && (
        <p className="mx-auto max-w-screen-2xl px-4 pb-4 font-custom2 text-neutral-600 md:px-6">
          We don&apos;t list individual off-plan project cards for this brand
          yet — use the community guides above, or browse all{" "}
          <Link
            href="/properties/off-plan"
            className="font-medium text-black underline"
          >
            off-plan
          </Link>{" "}
          search.
        </p>
      )}

      {base.length > 0 && (
        <>
          <div className="mx-auto max-w-screen-2xl px-4 pt-6 md:px-6">
            <h2
              className="font-custom text-2xl text-neutral-900 md:text-3xl"
              id="brandListing"
            >
              Browse {brandName} off-plan properties
            </h2>
          </div>

          <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 py-6 md:px-6">
            <div className="relative w-full">
              <span className="absolute left-2 top-1 text-gray-400">
                <LuMapPin size="1.2em" />
              </span>
              {selectedLocation && (
                <div className="absolute -top-1 left-8 flex w-max items-center space-x-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2">
                  <span className="text-sm text-gray-700">{selectedLocation}</span>
                  <IoClose
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSelectedLocation(null);
                      setQuery("");
                      setShowDropdown(false);
                      inputRef.current?.focus();
                    }}
                  />
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                className="w-full border-b border-[#858585] pb-4 pl-8 text-sm font-medium focus:outline-none md:text-lg"
                placeholder="Search by project name"
                onFocus={() => query && setShowDropdown(true)}
              />
              {showDropdown && results.length > 0 && !selectedLocation && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
                >
                  {results.map((item, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedLocation(item.name);
                        setQuery("");
                        setShowDropdown(false);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Fade bottom duration={1200}>
            <div className="mx-auto max-w-screen-2xl px-4 font-custom2 md:px-6">
              {communities.length > 0 && (
                <div className="mb-4 w-full max-w-md py-2">
                  <span className="text-sm font-bold tracking-wider">
                    Filter by community
                  </span>
                  <div className="relative mt-1 w-full">
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <IoIosArrowDown className="h-6 w-6 rounded-full text-black" />
                    </span>
                    <select
                      className="w-full appearance-none rounded-md border border-[#262626] bg-white py-3 pl-3 pr-10"
                      value={selectedCommunitySlug}
                      onChange={(e) => setSelectedCommunitySlug(e.target.value)}
                    >
                      <option value="">All communities (this brand)</option>
                      {communities.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 py-3 lg:grid-cols-5">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold tracking-wider">
                    Property type
                  </span>
                  <div className="relative w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <TbBuildingCommunity className="h-6 w-6 border-r border-black pr-1 text-gray-500" />
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <IoIosArrowDown className="h-6 w-6 rounded-full text-black" />
                    </span>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-[#262626] bg-white py-4 pl-10 pr-10"
                    >
                      <option value="" disabled>
                        Property type
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
                      ].map((value, i) => (
                        <option key={i} value={value.toLowerCase()}>
                          {value}
                        </option>
                      ))}
                      <option value="">Clear</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold tracking-wider">Price min</span>
                  <div className="relative w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <IoCash className="h-6 w-6 border-r border-black pr-1 text-gray-500" />
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <IoIosArrowDown className="h-6 w-6 rounded-full text-black" />
                    </span>
                    <select
                      name="priceMin"
                      value={formData.priceMin}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-[#262626] bg-white py-4 pl-10 pr-10"
                    >
                      <option value="" disabled>
                        Price min
                      </option>
                      {[
                        "AED 100,000",
                        "AED 200,000",
                        "AED 400,000",
                        "AED 600,000",
                        "AED 800,000",
                        "AED 1,000,000",
                        "AED 5,000,000",
                        "AED 10,000,000",
                        "AED 20,000,000",
                        "AED 50,000,000",
                      ].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                      <option value="">Clear</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold tracking-wider">Price max</span>
                  <div className="relative w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <IoCash className="h-6 w-6 border-r border-black pr-1 text-gray-500" />
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <IoIosArrowDown className="h-6 w-6 rounded-full text-black" />
                    </span>
                    <select
                      name="priceMax"
                      value={formData.priceMax}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-[#262626] bg-white py-4 pl-10 pr-10"
                    >
                      <option value="" disabled>
                        Price max
                      </option>
                      {[
                        "AED 1,000,000",
                        "AED 5,000,000",
                        "AED 10,000,000",
                        "AED 20,000,000",
                        "AED 50,000,000",
                        "AED 70,000,000",
                      ].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                      <option value="">Clear</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold tracking-wider">Bedrooms</span>
                  <div className="relative w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <IoBedOutline className="h-6 w-6 border-r border-black pr-1 text-gray-500" />
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <IoIosArrowDown className="h-6 w-6 rounded-full text-black" />
                    </span>
                    <select
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-[#262626] bg-white py-4 pl-10 pr-10"
                    >
                      <option value="" disabled>
                        Bedrooms
                      </option>
                      {bedroomsValuesOffPlan.map((o, i) => (
                        <option key={i} value={o.value}>
                          {o.valueShown}
                        </option>
                      ))}
                      <option value="">Clear</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold tracking-wider">Sort</span>
                  <div className="relative w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MdOutlineSort className="h-6 w-6 border-r border-black pr-1 text-gray-500" />
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <IoIosArrowDown className="h-6 w-6 rounded-full text-black" />
                    </span>
                    <select
                      name="sortBy"
                      value={formData.sortBy}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-md border border-[#262626] bg-white py-4 pl-10 pr-10"
                    >
                      <option value="" disabled>
                        Sort by
                      </option>
                      <option value="price-asc">Lowest price</option>
                      <option value="price-desc">Highest price</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="text-lg font-semibold">
                    {brandName} — off-plan projects
                  </span>
                  <span className="text-sm text-neutral-600">
                    {filteredSorted.length} project
                    {filteredSorted.length === 1 ? "" : "s"} match
                  </span>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/brands"
                    className="text-sm font-medium text-neutral-600 underline-offset-2 hover:text-black hover:underline"
                  >
                    ← All brands
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-[#262626] bg-white py-3 pl-3 pr-3 sm:w-max"
                    onClick={() => setIsMapVisible(true)}
                  >
                    <FaRegMap className="h-6 w-6 border-r border-black pr-1 text-gray-500" />
                    <span>View on map</span>
                  </button>
                </div>
              </div>
            </div>
          </Fade>

          {isMapVisible && (
            <div className="flex h-screen flex-col bg-white py-6">
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => setIsMapVisible(false)}
                  className="absolute left-4 top-4 z-10 flex cursor-pointer items-center gap-2 rounded-full border border-black bg-white px-4 py-3 text-sm text-black transition hover:bg-black hover:text-white"
                >
                  <RxCross2 size="1em" />
                  Exit map view
                </button>
                <MapboxPropertyListing listings={filteredSorted} />
              </div>
            </div>
          )}

          {!isMapVisible &&
            (listings.length === 0 ? (
              <div className="mx-auto flex max-w-screen-2xl justify-center py-20">
                <p className="font-custom2 text-xl text-neutral-600">
                  No projects match your filters.{" "}
                  <button
                    type="button"
                    className="text-black underline"
                    onClick={() => {
                      setFormData({
                        propertyType: "",
                        priceMin: "",
                        priceMax: "",
                        bedrooms: "",
                        sortBy: "",
                      });
                      setQuery("");
                      setSelectedLocation(null);
                      setSelectedCommunitySlug("");
                    }}
                  >
                    Clear filters
                  </button>
                </p>
              </div>
            ) : (
              <div className="mx-auto flex max-w-screen-2xl flex-col justify-center px-4 lg:px-6">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                  {listings.map((property, index) => (
                    <React.Fragment key={property.slug || index}>
                      {page === 0 &&
                        index === 6 &&
                        filteredSorted.length > 6 && (
                          <div className="col-span-1 my-4 rounded-xl bg-gray-900 px-6 py-8 text-center text-white md:px-12 lg:col-span-2">
                            <p className="mb-3 font-custom text-lg font-semibold md:text-xl">
                              Need help with {brandName} projects?
                            </p>
                            <p className="mx-auto mb-6 max-w-xl font-custom2 text-sm text-gray-400 md:text-base">
                              Our off-plan team can shortlist payment plans, units, and
                              handover timelines for you.
                            </p>
                            <button
                              type="button"
                              onClick={() => setShowExpertPopup(true)}
                              className="cursor-pointer rounded-lg inline-flex items-center gap-2 bg-white px-6 py-3 font-custom2 font-semibold text-black transition hover:bg-gray-100"
                            >
                              Talk to an expert
                              <FaArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      <Fade bottom duration={800 + index * 20} key={property.slug}>
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
                          moreDetails
                          homeOffPlan={false}
                          status={property.completionStatus}
                          date={property.createdAt || Math.floor(Date.now() / 1000)}
                          price={property.price}
                          purpose={property.purpose || purpose}
                          onBookViewing={() =>
                            handleBookViewing(
                              property.coverPhoto?.url,
                              property.slug
                            )
                          }
                        />
                      </Fade>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}

          {!isMapVisible &&
            base.length > 0 &&
            listings.length > 0 &&
            pageProfile.midCta && (
              <div className="mx-auto max-w-screen-2xl px-4 py-6 md:px-6">
                <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-100 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                  <p className="max-w-md font-custom text-base font-semibold text-neutral-900 md:text-lg">
                    {pageProfile.midCta.title}
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => setShowExpertPopup(true)}
                      className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      {pageProfile.midCta.primaryLabel}
                    </button>
                    <Link
                      href={pageProfile.midCta.secondaryHref || offPlanQuery}
                      className="inline-flex items-center justify-center rounded-md border border-neutral-400 bg-white px-5 py-2.5 text-center text-sm font-semibold text-neutral-900 transition hover:border-black"
                    >
                      {pageProfile.midCta.secondaryLabel}
                    </Link>
                  </div>
                </div>
              </div>
            )}

          {!isMapVisible &&
            base.length > 0 &&
            (page > 0 || hasNextPage) && (
              <div className="mx-auto flex max-w-screen-2xl items-center justify-between space-x-4 p-4 pb-12 font-custom2 md:p-6">
                <button
                  type="button"
                  onClick={() => {
                    setPage((p) => Math.max(0, p - 1));
                    scrollToSection("brandListing");
                  }}
                  disabled={page <= 0}
                  className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-gray-600 hover:bg-black hover:text-white disabled:border-gray-200 disabled:text-gray-400"
                >
                  Previous
                </button>
                <span className="text-sm text-neutral-600">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (hasNextPage) {
                      setPage((p) => p + 1);
                      scrollToSection("brandListing");
                    }
                  }}
                  disabled={!hasNextPage}
                  className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-gray-600 hover:bg-black hover:text-white disabled:border-gray-200 disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
            )}
        </>
      )}

      {showPopup && (
        <BookPropertyPopUp
          image={selectedImage}
          propertyUrl={propertyUrl}
          setShow={setShowPopup}
        />
      )}

      {showExpertPopup && (
        <BookPropertyPopUp
          image="/Bg-Imgs/off-plan-bg.jpg"
          propertyUrl={`https://hsproperty.ae/brands/${brandSlug}`}
          setShow={setShowExpertPopup}
        />
      )}

      {leadEnquireOpen && (
        <BrandEnquiryModal
          brandName={brandName}
          notionPage={`/brands/${brandSlug}`}
          onClose={() => setLeadEnquireOpen(false)}
        />
      )}

      {pageProfile.paymentSection && (
        <section className="mx-auto max-w-screen-2xl px-4 py-6 md:px-6">
          <div className="rounded-2xl border border-neutral-800 bg-black px-6 py-8 text-white md:px-10 md:py-10">
            <h2 className="font-custom text-xl font-semibold md:text-2xl">
              {pageProfile.paymentSection.title}
            </h2>
            <p className="mt-3 max-w-3xl font-custom2 text-sm text-white/85 md:text-base">
              {pageProfile.paymentSection.body}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {pageProfile.paymentSection.downloadUrl ? (
                <a
                  href={pageProfile.paymentSection.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {pageProfile.paymentSection.downloadLabel}
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => setShowExpertPopup(true)}
                className="inline-flex items-center justify-center rounded-md border border-white bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-transparent hover:text-white"
              >
                Ask about payment
              </button>
            </div>
            {pageProfile.paymentSection.plans?.length > 0 && (
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pageProfile.paymentSection.plans.map((plan, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <p className="font-custom text-lg font-semibold text-white">
                      {plan.title}
                    </p>
                    <p className="mt-1 font-custom2 text-sm text-white/80">
                      {plan.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-screen-2xl space-y-3 px-4 py-12 md:px-6">
        {base.length > 0 && (
          <p className="font-custom2 text-sm leading-relaxed text-neutral-600">
            You are viewing H&amp;S Real Estate off-plan project cards for
            &quot;{brandName}&quot;. The same projects are available with the
            main filters under{" "}
            <Link
              href={`/properties/off-plan?brand=${encodeURIComponent(brandName)}`}
              className="font-medium text-black underline"
            >
              all off-plan listings with this developer
            </Link>
            .
          </p>
        )}
        {communities.length > 0 && (
          <p className="font-custom2 text-sm leading-relaxed text-neutral-600">
            <Link
              href="#brandCommunities"
              className="font-medium text-black underline"
            >
              Community
            </Link>{" "}
            guides for {brandName} match the dedicated pages in our{" "}
            <Link
              href="/communities"
              className="font-medium text-black underline"
            >
              communities
            </Link>{" "}
            section — in-depth overviews, amenities, and expert guidance.
          </p>
        )}
      </section>

      {pageProfile.faqSection && (
        <LandingFaqs
          sectionLabel={pageProfile.faqSection.sectionLabel}
          heading={pageProfile.faqSection.heading}
          description={pageProfile.faqSection.description}
          faqs={pageProfile.faqSection.faqs}
        />
      )}

      <Footer />
    </div>
  );
}

