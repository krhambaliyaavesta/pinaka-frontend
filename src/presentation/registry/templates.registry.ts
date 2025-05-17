import { ToastProviderWrapper } from "@/presentation/templates/common/ToastProviderWrapper";
import { PendingUserApprovalTemplate } from "@/presentation/templates/user-management/PendingUserApprovalTemplate";
import { AdminPendingUserApprovalTemplate } from "@/presentation/templates/user-management/AdminPendingUserApprovalTemplate";

/**
 * Common template components used across the application
 */
export const CommonTemplates = {
  // Toast related templates
  ToastProviderWrapper,
  // Add other common templates here
};

/**
 * User Management template components
 */
export const UserManagementTemplates = {
  PendingUserApprovalTemplate,
  AdminPendingUserApprovalTemplate,
};

/**
 * All template components organized by module
 */
export const Templates = {
  common: CommonTemplates,
  userManagement: UserManagementTemplates,
  // Add other module templates here
};

/**
 * Helper function to get a user management template by name
 * @param name Name of the component
 * @returns The component
 */
export function getUserManagementTemplate(
  name: keyof typeof UserManagementTemplates
) {
  return UserManagementTemplates[name];
}

/**
 * Module-specific template components
 */
// Add module-specific templates as needed, following this pattern:
// export const ModuleNameTemplates = {};
