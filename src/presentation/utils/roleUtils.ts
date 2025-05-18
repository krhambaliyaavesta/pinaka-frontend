import { UserRole } from "@/modules/auth/domain/enums";

/**
 * Gets a human-readable role name from a UserRole enum value
 * @param role The UserRole enum value
 * @returns A string representing the human-readable role name
 */
export function getRoleName(role: UserRole): string {
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
} 