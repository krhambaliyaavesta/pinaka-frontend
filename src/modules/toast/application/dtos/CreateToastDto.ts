import { ToastType } from "@/modules/toast/domain/enums/ToastType";

/**
 * Data Transfer Object for creating toast notifications
 */
export interface CreateToastDto {
  /**
   * Message content of the toast
   */
  message: string;

  /**
   * Type of toast (success, error, warning, info)
   */
  type: ToastType;

  /**
   * Optional duration in milliseconds
   */
  duration?: number;

  /**
   * Optional title for the toast
   */
  title?: string;

  /**
   * Whether the toast can be dismissed manually
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
