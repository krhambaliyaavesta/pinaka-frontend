import { AuthRepository } from "./infrastructure/repositories/AuthRepository";
import { TokenStorage } from "./infrastructure/storage/TokenStorage";
import { AuthService } from "./application/services/AuthService";
import { LoginUseCase } from "./application/usecases/LoginUseCase";
import { RegisterUseCase } from "./application/usecases/RegisterUseCase";
import { GetCurrentUserUseCase } from "./application/usecases/GetCurrentUserUseCase";
import { LogoutUseCase } from "./application/usecases/LogoutUseCase";
import { IAuthRepository } from "./domain/interfaces/IAuthRepository";
import { IAuthService } from "./domain/interfaces/IAuthService";
import { ITokenStorage } from "./domain/interfaces/ITokenStorage";

/**
 * Auth Module Factory
 *
 * This module factory provides centralized access to auth-related
 * repositories, services and use cases with proper dependency injection.
 */
export class AuthModule {
  private static repository: IAuthRepository;
  private static service: IAuthService;
  private static tokenStorage: ITokenStorage;

  /**
   * Gets or creates an instance of the token storage
   * @returns The token storage instance
   */
  static getTokenStorage(): ITokenStorage {
    if (!this.tokenStorage) {
      this.tokenStorage = new TokenStorage();
    }
    return this.tokenStorage;
  }

  /**
   * Gets or creates an instance of the auth repository
   * @returns The auth repository instance
   */
  static getAuthRepository(): IAuthRepository {
    if (!this.repository) {
      this.repository = new AuthRepository(this.getTokenStorage());
    }
    return this.repository;
  }

  /**
   * Gets or creates an instance of the auth service
   * @returns The auth service instance
   */
  static getAuthService(): IAuthService {
    if (!this.service) {
      this.service = new AuthService(this.getAuthRepository());
    }
    return this.service;
  }

  /**
   * Creates a new login use case
   * @returns A login use case instance
   */
  static getLoginUseCase(): LoginUseCase {
    return new LoginUseCase(this.getAuthService());
  }

  /**
   * Creates a new register use case
   * @returns A register use case instance
   */
  static getRegisterUseCase(): RegisterUseCase {
    return new RegisterUseCase(this.getAuthService());
  }

  /**
   * Creates a new get current user use case
   * @returns A get current user use case instance
   */
  static getGetCurrentUserUseCase(): GetCurrentUserUseCase {
    return new GetCurrentUserUseCase(this.getAuthService());
  }

  /**
   * Creates a new logout use case
   * @returns A logout use case instance
   */
  static getLogoutUseCase(): LogoutUseCase {
    return new LogoutUseCase(this.getAuthService());
  }

  /**
   * Check if the user is authenticated
   * @returns True if the user is authenticated, false otherwise
   */
  static isAuthenticated(): boolean {
    // If repository exists, use it to check authentication
    if (this.repository) {
      return (this.repository as AuthRepository).isAuthenticated();
    }

    // Otherwise, create a temporary token storage to check
    return this.getTokenStorage().hasToken();
  }

  /**
   * Get the current auth token
   * @returns The authentication token or null if not found
   */
  static getToken(): string | null {
    return this.getTokenStorage().getToken();
  }

  /**
   * Resets all singleton instances
   * This is primarily used for testing purposes
   */
  static reset(): void {
    this.repository = undefined as unknown as IAuthRepository;
    this.service = undefined as unknown as IAuthService;
    this.tokenStorage = undefined as unknown as ITokenStorage;
  }
}
