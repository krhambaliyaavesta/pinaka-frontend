'use client';

import React from 'react';
import { KudosCard, KudosCardType } from '@/presentation/molecules/common/KudosCard/KudosCard';

export default function KudosCardsPage() {
  const kudosCards: KudosCardType[] = [
    {
      id: '1',
      type: 'thankYou',
      title: 'THANK YOU',
      description: 'Express gratitude for someone who helped you.',
      memberName: 'Alex Rodriguez',
      leadershipNote: 'Always ready to help team members, providing timely assistance on critical issues.'
    },
    {
      id: '2',
      type: 'greatJob',
      title: 'GREAT JOB',
      description: 'Recognize excellent performance and achievement.',
      memberName: 'Sarah Johnson',
      leadershipNote: 'Exceptional work on the latest product release, delivering ahead of schedule.'
    },
    {
      id: '3',
      type: 'teamwork',
      title: 'AWESOME TEAMWORK',
      description: 'Celebrate collaboration and team success.',
      memberName: 'Dev Team Alpha',
      leadershipNote: 'Outstanding collaboration on resolving the critical production issue.'
    },
    {
      id: '4',
      type: 'support',
      title: 'SUPPORT STAR',
      description: 'Acknowledge someone who provided valuable support.',
      memberName: 'Michael Chen',
      leadershipNote: 'Going above and beyond to support new team members during onboarding.'
    },
    {
      id: '5',
      type: 'problemSolving',
      title: 'PROBLEM SOLVING CHAMPION',
      description: 'Recognize innovative solutions and critical thinking.',
      memberName: 'Priya Sharma',
      leadershipNote: 'Creative solution to the database performance issues that saved hours of work.'
    },
    {
      id: '6',
      type: 'guidingLight',
      title: 'GUIDING LIGHT AWARD',
      description: 'Appreciate those who mentor and guide others.',
      memberName: 'David Wilson',
      leadershipNote: 'Exceptional mentorship to junior developers, helping them grow their skills.'
    },
    {
      id: '7',
      type: 'codeQuality',
      title: 'CODE QUALITY CHAMPION',
      description: 'Honor commitment to excellence in code standards.',
      memberName: 'Emma Garcia',
      leadershipNote: 'Consistent commitment to writing clean, well-documented, and maintainable code.'
    },
    {
      id: '8',
      type: 'aboveAndBeyond',
      title: 'ABOVE AND BEYOND',
      description: 'Recognize extraordinary effort that exceeds expectations.',
      memberName: 'James Taylor',
      leadershipNote: 'Working through the weekend to ensure the client demo was flawless and successful.'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4" style={{ background: '#FAF7F2' }}>
      <h1 className="text-3xl font-bold mb-8 text-center">Kudos Cards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kudosCards.map(card => (
          <div key={card.id}>
            <KudosCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
} 