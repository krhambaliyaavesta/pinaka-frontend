import { ITokenStorage } from "../../domain/interfaces/ITokenStorage";
import { IStorageService } from "../../../../core/domain/interfaces/IStorageService";
import {
  StorageProvider,
  StorageType,
} from "../../../../core/infrastructure/storage";

/**
 * Token storage implementation using cookies
 * Follows dependency inversion by depending on the abstract IStorageService
 */
export class TokenStorage implements ITokenStorage {
  private readonly TOKEN_KEY = "auth_token";
  private readonly storageService: IStorageService;
  private readonly memoryToken: { value: string | null } = { value: null };

  constructor(storageType: StorageType = StorageType.COOKIE) {
    this.storageService = StorageProvider.getInstance().getStorage(storageType);
  }

  /**
   * Store an authentication token
   * @param token The authentication token
   * @param remember Whether to remember the token for an extended period (default: false)
   */
  storeToken(token: string, remember = false): void {
    // Always store in memory for immediate access
    this.memoryToken.value = token;

    // Store in persistent storage (cookie or localStorage)
    const options: Record<string, any> = {};

    if (remember) {
      // 30 days if remember is true
      options.maxAge = 30 * 24 * 60 * 60;
    } else {
      // 24 hours by default
      options.maxAge = 24 * 60 * 60;
    }

    // Ensure cookies work in development environment
    options.path = "/";
    options.sameSite = "lax"; // Use lax to allow redirects

    // Set the cookie
    this.storageService.set(this.TOKEN_KEY, token, options);

    // Manually set a cookie as a fallback
    this.setManualCookie(this.TOKEN_KEY, token, options.maxAge);
  }

  /**
   * Get the stored authentication token
   * @returns The authentication token or null if not found
   */
  getToken(): string | null {
    // First check memory for immediate access
    if (this.memoryToken.value) {
      return this.memoryToken.value;
    }

    // Fall back to storage service
    const token = this.storageService.get(this.TOKEN_KEY);

    // Update memory cache if found
    if (token) {
      this.memoryToken.value = token;
    }

    return token;
  }

  /**
   * Remove the stored authentication token
   */
  removeToken(): void {
    // Clear from memory
    this.memoryToken.value = null;

    // Clear from storage
    this.storageService.remove(this.TOKEN_KEY);

    // Also clear the manual cookie
    this.removeManualCookie(this.TOKEN_KEY);
  }

  /**
   * Check if a token is stored
   * @returns True if a token is stored, false otherwise
   */
  hasToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Set a cookie manually as a fallback
   */
  private setManualCookie(name: string, value: string, maxAge: number): void {
    if (typeof document === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + maxAge * 1000);

    // Adjust for development environment
    const sameSite = "lax";
    const secure = window.location.protocol === "https:" ? "; secure" : "";

    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; samesite=${sameSite}${secure}`;
  }

  /**
   * Remove a cookie manually
   */
  private removeManualCookie(name: string): void {
    if (typeof document === "undefined") return;

    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}
