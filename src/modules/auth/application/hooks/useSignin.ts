import { useState } from "react";
import { AuthModule } from "../../AuthModule";
import { User } from "../../domain/entities/User";
import { InvalidCredentialsError } from "../../domain/errors/AuthErrors";

interface UseSigninReturn {
  signin: (email: string, password: string) => Promise<User | null>;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

/**
 * Hook for handling user signin functionality
 * @returns Object with signin function, loading state, error state, and success state
 */
export function useSignin(): UseSigninReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handles the signin process
   * @param email User email
   * @param password User password
   * @returns The authenticated user or null if failed
   */
  const signin = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      const loginUseCase = AuthModule.getLoginUseCase();
      const user = await loginUseCase.execute(email, password);

      setIsSuccess(true);
      return user;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new InvalidCredentialsError("Failed to sign in");

      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signin,
    isLoading,
    error,
    isSuccess,
  };
}
