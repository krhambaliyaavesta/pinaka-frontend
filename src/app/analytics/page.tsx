"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { TopRecipientsChart } from "@/presentation/organisms/analytics/TopRecipientsChart";
import { TopTeamsChart } from "@/presentation/organisms/analytics/TopTeamsChart";
import { TrendingCategoriesChart } from "@/presentation/organisms/analytics/TrendingCategoriesChart";
import { TrendingKeywordsChart } from "@/presentation/organisms/analytics/TrendingKeywordsChart";

/**
 * Analytics Page
 * Displays analytics dashboard with various visualizations
 * Only accessible to admin and lead roles
 */
export default function AnalyticsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Client-side only effect
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is authenticated and has admin or lead role
  useEffect(() => {
    if (isLoading) return;

    if (
      !user ||
      (user.role !== UserRole.ADMIN && user.role !== UserRole.LEAD)
    ) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Recipients</h2>
          <TopRecipientsChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Teams</h2>
          <TopTeamsChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Trending Categories</h2>
          <TrendingCategoriesChart />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Trending Keywords</h2>
          <TrendingKeywordsChart />
        </div>
      </div>
    </div>
  );
}
