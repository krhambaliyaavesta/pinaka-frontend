"use client";

import { useAuth } from "@/modules/auth";

/**
 * Analytics Page
 * Displays analytics dashboard with various visualizations
 * Only accessible to admin and lead roles
 */
export default function AnalyticsPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600 mb-4">
          Welcome to the Analytics Dashboard.
        </p>

        <div className="bg-teal-50 p-4 rounded-md border border-teal-100">
          <p className="text-teal-800">
            This page demonstrates the application of the global header and
            footer.
          </p>
        </div>
      </div>
    </div>
  );
}
