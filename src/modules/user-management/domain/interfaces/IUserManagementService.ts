import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";

/**
 * Service interface for user management operations
 * Defines methods for business logic related to user approval
 */
export interface IUserManagementService {
  /**
   * Fetches all users with pending status
   * @returns Promise resolving to an array of users with pending status
   */
  getPendingUsers(): Promise<User[]>;

  /**
   * Approves a pending user
   * @param userId The ID of the user to approve
   * @returns Promise resolving to the updated user
   */
  approveUser(userId: string): Promise<User>;

  /**
   * Rejects a pending user
   * @param userId The ID of the user to reject
   * @returns Promise resolving to the updated user
   */
  rejectUser(userId: string): Promise<User>;

  /**
   * Approves a pending user with a specific role
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns Promise resolving to the updated user
   */
  approveUserWithRole(userId: string, role: UserRole): Promise<User>;
}
