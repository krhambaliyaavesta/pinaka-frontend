import { User } from "@/modules/auth/domain/entities/User";
import { IUserManagementService } from "../../domain/interfaces";

/**
 * Use case for fetching pending users
 * Following the Single Responsibility Principle, this class handles only the operation of getting pending users
 */
export class GetPendingUsersUseCase {
  /**
   * @param service The user management service
   */
  constructor(private service: IUserManagementService) {}

  /**
   * Execute the use case to fetch pending users
   * @returns Promise resolving to an array of pending users
   */
  async execute(): Promise<User[]> {
    try {
      return await this.service.getPendingUsers();
    } catch (error) {
      console.error("GetPendingUsersUseCase error:", error);
      // Re-throw the error to be handled by the caller (typically a React hook)
      throw error instanceof Error
        ? error
        : new Error("Failed to get pending users");
    }
  }
}
