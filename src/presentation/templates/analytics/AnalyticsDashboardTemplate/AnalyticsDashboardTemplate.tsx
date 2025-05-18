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
      className={`analytics-dashboard w-full max-w-screen-2xl mx-auto px-2 sm:px-6 md:px-8 ${className}`}
    >
      <div className="bg-gradient-to-r from-teal-50/50 to-blue-50/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-teal-700 pb-1 sm:pb-2">
          Analytics Dashboard
        </h1>
        <p className="text-teal-600 text-sm sm:text-base">
          View metrics, trends, and performance data from your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-2 sm:p-5 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-teal-700 pb-2 border-b border-gray-200">Top Recipients</h2>
          <div className="w-full overflow-x-auto overflow-y-hidden pb-2 -mx-2 px-2">
            <div className="min-w-[280px] w-full">
              <TopRecipientsChart hideTitle={true} useColorfulCharts={true} />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic text-center mt-1 sm:hidden">
            Swipe horizontally to see more
          </div>
        </div>

        <div className="bg-white p-2 sm:p-5 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-teal-700 pb-2 border-b border-gray-200">Top Teams</h2>
          <div className="w-full overflow-x-auto overflow-y-hidden pb-2 -mx-2 px-2">
            <div className="min-w-[280px] w-full">
              <TopTeamsChart hideTitle={true} useColorfulCharts={true} />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic text-center mt-1 sm:hidden">
            Swipe horizontally to see more
          </div>
        </div>

        <div className="bg-white p-2 sm:p-5 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-teal-700 pb-2 border-b border-gray-200">Trending Categories</h2>
          <div className="w-full overflow-x-auto overflow-y-hidden pb-2 -mx-2 px-2">
            <div className="min-w-[280px] w-full">
              <TrendingCategoriesChart hideTitle={true} useColorfulCharts={true} />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic text-center mt-1 sm:hidden">
            Swipe horizontally to see more
          </div>
        </div>

        <div className="bg-white p-2 sm:p-5 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-teal-700 pb-2 border-b border-gray-200">Trending Keywords</h2>
          <div className="w-full overflow-x-auto overflow-y-hidden pb-2 -mx-2 px-2">
            <div className="min-w-[280px] w-full">
              <TrendingKeywordsChart hideTitle={true} useColorfulCharts={true} />
            </div>
          </div>
          <div className="text-xs text-gray-500 italic text-center mt-1 sm:hidden">
            Swipe horizontally to see more
          </div>
        </div>
      </div>
    </div>
  );
}
