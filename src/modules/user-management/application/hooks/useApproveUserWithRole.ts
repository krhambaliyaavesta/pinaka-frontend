import { useState, useCallback } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";
import { UserManagementModule } from "../../UserManagementModule";

/**
 * Hook for approving a pending user with a specific role
 * @returns Object containing the approve function, loading state, and error state
 */
export function useApproveUserWithRole() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Approve a user with a specific role
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns The updated user if successful, null otherwise
   */
  const approveUserWithRole = useCallback(
    async (userId: string, role: UserRole): Promise<User | null> => {
      if (!userId) {
        setError(new Error("User ID is required"));
        return null;
      }

      if (role === undefined || role === null) {
        setError(new Error("Role is required"));
        return null;
      }

      try {
        setIsLoading(true);
        setError(null);

        const useCase = UserManagementModule.getApproveUserWithRoleUseCase();
        const updatedUser = await useCase.execute(userId, role);

        return updatedUser;
      } catch (err) {
        console.error("Error approving user with role:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to approve user with role")
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    approveUserWithRole,
    isLoading,
    error,
  };
}
