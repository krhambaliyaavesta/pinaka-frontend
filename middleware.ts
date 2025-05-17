import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
// Only "/" and "/login" are public routes where both sign-up and sign-in will be managed
const publicRoutes = ["/", "/login"];

// Route that only pending/rejected users should see
const pendingRoute = "/waiting-approval";

// Role-specific route prefixes
const adminRoutes = ["/admin"];
const leadRoutes = ["/leads"];

// User status enum (matching the one in the application)
enum UserStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if auth cookie exists
  const authToken = request.cookies.get("auth_token")?.value;

  if (!authToken) {
    // No auth token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify user and get their role (server-side API call)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      // Token invalid or expired
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const responseData = await response.json();

    // Check for success status and data existence
    if (responseData.status !== "success" || !responseData.data) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Extract user from the data field
    const user = responseData.data;

    // === ADDED: Route protection based on approval status ===

    // Redirect pending/rejected users to waiting-approval page
    if (
      user.approvalStatus === UserStatus.PENDING ||
      user.approvalStatus === UserStatus.REJECTED
    ) {
      // If they're not already on waiting-approval, redirect them there
      if (!pathname.startsWith(pendingRoute)) {
        return NextResponse.redirect(new URL(pendingRoute, request.url));
      }

      // Allow them to access waiting-approval
      return NextResponse.next();
    }

    // Prevent approved users from accessing waiting-approval
    if (
      user.approvalStatus === UserStatus.APPROVED &&
      pathname.startsWith(pendingRoute)
    ) {
      // Redirect to dashboard if they try to access waiting-approval
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // === END ADDED SECTION ===

    // Role-based route protection
    if (
      adminRoutes.some((route) => pathname.startsWith(route)) &&
      user.role !== 1
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (
      leadRoutes.some((route) => pathname.startsWith(route)) &&
      user.role > 2
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error: unknown) {
    // Error during verification
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. All files in the public folder
     */
    "/((?!api|_next|static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
