import React from 'react';

interface LoaderProps {
  /**
   * Optional size of the loader in pixels
   * @default '12' 
   */
  size?: '8' | '12' | '16' | '24';
  
  /**
   * Optional color of the loader
   * @default 'teal' 
   */
  color?: 'teal' | 'blue' | 'gray' | 'amber';
  
  /**
   * Optional center the loader on the page
   * @default true
   */
  fullScreen?: boolean;
  
  /**
   * Optional label to display below the loader
   */
  label?: string;
}

/**
 * A centralized loader component for consistent loading UI across the application
 */
const Loader: React.FC<LoaderProps> = ({
  size = '12',
  color = 'teal',
  fullScreen = true,
  label,
}) => {
  // Map color name to Tailwind color class
  const colorMap = {
    teal: 'border-teal-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    amber: 'border-amber-500',
  };
  
  const borderColorClass = colorMap[color];
  const sizeClass = `w-${size} h-${size}`;
  
  return (
    <div className={fullScreen ? "flex flex-col items-center justify-center min-h-screen" : "flex flex-col items-center py-6"}>
      <div className={`${sizeClass} border-4 ${borderColorClass} border-t-transparent rounded-full animate-spin`}></div>
      {label && <p className="text-gray-600 mt-3">{label}</p>}
    </div>
  );
};

export default Loader; 