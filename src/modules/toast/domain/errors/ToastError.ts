/**
 * Custom error class for toast-related errors
 */
export class ToastError extends Error {
  /**
   * Constructor for ToastError
   * @param message The error message
   */
  constructor(message: string) {
    super(message);
    this.name = "ToastError";
  }

  /**
   * Create a toast not found error
   * @param id The toast ID that was not found
   */
  static notFound(id: string): ToastError {
    return new ToastError(`Toast with ID '${id}' not found`);
  }

  /**
   * Create an invalid toast type error
   * @param type The invalid toast type
   */
  static invalidType(type: string): ToastError {
    return new ToastError(`Invalid toast type: ${type}`);
  }

  /**
   * Create an invalid toast position error
   * @param position The invalid position
   */
  static invalidPosition(position: string): ToastError {
    return new ToastError(`Invalid toast position: ${position}`);
  }
}
