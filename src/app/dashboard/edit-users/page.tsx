"use client";

import { useAuth } from "@/modules/auth";
import { UserRole, UserStatus } from "@/modules/auth/domain/enums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/presentation/atoms/common";
import { useSearchUsers, useUpdateUser } from "@/modules/user-management";
import { UserSearchParams } from "@/modules/user-management/domain/types";
import { FaSearch } from "react-icons/fa";
import { User } from "@/modules/auth/domain/entities/User";
import {
  EditUserModal,
  EditUserFormData,
} from "@/presentation/organisms/user-management/EditUserModal";
import { useToast } from "@/modules/toast";
import { UpdateUserData } from "@/modules/user-management/domain/interfaces";

export default function EditUsersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const toast = useToast();

  // Initialize hooks
  const {
    users,
    total,
    loading: searchLoading,
    error: searchError,
    search,
    currentPage,
    pageSize,
    nextPage,
    previousPage,
    setPageSize,
  } = useSearchUsers({
    approvalStatus: UserStatus.APPROVED,
    limit: 10,
    offset: 0,
  });

  const {
    updateUser,
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useUpdateUser();

  // Initial search when component mounts
  useEffect(() => {
    if (user && (user.role === UserRole.ADMIN || user.role === UserRole.LEAD)) {
      handleSearch();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check user authentication and role
  useEffect(() => {
    if (isLoading) return;

    if (
      !user ||
      (user.role !== UserRole.ADMIN && user.role !== UserRole.LEAD)
    ) {
      router.push("/dashboard");
    }
  }, [isLoading, user, router]);

  // Handle search submission
  const handleSearch = () => {
    const params: UserSearchParams = {
      limit: pageSize,
      offset: 0, // Reset to first page on new search
      approvalStatus: UserStatus.APPROVED,
    };

    if (searchTerm.trim()) {
      params.search = searchTerm.trim();
    }

    search(params);
  };

  // Handle search input keypress
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Open edit modal
  const handleEditClick = (selectedUser: User) => {
    setSelectedUser(selectedUser);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // Handle form submission from edit modal
  const handleUpdateUser = async (data: EditUserFormData) => {
    if (!selectedUser) return;

    try {
      // Prepare update data
      const updateData: UpdateUserData = {
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle,
      };

      // Only include role if it's provided and the current user is an admin
      if (data.role !== undefined && user?.role === UserRole.ADMIN) {
        updateData.role = data.role;
      }

      // Call the update API
      const updatedUser = await updateUser(selectedUser.id, updateData);

      if (updatedUser) {
        // Update the user in the list
        const updatedUsers = users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u
        );

        // Show success message
        toast.success(`User ${updatedUser.fullName} updated successfully`, {
          title: "Success",
        });

        // Force refresh the search results to get updated data
        search({
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
          approvalStatus: UserStatus.APPROVED,
          search: searchTerm.trim() || undefined,
        });

        // Close the modal
        handleCloseModal();
      }
    } catch (error) {
      toast.error(
        `Failed to update user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        {
          title: "Error",
        }
      );
    }
  };

  if (isLoading) {
    return <Loader label="Loading..." />;
  }

  // If not admin or lead, don't render the page content
  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.LEAD)) {
    return null;
  }

  return (
    <div className="container mx-auto pl-0 pr-2 py-4 bg-[#fffef9] min-h-screen">
      <div className="mb-4">
        <div className="bg-teal-600 py-3 px-4 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Manage Users</h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Search form */}
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search users by name or email"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={searchLoading}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Results display */}
        {searchLoading ? (
          <div className="flex justify-center py-10">
            <Loader label="Searching users..." />
          </div>
        ) : searchError ? (
          <div className="text-red-500 py-4">
            Error searching users: {searchError.message}
          </div>
        ) : users.length === 0 ? (
          <div className="text-gray-500 py-4 text-center">
            No users found. Try a different search term.
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-600">
              Showing {users.length} of {total} results
            </p>

            {/* Users table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {user.fullName}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.jobTitle || "-"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.role === UserRole.ADMIN
                            ? "Admin"
                            : user.role === UserRole.LEAD
                            ? "Lead"
                            : "Member"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.approvalStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-teal-600 hover:text-teal-900 font-medium"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-600">
                Page {currentPage} of {Math.ceil(total / pageSize)}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage >= Math.ceil(total / pageSize)}
                className={`px-4 py-2 rounded-md ${
                  currentPage >= Math.ceil(total / pageSize)
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSubmit={handleUpdateUser}
        isSubmitting={updateLoading}
        currentUserRole={user?.role || UserRole.MEMBER}
      />
    </div>
  );
}
