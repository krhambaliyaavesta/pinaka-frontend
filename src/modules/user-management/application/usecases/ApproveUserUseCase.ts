import { User } from "@/modules/auth/domain/entities/User";
import { IUserManagementService } from "../../domain/interfaces";

/**
 * Use case for approving a pending user
 * Following the Single Responsibility Principle, this class handles only the operation of approving a user
 */
export class ApproveUserUseCase {
  /**
   * @param service The user management service
   */
  constructor(private service: IUserManagementService) {}

  /**
   * Execute the use case to approve a user
   * @param userId The ID of the user to approve
   * @returns Promise resolving to the updated user
   */
  async execute(userId: string): Promise<User> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      return await this.service.approveUser(userId);
    } catch (error) {
      console.error("ApproveUserUseCase error:", error);
      // Re-throw the error to be handled by the caller (typically a React hook)
      throw error instanceof Error
        ? error
        : new Error("Failed to approve user");
    }
  }
}
