import { useState } from "react";
import { ActionButton } from "@/presentation/atoms/user-management/ActionButton";

export interface ApprovalButtonGroupProps {
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
  isApproving?: boolean;
  isRejecting?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Component that contains approve and reject buttons with confirmation states
 * Handles the confirmation workflow for approval/rejection actions
 */
export function ApprovalButtonGroup({
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
  disabled = false,
  className = "",
}: ApprovalButtonGroupProps) {
  const [confirmingApprove, setConfirmingApprove] = useState(false);
  const [confirmingReject, setConfirmingReject] = useState(false);

  const handleApproveClick = () => {
    if (confirmingApprove) {
      // Execute the approve action
      onApprove();
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

  return (
    <div className={`flex gap-2 ${className}`}>
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
          disabled={isRejecting || disabled}
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
            disabled={isRejecting || disabled}
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
  );
}
