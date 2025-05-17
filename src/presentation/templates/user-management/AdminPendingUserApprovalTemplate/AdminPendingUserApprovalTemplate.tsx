import { AdminPendingUsersList } from "@/presentation/organisms/user-management/AdminPendingUsersList";
import { User } from "@/modules/auth/domain/entities/User";

export interface AdminPendingUserApprovalTemplateProps {
  /**
   * The list of pending users to display
   */
  users: User[];

  /**
   * Whether the data is currently loading
   */
  isLoading: boolean;

  /**
   * Error that occurred during data loading, if any
   */
  error: Error | null;

  /**
   * Callback to refresh the data
   */
  onRefresh: () => void;

  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * Template for the admin user approval dashboard
 * Defines the overall layout structure for the admin dashboard
 * Enhanced version of PendingUserApprovalTemplate with role assignment capability
 */
export function AdminPendingUserApprovalTemplate({
  users,
  isLoading,
  error,
  onRefresh,
  className = "",
}: AdminPendingUserApprovalTemplateProps) {
  return (
    <div className={`min-h-screen bg-[#FFFDF5] ${className}`}>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin User Approval Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Review, assign roles, and manage pending user registrations
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AdminPendingUsersList
          users={users}
          isLoading={isLoading}
          error={error}
          onRefresh={onRefresh}
        />
      </main>
    </div>
  );
}
