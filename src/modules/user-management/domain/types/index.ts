import { UserStatus } from "@/modules/auth/domain/enums";
import { User } from "@/modules/auth/domain/entities/User";

/**
 * Parameters for searching users
 */
export interface UserSearchParams {
  /**
   * Optional search term to filter users by name or email
   */
  search?: string;

  /**
   * Optional filter by approval status
   */
  approvalStatus?: UserStatus;

  /**
   * Number of users to return (for pagination)
   */
  limit: number;

  /**
   * Offset for pagination
   */
  offset: number;
}

/**
 * Response from searching users
 */
export interface UserSearchResult {
  /**
   * Array of users matching the search criteria
   */
  users: User[];

  /**
   * Total count of users matching the search criteria (for pagination)
   */
  total: number;
}
