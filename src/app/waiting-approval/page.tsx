"use client";

import { Button } from "@/presentation/atoms/auth/Button/Button";
import { useRouter } from "next/navigation";
import { useLogout, useAuth } from "@/modules/auth";
import { useToast } from "@/modules/toast";
import { HiClock } from "react-icons/hi";
import { useEffect } from "react";
import { UserStatus } from "@/modules/auth/domain/enums";
import { Loader } from "@/presentation/atoms/common";

export default function WaitingApprovalPage() {
  const router = useRouter();
  const { logout, isLoading: logoutLoading } = useLogout();
  const { user, isLoading: authLoading } = useAuth();
  const toast = useToast();

  // Redirect approved users to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      // If user is approved, redirect to dashboard
      if (user.approvalStatus === UserStatus.APPROVED) {
        router.push("/dashboard");
        toast.info("Your account has been approved!");
      }
      // If user is rejected (implementing this to handle possible rejected state)
      else if (user.approvalStatus === UserStatus.REJECTED) {
        // We still allow them to see this page but with a different message
        toast.error(
          "Your account registration has been rejected. Please contact support."
        );
      }
    }
  }, [user, authLoading, router, toast]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return <Loader label="Checking account status..." />;
  }

  // Only render the page content if user exists and is not approved
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-teal-50 shadow-inner">
            <HiClock className="h-14 w-14 text-teal-500 animate-pulse" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {user?.approvalStatus === UserStatus.REJECTED
              ? "Account Registration Rejected"
              : "Account Pending Approval"}
          </h2>
          <p className="mt-3 text-gray-600">
            {user?.approvalStatus === UserStatus.REJECTED
              ? "Unfortunately, your account registration has been rejected. Please contact support for more information."
              : "Your account is currently under review. You'll be notified via email when it's approved."}
          </p>
        </div>

        <div className="mt-8 flex flex-col">
          {user?.approvalStatus === UserStatus.PENDING && (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
              <p className="text-amber-800 text-sm">
                <span className="font-semibold block mb-1">
                  What happens next?
                </span>
                Our team is reviewing your application. This typically takes 1-2
                business days.
              </p>
            </div>
          )}

          {user?.approvalStatus === UserStatus.REJECTED && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
              <p className="text-red-800 text-sm">
                <span className="font-semibold block mb-1">
                  Need assistance?
                </span>
                If you believe this is an error or need more information, please
                contact our support team.
              </p>
            </div>
          )}

          <Button
            onClick={handleLogout}
            variant="primary"
            size="lg"
            fullWidth
            isLoading={logoutLoading}
            disabled={logoutLoading}
            className="rounded-lg shadow-sm"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
