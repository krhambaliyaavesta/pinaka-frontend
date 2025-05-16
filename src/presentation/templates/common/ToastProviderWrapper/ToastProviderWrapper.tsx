"use client";

import React, { useEffect } from "react";
import { Toaster as SonnerToaster } from "sonner";
import { ToastProvider, useToastService } from "@/modules/toast";
import { SonnerAdapter } from "@/modules/toast/infrastructure/adapters/SonnerAdapter";
import { ToastPresenter } from "@/modules/toast/infrastructure/presenters/ToastPresenter";

/**
 * Component that connects the toast infrastructure with the UI
 * Follows the Adapter pattern to connect the toast service with sonner
 */
function ToastAdapter() {
  const toastService = useToastService();

  useEffect(() => {
    // This is a temporary solution that will be improved in a future PR
    // using proper dependency inversion according to Clean Architecture
    const presenter = (toastService as unknown as { presenter: ToastPresenter })
      .presenter;

    // Create and initialize the adapter
    // The adapter self-registers with the presenter events
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const adapter = new SonnerAdapter(presenter, 5000);

    // No cleanup needed for now as SonnerAdapter doesn't expose a cleanup method
    // This will be addressed in the architecture improvements
  }, [toastService]);

  return null;
}

interface ToastProviderWrapperProps {
  children: React.ReactNode;
  /**
   * Position for the toast notifications
   * @default "top-right"
   */
  position?:
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";
  /**
   * Default duration for toasts in milliseconds
   * @default 5000
   */
  defaultDuration?: number;
}

/**
 * Template component that wraps the application with toast functionality
 * Follows Single Responsibility by separating provider from UI components
 */
export function ToastProviderWrapper({
  children,
  position = "top-right",
  defaultDuration = 5000,
}: ToastProviderWrapperProps) {
  return (
    <ToastProvider>
      {children}
      <ToastAdapter />
      <SonnerToaster
        position={position}
        richColors
        closeButton
        duration={defaultDuration}
      />
    </ToastProvider>
  );
}
