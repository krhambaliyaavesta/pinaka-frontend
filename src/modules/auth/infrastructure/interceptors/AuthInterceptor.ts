import { InternalAxiosRequestConfig } from "axios";
import { ITokenStorage } from "../../domain/interfaces/ITokenStorage";

/**
 * Interceptor that adds the auth token to API requests
 */
export class AuthInterceptor {
  constructor(private tokenStorage: ITokenStorage) {}

  /**
   * Request interceptor to add authorization header
   * @param config Axios request config
   * @returns Modified request config with auth header
   */
  requestInterceptor = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = this.tokenStorage.getToken();

    if (token) {
      // Add the token to the Authorization header
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;

      console.log("AuthInterceptor: Added Authorization header", {
        url: config.url,
        hasToken: !!token,
      });
    }

    return config;
  };

  /**
   * Error handler for request interceptor
   * @param error The error from the interceptor
   * @throws The original error
   */
  requestErrorHandler = (error: unknown): Promise<unknown> => {
    console.error("AuthInterceptor: Request error", error);
    return Promise.reject(error);
  };
}
