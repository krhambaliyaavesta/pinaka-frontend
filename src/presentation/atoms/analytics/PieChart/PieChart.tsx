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
  color?: string;
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
   * Whether to use colorful chart theme instead of monochrome
   * @default false
   */
  useColorfulChart?: boolean;

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
  useColorfulChart = false,
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

  // Define vibrant colorful palette for the chart
  const colorfulPalette = [
    "#66B2FF", // Light Blue
    "#FF8A80", // Light Red
    "#FFCC80", // Light Orange
    "#81C784", // Light Green
    "#FFB74D", // Light Amber
    "#80DEEA", // Light Cyan
    "#B388FF", // Light Purple
    "#4FC3F7", // Light Sky Blue
    "#9575CD", // Light Deep Purple
    "#7FCCAF", // Light Teal
    "#FF8A65", // Light Deep Orange
    "#F06292", // Light Pink
  ];

  // Choose which colors to use based on useColorfulChart prop
  const chartColors = useColorfulChart ? colorfulPalette : colors;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`${useColorfulChart ? 'bg-white' : 'bg-[#FFFDF5]'} p-3 border border-gray-200 rounded-md shadow-md text-sm`}>
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-gray-600 mt-1">{`${dataKey}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Define gradients for pie slices (for monochrome mode)
  const gradients = [
    { id: "gradient1", start: "#4AC2BA", end: "#42B4AC" }, // Teal
    { id: "gradient2", start: "#5BD3C9", end: "#4AC2BA" }, // Light teal
    { id: "gradient3", start: "#6DDDD3", end: "#5BD3C9" }, // Lighter teal
    { id: "gradient4", start: "#85E5DC", end: "#6DDDD3" }, // Very light teal
    { id: "gradient5", start: "#A5EDE7", end: "#85E5DC" }, // Ultra light teal
    { id: "gradient6", start: "#C8F5F1", end: "#A5EDE7" }, // Almost white teal
  ];

  // Define colorful gradients for vibrant mode
  const colorfulGradients = [
    { id: "gradient-blue", start: "#66B2FF", end: "#90CAF9" },       // Light Blue
    { id: "gradient-red", start: "#FF8A80", end: "#FFCDD2" },         // Light Red
    { id: "gradient-orange", start: "#FFCC80", end: "#FFE0B2" },     // Light Orange
    { id: "gradient-green", start: "#81C784", end: "#A5D6A7" },       // Light Green
    { id: "gradient-amber", start: "#FFB74D", end: "#FFECB3" },       // Light Amber
    { id: "gradient-cyan", start: "#80DEEA", end: "#B2EBF2" },        // Light Cyan
    { id: "gradient-purple", start: "#B388FF", end: "#D1C4E9" },      // Light Purple
    { id: "gradient-skyblue", start: "#4FC3F7", end: "#B3E5FC" },    // Light Sky Blue
  ];

  // Choose which gradients to use
  const chartGradients = useColorfulChart ? colorfulGradients : gradients;

  // Calculate adjusted outerRadius based on container size and screen size
  // Use a smaller radius on mobile screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const adjustedOuterRadius = Math.min(outerRadius, isMobile ? 50 : 70);

  return (
    <div
      className={`w-full ${className}`}
      style={{ height: `${maxHeight}px`, minWidth: `${minWidth}px` }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <defs>
            {chartGradients.map((gradient) => (
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
            outerRadius={adjustedOuterRadius}
            fill="#42B4AC"
            paddingAngle={2}
            label={({ name, percent }) => {
              // On mobile, only show percentages, not names
              if (isMobile) {
                return `${(percent * 100).toFixed(0)}%`;
              }
              // On larger screens, truncate long names to prevent overlap
              const displayName = name.length > 12 ? `${name.substring(0, 10)}...` : name;
              return `${displayName} (${(percent * 100).toFixed(0)}%)`;
            }}
            labelLine={{ stroke: '#999', strokeWidth: 0.5, strokeDasharray: "2 2", strokeLinecap: "round" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#${chartGradients[index % chartGradients.length].id})`}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              layout={isMobile ? "horizontal" : "vertical"}
              align={isMobile ? "center" : "right"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              iconType="circle"
              wrapperStyle={isMobile ? 
                { fontSize: '0.75rem', marginTop: '10px' } : 
                { paddingLeft: 20, fontSize: '0.85rem' }
              }
              formatter={(value: string) => (
                <span className="text-gray-700 text-xs sm:text-sm">
                  {value.length > (isMobile ? 10 : 15) ? 
                    `${value.substring(0, isMobile ? 8 : 12)}...` : 
                    value}
                </span>
              )}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
