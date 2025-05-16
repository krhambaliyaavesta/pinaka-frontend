"use client";

import React from "react";
import { ToastType } from "../../../../modules/toast";

/**
 * Props for the Toast component
 */
interface ToastProps {
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
   * Optional action configuration
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Toast component for displaying notifications
 * This is an atomic component that serves as the basis for all toast notifications
 */
export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  title,
  dismissible = true,
  onDismiss,
  action,
  className = "",
}) => {
  // Determine the background color based on the toast type
  const getBackgroundColor = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-green-500";
      case ToastType.ERROR:
        return "bg-red-500";
      case ToastType.WARNING:
        return "bg-yellow-500";
      case ToastType.INFO:
        return "bg-blue-500";
      default:
        return "bg-gray-700";
    }
  };

  // Determine the icon based on the toast type
  const getIcon = () => {
    switch (type) {
      case ToastType.SUCCESS:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case ToastType.ERROR:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case ToastType.WARNING:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case ToastType.INFO:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-start p-4 rounded-md shadow-md text-white ${getBackgroundColor()} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>

      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>

        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 inline-flex items-center px-3 py-1 border border-white text-xs font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label={action.label}
          >
            {action.label}
          </button>
        )}
      </div>

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
