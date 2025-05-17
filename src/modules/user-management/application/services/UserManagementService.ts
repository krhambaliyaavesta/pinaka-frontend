import { User } from "@/modules/auth/domain/entities/User";
import { UserRole, UserStatus } from "@/modules/auth/domain/enums";
import {
  IUserManagementRepository,
  IUserManagementService,
} from "../../domain/interfaces";

/**
 * Implementation of the IUserManagementService interface
 * Handles business logic related to user management
 */
export class UserManagementService implements IUserManagementService {
  constructor(private repository: IUserManagementRepository) {}

  /**
   * Fetches all users with pending status
   * @returns Promise resolving to an array of Users with pending status
   */
  async getPendingUsers(): Promise<User[]> {
    try {
      return await this.repository.getPendingUsers();
    } catch (error) {
      console.error("UserManagementService: Get pending users error", error);
      throw error;
    }
  }

  /**
   * Approves a pending user by updating their status
   * @param userId The ID of the user to approve
   * @returns Promise resolving to the updated User
   */
  async approveUser(userId: string): Promise<User> {
    try {
      return await this.repository.updateUserStatus(
        userId,
        UserStatus.APPROVED
      );
    } catch (error) {
      console.error("UserManagementService: Approve user error", error);
      throw error;
    }
  }

  /**
   * Rejects a pending user by updating their status
   * @param userId The ID of the user to reject
   * @returns Promise resolving to the updated User
   */
  async rejectUser(userId: string): Promise<User> {
    try {
      return await this.repository.updateUserStatus(
        userId,
        UserStatus.REJECTED
      );
    } catch (error) {
      console.error("UserManagementService: Reject user error", error);
      throw error;
    }
  }

  /**
   * Approves a pending user and assigns them a specific role
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns Promise resolving to the updated User
   */
  async approveUserWithRole(userId: string, role: UserRole): Promise<User> {
    try {
      return await this.repository.approveUserWithRole(userId, role);
    } catch (error) {
      console.error(
        "UserManagementService: Approve user with role error",
        error
      );
      throw error;
    }
  }
}
