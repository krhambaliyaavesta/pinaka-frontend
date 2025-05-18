import { User } from "@/modules/auth/domain/entities/User";
import {
  IUserManagementService,
  UpdateUserData,
} from "../../domain/interfaces";

/**
 * Use case for updating a user's details
 */
export class UpdateUserUseCase {
  constructor(private service: IUserManagementService) {}

  /**
   * Executes the use case
   * @param userId The ID of the user to update
   * @param data The new user data
   * @returns Promise resolving to the updated user
   */
  async execute(userId: string, data: UpdateUserData): Promise<User> {
    try {
      return await this.service.updateUser(userId, data);
    } catch (error) {
      console.error("UpdateUserUseCase: Error updating user", error);
      throw error;
    }
  }
}
