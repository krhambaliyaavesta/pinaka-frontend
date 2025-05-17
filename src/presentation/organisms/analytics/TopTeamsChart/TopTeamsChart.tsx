"use client";

import React, { useState } from "react";
import { useTopTeams, TopTeam } from "@/modules/analytics";
import { HorizontalBarChart } from "@/presentation/atoms/analytics/HorizontalBarChart";
import { PieChart } from "@/presentation/atoms/analytics/PieChart";
import { PeriodSelector } from "@/presentation/atoms/analytics/PeriodSelector";
import { LimitSelector } from "@/presentation/atoms/analytics/LimitSelector";
import {
  ViewToggle,
  ViewType,
} from "@/presentation/atoms/analytics/ViewToggle";

interface TopTeamsChartProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Top Teams Chart component
 * Displays a chart of top teams with filters and controls
 */
export const TopTeamsChart: React.FC<TopTeamsChartProps> = ({
  className = "",
}) => {
  // Available limit options
  const limitOptions = [5, 10, 20];

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
      label: "Pie Chart",
      value: "pie" as ViewType,
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
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
      ),
    },
  ];

  // Get top teams data
  const {
    data,
    loading,
    error,
    period,
    limit,
    updatePeriod,
    updateLimit,
    refresh,
  } = useTopTeams({
    defaultPeriod: "monthly",
    defaultLimit: 10,
  });

  // Transform data for the chart
  const chartData = data.map((team: TopTeam) => ({
    name: team.teamName,
    value: team.count,
  }));

  // Use a slightly different shade of teal for variety
  const pieColors = [
    "#42B4AC", // Primary teal
    "#4AC2BA", // Light teal
    "#5BD3C9", // Lighter teal
    "#6DDDD3", // Even lighter teal
    "#85E5DC", // Very light teal
    "#A5EDE7", // Ultra light teal
  ];

  // Gradient colors for bar chart
  const barGradients = {
    start: "#5BD3C9", // Start with lighter teal
    end: "#42B4AC", // End with darker teal
  };

  // If there's an error, display it
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-md">
        <p>Error loading top teams data: {error.message}</p>
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
          Top Teams
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
        <PieChart
          data={chartData}
          dataKey="value"
          colors={pieColors}
          maxHeight={350}
          outerRadius={120}
        />
      )}
    </div>
  );
};

export default TopTeamsChart;
