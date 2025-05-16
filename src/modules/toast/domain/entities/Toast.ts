import { v4 as uuidv4 } from "uuid";
import { ToastType } from "../enums/ToastType";
import { IToast } from "../interfaces/IToast";

/**
 * Core Toast entity representing a toast notification
 */
export class Toast implements IToast {
  public readonly id: string;
  public readonly message: string;
  public readonly type: ToastType;
  public readonly duration?: number;
  public readonly title?: string;
  public readonly dismissible?: boolean;
  public readonly action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Creates a new Toast entity
   * @param props Properties for the toast except id which will be generated
   */
  constructor(props: Omit<IToast, "id">) {
    this.id = uuidv4();
    this.message = props.message;
    this.type = props.type;
    this.duration = props.duration;
    this.title = props.title;
    this.dismissible = props.dismissible ?? true;
    this.action = props.action;
  }

  /**
   * Creates a success toast
   * @param message The success message
   * @param options Additional options
   * @returns A new Toast entity
   */
  static success(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): Toast {
    return new Toast({
      message,
      type: ToastType.SUCCESS,
      ...options,
    });
  }

  /**
   * Creates an error toast
   * @param message The error message
   * @param options Additional options
   * @returns A new Toast entity
   */
  static error(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): Toast {
    return new Toast({
      message,
      type: ToastType.ERROR,
      ...options,
    });
  }

  /**
   * Creates a warning toast
   * @param message The warning message
   * @param options Additional options
   * @returns A new Toast entity
   */
  static warning(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): Toast {
    return new Toast({
      message,
      type: ToastType.WARNING,
      ...options,
    });
  }

  /**
   * Creates an info toast
   * @param message The info message
   * @param options Additional options
   * @returns A new Toast entity
   */
  static info(
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ): Toast {
    return new Toast({
      message,
      type: ToastType.INFO,
      ...options,
    });
  }
}
