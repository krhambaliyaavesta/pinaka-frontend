"use client";

import { useState, useEffect } from "react";
import {
  KudosCard,
  KudosCardType,
} from "@/presentation/molecules/common/KudosCard/KudosCard";
import { KudosFilters } from "@/presentation/organisms/common/KudosFilters";
import { FilterOption } from "@/presentation/atoms/common/FilterDropdown";
import { useKudosCards } from "@/modules/cards/application/hooks/useKudosCards";
import { KudosCardIcon } from "@/presentation/atoms/common/KudosCardIcon";

interface KudosCardGridProps {
  onCardSelect?: (card: KudosCardType) => void;
}

export function KudosCardGrid({ onCardSelect }: KudosCardGridProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<KudosCardType | null>(null);
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
    setExpandedCard(card); // Set the expanded card
    document.body.style.overflow = "hidden"; // Prevent scrolling

    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  const handleCloseExpandedCard = () => {
    setExpandedCard(null);
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Handle escape key to close expanded card
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedCard) {
        handleCloseExpandedCard();
      }
    };

    if (expandedCard) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [expandedCard]);

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

  const getIconType = (type: KudosCardType["type"]) => {
    if (type === "appreciation") return "greatJob"; // Trophy icon
    if (type === "gratitude") return "support"; // Heart icon

    // Only return types supported by the KudosCardIcon component
    return type === "thankYou" ||
      type === "greatJob" ||
      type === "teamwork" ||
      type === "support" ||
      type === "problemSolving" ||
      type === "guidingLight" ||
      type === "codeQuality" ||
      type === "aboveAndBeyond"
      ? type
      : "thankYou"; // Default to thankYou if unsupported
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

      {/* Expanded Card Modal */}
      {expandedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={() => handleCloseExpandedCard()}
        >
          <div
            id="expanded-card"
            className="bg-white rounded-lg shadow-2xl max-w-[480px] w-full p-6 animate-in fade-in zoom-in duration-300"
            style={{
              boxShadow:
                "0 10px 25px rgba(0, 0, 0, 0.3), 0 5px 10px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card Header */}
            <div className="flex mb-5">
              <div className="mr-4">
                <KudosCardIcon
                  type={getIconType(expandedCard.type)}
                  size={28}
                  className="text-blue-600"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">
                  {expandedCard.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {expandedCard.type
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .toLowerCase()}
                </p>
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-5 mb-4">
              <div>
                <div className="text-gray-600 font-medium mb-1.5">
                  Awarded to
                </div>
                <div className="font-semibold text-gray-800 text-base">
                  {expandedCard.memberName || "Not specified"}
                </div>
              </div>

              <div>
                <div className="text-gray-600 font-medium mb-1.5">
                  Description
                </div>
                <div className="text-gray-800 text-base leading-relaxed">
                  {expandedCard.description}
                </div>
              </div>

              <div>
                <div className="text-gray-600 font-medium mb-1.5">
                  Note from Leadership:
                </div>
                <div className="text-gray-800 italic text-base">
                  {expandedCard.leadershipNote || "Not specified"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 ">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseExpandedCard();
                }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors w-full text-center"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

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
