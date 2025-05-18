import { INavigationService } from "../../domain/interfaces/INavigationService";
import { MenuItem, MenuSection } from "../../domain/types";

// Import icons
import {
  FaUser,
  FaSignOutAlt,
  FaChartBar,
  FaUsersCog,
  FaUserEdit,
  FaUserFriends,
  FaLayerGroup,
  FaIdCard,
  FaTachometerAlt,
  FaUsers,
  FaHome,
} from "react-icons/fa";
import React from "react";

/**
 * Service for managing navigation and menu items
 */
export class NavigationService implements INavigationService {
  private readonly defaultMenuItems: MenuItem[] = [
    // Top nav items that should appear for all users
    {
      id: "home",
      label: "Home",
      icon: React.createElement(FaHome),
      href: "/",
      section: MenuSection.USER,
    },
    {
      id: "kudos-wall",
      label: "Kudos Wall",
      icon: React.createElement(FaUsers),
      href: "/kudos-wall",
      section: MenuSection.USER,
    },

    // Divider
    {
      id: "admin-divider",
      label: "",
      isDivider: true,
      section: MenuSection.SYSTEM,
      leadOrAdminOnly: true,
    },

    // Admin/Lead items
    {
      id: "admin-section",
      label: "Admin Controls",
      isDivider: false,
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "overview",
      label: "Overview",
      icon: React.createElement(FaTachometerAlt),
      href: "/dashboard",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "user-approvals",
      label: "User Approvals",
      icon: React.createElement(FaUsersCog),
      href: "/dashboard/users",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "edit-users",
      label: "Edit Users",
      icon: React.createElement(FaUserEdit),
      href: "/dashboard/edit-users",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "teams",
      label: "Teams",
      icon: React.createElement(FaUserFriends),
      href: "/dashboard/teams",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "categories",
      label: "Categories",
      icon: React.createElement(FaLayerGroup),
      href: "/dashboard/categories",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "cards",
      label: "Cards",
      icon: React.createElement(FaIdCard),
      href: "/dashboard/cards",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: React.createElement(FaChartBar),
      href: "/analytics",
      section: MenuSection.ADMIN,
      leadOrAdminOnly: true,
    },

    // Divider
    {
      id: "user-divider",
      label: "",
      isDivider: true,
      section: MenuSection.SYSTEM,
    },

    // User section header
    {
      id: "user-section",
      label: "User Settings",
      isDivider: false,
      section: MenuSection.USER,
    },

    // User items
    {
      id: "profile",
      label: "My Profile",
      icon: React.createElement(FaUser),
      href: "/profile",
      section: MenuSection.USER,
    },

    // Divider before logout
    {
      id: "logout-divider",
      label: "",
      isDivider: true,
      section: MenuSection.SYSTEM,
    },

    // Logout needs to be handled by the component
    {
      id: "logout",
      label: "Log Out",
      icon: React.createElement(FaSignOutAlt),
      section: MenuSection.SYSTEM,
    },
  ];

  /**
   * Get menu items filtered by user role
   */
  getRoleBasedMenuItems(isAdmin: boolean, isLead: boolean): MenuItem[] {
    return this.defaultMenuItems.filter((item) => {
      if (item.adminOnly && !isAdmin) return false;
      if (item.leadOrAdminOnly && !(isAdmin || isLead)) return false;
      return true;
    });
  }

  /**
   * Get the active menu item based on the current path
   */
  getActiveMenuItem(pathname: string): string | undefined {
    // Special case for dashboard root
    if (pathname === "/dashboard") {
      return "overview";
    }

    // Find menu item with href that matches or starts with pathname
    const matchingItem = this.defaultMenuItems.find(
      (item) => item.href && pathname.startsWith(item.href) && item.href !== "/"
    );

    return matchingItem?.id;
  }
}
