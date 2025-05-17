import { IStorageService } from "../../domain/interfaces/IStorageService";

/**
 * LocalStorage-based storage service implementation
 */
export class LocalStorageService implements IStorageService {
  /**
   * Store a value in localStorage
   * @param key Storage key
   * @param value Storage value
   */
  set(key: string, value: string): void {
    if (typeof window === "undefined" || !window.localStorage) {
      return; // Cannot use localStorage on server side
    }

    localStorage.setItem(key, value);
  }

  /**
   * Get a value from localStorage
   * @param key Storage key
   * @returns Stored value or null if not found
   */
  get(key: string): string | null {
    if (typeof window === "undefined" || !window.localStorage) {
      return null; // Cannot use localStorage on server side
    }

    return localStorage.getItem(key);
  }

  /**
   * Remove a key from localStorage
   * @param key Storage key
   */
  remove(key: string): void {
    if (typeof window === "undefined" || !window.localStorage) {
      return; // Cannot use localStorage on server side
    }

    localStorage.removeItem(key);
  }

  /**
   * Check if a key exists in localStorage
   * @param key Storage key
   * @returns True if the key exists, false otherwise
   */
  has(key: string): boolean {
    if (typeof window === "undefined" || !window.localStorage) {
      return false; // Cannot use localStorage on server side
    }

    return localStorage.getItem(key) !== null;
  }
}
