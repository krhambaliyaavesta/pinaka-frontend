import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { ApprovalBadge } from "@/presentation/atoms/user-management/ApprovalBadge";
import { UserDetailItem } from "@/presentation/molecules/user-management/UserDetailItem";
import { ApprovalButtonGroup } from "@/presentation/molecules/user-management/ApprovalButtonGroup";
import { MdEmail, MdPerson, MdWork, MdCalendarToday } from "react-icons/md";
import { useApproveUser, useRejectUser } from "@/modules/user-management";
import { useToast } from "@/modules/toast";

export interface UserApprovalCardProps {
  user: User;
  onStatusChange: () => void;
  className?: string;
}

/**
 * Card that displays user information and approval actions
 */
export function UserApprovalCard({
  user,
  onStatusChange,
  className = "",
}: UserApprovalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { approveUser, isLoading: isApproving } = useApproveUser();
  const { rejectUser, isLoading: isRejecting } = useRejectUser();
  const toast = useToast();

  const handleApprove = async () => {
    try {
      const updatedUser = await approveUser(user.id);
      if (updatedUser) {
        toast.success(`${user.fullName} has been approved`);
        onStatusChange();
      }
    } catch (error) {
      toast.error("Failed to approve user");
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

  return (
    <div
      className={`bg-[#FFFDF5] border border-gray-200 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.fullName}
          </h3>
          <ApprovalBadge status={user.status} />
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
          <ApprovalButtonGroup
            onApprove={handleApprove}
            onReject={handleReject}
            isApproving={isApproving}
            isRejecting={isRejecting}
          />
        </div>
      </div>
    </div>
  );
}
