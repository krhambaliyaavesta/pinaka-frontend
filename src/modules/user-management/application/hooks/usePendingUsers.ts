import { useState, useEffect, useCallback } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserManagementModule } from "../../UserManagementModule";

/**
 * Hook for fetching and managing pending users
 * @returns Object containing pending users, loading state, error state, and refresh function
 */
export function usePendingUsers() {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch pending users from the API
   */
  const fetchPendingUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const useCase = UserManagementModule.getGetPendingUsersUseCase();
      console.log("Executing GetPendingUsersUseCase");
      const users = await useCase.execute();
      console.log("Received users from use case:", users);

      if (!Array.isArray(users)) {
        console.error("Expected array of users, got:", users);
        throw new Error("Invalid data format returned from the API");
      }

      setPendingUsers(users);
    } catch (err) {
      console.error("Error fetching pending users:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch pending users")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch pending users on mount
  useEffect(() => {
    fetchPendingUsers();
  }, [fetchPendingUsers]);

  return {
    pendingUsers,
    isLoading,
    error,
    refresh: fetchPendingUsers,
  };
}
