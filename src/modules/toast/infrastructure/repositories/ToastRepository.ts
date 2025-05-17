import { IToast } from "@/modules/toast/domain/interfaces/IToast";

/**
 * Repository for managing toast state
 */
export class ToastRepository {
  private toasts: Map<string, IToast> = new Map();

  /**
   * Adds a toast to the repository
   * @param toast The toast to add
   */
  add(toast: IToast): void {
    this.toasts.set(toast.id, toast);
  }

  /**
   * Updates an existing toast
   * @param id ID of the toast to update
   * @param updates The properties to update
   * @returns Whether the update was successful
   */
  update(id: string, updates: Partial<Omit<IToast, "id">>): boolean {
    if (!this.toasts.has(id)) {
      return false;
    }

    const currentToast = this.toasts.get(id)!;
    const updatedToast = {
      ...currentToast,
      ...updates,
    };
    this.toasts.set(id, updatedToast as IToast);
    return true;
  }

  /**
   * Removes a toast from the repository
   * @param id ID of the toast to remove
   * @returns Whether the removal was successful
   */
  remove(id: string): boolean {
    return this.toasts.delete(id);
  }

  /**
   * Removes all toasts from the repository
   */
  removeAll(): void {
    this.toasts.clear();
  }

  /**
   * Gets a toast by ID
   * @param id ID of the toast to retrieve
   * @returns The toast if found, undefined otherwise
   */
  getById(id: string): IToast | undefined {
    return this.toasts.get(id);
  }

  /**
   * Gets all toasts in the repository
   * @returns Array of all toasts
   */
  getAll(): IToast[] {
    return Array.from(this.toasts.values());
  }
}
