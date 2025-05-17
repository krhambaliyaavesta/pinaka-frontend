import React from 'react';
import './celebrationCard.css';

interface CelebrationCardProps {
  title: string;
  subtitle: string;
  cardType?: string;
  awardedTo?: string;
  onClose?: () => void;
}

export const CelebrationCard: React.FC<CelebrationCardProps> = ({
  title,
  subtitle,
  cardType = "Thank You",
  awardedTo = "",
  onClose,
}) => {
  return (
    <div className="celebration-card-overlay">
      <div className="celebration-card">
        {/* Top Congratulations Banner */}
        <div className="congratulations-banner">
          <span className="celebration-emoji">🎉</span>
          CONGRATULATIONS!
          <span className="celebration-emoji">🎊</span>
        </div>
        
        {/* Certificate Border Corners */}
        <div className="corner-ornament corner-top-left"></div>
        <div className="corner-ornament corner-top-right"></div>
        <div className="corner-ornament corner-bottom-left"></div>
        <div className="corner-ornament corner-bottom-right"></div>
        
        {/* Stars animation */}
        <div className="stars-container">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`star star-${i+1}`} />
          ))}
        </div>
        
        {/* Confetti/particles animation */}
        <div className="particle-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className={`particle particle-${i+1} ${
                i % 4 === 0 ? 'particle-circle' : 
                i % 4 === 1 ? 'particle-square' : 
                i % 4 === 2 ? 'particle-triangle' : 
                'particle-diamond'
              }`} 
            />
          ))}
        </div>
        
        <div className="card-content">
          {/* Certificate Seal */}
          <div className="certificate-seal"></div>
          
          <h1 className="card-title">{title}</h1>
          <p className="card-subtitle">{subtitle}</p>
          
          {awardedTo && (
            <div className="awarded-to-container">
              <div className="awarded-to-label">Awarded to</div>
              <div className="awarded-to-name">{awardedTo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 