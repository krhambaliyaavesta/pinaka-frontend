// Re-export domain types and interfaces
export * from "./domain";

// Export the module class
export { UserManagementModule } from "./UserManagementModule";

// Export application hooks for UI consumption
export {
  usePendingUsers,
  useApproveUser,
  useRejectUser,
} from "./application/hooks";

// Hooks will be exported here in later phases
