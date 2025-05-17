import { PendingUsersList } from "@/presentation/organisms/user-management/PendingUsersList";
import { User } from "@/modules/auth/domain/entities/User";

export interface PendingUserApprovalTemplateProps {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  className?: string;
}

/**
 * Template for the user approval dashboard
 * Defines the overall layout structure for the dashboard
 */
export function PendingUserApprovalTemplate({
  users,
  isLoading,
  error,
  onRefresh,
  className = "",
}: PendingUserApprovalTemplateProps) {
  return (
    <div className={`min-h-screen bg-[#FFFDF5] ${className}`}>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto pl-0 pr-2 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            User Approval Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Review and manage pending user registrations
          </p>
        </div>
      </header>

      <main className="container mx-auto pl-0 pr-2 py-6">
        <PendingUsersList
          users={users}
          isLoading={isLoading}
          error={error}
          onRefresh={onRefresh}
        />
      </main>
    </div>
  );
}
