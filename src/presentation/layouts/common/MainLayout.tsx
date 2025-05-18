"use client";

import React from "react";
import { MainNavigation } from "@/presentation/templates/navigation/MainNavigation";
import Footer from "@/presentation/organisms/common/Footer";
import { useAuth, useLogout } from "@/modules/auth";

interface MainLayoutProps {
  children: React.ReactNode;
  noHeader?: boolean;
  noFooter?: boolean;
  contained?: boolean;
}

/**
 * MainLayout component that applies consistent header and footer to pages
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  noHeader = false,
  noFooter = false,
  contained = true,
}) => {
  // Width classes based on contained prop
  const containerWidthClass = contained ? "max-w-screen-xl" : "max-w-[1672px]";

  // Get user data and logout function
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12 -z-10 hidden md:block"></div>
      <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm -z-10 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#42B4AC] opacity-40 rounded-md transform rotate-45 -z-10 hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-4 h-16 bg-[#42B4AC] opacity-30 rounded-sm transform -rotate-12 -z-10 hidden lg:block"></div>

      {/* Header */}
      {!noHeader && user && (
        <MainNavigation
          user={{
            fullName: user.fullName,
            role: user.isAdmin() ? "Admin" : user.isLead() ? "Lead" : "Member",
            imageUrl: undefined, // User doesn't have a profile image property
            isAdmin: user.isAdmin(),
            isLead: user.isLead(),
          }}
          onLogout={logout}
        />
      )}

      {/* Main content */}
      <main
        className={`flex-grow ${containerWidthClass} mx-auto px-6 md:px-9 py-6 relative`}
      >
        {children}
      </main>

      {/* Footer */}
      {!noFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
