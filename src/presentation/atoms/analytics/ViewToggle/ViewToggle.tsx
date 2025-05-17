"use client";

import React from "react";

export type ViewType = "bar" | "pie" | "bubble" | "cloud" | "treeMap";

interface ViewOption {
  label: string;
  value: ViewType;
  icon: React.ReactNode;
}

interface ViewToggleProps {
  /**
   * Currently selected view type
   */
  value: ViewType;

  /**
   * Available view options
   */
  options: ViewOption[];

  /**
   * Handler for view type changes
   */
  onChange: (viewType: ViewType) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * View toggle component for analytics
 * Allows switching between different visualization types
 */
export const ViewToggle: React.FC<ViewToggleProps> = ({
  value,
  options,
  onChange,
  className = "",
}) => {
  return (
    <div className={`inline-flex rounded-md shadow-sm ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
            option.value === value
              ? "bg-teal-500 text-white"
              : "bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-700"
          } ${
            option.value === options[0].value
              ? "rounded-l-md"
              : option.value === options[options.length - 1].value
              ? "rounded-r-md"
              : ""
          } border border-gray-300 focus:z-10 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200`}
          onClick={() => onChange(option.value)}
          aria-current={option.value === value ? "page" : undefined}
          title={option.label}
        >
          <span className="sr-only">{option.label}</span>
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
