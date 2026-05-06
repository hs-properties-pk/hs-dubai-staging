import React, { useState, useEffect } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const CountrySelect = ({
  styling,
  value,
  onChange,
  labels,
  flags,
  onPhoneChange,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(
    value ? getCountryCallingCode(value) : "971"
  );

  // Sync countryCode when value prop changes
  useEffect(() => {
    if (value) {
      setCountryCode(getCountryCallingCode(value));
    }
  }, [value]);

  const handleSelection = (country) => {
    onChange(country);
    setCountryCode(getCountryCallingCode(country));
    setIsOpen(false);
    setSearchQuery("");
  };

  const handlePhoneNumberChange = (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
    onPhoneChange(`+${countryCode}${phone}`);
  };

  const filteredCountries = getCountries().filter((country) =>
    labels[country].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-w-0 w-full max-w-full" {...rest}>
      <div className={`flex min-w-0 w-full max-w-full items-center py-2.5 ${styling}`}>
        <button
          type="button"
          className="flex shrink-0 items-center justify-center px-1.5 sm:px-2 outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value && (
            <>
              {flags[value] &&
                React.createElement(flags[value], {
                  className: "mr-2 w-5 h-5",
                })}
              <span>+{countryCode || getCountryCallingCode(value)}</span>
            </>
          )}
          {isOpen ? (
            <IoIosArrowUp className="ml-1" />
          ) : (
            <IoIosArrowDown className="ml-1" />
          )}
        </button>

        <input
          type="tel"
          name="phoneNumber"
          className="min-w-0 flex-1 pl-2 sm:pl-4 focus:outline-none bg-transparent placeholder:text-gray-400"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
          required
        />
      </div>

      {isOpen && (
        <div className="absolute z-[9999] border border-gray-300 bg-white w-full rounded-b shadow-lg mt-1 max-h-[300px] overflow-visible">
          <input
            type="text"
            placeholder="Search countries"
            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto location-dropdown">
            {filteredCountries.map((country) => {
              const Flag = flags[country];
              return (
                <li
                  key={country}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-black"
                  onClick={() => handleSelection(country)}
                >
                  {Flag && <Flag className="mr-2 w-5 h-5 flex-shrink-0" />}
                  <span className="text-sm">
                    {labels[country]} +{getCountryCallingCode(country)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
