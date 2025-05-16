import { v4 as uuidv4 } from "uuid";
import { Toast } from "../../domain/entities/Toast";
import { ToastType } from "../../domain/enums/ToastType";
import { IToast, ToastOptions } from "../../domain/interfaces/IToast";
import { IToastService } from "../../domain/interfaces/IToastService";
import { IToastPresenter } from "../ports/IToastPresenter";

/**
 * Implementation of the toast service
 * Manages toast notifications and delegates presentation to the presenter
 */
export class ToastService implements IToastService {
  private toasts: Map<string, IToast> = new Map();

  /**
   * Creates a new ToastService instance
   * @param presenter The presenter to use for displaying toasts
   */
  constructor(private readonly presenter: IToastPresenter) {}

  /**
   * Show a toast notification with specified message, type, and options
   * @param message The message content
   * @param type The toast type (success, error, warning, info)
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  show(message: string, type: ToastType, options?: ToastOptions): string {
    // Generate a unique ID for the toast
    const id = uuidv4();

    // Create the toast entity
    const toast = new Toast(
      id,
      message,
      type,
      options?.duration,
      options?.position,
      options?.dismissible !== undefined ? options.dismissible : true,
      options?.className
    );

    // Store the toast
    this.toasts.set(id, toast);

    // Present the toast to the user
    this.presenter.present(toast);

    return id;
  }

  /**
   * Show a success toast
   * @param message The success message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showSuccess(message: string, options?: ToastOptions): string {
    return this.show(message, ToastType.SUCCESS, options);
  }

  /**
   * Show an error toast
   * @param message The error message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showError(message: string, options?: ToastOptions): string {
    return this.show(message, ToastType.ERROR, options);
  }

  /**
   * Show a warning toast
   * @param message The warning message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showWarning(message: string, options?: ToastOptions): string {
    return this.show(message, ToastType.WARNING, options);
  }

  /**
   * Show an info toast
   * @param message The info message
   * @param options Additional configuration options
   * @returns The ID of the created toast
   */
  showInfo(message: string, options?: ToastOptions): string {
    return this.show(message, ToastType.INFO, options);
  }

  /**
   * Dismiss a specific toast by ID
   * @param id The ID of the toast to dismiss
   * @returns Whether the toast was successfully dismissed
   */
  dismiss(id: string): boolean {
    // Check if the toast exists
    if (!this.toasts.has(id)) {
      return false;
    }

    // Remove the toast from storage
    this.toasts.delete(id);

    // Remove the toast from presentation
    this.presenter.remove(id);

    return true;
  }

  /**
   * Dismiss all currently active toasts
   */
  dismissAll(): void {
    // Clear all toasts from storage
    this.toasts.clear();

    // Remove all toasts from presentation
    this.presenter.removeAll();
  }

  /**
   * Get all active toasts
   * @returns Array of active toast notifications
   */
  getAll(): IToast[] {
    return Array.from(this.toasts.values());
  }

  /**
   * Get a specific toast by ID
   * @param id The ID of the toast to retrieve
   * @returns The toast if found, or undefined
   */
  getById(id: string): IToast | undefined {
    const toast = this.toasts.get(id);

    if (!toast) {
      return undefined;
    }

    return toast;
  }
}
