"use client";

import { UserAvatar } from "@/presentation/atoms/navigation/UserAvatar";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export interface UserDropdownTriggerProps {
  /**
   * User's full name
   */
  userName: string;

  /**
   * Optional user's avatar image URL
   */
  userImageUrl?: string;

  /**
   * User's role or title
   */
  userRole?: string;

  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;

  /**
   * Click handler for the trigger
   */
  onClick?: () => void;

  /**
   * Hover handler for the trigger
   */
  onHover?: () => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * UserDropdownTrigger component for user dropdown menus
 * Displays the user avatar, name, and a dropdown indicator
 */
export function UserDropdownTrigger({
  userName,
  userImageUrl,
  userRole,
  isOpen = false,
  onClick,
  onHover,
  className = "",
}: UserDropdownTriggerProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (onHover) {
      onHover();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <button
      type="button"
      className={`
        flex items-center gap-2 py-2 px-3 
        rounded-lg transition-colors duration-200
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
        ${isOpen || isHovering ? "bg-gray-100" : ""}
        ${className}
      `}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-expanded={isOpen}
    >
      <UserAvatar
        name={userName}
        imageUrl={userImageUrl}
        size="sm"
        variant={isOpen || isHovering ? "teal" : "gray"}
      />

      <div className="text-left">
        <div className="font-medium text-sm text-gray-800">{userName}</div>
        {userRole && <div className="text-xs text-gray-500">{userRole}</div>}
      </div>

      <FaChevronDown
        className={`
          ml-1 text-gray-500 transition-transform duration-200
          ${isOpen ? "transform rotate-180" : ""}
        `}
        size={12}
      />
    </button>
  );
}
