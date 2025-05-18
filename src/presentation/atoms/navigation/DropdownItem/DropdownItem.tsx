"use client";

import { ReactNode } from "react";
import Link from "next/link";

export interface DropdownItemProps {
  /**
   * The text or content to display
   */
  children: ReactNode;

  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;

  /**
   * URL to navigate to when clicked (makes the item a link)
   */
  href?: string;

  /**
   * Whether the item is a divider
   * @default false
   */
  isDivider?: boolean;

  /**
   * Whether the item is a section header
   * @default false
   */
  isSectionHeader?: boolean;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * DropdownItem component for dropdown menus
 */
export function DropdownItem({
  children,
  icon,
  href,
  isDivider = false,
  isSectionHeader = false,
  disabled = false,
  onClick,
  className = "",
}: DropdownItemProps) {
  // If it's a divider, render a simple divider line
  if (isDivider) {
    return <div className="h-px bg-gray-200 my-2" />;
  }

  // If it's a section header, render a styled header
  if (isSectionHeader) {
    return (
      <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2 mb-1">
        {children}
      </div>
    );
  }

  // Base classes for the dropdown item
  const baseClasses = `
    w-full px-4 py-2 text-sm
    flex items-center
    transition-colors duration-200
    ${
      disabled
        ? "text-gray-400 cursor-not-allowed"
        : "text-gray-700 hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
    }
    ${className}
  `;

  // The content to display
  const content = (
    <>
      {icon && <span className="mr-3 w-5 h-5 flex-shrink-0">{icon}</span>}
      <span className="flex-grow">{children}</span>
    </>
  );

  // If it's a link, render a Link component
  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  // Otherwise, render a button
  return (
    <button
      type="button"
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
