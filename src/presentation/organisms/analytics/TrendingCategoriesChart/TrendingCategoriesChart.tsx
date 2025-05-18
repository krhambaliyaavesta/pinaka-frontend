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
 * Trending Categories Chart component
 * Displays a chart of trending categories with filters and controls
 */
export const TrendingCategoriesChart: React.FC<
  TrendingCategoriesChartProps
> = ({ 
  className = "",
  hideTitle = false,
  useColorfulCharts = false,
}) => {
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

  // Colors for the bubbles
  const COLORS = useColorfulCharts
    ? ["#66B2FF", "#FF8A80", "#FFCC80", "#81C784", "#FFB74D", "#80DEEA", "#B388FF", "#4FC3F7"] // Light colorful palette
    : ["#42B4AC", "#4AC2BA", "#5BD3C9", "#6DDDD3", "#85E5DC", "#A5EDE7"]; // Monochrome teal

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
  const barChartData = data.map((category, index) => ({
    name: category.categoryName,
    value: category.count,
    color: useColorfulCharts 
      ? ["#81C784", "#FFB74D", "#FFCC80", "#66B2FF", "#FF8A80", "#B388FF", "#80DEEA", "#4FC3F7"][index % 8]
      : undefined
  }));

  // Gradient colors for bar chart (only used when not colorful)
  const barGradients = useColorfulCharts
    ? { start: "#34A853", end: "#FBBC05" } // Green to yellow gradient
    : { start: "#5BD3C9", end: "#42B4AC" }; // Monochrome teal gradient

  // Custom tooltip for bubble chart
  const BubbleTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md text-sm">
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
      className={`w-full ${useColorfulCharts ? 'bg-white' : 'bg-[#FFFDF5]'} rounded-lg ${className}`}
    >
      {!hideTitle && (
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
          <FiBox className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No category data available</h3>
          <p className="text-gray-500 text-center text-sm">
            Try changing the time period or check back when more kudos have been sent.
          </p>
        </div>
      ) : (
        <div className="chart-container min-h-[320px] w-full flex items-center justify-center">
          {viewType === "bubble" ? (
            <div className="h-[320px] w-full py-2">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 30,
                    bottom: 20,
                    left: 30,
                  }}
                >
                  <XAxis type="number" dataKey="x" name="x" hide domain={[-1, 3]} />
                  <YAxis type="number" dataKey="y" name="y" hide domain={[-1, 3]} />
                  <ZAxis type="number" dataKey="z" range={[50, 500]} />
                  <Tooltip content={<BubbleTooltip />} wrapperStyle={{ zIndex: 100 }} />
                  <Scatter data={bubbleChartData} shape="circle">
                    {bubbleChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={useColorfulCharts ? "#ffffff" : "#E6FAF8"}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[320px] w-full py-2">
              <HorizontalBarChart
                data={barChartData}
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
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingCategoriesChart;
