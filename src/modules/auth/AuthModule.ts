import { AuthRepository } from "./infrastructure/repositories/AuthRepository";
import { AuthService } from "./application/services/AuthService";
import { LoginUseCase } from "./application/usecases/LoginUseCase";
import { RegisterUseCase } from "./application/usecases/RegisterUseCase";
import { GetCurrentUserUseCase } from "./application/usecases/GetCurrentUserUseCase";
import { LogoutUseCase } from "./application/usecases/LogoutUseCase";
import { IAuthRepository } from "./domain/interfaces/IAuthRepository";
import { IAuthService } from "./domain/interfaces/IAuthService";

/**
 * Auth Module Factory
 *
 * This module factory provides centralized access to auth-related
 * repositories, services and use cases with proper dependency injection.
 */
export class AuthModule {
  private static repository: IAuthRepository;
  private static service: IAuthService;

  /**
   * Gets or creates an instance of the auth repository
   * @returns The auth repository instance
   */
  static getAuthRepository(): IAuthRepository {
    if (!this.repository) {
      this.repository = new AuthRepository();
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
   * Resets all singleton instances
   * This is primarily used for testing purposes
   */
  static reset(): void {
    this.repository = undefined as unknown as IAuthRepository;
    this.service = undefined as unknown as IAuthService;
  }
}
