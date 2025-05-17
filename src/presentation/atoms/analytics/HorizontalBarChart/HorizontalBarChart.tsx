"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
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
  gradientStart = "#4AC2BA",
  gradientEnd = "#42B4AC",
  maxHeight = 400,
  minWidth = 300,
  showGrid = true,
  className = "",
}) => {
  // Calculate height based on number of items with a minimum of 200px
  const height = Math.max(Math.min(data.length * 50, maxHeight), 200);

  return (
    <div
      className={`w-full ${className}`}
      style={{ height: `${height}px`, minWidth: `${minWidth}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          )}
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            contentStyle={{
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              border: "1px solid #E2E8F0",
              backgroundColor: "#FFFDF5",
            }}
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
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
