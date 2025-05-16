import { ToastType } from "../../domain/enums/ToastType";
import { ToastPosition } from "../../domain/interfaces/IToast";

/**
 * Data Transfer Object for creating a toast notification
 * Contains all the data needed to create a new toast
 */
export interface CreateToastDto {
  /**
   * The message content of the toast
   */
  message: string;

  /**
   * Type of toast (success, error, warning, info)
   */
  type: ToastType;

  /**
   * Duration in milliseconds the toast should be displayed
   * If not provided, a default will be used
   */
  duration?: number;

  /**
   * Position where the toast should appear
   * If not provided, a default will be used
   */
  position?: ToastPosition;

  /**
   * Whether the toast can be dismissed by clicking
   * If not provided, a default will be used
   */
  dismissible?: boolean;

  /**
   * Optional custom styling for the toast
   */
  className?: string;
}
