"use client";

import { AnalyticsDashboardTemplate } from "@/presentation/templates/analytics/AnalyticsDashboardTemplate";

/**
 * Analytics Dashboard Page
 * Renders the analytics dashboard for viewing metrics and data visualizations
 */
export function AnalyticsDashboardPage({ userData }: { userData?: any }) {
  return <AnalyticsDashboardTemplate userData={userData} />;
}

export default AnalyticsDashboardPage;
