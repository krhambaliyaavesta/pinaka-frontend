import axios from "axios";
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  HttpError,
  NetworkError,
  NotFoundError,
  ServerError,
} from "@/core/infrastructure/http/errors/HttpError";

// Define a type for API error responses
interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

/**
 * Interceptor to handle and transform HTTP errors
 */
export class ErrorInterceptor {
  /**
   * Response error interceptor function
   * @param error Axios error object
   * @returns A rejected promise with a domain-specific error
   */
  onError = (error: unknown): unknown => {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      // Handle network errors (no response from server)
      if (!error.response) {
        return Promise.reject(
          new NetworkError(error.message || "Network connection error")
        );
      }

      // Handle different error status codes
      const { status, data } = error.response;
      // Cast data to our ApiErrorResponse type
      const errorData = data as ApiErrorResponse;
      const message =
        errorData?.message || error.message || "An error occurred";

      // Create appropriate error type based on status code
      let customError: HttpError;

      switch (status) {
        case 400:
          customError = new BadRequestError(message, errorData);
          break;
        case 401:
          customError = new AuthenticationError(message, errorData);
          break;
        case 403:
          customError = new AuthorizationError(message, errorData);
          break;
        case 404:
          customError = new NotFoundError(message, errorData);
          break;
        case 500:
          customError = new ServerError(message, errorData);
          break;
        default:
          customError = new HttpError(status, message, errorData);
      }

      // Log the error for debugging (can be replaced with a proper logging service)
      console.error("API Error:", customError);

      return Promise.reject(customError);
    }

    // For non-Axios errors, just pass through
    return Promise.reject(error);
  };
}
