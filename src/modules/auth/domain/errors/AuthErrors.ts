export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = "Invalid credentials", cause?: Error) {
    super(message, "AUTH_INVALID_CREDENTIALS", cause);
  }
}

export class UserNotFoundError extends AuthError {
  constructor(message = "User not found", cause?: Error) {
    super(message, "AUTH_USER_NOT_FOUND", cause);
  }
}

export class RegistrationError extends AuthError {
  constructor(message = "Registration failed", cause?: Error) {
    super(message, "AUTH_REGISTRATION_FAILED", cause);
  }
}

export class AuthorizationError extends AuthError {
  constructor(message = "Not authorized", cause?: Error) {
    super(message, "AUTH_NOT_AUTHORIZED", cause);
  }
}
