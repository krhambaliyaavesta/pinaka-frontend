"use client";

import React from "react";

interface LimitSelectorProps {
  /**
   * Currently selected limit
   */
  value: number;

  /**
   * Available limit options
   */
  options: number[];

  /**
   * Handler for limit changes
   */
  onChange: (limit: number) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Limit selector component for analytics views
 * Allows controlling how many items to display
 */
export const LimitSelector: React.FC<LimitSelectorProps> = ({
  value,
  options,
  onChange,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <label htmlFor="limit-selector" className="mr-2 text-sm text-gray-700">
        Show:
      </label>
      <select
        id="limit-selector"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            Top {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LimitSelector;
