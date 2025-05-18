"use client";

import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
  [key: string]: any;
}

interface PieChartProps {
  /**
   * Data to display in the chart
   */
  data: DataItem[];

  /**
   * Name of the data field to display in the pie
   * @default 'value'
   */
  dataKey?: string;

  /**
   * Array of colors to use for the pie slices
   * @default ['#42B4AC', '#4AC2BA', '#5BD3C9', '#6DDDD3', '#85E5DC', '#A5EDE7']
   */
  colors?: string[];

  /**
   * Size of the inner radius (for donut chart effect)
   * @default 0
   */
  innerRadius?: number;

  /**
   * Size of the outer radius
   * @default 80
   */
  outerRadius?: number;

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
   * Whether to show legend
   * @default true
   */
  showLegend?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Pie chart component for analytics
 * Uses Recharts library to render a responsive pie chart
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey = "value",
  colors = ["#42B4AC", "#4AC2BA", "#5BD3C9", "#6DDDD3", "#85E5DC", "#A5EDE7"],
  innerRadius = 0,
  outerRadius = 80,
  maxHeight = 400,
  minWidth = 300,
  showLegend = true,
  className = "",
}) => {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div
        className={`flex justify-center items-center h-64 text-gray-500 ${className}`}
      >
        No data available
      </div>
    );
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#FFFDF5] p-3 border border-gray-200 rounded-md shadow-md text-sm">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600 mt-1">{`${dataKey}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Define gradients for pie slices
  const gradients = [
    { id: "gradient1", start: "#4AC2BA", end: "#42B4AC" }, // Teal
    { id: "gradient2", start: "#5BD3C9", end: "#4AC2BA" }, // Light teal
    { id: "gradient3", start: "#6DDDD3", end: "#5BD3C9" }, // Lighter teal
    { id: "gradient4", start: "#85E5DC", end: "#6DDDD3" }, // Very light teal
    { id: "gradient5", start: "#A5EDE7", end: "#85E5DC" }, // Ultra light teal
    { id: "gradient6", start: "#C8F5F1", end: "#A5EDE7" }, // Almost white teal
  ];

  return (
    <div
      className={`w-full ${className}`}
      style={{ height: `${maxHeight}px`, minWidth: `${minWidth}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <defs>
            {gradients.map((gradient) => (
              <linearGradient
                key={gradient.id}
                id={gradient.id}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor={gradient.start} stopOpacity={1} />
                <stop offset="100%" stopColor={gradient.end} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#42B4AC"
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#${gradients[index % gradients.length].id})`}
                stroke={colors[index % colors.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              formatter={(value: string) => (
                <span className="text-gray-700">{value}</span>
              )}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
