import { IAuthService } from "../../domain/interfaces/IAuthService";
import {
  IAuthRepository,
  RegisterUserDto,
} from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";
import { AuthError } from "../../domain/errors/AuthErrors";

export class AuthService implements IAuthService {
  constructor(private repository: IAuthRepository) {}

  async login(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new AuthError(
        "Email and password are required",
        "AUTH_INVALID_INPUT"
      );
    }

    return this.repository.login(email, password);
  }

  async register(userData: RegisterUserDto): Promise<User> {
    // Validate input
    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.jobTitle
    ) {
      throw new AuthError("All fields are required", "AUTH_INVALID_INPUT");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new AuthError("Invalid email format", "AUTH_INVALID_EMAIL");
    }

    // Password validation (min 8 chars)
    if (userData.password.length < 8) {
      throw new AuthError(
        "Password must be at least 8 characters",
        "AUTH_INVALID_PASSWORD"
      );
    }

    // Job title validation - required for registration
    if (userData.jobTitle.trim() === "") {
      throw new AuthError(
        "Job title cannot be empty",
        "AUTH_INVALID_JOB_TITLE"
      );
    }

    return this.repository.register(userData);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.repository.getCurrentUser();
  }

  async logout(): Promise<void> {
    return this.repository.logout();
  }
}
