import {
  IUserManagementRepository,
  IUserManagementService,
} from "./domain/interfaces";
import { UserManagementRepository } from "./infrastructure/repositories";
import {
  UserManagementService,
  GetPendingUsersUseCase,
  ApproveUserUseCase,
  RejectUserUseCase,
  ApproveUserWithRoleUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase,
} from "./application";

/**
 * Factory class for the User Management module
 * Handles dependency injection and creates instances of repositories, services, and use cases
 */
export class UserManagementModule {
  private static repository: IUserManagementRepository | null = null;
  private static service: IUserManagementService | null = null;

  /**
   * Get the user management repository instance (singleton)
   */
  static getRepository(): IUserManagementRepository {
    if (!this.repository) {
      this.repository = new UserManagementRepository();
    }
    return this.repository;
  }

  /**
   * Get the user management service instance (singleton)
   */
  static getService(): IUserManagementService {
    if (!this.service) {
      this.service = new UserManagementService(this.getRepository());
    }
    return this.service;
  }

  /**
   * Create a new GetPendingUsersUseCase instance
   * @returns A new GetPendingUsersUseCase instance
   */
  static getGetPendingUsersUseCase(): GetPendingUsersUseCase {
    return new GetPendingUsersUseCase(this.getService());
  }

  /**
   * Create a new ApproveUserUseCase instance
   * @returns A new ApproveUserUseCase instance
   */
  static getApproveUserUseCase(): ApproveUserUseCase {
    return new ApproveUserUseCase(this.getService());
  }

  /**
   * Create a new RejectUserUseCase instance
   * @returns A new RejectUserUseCase instance
   */
  static getRejectUserUseCase(): RejectUserUseCase {
    return new RejectUserUseCase(this.getService());
  }

  /**
   * Create a new ApproveUserWithRoleUseCase instance
   * @returns A new ApproveUserWithRoleUseCase instance
   */
  static getApproveUserWithRoleUseCase(): ApproveUserWithRoleUseCase {
    return new ApproveUserWithRoleUseCase(this.getService());
  }

  /**
   * Create a new SearchUsersUseCase instance
   * @returns A new SearchUsersUseCase instance
   */
  static getSearchUsersUseCase(): SearchUsersUseCase {
    return new SearchUsersUseCase(this.getService());
  }

  /**
   * Create a new UpdateUserUseCase instance
   * @returns A new UpdateUserUseCase instance
   */
  static getUpdateUserUseCase(): UpdateUserUseCase {
    return new UpdateUserUseCase(this.getService());
  }

  /**
   * Reset all module instances (useful for testing)
   */
  static reset(): void {
    this.repository = null;
    this.service = null;
  }
}
