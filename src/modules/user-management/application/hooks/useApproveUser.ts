import { useState, useCallback } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserManagementModule } from "../../UserManagementModule";

/**
 * Hook for approving a pending user
 * @returns Object containing the approve function, loading state, and error state
 */
export function useApproveUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Approve a user
   * @param userId The ID of the user to approve
   * @returns The updated user if successful, null otherwise
   */
  const approveUser = useCallback(
    async (userId: string): Promise<User | null> => {
      if (!userId) {
        setError(new Error("User ID is required"));
        return null;
      }

      try {
        setIsLoading(true);
        setError(null);

        const useCase = UserManagementModule.getApproveUserUseCase();
        const updatedUser = await useCase.execute(userId);

        return updatedUser;
      } catch (err) {
        console.error("Error approving user:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to approve user")
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    approveUser,
    isLoading,
    error,
  };
}
