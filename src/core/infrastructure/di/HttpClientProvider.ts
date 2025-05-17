import {
  AxiosHttpClient,
  AxiosInterceptors,
} from "@/core/infrastructure/http/AxiosHttpClient";
import { HttpClient } from "@/core/infrastructure/http/HttpClient";
import { ErrorInterceptor } from "@/core/infrastructure/http/interceptors/ErrorInterceptor";
import { AuthTokenInterceptor } from "@/core/infrastructure/http/interceptors/AuthTokenInterceptor";
import { ITokenStorage } from "@/modules/auth/domain/interfaces/ITokenStorage";
import { AuthModule } from "@/modules/auth/AuthModule";

/**
 * Factory for creating and configuring HTTP clients
 */
export class HttpClientProvider {
  private static instance: HttpClientProvider;
  private clients: Map<string, HttpClient> = new Map();

  /**
   * Creates a new HttpClientProvider
   */
  private constructor() {}

  /**
   * Gets the singleton instance of HttpClientProvider
   * @returns HttpClientProvider instance
   */
  public static getInstance(): HttpClientProvider {
    if (!HttpClientProvider.instance) {
      HttpClientProvider.instance = new HttpClientProvider();
    }
    return HttpClientProvider.instance;
  }

  /**
   * Creates or retrieves an HTTP client for a specific API
   * @param baseURL The base URL for the API
   * @param options Additional configuration options
   * @returns A configured HttpClient instance
   */
  public getClient(
    baseURL: string,
    options: {
      enableErrorHandling?: boolean;
      enableAuthToken?: boolean;
    } = {}
  ): HttpClient {
    const { enableErrorHandling = true, enableAuthToken = true } = options;

    const clientKey = `${baseURL}-${
      enableErrorHandling ? "error" : "noerror"
    }-${enableAuthToken ? "auth" : "noauth"}`;

    // Return existing client if already created
    if (this.clients.has(clientKey)) {
      return this.clients.get(clientKey)!;
    }

    // Create interceptors
    const interceptors: AxiosInterceptors = {};

    // Add auth token interceptor if enabled
    if (enableAuthToken) {
      // Get token storage from AuthModule
      const tokenStorage: ITokenStorage = AuthModule.getTokenStorage();

      // Create auth interceptor
      const authInterceptor = new AuthTokenInterceptor(tokenStorage);

      interceptors.request = {
        onFulfilled: authInterceptor.onRequest,
      };
    }

    // Add error interceptor if enabled
    if (enableErrorHandling) {
      const errorInterceptor = new ErrorInterceptor();
      interceptors.response = {
        onRejected: errorInterceptor.onError,
      };
    }

    // Create and store the client
    const client = new AxiosHttpClient(baseURL, interceptors);
    this.clients.set(clientKey, client);

    return client;
  }
}
