import { IUserManagementService } from "../../domain/interfaces";
import { UserSearchParams, UserSearchResult } from "../../domain/types";

/**
 * Use case for searching users with filtering and pagination
 */
export class SearchUsersUseCase {
  constructor(private service: IUserManagementService) {}

  /**
   * Executes the use case
   * @param params Search parameters including search term, filters, and pagination
   * @returns Promise resolving to search results containing users and total count
   */
  async execute(params: UserSearchParams): Promise<UserSearchResult> {
    try {
      return await this.service.searchUsers(params);
    } catch (error) {
      console.error("SearchUsersUseCase: Error searching users", error);
      throw error;
    }
  }
}
