"use client";

import React from "react";
import { ToastType } from "@/modules/toast";
import { Toast } from "@/presentation/atoms/common/Toast/Toast";

/**
 * Props for the ToastWithAction component
 */
interface ToastWithActionProps {
  /**
   * The type of toast that determines its appearance
   */
  type: ToastType;

  /**
   * The main message to display in the toast
   */
  message: string;

  /**
   * Optional title for the toast
   */
  title?: string;

  /**
   * Whether the toast can be dismissed by the user
   * @default true
   */
  dismissible?: boolean;

  /**
   * Handler for when the dismiss button is clicked
   */
  onDismiss?: () => void;

  /**
   * Primary action configuration
   */
  primaryAction: {
    /**
     * Label for the primary action button
     */
    label: string;

    /**
     * Callback function when the primary action button is clicked
     */
    onClick: () => void;
  };

  /**
   * Optional secondary action configuration
   */
  secondaryAction?: {
    /**
     * Label for the secondary action button
     */
    label: string;

    /**
     * Callback function when the secondary action button is clicked
     */
    onClick: () => void;
  };

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Enhanced toast component with action buttons
 * This is a molecule that builds upon the Toast atom
 */
export const ToastWithAction: React.FC<ToastWithActionProps> = ({
  type,
  message,
  title,
  dismissible = true,
  onDismiss,
  primaryAction,
  secondaryAction,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <Toast
        type={type}
        message={message}
        title={title}
        dismissible={dismissible}
        onDismiss={onDismiss}
        className="mb-2"
      />

      <div className="flex justify-end gap-2 mt-2">
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-3 py-1 text-xs font-medium rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label={secondaryAction.label}
          >
            {secondaryAction.label}
          </button>
        )}

        <button
          onClick={primaryAction.onClick}
          className={`px-3 py-1 text-xs font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${getActionButtonColor(
            type
          )}`}
          aria-label={primaryAction.label}
        >
          {primaryAction.label}
        </button>
      </div>
    </div>
  );
};

/**
 * Get the appropriate background color for action buttons based on toast type
 */
function getActionButtonColor(type: ToastType): string {
  switch (type) {
    case ToastType.SUCCESS:
      return "bg-green-600 hover:bg-green-700 focus:ring-green-500";
    case ToastType.ERROR:
      return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
    case ToastType.WARNING:
      return "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";
    case ToastType.INFO:
      return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
    default:
      return "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500";
  }
}
