"use client";

import { useState, useEffect } from "react";
import {
  KudosCard,
  KudosCardType,
} from "@/presentation/molecules/common/KudosCard/KudosCard";
import { KudosFilters } from "@/presentation/organisms/common/KudosFilters";
import { FilterOption } from "@/presentation/atoms/common/FilterDropdown";
import { useKudosCards } from "@/modules/cards/application/hooks/useKudosCards";

interface KudosCardGridProps {
  onCardSelect?: (card: KudosCardType) => void;
}

export function KudosCardGrid({ onCardSelect }: KudosCardGridProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState<KudosCardType[]>([]);
  const [filters, setFilters] = useState<{
    recipient: FilterOption | null;
    team: FilterOption | null;
    category: FilterOption | null;
  }>({
    recipient: null,
    team: null,
    category: null,
  });

  // Fetch cards from API
  const { cards, loading, error } = useKudosCards();

  // Apply filters when they change or when cards load
  useEffect(() => {
    filterCards();
  }, [filters, cards]);

  const handleCardClick = (card: KudosCardType) => {
    setSelectedCard(card.id);
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  const handleFiltersChange = (newFilters: {
    recipient: FilterOption | null;
    team: FilterOption | null;
    category: FilterOption | null;
  }) => {
    setFilters(newFilters);
  };

  const filterCards = () => {
    let result = [...cards];

    // Filter by recipient
    if (filters.recipient) {
      result = result.filter(
        (card) => card.memberName === filters.recipient?.name
      );
    }

    // Since we don't have team property in cards, we're simulating this filter
    // In a real app, each card would have a team property
    if (filters.team && filters.team.name) {
      // This is a mock implementation, in a real app you would filter by actual team
      const teamFilterMap: Record<string, string[]> = {
        Engineering: ["Emma Garcia", "Michael Chen"],
        Product: ["James Taylor", "Sarah Johnson"],
        Design: ["Alex Rodriguez"],
        Marketing: ["Priya Sharma"],
        "Customer Support": ["David Wilson"],
      };

      const teamName = filters.team.name;
      const teamMembers = teamFilterMap[teamName] || [];
      result = result.filter(
        (card) => card.memberName && teamMembers.includes(card.memberName)
      );
    }

    // Filter by category (card type)
    if (filters.category) {
      result = result.filter((card) => card.type === filters.category?.id);
    }

    setFilteredCards(result);
  };

  const getAnimationDelay = (index: number) => {
    return `${index * 0.07}s`;
  };

  const renderCards = () => {
    // Show loading state
    if (loading) {
      return Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={`loading-${index}`}
            className="bg-gray-100 animate-pulse rounded-xl h-[440px]"
          />
        ));
    }

    // Show error state
    if (error) {
      return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-8">
          <p className="text-red-500">
            Error loading cards. Please try again later.
          </p>
        </div>
      );
    }

    // Show empty state
    if (filteredCards.length === 0) {
      return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-8">
          <p className="text-gray-500">No cards match the selected filters.</p>
        </div>
      );
    }

    // Show cards
    return filteredCards.map((card, index) => (
      <div
        key={card.id}
        className="transform transition-all duration-700 ease-out"
        style={{
          animationDelay: getAnimationDelay(index),
          opacity: 0,
          animation: `fadeInUp 0.7s ease-out ${getAnimationDelay(
            index
          )} forwards`,
        }}
      >
        <KudosCard
          card={card}
          isSelected={selectedCard === card.id}
          onClick={() => handleCardClick(card)}
        />
      </div>
    ));
  };

  return (
    <div className="w-full space-y-6">
      <KudosFilters onFiltersChange={handleFiltersChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderCards()}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
