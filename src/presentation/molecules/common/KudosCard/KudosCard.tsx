'use client';

import React, { useEffect, useRef } from 'react';
import { KudosCardIcon } from '@/presentation/atoms/common/KudosCardIcon';

export type KudosCardType = {
  id: string;
  type: 'thankYou' | 'greatJob' | 'teamwork' | 'support' | 'problemSolving' | 'guidingLight' | 'codeQuality' | 'aboveAndBeyond';
  title: string;
  description: string;
  memberName?: string;
  leadershipNote?: string;
};

interface KudosCardProps {
  card: KudosCardType;
  isSelected?: boolean;
  onClick?: () => void;
}

export function KudosCard({ card, isSelected = false, onClick }: KudosCardProps) {
  const { type, title, description, memberName, leadershipNote } = card;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const getCardColors = () => {
    return 'from-[#00b7a8] to-[#00b7a8]';
  };

  // Add custom animations after the component mounts
  useEffect(() => {
    if (cardRef.current) {
      // Apply animations to all cards
      const card = cardRef.current;
      
      // Create a background container for animations that should stay behind content
      const bgAnimContainer = document.createElement('div');
      bgAnimContainer.className = 'absolute inset-0 overflow-hidden';
      bgAnimContainer.style.zIndex = '1'; // Above the base card but below content
      card.appendChild(bgAnimContainer);
      
      // Create star particles (from Great Job) - positioned more to the edges
      for (let i = 0; i < 6; i++) {
        const star = document.createElement('div');
        star.className = 'absolute w-2 h-2 bg-white opacity-0';
        
        // Position only in the teal area (top section)
        star.style.left = `${Math.random() * 80 + 10}%`;
        star.style.top = `${Math.random() * 25 + 5}%`;
        
        star.style.animation = `star-twinkle ${1.5 + Math.random()}s ease-in-out ${i * 0.3}s infinite`;
        star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        bgAnimContainer.appendChild(star);
      }
      
      // Create connecting circles (from Teamwork) - only in teal area
      for (let i = 0; i < 2; i++) {
        const circle = document.createElement('div');
        circle.className = 'absolute rounded-full w-5 h-5 border border-white/30 opacity-0';
        circle.style.right = `${10 + (i * 15)}%`;
        circle.style.top = `${10 + (i % 2) * 10}%`;
        circle.style.animation = `circle-connect 3s ease-in-out ${i * 0.6}s infinite`;
        bgAnimContainer.appendChild(circle);
      }
      
    }
    
    // Cleanup function
    return () => {
      if (cardRef.current) {
        const animElements = cardRef.current.querySelectorAll('div[style*="animation"]');
        animElements.forEach(el => el.remove());
      }
    };
  }, [type]);

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-br ${getCardColors()} transition-all duration-300 ease-in-out hover:scale-105 ${isSelected ? 'ring-2 ring-white scale-105' : ''} transform perspective-1000 w-full max-w-xs mx-auto h-[380px] flex flex-col`}
    >
      <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#30c9ba] rotate-45 shadow-inner"></div>
      </div>
      
      <div className="relative z-20 flex flex-col items-center h-full">
        <div className="w-full pt-5 pb-3 px-4 flex items-center h-[100px]">
          <div className="pl-2 flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#30c9ba] flex items-center justify-center shadow-md border-2 border-white/30 overflow-hidden">
              <KudosCardIcon type={type} size={26} className="text-white" />
            </div>
          </div>
          
          <div className="pl-3 flex-grow">
            <h2 className="text-xl font-bold text-white uppercase tracking-wide break-words">
              {title}
            </h2>
          </div>
        </div>
        
        <div className="w-full bg-[#b5efe7] p-5 flex-grow flex flex-col justify-center items-center min-h-[140px]">
          <div className="text-center">
            <p className="text-[#006658] text-sm font-medium mb-4">
              {description}
            </p>
            
            {memberName && (
              <div className="mt-1">
                <span className="text-[#006658] font-bold text-2xl break-words">{memberName}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full bg-[#009688] p-4 h-[70px] flex items-center justify-center">
          {leadershipNote ? (
            <p className="italic text-white text-xs text-center">
              "{leadershipNote}"
            </p>
          ) : (
            <p className="italic text-white/50 text-xs text-center">
              No leadership note provided
            </p>
          )}
        </div>
      </div>
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes star-twinkle {
          0%, 100% { 
            opacity: 0;
            transform: scale(0.5);
          }
          50% { 
            opacity: 0.9;
            transform: scale(1.2);
          }
        }
        
        @keyframes circle-connect {
          0% { 
            opacity: 0;
            transform: scale(0.3);
          }
          40%, 60% { 
            opacity: 0.5;
            transform: scale(1);
          }
          100% { 
            opacity: 0;
            transform: scale(1.5);
          }
        }
        
        @keyframes bulb-flash {
          0%, 100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.2);
          }
        }
        
        @keyframes trophy-shine {
          0%, 100% {
            opacity: 0;
            transform: translateX(-100%);
          }
          40%, 60% {
            opacity: 0.3;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
} 