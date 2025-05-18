import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserApprovalCard } from "@/presentation/organisms/user-management/UserApprovalCard";
import { FaSearch } from "react-icons/fa";
import { Loader } from "@/presentation/atoms/common";

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
      return <Loader fullScreen={false} label="Loading pending users..." />;
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
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-teal-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-teal-800 mb-2">No pending users</h3>
          <p className="text-teal-700">There are currently no users waiting for approval.</p>
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-teal-800 mb-2">No matching users</h3>
          <p className="text-teal-700">
            No users match your search query. Try a different search term.
          </p>
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
