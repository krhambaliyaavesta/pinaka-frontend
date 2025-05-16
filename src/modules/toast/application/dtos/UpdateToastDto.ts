import { ToastType } from "../../domain/enums/ToastType";
import { ToastPosition } from "../../domain/interfaces/IToast";

/**
 * Data Transfer Object for updating a toast notification
 * Contains the data that can be updated for an existing toast
 */
export interface UpdateToastDto {
  /**
   * The ID of the toast to update
   */
  id: string;

  /**
   * The updated message content of the toast
   */
  message?: string;

  /**
   * Updated toast type
   */
  type?: ToastType;

  /**
   * Updated duration in milliseconds
   */
  duration?: number;

  /**
   * Updated position
   */
  position?: ToastPosition;

  /**
   * Updated dismissible state
   */
  dismissible?: boolean;

  /**
   * Updated custom styling
   */
  className?: string;
}
