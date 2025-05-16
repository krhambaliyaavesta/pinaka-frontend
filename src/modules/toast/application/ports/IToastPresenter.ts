import { IToast } from "../../domain/interfaces/IToast";

/**
 * Interface for toast presentation
 * This is an output port that defines how toasts should be presented to the user
 */
export interface IToastPresenter {
  /**
   * Present a new toast notification to the user
   * @param toast The toast to present
   */
  present(toast: IToast): void;

  /**
   * Remove a toast from the presentation
   * @param id The ID of the toast to remove
   */
  remove(id: string): void;

  /**
   * Remove all toasts from the presentation
   */
  removeAll(): void;
}
