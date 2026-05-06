import { FaChevronDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoClose, IoFilter } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const Select = ({ options, className }) => (
  <div className={twMerge("relative w-full", className)}>
    <select className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2 w-full focus:outline-none hover:bg-white/20">
      {options.map((option) => (
        <option key={option} className="text-black">
          {option}
        </option>
      ))}
    </select>
    <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
  </div>
);

export default function SearchBar() {
  // const [selectedTab, setSelectedTab] = useState("Buy");

  const completionStatusOptions = ["Completion Status", "Ready", "Off-Plan"];
  const priceOptions = ["Any", "50K", "100K", "200K", "500K", "1M", "2M+"];
  const propertyTypes = ["Property Type", "Apartment", "Villa", "Townhouse"];
  const bedrooms = ["Bedrooms", "Studio", "1", "2", "3", "4+"];

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
      // { valueShown: "All", value: "" },
      { valueShown: "Ready", value: "completed" },
      { valueShown: "Off-Plan", value: "under-construction" },
    ],
    "for-rent": [
      { valueShown: "Yearly", value: "yearly" },
      { valueShown: "Quarterly", value: "quarterly" },
      { valueShown: "Monthly", value: "monthly" },
      // { valueShown: "Any", value: "" },
    ],
    "off-plan": [
      // { valueShown: "All", value: "" },
      // { valueShown: "Ready", value: "completed" },
      // { valueShown: "Off-Plan", value: "under-construction" },
    ],
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const query = {};
    if (selectedLocation) query.location = selectedLocation;
    if (selectedLocationId) query.locationId = selectedLocationId; // Pass location ID
    if (formData.subOption) query.subOption = formData.subOption;
    if (formData.propertyType) query.propertyType = formData.propertyType;
    if (formData.priceMin) query.priceMin = formData.priceMin;
    if (formData.priceMax) query.priceMax = formData.priceMax;
    if (formData.bedrooms) query.bedrooms = formData.bedrooms;

    const queryString = new URLSearchParams(query).toString();
    router.push(`/properties/${selectedTab}?${queryString}`);
  };

  const handleTabClick = (tab) => {
    setFormData({ ...formData, buyRent: tab });
    setSelectedTab(tab);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

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
    if (!searchQuery) return;
    try {
      const response = await axios.get("/api/bayut/locations-search", {
        params: { query: searchQuery },
      });
      // New API response structure - adjust based on actual response
      const suggestions = response.data.hits || response.data.results || response.data || [];
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
    <div className="w-full px-4 py-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl ">
      <div className="flex flex-wrap justify-center md:justify-between gap-1 items-center">
        {/* Tabs */}
        <div className="flex gap-2 w-full md:w-auto justify-center">
          {[
            { valueShown: "Buy", value: "for-sale" },
            { valueShown: "Rent", value: "for-rent" },
            { valueShown: "Off Plan", value: "off-plan" },
          ].map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(tab.value)}
              className={twMerge(
                "px-5 py-2.5 text-xs md:text-sm rounded-full border transition-all",
                selectedTab === tab.value
                  ? "bg-white text-black border-white"
                  : "text-white border-white/30 hover:border-white"
              )}
            >
              {tab.valueShown}
            </button>
          ))}
        </div>
        {/* Location Input */}
        <div className="   items-center  relative hidden md:flex">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={!selectedLocation && "Enter Location"}
            onFocus={() => query && setShowDropdown(true)}
            className="bg-white/10 text-white placeholder-gray-300 text-sm rounded-full px-4 py-2.5 focus:outline-none border border-white/20 hover:bg-white/20 w-full md:w-64"
            // className="flex-grow py-4 px-2 lg:px-4 focus:outline-none"
            // className="  bg-white md:py-1 flex items-center border border-[#e5e7eb] rounded-lg shadow-md overflow-hidden relative"
          />
          {selectedLocation && (
            <div className=" absolute top-2 left-3 flex  items-center  space-x-2 bg-white px-2  py-1  rounded-full border border-gray-300 w-max">
              <span className="text-gray-700 text-xs">{selectedLocation}</span>
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
          {showDropdown && results.length > 0 && !selectedLocation && (
            <div
              ref={dropdownRef}
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-56 overflow-y-auto location-dropdown"
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
                  {item.name}{" "}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        {selectedTab !== "off-plan" && (
          <div className="relative w-full md:w-44 hidden md:block">
            <select
              id="subOption"
              name="subOption"
              value={formData.subOption}
              onChange={handleChange}
              className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2.5 w-full focus:outline-none hover:bg-white/20 "
            >
              <option value="" disabled>
                {selectedTab === "for-sale"
                  ? "Completion Status"
                  : "Rent Frequency"}
              </option>
              {optionsMap[selectedTab].map((option, index) => (
                <option key={index} value={option.value} className="text-black">
                  {option.valueShown}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
          </div>
        )}
        {/* <Select */}
        <div className="relative w-full md:w-36 hidden md:block">
          <select
            id="priceMin"
            name="priceMin"
            value={formData.priceMin}
            onChange={handleChange}
            className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2.5 w-full focus:outline-none hover:bg-white/20"
          >
            <option value="" disabled>
              Price Min
            </option>
            <option className="text-black">AED 100,000</option>
            <option className="text-black">AED 200,000</option>
            <option className="text-black">AED 400,000</option>
            <option className="text-black">AED 600,000</option>
            <option className="text-black">AED 800,000</option>
            <option className="text-black">AED 900,000</option>
            <option className="text-black">AED 1,000,000</option>
            <option className="text-black">AED 2,000,000</option>
            <option className="text-black">AED 3,000,000</option>
            <option className="text-black">AED 4,000,000</option>
            <option className="text-black">AED 5,000,000</option>
            <option className="text-black">AED 6,000,000</option>
            <option className="text-black">AED 7,000,000</option>
            <option className="text-black">AED 8,000,000</option>
            <option className="text-black">AED 9,000,000</option>
            <option className="text-black">AED 10,000,000</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
        </div>
        <div className="relative w-full md:w-36 hidden md:block">
          <select
            id="priceMax"
            name="priceMax"
            value={formData.priceMax}
            onChange={handleChange}
            className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2.5 w-full focus:outline-none hover:bg-white/20"
          >
            <option value="" disabled>
              Price Max
            </option>
            <option className="text-black">AED 200,000</option>
            <option className="text-black">AED 400,000</option>
            <option className="text-black">AED 600,000</option>
            <option className="text-black">AED 800,000</option>
            <option className="text-black">AED 900,000</option>
            <option className="text-black">AED 1,000,000</option>
            <option className="text-black">AED 2,000,000</option>
            <option className="text-black">AED 3,000,000</option>
            <option className="text-black">AED 4,000,000</option>
            <option className="text-black">AED 5,000,000</option>
            <option className="text-black">AED 6,000,000</option>
            <option className="text-black">AED 7,000,000</option>
            <option className="text-black">AED 8,000,000</option>
            <option className="text-black">AED 9,000,000</option>
            <option className="text-black">AED 10,000,000</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
        </div>
        <div className="relative w-full md:w-36 hidden md:block">
          <select
            id="priceMax"
            name="priceMax"
            value={formData.priceMax}
            onChange={handleChange}
            className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2.5 w-full focus:outline-none hover:bg-white/20"
          >
            <option value="" disabled>
              Price Max
            </option>
            <option className="text-black">AED 200,000</option>
            <option className="text-black">AED 400,000</option>
            <option className="text-black">AED 600,000</option>
            <option className="text-black">AED 800,000</option>
            <option className="text-black">AED 900,000</option>
            <option className="text-black">AED 1,000,000</option>
            <option className="text-black">AED 2,000,000</option>
            <option className="text-black">AED 3,000,000</option>
            <option className="text-black">AED 4,000,000</option>
            <option className="text-black">AED 5,000,000</option>
            <option className="text-black">AED 6,000,000</option>
            <option className="text-black">AED 7,000,000</option>
            <option className="text-black">AED 8,000,000</option>
            <option className="text-black">AED 9,000,000</option>
            <option className="text-black">AED 10,000,000</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
        </div>
        <div className="relative w-full md:w-44 hidden md:block">
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2.5 w-full focus:outline-none hover:bg-white/20"
          >
            <option value="" disabled>
              Property Type
            </option>

            {(selectedTab === "off-plan"
              ? [
                  "Apartment",
                  "Villa",
                  "Townhouse",
                  "Penthouse",
                  "Plot",
                  "Retail Space",
                ]
              : ["Apartments", "Villas", "Townhouses", "Penthouse"]
            ).map((value, index) => (
              <option
                key={index}
                value={value.toLowerCase()}
                className="text-black"
              >
                {value}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
        </div>
        {/* <Select options={propertyTypes} className="w-full md:w-44" /> */}
        {/* <Select options={bedrooms} className="w-full md:w-36" /> */}
        <div className="relative w-full md:w-36 hidden md:block">
          <select
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="appearance-none bg-white/10 border border-white/20 text-white text-sm rounded-full px-4 py-2.5 w-full focus:outline-none hover:bg-white/20"
          >
            <option value="" disabled>
              Bedrooms
            </option>
            {selectedTab === "off-plan"
              ? bedroomsValuesOffPlan.map((value, index) => (
                  <option
                    key={index}
                    value={value.value}
                    className="text-black"
                  >
                    {value.valueShown}
                  </option>
                ))
              : bedroomsValues.map((value, index) => (
                  <option
                    key={index}
                    value={value.value}
                    className="text-black"
                  >
                    {value.valueShown}
                  </option>
                ))}
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xs pointer-events-none" />
        </div>
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-200 transition w-full md:w-auto hidden md:block"
        >
          Search
        </button>
        <div className="  bg-white/10 md:py-1 flex items-center border border-white/20 rounded-full shadow-md overflow-hidden relative w-full  md:hidden mt-2 text-xs">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={!selectedLocation && "Enter Location"}
            onFocus={() => query && setShowDropdown(true)}
            className="flex-grow py-4 px-3 lg:px-4 focus:outline-none bg-transparent"
          />

          {selectedLocation && (
            <div className=" absolute top-3 left-4 flex  items-center  space-x-2 bg-gray-100 px-2 md:px-4 py-1 md:py-2  rounded-md border border-gray-300 w-max">
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
          {selectedTab !== "off-plan" && (
            <div className="relative max-w-sm hidden xl:block pr-3">
              <span className="absolute top-2 right-2 flex items-center pr-3 pointer-events-none ">
                <IoIosArrowDown className="h-4 w-4 text-black bg-white rounded-full" />
              </span>

              <select
                id="subOption"
                name="subOption"
                value={formData.subOption}
                onChange={handleChange}
                className="appearance-none tracking-wider text-sm flex items-center bg-transparent px-2 py-1 pr-8 border-2 border-[#e5e7eb] rounded-md"
              >
                <option value="" disabled>
                  {selectedTab === "for-sale"
                    ? "Completion Status"
                    : "Rent Frequency"}
                </option>
                {optionsMap[selectedTab].map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.valueShown}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="relative max-w-md  text-xs">
            <button
              className={`flex items-center bg-white  border-2 rounded-full  p-1 mr-2 ${
                showFilters ? "border-black" : "border-white/10"
              }`}
              onClick={toggleFilters}
            >
              {/* <p className="tracking-widest text-white">Filter</p> */}
              <IoFilter className="h-5 w-5 text-black  bg-transparent " />
            </button>
          </div>

          <div
            onClick={handleSearch}
            className="bg-white text-black py-1.5 lg:py-2 px-2 lg:px-3 focus:outline-none rounded-full mr-3 hover:bg-gray-800 duration-300 cursor-pointer"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {showFilters && (
          <div className="absolute -bottom-52 right-0  mt-2 bg-white border rounded-lg shadow-lg p-4 grid grid-cols-2 gap-3 lg:gap-4 w-full z-10 font-custom2">
            <div className="relative">
              <label className="text-black font-semibold">Minimum Price</label>
              <span className="absolute bottom-3.5 right-0 flex items-center pr-3 pointer-events-none ">
                <IoIosArrowDown className="h-4 w-4 text-black bg-white rounded-full" />
              </span>
              <select
                id="priceMin"
                name="priceMin"
                value={formData.priceMin}
                onChange={handleChange}
                className="w-full border p-2 rounded-md bg-white"
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
            <div className="relative">
              <label className="text-black font-semibold">Maximum Price</label>
              <span className="absolute bottom-3.5 right-0 flex items-center pr-3 pointer-events-none ">
                <IoIosArrowDown className="h-4 w-4 text-black bg-white rounded-full" />
              </span>
              <select
                id="priceMax"
                name="priceMax"
                value={formData.priceMax}
                onChange={handleChange}
                className="w-full border p-2 rounded-md bg-white"
              >
                <option value="" disabled>
                  Price Max
                </option>
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
            <div className="relative">
              <label className="text-black font-semibold">Property Type</label>
              <span className="absolute bottom-3.5 right-0 flex items-center pr-3 pointer-events-none ">
                <IoIosArrowDown className="h-4 w-4 text-black bg-white rounded-full" />
              </span>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border p-2 rounded-md bg-white"
              >
                <option value="" disabled>
                  Property Type
                </option>

                {(selectedTab === "off-plan"
                  ? [
                      "Apartment",
                      "Villa",
                      "Townhouse",
                      "Penthouse",
                      "Plot",
                      "Retail Space",
                    ]
                  : ["Apartments", "Villas", "Townhouses", "Penthouse"]
                ).map((value, index) => (
                  <option key={index} value={value.toLowerCase()}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="text-black font-semibold">Bedrooms</label>
              <span className="absolute bottom-3.5 right-0 flex items-center pr-3 pointer-events-none ">
                <IoIosArrowDown className="h-4 w-4 text-black bg-white rounded-full" />
              </span>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border p-2 rounded-md bg-white"
              >
                <option value="" disabled>
                  Bedrooms
                </option>
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
            <button
              onClick={handleSearch}
              className="col-span-2 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 duration-300"
            >
              Search
            </button>
          </div>
        )}

        {showDropdown && results.length > 0 && !selectedLocation && (
          <div
            ref={dropdownRef}
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-56 overflow-y-auto location-dropdown"
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
  );
}
