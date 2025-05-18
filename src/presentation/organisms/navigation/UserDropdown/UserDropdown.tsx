"use client";

import React, { useState, useRef, useEffect } from "react";
import { UserDropdownTrigger } from "@/presentation/molecules/navigation/UserDropdownTrigger";
import { DropdownMenu } from "@/presentation/molecules/navigation/DropdownMenu";
import { DropdownItem } from "@/presentation/atoms/navigation/DropdownItem";
import { useNavigation } from "@/modules/navigation";

// Import icons

export interface UserMenuItem {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Label to display
   */
  label: string;

  /**
   * Icon to display
   */
  icon?: React.ReactNode;

  /**
   * URL to navigate to
   */
  href?: string;

  /**
   * Function to execute on click
   */
  onClick?: () => void;

  /**
   * Whether this item is a divider
   */
  isDivider?: boolean;

  /**
   * Whether this item requires admin role
   */
  adminOnly?: boolean;

  /**
   * Whether this item requires admin or lead role
   */
  leadOrAdminOnly?: boolean;
}

export interface UserDropdownProps {
  /**
   * User's full name
   */
  userName: string;

  /**
   * User's role
   */
  userRole: string;

  /**
   * Optional user avatar URL
   */
  userImageUrl?: string;

  /**
   * Whether the user is an admin
   */
  isAdmin?: boolean;

  /**
   * Whether the user is a lead
   */
  isLead?: boolean;

  /**
   * Function to handle logout
   */
  onLogout?: () => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * UserDropdown organism combines the dropdown trigger and menu
 * for user account and navigation options
 */
export function UserDropdown({
  userName,
  userRole,
  userImageUrl,
  isAdmin = false,
  isLead = false,
  onLogout,
  className = "",
}: UserDropdownProps) {
  const { menuItems, isUserDropdownOpen, toggleUserDropdown, closeAllMenus } =
    useNavigation({
      isAdmin,
      isLead,
      onLogout,
    });

  const [isHovering, setIsHovering] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle hover state
  const handleHover = () => {
    setIsHovering(true);
  };

  // Close dropdown when mouse leaves the dropdown area
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseLeave);
    };
  }, [dropdownRef]);

  // Close dropdown on route change
  useEffect(() => {
    setIsHovering(false);
  }, []);

  // Determine if the dropdown should be shown
  const showDropdown = isUserDropdownOpen || isHovering;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <UserDropdownTrigger
        userName={userName}
        userImageUrl={userImageUrl}
        userRole={userRole}
        isOpen={showDropdown}
        onClick={toggleUserDropdown}
        onHover={handleHover}
      />

      <DropdownMenu
        isOpen={showDropdown}
        onClose={closeAllMenus}
        width="md"
        className="max-h-[80vh] overflow-y-auto scrollbar-thin"
      >
        {menuItems.map((item) => (
          <DropdownItem
            key={item.id}
            href={item.href}
            onClick={item.onClick}
            icon={item.icon}
            isDivider={item.isDivider}
            isSectionHeader={
              item.id === "admin-section" || item.id === "user-section"
            }
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
}
