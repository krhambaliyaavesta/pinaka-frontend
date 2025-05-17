"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/presentation/organisms/common/Header";
import Footer from "@/presentation/organisms/common/Footer";
import { useAuth } from "@/modules/auth";
import { UserStatus } from "@/modules/auth/domain/enums";

// Main layout component
export default function MemberDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const containerWidthClass = "max-w-screen-xl";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && (!user || user.approvalStatus !== UserStatus.APPROVED)) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFDF5]">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Don't render the content if not authenticated
  if (!user || user.approvalStatus !== UserStatus.APPROVED) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[#42B4AC] opacity-70 rounded-md transform -rotate-12 -z-10 hidden md:block"></div>
      <div className="absolute bottom-8 right-8 w-20 h-8 bg-[#42B4AC] opacity-70 rounded-sm -z-10 hidden md:block"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#42B4AC] opacity-40 rounded-md transform rotate-45 -z-10 hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-4 h-16 bg-[#42B4AC] opacity-30 rounded-sm transform -rotate-12 -z-10 hidden lg:block"></div>

      <div className="py-4">
        <Header userName={user.fullName} contained={true} />
      </div>

      <main
        className={`flex-grow ${containerWidthClass} mx-auto px-6 md:px-9 py-6 relative`}
      >
        {children}
      </main>

      <Footer contained={true} />
    </div>
  );
}
