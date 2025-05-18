import { ReactNode } from "react";

/**
 * Enum defining menu sections for organization
 */
export enum MenuSection {
  ADMIN = "admin",
  USER = "user",
  SYSTEM = "system",
}

/**
 * Interface for a menu item in the navigation
 */
export interface MenuItem {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Label to display
   */
  label: string;

  /**
   * URL to navigate to
   */
  href?: string;

  /**
   * Icon to display
   */
  icon?: ReactNode;

  /**
   * Function to execute on click
   */
  onClick?: () => void;

  /**
   * Whether this item is a divider
   */
  isDivider?: boolean;

  /**
   * Section this menu item belongs to
   */
  section?: MenuSection;

  /**
   * Whether this item requires admin role
   */
  adminOnly?: boolean;

  /**
   * Whether this item requires admin or lead role
   */
  leadOrAdminOnly?: boolean;
}

/**
 * Interface for navigation state
 */
export interface NavigationState {
  /**
   * Whether the mobile menu is open
   */
  isMobileMenuOpen: boolean;

  /**
   * Whether the user dropdown is open
   */
  isUserDropdownOpen: boolean;

  /**
   * The active menu item
   */
  activeMenuItem?: string;
}
