"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainNavigation } from "@/presentation/templates/navigation/MainNavigation";
import Footer from "@/presentation/organisms/common/Footer";
import { useAuth, useLogout } from "@/modules/auth";
import { Loader } from "@/presentation/atoms/common";

// Profile layout component
export default function ProfileLayout({ children }: { children: ReactNode }) {
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
  if (!user) {
    // If we've tried authentication and failed, let middleware handle redirect
    if (hasAttemptedAuth && !user) {
      return null;
    }

    // For non-authenticated users, redirect to login
    router.push("/login");
    return null;
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
