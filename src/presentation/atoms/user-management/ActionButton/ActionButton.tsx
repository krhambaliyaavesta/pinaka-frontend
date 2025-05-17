import { ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

export type ActionType = "approve" | "reject" | "cancel";

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: ActionType;
  isLoading?: boolean;
}

/**
 * Button component for user approval/rejection actions
 * Extends the HTML button with specific styling for different action types
 */
export function ActionButton({
  actionType,
  isLoading = false,
  children,
  className = "",
  ...props
}: ActionButtonProps) {
  // Define styles based on action type
  const getButtonStyles = () => {
    switch (actionType) {
      case "approve":
        return "bg-teal-500 hover:bg-teal-600 text-white";
      case "reject":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "cancel":
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
      default:
        return "bg-teal-500 hover:bg-teal-600 text-white";
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors duration-200 ${getButtonStyles()} ${
        props.disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mr-2 h-4 w-4" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
