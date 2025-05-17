import { Toast } from "@/presentation/atoms/common/Toast/Toast";
import { RoleOption } from "@/presentation/atoms/user-management/RoleOption";
import { ActionButton } from "@/presentation/atoms/user-management/ActionButton";
import { ApprovalBadge } from "@/presentation/atoms/user-management/ApprovalBadge";

/**
 * Common atomic components available throughout the application
 */
export const CommonAtoms = {
  Toast,
  // Other common atoms will be added here
};

/**
 * User Management atomic components
 */
export const UserManagementAtoms = {
  RoleOption,
  ActionButton,
  ApprovalBadge,
};

/**
 * Main export for atomic components organized by module and feature
 */
export const Atoms = {
  common: CommonAtoms,
  userManagement: UserManagementAtoms,
  // Other module-specific atoms will be added here
};

/**
 * Helper function to get a common atom by name
 * @param name Name of the component
 * @returns The component
 */
export function getCommonAtom(name: keyof typeof CommonAtoms) {
  return CommonAtoms[name];
}

/**
 * Helper function to get a user management atom by name
 * @param name Name of the component
 * @returns The component
 */
export function getUserManagementAtom(name: keyof typeof UserManagementAtoms) {
  return UserManagementAtoms[name];
}
