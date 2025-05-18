import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AnalyticsDashboardPage } from "@/presentation/pages/analytics";

/**
 * Server-side authentication check for the analytics page
 */
async function checkAuth() {
  // Get the cookies using the correct async API
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  if (!authToken || !authToken.value) {
    // No auth token, redirect to login
    redirect("/login");
  }

  // Verify the auth token with the backend
  try {
    // Clean up the API URL to remove any trailing % if it exists
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL?.replace(/%$/, "") ||
      "https://pinaka.onrender.com";

    const response = await fetch(`${apiUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      // Token invalid or expired
      console.error(`Authentication failed with status: ${response.status}`);
      redirect("/login");
    }

    const responseData = await response.json();
    console.log("Auth response data:", responseData);

    // Check for success status and data existence with correct structure
    if (
      responseData.status !== "success" ||
      !responseData.data ||
      !responseData.data.id
    ) {
      console.error("Invalid response format:", responseData);
      redirect("/login");
    }

    // Check if user has admin or lead role
    const userRole = responseData.data.role;
    if (userRole !== 2 && userRole !== 1) {
      // User is not an admin or lead, redirect to home
      console.log("User not authorized for analytics: ", userRole);
      redirect("/");
    }

    // Return the user data for use in the component
    return responseData.data;
  } catch (error) {
    // Error during verification
    console.error("Auth error:", error);
    // Continue with client-side rendering and let the client handle auth
    return null;
  }
}

/**
 * Analytics Page (App Router)
 * Server component that handles authentication and then renders the client-side analytics page
 */
export default async function AnalyticsPage() {
  // Check auth before rendering the page
  const user = await checkAuth();

  // Use the client component from the presentation layer - it will handle client-side auth if server auth failed
  return <AnalyticsDashboardPage userData={user} />;
}
