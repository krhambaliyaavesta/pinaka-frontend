"use client";

import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import Link from "next/link";
import { FaUsers, FaUserFriends } from "react-icons/fa";

export default function DashboardPage() {
  const { user } = useAuth();

  // Get user name safely
  const userName = user?.fullName || "User";
  
  // Get role title
  const roleTitle = user?.role === UserRole.ADMIN ? "Admin" : "Lead";

  // Determine if user is admin
  const isAdmin = user?.role === UserRole.ADMIN;

  // Set role-specific text
  const roleText = isAdmin ? "Admin" : "Lead";

  return (
    <div className="space-y-4 pl-0">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <h1 className="text-xl font-bold text-teal-800 mb-1">
          Welcome, {userName}!
        </h1>
        <p className="text-teal-700">
          This is your {roleText} dashboard where you can manage user approvals
          {isAdmin && ", assign roles"} and access other administrative
          features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link
          href="/dashboard/users"
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <FaUsers className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                User Approval
              </h2>
              <p className="text-gray-600">
                Review{isAdmin && ", assign roles,"} and manage pending user
                registrations
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/teams"
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start space-x-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <FaUserFriends className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Teams
              </h2>
              <p className="text-gray-600 text-sm">
                Manage teams and team assignments
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
