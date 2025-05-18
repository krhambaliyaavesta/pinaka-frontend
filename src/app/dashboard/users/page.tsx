"use client";

import { LeadDashboard } from "@/presentation/pages/user-management/LeadDashboard";
import { AdminDashboard } from "@/presentation/pages/user-management/AdminDashboard";
import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { Loader } from "@/presentation/atoms/common";

export default function UsersPage() {
  const { user, isLoading } = useAuth();

  // Show loading state while determining the user role
  if (isLoading) {
    return <Loader />;
  }

  // Render the appropriate dashboard based on user role
  return user?.role === UserRole.ADMIN ? <AdminDashboard /> : <LeadDashboard />;
}
