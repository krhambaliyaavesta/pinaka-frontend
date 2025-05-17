import { User } from "@/modules/auth/domain/entities/User";
import { UserRole, UserStatus } from "@/modules/auth/domain/enums";

/**
 * Repository interface for user management operations
 * Defines methods for accessing user data related to approval
 */
export interface IUserManagementRepository {
  /**
   * Fetches all users with pending status
   * @returns Promise resolving to an array of users with pending status
   */
  getPendingUsers(): Promise<User[]>;

  /**
   * Updates a user's status (approve/reject)
   * @param userId The ID of the user to update
   * @param status The new status to set
   * @returns Promise resolving to the updated user
   */
  updateUserStatus(userId: string, approvalStatus: UserStatus): Promise<User>;

  /**
   * Approves a user with a specific role
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns Promise resolving to the updated user
   */
  approveUserWithRole(userId: string, role: UserRole): Promise<User>;
}
