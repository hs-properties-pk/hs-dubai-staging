"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import { offPlanListings } from "@/data/off-plan-data";

const TABS = [
  { id: "for-sale", label: "Buy" },
  { id: "for-rent", label: "Rent" },
  { id: "off-plan", label: "Off-plan" },
];

const HomeHero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null); // Store location ID for API
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("for-sale");
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    subOption: "",
    propertyType: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
  });

  const optionsMap = {
    "for-sale": [
      { valueShown: "Ready", value: "completed" },
      { valueShown: "Off-Plan", value: "under-construction" },
    ],
    "for-rent": [
      { valueShown: "Yearly", value: "yearly" },
      { valueShown: "Quarterly", value: "quarterly" },
      { valueShown: "Monthly", value: "monthly" },
    ],
    "off-plan": [],
  };

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const q = {};
    if (selectedTab === "off-plan") {
      if (selectedLocation) q.location = selectedLocation;
      else if (query.trim()) q.q = query.trim();
    } else {
      if (selectedLocation) q.location = selectedLocation;
      if (selectedLocationId) q.locationId = String(selectedLocationId);
    }
    if (formData.subOption) q.subOption = formData.subOption;
    if (formData.propertyType) q.propertyType = formData.propertyType;
    if (formData.priceMin) q.priceMin = formData.priceMin;
    if (formData.priceMax) q.priceMax = formData.priceMax;
    if (formData.bedrooms) q.bedrooms = formData.bedrooms;

    const queryString = new URLSearchParams(q).toString();
    router.push(`/properties/${selectedTab}?${queryString}`);
  };

  const handleTabClick = (tab) => {
    setFormData((prev) => ({ ...prev, buyRent: tab }));
    setSelectedTab(tab);
    setQuery("");
    setSelectedLocation(null);
    setSelectedLocationId(null);
    setResults([]);
    setShowDropdown(false);
  };

  const toggleFilters = () => setShowFilters((f) => !f);

  // const fetchSuggestions = async (searchQuery) => {
  //   if (!searchQuery) return;
  //   try {
  //     const response = await axios.request({
  //       method: "GET",
  //       url: "https://bayut.p.rapidapi.com/auto-complete",
  //       params: { query: searchQuery, hitsPerPage: "15" },
  //       headers: {
  //         "x-rapidapi-key": process.env.RapidAPIKey,
  //         "x-rapidapi-host": process.env.RapidAPIHost,
  //       },
  //     });
  //     setResults(response.data.hits);
  //     setShowDropdown(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery?.trim()) return;

    if (selectedTab === "off-plan") {
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

    try {
      const response = await axios.get("/api/cms/locations-search", {
        params: { query: searchQuery, purpose: selectedTab },
      });
      setResults(response.data.hits || []);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedLocation(null);
    setSelectedLocationId(null);
    if (newQuery) {
      fetchSuggestions(newQuery);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const subOptions = optionsMap[selectedTab] || [];

  const selectClass =
    "w-full appearance-none rounded-xl border border-neutral-200 bg-white py-3 pl-3.5 pr-10 text-sm text-neutral-800 shadow-sm transition focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10";

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden font-custom2">
      <div className="absolute inset-0">
        <Image
          src={'/hero.webp'}
          alt="Dubai skyline"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={88}
        />
        {/* Top ~black/40, middle ~black/10, bottom ~black/50 for readable hero + search */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center px-4 pb-16 pt-28 md:px-8 md:pb-20 md:pt-36 lg:px-12">
        <div className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(211,169,86,0.7)]" aria-hidden />
            <span className="font-custom2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 sm:text-xs">
              RERA-registered · Dubai
            </span>
          </div>
          <h1 className="font-custom text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-[3.25rem]">
            Find a home worth waking up in.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-custom3 text-base leading-relaxed text-white/75 md:text-lg">
            Search live listings by area, budget, and layout — buy, rent, or explore off-plan with a team that knows every corridor of the city.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-4xl xl:max-w-5xl">
          <div className="mb-5 flex justify-center">
            <div
              className="inline-flex rounded-full bg-black/35 p-1.5 shadow-inner ring-1 ring-white/10 backdrop-blur-md"
              role="tablist"
              aria-label="Listing type"
            >
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selectedTab === id}
                  onClick={() => handleTabClick(id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-7 sm:py-2.5 ${
                    selectedTab === id
                      ? "bg-white text-neutral-950 shadow-lg ring-1 ring-black/5"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="relative overflow-visible rounded-2xl border border-white/20 bg-white/95 p-4 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur-xl md:p-5"
            role="search"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-3">
              <div className="relative min-h-[3.25rem] min-w-0 flex-1">
                <FaMapLocationDot
                  className="pointer-events-none absolute left-3.5 top-1/2 z-[1] h-5 w-5 -translate-y-1/2 text-neutral-400"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder={
                    selectedLocation
                      ? ""
                      : selectedTab === "off-plan"
                        ? "Search by project name"
                        : "City, community, or building"
                  }
                  onFocus={() => query && setShowDropdown(true)}
                  className="h-full min-h-[3.25rem] w-full rounded-xl border border-neutral-200 bg-white py-3 pl-11 pr-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/15"
                  autoComplete="off"
                  aria-label={
                    selectedTab === "off-plan" ? "Search off-plan project" : "Search location"
                  }
                />
                {selectedLocation && (
                  <div className="absolute left-10 top-1/2 z-[1] flex max-w-[calc(100%-3rem)] -translate-y-1/2 items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1">
                    <span className="truncate text-sm text-neutral-800">{selectedLocation}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLocation(null);
                        setSelectedLocationId(null);
                        setQuery("");
                        setShowDropdown(false);
                        inputRef.current?.focus();
                      }}
                      className="shrink-0 rounded p-0.5 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800"
                      aria-label="Clear location"
                    >
                      <IoClose className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {selectedTab !== "off-plan" && subOptions.length > 0 && (
                <div className="relative w-full shrink-0 lg:w-[200px] xl:w-[220px]">
                  <span className="pointer-events-none absolute right-3 top-1/2 z-[1] -translate-y-1/2">
                    <IoIosArrowDown className="h-4 w-4 text-neutral-400" aria-hidden />
                  </span>
                  <select
                    id="subOption"
                    name="subOption"
                    value={formData.subOption}
                    onChange={handleChange}
                    aria-label={selectedTab === "for-sale" ? "Completion status" : "Rent frequency"}
                    className={selectClass}
                  >
                    <option value="">
                      {selectedTab === "for-sale" ? "Completion" : "Rent type"}
                    </option>
                    {subOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.valueShown}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex min-h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:px-10"
              >
                <FaSearch className="h-4 w-4 opacity-90" aria-hidden />
                Search
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 pt-3">
              <button
                type="button"
                onClick={toggleFilters}
                className="rounded-lg border border-neutral-300 bg-neutral-100 px-3.5 py-2 text-sm font-bold text-neutral-900 shadow-sm ring-1 ring-black/5 transition hover:border-neutral-900 hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                {showFilters ? "Hide price & filters" : "Price, beds & more"}
              </button>
              {selectedTab === "off-plan" ? (
                <span className="text-xs font-medium text-neutral-600">
                  Matches projects in our off-plan catalogue
                </span>
              ) : null}
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-neutral-100 bg-neutral-50/90 p-4 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label htmlFor="priceMin" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Min price
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute bottom-3 right-3">
                      <IoIosArrowDown className="h-4 w-4 text-neutral-400" aria-hidden />
                    </span>
                    <select
                      id="priceMin"
                      name="priceMin"
                      value={formData.priceMin}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">No min</option>
                      <option>AED 100,000</option>
                      <option>AED 200,000</option>
                      <option>AED 400,000</option>
                      <option>AED 600,000</option>
                      <option>AED 800,000</option>
                      <option>AED 900,000</option>
                      <option>AED 1,000,000</option>
                      <option>AED 2,000,000</option>
                      <option>AED 3,000,000</option>
                      <option>AED 4,000,000</option>
                      <option>AED 5,000,000</option>
                      <option>AED 6,000,000</option>
                      <option>AED 7,000,000</option>
                      <option>AED 8,000,000</option>
                      <option>AED 9,000,000</option>
                      <option>AED 10,000,000</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="priceMax" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Max price
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute bottom-3 right-3">
                      <IoIosArrowDown className="h-4 w-4 text-neutral-400" aria-hidden />
                    </span>
                    <select
                      id="priceMax"
                      name="priceMax"
                      value={formData.priceMax}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">No max</option>
                      <option>AED 200,000</option>
                      <option>AED 400,000</option>
                      <option>AED 600,000</option>
                      <option>AED 800,000</option>
                      <option>AED 900,000</option>
                      <option>AED 1,000,000</option>
                      <option>AED 2,000,000</option>
                      <option>AED 3,000,000</option>
                      <option>AED 4,000,000</option>
                      <option>AED 5,000,000</option>
                      <option>AED 6,000,000</option>
                      <option>AED 7,000,000</option>
                      <option>AED 8,000,000</option>
                      <option>AED 9,000,000</option>
                      <option>AED 10,000,000</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="propertyType" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Property type
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute bottom-3 right-3">
                      <IoIosArrowDown className="h-4 w-4 text-neutral-400" aria-hidden />
                    </span>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">Any type</option>
                      {(selectedTab === "off-plan"
                        ? [
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
                          ]
                        : ["Apartments", "Villas", "Townhouses", "Penthouse"]
                      ).map((value, index) => (
                        <option key={index} value={value.toLowerCase()}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="bedrooms" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute bottom-3 right-3">
                      <IoIosArrowDown className="h-4 w-4 text-neutral-400" aria-hidden />
                    </span>
                    <select
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">Any</option>
                      {selectedTab === "off-plan"
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
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  className="col-span-1 rounded-xl bg-neutral-100 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-200 sm:col-span-2"
                >
                  Apply filters
                </button>
              </div>
            )}

            {showDropdown && results.length > 0 && !selectedLocation && (
              <div
                ref={dropdownRef}
                className="absolute left-4 right-4 top-full z-[30] mt-2 max-h-56 overflow-y-auto rounded-xl border border-neutral-200 bg-white py-1 shadow-2xl sm:left-5 sm:right-5"
              >
                {results.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex w-full px-4 py-2.5 text-left text-sm text-neutral-700 transition hover:bg-neutral-50"
                    onClick={() => {
                      const label =
                        item.name ||
                        item.location?.name ||
                        (typeof item === "string" ? item : "");
                      setSelectedLocation(label);
                      if (item.id) setSelectedLocationId(item.id);
                      else if (item.location?.id) setSelectedLocationId(item.location.id);
                      else if (item.location_id) setSelectedLocationId(item.location_id);
                      else setSelectedLocationId(null);
                      setQuery("");
                      setShowDropdown(false);
                    }}
                  >
                    {item.name || item.location?.name || (typeof item === "string" ? item : "—")}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center font-custom2 text-xs text-white/75 sm:text-sm">
            <span>No spam · Direct agent contact</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>New projects & resales in one place</span>
          </div>
        </div>
      </div>

      {/*
      Video hero (optional): restore if you prefer motion over static imagery.
      <video autoPlay loop muted playsInline className="..." />
      */}
    </section>
  );
};

export default HomeHero;
