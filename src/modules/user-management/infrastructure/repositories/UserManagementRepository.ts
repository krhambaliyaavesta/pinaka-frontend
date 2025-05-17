import { HttpClient } from "@/core/infrastructure/http";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";
import { User } from "@/modules/auth/domain/entities/User";
import { UserRole, UserStatus } from "@/modules/auth/domain/enums";
import { IUserManagementRepository } from "../../domain/interfaces";
import { NetworkError } from "@/core/infrastructure/http";

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
  jobTitle?: string;
  role: UserRole;
  status?: UserStatus;
  approvalStatus?: string;
  createdAt: string;
}

type GetPendingUsersResponse = ApiResponse<UserDTO[]>;
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
        throw new Error("Invalid response from server");
      }

      return response.data.map((userDTO) => this.mapToUser(userDTO));
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
   * @param status The new status to set
   * @returns Promise resolving to the updated User
   */
  async updateUserStatus(userId: string, status: UserStatus): Promise<User> {
    try {
      const response = await this.httpClient.put<UpdateUserStatusResponse>(
        `/api/auth/users/${userId}`,
        { status }
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
   * Maps a UserDTO from the API to a User domain entity
   * @param data The user data from the API
   * @returns A User entity
   */
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
    } else if (data.status !== undefined) {
      status = data.status;
    } else {
      status = UserStatus.PENDING; // Default fallback
    }

    return new User(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.jobTitle || null,
      data.role,
      status,
      new Date(data.createdAt)
    );
  }
}
