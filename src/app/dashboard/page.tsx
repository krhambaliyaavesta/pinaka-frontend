"use client";

import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";

export default function DashboardPage() {
  const { user } = useAuth();

  // Get user name safely
  const userName = user?.fullName || "User";

  // Determine if user is admin
  const isAdmin = user?.role === UserRole.ADMIN;

  // Set role-specific text
  const roleText = isAdmin ? "Admin" : "Lead";

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-teal-800 mb-2">
          Welcome, {userName}!
        </h1>
        <p className="text-teal-700">
          This is your {roleText} dashboard where you can manage user approvals
          {isAdmin && ", assign roles"} and access other administrative
          features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/users"
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <FaUsers className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                User Approval
              </h2>
              <p className="text-gray-600">
                Review{isAdmin && ", assign roles,"} and manage pending user
                registrations
              </p>
            </div>
          </div>
        </Link>

        {/* Additional dashboard cards can be added here */}
      </div>
    </div>
  );
}
