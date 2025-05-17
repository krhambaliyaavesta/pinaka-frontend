# Route Protection with JWT and Next.js Middleware

This document outlines the implementation of protected routes in our Next.js application using JWT authentication and middleware.

## Overview

Our application uses a role-based access control system with JWT tokens and Next.js middleware to protect routes based on user roles. The middleware intercepts requests, verifies JWT tokens, and redirects users based on their role, status, and the requested resource.

## User Roles and Status

As defined in the [User Roles Specification](../../features/authentication/user_roles_spec.md), our system has:

### Roles:

1. **Admin** - Can access all routes
2. **Lead** - Can access lead and member routes
3. **Member** - Can only access member routes

### Status:

1. **Approved** - User has been approved and can access role-specific routes
2. **Pending** - User is awaiting approval and can only access the waiting approval page
3. **Rejected** - User's request has been rejected

This separation of role and status provides a clearer data model and more flexibility.

## Token Storage

We store JWT tokens in HTTP-only cookies rather than localStorage for several important security reasons:

### Why HTTP-only Cookies?

1. **Protection Against XSS Attacks**: HTTP-only cookies cannot be accessed by JavaScript, protecting tokens from cross-site scripting (XSS) attacks. In contrast, tokens stored in localStorage are accessible to any JavaScript running on the page.

2. **Automatic CSRF Protection**: When combined with SameSite cookie attributes (set to 'Lax' or 'Strict'), HTTP-only cookies provide protection against Cross-Site Request Forgery (CSRF) attacks.

3. **Automatic Transmission**: Cookies are automatically sent with every request to the domain, simplifying authentication logic.

4. **Server Control**: The server can invalidate sessions by setting an expired cookie, which isn't possible with localStorage.

### Cookie Configuration

Our cookies are configured with the following security settings:

```typescript
// Example of setting the auth cookie in an API route
res.setHeader("Set-Cookie", [
  `auth_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${
    60 * 60 * 24 * 7
  }`,
]);
```

- **HttpOnly**: Prevents JavaScript access
- **Secure**: Ensures the cookie is only sent over HTTPS
- **SameSite=Lax**: Provides CSRF protection while allowing links from external sites
- **Path=/**: Applies to all routes
- **Max-Age**: Sets expiration (example: 7 days)

## Middleware Implementation

The middleware runs on the server side before a request is completed and handles:

1. JWT token extraction and verification
2. User role and status determination
3. Route access control based on role and status
4. Redirection to appropriate pages when unauthorized

### Implementation Details

```typescript
// middleware.ts (in project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // For JWT verification

// Secret key for JWT verification - should match backend
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// User roles
enum UserRole {
  ADMIN = "admin",
  LEAD = "lead",
  MEMBER = "member",
}

// User status
enum UserStatus {
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
}

interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  team?: string;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Public routes - allow access without authentication
  if (path === "/login" || path === "/register" || path === "/") {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    url.pathname = "/login";
    url.search = `?redirect=${encodeURIComponent(path)}`;
    return NextResponse.redirect(url);
  }

  try {
    // Verify JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const user = payload as unknown as UserPayload;

    // Redirect pending/rejected users to waiting approval page
    if (user.status !== UserStatus.APPROVED) {
      if (!path.startsWith("/waiting-approval")) {
        url.pathname = "/waiting-approval";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // For approved users, check role-based access
    if (path.startsWith("/admin") && user.role !== UserRole.ADMIN) {
      // Only admin can access admin routes
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (
      path.startsWith("/lead") &&
      ![UserRole.ADMIN, UserRole.LEAD].includes(user.role)
    ) {
      // Only admin and lead can access lead routes
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    if (
      path.startsWith("/member") &&
      ![UserRole.ADMIN, UserRole.LEAD, UserRole.MEMBER].includes(user.role)
    ) {
      // Only valid roles can access member routes
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    // Add user info to request headers so pages can access it
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-role", user.role);
    requestHeaders.set("x-user-status", user.status);
    requestHeaders.set("x-user-email", user.email);
    if (user.team) {
      requestHeaders.set("x-user-team", user.team);
    }

    // Continue with added user context
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Invalid or expired token
    // Clear the invalid token
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

// Configure which paths middleware runs on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Route Structure

Our application routes are organized by user role:

### Public Routes

- `/login` - User login
- `/register` - User registration
- `/` - Landing page

### Status-Specific Routes

- `/waiting-approval` - Page shown to users awaiting approval or rejected users

### Member Routes (Requires approved status)

- `/member/dashboard` - Member dashboard
- `/member/kudos` - View kudos

### Lead Routes (Requires approved status)

- `/lead/dashboard` - Lead dashboard
- `/lead/kudos` - View kudos
- `/lead/kudos/create` - Create kudos
- `/lead/approvals` - Member approval interface

### Admin Routes (Requires approved status)

- `/admin/dashboard` - Admin dashboard
- `/admin/approvals` - Lead approval interface
- All lead and member routes

## JWT Structure

The backend should provide JWT tokens with the following payload structure:

```json
{
  "id": "user-uuid",
  "email": "user@company.com",
  "role": "admin|lead|member",
  "status": "approved|pending|rejected",
  "team": "team-name", // Optional, for members
  "iat": 1636978614, // Issued at timestamp
  "exp": 1636982214 // Expiration timestamp
}
```

## Approval Process

1. **User Registration**:

   - User registers with desired role (member or lead)
   - Backend creates user with selected role but "pending" status
   - JWT token includes role and "pending" status

2. **Approval Flow**:

   - Admin approves lead requests by changing status to "approved"
   - Lead approves member requests by changing status to "approved" and assigning team
   - Status change happens via API endpoints, not by changing roles

3. **Access Control**:
   - Users with "pending" or "rejected" status can only access the waiting approval page
   - Only users with "approved" status can access role-specific routes

## Client-Side Authentication Context

While middleware handles route protection, we also implement a client-side authentication context:

```typescript
// src/modules/auth/infrastructure/providers/AuthProvider.tsx
```

This context provides:

- User state management
- Login/logout functionality
- Registration handling
- Role and status-based redirects

## Backend Requirements

The backend should provide:

1. **Authentication Endpoints**:

   - `POST /api/auth/login` - Takes email/password, returns JWT token
   - `POST /api/auth/register` - Creates new user with selected role and "pending" status
   - `POST /api/auth/refresh` - Refresh token endpoint for extending sessions

2. **JWT Configuration**:

   - Shared JWT secret or public/private key pair
   - Token expiration time
   - Refresh token mechanism

3. **User Management Endpoints**:
   - `GET /api/users/me` - Get current user information
   - `PUT /api/users/approve/:userId` - For approving users (changes status to "approved")
   - `PUT /api/users/reject/:userId` - For rejecting users (changes status to "rejected")
   - `GET /api/users/pending` - List pending approval users
   - `PUT /api/users/team/:userId` - For assigning teams to members

## Security Considerations

1. **JWT Storage**: Store tokens in HTTP-only cookies, not localStorage or sessionStorage
2. **Cookie Attributes**:
   - Use HttpOnly to prevent JavaScript access
   - Use Secure flag to ensure HTTPS-only transmission
   - Use SameSite attribute to prevent CSRF attacks
3. **Token Expiration**: Implement short expiration times with refresh token rotation
4. **CSRF Protection**: For mutation operations, implement additional CSRF tokens
5. **HTTPS**: Use HTTPS for all communication
6. **Input Validation**: Validate user input to prevent injection attacks
7. **Rate Limiting**: Implement rate limiting for authentication endpoints

## Implementation Notes

1. The middleware configuration should exclude API routes and static assets
2. The JWT secret should be stored in environment variables
3. Consider implementing refresh token rotation for enhanced security
4. User management interfaces should validate authorization server-side as well
5. Status changes should generate new JWT tokens with updated status
6. The waiting approval page should show different messages based on status (pending vs. rejected)
7. Always use the `credentials: 'include'` option with fetch for authenticated requests
