"use client";

import React, { useEffect } from "react";
import {
  ToastProvider,
  useToastService,
} from "@/modules/toast/infrastructure/providers/ToastProvider";
import { Toaster as SonnerToaster } from "sonner";
import { SonnerAdapter } from "@/modules/toast/infrastructure/adapters/SonnerAdapter";
import { ToastPresenter } from "@/modules/toast/infrastructure/presenters/ToastPresenter";

// The inner component that connects to the toast service
function ToastAdapter() {
  const toastService = useToastService();

  useEffect(() => {
    console.log("Initializing SonnerAdapter in ToastProviderWrapper");

    // Access the presenter through the service
    const presenter = (toastService as unknown as { presenter: ToastPresenter })
      .presenter;

    // Create and initialize the adapter
    new SonnerAdapter(presenter, 5000);

    return () => {
      console.log("Cleaning up SonnerAdapter");
    };
  }, [toastService]);

  return null;
}

interface ToastProviderWrapperProps {
  children: React.ReactNode;
}

export function ToastProviderWrapper({ children }: ToastProviderWrapperProps) {
  return (
    <ToastProvider>
      {children}
      <ToastAdapter />
      {/* Include the sonner toaster for both systems */}
      <SonnerToaster position="top-right" richColors closeButton />
    </ToastProvider>
  );
}
