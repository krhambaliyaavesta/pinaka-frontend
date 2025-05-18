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
    redirect("/kudos-wall");
  } else {
    redirect("/login");
  }
}

export default async function LoginPage() {
  // Check if user is already authenticated
  await checkAlreadyAuthenticated();

  // If not authenticated, show login page
  return <SigninSignUp initialView="signin" />;
}
