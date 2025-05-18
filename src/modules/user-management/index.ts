// Re-export domain types and interfaces
export * from "./domain";

// Export the module class
export { UserManagementModule } from "./UserManagementModule";

// Export application hooks for UI consumption
export {
  usePendingUsers,
  useApproveUser,
  useRejectUser,
  useApproveUserWithRole,
  useSearchUsers,
  useUpdateUser,
} from "./application/hooks";

// Export application layer hooks and use cases
export { useUserManagement } from "./application/hooks/useUserManagement";

// Export domain types and interfaces
export type { UpdateUserData } from "./domain/interfaces/IUserManagementRepository";

// Hooks will be exported here in later phases
