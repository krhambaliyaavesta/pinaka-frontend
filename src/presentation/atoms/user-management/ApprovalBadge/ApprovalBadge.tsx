import { UserStatus } from "@/modules/auth/domain/enums";
import { MdCheck, MdClose, MdHourglassEmpty } from "react-icons/md";

export interface ApprovalBadgeProps {
  status: UserStatus;
  className?: string;
}

/**
 * Badge component that displays user approval status
 * with appropriate colors and icons
 */
export function ApprovalBadge({ status, className = "" }: ApprovalBadgeProps) {
  const getStatusDetails = () => {
    switch (status) {
      case UserStatus.APPROVED:
        return {
          text: "Approved",
          bgColor: "bg-teal-100",
          textColor: "text-teal-800",
          borderColor: "border-teal-200",
          icon: <MdCheck className="h-4 w-4 text-teal-500" />,
        };
      case UserStatus.REJECTED:
        return {
          text: "Rejected",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          icon: <MdClose className="h-4 w-4 text-red-500" />,
        };
      case UserStatus.PENDING:
      default:
        return {
          text: "Pending",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          icon: <MdHourglassEmpty className="h-4 w-4 text-yellow-500" />,
        };
    }
  };

  const { text, bgColor, textColor, borderColor, icon } = getStatusDetails();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium border ${bgColor} ${textColor} ${borderColor} ${className}`}
    >
      <span className="mr-1">{icon}</span>
      {text}
    </span>
  );
}
