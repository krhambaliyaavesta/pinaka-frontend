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
 * Analytics Page (App Router)
 * Server component that handles authentication and then renders the client-side analytics page
 */
export default async function AnalyticsPage() {
  // Check auth before rendering the page
  const user = await checkAuth();

  // Use the client component from the presentation layer
  return <AnalyticsDashboardPage userData={user} />;
}
