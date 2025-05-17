import { UserRole } from "@/modules/auth/domain/enums";

export interface RoleOptionProps {
  /**
   * The role value
   */
  value: UserRole;

  /**
   * The label to display
   */
  label: string;

  /**
   * Whether this option is currently selected
   */
  isSelected: boolean;

  /**
   * Callback fired when the option is selected
   */
  onChange: (role: UserRole) => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * An atom component that renders a single role option as a radio button
 * Used within role selection interfaces
 */
export function RoleOption({
  value,
  label,
  isSelected,
  onChange,
  className = "",
}: RoleOptionProps) {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className={`flex items-center space-x-2 py-2 ${className}`}>
      <input
        type="radio"
        id={`role-${value}`}
        name="role"
        checked={isSelected}
        onChange={handleChange}
        className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
      />
      <label
        htmlFor={`role-${value}`}
        className="text-sm font-medium text-gray-700 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
