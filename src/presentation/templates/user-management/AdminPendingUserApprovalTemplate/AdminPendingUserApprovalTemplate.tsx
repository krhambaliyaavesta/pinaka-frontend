import { AdminPendingUsersList } from "@/presentation/organisms/user-management/AdminPendingUsersList";
import { User } from "@/modules/auth/domain/entities/User";
import { FaUserCog } from "react-icons/fa";

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
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-[#FFFDF5] ${className}`}>
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="bg-teal-100 text-teal-700 p-2 rounded-full mr-3">
              <FaUserCog className="h-6 w-6" />
            </span>
            Admin User Approval Dashboard
          </h1>
          <p className="text-gray-600 mt-2 ml-12">
            Review, assign roles, and manage pending user registrations
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <AdminPendingUsersList
            users={users}
            isLoading={isLoading}
            error={error}
            onRefresh={onRefresh}
          />
        </div>
      </main>
    </div>
  );
}
