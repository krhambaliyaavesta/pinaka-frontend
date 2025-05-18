"use client";

import { useAuth } from "@/modules/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/modules/auth/domain/enums";
import { AnalyticsDashboardTemplate } from "@/presentation/templates/analytics/AnalyticsDashboardTemplate";
import { Loader } from "@/presentation/atoms/common";

/**
 * Analytics Dashboard Page
 * Renders the analytics dashboard for viewing metrics and data visualizations
 * Includes client-side authentication as fallback
 */
export function AnalyticsDashboardPage({ userData }: { userData?: any }) {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  // Client-side auth check as fallback in case server-side auth fails
  useEffect(() => {
    // Skip client-side check if we already have userData from server
    if (userData) return;

    // Only check after loading completes
    if (!isLoading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push("/login");
        return;
      }

      // If user is not admin or lead, redirect to home
      if (user.role !== UserRole.ADMIN && user.role !== UserRole.LEAD) {
        router.push("/");
        return;
      }
    }
  }, [isLoading, user, router, userData]);

  // Show loading while checking auth
  if (isLoading && !userData) {
    return <Loader label="Loading analytics..." />;
  }

  // Use either server-provided userData or client-side user
  const effectiveUser = userData || user;

  // Final auth check before rendering
  if (!effectiveUser) {
    return <Loader label="Authenticating..." />;
  }

  // Check role again to make sure only admins and leads can access
  if (
    effectiveUser.role !== UserRole.ADMIN &&
    effectiveUser.role !== UserRole.LEAD
  ) {
    // This should rarely happen since we redirect in useEffect
    router.push("/");
    return <Loader label="Redirecting..." />;
  }

  return <AnalyticsDashboardTemplate userData={effectiveUser} />;
}

export default AnalyticsDashboardPage;
