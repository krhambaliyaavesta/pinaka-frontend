import { ToastType } from "@/modules/toast/domain/enums/ToastType";

/**
 * Position options for toast notifications
 */
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

/**
 * Interface defining the structure of a toast notification
 */
export interface IToast {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Message to display in the toast
   */
  message: string;

  /**
   * Type of toast (success, error, warning, info)
   */
  type: ToastType;

  /**
   * Duration in milliseconds for which the toast should be visible
   * If undefined, the toast will use the default duration
   */
  duration?: number;

  /**
   * Optional title for the toast
   */
  title?: string;

  /**
   * Whether the toast is dismissible manually
   * Defaults to true
   */
  dismissible?: boolean;

  /**
   * Optional action button configuration
   */
  action?: {
    /**
     * Label for the action button
     */
    label: string;

    /**
     * Callback function when the action button is clicked
     */
    onClick: () => void;
  };
}

/**
 * Options for creating a toast notification
 * Partial of IToast with only the configurable properties
 */
export interface ToastOptions {
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  className?: string;
}
