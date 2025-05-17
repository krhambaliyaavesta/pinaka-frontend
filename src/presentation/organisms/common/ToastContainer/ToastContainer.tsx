"use client";

import React, { useEffect } from "react";
import { Toaster as ShadcnToaster } from "sonner";
import { ToastPosition } from "@/modules/toast/domain/interfaces/IToast";
import { useToastService } from "@/modules/toast";
import { SonnerAdapter } from "@/modules/toast/infrastructure/adapters/SonnerAdapter";
import { ToastPresenter } from "@/modules/toast/infrastructure/presenters/ToastPresenter";

/**
 * Props for the ToastContainer component
 */
interface ToastContainerProps {
  /**
   * Position of the toasts
   * @default "top-right"
   */
  position?: ToastPosition;

  /**
   * Default duration for toasts in milliseconds
   * @default 5000
   */
  defaultDuration?: number;

  /**
   * Maximum number of toasts visible at once (note: not directly supported by sonner)
   * @default 3
   */
  maxVisible?: number;

  /**
   * Whether to expand toasts on hover (note: not directly supported by sonner)
   * @default true
   */
  expandOnHover?: boolean;
}

/**
 * Container component for displaying toast notifications
 * Wraps the sonner Toaster component with our configuration
 */
export const Toaster: React.FC<ToastContainerProps> = ({
  position = "top-right",
  defaultDuration = 5000,
  // maxVisible and expandOnHover are kept in the interface for API consistency
  // but not used as sonner doesn't support these directly
}) => {
  // Get the toast service to connect to the adapter
  const toastService = useToastService();

  // Connect the adapter to the presenter
  useEffect(() => {
    console.log("Initializing SonnerAdapter");

    // Access the presenter through the service
    const presenter = (toastService as unknown as { presenter: ToastPresenter })
      .presenter;

    // Create and initialize the adapter
    // This will subscribe to the presenter events and show toasts using sonner
    new SonnerAdapter(presenter, defaultDuration);
  }, [toastService, defaultDuration]);

  // Map our position format to sonner's format
  const convertPosition = (): {
    position:
      | "top-right"
      | "top-left"
      | "top-center"
      | "bottom-right"
      | "bottom-left"
      | "bottom-center";
  } => {
    switch (position) {
      case "top-right":
        return { position: "top-right" };
      case "top-left":
        return { position: "top-left" };
      case "top-center":
        return { position: "top-center" };
      case "bottom-right":
        return { position: "bottom-right" };
      case "bottom-left":
        return { position: "bottom-left" };
      case "bottom-center":
        return { position: "bottom-center" };
      default:
        return { position: "top-right" };
    }
  };

  return (
    <ShadcnToaster
      {...convertPosition()}
      richColors
      closeButton
      duration={defaultDuration}
      className="group"
      theme="light"
      toastOptions={{
        className:
          "group-[.reduce-motion]:transform-none group-[.reduce-motion]:transition-opacity",
      }}
    />
  );
};
