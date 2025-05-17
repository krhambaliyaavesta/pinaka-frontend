import { useState } from "react";
import { AuthModule } from "../../AuthModule";

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook for handling user logout functionality
 * @returns Object with logout function, loading state, and error state
 */
export function useLogout(): UseLogoutReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Handles the logout process
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const logoutUseCase = AuthModule.getLogoutUseCase();
      await logoutUseCase.execute();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to logout");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
    error,
  };
}
