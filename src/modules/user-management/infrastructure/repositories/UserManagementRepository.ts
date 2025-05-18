import { HttpClient } from "@/core/infrastructure/http";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";
import { User } from "@/modules/auth/domain/entities/User";
import { UserRole, UserStatus } from "@/modules/auth/domain/enums";
import {
  IUserManagementRepository,
  UpdateUserData,
} from "../../domain/interfaces";
import { NetworkError } from "@/core/infrastructure/http";
import { UserSearchParams, UserSearchResult } from "../../domain/types";

// Define response types
interface ApiResponse<T> {
  status: string;
  data: T;
}

interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  jobTitle?: string;
  role: UserRole;
  // status?: UserStatus;
  approvalStatus?: UserStatus;
  createdAt: string;
}

// Update response type to match actual API response structure
interface PendingUsersResponseData {
  users: UserDTO[];
  total: number;
}

interface SearchUsersResponseData {
  users: UserDTO[];
  total: number;
}

type GetPendingUsersResponse = ApiResponse<PendingUsersResponseData>;
type SearchUsersResponse = ApiResponse<SearchUsersResponseData>;
type UpdateUserStatusResponse = ApiResponse<UserDTO>;

/**
 * Implementation of the IUserManagementRepository interface
 * Handles API calls related to user management and approval
 */
export class UserManagementRepository implements IUserManagementRepository {
  private httpClient: HttpClient;

  constructor() {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(
      process.env.NEXT_PUBLIC_API_URL || "",
      { enableErrorHandling: true }
    );
  }

  /**
   * Fetches all users with pending status from the API
   * @returns Promise resolving to an array of Users with pending status
   */
  async getPendingUsers(): Promise<User[]> {
    try {
      const response = await this.httpClient.get<GetPendingUsersResponse>(
        "/api/admin/users/pending"
      );

      if (response.status !== "success" || !response.data) {
        console.error("Invalid response:", response);
        throw new Error("Invalid response from server");
      }

      // Extract users array from the response
      const { users } = response.data;

      if (!Array.isArray(users)) {
        throw new Error("Invalid response format from server");
      }

      const mappedUsers = users.map((userDTO) => {
        const user = this.mapToUser(userDTO);
        return user;
      });

      return mappedUsers;
    } catch (error) {
      console.error("UserManagementRepository: Get pending users error", error);

      if (error instanceof NetworkError) {
        throw new Error("Network error during user fetch");
      }

      throw new Error("Failed to fetch pending users");
    }
  }

  /**
   * Updates a user's status through the API
   * @param userId The ID of the user to update
   * @param approvalStatus The new status to set
   * @returns Promise resolving to the updated User
   */
  async updateUserStatus(
    userId: string,
    approvalStatus: UserStatus
  ): Promise<User> {
    try {
      const payload = { approvalStatus };

      const response = await this.httpClient.put<UpdateUserStatusResponse>(
        `/api/admin/users/${userId}`,
        payload
      );

      if (response.status !== "success" || !response.data) {
        throw new Error("Invalid response from server");
      }

      return this.mapToUser(response.data);
    } catch (error) {
      console.error(
        "UserManagementRepository: Update user status error",
        error
      );

      if (error instanceof NetworkError) {
        throw new Error("Network error during status update");
      }

      throw new Error("Failed to update user status");
    }
  }

  /**
   * Approves a user with a specific role through the API
   * @param userId The ID of the user to approve
   * @param role The role to assign to the user
   * @returns Promise resolving to the updated User
   */
  async approveUserWithRole(userId: string, role: UserRole): Promise<User> {
    try {
      // Create payload with both approval status and role
      const payload = {
        approvalStatus: UserStatus.APPROVED,
        role,
      };

      const response = await this.httpClient.put<UpdateUserStatusResponse>(
        `/api/admin/users/${userId}`,
        payload
      );

      if (response.status !== "success" || !response.data) {
        throw new Error("Invalid response from server");
      }

      return this.mapToUser(response.data);
    } catch (error) {
      console.error(
        "UserManagementRepository: Approve user with role error",
        error
      );

      if (error instanceof NetworkError) {
        throw new Error("Network error during approval with role");
      }

      throw new Error("Failed to approve user with role");
    }
  }

  /**
   * Maps a UserDTO from the API to a User domain entity
   * @param data The user data from the API
   * @returns A User entity
   */
  private mapToUser(data: UserDTO): User {
    // Map approvalStatus to UserStatus if it exists
    let approvalStatus: UserStatus;

    if (data.approvalStatus) {
      // Convert approvalStatus string to UserStatus enum
      switch (data.approvalStatus.toUpperCase()) {
        case "APPROVED":
          approvalStatus = UserStatus.APPROVED;
          break;
        case "PENDING":
          approvalStatus = UserStatus.PENDING;
          break;
        case "REJECTED":
          approvalStatus = UserStatus.REJECTED;
          break;
        default:
          approvalStatus = UserStatus.PENDING;
      }
    } else if (data.approvalStatus !== undefined) {
      approvalStatus = data.approvalStatus;
    } else {
      approvalStatus = UserStatus.PENDING; // Default fallback
    }

    // If API provides a fullName, use it to set firstName and lastName
    let firstName = data.firstName;
    let lastName = data.lastName;

    // If API provides fullName but not firstName/lastName, extract them
    if (data.fullName && (!firstName || !lastName)) {
      const nameParts = data.fullName.split(" ");
      if (nameParts.length > 1) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      } else {
        firstName = data.fullName;
        lastName = "";
      }
    }

    return new User(
      data.id,
      data.email,
      firstName,
      lastName,
      data.jobTitle || null,
      data.role,
      approvalStatus,
      new Date(data.createdAt)
    );
  }

  /**
   * Searches for users with filtering and pagination
   * @param params Search parameters including search term, filters, and pagination
   * @returns Promise resolving to search results containing users and total count
   */
  async searchUsers(params: UserSearchParams): Promise<UserSearchResult> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();

      if (params.search) {
        queryParams.append("query", params.search);
      }

      if (params.approvalStatus) {
        queryParams.append("approvalStatus", params.approvalStatus.toString());
      }

      queryParams.append("limit", params.limit.toString());
      queryParams.append("offset", params.offset.toString());

      // Make the API call
      const url = `/api/admin/users?${queryParams.toString()}`;
      const response = await this.httpClient.get<SearchUsersResponse>(url);

      if (response.status !== "success" || !response.data) {
        console.error("Invalid response:", response);
        throw new Error("Invalid response from server");
      }

      // Extract users and total from the response
      const { users, total } = response.data;

      if (!Array.isArray(users)) {
        throw new Error("Invalid response format from server");
      }

      // Map DTO objects to domain entities
      const mappedUsers = users.map((userDTO) => this.mapToUser(userDTO));

      return {
        users: mappedUsers,
        total,
      };
    } catch (error) {
      console.error("UserManagementRepository: Search users error", error);

      if (error instanceof NetworkError) {
        throw new Error("Network error during user search");
      }

      throw new Error("Failed to search users");
    }
  }

  /**
   * Updates a user's details through the API
   * @param userId The ID of the user to update
   * @param data The new user data
   * @returns Promise resolving to the updated User
   */
  async updateUser(userId: string, data: UpdateUserData): Promise<User> {
    try {
      const response = await this.httpClient.put<UpdateUserStatusResponse>(
        `/api/admin/users/${userId}`,
        data
      );

      if (response.status !== "success" || !response.data) {
        throw new Error("Invalid response from server");
      }

      return this.mapToUser(response.data);
    } catch (error) {
      console.error("UserManagementRepository: Update user error", error);

      if (error instanceof NetworkError) {
        throw new Error("Network error during user update");
      }

      throw new Error("Failed to update user");
    }
  }
}
