/**
 * Generic storage service interface
 * Allows for different storage implementations (cookies, localStorage, etc.)
 */
export interface IStorageService {
  /**
   * Store a value under a key
   * @param key The key to store the value under
   * @param value The value to store
   * @param options Additional storage options
   */
  set(key: string, value: string, options?: Record<string, any>): void;

  /**
   * Retrieve a value by key
   * @param key The key to retrieve
   * @returns The stored value or null if not found
   */
  get(key: string): string | null;

  /**
   * Remove a stored value by key
   * @param key The key to remove
   */
  remove(key: string): void;

  /**
   * Check if a key exists in storage
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  has(key: string): boolean;
}
