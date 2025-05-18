import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { ApprovalBadge } from "@/presentation/atoms/user-management/ApprovalBadge";
import { UserDetailItem } from "@/presentation/molecules/user-management/UserDetailItem";
import { ApprovalButtonGroup } from "@/presentation/molecules/user-management/ApprovalButtonGroup";
import { MdEmail, MdWork } from "react-icons/md";
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
