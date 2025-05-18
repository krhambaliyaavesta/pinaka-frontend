"use client";

import { ReactNode, useEffect, useRef } from "react";

export interface DropdownMenuProps {
  /**
   * The dropdown menu content
   */
  children: ReactNode;

  /**
   * Whether the dropdown is open
   */
  isOpen: boolean;

  /**
   * Function to close the dropdown
   */
  onClose: () => void;

  /**
   * Position of the dropdown
   * @default 'bottom-right'
   */
  position?: "bottom-right" | "bottom-left" | "bottom-center";

  /**
   * Width of the dropdown
   * @default 'auto'
   */
  width?: "auto" | "sm" | "md" | "lg" | "full";

  /**
   * Optional CSS class name for the container
   */
  className?: string;
}

/**
 * DropdownMenu component for displaying dropdown content
 */
export function DropdownMenu({
  children,
  isOpen,
  onClose,
  position = "bottom-right",
  width = "auto",
  className = "",
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Position classes for the dropdown
  const positionClasses = {
    "bottom-right": "origin-top-right right-0",
    "bottom-left": "origin-top-left left-0",
    "bottom-center": "origin-top left-1/2 transform -translate-x-1/2",
  };

  // Width classes for the dropdown
  const widthClasses = {
    auto: "min-w-[220px]",
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
    full: "w-full",
  };

  // Handle click outside to close the dropdown
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key to close the dropdown
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`
        absolute top-full mt-1 z-50
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
        transition-all duration-200 ease-in-out
      `}
    >
      <div
        ref={menuRef}
        className={`
          ${positionClasses[position]}
          ${widthClasses[width]}
          bg-white rounded-lg shadow-xl
          py-2 border border-gray-100
          overflow-hidden
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}
