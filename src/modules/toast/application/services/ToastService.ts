import { Toast } from "../../domain/entities/Toast";
import { ToastType } from "../../domain/enums/ToastType";
import { IToast } from "../../domain/interfaces/IToast";
import { IToastService } from "../../domain/interfaces/IToastService";
import { IToastPresenter } from "../ports/IToastPresenter";

/**
 * Implementation of the toast service that handles toast operations
 */
export class ToastService implements IToastService {
  private toasts: Map<string, IToast> = new Map();

  /**
   * Creates a new ToastService
   * @param presenter The presenter used to display toasts
   */
  constructor(private presenter: IToastPresenter) {}

  /**
   * Shows a toast notification
   * @param toastData The toast configuration
   * @returns The ID of the created toast
   */
  show(toastData: Omit<IToast, "id">): string {
    const toast = new Toast(toastData);
    this.toasts.set(toast.id, toast);
    this.presenter.present(toast);
    return toast.id;
  }

  /**
   * Shows a success toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  success(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string {
    return this.show({
      message,
      type: ToastType.SUCCESS,
      ...options,
    });
  }

  /**
   * Shows an error toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  error(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string {
    return this.show({
      message,
      type: ToastType.ERROR,
      ...options,
    });
  }

  /**
   * Shows a warning toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  warning(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string {
    return this.show({
      message,
      type: ToastType.WARNING,
      ...options,
    });
  }

  /**
   * Shows an info toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  info(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string {
    return this.show({
      message,
      type: ToastType.INFO,
      ...options,
    });
  }

  /**
   * Updates an existing toast notification
   * @param id The ID of the toast to update
   * @param updates The properties to update
   * @returns true if the toast was found and updated, false otherwise
   */
  update(id: string, updates: Partial<Omit<IToast, "id">>): boolean {
    // Check if toast exists
    if (!this.toasts.has(id)) {
      return false;
    }

    // Update in presenter
    const updated = this.presenter.update(id, updates);
    if (!updated) {
      return false;
    }

    // Update local state if presenter update was successful
    const currentToast = this.toasts.get(id)!;
    const updatedToast = {
      ...currentToast,
      ...updates,
    };
    this.toasts.set(id, updatedToast);

    return true;
  }

  /**
   * Dismisses a specific toast
   * @param id The ID of the toast to dismiss
   * @returns true if the toast was found and dismissed, false otherwise
   */
  dismiss(id: string): boolean {
    // Check if toast exists
    if (!this.toasts.has(id)) {
      return false;
    }

    // Remove from presenter
    const removed = this.presenter.remove(id);
    if (removed) {
      // Remove from local state
      this.toasts.delete(id);
    }

    return removed;
  }

  /**
   * Dismisses all currently displayed toasts
   */
  dismissAll(): void {
    this.presenter.removeAll();
    this.toasts.clear();
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
