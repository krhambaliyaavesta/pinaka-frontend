import { useState, useCallback } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserManagementModule } from "../../UserManagementModule";

/**
 * Hook for rejecting a pending user
 * @returns Object containing the reject function, loading state, and error state
 */
export function useRejectUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Reject a user
   * @param userId The ID of the user to reject
   * @returns The updated user if successful, null otherwise
   */
  const rejectUser = useCallback(
    async (userId: string): Promise<User | null> => {
      if (!userId) {
        setError(new Error("User ID is required"));
        return null;
      }

      try {
        setIsLoading(true);
        setError(null);

        const useCase = UserManagementModule.getRejectUserUseCase();
        const updatedUser = await useCase.execute(userId);

        return updatedUser;
      } catch (err) {
        console.error("Error rejecting user:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to reject user")
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    rejectUser,
    isLoading,
    error,
  };
}
