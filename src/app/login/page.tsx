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

  // If auth token exists, verify it and redirect to kudos-wall
  if (authToken && authToken.value) {
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

      // If token is valid, redirect to kudos-wall
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === "success" && responseData.data) {
          redirect("/kudos-wall");
        }
      }
    } catch (error) {
      // If verification fails, continue to login page
      console.error("Auth check error:", error);
    }
  }

  // If no token or invalid token, continue to login page
  return null;
}

export default async function LoginPage() {
  // Check if user is already authenticated
  await checkAlreadyAuthenticated();

  // If not authenticated, show login page
  return <SigninSignUp initialView="signin" />;
}
