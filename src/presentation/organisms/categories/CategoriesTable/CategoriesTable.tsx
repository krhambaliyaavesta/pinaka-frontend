import React from "react";
import { Table } from "../../../molecules/common/Table/Table";
import { Category } from "@/modules/categories";
import { FaTrash, FaEdit } from "react-icons/fa";

interface CategoriesTableProps {
  categories: Category[];
  onDeleteClick: (category: Category) => void;
  onEditClick: (category: Category) => void;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories, onDeleteClick, onEditClick }) => {
  const headers = [
    <div key="header-no" className="text-center">No.</div>,
    <div key="header-name" className="text-center">Category Name</div>,
    <div key="header-actions" className="text-center">Actions</div>
  ];
  
  const data = categories.map((category, index) => [
    index + 1,
    <div key={`name-${category.id}`} className="text-center">{category.name}</div>,
    <div key={`action-${category.id}`} className="flex justify-center space-x-2">
      <button
        onClick={() => onEditClick(category)}
        className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-pointer"
        aria-label={`Edit ${category.name}`}
      >
        <FaEdit />
      </button>
      <button
        onClick={() => onDeleteClick(category)}
        className="text-red-500 hover:text-red-700 p-1 rounded cursor-pointer"
        aria-label={`Delete ${category.name}`}
      >
        <FaTrash />
      </button>
    </div>
  ]);
  
  return (
    <div className="mt-4">
      <Table headers={headers} data={data} />
    </div>
  );
}; 