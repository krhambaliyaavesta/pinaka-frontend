import { ToastWithAction } from "@/presentation/molecules/common/ToastWithAction/ToastWithAction";
import { RoleSelector } from "@/presentation/molecules/user-management/RoleSelector";
import { UserDetailItem } from "@/presentation/molecules/user-management/UserDetailItem";
import { ApprovalButtonGroup } from "@/presentation/molecules/user-management/ApprovalButtonGroup";
import { AdminApprovalButtonGroup } from "@/presentation/molecules/user-management/AdminApprovalButtonGroup";

/**
 * Common molecular components available throughout the application
 */
export const CommonMolecules = {
  ToastWithAction,
  // Other common molecules will be added here
};

/**
 * User Management molecular components
 */
export const UserManagementMolecules = {
  RoleSelector,
  UserDetailItem,
  ApprovalButtonGroup,
  AdminApprovalButtonGroup,
};

/**
 * Main export for molecular components organized by module and feature
 */
export const Molecules = {
  common: CommonMolecules,
  userManagement: UserManagementMolecules,
  // Other module-specific molecules will be added here
};

/**
 * Helper function to get a common molecule by name
 * @param name Name of the component
 * @returns The component
 */
export function getCommonMolecule(name: keyof typeof CommonMolecules) {
  return CommonMolecules[name];
}

/**
 * Helper function to get a user management molecule by name
 * @param name Name of the component
 * @returns The component
 */
export function getUserManagementMolecule(
  name: keyof typeof UserManagementMolecules
) {
  return UserManagementMolecules[name];
}
