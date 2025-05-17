import { LeadDashboard } from "@/presentation/pages/user-management/LeadDashboard";
import { AdminDashboard } from "@/presentation/pages/user-management/AdminDashboard";

/**
 * User Management page components
 */
export const UserManagementPages = {
  LeadDashboard,
  AdminDashboard,
};

/**
 * Main export for page components organized by module and feature
 */
export const Pages = {
  userManagement: UserManagementPages,
  // Other module-specific pages will be added here
};

/**
 * Helper function to get a user management page by name
 * @param name Name of the component
 * @returns The component
 */
export function getUserManagementPage(name: keyof typeof UserManagementPages) {
  return UserManagementPages[name];
}
