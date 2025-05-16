import { ToastType } from "../enums/ToastType";
import { IToast, ToastPosition } from "../interfaces/IToast";

/**
 * Implementation of the Toast entity
 * Represents a toast notification in the system
 */
export class Toast implements IToast {
  /**
   * Unique identifier for the toast
   */
  public readonly id: string;

  /**
   * The message content of the toast
   */
  public readonly message: string;

  /**
   * Type of toast that determines appearance and icon
   */
  public readonly type: ToastType;

  /**
   * Duration in milliseconds the toast should be displayed
   */
  public readonly duration: number;

  /**
   * Position where the toast should appear
   */
  public readonly position: ToastPosition;

  /**
   * Whether the toast can be dismissed by clicking
   */
  public readonly dismissible: boolean;

  /**
   * Timestamp when the toast was created
   */
  public readonly createdAt: Date;

  /**
   * Optional custom styling for the toast
   */
  public readonly className?: string;

  /**
   * Create a new Toast instance
   */
  constructor(
    id: string,
    message: string,
    type: ToastType,
    duration: number = 5000,
    position: ToastPosition = "top-right",
    dismissible: boolean = true,
    className?: string
  ) {
    this.id = id;
    this.message = message;
    this.type = type;
    this.duration = duration;
    this.position = position;
    this.dismissible = dismissible;
    this.createdAt = new Date();
    this.className = className;
  }

  /**
   * Create a success toast
   */
  static createSuccess(
    id: string,
    message: string,
    duration?: number,
    position?: ToastPosition,
    dismissible?: boolean,
    className?: string
  ): Toast {
    return new Toast(
      id,
      message,
      ToastType.SUCCESS,
      duration,
      position,
      dismissible,
      className
    );
  }

  /**
   * Create an error toast
   */
  static createError(
    id: string,
    message: string,
    duration?: number,
    position?: ToastPosition,
    dismissible?: boolean,
    className?: string
  ): Toast {
    return new Toast(
      id,
      message,
      ToastType.ERROR,
      duration,
      position,
      dismissible,
      className
    );
  }

  /**
   * Create a warning toast
   */
  static createWarning(
    id: string,
    message: string,
    duration?: number,
    position?: ToastPosition,
    dismissible?: boolean,
    className?: string
  ): Toast {
    return new Toast(
      id,
      message,
      ToastType.WARNING,
      duration,
      position,
      dismissible,
      className
    );
  }

  /**
   * Create an info toast
   */
  static createInfo(
    id: string,
    message: string,
    duration?: number,
    position?: ToastPosition,
    dismissible?: boolean,
    className?: string
  ): Toast {
    return new Toast(
      id,
      message,
      ToastType.INFO,
      duration,
      position,
      dismissible,
      className
    );
  }
}
