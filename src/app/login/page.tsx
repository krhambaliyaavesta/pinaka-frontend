import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SigninSignUp } from "@/presentation/pages/auth/SigninSignUp";

/**
 * Authentication check for the login page - redirects to kudos-wall if already authenticated
 */
async function checkAlreadyAuthenticated() {
  // Get the cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  if (authToken && authToken.value) {
    // Verify the auth token with the backend before redirecting
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

      if (response.ok) {
        const responseData = await response.json();

        // Only redirect if the token is actually valid and has the expected structure
        if (
          responseData.status === "success" &&
          responseData.data &&
          responseData.data.id
        ) {
          redirect("/kudos-wall");
        }
      }
    } catch (error) {
      console.error("Auth verification error:", error);
      // Continue to login page if verification fails
    }
  }

  return null;
}

export default async function LoginPage() {
  // Check if user is already authenticated
  await checkAlreadyAuthenticated();

  // If not authenticated, show login page
  return <SigninSignUp initialView="signin" />;
}
