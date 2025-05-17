'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName = 'User Name' }) => {
  return (
    <header className="bg-[#FFFDF5] border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/memberDashboard" className="flex items-center">
          <div className="w-8 h-8 bg-[#42B4AC] opacity-70 rounded-md mr-3 transform hover:rotate-12 transition-transform"></div>
          <h1 className="text-xl font-semibold text-gray-800">Pinaka</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 hidden sm:inline">{userName}</span>
          <div className="h-8 w-8 rounded-full bg-[#42B4AC] flex items-center justify-center text-white shadow-sm hover:bg-opacity-80 transition-colors cursor-pointer">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 