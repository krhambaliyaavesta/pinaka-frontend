import { useState } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { AdminUserApprovalCard } from "@/presentation/organisms/user-management/AdminUserApprovalCard";
import { FaSearch, FaSync } from "react-icons/fa";
import { Loader } from "@/presentation/atoms/common";

export interface AdminPendingUsersListProps {
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
 * Component that displays and manages a list of pending users with advanced filtering
 * for admin usage, including role assignment capability
 */
export function AdminPendingUsersList({
  users,
  isLoading,
  error,
  onRefresh,
  className = "",
}: AdminPendingUsersListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.jobTitle && user.jobTitle.toLowerCase().includes(query))
    );
  });

  const renderContent = () => {
    if (isLoading) {
      return <Loader fullScreen={false} label="Loading users..." />;
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error loading users</h3>
          <p className="text-red-700">{error.message}</p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">No pending users</h3>
          <p className="text-blue-700">There are currently no users waiting for approval.</p>
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No matching users</h3>
          <p className="text-yellow-700">
            No users match your search query. Try a different search term.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <AdminUserApprovalCard
            key={user.id}
            user={user}
            onStatusChange={onRefresh}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Pending Users <span className="text-teal-600 bg-teal-50 px-2 py-1 rounded-md text-sm ml-2">({filteredUsers.length})</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow max-w-2xl">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email, or job title"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium rounded-lg transition-colors shadow-sm border border-teal-200"
          disabled={isLoading}
        >
          <FaSync className={`${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className=" ">
        {renderContent()}
      </div>
    </div>
  );
}
