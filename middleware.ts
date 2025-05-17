import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
// Only "/" and "/login" are public routes where both sign-up and sign-in will be managed
const publicRoutes = ["/", "/login"];

// Route that only pending/rejected users should see
const pendingRoute = "/waiting-approval";

// Protected routes that require authentication
// NOTE: Paths in Next.js App Router are relative to the src/app directory
// Adding both exact path and path/ to ensure all formats are matched
const protectedRoutes = [
  "/analytics",
  "/dashboard",
  "/kudos-wall",
  "/analytics/",
  "/dashboard/",
  "/kudos-wall/",
];

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

  console.log(`Middleware processing path: ${pathname}`);

  // More explicit check for protected routes
  const isExplicitlyProtected = protectedRoutes.some((route) => {
    // Exact match or starts with route/
    const exactMatch = pathname === route;
    const startMatch = pathname.startsWith(`${route}/`);
    const isMatch = exactMatch || startMatch;
    console.log(
      `Route check: "${pathname}" matches protected "${route}"? ${isMatch} (exact: ${exactMatch}, starts: ${startMatch})`
    );
    return isMatch;
  });

  // Check if auth cookie exists
  const authToken = request.cookies.get("auth_token")?.value;

  if (isExplicitlyProtected) {
    if (!authToken) {
      console.log(
        `Middleware: Protected route ${pathname} accessed without auth token`
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // For protected routes, continue with validation
    try {
      // Verify user and get their role (server-side API call)
      console.log(`Middleware: Verifying token for ${pathname}`);
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
        console.log(
          `Middleware: Token validation failed with status ${response.status}`
        );
        const redirectResponse = NextResponse.redirect(
          new URL("/login", request.url)
        );
        // Clear the invalid token cookie
        redirectResponse.cookies.delete("auth_token");
        return redirectResponse;
      }

      const responseData = await response.json();

      // Check for success status and data existence
      if (responseData.status !== "success" || !responseData.data) {
        console.log(`Middleware: Invalid response data structure`);
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Extract user from the data field
      const user = responseData.data;
      console.log(
        `Middleware: User verified, role: ${user.role}, status: ${user.approvalStatus}`
      );

      // Approval status checks for protected routes
      if (
        user.approvalStatus === UserStatus.PENDING ||
        user.approvalStatus === UserStatus.REJECTED
      ) {
        // If they're not already on waiting-approval, redirect them there
        if (!pathname.startsWith(pendingRoute)) {
          console.log(`Middleware: Redirecting to waiting approval page`);
          return NextResponse.redirect(new URL(pendingRoute, request.url));
        }
      }

      // User is authenticated and authorized for protected route
      console.log(`Middleware: Access granted to protected route ${pathname}`);
      return NextResponse.next();
    } catch (error: unknown) {
      // Error during verification
      console.error("Auth middleware error:", error);

      // Safely redirect to login and clear token
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // Handle public routes - exact match for root and login
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname === route || pathname.startsWith(`${route}/`);
  });

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For non-explicitly-protected, non-public routes (all other routes)
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token exists for non-protected, non-public route - validate user
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
      const redirectResponse = NextResponse.redirect(
        new URL("/login", request.url)
      );
      redirectResponse.cookies.delete("auth_token");
      return redirectResponse;
    }

    const responseData = await response.json();
    if (responseData.status !== "success" || !responseData.data) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

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

    // User is authenticated and authorized
    return NextResponse.next();
  } catch (error: unknown) {
    // Error during verification

    // Safely redirect to login and clear token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
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
