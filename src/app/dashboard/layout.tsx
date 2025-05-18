"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth, useLogout } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { Loader } from "@/presentation/atoms/common";
import { MainNavigation } from "@/presentation/templates/navigation/MainNavigation/MainNavigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const { logout } = useLogout();

  useEffect(() => {
    if (isLoading) return;

    if (
      !user ||
      (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN)
    ) {
      console.log(
        "User not authorized for dashboard, redirecting to login",
        user?.role
      );
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loader size="16" />;
  }

  if (!user || (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN)) {
    return null;
  }

  const isAdmin = user.role === UserRole.ADMIN;
  const isLead = user.role === UserRole.LEAD;
  const userRoleDisplay = isAdmin ? "Admin" : "Lead";

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5]">
      <MainNavigation
        user={{
          fullName: user.fullName,
          role: userRoleDisplay,
          imageUrl: undefined,
          isAdmin,
          isLead,
        }}
        onLogout={logout}
      />

      <main className="flex-grow p-4 md:p-6 max-w-screen-xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
