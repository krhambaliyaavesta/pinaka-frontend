/**
 * Base HTTP error class for handling HTTP-related errors
 */
export class HttpError extends Error {
  /**
   * Creates a new HttpError instance
   * @param statusCode HTTP status code
   * @param message Error message
   * @param data Additional error data returned from the server
   */
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = "HttpError";
    // This is needed to make instanceof work correctly in TypeScript
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * Error thrown when there's a network connectivity issue
 */
export class NetworkError extends HttpError {
  constructor(message: string = "Network connection error") {
    super(0, message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Error thrown for authentication failures (401 status code)
 */
export class AuthenticationError extends HttpError {
  constructor(message: string = "Authentication failed", data?: unknown) {
    super(401, message, data);
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Error thrown for authorization failures (403 status code)
 */
export class AuthorizationError extends HttpError {
  constructor(
    message: string = "Not authorized to access this resource",
    data?: unknown
  ) {
    super(403, message, data);
    this.name = "AuthorizationError";
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Error thrown for resource not found (404 status code)
 */
export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found", data?: unknown) {
    super(404, message, data);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Error thrown for bad requests (400 status code)
 */
export class BadRequestError extends HttpError {
  constructor(message: string = "Bad request", data?: unknown) {
    super(400, message, data);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Error thrown for server errors (500 status code)
 */
export class ServerError extends HttpError {
  constructor(message: string = "Internal server error", data?: unknown) {
    super(500, message, data);
    this.name = "ServerError";
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
