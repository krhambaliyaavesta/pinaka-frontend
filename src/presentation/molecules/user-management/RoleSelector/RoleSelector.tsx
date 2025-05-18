import { UserRole } from "@/modules/auth/domain/enums";
import { RoleOption } from "@/presentation/atoms/user-management/RoleOption";
import { MdAdminPanelSettings, MdSupervisorAccount, MdPerson } from "react-icons/md";

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
  // Role options with display labels and icons
  const roleOptions = [
    { 
      value: UserRole.ADMIN, 
      label: "Admin", 
      icon: <MdAdminPanelSettings className="h-5 w-5 text-purple-600" />,
      description: "Full system access with all permissions"
    },
    { 
      value: UserRole.LEAD, 
      label: "Lead", 
      icon: <MdSupervisorAccount className="h-5 w-5 text-blue-600" />,
      description: "Can manage team members and approve users"
    },
    { 
      value: UserRole.MEMBER, 
      label: "Member", 
      icon: <MdPerson className="h-5 w-5 text-teal-600" />,
      description: "Standard user with basic access"
    },
  ];

  return (
    <div
      className={`p-3 border border-gray-200 rounded-md bg-white shadow-sm ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 mr-1 text-teal-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Assign Role
      </h3>
      <div className="space-y-1">
        {roleOptions.map((option) => (
          <div
            key={option.value}
            className={`
              rounded-md p-2 transition-colors cursor-pointer
              ${selectedRole === option.value 
                ? 'bg-teal-50 border border-teal-200' 
                : 'hover:bg-gray-50 border border-transparent'}
            `}
            onClick={() => onRoleChange(option.value)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={`role-${option.value}`}
                name="role"
                checked={selectedRole === option.value}
                onChange={() => onRoleChange(option.value)}
                className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
              />
              <label
                htmlFor={`role-${option.value}`}
                className="ml-2 flex items-center cursor-pointer flex-grow"
              >
                <span className="mr-2">{option.icon}</span>
                <span className="font-medium text-gray-800">{option.label}</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-6">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
