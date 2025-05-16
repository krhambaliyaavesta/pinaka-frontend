import { IToast } from "./IToast";

/**
 * Interface defining the contract for toast service operations
 */
export interface IToastService {
  /**
   * Shows a toast notification
   * @param toast The toast configuration
   * @returns The ID of the created toast
   */
  show(toast: Omit<IToast, "id">): string;

  /**
   * Shorthand method to show a success toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  success(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string;

  /**
   * Shorthand method to show an error toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  error(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string;

  /**
   * Shorthand method to show a warning toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  warning(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string;

  /**
   * Shorthand method to show an info toast
   * @param message The message to display
   * @param options Additional toast options
   * @returns The ID of the created toast
   */
  info(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): string;

  /**
   * Updates an existing toast notification
   * @param id The ID of the toast to update
   * @param updates The properties to update
   * @returns true if the toast was found and updated, false otherwise
   */
  update(id: string, updates: Partial<Omit<IToast, "id">>): boolean;

  /**
   * Dismisses a specific toast
   * @param id The ID of the toast to dismiss
   * @returns true if the toast was found and dismissed, false otherwise
   */
  dismiss(id: string): boolean;

  /**
   * Dismisses all currently displayed toasts
   */
  dismissAll(): void;
}
