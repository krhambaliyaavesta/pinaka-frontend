"use client";

import { useEffect } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums";
import { useForm } from "react-hook-form";
import { UpdateUserData } from "@/modules/user-management/domain/interfaces/IUserManagementRepository";

interface ProfileFormProps {
  /**
   * User data
   */
  user: User;

  /**
   * Submit handler for the form
   */
  onSubmit: (data: UpdateUserData) => Promise<void>;

  /**
   * Whether the form is currently being submitted
   */
  isSubmitting: boolean;

  /**
   * Optional CSS class
   */
  className?: string;
}

/**
 * ProfileForm Component
 * Form for displaying and updating user profile information
 */
export function ProfileForm({
  user,
  onSubmit,
  isSubmitting,
  className = "",
}: ProfileFormProps) {
  // Initialize form with user data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateUserData>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle || "",
    },
  });

  // Reset form when user changes
  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle || "",
    });
  }, [user, reset]);

  // Get role display name
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "Administrator";
      case UserRole.LEAD:
        return "Team Lead";
      case UserRole.MEMBER:
        return "Team Member";
      default:
        return "Unknown Role";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`profile-form ${className}`}
    >
      {/* Email field (read-only) */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          disabled
          className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-teal-500"
        />
        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
      </div>

      {/* First Name */}
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-medium mb-2"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters",
            },
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.firstName && (
          <p className="mt-1 text-xs text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-medium mb-2"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters",
            },
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.lastName && (
          <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <label
          htmlFor="jobTitle"
          className="block text-gray-700 font-medium mb-2"
        >
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          {...register("jobTitle")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
          placeholder="Your role or position"
        />
      </div>

      {/* Role (read-only) */}
      <div className="mb-6">
        <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
          Role
        </label>
        <input
          type="text"
          id="role"
          value={getRoleName(user.role)}
          disabled
          className="w-full px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg"
        />
        <p className="mt-1 text-xs text-gray-500">
          Roles can only be changed by administrators
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-colors
            ${
              isSubmitting || !isDirty
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
