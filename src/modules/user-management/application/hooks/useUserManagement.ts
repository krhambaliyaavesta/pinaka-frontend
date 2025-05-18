import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserManagementModule } from "@/modules/user-management/UserManagementModule";
import { UpdateUserData } from "@/modules/user-management/domain/interfaces/IUserManagementRepository";
import {
  UserSearchParams,
  UserSearchResult,
} from "@/modules/user-management/domain/types";

/**
 * Hook for user management operations
 * Provides methods for searching, updating, and managing users
 */
export function useUserManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const userManagementRepository = UserManagementModule.getRepository();

  /**
   * Update user information
   * @param userId The ID of the user to update
   * @param data The update data containing new user information
   * @returns A promise resolving to the updated user
   */
  const updateUser = async (
    userId: string,
    data: UpdateUserData
  ): Promise<User> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await userManagementRepository.updateUser(
        userId,
        data
      );
      return updatedUser;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Search for users with filtering and pagination
   * @param params Search parameters
   * @returns Promise resolving to search results containing users and total count
   */
  const searchUsers = async (
    params: UserSearchParams
  ): Promise<UserSearchResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await userManagementRepository.searchUsers(params);
      return results;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUser,
    searchUsers,
    isLoading,
    error,
  };
}
