"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IToast } from "@/modules/toast/domain/interfaces/IToast";
import { IToastService } from "@/modules/toast/domain/interfaces/IToastService";
import { ToastService } from "@/modules/toast/application/services/ToastService";
import { ToastPresenter } from "@/modules/toast/infrastructure/presenters/ToastPresenter";
import { ToastRepository } from "@/modules/toast/infrastructure/repositories/ToastRepository";

/**
 * Context for the toast service
 */
const ToastContext = createContext<IToastService | null>(null);

/**
 * Toast provider props
 */
interface ToastProviderProps {
  /**
   * Children components
   */
  children: ReactNode;
}

/**
 * Provider component for toast functionality
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // Initialize state for toasts to track updates
  const [, setToasts] = useState<IToast[]>([]);

  // Create toast service instance
  const [toastService] = useState<IToastService>(() => {
    const presenter = new ToastPresenter();
    // Create repository but it's not directly used in the provider
    new ToastRepository();
    return new ToastService(presenter);
  });

  // Get the presenter from the service
  // Using a type assertion since the presenter is private in the service
  // We need to cast to unknown first since TypeScript doesn't know about this internal property
  const presenter = (toastService as unknown as { presenter: ToastPresenter })
    .presenter;

  // Set up event handlers
  useEffect(() => {
    // Handler for presenting new toasts
    const unsubscribePresent = presenter.onPresent((toast) => {
      setToasts((prevToasts) => [...prevToasts, toast]);
    });

    // Handler for updating toasts
    const unsubscribeUpdate = presenter.onUpdate((id, updates) => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id ? { ...toast, ...updates } : toast
        )
      );
    });

    // Handler for removing a toast
    const unsubscribeRemove = presenter.onRemove((id) => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    });

    // Handler for removing all toasts
    const unsubscribeRemoveAll = presenter.onRemoveAll(() => {
      setToasts([]);
    });

    // Clean up event handlers
    return () => {
      unsubscribePresent();
      unsubscribeUpdate();
      unsubscribeRemove();
      unsubscribeRemoveAll();
    };
  }, [presenter]);

  return (
    <ToastContext.Provider value={toastService}>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to use the toast service
 * @returns The toast service
 * @throws Error if used outside of a ToastProvider
 */
export const useToastService = (): IToastService => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastService must be used within a ToastProvider");
  }
  return context;
};

/**
 * Simplified interface for toast operations
 */
export interface ToastAPI {
  /**
   * Show a success toast
   * @param message Message to display
   * @param options Additional options
   * @returns ID of the created toast
   */
  success: (
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ) => string;

  /**
   * Show an error toast
   * @param message Message to display
   * @param options Additional options
   * @returns ID of the created toast
   */
  error: (
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ) => string;

  /**
   * Show a warning toast
   * @param message Message to display
   * @param options Additional options
   * @returns ID of the created toast
   */
  warning: (
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ) => string;

  /**
   * Show an info toast
   * @param message Message to display
   * @param options Additional options
   * @returns ID of the created toast
   */
  info: (
    message: string,
    options?: Partial<Omit<IToast, "id" | "message" | "type">>
  ) => string;

  /**
   * Dismiss a specific toast
   * @param id ID of the toast to dismiss
   * @returns Whether the toast was dismissed
   */
  dismiss: (id: string) => boolean;

  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;
}

/**
 * Simplified hook for toast operations
 * @returns Simplified toast API
 */
export const useToast = (): ToastAPI => {
  const service = useToastService();

  return {
    success: (message, options) => service.success(message, options),
    error: (message, options) => service.error(message, options),
    warning: (message, options) => service.warning(message, options),
    info: (message, options) => service.info(message, options),
    dismiss: (id) => service.dismiss(id),
    dismissAll: () => service.dismissAll(),
  };
};
