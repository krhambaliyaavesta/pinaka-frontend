"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/presentation/organisms/common/Footer";
import { useAuth, useLogout } from "@/modules/auth";
import { UserStatus } from "@/modules/auth/domain/enums";
import { Loader } from "@/presentation/atoms/common";
import { MainNavigation } from "@/presentation/templates/navigation/MainNavigation";

// Main layout component
export default function MemberDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const { logout } = useLogout();
  const [hasAttemptedAuth, setHasAttemptedAuth] = useState(false);
  const containerWidthClass = "w-full max-w-screen-2xl";

  // Redirect to login if not authenticated, but only if we've completed loading
  useEffect(() => {
    if (!isLoading) {
      setHasAttemptedAuth(true);

      // Only redirect if we've confirmed the user is not authenticated
      if (user === null) {
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return <Loader />;
  }

  // Show a guest view if we're still waiting on auth or user isn't approved
  if (!user || user.approvalStatus !== UserStatus.APPROVED) {
    // If we've tried authentication and failed, let middleware handle redirect
    if (hasAttemptedAuth && !user) {
      return null;
    }

    // For non-approved users, show a basic view
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFDF5]">
        {/* Guest view doesn't need navigation */}
        <main
          className={`flex-grow ${containerWidthClass} !w-full !container mx-auto px-6 md:px-9 py-6`}
        >
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to Kudos Wall</h1>
            <p className="mb-4">Please login to see personalized content.</p>
          </div>
          {children}
        </main>
        <Footer contained={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12 -z-10 hidden md:block"></div>
      <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm -z-10 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#42B4AC] opacity-40 rounded-md transform rotate-45 -z-10 hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-4 h-16 bg-[#42B4AC] opacity-30 rounded-sm transform -rotate-12 -z-10 hidden lg:block"></div>

      <MainNavigation
        user={{
          fullName: user.fullName,
          role: user.isAdmin() ? "Admin" : user.isLead() ? "Lead" : "Member",
          imageUrl: undefined,
          isAdmin: user.isAdmin(),
          isLead: user.isLead(),
        }}
        onLogout={logout}
      />

      <main
        className={`flex-grow ${containerWidthClass} mx-auto px-6 md:px-9 py-6 relative`}
      >
        {children}
      </main>

      <Footer contained={true} />
    </div>
  );
}
