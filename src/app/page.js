"use client";

import { useState } from "react";
import { countriesWithGreetings } from "@/data/countries";
import { FiCopy } from "react-icons/fi";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCountries = countriesWithGreetings.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setQuery(country.name);
    setShowDropdown(false); // Hide dropdown after selection
    setCopiedIndex(null);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-left">
        Country Greeting Finder
      </h1>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a country..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true); // Show dropdown when typing
          }}
        />

        {/* Autocomplete Dropdown */}
        {query && showDropdown && filteredCountries.length > 0 && (
          <ul className="absolute w-full bg-white border mt-1 rounded-md shadow-md z-10">
            {filteredCountries.map((country) => (
              <li
                key={country.name}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(country)}
              >
                {country.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="min-h-[50dvh] w-full">
        {/* Display Greeting */}
        {selectedCountry && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-full mx-auto max-w-md">
            <h2 className="text-lg font-semibold">{selectedCountry.name}</h2>

            {/* Show multiple greetings with copy buttons */}
            <div className="mt-2 space-y-2">
              {selectedCountry.greetings.map((greeting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <p>{greeting}</p>
                  <button
                    onClick={() => copyToClipboard(greeting, index)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FiCopy size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Copy Confirmation Message */}
            {copiedIndex !== null && (
              <p className="mt-2 text-green-500">Copied to clipboard!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
