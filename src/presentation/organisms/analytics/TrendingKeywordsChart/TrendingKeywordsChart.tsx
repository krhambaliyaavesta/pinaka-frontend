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
import { Loader } from "@/presentation/atoms/common";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import { FaCloud } from "react-icons/fa";

interface TrendingKeywordsChartProps {
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
 * Trending Keywords Chart component
 * Displays a chart of trending keywords with filters and controls
 */
export const TrendingKeywordsChart: React.FC<TrendingKeywordsChartProps> = ({
  className = "",
  hideTitle = false,
  useColorfulCharts = false,
}) => {
  // Available limit options
  const limitOptions = [10, 20, 30];

  // View options
  const [viewType, setViewType] = useState<ViewType>("bar");
  const viewOptions = [
    {
      label: "Bar Chart",
      value: "bar" as ViewType,
      icon: <BiBarChartAlt2 size={20} />,
    },
    {
      label: "Tag Cloud",
      value: "cloud" as ViewType,
      icon: <FaCloud size={20} />,
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
  const chartData = data.map((keyword, index) => ({
    name: keyword.keyword,
    value: keyword.count,
    color: useColorfulCharts 
      ? ["#B388FF", "#66B2FF", "#80DEEA", "#81C784", "#FFCC80", "#FFB74D", "#FF8A80", "#F06292"][index % 8]
      : undefined
  }));

  // Gradient colors for bar chart (only used when not colorful)
  const barGradients = useColorfulCharts
    ? { start: "#B388FF", end: "#66B2FF" } // Light purple to light blue gradient
    : { start: "#5BD3C9", end: "#42B4AC" }; // Monochrome teal gradient

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
      className={`w-full ${useColorfulCharts ? 'bg-white' : 'bg-[#FFFDF5]'} rounded-lg ${className}`}
    >
      {!hideTitle && (
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
          <BsChatSquareText className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No keyword data available</h3>
          <p className="text-gray-500 text-center text-sm">
            Try changing the time period or check back when more kudos cards have been created.
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
              <TagCloud
                data={chartData}
                dataKey="value"
                colorScheme={useColorfulCharts ? "multi" : "teal"}
                maxHeight={320}
                minFontSize={14}
                maxFontSize={40}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingKeywordsChart;
