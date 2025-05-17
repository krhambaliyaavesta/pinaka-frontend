import { Toaster } from "@/presentation/organisms/common/ToastContainer/ToastContainer";
import { UserApprovalCard } from "@/presentation/organisms/user-management/UserApprovalCard";
import { PendingUsersList } from "@/presentation/organisms/user-management/PendingUsersList";
import { AdminUserApprovalCard } from "@/presentation/organisms/user-management/AdminUserApprovalCard";
import { AdminPendingUsersList } from "@/presentation/organisms/user-management/AdminPendingUsersList";

/**
 * Common organism components available throughout the application
 */
export const CommonOrganisms = {
  Toaster,
  // Other common organisms will be added here
};

/**
 * User Management organism components
 */
export const UserManagementOrganisms = {
  UserApprovalCard,
  PendingUsersList,
  AdminUserApprovalCard,
  AdminPendingUsersList,
};

/**
 * Main export for organism components organized by module and feature
 */
export const Organisms = {
  common: CommonOrganisms,
  userManagement: UserManagementOrganisms,
  // Other module-specific organisms will be added here
};

/**
 * Helper function to get a common organism by name
 * @param name Name of the component
 * @returns The component
 */
export function getCommonOrganism(name: keyof typeof CommonOrganisms) {
  return CommonOrganisms[name];
}

/**
 * Helper function to get a user management organism by name
 * @param name Name of the component
 * @returns The component
 */
export function getUserManagementOrganism(
  name: keyof typeof UserManagementOrganisms
) {
  return UserManagementOrganisms[name];
}
