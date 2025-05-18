"use client";

import { TopRecipientsChart } from "@/presentation/organisms/analytics/TopRecipientsChart/TopRecipientsChart";
import { TopTeamsChart } from "@/presentation/organisms/analytics/TopTeamsChart/TopTeamsChart";
import { TrendingCategoriesChart } from "@/presentation/organisms/analytics/TrendingCategoriesChart/TrendingCategoriesChart";
import { TrendingKeywordsChart } from "@/presentation/organisms/analytics/TrendingKeywordsChart/TrendingKeywordsChart";

interface AnalyticsDashboardTemplateProps {
  /**
   * User data from authentication
   */
  userData?: {
    name?: string;
    email?: string;
  };
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Template for the analytics dashboard
 * Defines the overall layout structure for the analytics dashboard page
 */
export function AnalyticsDashboardTemplate({
  userData,
  className = "",
}: AnalyticsDashboardTemplateProps) {
  return (
    <div
      className={`analytics-dashboard max-w-7xl mx-auto px-4 py-6 ${className}`}
    >
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Top Recipients</h2>
          <TopRecipientsChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Top Teams</h2>
          <TopTeamsChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Trending Categories</h2>
          <TrendingCategoriesChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Trending Keywords</h2>
          <TrendingKeywordsChart />
        </div>
      </div>
    </div>
  );
}
