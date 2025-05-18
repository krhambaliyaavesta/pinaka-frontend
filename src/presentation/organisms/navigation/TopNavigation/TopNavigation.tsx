"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLink } from "@/presentation/atoms/navigation/NavLink";
import { UserDropdown } from "@/presentation/organisms/navigation/UserDropdown";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigation } from "@/modules/navigation";

export interface NavItem {
  /**
   * Label to display
   */
  label: string;

  /**
   * URL to navigate to
   */
  href: string;

  /**
   * Optional icon
   */
  icon?: React.ReactNode;
}

export interface TopNavigationProps {
  /**
   * User's full name
   */
  userName: string;

  /**
   * User's role display text
   */
  userRole: string;

  /**
   * Optional user avatar URL
   */
  userImageUrl?: string;

  /**
   * Whether the user is an admin
   */
  isAdmin?: boolean;

  /**
   * Whether the user is a lead
   */
  isLead?: boolean;

  /**
   * Function to handle logout
   */
  onLogout?: () => void;

  /**
   * Optional navigation items
   */
  navItems?: NavItem[];

  /**
   * Optional logo URL (defaults to Pinaka logo)
   */
  logoUrl?: string;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * TopNavigation organism for the main navigation bar
 */
export function TopNavigation({
  userName,
  userRole,
  userImageUrl,
  isAdmin = false,
  isLead = false,
  onLogout,
  navItems = [],
  logoUrl = "/images/pinaka_logo.png",
  className = "",
}: TopNavigationProps) {
  const {
    isMobileMenuOpen,
    isUserDropdownOpen,
    toggleMobileMenu,
    toggleUserDropdown,
    closeAllMenus,
  } = useNavigation({
    isAdmin,
    isLead,
    onLogout,
  });

  return (
    <header className={`sticky top-0 z-50 ${className}`}>
      <div className="bg-white shadow-md backdrop-blur-sm bg-opacity-95 py-2">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 my-2">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src={logoUrl}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-800">
                  Pinaka
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* User Dropdown */}
            <div className="flex items-center">
              <UserDropdown
                userName={userName}
                userRole={userRole}
                userImageUrl={userImageUrl}
                isAdmin={isAdmin}
                isLead={isLead}
                onLogout={onLogout}
              />

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden ml-4 text-gray-500 hover:text-gray-900 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <nav className="px-4 py-2 space-y-1 max-w-screen-xl mx-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                className="block w-full"
                onClick={closeAllMenus}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
