/**
 * Interface for token storage operations
 */
export interface ITokenStorage {
  /**
   * Store an authentication token
   * @param token The authentication token
   * @param remember Whether to remember the token for an extended period
   */
  storeToken(token: string, remember?: boolean): void;

  /**
   * Get the stored authentication token
   * @returns The authentication token or null if not found
   */
  getToken(): string | null;

  /**
   * Remove the stored authentication token
   */
  removeToken(): void;

  /**
   * Check if a token is stored
   * @returns True if a token is stored, false otherwise
   */
  hasToken(): boolean;
}
