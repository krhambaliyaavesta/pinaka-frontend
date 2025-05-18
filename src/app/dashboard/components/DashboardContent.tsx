"use client";

import {
  FaUsers,
  FaUserFriends,
  FaLayerGroup,
  FaIdCard,
  FaChartBar,
  FaUser,
  FaHome,
  FaThumbsUp,
  FaTachometerAlt,
  FaUserEdit,
} from "react-icons/fa";
import Link from "next/link";

interface DashboardContentProps {
  userName: string;
  isAdmin: boolean;
}

export default function DashboardContent({
  userName,
  isAdmin,
}: DashboardContentProps) {
  // Set role-specific text
  const roleText = isAdmin ? "Admin" : "Lead";

  return (
    <div className="space-y-6 pl-0">
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

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3 px-1">
          Main Navigation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <Link
            href="/"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaHome className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Home
                </h3>
                <p className="text-gray-600 text-sm">
                  Return to the main homepage
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/kudos-wall"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaThumbsUp className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Kudos Wall
                </h3>
                <p className="text-gray-600 text-sm">
                  View and interact with team kudos
                </p>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-3 px-1">
          Admin Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <Link
            href="/dashboard"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaTachometerAlt className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Overview
                </h3>
                <p className="text-gray-600 text-sm">
                  Dashboard overview and statistics
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/users"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaUsers className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  User Approvals
                </h3>
                <p className="text-gray-600 text-sm">
                  Review{isAdmin && ", assign roles,"} and manage pending user
                  registrations
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/edit-users"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaUserEdit className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Edit Users
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage existing user accounts
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
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Teams
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage teams and team assignments
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/categories"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaLayerGroup className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Categories
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage recognition categories
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/cards"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaIdCard className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Cards
                </h3>
                <p className="text-gray-600 text-sm">
                  Create and manage recognition cards
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/analytics"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaChartBar className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Analytics
                </h3>
                <p className="text-gray-600 text-sm">
                  View metrics and performance data
                </p>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-3 px-1">
          User Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            href="/profile"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <FaUser className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  My Profile
                </h3>
                <p className="text-gray-600 text-sm">
                  View and edit your profile information
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
