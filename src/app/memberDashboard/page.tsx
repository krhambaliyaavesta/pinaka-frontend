'use client';

import { KudosCardsSection } from '@/presentation/templates/common/KudosCardsSection';
import { CelebrationCard } from '@/presentation/atoms/CelebrationCard/CelebrationCard';
import { useState, useEffect } from 'react';

export default function MemberDashboardPage() {
  const [showCelebration, setShowCelebration] = useState(true);

  // Hide celebration card after user closes it
  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  return (
    <div className="space-y-6">
      {/* Render CelebrationCard only if showCelebration is true */}
      {/* {showCelebration && (
        <CelebrationCard
          cardType="Thank You"
          title="Exceptional Teamwork"
          subtitle="For your outstanding contributions and dedication"
          awardedTo="Alex Rodriguez"
          onClose={handleCloseCelebration}
        />
      )} */}
      
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