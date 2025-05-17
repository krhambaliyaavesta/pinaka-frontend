import { HttpClient } from "../../../../core/infrastructure/http";
import { HttpClientProvider } from "../../../../core/infrastructure/di/HttpClientProvider";
import {
  IAuthRepository,
  RegisterUserDto,
} from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";
import { UserRole, UserStatus } from "../../domain/enums";
import {
  AuthError,
  InvalidCredentialsError,
  RegistrationError,
} from "../../domain/errors/AuthErrors";
import {
  AuthenticationError,
  NetworkError,
} from "../../../../core/infrastructure/http";

// Define types for API responses based on the actual response format
interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string; // API provides this directly
  jobTitle?: string; // Optional, might not come from API
  role: UserRole;
  status?: UserStatus; // Status might not be in the response
  createdAt: string;
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

// Use type aliases instead of empty interfaces
type LoginResponse = ApiResponse<UserDTO>;
type RegisterResponse = ApiResponse<UserDTO>;
type GetUserResponse = ApiResponse<UserDTO>;

export class AuthRepository implements IAuthRepository {
  private httpClient: HttpClient;

  constructor() {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(
      process.env.NEXT_PUBLIC_API_URL || "",
      { enableErrorHandling: true }
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await this.httpClient.post<LoginResponse>(
        "/api/auth/login",
        { email, password }
      );

      if (response.status !== "success" || !response.data) {
        throw new AuthError(
          "Invalid response from server",
          "AUTH_INVALID_RESPONSE"
        );
      }

      return this.mapToUser(response.data);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new InvalidCredentialsError(error.message, error);
      }
      if (error instanceof NetworkError) {
        throw new AuthError(
          "Network error during login",
          "AUTH_NETWORK_ERROR",
          error
        );
      }
      throw new AuthError("Login failed", "AUTH_LOGIN_FAILED", error as Error);
    }
  }

  async register(userData: RegisterUserDto): Promise<User> {
    try {
      const response = await this.httpClient.post<RegisterResponse>(
        "/api/auth/register",
        userData
      );

      if (response.status !== "success" || !response.data) {
        throw new AuthError(
          "Invalid response from server",
          "AUTH_INVALID_RESPONSE"
        );
      }

      return this.mapToUser(response.data);
    } catch (error) {
      throw new RegistrationError(undefined, error as Error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.httpClient.get<GetUserResponse>(
        "/api/auth/me"
      );

      if (response.status !== "success" || !response.data) {
        return null;
      }

      return this.mapToUser(response.data);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return null;
      }
      throw new AuthError(
        "Failed to get user",
        "AUTH_GET_USER_FAILED",
        error as Error
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post("/api/auth/logout", {});
    } catch (error) {
      throw new AuthError(
        "Logout failed",
        "AUTH_LOGOUT_FAILED",
        error as Error
      );
    }
  }

  private mapToUser(data: UserDTO): User {
    // Default status to APPROVED if not provided
    const status =
      data.status !== undefined ? data.status : UserStatus.APPROVED;

    return new User(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.jobTitle || null, // Handle potential undefined
      data.role,
      status,
      new Date(data.createdAt)
    );
  }
}
