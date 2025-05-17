"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUsers, FaTachometerAlt, FaChartBar } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle authentication
  useEffect(() => {
    // Don't redirect during loading
    if (isLoading) return;

    // Redirect if not authenticated or not a lead or admin
    if (
      !user ||
      (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN)
    ) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFDF5]">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Only render content if user is a lead or admin
  if (!user || (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN)) {
    return null;
  }

  const isAdmin = user.role === UserRole.ADMIN;
  const dashboardTitle = isAdmin ? "Admin Dashboard" : "Lead Dashboard";
  const userRoleDisplay = isAdmin ? "Admin" : "Lead";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDF5]">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex w-64 flex-col bg-white shadow-md">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-teal-600">{dashboardTitle}</h1>
        </div>
        <nav className="flex-1 p-5 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
          >
            <FaTachometerAlt className="mr-3" />
            <span>Overview</span>
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
          >
            <FaUsers className="mr-3" />
            <span>User Approvals</span>
          </Link>
          <Link
            href="/analytics"
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
          >
            <FaChartBar className="mr-3" />
            <span>Analytics</span>
          </Link>
        </nav>
        <div className="p-5 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.fullName.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-gray-500">{userRoleDisplay}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-10 bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-teal-600">{dashboardTitle}</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-20">
          <div className="bg-white h-full w-64 p-5 shadow-lg">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-xl font-bold text-teal-600">
                {dashboardTitle}
              </h1>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="space-y-3">
              <Link
                href="/dashboard"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaTachometerAlt className="mr-3" />
                <span>Overview</span>
              </Link>
              <Link
                href="/dashboard/users"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUsers className="mr-3" />
                <span>User Approvals</span>
              </Link>
              <Link
                href="/analytics"
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaChartBar className="mr-3" />
                <span>Analytics</span>
              </Link>
            </nav>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.fullName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{userRoleDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64 pt-4 md:pt-0">
        <main className="px-4 py-16 md:py-6">{children}</main>
      </div>
    </div>
  );
}
