import { InternalAxiosRequestConfig } from "axios";
import { ITokenStorage } from "@/modules/auth/domain/interfaces/ITokenStorage";

/**
 * Interceptor to add authentication token to outgoing requests
 */
export class AuthTokenInterceptor {
  constructor(private tokenStorage: ITokenStorage) {}

  /**
   * Request interceptor that adds the auth token as a Bearer token in the Authorization header
   * @param config Axios request configuration
   * @returns Modified request configuration with auth token
   */
  onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = this.tokenStorage.getToken();

    if (token) {
      // Set the Authorization header with the Bearer token
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  };
}
