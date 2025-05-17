import { useState } from "react";
import { AuthModule } from "../../AuthModule";
import { RegisterUserDto } from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";
import { RegistrationError } from "../../domain/errors/AuthErrors";

interface UseSignupReturn {
  signup: (userData: RegisterUserDto) => Promise<User | null>;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
}

/**
 * Hook for handling user signup functionality
 * @returns Object with signup function, loading state, error state, and success state
 */
export function useSignup(): UseSignupReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handles the signup process
   * @param userData User registration data
   * @returns The created user or null if failed
   */
  const signup = async (userData: RegisterUserDto): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      const signupUseCase = AuthModule.getRegisterUseCase();
      const user = await signupUseCase.execute(userData);

      setIsSuccess(true);
      return user;
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new RegistrationError("Failed to register user");

      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
    isSuccess,
  };
}
