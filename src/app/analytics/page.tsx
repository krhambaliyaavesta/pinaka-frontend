import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

    // Check for success status and data existence
    if (responseData.status !== "success" || !responseData.data) {
      redirect("/login");
    }

    // Return the user data for use in the component
    return responseData.data;
  } catch (error) {
    // Error during verification
    console.error("Auth error:", error);
    redirect("/login");
  }
}

/**
 * Analytics Page
 * Displays analytics dashboard with various visualizations
 * Only accessible to authenticated users
 */
export default async function AnalyticsPage() {
  // Check auth before rendering the page
  const user = await checkAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600 mb-4">
          Welcome to the Analytics Dashboard, {user.name || user.email}.
        </p>

        <div className="bg-teal-50 p-4 rounded-md border border-teal-100">
          <p className="text-teal-800">
            This page demonstrates server-side authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
