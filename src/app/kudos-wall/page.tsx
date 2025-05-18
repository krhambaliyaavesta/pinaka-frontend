import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { KudosCardsSection } from "@/presentation/templates/common/KudosCardsSection";

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
 * Kudos Wall Page
 * Protected with server-side authentication
 */
export default async function KudosWallPage() {
  // Check auth before rendering the page
  await checkAuth();

  return (
    <div className="space-y-6">
      <KudosCardsSection
        title="Kudos Cards"
        description="Select a card to send recognition and appreciation to your teammates."
      />
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Celebrate small wins, build big success</p>
      </div>
    </div>
  );
}
