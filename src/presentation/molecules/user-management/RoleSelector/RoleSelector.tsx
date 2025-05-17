import { UserRole } from "@/modules/auth/domain/enums";
import { RoleOption } from "@/presentation/atoms/user-management/RoleOption";

export interface RoleSelectorProps {
  /**
   * The currently selected role, or null if no role is selected
   */
  selectedRole: UserRole | null;

  /**
   * Callback fired when a role is selected
   */
  onRoleChange: (role: UserRole) => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * A molecule component that allows selection of a user role
 * Used in the admin approval flow to assign roles to users
 */
export function RoleSelector({
  selectedRole,
  onRoleChange,
  className = "",
}: RoleSelectorProps) {
  // Role options with display labels
  const roleOptions = [
    { value: UserRole.ADMIN, label: "Admin" },
    { value: UserRole.LEAD, label: "Lead" },
    { value: UserRole.MEMBER, label: "Member" },
  ];

  return (
    <div
      className={`p-3 border border-gray-200 rounded-md bg-gray-50 ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-700 mb-2">Assign Role</h3>
      <div className="space-y-1">
        {roleOptions.map((option) => (
          <RoleOption
            key={option.value}
            value={option.value}
            label={option.label}
            isSelected={selectedRole === option.value}
            onChange={onRoleChange}
          />
        ))}
      </div>
    </div>
  );
}
