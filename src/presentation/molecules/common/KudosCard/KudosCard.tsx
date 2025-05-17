'use client';

import React, { useEffect, useRef } from 'react';
import { KudosCardIcon } from '@/presentation/atoms/common/KudosCardIcon';

export type KudosCardType = {
  id: string;
  type: 'thankYou' | 'greatJob' | 'teamwork' | 'support' | 'problemSolving' | 'guidingLight' | 'codeQuality' | 'aboveAndBeyond' | 'appreciation' | 'gratitude';
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
  const iconRef = useRef<HTMLDivElement>(null);
  
  const getCardColors = () => {
    switch (type) {
      case 'appreciation':
        return {
          primary: '#FFF5EA',
          secondary: '#F5C28A',
          textMain: '#C15C1C',
          textSecondary: '#C15C1C',
          icon: '#F5C28A'
        };
      case 'gratitude':
        return {
          primary: '#F0FAF3',
          secondary: '#8ECAA6',
          textMain: '#2D7155',
          textSecondary: '#2D7155',
          icon: '#8ECAA6'
        };
      case 'thankYou':
        return {
          primary: '#EEF2FA',
          secondary: '#93A8D6',
          textMain: '#394B6D',
          textSecondary: '#394B6D',
          icon: '#93A8D6'
        };
      case 'greatJob':
        return {
          primary: '#F0FAF3',
          secondary: '#8ECAA6',
          textMain: '#2D7155',
          textSecondary: '#2D7155',
          icon: '#8ECAA6'
        };
      case 'teamwork':
        return {
          primary: '#EEF2FA',
          secondary: '#93A8D6',
          textMain: '#394B6D',
          textSecondary: '#394B6D',
          icon: '#93A8D6'
        };
      case 'problemSolving':
        return {
          primary: '#FFF5EA',
          secondary: '#F5C28A',
          textMain: '#C15C1C',
          textSecondary: '#C15C1C',
          icon: '#F5C28A'
        };
      case 'support':
        return {
          primary: '#F2FCFE',
          secondary: '#7FCCE1',
          textMain: '#2D6F7F',
          textSecondary: '#2D6F7F',
          icon: '#7FCCE1'
        };
      case 'guidingLight':
        return {
          primary: '#F6F9EE',
          secondary: '#9FB883',
          textMain: '#4A5D38',
          textSecondary: '#4A5D38',
          icon: '#9FB883'
        };
      case 'codeQuality':
        return {
          primary: '#FAF2F4',
          secondary: '#D396A4',
          textMain: '#8A4A59',
          textSecondary: '#8A4A59',
          icon: '#D396A4'
        };
      case 'aboveAndBeyond':
        return {
          primary: '#FCF2F2',
          secondary: '#D67878',
          textMain: '#7A2C2C',
          textSecondary: '#7A2C2C',
          icon: '#D67878'
        };
      default:
        return {
          primary: '#FFF5EA',
          secondary: '#F5C28A',
          textMain: '#C15C1C',
          textSecondary: '#C15C1C',
          icon: '#F5C28A'
        };
    }
  };

  const colors = getCardColors();
   
  const getIconType = () => {
    if (type === 'appreciation') return 'greatJob'; // Trophy icon
    if (type === 'gratitude') return 'support'; // Heart icon
    return type;
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
      
      // Create star particles
      for (let i = 0; i < 6; i++) {
        const star = document.createElement('div');
        star.className = 'absolute w-2 h-2 bg-white opacity-0';
        
        // Position only in the top section
        star.style.left = `${Math.random() * 80 + 10}%`;
        star.style.top = `${Math.random() * 25 + 5}%`;
        
        star.style.animation = `star-twinkle ${1.5 + Math.random()}s ease-in-out ${i * 0.3}s infinite`;
        star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        bgAnimContainer.appendChild(star);
      }
      
      // Create connecting circles
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

  // Handle icon hover animations
  useEffect(() => {
    if (iconRef.current) {
      const iconContainer = iconRef.current;
      const icon = iconContainer.querySelector('svg');
      
      if (!icon) return;
      
      const handleMouseEnter = () => {
        // Add pulse animation
        icon.classList.add('icon-pulse');
        
        // Create glow effect
        const glow = document.createElement('div');
        glow.className = 'absolute inset-0 rounded-full opacity-0';
        glow.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
        glow.style.animation = 'icon-glow 1.5s ease-in-out infinite';
        
        // Insert glow behind the icon
        iconContainer.insertBefore(glow, icon);
        
        // Create small particles around the icon
        for (let i = 0; i < 5; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-white rounded-full opacity-0';
          
          // Position particles around the icon
          const angle = (i / 5) * Math.PI * 2;
          const radius = 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          particle.style.left = `calc(50% + ${x}px)`;
          particle.style.top = `calc(50% + ${y}px)`;
          particle.style.animation = `particle-float ${0.8 + Math.random()}s ease-out forwards`;
          
          iconContainer.appendChild(particle);
        }
      };
      
      const handleMouseLeave = () => {
        // Remove pulse animation
        icon.classList.remove('icon-pulse');
        
        // Remove all created animation elements
        const animElements = iconContainer.querySelectorAll('div[style*="animation"]');
        animElements.forEach(el => el.remove());
      };
      
      iconContainer.addEventListener('mouseenter', handleMouseEnter);
      iconContainer.addEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup
      return () => {
        iconContainer.removeEventListener('mouseenter', handleMouseEnter);
        iconContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${
        isSelected ? 'ring-2 ring-white' : ''
      } w-full max-w-xs mx-auto h-[380px] flex flex-col`}
      style={{ background: colors.primary }}
    >
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Icon */}
        <div className="mt-6 mb-4">
          <div 
            ref={iconRef}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 relative cursor-pointer transition-all duration-300"
            style={{ 
              background: colors.icon,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' 
            }}
          >
            <KudosCardIcon type={getIconType()} size={32} className="text-white relative z-10 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Title */}
        <h2 
          className="text-2xl font-bold uppercase tracking-wide text-center mb-4 px-4"
          style={{ color: colors.textMain }}
        >
          {title}
        </h2>
        
        {/* Description */}
        <p 
          className="text-center mb-4 px-6"
          style={{ color: colors.textMain }}
        >
          {description}
        </p>
        
        {/* Member Name */}
        <div className="flex-grow flex flex-col justify-center items-center px-6">
          {memberName && (
            <div className="text-center">
              <p 
                className="text-sm mb-1"
                style={{ color: colors.textMain }}
              >
                Awarded to
              </p>
              <h3 
                className="text-xl font-bold"
                style={{ color: colors.textMain }}
              >
                {memberName}
              </h3>
            </div>
          )}
        </div>
        
        {/* Bottom Note */}
        <div 
          className="w-full rounded-b-xl flex items-center justify-center py-4 px-3 mt-auto"
          style={{ background: colors.secondary }}
        >
          {leadershipNote ? (
            <p className="italic text-sm text-center"
               style={{ color: '#FFFFFF' }}>
              "{leadershipNote}"
            </p>
          ) : (
            <p className="italic text-sm text-center"
               style={{ color: 'rgba(255,255,255,0.7)' }}>
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
        
        @keyframes icon-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        
        @keyframes icon-glow {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes particle-float {
          0% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2) translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
          }
        }
        
        :global(.icon-pulse) {
          animation: icon-pulse 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 