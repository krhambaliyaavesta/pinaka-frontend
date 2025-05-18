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
import { Loader } from "@/presentation/atoms/common";
import { FaUsers } from "react-icons/fa";
import { BiBarChartAlt2, BiPieChart } from "react-icons/bi";

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
      icon: <BiBarChartAlt2 size={20} />,
    },
    {
      label: "Pie Chart",
      value: "pie" as ViewType,
      icon: <BiPieChart size={20} />,
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
        <div className="h-64">
          <Loader fullScreen={false} />
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-[#FFFDF5] border border-gray-200 rounded-lg p-6">
          <FaUsers className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No team data available</h3>
          <p className="text-gray-500 text-center text-sm">
            Try changing the time period or check back later.
          </p>
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
