import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";
import { UserSearchParams, UserSearchResult } from "../types";
import { UpdateUserData } from "./IUserManagementRepository";

/**
 * Service interface for user management operations
 * Defines methods for business logic related to user approval
 */
export interface IUserManagementService {
  /**
   * Fetches all users with pending status
   * @returns Promise resolving to an array of users with pending status
   */
  getPendingUsers(): Promise<User[]>;

  /**
   * Approves a pending user
   * @param userId The ID of the user to approve
   * @returns Promise resolving to the updated user
   */
  approveUser(userId: string): Promise<User>;

  /**
   * Rejects a pending user
   * @param userId The ID of the user to reject
   * @returns Promise resolving to the updated user
   */
  rejectUser(userId: string): Promise<User>;

  /**
   * Approves a pending user with a specific role
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns Promise resolving to the updated user
   */
  approveUserWithRole(userId: string, role: UserRole): Promise<User>;

  /**
   * Searches for users with filtering and pagination
   * @param params Search parameters including search term, filters, and pagination
   * @returns Promise resolving to search results containing users and total count
   */
  searchUsers(params: UserSearchParams): Promise<UserSearchResult>;

  /**
   * Updates a user's details
   * @param userId The ID of the user to update
   * @param data The new user data
   * @returns Promise resolving to the updated user
   */
  updateUser(userId: string, data: UpdateUserData): Promise<User>;
}
