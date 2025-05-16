import { AxiosHttpClient, AxiosInterceptors } from "../http/AxiosHttpClient";
import { HttpClient } from "../http/HttpClient";
import { ErrorInterceptor } from "../http/interceptors/ErrorInterceptor";

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
    } = {}
  ): HttpClient {
    const { enableErrorHandling = true } = options;

    const clientKey = `${baseURL}-${enableErrorHandling ? "error" : "noerror"}`;

    // Return existing client if already created
    if (this.clients.has(clientKey)) {
      return this.clients.get(clientKey)!;
    }

    // Create interceptors
    const interceptors: AxiosInterceptors = {};

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
