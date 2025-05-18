import { useState } from "react";
import { AuthModule } from "../../AuthModule";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  /**
   * Handles the logout process
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const logoutUseCase = AuthModule.getLogoutUseCase();
      await logoutUseCase.execute();

      // Redirect to home page after successful logout
      router.push("/");
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
