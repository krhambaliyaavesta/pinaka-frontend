'use client';

import { ReactNode } from 'react';
import Header from '@/presentation/organisms/common/Header';
import Footer from '@/presentation/organisms/common/Footer';

// Main layout component
export default function MemberDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12 -z-10 hidden md:block"></div>
      <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm -z-10 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#42B4AC] opacity-40 rounded-md transform rotate-45 -z-10 hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-4 h-16 bg-[#42B4AC] opacity-30 rounded-sm transform -rotate-12 -z-10 hidden lg:block"></div>
      
      <Header userName="Member" />
      <main className="flex-grow container mx-auto px-4 py-6 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
} 