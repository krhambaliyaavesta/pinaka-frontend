"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface FilterOption {
  id: string;
  name: string;
}

export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedOption: FilterOption | null;
  onSelect: (option: FilterOption | null) => void;
  placeholder?: string;
}

export function FilterDropdown({
  label,
  options,
  selectedOption,
  onSelect,
  placeholder = "Select an option"
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: FilterOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onSelect(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div 
        className="w-full flex items-center justify-between p-2 px-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm cursor-pointer hover:border-blue-400 hover:bg-gray-100 transition-all duration-200"
        onClick={toggleDropdown}
      >
        <span className={`${selectedOption ? "text-gray-900" : "text-gray-500"}`}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <FaChevronDown
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180 text-blue-500" : ""}`}
          size={16}
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-50 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              onClick={handleClearSelection}
            >
              Clear selection
            </button>
            {options.map((option) => (
              <button
                key={option.id}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                  selectedOption?.id === option.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 