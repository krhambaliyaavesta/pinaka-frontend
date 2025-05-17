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
    <div className={`mb-3 ${className}`}>
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <div className="flex items-center">
        {icon && <span className="mr-2 text-gray-500">{icon}</span>}
        <p className="text-base text-gray-900 font-normal">
          {value || <span className="text-gray-400">Not provided</span>}
        </p>
      </div>
    </div>
  );
}
