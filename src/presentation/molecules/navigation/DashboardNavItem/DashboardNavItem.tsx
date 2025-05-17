"use client";

import Link from "next/link";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { FaUserShield } from "react-icons/fa";

interface DashboardNavItemProps {
  className?: string;
}

/**
 * Navigation item that links to the lead dashboard
 * Only displayed for users with the Lead role
 */
export function DashboardNavItem({ className = "" }: DashboardNavItemProps) {
  const { user, isLoading } = useAuth();

  // Only show dashboard link to lead users
  if (isLoading || !user || user.role !== UserRole.LEAD) {
    return null;
  }

  return (
    <Link
      href="/dashboard"
      className={`flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 rounded-md hover:bg-teal-50 transition-colors ${className}`}
    >
      <FaUserShield className="mr-2 h-4 w-4" />
      <span>Lead Dashboard</span>
    </Link>
  );
}
