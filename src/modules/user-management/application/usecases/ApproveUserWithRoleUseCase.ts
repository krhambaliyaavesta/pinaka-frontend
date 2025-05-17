import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";
import { IUserManagementService } from "../../domain/interfaces";

/**
 * Use case for approving a pending user with a specific role
 * Following the Single Responsibility Principle, this class handles only the operation of approving a user with role assignment
 */
export class ApproveUserWithRoleUseCase {
  /**
   * @param service The user management service
   */
  constructor(private service: IUserManagementService) {}

  /**
   * Execute the use case to approve a user with a specific role
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns Promise resolving to the updated user
   */
  async execute(userId: string, role: UserRole): Promise<User> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (role === undefined || role === null) {
      throw new Error("Role is required");
    }

    try {
      return await this.service.approveUserWithRole(userId, role);
    } catch (error) {
      console.error("ApproveUserWithRoleUseCase error:", error);
      // Re-throw the error to be handled by the caller (typically a React hook)
      throw error instanceof Error
        ? error
        : new Error("Failed to approve user with role");
    }
  }
}
