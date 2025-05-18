"use client";

import { useState, useEffect } from "react";
import {
  KudosCard,
  KudosCardType,
} from "@/presentation/molecules/common/KudosCard/KudosCard";
import { KudosFilters } from "@/presentation/organisms/common/KudosFilters";
import { FilterOption } from "@/presentation/atoms/common/FilterDropdown";
import { useKudosCards } from "@/modules/cards/application/hooks/useKudosCards";
import { Loader } from "@/presentation/atoms/common";
import { FiAlertCircle } from "react-icons/fi";
import { FaRegSadTear } from "react-icons/fa";
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
      return (
        <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-lg p-8 bg-white flex justify-center">
          <Loader fullScreen={false} label="Loading cards..." />
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-lg p-8 bg-white flex flex-col items-center justify-center">
          <div className="text-red-400 mb-4">
            <FiAlertCircle size={60} />
          </div>
          <h3 className="text-xl font-medium text-red-700 mb-2">Failed to load cards</h3>
          <p className="text-red-500 text-center mb-4">
            There was a problem loading the cards. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md transition-colors font-medium hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      );
    }

    // Show empty state
    if (filteredCards.length === 0) {
      return (
        <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-lg p-8 bg-white flex flex-col items-center justify-center">
          <div className="text-gray-300 mb-4">
            <FaRegSadTear size={60} />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No matching cards found</h3>
          <p className="text-gray-500 text-center mb-4">
            Try adjusting your filter criteria or clear filters to see all available cards.
          </p>
          <button 
            onClick={() => handleFiltersChange({ recipient: null, team: null, category: null })}
            className="px-4 py-2 bg-teal-100 text-teal-700 rounded-md transition-colors font-medium hover:bg-teal-200"
          >
            Clear all filters
          </button>
        </div>
      );
    }

    // Show cards
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCards.map((card, index) => (
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
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <KudosFilters onFiltersChange={handleFiltersChange} />

      <div className="w-full">
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
