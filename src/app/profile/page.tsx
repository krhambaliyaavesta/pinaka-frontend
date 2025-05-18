import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/presentation/pages/profile";

/**
 * Server-side authentication check for the profile page
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
    // Clean up the API URL to remove any trailing characters properly
    let apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://pinaka.onrender.com";
    // Remove any trailing % or / characters
    apiUrl = apiUrl.replace(/[%/]+$/, "");

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

    // Check for success status and data existence with correct structure
    if (
      responseData.status !== "success" ||
      !responseData.data ||
      !responseData.data.id
    ) {
      console.error("Invalid response format:", responseData);
      redirect("/login");
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
 * Profile Page (App Router)
 * Server component that handles authentication and then renders the client-side profile page
 */
export default async function UserProfilePage() {
  // Check auth before rendering the page
  const user = await checkAuth();

  // Use the client component from the presentation layer - it will handle client-side auth if server auth failed
  return <ProfilePage userData={user} />;
}
