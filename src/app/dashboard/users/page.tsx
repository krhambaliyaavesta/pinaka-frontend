"use client";

import { LeadDashboard } from "@/presentation/pages/user-management/LeadDashboard";
import { AdminDashboard } from "@/presentation/pages/user-management/AdminDashboard";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";

export default function UsersPage() {
  const { user, isLoading } = useAuth();

  // Show loading state while determining the user role
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render the appropriate dashboard based on user role
  return user?.role === UserRole.ADMIN ? <AdminDashboard /> : <LeadDashboard />;
}
