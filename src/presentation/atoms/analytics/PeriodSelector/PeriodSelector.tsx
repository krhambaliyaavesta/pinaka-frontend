"use client";

import React from "react";
import { PeriodType } from "@/modules/analytics";

interface PeriodSelectorProps {
  /**
   * Currently selected period
   */
  value: PeriodType;

  /**
   * Handler for period changes
   */
  onChange: (period: PeriodType) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Period selector component for analytics views
 * Allows switching between weekly, monthly, and yearly data
 */
export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const periods: { label: string; value: PeriodType }[] = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  return (
    <div className={`inline-flex rounded-md shadow-sm ${className}`}>
      {periods.map((period) => (
        <button
          key={period.value}
          type="button"
          className={`px-4 py-2 text-sm font-medium ${
            period.value === value
              ? "bg-teal-500 text-white"
              : "bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-700"
          } ${
            period.value === "weekly"
              ? "rounded-l-md"
              : period.value === "yearly"
              ? "rounded-r-md"
              : ""
          } border border-gray-300 focus:z-10 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200`}
          onClick={() => onChange(period.value)}
          aria-current={period.value === value ? "page" : undefined}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
