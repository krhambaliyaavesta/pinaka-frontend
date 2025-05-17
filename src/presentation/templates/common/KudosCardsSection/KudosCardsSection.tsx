"use client";

import React, { useState } from "react";
import { KudosCardGrid } from "@/presentation/organisms/common/KudosCardGrid";
import { KudosCardType } from "@/presentation/molecules/common/KudosCard/KudosCard";
import { KudosCardIcon } from "@/presentation/atoms/common/KudosCardIcon";

interface KudosCardsSectionProps {
  title?: string;
  description?: string;
}

export function KudosCardsSection({
  title = "Recognize Excellence",
  description = "Select a kudos card to recognize and appreciate your colleagues' contributions.",
}: KudosCardsSectionProps) {
  const [selectedCard, setSelectedCard] = useState<KudosCardType | null>(null);

  const handleCardSelect = (card: KudosCardType) => {
    setSelectedCard(card);
  };

  const handleCancelSelection = () => {
    setSelectedCard(null);
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#42B4AC]/10 rounded-full blur-xl -z-10"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#42B4AC]/10 rounded-full blur-xl -z-10"></div>

        <KudosCardGrid onCardSelect={handleCardSelect} />
      </div>
    </div>
  );
}
