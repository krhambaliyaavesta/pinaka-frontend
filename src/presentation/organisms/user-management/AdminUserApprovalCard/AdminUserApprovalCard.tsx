import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";
import { ApprovalBadge } from "@/presentation/atoms/user-management/ApprovalBadge";
import { UserDetailItem } from "@/presentation/molecules/user-management/UserDetailItem";
import { AdminApprovalButtonGroup } from "@/presentation/molecules/user-management/AdminApprovalButtonGroup";
import { MdEmail, MdWork } from "react-icons/md";
import {
  useApproveUserWithRole,
  useRejectUser,
} from "@/modules/user-management";
import { useToast } from "@/modules/toast";

export interface AdminUserApprovalCardProps {
  /**
   * The user to display and manage
   */
  user: User;

  /**
   * Callback fired when the user's status changes
   */
  onStatusChange: () => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Enhanced card that displays user information and approval actions for admins
 * Extends UserApprovalCard functionality with role assignment capability
 */
export function AdminUserApprovalCard({
  user,
  onStatusChange,
  className = "",
}: AdminUserApprovalCardProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { approveUserWithRole, isLoading: isApproving } =
    useApproveUserWithRole();
  const { rejectUser, isLoading: isRejecting } = useRejectUser();
  const toast = useToast();

  const handleApprove = async (role: UserRole) => {
    try {
      const updatedUser = await approveUserWithRole(user.id, role);
      if (updatedUser) {
        const roleName = getRoleName(role);
        toast.success(`${user.fullName} has been approved as ${roleName}`);
        onStatusChange();
      }
    } catch (error) {
      toast.error("Failed to approve user with role");
    }
  };

  const handleReject = async () => {
    try {
      const updatedUser = await rejectUser(user.id);
      if (updatedUser) {
        toast.success(`${user.fullName} has been rejected`);
        onStatusChange();
      }
    } catch (error) {
      toast.error("Failed to reject user");
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  // Helper function to get role name from UserRole enum
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "Admin";
      case UserRole.LEAD:
        return "Lead";
      case UserRole.MEMBER:
        return "Member";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${className}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate max-w-[70%]">
            {user.fullName}
          </h3>
          <ApprovalBadge status={user.approvalStatus} />
        </div>

        <div className="space-y-2">
          <UserDetailItem 
            label="Email" 
            value={user.email} 
            icon={<MdEmail className="text-blue-500" />} 
          />

          {user.jobTitle && (
            <UserDetailItem
              label="Job Title"
              value={user.jobTitle}
              icon={<MdWork className="text-green-500" />}
            />
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <AdminApprovalButtonGroup
            onApprove={handleApprove}
            onReject={handleReject}
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
            isApproving={isApproving}
            isRejecting={isRejecting}
          />
        </div>
      </div>
    </div>
  );
}
