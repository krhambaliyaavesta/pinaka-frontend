'use client';

import React from 'react';
import { HiThumbUp, HiStar, HiUserGroup, HiSupport, HiLightBulb, HiLightningBolt, HiShieldCheck, HiBadgeCheck } from 'react-icons/hi';

type IconType = 
  | 'thankYou'
  | 'greatJob'
  | 'teamwork'
  | 'support'
  | 'problemSolving'
  | 'guidingLight'
  | 'codeQuality'
  | 'aboveAndBeyond';

interface KudosCardIconProps {
  type: IconType;
  className?: string;
  size?: number;
}

export function KudosCardIcon({ type, className = '', size = 24 }: KudosCardIconProps) {
  const iconMap = {
    thankYou: HiThumbUp,
    greatJob: HiStar,
    teamwork: HiUserGroup,
    support: HiSupport,
    problemSolving: HiLightBulb,
    guidingLight: HiLightningBolt,
    codeQuality: HiShieldCheck,
    aboveAndBeyond: HiBadgeCheck
  };

  const Icon = iconMap[type];
  
  return <Icon className={className} size={size} />;
} 