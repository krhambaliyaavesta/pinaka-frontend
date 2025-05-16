import { ToastType } from "../enums/ToastType";
import { IToast, ToastOptions } from "./IToast";

/**
 * Interface for toast service
 * Defines methods for creating and managing toast notifications
 */
export interface IToastService {
  /**
   * Show a toast notification with specified message, type, and options
   * @param message The message content
   * @param type The toast type (success, error, warning, info)
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  show(message: string, type: ToastType, options?: ToastOptions): string;

  /**
   * Show a success toast
   * @param message The success message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showSuccess(message: string, options?: ToastOptions): string;

  /**
   * Show an error toast
   * @param message The error message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showError(message: string, options?: ToastOptions): string;

  /**
   * Show a warning toast
   * @param message The warning message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showWarning(message: string, options?: ToastOptions): string;

  /**
   * Show an info toast
   * @param message The info message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showInfo(message: string, options?: ToastOptions): string;

  /**
   * Dismiss a specific toast by ID
   * @param id The ID of the toast to dismiss
   * @returns Whether the toast was successfully dismissed
   */
  dismiss(id: string): boolean;

  /**
   * Dismiss all currently active toasts
   */
  dismissAll(): void;

  /**
   * Get all active toasts
   * @returns Array of active toast notifications
   */
  getAll(): IToast[];

  /**
   * Get a specific toast by ID
   * @param id The ID of the toast to retrieve
   * @returns The toast if found, or undefined
   */
  getById(id: string): IToast | undefined;
}
