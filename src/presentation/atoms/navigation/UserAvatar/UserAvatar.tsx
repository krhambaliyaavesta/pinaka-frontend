export interface UserAvatarProps {
  /**
   * User's full name to extract initials from
   */
  name: string;

  /**
   * Optional image URL for the avatar
   */
  imageUrl?: string;

  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Color variant of the avatar
   * @default 'teal'
   */
  variant?: "teal" | "gray" | "orange";

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * UserAvatar component displays a user's avatar
 * It shows the user's image if available, or their initials as a fallback
 */
export function UserAvatar({
  name,
  imageUrl,
  size = "md",
  variant = "teal",
  className = "",
}: UserAvatarProps) {
  // Extract initials from name
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  // Color variant classes
  const variantClasses = {
    teal: "bg-teal-500 text-white",
    gray: "bg-gray-500 text-white",
    orange: "bg-orange-400 text-white",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        flex items-center justify-center
        rounded-full
        font-medium
        ${className}
      `}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
