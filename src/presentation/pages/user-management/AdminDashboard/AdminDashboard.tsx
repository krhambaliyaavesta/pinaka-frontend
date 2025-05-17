"use client";

import { AdminPendingUserApprovalTemplate } from "@/presentation/templates/user-management/AdminPendingUserApprovalTemplate";
import { usePendingUsers } from "@/modules/user-management";

/**
 * Admin dashboard page that uses the AdminPendingUserApprovalTemplate
 * Connects the UI to the application layer via hooks
 * Provides role assignment capability for admins
 */
export function AdminDashboard() {
  // Use the same hook as the Lead dashboard to fetch pending users
  const { pendingUsers, isLoading, error, refresh } = usePendingUsers();

  return (
    <AdminPendingUserApprovalTemplate
      users={pendingUsers}
      isLoading={isLoading}
      error={error}
      onRefresh={refresh}
    />
  );
}
