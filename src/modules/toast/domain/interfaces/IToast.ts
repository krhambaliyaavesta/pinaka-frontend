import { ToastType } from "../enums/ToastType";

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
 * Interface for toast notifications
 */
export interface IToast {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * The message content of the toast
   */
  message: string;

  /**
   * Type of toast that determines appearance and icon
   */
  type: ToastType;

  /**
   * Duration in milliseconds the toast should be displayed
   * If set to 0, toast will remain until manually dismissed
   */
  duration: number;

  /**
   * Position where the toast should appear
   */
  position: ToastPosition;

  /**
   * Whether the toast can be dismissed by clicking
   */
  dismissible: boolean;

  /**
   * Timestamp when the toast was created
   */
  createdAt: Date;

  /**
   * Optional custom styling for the toast
   */
  className?: string;
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
