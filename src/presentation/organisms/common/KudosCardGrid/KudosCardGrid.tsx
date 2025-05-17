"use client";

import React, { useState, useEffect } from "react";
import {
  KudosCard,
  KudosCardType,
} from "@/presentation/molecules/common/KudosCard/KudosCard";
import { kudosCards } from "@/presentation/pinaka.constant";

interface KudosCardGridProps {
  onCardSelect?: (card: KudosCardType) => void;
}

export function KudosCardGrid({ onCardSelect }: KudosCardGridProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cards, setCards] = useState<KudosCardType[]>([]);

  useEffect(() => {
    setCards(kudosCards);
  }, []);

  const handleCardClick = (card: KudosCardType) => {
    setSelectedCard(card.id);
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  const getAnimationDelay = (index: number) => {
    return `${index * 0.07}s`;
  };

  const renderCards = () => {
    if (cards.length === 0) return null;

    return cards.map((card, index) => (
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
    <div className="w-full">
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
