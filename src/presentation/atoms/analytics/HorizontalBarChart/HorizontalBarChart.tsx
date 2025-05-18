"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface HorizontalBarChartProps {
  /**
   * Data to display in the chart
   */
  data: DataItem[];

  /**
   * Name of the data field to display in the bar
   * @default 'value'
   */
  dataKey?: string;

  /**
   * The bar color or gradient
   * @default '#42B4AC'
   */
  barColor?: string;

  /**
   * Whether to use gradient for bars
   * @default true
   */
  useGradient?: boolean;
  
  /**
   * Whether to use custom colors from data.color
   * @default false
   */
  useCustomBarColors?: boolean;

  /**
   * The bar's gradient start color
   * @default '#4AC2BA'
   */
  gradientStart?: string;

  /**
   * The bar's gradient end color
   * @default '#42B4AC'
   */
  gradientEnd?: string;

  /**
   * Maximum height of the chart
   * @default 400
   */
  maxHeight?: number;

  /**
   * Minimum width of the chart
   * @default 300
   */
  minWidth?: number;

  /**
   * Whether to show grid lines
   * @default true
   */
  showGrid?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Horizontal bar chart component for analytics
 * Uses Recharts library to render a responsive horizontal bar chart
 */
export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  dataKey = "value",
  barColor = "#42B4AC",
  useGradient = true,
  useCustomBarColors = false,
  gradientStart = "#4AC2BA",
  gradientEnd = "#42B4AC",
  maxHeight = 400,
  minWidth = 300,
  showGrid = true,
  className = "",
}) => {
  // State to track if we're on a mobile screen
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen on client
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    // Initial check
    checkMobile();
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate height based on number of items with a minimum of 200px
  const height = Math.max(Math.min(data.length * 50, maxHeight), 200);

  // Custom tooltip to ensure text isn't cut off
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow text-sm">
          <p className="font-semibold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-gray-600">{`${dataKey}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate margins based on screen size
  const margins = isMobile 
    ? { top: 5, right: 10, left: 10, bottom: 5 }
    : { top: 5, right: 30, left: 20, bottom: 5 };

  // Determine the Y-axis width based on screen size
  const yAxisWidth = isMobile ? 100 : 150;

  return (
    <div
      className={`w-full ${className}`}
      style={{ height: `${height}px`, minWidth: `${minWidth}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={margins}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          )}
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            width={yAxisWidth}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickFormatter={(value) => {
              // Truncate long names to prevent overlap
              const maxLength = isMobile ? 12 : 20;
              return value.length > maxLength ? `${value.substring(0, maxLength - 2)}...` : value;
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            wrapperStyle={{ zIndex: 100 }}
          />
          <defs>
            {useGradient && (
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={gradientStart} />
                <stop offset="100%" stopColor={gradientEnd} />
              </linearGradient>
            )}
          </defs>
          <Bar
            dataKey={dataKey}
            fill={useGradient ? "url(#barGradient)" : barColor}
            radius={[0, 4, 4, 0]}
            barSize={isMobile ? 15 : 20}
          >
            {useCustomBarColors && 
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || barColor} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
