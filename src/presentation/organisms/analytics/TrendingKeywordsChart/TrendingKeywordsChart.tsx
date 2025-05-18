"use client";

import React, { useState } from "react";
import { useTrendingKeywords } from "@/modules/analytics";
import { HorizontalBarChart } from "@/presentation/atoms/analytics/HorizontalBarChart";
import { TagCloud } from "@/presentation/atoms/analytics/TagCloud";
import { PeriodSelector } from "@/presentation/atoms/analytics/PeriodSelector";
import { LimitSelector } from "@/presentation/atoms/analytics/LimitSelector";
import {
  ViewToggle,
  ViewType,
} from "@/presentation/atoms/analytics/ViewToggle";

interface TrendingKeywordsChartProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Trending Keywords Chart component
 * Displays a chart of trending keywords with filters and controls
 */
export const TrendingKeywordsChart: React.FC<TrendingKeywordsChartProps> = ({
  className = "",
}) => {
  // Available limit options
  const limitOptions = [10, 20, 30];

  // View options
  const [viewType, setViewType] = useState<ViewType>("bar");
  const viewOptions = [
    {
      label: "Bar Chart",
      value: "bar" as ViewType,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 22h16"></path>
          <path d="M4 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"></path>
          <path d="M8 22v-4"></path>
          <path d="M12 22v-10"></path>
          <path d="M16 22v-6"></path>
        </svg>
      ),
    },
    {
      label: "Tag Cloud",
      value: "cloud" as ViewType,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
          <path d="M12 12v9"></path>
          <path d="m8 17 4 4 4-4"></path>
        </svg>
      ),
    },
  ];

  // Get trending keywords data
  const {
    data,
    loading,
    error,
    period,
    limit,
    updatePeriod,
    updateLimit,
    refresh,
  } = useTrendingKeywords({
    defaultPeriod: "monthly",
    defaultLimit: 10,
  });

  // Transform data for the chart
  const chartData = data.map((keyword) => ({
    name: keyword.keyword,
    value: keyword.count,
  }));

  // Gradient colors for bar chart
  const barGradients = {
    start: "#5BD3C9", // Start with lighter teal
    end: "#42B4AC", // End with darker teal
  };

  // If there's an error, display it
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-md">
        <p>Error loading trending keywords data: {error.message}</p>
        <button
          onClick={refresh}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-[#FFFDF5] p-4 rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0 text-gray-800">
          Trending Keywords
        </h2>
        <div className="flex flex-wrap gap-2">
          <PeriodSelector
            value={period}
            onChange={updatePeriod}
            className="mr-2"
          />
          <LimitSelector
            value={limit}
            options={limitOptions}
            onChange={updateLimit}
            className="mr-2"
          />
          <ViewToggle
            value={viewType}
            options={viewOptions}
            onChange={setViewType}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500">
          No data available
        </div>
      ) : viewType === "bar" ? (
        <HorizontalBarChart
          data={chartData}
          dataKey="value"
          barColor="#42B4AC"
          useGradient={true}
          gradientStart={barGradients.start}
          gradientEnd={barGradients.end}
        />
      ) : (
        <TagCloud
          data={chartData}
          dataKey="value"
          colorScheme="teal"
          maxHeight={350}
          minFontSize={14}
          maxFontSize={40}
        />
      )}
    </div>
  );
};

export default TrendingKeywordsChart;
