import { ReactNode } from "react";

export interface UserDetailItemProps {
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * Component to display a labeled user detail
 * Follows a consistent label-value format for user information
 */
export function UserDetailItem({
  label,
  value,
  icon,
  className = "",
}: UserDetailItemProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <div className="flex items-center">
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        <p className="text-sm text-gray-800 font-medium truncate">
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </p>
      </div>
    </div>
  );
}
