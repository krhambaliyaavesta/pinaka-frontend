"use client";

import React from "react";
import { FilterDropdown, FilterOption } from "@/presentation/atoms/common/FilterDropdown";

export interface FiltersGroupProps {
  recipientOptions: FilterOption[];
  teamOptions: FilterOption[];
  categoryOptions: FilterOption[];
  selectedRecipient: FilterOption | null;
  selectedTeam: FilterOption | null;
  selectedCategory: FilterOption | null;
  onRecipientChange: (option: FilterOption | null) => void;
  onTeamChange: (option: FilterOption | null) => void;
  onCategoryChange: (option: FilterOption | null) => void;
}

export function FiltersGroup({
  recipientOptions,
  teamOptions,
  categoryOptions,
  selectedRecipient,
  selectedTeam,
  selectedCategory,
  onRecipientChange,
  onTeamChange,
  onCategoryChange,
}: FiltersGroupProps) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Filter Kudos</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <FilterDropdown
            label="Recipient"
            options={recipientOptions}
            selectedOption={selectedRecipient}
            onSelect={onRecipientChange}
            placeholder="Filter by recipient"
          />
        </div>
        <div className="w-full md:w-1/3">
          <FilterDropdown
            label="Team"
            options={teamOptions}
            selectedOption={selectedTeam}
            onSelect={onTeamChange}
            placeholder="Filter by team"
          />
        </div>
        <div className="w-full md:w-1/3">
          <FilterDropdown
            label="Category"
            options={categoryOptions}
            selectedOption={selectedCategory}
            onSelect={onCategoryChange}
            placeholder="Filter by category"
          />
        </div>
      </div>
    </div>
  );
} 