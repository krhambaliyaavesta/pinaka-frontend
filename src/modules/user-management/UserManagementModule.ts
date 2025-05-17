import {
  IUserManagementRepository,
  IUserManagementService,
} from "./domain/interfaces";

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
      // Will be implemented in the next phase
      throw new Error("Repository not implemented yet");
    }
    return this.repository;
  }

  /**
   * Get the user management service instance (singleton)
   */
  static getService(): IUserManagementService {
    if (!this.service) {
      // Will be implemented in the next phase
      throw new Error("Service not implemented yet");
    }
    return this.service;
  }

  /**
   * Create a new GetPendingUsersUseCase instance
   */
  static getGetPendingUsersUseCase() {
    // Will be implemented in a later phase
    throw new Error("Use case not implemented yet");
  }

  /**
   * Create a new ApproveUserUseCase instance
   */
  static getApproveUserUseCase() {
    // Will be implemented in a later phase
    throw new Error("Use case not implemented yet");
  }

  /**
   * Create a new RejectUserUseCase instance
   */
  static getRejectUserUseCase() {
    // Will be implemented in a later phase
    throw new Error("Use case not implemented yet");
  }

  /**
   * Reset all module instances (useful for testing)
   */
  static reset(): void {
    this.repository = null;
    this.service = null;
  }
}
