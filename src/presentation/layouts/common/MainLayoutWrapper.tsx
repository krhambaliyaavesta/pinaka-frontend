"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

/**
 * A wrapper component that conditionally applies the MainLayout
 * based on the current route. Some routes have their own layout
 * and should not use the main header/footer.
 */
const MainLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  // Check if current path is one that should not use MainLayout
  // These paths have their own custom layouts
  const excludedPaths = [
    "/login",
    "/dashboard",
    "/waiting-approval",
    "/kudos-wall",
  ];

  // Check if current path starts with any of the excluded paths
  const shouldExcludeLayout = excludedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldExcludeLayout) {
    return <>{children}</>;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default MainLayoutWrapper;
