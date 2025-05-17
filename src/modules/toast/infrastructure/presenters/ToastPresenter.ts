import { IToast } from "@/modules/toast/domain/interfaces/IToast";
import { IToastPresenter } from "@/modules/toast/application/ports/IToastPresenter";

/**
 * Type for a toast event handler function
 */
type ToastEventHandler = (toast: IToast) => void;

/**
 * Type for a toast update event handler function
 */
type ToastUpdateHandler = (
  id: string,
  updates: Partial<Omit<IToast, "id">>
) => void;

/**
 * Type for a toast removal event handler function
 */
type ToastRemovalHandler = (id: string) => void;

/**
 * Type for a handler that removes all toasts
 */
type ToastRemoveAllHandler = () => void;

/**
 * Implementation of the toast presenter for React
 */
export class ToastPresenter implements IToastPresenter {
  private onPresentHandlers: Set<ToastEventHandler> = new Set();
  private onUpdateHandlers: Set<ToastUpdateHandler> = new Set();
  private onRemoveHandlers: Set<ToastRemovalHandler> = new Set();
  private onRemoveAllHandlers: Set<ToastRemoveAllHandler> = new Set();

  /**
   * Presents a new toast notification
   * @param toast The toast to present
   */
  present(toast: IToast): void {
    this.onPresentHandlers.forEach((handler) => handler(toast));
  }

  /**
   * Updates the presentation of an existing toast
   * @param id ID of the toast to update
   * @param updates Partial updates to apply
   * @returns Whether the update was handled by at least one handler
   */
  update(id: string, updates: Partial<Omit<IToast, "id">>): boolean {
    if (this.onUpdateHandlers.size === 0) {
      return false;
    }

    this.onUpdateHandlers.forEach((handler) => handler(id, updates));
    return true;
  }

  /**
   * Removes a toast from the presentation
   * @param id ID of the toast to remove
   * @returns Whether the removal was handled by at least one handler
   */
  remove(id: string): boolean {
    if (this.onRemoveHandlers.size === 0) {
      return false;
    }

    this.onRemoveHandlers.forEach((handler) => handler(id));
    return true;
  }

  /**
   * Removes all toasts from the presentation
   */
  removeAll(): void {
    this.onRemoveAllHandlers.forEach((handler) => handler());
  }

  /**
   * Registers a handler for toast presentation events
   * @param handler The handler function to register
   * @returns A function to unregister the handler
   */
  onPresent(handler: ToastEventHandler): () => void {
    this.onPresentHandlers.add(handler);
    return () => {
      this.onPresentHandlers.delete(handler);
    };
  }

  /**
   * Registers a handler for toast update events
   * @param handler The handler function to register
   * @returns A function to unregister the handler
   */
  onUpdate(handler: ToastUpdateHandler): () => void {
    this.onUpdateHandlers.add(handler);
    return () => {
      this.onUpdateHandlers.delete(handler);
    };
  }

  /**
   * Registers a handler for toast removal events
   * @param handler The handler function to register
   * @returns A function to unregister the handler
   */
  onRemove(handler: ToastRemovalHandler): () => void {
    this.onRemoveHandlers.add(handler);
    return () => {
      this.onRemoveHandlers.delete(handler);
    };
  }

  /**
   * Registers a handler for removing all toasts
   * @param handler The handler function to register
   * @returns A function to unregister the handler
   */
  onRemoveAll(handler: ToastRemoveAllHandler): () => void {
    this.onRemoveAllHandlers.add(handler);
    return () => {
      this.onRemoveAllHandlers.delete(handler);
    };
  }
}
