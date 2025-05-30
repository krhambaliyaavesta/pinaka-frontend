"use client";

import { useState } from "react";
import { FiltersGroup } from "@/presentation/molecules/common/FiltersGroup";
import { FilterOption } from "@/presentation/atoms/common/FilterDropdown";
import {
  recipientOptions,
  teamOptions,
  categoryOptions,
} from "@/presentation/pinaka.constant";

export interface KudosFiltersProps {
  onFiltersChange: (filters: {
    recipient: FilterOption | null;
    team: FilterOption | null;
    category: FilterOption | null;
  }) => void;
}

export function KudosFilters({ onFiltersChange }: KudosFiltersProps) {
  const [selectedRecipient, setSelectedRecipient] =
    useState<FilterOption | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<FilterOption | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FilterOption | null>(
    null
  );

  const handleRecipientChange = (option: FilterOption | null) => {
    setSelectedRecipient(option);
    onFiltersChange({
      recipient: option,
      team: selectedTeam,
      category: selectedCategory,
    });
  };

  const handleTeamChange = (option: FilterOption | null) => {
    setSelectedTeam(option);
    onFiltersChange({
      recipient: selectedRecipient,
      team: option,
      category: selectedCategory,
    });
  };

  const handleCategoryChange = (option: FilterOption | null) => {
    setSelectedCategory(option);
    onFiltersChange({
      recipient: selectedRecipient,
      team: selectedTeam,
      category: option,
    });
  };

  return (
    <FiltersGroup
      recipientOptions={recipientOptions}
      teamOptions={teamOptions}
      categoryOptions={categoryOptions}
      selectedRecipient={selectedRecipient}
      selectedTeam={selectedTeam}
      selectedCategory={selectedCategory}
      onRecipientChange={handleRecipientChange}
      onTeamChange={handleTeamChange}
      onCategoryChange={handleCategoryChange}
    />
  );
}
