import { User } from "@/modules/auth/domain/entities/User";
import { IUserManagementService } from "../../domain/interfaces";

/**
 * Use case for rejecting a pending user
 * Following the Single Responsibility Principle, this class handles only the operation of rejecting a user
 */
export class RejectUserUseCase {
  /**
   * @param service The user management service
   */
  constructor(private service: IUserManagementService) {}

  /**
   * Execute the use case to reject a user
   * @param userId The ID of the user to reject
   * @returns Promise resolving to the updated user
   */
  async execute(userId: string): Promise<User> {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      return await this.service.rejectUser(userId);
    } catch (error) {
      console.error("RejectUserUseCase error:", error);
      // Re-throw the error to be handled by the caller (typically a React hook)
      throw error instanceof Error ? error : new Error("Failed to reject user");
    }
  }
}
