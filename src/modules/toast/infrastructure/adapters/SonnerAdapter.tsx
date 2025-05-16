"use client";

import { toast } from "sonner";
import { ToastType } from "../../domain/enums/ToastType";
import { IToast } from "../../domain/interfaces/IToast";
import { ToastPresenter } from "../presenters/ToastPresenter";

/**
 * Adapter that connects the ToastPresenter to the sonner toast library
 */
export class SonnerAdapter {
  private presenter: ToastPresenter;
  private defaultDuration: number;

  /**
   * Create a new SonnerAdapter
   * @param presenter The presenter to connect to
   * @param defaultDuration Default toast duration in milliseconds
   */
  constructor(presenter: ToastPresenter, defaultDuration: number = 5000) {
    this.presenter = presenter;
    this.defaultDuration = defaultDuration;
    this.init();
  }

  /**
   * Initialize the adapter by subscribing to presenter events
   */
  private init(): void {
    // Subscribe to present events
    this.presenter.onPresent((toastData) => {
      console.log("SonnerAdapter: Presenting toast", toastData);
      this.showToast(toastData);
    });

    // Subscribe to remove events
    this.presenter.onRemove((id) => {
      console.log("SonnerAdapter: Dismissing toast", id);
      toast.dismiss(id);
    });

    // Subscribe to removeAll events
    this.presenter.onRemoveAll(() => {
      console.log("SonnerAdapter: Dismissing all toasts");
      toast.dismiss();
    });
  }

  /**
   * Show a toast using sonner
   */
  private showToast(toastData: IToast): void {
    // Common toast options
    const options = {
      id: toastData.id,
      description: toastData.title,
      duration: toastData.duration || this.defaultDuration,
      action: toastData.action
        ? {
            label: toastData.action.label,
            onClick: toastData.action.onClick,
          }
        : undefined,
    };

    // Choose the right toast method based on type
    switch (toastData.type) {
      case ToastType.SUCCESS:
        toast.success(toastData.message, options);
        break;
      case ToastType.ERROR:
        toast.error(toastData.message, options);
        break;
      case ToastType.WARNING:
        toast.warning(toastData.message, options);
        break;
      case ToastType.INFO:
        toast.info(toastData.message, options);
        break;
      default:
        toast(toastData.message, options);
    }
  }
}
