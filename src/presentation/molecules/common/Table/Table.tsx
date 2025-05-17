import React from "react";
import { TableRow } from "../../../atoms/common/TableRow/TableRow";

interface TableProps {
  headers: React.ReactNode[];
  data: React.ReactNode[][];
}

export const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e8edf5] bg-[#f8f9fc]">
      <table className="min-w-full">
        <thead>
          <TableRow columns={headers} isHeader={true} />
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} columns={row} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}; 