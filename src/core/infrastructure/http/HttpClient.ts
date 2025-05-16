/**
 * Interface defining the contract for HTTP operations.
 * This abstraction allows us to swap out the actual HTTP client implementation without affecting the rest of the application.
 */
export interface HttpClient {
  /**
   * Performs an HTTP GET request
   * @param url The endpoint URL
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;

  /**
   * Performs an HTTP POST request
   * @param url The endpoint URL
   * @param data The data to send in the request body
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;

  /**
   * Performs an HTTP PUT request
   * @param url The endpoint URL
   * @param data The data to send in the request body
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;

  /**
   * Performs an HTTP DELETE request
   * @param url The endpoint URL
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;

  /**
   * Performs an HTTP PATCH request
   * @param url The endpoint URL
   * @param data The data to send in the request body
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  patch<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
}

/**
 * Configuration options for HTTP requests
 */
export interface HttpRequestConfig {
  /**
   * Request headers
   */
  headers?: Record<string, string>;

  /**
   * URL parameters to be sent with the request
   */
  params?: Record<string, string | number | boolean | null | undefined>;

  /**
   * Request timeout in milliseconds
   */
  timeout?: number;

  /**
   * Whether to include credentials in the request
   */
  withCredentials?: boolean;

  /**
   * Response type
   */
  responseType?: "json" | "text" | "blob" | "arraybuffer";
}
