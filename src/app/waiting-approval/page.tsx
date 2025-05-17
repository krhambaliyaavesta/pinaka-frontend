"use client";

import { Button } from "@/presentation/atoms/auth/Button/Button";
import { useRouter } from "next/navigation";
import { useLogout } from "@/modules/auth";
import { useToast } from "@/modules/toast";

export default function WaitingApprovalPage() {
  const router = useRouter();
  const { logout, isLoading } = useLogout();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Account Pending Approval
          </h2>
          <p className="mt-2 text-gray-600">
            Your account is currently pending approval from an administrator.
            You will be notified when your account is approved.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="bg-yellow-100 p-4 rounded-lg w-full mb-6">
            <p className="text-yellow-800 text-center">
              Please check your email for updates on your account status or
              contact your team administrator.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-600 text-white mt-4 rounded-full w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
