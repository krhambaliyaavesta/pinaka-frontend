import React from "react";

interface TableRowProps {
  columns: React.ReactNode[];
  isHeader?: boolean;
  index?: number;
}

export const TableRow: React.FC<TableRowProps> = ({ columns, isHeader = false, index = 0 }) => {
  const Component = isHeader ? "th" : "td";
  
  return (
    <tr className={`${isHeader ? "bg-[#f5f7fb]" : "bg-white"}`}>
      {columns.map((column, colIndex) => (
        <Component
          key={colIndex}
          className={`py-4 px-6 border-t border-b border-l border-r border-[#e8edf5] text-gray-700 ${
            isHeader ? "font-semibold" : "font-normal"
          } ${colIndex === 0 ? "text-center w-24" : ""} ${colIndex === 1 ? "text-center" : ""}`}
        >
          {column}
        </Component>
      ))}
    </tr>
  );
}; 