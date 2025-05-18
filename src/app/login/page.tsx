"use client";

import { useRouter } from "next/navigation";
import { SigninSignUp } from "@/presentation/pages/auth/SigninSignUp";
import { useEffect, useState } from "react";
import { useAuth } from "@/modules/auth";
import { UserStatus } from "@/modules/auth/domain/enums";

export default function LoginPage() {
  const [initialView, setInitialView] = useState<"signin" | "signup">("signin");
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  // Effect to handle redirection when authenticated and to check local storage
  useEffect(() => {
    // Only redirect if we're not still loading
    if (!isLoading) {
      // Check if user is authenticated and approved
      if (user && user.approvalStatus === UserStatus.APPROVED) {
        router.push("/kudos-wall");
        return;
      }
      
      // Check if we should redirect to waiting approval page
      if (user && user.approvalStatus === UserStatus.PENDING) {
        router.push("/waiting-approval");
        return;
      }
    }
    
    // Check if we should show the signup view based on localStorage
    const storedView = localStorage.getItem("authView");
    if (storedView === "signup") {
      setInitialView("signup");
      // Clear the stored view to prevent it from persisting on page refreshes
      localStorage.removeItem("authView");
    }
  }, [user, isLoading, router]);

  // If we're still loading, return a placeholder (could be improved with a loading spinner)
  if (isLoading) {
    return <div className="min-h-screen bg-[#FFFDF5] flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated or auth check complete, show the login/signup page
  return <SigninSignUp initialView={initialView} />;
}
