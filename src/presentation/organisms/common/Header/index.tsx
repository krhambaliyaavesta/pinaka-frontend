"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";

interface HeaderProps {
  userName?: string;
  contained?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "User Name",
  contained = true,
}) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === UserRole.ADMIN;
  const isLead = user?.role === UserRole.LEAD;
  const userRoleDisplay = isAdmin ? "Admin" : isLead ? "Lead" : "Member";
  const displayName = user?.fullName || userName;

  // Width classes based on contained prop
  const containerWidthClass = contained ? "max-w-screen-xl" : "max-w-[1672px]";

  return (
    <div className={`${containerWidthClass} mx-auto px-6 md:px-9`}>
      <header className="relative flex h-16 w-full items-center justify-between rounded-lg border border-transparent px-2 py-1.5 transition-all duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:rounded-2xl lg:py-[0.4375rem] lg:pr-[0.4375rem] bg-white shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)]">
        {/* Logo and brand */}
        <Link
          href="/"
          className="relative flex w-fit items-center gap-2 overflow-hidden lg:px-3"
        >
          <div className="relative w-10 h-10 lg:w-12 lg:h-12">
            <Image
              src="/images/pinaka_logo.png"
              alt="Pinaka Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-lg font-semibold text-gray-800">Pinaka</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="col-start-2 gap-5 px-2 font-medium text-gray-700 xl:gap-6 hidden lg:flex">
          {(isAdmin || isLead) && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors duration-300 p-2 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/analytics"
                  className="transition-colors duration-300 p-2 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Analytics
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              href="/kudos-wall"
              className="transition-colors duration-300 p-2 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Kudos Wall
            </Link>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="col-start-3 hidden w-full justify-end gap-2 lg:flex">
          {!user && (
            <div className="hidden lg:flex">
              <Link
                href="/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-white text-gray-800 border border-gray-300 hover:border-gray-400 hover:bg-[#42B4AC] hover:text-white transition-colors px-4 py-2 font-medium text-sm"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-[#42B4AC] flex items-center justify-center text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 hidden md:block">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-gray-500">{userRoleDisplay}</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="contents lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative size-6"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menu"
          >
            <svg
              className="-ml-2 -mt-2 size-10"
              viewBox="0 0 100 100"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="5.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                className={
                  isMobileMenuOpen
                    ? "rotate-45 origin-center translate-y-[8px]"
                    : ""
                }
                d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
              />
              <path
                className={isMobileMenuOpen ? "opacity-0" : ""}
                d="m 70,50 h -40"
              />
              <path
                className={
                  isMobileMenuOpen
                    ? "-rotate-45 origin-center -translate-y-[8px]"
                    : ""
                }
                d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg z-50 p-4 border border-gray-100 lg:hidden">
            <nav className="flex flex-col space-y-2">
              {(isAdmin || isLead) && (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/analytics"
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Analytics</span>
                  </Link>
                </>
              )}
              <Link
                href="/kudos-wall"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Kudos Wall</span>
              </Link>
              <Link
                href="/sudo-walls"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Sudo Walls</span>
              </Link>

              {!user && (
                <Link
                  href="/login"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Login</span>
                </Link>
              )}

              {user && (
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#42B4AC] flex items-center justify-center text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-xs text-gray-500">{userRoleDisplay}</p>
                    </div>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
