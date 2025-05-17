import { useMemo } from "react";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";
import { HttpClient } from "@/core/infrastructure/http/HttpClient";

/**
 * Configuration options for HTTP client
 */
export interface HttpClientOptions {
  /**
   * Whether to enable error handling interceptor
   */
  enableErrorHandling?: boolean;
}

/**
 * Hook for accessing the HTTP client in React components
 * @param baseURL Base URL for API calls
 * @param options Configuration options
 * @returns HTTP client instance
 */
export function useHttpClient(
  baseURL: string,
  options: HttpClientOptions = {}
): HttpClient {
  const provider = useMemo(() => HttpClientProvider.getInstance(), []);

  const client = useMemo(() => {
    return provider.getClient(baseURL, options);
  }, [provider, baseURL, options.enableErrorHandling]);

  return client;
}
