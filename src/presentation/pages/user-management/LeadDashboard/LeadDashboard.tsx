"use client";

import { PendingUserApprovalTemplate } from "@/presentation/templates/user-management/PendingUserApprovalTemplate";
import { usePendingUsers } from "@/modules/user-management";

/**
 * Lead dashboard page that uses the PendingUserApprovalTemplate
 * Connects the UI to the application layer via hooks
 */
export function LeadDashboard() {
  const { pendingUsers, isLoading, error, refresh } = usePendingUsers();

  return (
    <PendingUserApprovalTemplate
      users={pendingUsers}
      isLoading={isLoading}
      error={error}
      onRefresh={refresh}
    />
  );
}
