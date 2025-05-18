"use client";

import React from "react";

interface DataItem {
  name: string;
  value: number;
  [key: string]: any;
}

interface TagCloudProps {
  /**
   * Data to display in the tag cloud
   */
  data: DataItem[];

  /**
   * Name of the data field to display in the tag
   * @default 'value'
   */
  dataKey?: string;

  /**
   * Minimum font size for tags
   * @default 12
   */
  minFontSize?: number;

  /**
   * Maximum font size for tags
   * @default 36
   */
  maxFontSize?: number;

  /**
   * Maximum height of the chart
   * @default 400
   */
  maxHeight?: number;

  /**
   * Color scheme for the tags
   * @default 'teal'
   */
  colorScheme?: "teal" | "blue" | "green" | "orange" | "purple" | "multi";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Tag Cloud component for analytics
 * Displays a simple tag cloud with variable-sized text based on values
 */
export const TagCloud: React.FC<TagCloudProps> = ({
  data,
  dataKey = "value",
  minFontSize = 12,
  maxFontSize = 36,
  maxHeight = 400,
  colorScheme = "teal",
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

  // Find max and min values for scaling
  const maxValue = Math.max(...data.map((item) => item[dataKey]));
  const minValue = Math.min(...data.map((item) => item[dataKey]));
  const valueRange = maxValue - minValue;
  const fontSizeRange = maxFontSize - minFontSize;

  // Get color based on scheme and value
  const getColor = (value: number, index: number) => {
    // Scale between 0 and 1
    const normalizedValue =
      valueRange === 0 ? 0.5 : (value - minValue) / valueRange;

    // Different color schemes based on project colors
    switch (colorScheme) {
      case "teal":
        // Gradient from light teal to dark teal
        return `linear-gradient(135deg, #5BD3C9 0%, #42B4AC 100%)`;
      case "blue":
        // Gradient from light blue to dark blue
        return `linear-gradient(135deg, #93A8D6 0%, #7186C7 100%)`;
      case "green":
        // Gradient from light green to dark green
        return `linear-gradient(135deg, #8ECAA6 0%, #65BD87 100%)`;
      case "orange":
        // Gradient from light orange to dark orange
        return `linear-gradient(135deg, #F5C28A 0%, #F9A852 100%)`;
      case "purple":
        // Gradient from light purple to dark purple
        return `linear-gradient(135deg, #BBA8D9 0%, #9C86C7 100%)`;
      case "multi":
        // Project color palette gradients
        const gradients = [
          "linear-gradient(135deg, #5BD3C9 0%, #42B4AC 100%)", // Teal
          "linear-gradient(135deg, #6DDDD3 0%, #5BD3C9 100%)", // Light teal
          "linear-gradient(135deg, #85E5DC 0%, #6DDDD3 100%)", // Lighter teal
          "linear-gradient(135deg, #A5EDE7 0%, #85E5DC 100%)", // Very light teal
          "linear-gradient(135deg, #C8F5F1 0%, #A5EDE7 100%)", // Ultra light teal
          "linear-gradient(135deg, #E6FAF8 0%, #C8F5F1 100%)", // Almost white teal
        ];
        return gradients[index % gradients.length];
      default:
        return `linear-gradient(135deg, #5BD3C9 0%, #42B4AC 100%)`;
    }
  };

  // Get text color for gradient backgrounds
  const getTextColor = (scheme: string) => {
    switch (scheme) {
      case "teal":
        return "#2D7A74";
      case "blue":
        return "#394B6D";
      case "green":
        return "#2D7155";
      case "orange":
        return "#C15C1C";
      case "purple":
        return "#5D4880";
      default:
        return "#2D7A74";
    }
  };

  // Calculate font size based on value
  const getFontSize = (value: number) => {
    if (valueRange === 0) return (minFontSize + maxFontSize) / 2;
    const normalized = (value - minValue) / valueRange;
    return minFontSize + normalized * fontSizeRange;
  };

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{
        height: `${maxHeight}px`,
        minHeight: "200px",
        position: "relative",
      }}
    >
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 h-full">
        {data.map((item, index) => (
          <div
            key={`tag-${index}`}
            className="inline-block px-4 py-2 rounded-full transition-transform hover:scale-110 cursor-default shadow-sm hover:shadow-md"
            style={{
              fontSize: `${getFontSize(item[dataKey])}px`,
              background: getColor(item[dataKey], index),
              color:
                colorScheme === "multi"
                  ? [
                      "#2D7A74",
                      "#2D7A74",
                      "#2D7A74",
                      "#2D7A74",
                      "#2D7A74",
                      "#2D7A74",
                    ][index % 6]
                  : getTextColor(colorScheme),
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
              transition: "all 0.3s ease",
            }}
            title={`${item.name}: ${item[dataKey]}`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
