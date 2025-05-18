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
  /**
   * Hide the chart title
   */
  hideTitle?: boolean;
  /**
   * Use colorful chart theme instead of monochrome
   */
  useColorfulCharts?: boolean;
}

/**
 * Top Teams Chart component
 * Displays a chart of top teams with filters and controls
 */
export const TopTeamsChart: React.FC<TopTeamsChartProps> = ({
  className = "",
  hideTitle = false,
  useColorfulCharts = false,
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
  const chartData = data.map((team: TopTeam, index) => ({
    name: team.teamName,
    value: team.count,
    color: useColorfulCharts 
      ? ["#FFB74D", "#FF8A80", "#FFCC80", "#81C784", "#66B2FF", "#80DEEA", "#B388FF", "#4FC3F7"][index % 8]
      : undefined
  }));

  // Colors for the pie chart
  const pieColors = useColorfulCharts 
    ? ["#FFB74D", "#FF8A80", "#FFCC80", "#81C784", "#66B2FF", "#80DEEA", "#B388FF", "#4FC3F7"] // Light colorful palette (orange first)
    : ["#42B4AC", "#4AC2BA", "#5BD3C9", "#6DDDD3", "#85E5DC", "#A5EDE7"]; // Monochrome teal

  // Gradient colors for bar chart (only used when not colorful)
  const barGradients = useColorfulCharts 
    ? { start: "#EA4335", end: "#FF6D01" } // Red to orange gradient
    : { start: "#5BD3C9", end: "#42B4AC" }; // Monochrome teal gradient

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
      className={`w-full ${useColorfulCharts ? 'bg-white' : 'bg-[#FFFDF5]'} rounded-lg ${className}`}
    >
      {!hideTitle && (
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
      )}

      {hideTitle && (
        <div className="flex flex-wrap gap-2 justify-end mb-4">
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
      )}

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
      ) : (
        <div className="chart-container min-h-[320px] w-full flex items-center justify-center">
          {viewType === "bar" ? (
            <div className="h-[320px] w-full py-2">
              <HorizontalBarChart
                data={chartData}
                dataKey="value"
                barColor={useColorfulCharts ? undefined : "#42B4AC"}
                useGradient={!useColorfulCharts}
                useCustomBarColors={useColorfulCharts}
                gradientStart={barGradients.start}
                gradientEnd={barGradients.end}
                maxHeight={320}
                minWidth={400}
              />
            </div>
          ) : (
            <div className="h-[320px] w-full py-2 px-2 sm:px-4">
              <PieChart
                data={chartData}
                dataKey="value"
                colors={pieColors}
                maxHeight={320}
                minWidth={400}
                outerRadius={70}
                useColorfulChart={useColorfulCharts}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopTeamsChart;
