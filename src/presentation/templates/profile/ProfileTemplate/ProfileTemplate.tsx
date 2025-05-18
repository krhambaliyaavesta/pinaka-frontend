"use client";

import { User } from "@/modules/auth/domain/entities/User";
import { useEffect, useState } from "react";
import { ProfileForm } from "@/presentation/organisms/profile/ProfileForm";
import { UpdateUserData } from "@/modules/user-management/domain/interfaces/IUserManagementRepository";

interface ProfileTemplateProps {
  /**
   * User data
   */
  user: User;

  /**
   * Handler for profile updates
   */
  onUpdateProfile: (data: UpdateUserData) => Promise<void>;

  /**
   * Whether a submission is in progress
   */
  isSubmitting: boolean;

  /**
   * Optional CSS class
   */
  className?: string;
}

/**
 * ProfileTemplate
 * Template for the user profile page
 */
export function ProfileTemplate({
  user,
  onUpdateProfile,
  isSubmitting,
  className = "",
}: ProfileTemplateProps) {
  return (
    <div className={`profile-template w-full max-w-3xl mx-auto ${className}`}>
      <div className="bg-gradient-to-r from-teal-50/50 to-blue-50/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 pb-2">
          Your Profile
        </h1>
        <p className="text-teal-600">
          View and update your personal information
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <ProfileForm
          user={user}
          onSubmit={onUpdateProfile}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
