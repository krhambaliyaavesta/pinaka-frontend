"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavigationService } from "../services/NavigationService";

// Create a singleton instance of NavigationService
const navigationService = new NavigationService();

export interface UseNavigationProps {
  /**
   * Whether the user is an admin
   */
  isAdmin: boolean;

  /**
   * Whether the user is a lead
   */
  isLead: boolean;

  /**
   * Optional logout handler
   */
  onLogout?: () => void;
}

/**
 * Hook for managing navigation state and menu items
 */
export function useNavigation({
  isAdmin,
  isLead,
  onLogout,
}: UseNavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Get menu items based on user role
  const menuItems = navigationService.getRoleBasedMenuItems(isAdmin, isLead);

  // Get active menu item based on current path
  const activeMenuItem = navigationService.getActiveMenuItem(pathname);

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsUserDropdownOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close user dropdown when mobile menu is toggled
    if (isUserDropdownOpen) {
      setIsUserDropdownOpen(false);
    }
  };

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Close all menus
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Process menu items to add logout handler
  const processedMenuItems = menuItems.map((item) =>
    item.id === "logout" ? { ...item, onClick: handleLogout } : item
  );

  // Close dropdown when route changes
  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  return {
    menuItems: processedMenuItems,
    activeMenuItem,
    isMobileMenuOpen,
    isUserDropdownOpen,
    toggleMobileMenu,
    toggleUserDropdown,
    closeAllMenus,
  };
}
