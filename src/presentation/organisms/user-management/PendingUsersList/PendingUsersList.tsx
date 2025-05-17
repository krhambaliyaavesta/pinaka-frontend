import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserApprovalCard } from "@/presentation/organisms/user-management/UserApprovalCard";
import { FaSearch } from "react-icons/fa";

export interface PendingUsersListProps {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  className?: string;
}

/**
 * Displays a list of pending users with search and filtering capabilities
 */
export function PendingUsersList({
  users,
  isLoading,
  error,
  onRefresh,
  className = "",
}: PendingUsersListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.jobTitle && user.jobTitle.toLowerCase().includes(searchLower))
    );
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading pending users...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 bg-red-50 rounded-lg border border-red-200 text-center">
          <p className="text-red-600 mb-4">
            {error.message || "Failed to load pending users"}
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={onRefresh}
          >
            Try Again
          </button>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No pending users found</p>
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div className="p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No users match your search</p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserApprovalCard
            key={user.id}
            user={user}
            onStatusChange={onRefresh}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search users by name, email, or job title"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Pending Users ({filteredUsers.length})
          </h2>
          <button
            onClick={onRefresh}
            className="text-teal-600 hover:text-teal-800"
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
