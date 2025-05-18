import { useState, useCallback } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UpdateUserData } from "../../domain/interfaces";
import { UserManagementModule } from "../../UserManagementModule";

interface UseUpdateUserResult {
  updateUser: (userId: string, data: UpdateUserData) => Promise<User | null>;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

/**
 * Hook for updating a user's details
 * @returns Object containing update function, loading state, error state, and success state
 */
export function useUpdateUser(): UseUpdateUserResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = useCallback(
    async (userId: string, data: UpdateUserData): Promise<User | null> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Get the use case from the module
        const updateUserUseCase = UserManagementModule.getUpdateUserUseCase();

        // Execute the use case
        const updatedUser = await updateUserUseCase.execute(userId, data);

        // Update success state
        setSuccess(true);

        return updatedUser;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to update user")
        );
        console.error("Error updating user:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    updateUser,
    loading,
    error,
    success,
  };
}
