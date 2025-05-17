import { useState } from "react";
import { UserRole } from "@/modules/auth/domain/enums";
import { ActionButton } from "@/presentation/atoms/user-management/ActionButton";
import { RoleSelector } from "@/presentation/molecules/user-management/RoleSelector";

export interface AdminApprovalButtonGroupProps {
  /**
   * Callback fired when a user is approved with a role
   */
  onApprove: (role: UserRole) => Promise<void>;

  /**
   * Callback fired when a user is rejected
   */
  onReject: () => Promise<void>;

  /**
   * The currently selected role, or null if no role is selected
   */
  selectedRole: UserRole | null;

  /**
   * Callback fired when a role is selected
   */
  onRoleChange: (role: UserRole) => void;

  /**
   * Whether the approval action is currently in progress
   */
  isApproving?: boolean;

  /**
   * Whether the rejection action is currently in progress
   */
  isRejecting?: boolean;

  /**
   * Whether the buttons should be disabled
   */
  disabled?: boolean;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Component that contains role selection, approve and reject buttons
 * Handles the confirmation workflow for admin approval/rejection actions
 * Extends the standard ApprovalButtonGroup to include role assignment
 */
export function AdminApprovalButtonGroup({
  onApprove,
  onReject,
  selectedRole,
  onRoleChange,
  isApproving = false,
  isRejecting = false,
  disabled = false,
  className = "",
}: AdminApprovalButtonGroupProps) {
  const [confirmingApprove, setConfirmingApprove] = useState(false);
  const [confirmingReject, setConfirmingReject] = useState(false);

  const handleApproveClick = () => {
    if (!selectedRole) {
      return; // Don't allow approving without a role
    }

    if (confirmingApprove) {
      // Execute the approve action with the selected role
      onApprove(selectedRole);
      setConfirmingApprove(false);
    } else {
      // Ask for confirmation
      setConfirmingApprove(true);
      setConfirmingReject(false);
    }
  };

  const handleRejectClick = () => {
    if (confirmingReject) {
      // Execute the reject action
      onReject();
      setConfirmingReject(false);
    } else {
      // Ask for confirmation
      setConfirmingReject(true);
      setConfirmingApprove(false);
    }
  };

  const handleCancelClick = () => {
    setConfirmingApprove(false);
    setConfirmingReject(false);
  };

  // Determine if approve button should be disabled
  const approveDisabled = disabled || isRejecting || !selectedRole;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Role selector only shows when not confirming an action */}
      {!confirmingApprove && !confirmingReject && (
        <RoleSelector selectedRole={selectedRole} onRoleChange={onRoleChange} />
      )}

      <div className="flex gap-2">
        {confirmingApprove || confirmingReject ? (
          <ActionButton
            actionType="cancel"
            onClick={handleCancelClick}
            className="flex-1"
            disabled={isApproving || isRejecting || disabled}
          >
            Cancel
          </ActionButton>
        ) : null}

        {confirmingReject ? (
          <ActionButton
            actionType="reject"
            onClick={handleRejectClick}
            isLoading={isRejecting}
            className="flex-1"
            disabled={isApproving || disabled}
          >
            Confirm Reject
          </ActionButton>
        ) : confirmingApprove ? (
          <ActionButton
            actionType="approve"
            onClick={handleApproveClick}
            isLoading={isApproving}
            className="flex-1"
            disabled={approveDisabled}
          >
            Confirm Approve
          </ActionButton>
        ) : (
          <>
            <ActionButton
              actionType="approve"
              onClick={handleApproveClick}
              isLoading={isApproving}
              className="flex-1"
              disabled={approveDisabled}
            >
              Approve
            </ActionButton>
            <ActionButton
              actionType="reject"
              onClick={handleRejectClick}
              isLoading={isRejecting}
              className="flex-1"
              disabled={isApproving || disabled}
            >
              Reject
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
}
