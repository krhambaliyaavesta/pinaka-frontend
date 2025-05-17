import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";
import { ApprovalBadge } from "@/presentation/atoms/user-management/ApprovalBadge";
import { UserDetailItem } from "@/presentation/molecules/user-management/UserDetailItem";
import { AdminApprovalButtonGroup } from "@/presentation/molecules/user-management/AdminApprovalButtonGroup";
import { MdEmail, MdPerson, MdWork, MdCalendarToday } from "react-icons/md";
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
  const [isExpanded, setIsExpanded] = useState(false);
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
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
      className={`bg-[#FFFDF5] border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.fullName}
          </h3>
          <ApprovalBadge status={user.approvalStatus} />
        </div>

        <UserDetailItem label="Email" value={user.email} icon={<MdEmail />} />

        {user.jobTitle && (
          <UserDetailItem
            label="Job Title"
            value={user.jobTitle}
            icon={<MdWork />}
          />
        )}

        <button
          className="text-sm text-teal-600 hover:text-teal-800 mt-2 mb-4"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>

        {isExpanded && (
          <div className="mt-2 pt-3 border-t border-gray-100">
            <UserDetailItem
              label="User ID"
              value={user.id}
              icon={<MdPerson />}
            />

            <UserDetailItem
              label="Registration Date"
              value={formatDate(user.createdAt)}
              icon={<MdCalendarToday />}
            />
          </div>
        )}

        <div className="mt-4">
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
