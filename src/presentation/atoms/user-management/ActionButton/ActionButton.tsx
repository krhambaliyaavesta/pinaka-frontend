import { ButtonHTMLAttributes } from "react";
import { FaSpinner, FaCheck, FaTimes, FaUndo } from "react-icons/fa";

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
        return "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border border-teal-600 shadow-sm";
      case "reject":
        return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border border-red-600 shadow-sm";
      case "cancel":
        return "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm";
      default:
        return "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border border-teal-600 shadow-sm";
    }
  };

  // Get the icon based on action type
  const getIcon = () => {
    switch (actionType) {
      case "approve":
        return <FaCheck className="h-3 w-3 mr-2" />;
      case "reject":
        return <FaTimes className="h-3 w-3 mr-2" />;
      case "cancel":
        return <FaUndo className="h-3 w-3 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium flex items-center justify-center transition-all duration-200 ${getButtonStyles()} ${
        props.disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mr-2 h-4 w-4" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {getIcon()}
          {children}
        </>
      )}
    </button>
  );
}
