import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  /**
   * The URL to navigate to
   */
  href: string;

  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;

  /**
   * The text to display
   */
  children: ReactNode;

  /**
   * Visual style of the link
   * @default 'primary'
   */
  variant?: "primary" | "secondary";

  /**
   * Whether to match the path exactly for active state
   * @default false
   */
  exact?: boolean;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * NavLink component for navigation links with active state
 */
export function NavLink({
  href,
  icon,
  children,
  variant = "primary",
  exact = false,
  className = "",
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();

  // Check if the link is active
  const isActive = exact
    ? pathname === href
    : pathname?.startsWith(href) && href !== "/";

  // Base classes for all variants
  const baseClasses =
    "flex items-center px-3 py-2 rounded-md transition-colors duration-200 font-medium";

  // Variant-specific classes
  const variantClasses = {
    primary: {
      default: "text-gray-700 hover:bg-teal-50 hover:text-teal-700",
      active: "bg-teal-50 text-teal-700",
    },
    secondary: {
      default: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      active: "bg-gray-100 text-gray-900",
    },
  };

  const linkClasses = `
    ${baseClasses}
    ${
      isActive
        ? variantClasses[variant].active
        : variantClasses[variant].default
    }
    ${className}
  `;

  return (
    <Link href={href} className={linkClasses} onClick={onClick}>
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </Link>
  );
}
