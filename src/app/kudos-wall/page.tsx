"use client";

import { KudosCardsSection } from "@/presentation/templates/common/KudosCardsSection";

export default function KudosWallPage() {
  return (
    <div className="space-y-6">
      <KudosCardsSection
        title="Kudos Cards"
        description="Select a card to send recognition and appreciation to your teammates."
      />
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Celebrate small wins, build big success</p>
      </div>
    </div>
  );
}
