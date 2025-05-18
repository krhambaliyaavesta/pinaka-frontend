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
          primary: 'linear-gradient(135deg, #FFF5EA 0%, #FFEAD1 100%)',
          secondary: 'linear-gradient(to right, #F5C28A, #F9A852)',
          textMain: '#C15C1C',
          textSecondary: '#C15C1C',
          icon: 'linear-gradient(135deg, #F5C28A 0%, #F9A852 100%)',
          shadow: 'rgba(245, 194, 138, 0.4)'
        };
      case 'gratitude':
        return {
          primary: 'linear-gradient(135deg, #F0FAF3 0%, #DBEEE2 100%)',
          secondary: 'linear-gradient(to right, #8ECAA6, #65BD87)',
          textMain: '#2D7155',
          textSecondary: '#2D7155',
          icon: 'linear-gradient(135deg, #8ECAA6 0%, #65BD87 100%)',
          shadow: 'rgba(142, 202, 166, 0.4)'
        };
      case 'thankYou':
        return {
          primary: 'linear-gradient(135deg, #EEF2FA 0%, #DCE5F7 100%)',
          secondary: 'linear-gradient(to right, #93A8D6, #7186C7)',
          textMain: '#394B6D',
          textSecondary: '#394B6D',
          icon: 'linear-gradient(135deg, #93A8D6 0%, #7186C7 100%)',
          shadow: 'rgba(147, 168, 214, 0.5)'
        };
      case 'greatJob':
        return {
          primary: 'linear-gradient(135deg, #F0FAF3 0%, #DBEEE2 100%)',
          secondary: 'linear-gradient(to right, #8ECAA6, #65BD87)',
          textMain: '#2D7155',
          textSecondary: '#2D7155',
          icon: 'linear-gradient(135deg, #8ECAA6 0%, #65BD87 100%)',
          shadow: 'rgba(142, 202, 166, 0.4)'
        };
      case 'teamwork':
        return {
          primary: 'linear-gradient(135deg, #EEF2FA 0%, #DCE5F7 100%)',
          secondary: 'linear-gradient(to right, #93A8D6, #7186C7)',
          textMain: '#394B6D',
          textSecondary: '#394B6D',
          icon: 'linear-gradient(135deg, #93A8D6 0%, #7186C7 100%)',
          shadow: 'rgba(147, 168, 214, 0.5)'
        };
      case 'problemSolving':
        return {
          primary: 'linear-gradient(135deg, #FFF5EA 0%, #FFEAD1 100%)',
          secondary: 'linear-gradient(to right, #F5C28A, #F9A852)',
          textMain: '#C15C1C',
          textSecondary: '#C15C1C',
          icon: 'linear-gradient(135deg, #F5C28A 0%, #F9A852 100%)',
          shadow: 'rgba(245, 194, 138, 0.4)'
        };
      case 'support':
        return {
          primary: 'linear-gradient(135deg, #F2FCFE 0%, #E0F5FA 100%)',
          secondary: 'linear-gradient(to right, #7FCCE1, #5ABCD6)',
          textMain: '#2D6F7F',
          textSecondary: '#2D6F7F',
          icon: 'linear-gradient(135deg, #7FCCE1 0%, #5ABCD6 100%)',
          shadow: 'rgba(127, 204, 225, 0.4)'
        };
      case 'guidingLight':
        return {
          primary: 'linear-gradient(135deg, #F6F9EE 0%, #ECF3D9 100%)',
          secondary: 'linear-gradient(to right, #9FB883, #8AA968)',
          textMain: '#4A5D38',
          textSecondary: '#4A5D38',
          icon: 'linear-gradient(135deg, #9FB883 0%, #8AA968 100%)',
          shadow: 'rgba(159, 184, 131, 0.4)'
        };
      case 'codeQuality':
        return {
          primary: 'linear-gradient(135deg, #FAF2F4 0%, #F4E2E7 100%)',
          secondary: 'linear-gradient(to right, #D396A4, #C97789)',
          textMain: '#8A4A59',
          textSecondary: '#8A4A59',
          icon: 'linear-gradient(135deg, #D396A4 0%, #C97789 100%)',
          shadow: 'rgba(211, 150, 164, 0.4)'
        };
      case 'aboveAndBeyond':
        return {
          primary: 'linear-gradient(135deg, #FCF2F2 0%, #F7E2E2 100%)',
          secondary: 'linear-gradient(to right, #D67878, #CC5353)',
          textMain: '#7A2C2C',
          textSecondary: '#7A2C2C',
          icon: 'linear-gradient(135deg, #D67878 0%, #CC5353 100%)',
          shadow: 'rgba(214, 120, 120, 0.4)'
        };
      default:
        return {
          primary: 'linear-gradient(135deg, #FFF5EA 0%, #FFEAD1 100%)',
          secondary: 'linear-gradient(to right, #F5C28A, #F9A852)',
          textMain: '#C15C1C',
          textSecondary: '#C15C1C',
          icon: 'linear-gradient(135deg, #F5C28A 0%, #F9A852 100%)',
          shadow: 'rgba(245, 194, 138, 0.4)'
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
      
      // Create colorful star particles
      const starColors = ['#FF5E5B', '#39A0ED', '#FFBE0B', '#66D8B5', '#FF7BBF', '#8A4FFF'];
      
      for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.className = 'absolute w-2 h-2 opacity-0';
        star.style.backgroundColor = starColors[i % starColors.length];
        
        // Position particles across the entire card
        star.style.left = `${Math.random() * 90 + 5}%`;
        star.style.top = `${Math.random() * 70 + 5}%`;
        
        star.style.animation = `star-twinkle ${1.5 + Math.random()}s ease-in-out ${i * 0.3}s infinite`;
        star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        star.style.filter = 'drop-shadow(0 0 2px ' + starColors[i % starColors.length] + ')';
        bgAnimContainer.appendChild(star);
      }
      
      // Create colorful connecting circles
      const circleColors = ['rgba(255, 94, 91, 0.5)', 'rgba(57, 160, 237, 0.5)', 'rgba(255, 190, 11, 0.5)', 'rgba(102, 216, 181, 0.5)'];
      
      for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'absolute rounded-full w-5 h-5 opacity-0';
        circle.style.border = `1px solid ${circleColors[i % circleColors.length]}`;
        circle.style.filter = 'blur(0.5px)';
        
        // Distribute circles around the card
        const positions = [
          { right: '10%', top: '15%' },
          { left: '10%', top: '25%' },
          { right: '20%', bottom: '30%' }
        ];
        
        const pos = positions[i % positions.length];
        Object.entries(pos).forEach(([key, value]) => {
          circle.style[key as any] = value;
        });
        
        circle.style.animation = `circle-connect 3s ease-in-out ${i * 0.6}s infinite`;
        bgAnimContainer.appendChild(circle);
      }
      
      // Add floating sparkles
      for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute w-1 h-1 rounded-full opacity-0';
        sparkle.style.backgroundColor = starColors[i % starColors.length];
        sparkle.style.filter = 'blur(0.5px) drop-shadow(0 0 1px ' + starColors[i % starColors.length] + ')';
        
        // Position sparkles throughout the card
        sparkle.style.left = `${Math.random() * 90 + 5}%`;
        sparkle.style.top = `${Math.random() * 90 + 5}%`;
        
        sparkle.style.animation = `sparkle-float ${2 + Math.random() * 2}s linear ${i * 0.4}s infinite`;
        bgAnimContainer.appendChild(sparkle);
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
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${
        isSelected ? 'ring-2 ring-white' : ''
      } w-full max-w-xs mx-auto h-[440px] flex flex-col`}
      style={{ 
        background: colors.primary,
        boxShadow: `0 10px 25px -5px ${colors.shadow}, 0 8px 10px -6px rgba(0, 0, 0, 0.1)`
      }}
    >
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Icon */}
        <div className="mt-8 mb-5">
          <div 
            ref={iconRef}
            className="w-18 h-18 rounded-full flex items-center justify-center relative cursor-pointer transition-all duration-300"
            style={{ 
              background: colors.icon,
              boxShadow: `0 8px 16px -2px ${colors.shadow}, 0 0 0 2px rgba(255, 255, 255, 0.6)` 
            }}
          >
            <KudosCardIcon type={getIconType()} size={32} className="text-white relative z-10 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Title */}
        <h2 
          className="text-2xl font-bold uppercase tracking-wide text-center mb-4 px-4 break-words"
          style={{ 
            color: colors.textMain,
            textShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          {title}
        </h2>
        
        {/* Description */}
        <div className="px-6 w-full">
          <p 
            className="text-center mb-5 leading-relaxed break-words line-clamp-3"
            style={{ color: colors.textMain }}
          >
            {description}
          </p>
        </div>
        
        {/* Member Name */}
        <div className="flex-grow flex flex-col justify-center items-center px-6 mb-4 w-full">
          {memberName && (
            <div className="text-center bg-white/30 backdrop-blur-sm py-3 px-5 rounded-lg w-full">
              <p 
                className="text-sm mb-1 font-medium"
                style={{ color: colors.textMain }}
              >
                Awarded to
              </p>
              <h3 
                className="text-xl font-bold break-words line-clamp-2"
                style={{ 
                  color: colors.textMain,
                  textShadow: '0 1px 1px rgba(0,0,0,0.05)'
                }}
              >
                {memberName}
              </h3>
            </div>
          )}
        </div>
        
        {/* Bottom Note */}
        <div 
          className="w-full rounded-b-xl flex items-center justify-center py-6 px-6 mt-auto"
          style={{ 
            background: colors.secondary,
            minHeight: '80px',
            borderBottomLeftRadius: '0.75rem',
            borderBottomRightRadius: '0.75rem'
          }}
        >
          {leadershipNote ? (
            <p className="italic text-sm text-center font-medium py-1 break-words line-clamp-3"
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
            transform: scale(1.2) rotate(45deg);
          }
        }
        
        @keyframes circle-connect {
          0%, 100% { 
            opacity: 0;
            transform: scale(0.3);
          }
          40%, 60% { 
            opacity: 0.7;
            transform: scale(1);
          }
          100% { 
            opacity: 0;
            transform: scale(1.5);
          }
        }
        
        @keyframes sparkle-float {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
          }
          25% {
            opacity: 0.8;
            transform: translate(5px, -5px) scale(1.5);
          }
          50% {
            opacity: 0.4;
            transform: translate(10px, 0) scale(0.8);
          }
          75% {
            opacity: 0.6; 
            transform: translate(5px, 5px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(1);
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
            opacity: 0.8;
          }
        }
        
        @keyframes particle-float {
          0% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) translateY(-10px) rotate(15deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(-20px) rotate(30deg);
          }
        }
        
        :global(.icon-pulse) {
          animation: icon-pulse 1s ease-in-out infinite;
        }
        
        /* Custom scrollbar styling */
        :global(*::-webkit-scrollbar) {
          width: 0;
          height: 0;
          display: none;
        }
        
        :global(*::-webkit-scrollbar-track) {
          background: transparent;
        }
        
        :global(*::-webkit-scrollbar-thumb) {
          background: transparent;
        }
        
        :global(*::-webkit-scrollbar-thumb:hover) {
          background: transparent;
        }
      `}</style>
    </div>
  );
} 