import { useEffect, useState } from "react";
import { User } from "../../domain/entities/User";
import { AuthModule } from "../../AuthModule";

/**
 * Hook for accessing the current authenticated user
 * @returns The current user, loading state, and error
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsLoading(true);
        const getCurrentUserUseCase = AuthModule.getGetCurrentUserUseCase();
        const currentUser = await getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to get current user")
        );
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  return { user, isLoading, error };
}
