import { UserStatus } from "@/modules/auth/domain/enums";
import { MdCheck, MdClose, MdHourglassEmpty } from "react-icons/md";

export interface ApprovalBadgeProps {
  /**
   * The user approval status to display
   */
  status: UserStatus;

  /**
   * Optional CSS class name
   */
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
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          icon: <MdCheck className="h-4 w-4 text-green-600" />,
          shadowColor: "shadow-green-100",
        };
      case UserStatus.REJECTED:
        return {
          text: "Rejected",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          icon: <MdClose className="h-4 w-4 text-red-600" />,
          shadowColor: "shadow-red-100",
        };
      case UserStatus.PENDING:
      default:
        return {
          text: "Pending",
          bgColor: "bg-amber-100",
          textColor: "text-amber-800",
          borderColor: "border-amber-200",
          icon: <MdHourglassEmpty className="h-4 w-4 text-amber-600" />,
          shadowColor: "shadow-amber-100",
        };
    }
  };

  const { text, bgColor, textColor, borderColor, icon, shadowColor } = getStatusDetails();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-sm font-medium border ${bgColor} ${textColor} ${borderColor} ${shadowColor} shadow-sm ${className}`}
    >
      <span className="mr-1">{icon}</span>
      {text}
    </span>
  );
}
