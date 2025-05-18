"use client";

import React, { useState } from "react";
import { useTrendingCategories } from "@/modules/analytics";
import { HorizontalBarChart } from "@/presentation/atoms/analytics/HorizontalBarChart";
import { PeriodSelector } from "@/presentation/atoms/analytics/PeriodSelector";
import { LimitSelector } from "@/presentation/atoms/analytics/LimitSelector";
import {
  ViewToggle,
  ViewType,
} from "@/presentation/atoms/analytics/ViewToggle";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Loader } from "@/presentation/atoms/common";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiBox } from "react-icons/fi";
import { BsCircle } from "react-icons/bs";

interface TrendingCategoriesChartProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Trending Categories Chart component
 * Displays a chart of trending categories with filters and controls
 */
export const TrendingCategoriesChart: React.FC<
  TrendingCategoriesChartProps
> = ({ className = "" }) => {
  // Available limit options
  const limitOptions = [5, 10, 15];

  // View options
  const [viewType, setViewType] = useState<ViewType>("bubble");
  const viewOptions = [
    {
      label: "Bubble Chart",
      value: "bubble" as ViewType,
      icon: <BsCircle size={20} />,
    },
    {
      label: "Bar Chart",
      value: "bar" as ViewType,
      icon: <BiBarChartAlt2 size={20} />,
    },
  ];

  // Get trending categories data
  const {
    data,
    loading,
    error,
    period,
    limit,
    updatePeriod,
    updateLimit,
    refresh,
  } = useTrendingCategories({
    defaultPeriod: "monthly",
    defaultLimit: 10,
  });

  // Colors for the bubbles - using teal color scheme
  const COLORS = [
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

  // Transform data for the bubble chart
  const bubbleChartData = data.map((category, index) => ({
    x: index % 3, // Position in grid
    y: Math.floor(index / 3), // Position in grid
    z: category.count, // Size based on count
    name: category.categoryName,
    count: category.count,
    color: COLORS[index % COLORS.length],
  }));

  // Transform data for the bar chart
  const barChartData = data.map((category) => ({
    name: category.categoryName,
    value: category.count,
  }));

  // Custom tooltip for bubble chart
  const BubbleTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFDF5] p-3 border border-gray-200 rounded-md shadow-md text-sm">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600 mt-1">Count: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  // If there's an error, display it
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-md">
        <p>Error loading trending categories data: {error.message}</p>
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
          Trending Categories
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
          <FiBox className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No category data available</h3>
          <p className="text-gray-500 text-center text-sm">
            Try changing the time period or check back when more kudos have been sent.
          </p>
        </div>
      ) : viewType === "bubble" ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis type="number" dataKey="x" name="x" hide domain={[-1, 3]} />
              <YAxis type="number" dataKey="y" name="y" hide domain={[-1, 3]} />
              <ZAxis type="number" dataKey="z" range={[50, 500]} />
              <Tooltip content={<BubbleTooltip />} />
              <Scatter data={bubbleChartData} shape="circle">
                {bubbleChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#E6FAF8"
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <HorizontalBarChart
          data={barChartData}
          dataKey="value"
          barColor="#42B4AC"
          useGradient={true}
          gradientStart={barGradients.start}
          gradientEnd={barGradients.end}
        />
      )}
    </div>
  );
};

export default TrendingCategoriesChart;
