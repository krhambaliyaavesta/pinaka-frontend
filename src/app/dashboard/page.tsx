import { UserRole } from "@/modules/auth/domain/enums";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardContent from "./components/DashboardContent";

/**
 * Server-side authentication check
 */
async function checkAuth() {
  // Get the cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  if (!authToken || !authToken.value) {
    // No auth token, redirect to login
    redirect("/login");
  }

  // Verify the auth token with the backend
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      // Token invalid or expired
      redirect("/login");
    }

    const responseData = await response.json();

    // Check for success status and data existence with correct structure
    if (
      responseData.status !== "success" ||
      !responseData.data ||
      !responseData.data.id
    ) {
      redirect("/login");
    }

    // Return the user data for use in the component
    return responseData.data;
  } catch (error) {
    // Error during verification
    console.error("Auth error:", error);
    redirect("/login"); // Always redirect on error
  }
}

/**
 * Dashboard Page
 * Protected with server-side authentication
 */
export default async function DashboardPage() {
  // Check auth before rendering the page
  const user = await checkAuth();

  // Get role title
  const userName = user?.fullName || user?.name || user?.email || "User";
  // Determine if user is admin
  const isAdmin = user?.role === UserRole.ADMIN;

  return <DashboardContent userName={userName} isAdmin={isAdmin} />;
}
