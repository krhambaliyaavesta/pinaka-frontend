import { IStorageService } from "../../domain/interfaces/IStorageService";

/**
 * Cookie-based storage service implementation
 */
export class CookieStorageService implements IStorageService {
  /**
   * Store a value in a cookie
   * @param key Cookie name
   * @param value Cookie value
   * @param options Cookie options
   */
  set(key: string, value: string, options: Record<string, any> = {}): void {
    if (typeof window === "undefined") {
      return; // Cannot set cookies on server side
    }

    const {
      path = "/",
      maxAge = 86400, // 1 day in seconds
      secure = window.location.protocol === "https:",
      sameSite = "strict",
      ...otherOptions
    } = options;

    let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}`;

    cookieString += `; path=${path}`;

    if (maxAge) {
      cookieString += `; max-age=${maxAge}`;
    }

    if (secure) {
      cookieString += "; secure";
    }

    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    // Add any other options
    Object.entries(otherOptions).forEach(([optKey, optValue]) => {
      cookieString += `; ${optKey}=${optValue}`;
    });

    document.cookie = cookieString;
  }

  /**
   * Get a cookie value by name
   * @param key Cookie name
   * @returns Cookie value or null if not found
   */
  get(key: string): string | null {
    if (typeof window === "undefined") {
      return null; // Cannot get cookies on server side
    }

    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) =>
      c.startsWith(`${encodeURIComponent(key)}=`)
    );

    if (!cookie) {
      return null;
    }

    const [, value] = cookie.split("=");
    return decodeURIComponent(value);
  }

  /**
   * Remove a cookie by name
   * @param key Cookie name
   */
  remove(key: string): void {
    if (typeof window === "undefined") {
      return; // Cannot remove cookies on server side
    }

    // Set the cookie with an empty value and expired timestamp
    document.cookie = `${encodeURIComponent(
      key
    )}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  /**
   * Check if a cookie exists
   * @param key Cookie name
   * @returns True if the cookie exists, false otherwise
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }
}
