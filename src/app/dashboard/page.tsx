import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { UserRole } from "@/modules/auth/domain/enums";

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
 * Dashboard Page
 * Protected with server-side authentication
 */
export default async function DashboardPage() {
  // Check auth before rendering the page
  const user = await checkAuth();

  // Get user name safely
  const userName = user?.fullName || user?.name || user?.email || "User";

  // Determine if user is admin
  const isAdmin = user?.role === UserRole.ADMIN;

  // Set role-specific text
  const roleText = isAdmin ? "Admin" : "Lead";

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-teal-800 mb-2">
          Welcome, {userName}!
        </h1>
        <p className="text-teal-700">
          This is your {roleText} dashboard where you can manage user approvals
          {isAdmin && ", assign roles"} and access other administrative
          features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/users"
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <FaUsers className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                User Approval
              </h2>
              <p className="text-gray-600">
                Review{isAdmin && ", assign roles,"} and manage pending user
                registrations
              </p>
            </div>
          </div>
        </Link>

        {/* Additional dashboard cards can be added here */}
      </div>
    </div>
  );
}
