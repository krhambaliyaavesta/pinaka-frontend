import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { HttpClient, HttpRequestConfig } from "./HttpClient";
import { HttpError, NetworkError } from "./errors/HttpError";

/**
 * Interface for defining Axios interceptors
 */
export interface AxiosInterceptors {
  request?: {
    onFulfilled: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    onRejected?: (error: unknown) => unknown;
  };
  response?: {
    onFulfilled?: (
      response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onRejected?: (error: unknown) => unknown;
  };
}

/**
 * Implementation of HttpClient using Axios
 */
export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;

  /**
   * Creates a new AxiosHttpClient
   * @param baseURL Base URL for API requests
   * @param interceptors Optional request and response interceptors
   */
  constructor(baseURL: string, interceptors?: AxiosInterceptors) {
    this.axiosInstance = axios.create({ baseURL });

    if (interceptors) {
      this.setupInterceptors(interceptors);
    }
  }

  /**
   * Performs an HTTP GET request
   * @param url The endpoint URL
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Performs an HTTP POST request
   * @param url The endpoint URL
   * @param data The data to send in the request body
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  async post<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Performs an HTTP PUT request
   * @param url The endpoint URL
   * @param data The data to send in the request body
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  async put<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Performs an HTTP DELETE request
   * @param url The endpoint URL
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Performs an HTTP PATCH request
   * @param url The endpoint URL
   * @param data The data to send in the request body
   * @param config Optional request configuration
   * @returns A promise resolving to the response data
   */
  async patch<T>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(
        url,
        data,
        this.mapConfig(config)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Maps generic HttpRequestConfig to Axios-specific config
   * @param config Generic HTTP request config
   * @returns Axios-specific request config
   */
  private mapConfig(config?: HttpRequestConfig): AxiosRequestConfig {
    if (!config) return {};

    // Map generic config to Axios config
    // This can be extended to handle special cases or transformations
    return config as AxiosRequestConfig;
  }

  /**
   * Handles and transforms errors from Axios
   * @param error Error from Axios
   * @returns A domain-specific error
   */
  private handleError(error: unknown): Error {
    // Network errors
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return new NetworkError(error.message || "Network connection error");
      }

      // Return the error with status code, message and data
      return new HttpError(
        error.response.status || 500,
        error.response.data?.message || error.message || "An error occurred",
        error.response.data
      );
    }

    // Unexpected errors (non-Axios)
    if (error instanceof Error) {
      return error;
    }

    // Unknown errors
    return new Error("Unknown error occurred");
  }

  /**
   * Sets up request and response interceptors
   * @param interceptors Interceptor functions
   */
  private setupInterceptors(interceptors: AxiosInterceptors): void {
    // Request interceptors
    if (interceptors.request) {
      this.axiosInstance.interceptors.request.use(
        interceptors.request.onFulfilled,
        interceptors.request.onRejected
      );
    }

    // Response interceptors
    if (interceptors.response) {
      this.axiosInstance.interceptors.response.use(
        interceptors.response.onFulfilled,
        interceptors.response.onRejected
      );
    }
  }
}
