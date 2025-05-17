import { HttpClient } from "../../../../core/infrastructure/http";
import { HttpClientProvider } from "../../../../core/infrastructure/di/HttpClientProvider";
import {
  IAuthRepository,
  RegisterUserDto,
} from "../../domain/interfaces/IAuthRepository";
import { ITokenStorage } from "../../domain/interfaces/ITokenStorage";
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
import { TokenStorage } from "../storage/TokenStorage";

// Define types for API responses based on the actual response format
interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string; // API might provide this directly
  jobTitle?: string; // Optional, might not come from API
  role: UserRole;
  approvalStatus?: UserStatus; // New field from the API
  createdAt?: string; // May not be in response from signin/signup
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

interface AuthResponseData {
  token: string;
  user: UserDTO;
}

// Use type aliases instead of empty interfaces
type LoginResponse = ApiResponse<AuthResponseData>;
type RegisterResponse = ApiResponse<AuthResponseData>;
type GetUserResponse = ApiResponse<UserDTO>;

export class AuthRepository implements IAuthRepository {
  private httpClient: HttpClient;
  private tokenStorage: ITokenStorage;

  constructor(tokenStorage?: ITokenStorage) {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(
      process.env.NEXT_PUBLIC_API_URL || "",
      { enableErrorHandling: true }
    );

    // Use provided token storage or create a default one
    this.tokenStorage = tokenStorage || new TokenStorage();
  }

  async login(email: string, password: string): Promise<User> {
    try {
      console.log("AuthRepository: Attempting login with", { email });

      const response = await this.httpClient.post<LoginResponse>(
        "/api/auth/signin",
        { email, password }
      );

      console.log("AuthRepository: Login response", response);

      if (response.status !== "success" || !response.data) {
        throw new AuthError(
          "Invalid response from server",
          "AUTH_INVALID_RESPONSE"
        );
      }

      // Store the token in TokenStorage
      this.tokenStorage.storeToken(response.data.token);

      // Double check by also manually setting the cookie
      this.setAuthCookie("auth_token", response.data.token);

      // Verify we can access the token right after setting it
      const storedToken = this.tokenStorage.getToken();

      return this.mapToUser(response.data.user);
    } catch (error) {
      console.error("AuthRepository: Login error", error);

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
        "/api/auth/signup",
        userData
      );

      if (response.status !== "success" || !response.data) {
        throw new AuthError(
          "Invalid response from server",
          "AUTH_INVALID_RESPONSE"
        );
      }

      // Store the token in our token storage
      this.tokenStorage.storeToken(response.data.token);

      return this.mapToUser(response.data.user);
    } catch (error) {
      throw new RegistrationError(undefined, error as Error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      // Check if we have a token before making the request
      const token = this.tokenStorage.getToken();

      const response = await this.httpClient.get<GetUserResponse>(
        "/api/auth/me"
      );

      if (response.status !== "success" || !response.data) {
        return null;
      }

      return this.mapToUser(response.data);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        // Clear invalid token
        this.tokenStorage.removeToken();
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
      // Remove the token from storage
      this.tokenStorage.removeToken();

      // Also manually remove the cookie for extra reliability
      this.removeAuthCookie("auth_token");
    } catch (error) {
      throw new AuthError(
        "Logout failed",
        "AUTH_LOGOUT_FAILED",
        error as Error
      );
    }
  }

  private mapToUser(data: UserDTO): User {
    // Map approvalStatus to UserStatus if it exists
    let status: UserStatus;

    if (data.approvalStatus) {
      // Convert approvalStatus string to UserStatus enum
      switch (data.approvalStatus.toUpperCase()) {
        case "APPROVED":
          status = UserStatus.APPROVED;
          break;
        case "PENDING":
          status = UserStatus.PENDING;
          break;
        case "REJECTED":
          status = UserStatus.REJECTED;
          break;
        default:
          status = UserStatus.PENDING;
      }
    } else if (data.approvalStatus !== undefined) {
      status = data.approvalStatus;
    } else {
      status = UserStatus.APPROVED; // Default fallback
    }

    return new User(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.jobTitle || null, // Handle potential undefined
      data.role,
      status,
      new Date(data.createdAt || "")
    );
  }

  /**
   * Get the stored authentication token
   * @returns The authentication token or null if not found
   */
  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  /**
   * Check if the user is authenticated
   * @returns True if the user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    return this.tokenStorage.hasToken();
  }

  /**
   * Manually set an authentication cookie (backup approach)
   * @param name Cookie name
   * @param value Cookie value
   */
  private setAuthCookie(name: string, value: string): void {
    if (typeof document === "undefined") return;

    const expires = new Date();
    // Set expiry to 1 day from now
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);

    // Set cookie with secure attributes where possible
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    const sameSite = "; samesite=strict";

    // Set the cookie
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/${secure}${sameSite}`;

    console.log("AuthRepository: Manually set auth cookie", { name });
  }

  /**
   * Manually remove an authentication cookie
   * @param name Cookie name
   */
  private removeAuthCookie(name: string): void {
    if (typeof document === "undefined") return;

    // Set the cookie with an expired date to remove it
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    console.log("AuthRepository: Manually removed auth cookie", { name });
  }
}
