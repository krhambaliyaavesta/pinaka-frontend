"use client";

import { useAuth } from "@/modules/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProfileTemplate } from "@/presentation/templates/profile/ProfileTemplate";
import { Loader } from "@/presentation/atoms/common";
import { useUserManagement } from "@/modules/user-management";
import { UpdateUserData } from "@/modules/user-management/domain/interfaces/IUserManagementRepository";
import { useToast } from "@/modules/toast";

/**
 * ProfilePage props
 */
interface ProfilePageProps {
  /**
   * User data from server-side authentication
   */
  userData?: any;
}

/**
 * ProfilePage Component
 * Handles profile view and updates
 */
export function ProfilePage({ userData }: ProfilePageProps) {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const { updateUser } = useUserManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Client-side auth check as fallback in case server-side auth fails
  useEffect(() => {
    // Skip client-side check if we already have userData from server
    if (userData) return;

    // Only check after loading completes
    if (!isLoading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.push("/login");
      }
    }
  }, [isLoading, user, router, userData]);

  // Show loading while checking auth
  if (isLoading && !userData) {
    return <Loader label="Loading profile..." />;
  }

  // Use either server-provided userData or client-side user
  const effectiveUser = userData || user;

  // If we don't have a user, show loading or nothing
  if (!effectiveUser) {
    return <Loader label="Authenticating..." />;
  }

  /**
   * Handle profile update
   */
  const handleProfileUpdate = async (data: UpdateUserData) => {
    try {
      setIsSubmitting(true);
      await updateUser(effectiveUser.id, data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProfileTemplate
      user={effectiveUser}
      onUpdateProfile={handleProfileUpdate}
      isSubmitting={isSubmitting}
    />
  );
}
