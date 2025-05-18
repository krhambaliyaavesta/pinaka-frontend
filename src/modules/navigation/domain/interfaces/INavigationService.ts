import { MenuItem } from "../types";

/**
 * Interface for the navigation service
 */
export interface INavigationService {
  /**
   * Get menu items filtered by user role
   * @param isAdmin Whether the user is an admin
   * @param isLead Whether the user is a lead
   * @returns Filtered menu items
   */
  getRoleBasedMenuItems(isAdmin: boolean, isLead: boolean): MenuItem[];

  /**
   * Get the ID of the active menu item based on the current path
   * @param pathname The current path from next/navigation
   * @returns The ID of the active menu item
   */
  getActiveMenuItem(pathname: string): string | undefined;
}
