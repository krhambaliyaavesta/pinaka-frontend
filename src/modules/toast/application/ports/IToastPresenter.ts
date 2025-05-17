import { IToast } from "@/modules/toast/domain/interfaces/IToast";

/**
 * Interface defining the contract for toast presentation (output port)
 */
export interface IToastPresenter {
  /**
   * Presents a new toast notification
   * @param toast The toast to present
   */
  present(toast: IToast): void;

  /**
   * Updates the presentation of an existing toast
   * @param id ID of the toast to update
   * @param updates Partial updates to apply
   * @returns Whether the update was successful
   */
  update(id: string, updates: Partial<Omit<IToast, "id">>): boolean;

  /**
   * Removes a toast from the presentation
   * @param id ID of the toast to remove
   * @returns Whether the removal was successful
   */
  remove(id: string): boolean;

  /**
   * Removes all toasts from the presentation
   */
  removeAll(): void;
}
