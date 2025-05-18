"use client";

import { useNavigation } from "@/modules/navigation";
import { TopNavigation } from "@/presentation/organisms/navigation/TopNavigation";

// Create a type for the user data
interface UserData {
  fullName: string;
  role: string;
  imageUrl?: string;
  isAdmin: boolean;
  isLead: boolean;
}

export interface MainNavigationProps {
  /**
   * User data for the navigation
   */
  user: UserData;

  /**
   * Function to handle logout
   */
  onLogout: () => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * MainNavigation template combines the top navigation components
 * and provides a consistent navigation experience across the application
 */
export function MainNavigation({
  user,
  onLogout,
  className = "",
}: MainNavigationProps) {
  const {
    menuItems,
    activeMenuItem,
    isMobileMenuOpen,
    isUserDropdownOpen,
    toggleMobileMenu,
    toggleUserDropdown,
  } = useNavigation({
    isAdmin: user.isAdmin,
    isLead: user.isLead,
    onLogout,
  });

  // Convert menu items to nav items for TopNavigation - only include top-level navigation items
  // that don't have adminOnly or leadOrAdminOnly flags and are not dividers or section headers
  const navItems = menuItems
    .filter((item) => {
      // Keep only regular nav items, not dividers, section headers, or admin-only items
      return (
        !item.isDivider &&
        !item.adminOnly &&
        !item.leadOrAdminOnly &&
        item.href &&
        item.section === "user" &&
        item.id !== "user-section" &&
        item.id !== "profile" &&
        item.id !== "logout"
      );
    })
    .map((item) => ({
      label: item.label,
      href: item.href || "#",
      icon: item.icon,
    }));

  return (
    <div className={`sticky top-0 z-30 ${className}`}>
      <TopNavigation
        userName={user.fullName}
        userRole={user.role}
        userImageUrl={user.imageUrl}
        isAdmin={user.isAdmin}
        isLead={user.isLead}
        onLogout={onLogout}
        navItems={navItems}
      />
    </div>
  );
}
