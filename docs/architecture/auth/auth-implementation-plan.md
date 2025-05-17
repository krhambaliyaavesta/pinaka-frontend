# Auth Implementation Plan

This document outlines a clear, modular approach to implementing authentication and route protection in our Next.js application following Clean Architecture principles.

## Core Security Approach

1. **HTTP-Only Cookies** - JWT tokens stored exclusively in HTTP-only cookies
2. **Server-Side Verification** - No client-side JWT validation
3. **Next.js Middleware** - Route protection without exposing secrets

## Auth Module Structure

```
src/modules/auth/
├── domain/                       # Business entities and rules
│   ├── entities/User.ts          # User entity with roles
│   ├── enums/                    # UserRole, UserStatus enums
│   ├── interfaces/               # Repository and Service interfaces
│   └── errors/                   # Domain-specific errors
├── application/                  # Use cases
│   ├── services/AuthService.ts   # Business logic implementation
│   └── usecases/                 # Individual use cases (Login, Register, etc.)
├── infrastructure/               # External implementations
│   └── repositories/             # API client implementation
└── AuthModule.ts                 # Module factory with dependency injection
```

## Implementation Steps

Update authentication documentation and enhance user roles specification

#### 1.1 Create basic enums and entities

```typescript
// src/modules/auth/domain/enums/UserRole.ts
export enum UserRole {
  ADMIN = 1,
  LEAD = 2,
  MEMBER = 3,
}

// src/modules/auth/domain/enums/UserStatus.ts
export enum UserStatus {
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
}

// src/modules/auth/domain/entities/User.ts
import { UserRole, UserStatus } from "../enums";

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: UserRole,
    public readonly status: UserStatus,
    public readonly createdAt: Date
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isLead(): boolean {
    return this.role === UserRole.LEAD;
  }

  isMember(): boolean {
    return this.role === UserRole.MEMBER;
  }
}
```

#### 1.2 Define core interfaces

```typescript
// src/modules/auth/domain/interfaces/IAuthRepository.ts
import { User } from "../entities/User";

export interface RegisterUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<User>;
  register(userData: RegisterUserDto): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}

// src/modules/auth/domain/interfaces/IAuthService.ts
import { User } from "../entities/User";
import { RegisterUserDto } from "./IAuthRepository";

export interface IAuthService {
  login(email: string, password: string): Promise<User>;
  register(userData: RegisterUserDto): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}
```

#### 1.3 Define domain errors

```typescript
// src/modules/auth/domain/errors/AuthErrors.ts
export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = "Invalid credentials", cause?: Error) {
    super(message, "AUTH_INVALID_CREDENTIALS", cause);
  }
}

export class UserNotFoundError extends AuthError {
  constructor(message = "User not found", cause?: Error) {
    super(message, "AUTH_USER_NOT_FOUND", cause);
  }
}

export class RegistrationError extends AuthError {
  constructor(message = "Registration failed", cause?: Error) {
    super(message, "AUTH_REGISTRATION_FAILED", cause);
  }
}

export class AuthorizationError extends AuthError {
  constructor(message = "Not authorized", cause?: Error) {
    super(message, "AUTH_NOT_AUTHORIZED", cause);
  }
}
```

### 2. Infrastructure Layer Implementation

#### 2.1 Implement Repository using core HttpClient

```typescript
// src/modules/auth/infrastructure/repositories/AuthRepository.ts
import { HttpClient } from "../../../../core/infrastructure/http";
import { HttpClientProvider } from "../../../../core/infrastructure/di/HttpClientProvider";
import {
  IAuthRepository,
  RegisterUserDto,
} from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";
import {
  AuthError,
  InvalidCredentialsError,
  UserNotFoundError,
  RegistrationError,
} from "../../domain/errors/AuthErrors";
import {
  AuthenticationError,
  NetworkError,
} from "../../../../core/infrastructure/http";

export class AuthRepository implements IAuthRepository {
  private httpClient: HttpClient;

  constructor() {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(
      process.env.NEXT_PUBLIC_API_URL || "",
      { enableErrorHandling: true }
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await this.httpClient.post<{ user: any }>(
        "/auth/login",
        { email, password }
      );
      return this.mapToUser(response.user);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new InvalidCredentialsError(error.message, error);
      }
      if (error instanceof NetworkError) {
        throw new AuthError(
          "Network error during login",
          "AUTH_NETWORK_ERROR",
          error
        );
      }
      throw new AuthError("Login failed", "AUTH_LOGIN_FAILED", error as Error);
    }
  }

  async register(userData: RegisterUserDto): Promise<User> {
    try {
      const response = await this.httpClient.post<{ user: any }>(
        "/auth/register",
        userData
      );
      return this.mapToUser(response.user);
    } catch (error) {
      throw new RegistrationError(undefined, error as Error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.httpClient.get<{ user: any }>("/auth/me");
      return this.mapToUser(response.user);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return null;
      }
      throw new AuthError(
        "Failed to get user",
        "AUTH_GET_USER_FAILED",
        error as Error
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await this.httpClient.post("/auth/logout", {});
    } catch (error) {
      throw new AuthError(
        "Logout failed",
        "AUTH_LOGOUT_FAILED",
        error as Error
      );
    }
  }

  private mapToUser(data: any): User {
    return new User(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.role,
      data.status,
      new Date(data.createdAt)
    );
  }
}
```

### 3. Application Layer Implementation

#### 3.1 Auth Service

```typescript
// src/modules/auth/application/services/AuthService.ts
import { IAuthService } from "../../domain/interfaces/IAuthService";
import {
  IAuthRepository,
  RegisterUserDto,
} from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";
import { AuthError } from "../../domain/errors/AuthErrors";

export class AuthService implements IAuthService {
  constructor(private repository: IAuthRepository) {}

  async login(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new AuthError(
        "Email and password are required",
        "AUTH_INVALID_INPUT"
      );
    }

    return this.repository.login(email, password);
  }

  async register(userData: RegisterUserDto): Promise<User> {
    // Validate input
    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      throw new AuthError("All fields are required", "AUTH_INVALID_INPUT");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new AuthError("Invalid email format", "AUTH_INVALID_EMAIL");
    }

    // Password validation (min 8 chars)
    if (userData.password.length < 8) {
      throw new AuthError(
        "Password must be at least 8 characters",
        "AUTH_INVALID_PASSWORD"
      );
    }

    return this.repository.register(userData);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.repository.getCurrentUser();
  }

  async logout(): Promise<void> {
    return this.repository.logout();
  }
}
```

#### 3.2 Use Cases

```typescript
// src/modules/auth/application/usecases/LoginUseCase.ts
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { User } from "../../domain/entities/User";

export class LoginUseCase {
  constructor(private authService: IAuthService) {}

  async execute(email: string, password: string): Promise<User> {
    return this.authService.login(email, password);
  }
}

// src/modules/auth/application/usecases/RegisterUseCase.ts
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { RegisterUserDto } from "../../domain/interfaces/IAuthRepository";
import { User } from "../../domain/entities/User";

export class RegisterUseCase {
  constructor(private authService: IAuthService) {}

  async execute(userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }
}

// Additional use cases follow the same pattern...
```

### 4. Module Factory

```typescript
// src/modules/auth/AuthModule.ts
import { AuthRepository } from "./infrastructure/repositories/AuthRepository";
import { AuthService } from "./application/services/AuthService";
import { LoginUseCase } from "./application/usecases/LoginUseCase";
import { RegisterUseCase } from "./application/usecases/RegisterUseCase";
import { GetCurrentUserUseCase } from "./application/usecases/GetCurrentUserUseCase";
import { LogoutUseCase } from "./application/usecases/LogoutUseCase";
import { IAuthRepository } from "./domain/interfaces/IAuthRepository";
import { IAuthService } from "./domain/interfaces/IAuthService";

export class AuthModule {
  private static repository: IAuthRepository;
  private static service: IAuthService;

  static getAuthRepository(): IAuthRepository {
    if (!this.repository) {
      this.repository = new AuthRepository();
    }
    return this.repository;
  }

  static getAuthService(): IAuthService {
    if (!this.service) {
      this.service = new AuthService(this.getAuthRepository());
    }
    return this.service;
  }

  static getLoginUseCase(): LoginUseCase {
    return new LoginUseCase(this.getAuthService());
  }

  static getRegisterUseCase(): RegisterUseCase {
    return new RegisterUseCase(this.getAuthService());
  }

  static getGetCurrentUserUseCase(): GetCurrentUserUseCase {
    return new GetCurrentUserUseCase(this.getAuthService());
  }

  static getLogoutUseCase(): LogoutUseCase {
    return new LogoutUseCase(this.getAuthService());
  }

  // For testing purposes
  static reset(): void {
    this.repository = undefined as any;
    this.service = undefined as any;
  }
}
```

### 5. Next.js Middleware

```typescript
// middleware.ts (in project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Role-specific route prefixes
const adminRoutes = ["/admin"];
const leadRoutes = ["/leads"];

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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
      {
        headers: {
          Cookie: `auth_token=${authToken}`,
        },
      }
    );

    if (!response.ok) {
      // Token invalid or expired
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { user } = await response.json();

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
  } catch (error) {
    // Error during verification
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
```

## Implementation Checklist

- [ ] **Domain Layer**

  - [ ] Enums (UserRole, UserStatus)
  - [ ] User entity
  - [ ] Repository and Service interfaces
  - [ ] Domain errors

- [ ] **Infrastructure Layer**

  - [ ] Auth Repository implementation (using core HttpClient)
  - [ ] Next.js auth middleware

- [ ] **Application Layer**

  - [ ] Auth Service implementation
  - [ ] Login Use Case
  - [ ] Register Use Case
  - [ ] GetCurrentUser Use Case
  - [ ] Logout Use Case

- [ ] **Module Integration**

  - [ ] AuthModule factory
  - [ ] Module exports

- [ ] **Security Features**
  - [ ] HTTP-Only cookies
  - [ ] CSRF protection
  - [ ] Secure cookie flags
  - [ ] SameSite cookie attributes

## Security Considerations

1. **Token Security**

   - Use Secure and HttpOnly flags for cookies
   - Implement appropriate token expiration

2. **Protection Against Common Attacks**

   - Set SameSite=Strict cookie attribute for CSRF protection
   - Implement rate limiting for auth endpoints
   - Use HTTPS for all API requests

3. **Error Handling**
   - Never expose sensitive information in error messages
   - Log authentication failures appropriately
