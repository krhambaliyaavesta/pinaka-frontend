import { ToastType } from "../../domain/enums/ToastType";

/**
 * Data Transfer Object for updating existing toast notifications
 */
export interface UpdateToastDto {
  /**
   * Updated message content (optional)
   */
  message?: string;

  /**
   * Updated toast type (optional)
   */
  type?: ToastType;

  /**
   * Updated duration in milliseconds (optional)
   */
  duration?: number;

  /**
   * Updated title (optional)
   */
  title?: string;

  /**
   * Updated dismissible flag (optional)
   */
  dismissible?: boolean;

  /**
   * Updated action configuration (optional)
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
  } | null; // Allow null to remove an action
}
