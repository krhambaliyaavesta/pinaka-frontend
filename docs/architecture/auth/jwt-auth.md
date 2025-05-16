# JWT Authentication in Clean Architecture

This document outlines a simplified approach for JWT-based authentication in our application following Clean Architecture principles.

## Overview

JSON Web Tokens (JWT) will be used for basic authentication, with the backend providing the necessary endpoints and token structure. This document explains how authentication works across each architectural layer.

## Architecture Layers

### Domain Layer

**Entities & Interfaces:**

- `User` entity with basic properties (id, email, name)
- `AuthToken` value object containing token data
- Core interfaces for authentication services

```typescript
// Domain definitions
interface IAuthService {
  validateToken(token: string): Promise<boolean>;
}

interface ITokenService {
  verifyToken(token: string): Promise<DecodedToken | null>;
  extractUserInfo(token: string): Promise<User | null>;
}

interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
}

// Value objects
class AuthToken {
  constructor(
    public readonly token: string,
    public readonly expiresAt: Date,
    public readonly refreshToken?: string
  ) {}

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
```

### Application Layer

**Use Cases & Services:**

- `LoginUseCase` - handles user authentication
- `LogoutUseCase` - handles user logout
- `VerifyTokenUseCase` - validates token and extracts user info
- `RefreshTokenUseCase` - handles token refresh when expired
- React hooks for UI components

```typescript
// Application layer
class LoginUseCase {
  constructor(
    private authService: IAuthService,
    private tokenStorage: ITokenStorage
  ) {}

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    try {
      const authResult = await this.authService.login(credentials);
      if (authResult.success) {
        await this.tokenStorage.storeTokens(
          new AuthToken(
            authResult.token,
            authResult.expiresAt,
            authResult.refreshToken
          )
        );
        return { success: true, user: authResult.user };
      }
      return { success: false, error: authResult.error };
    } catch (error) {
      return { success: false, error: "Authentication failed" };
    }
  }
}

// React hook for components
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const verifyTokenUseCase = AuthModule.createVerifyTokenUseCase();
      const currentUser = await verifyTokenUseCase.execute();

      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const loginUseCase = AuthModule.createLoginUseCase();
    const result = await loginUseCase.execute(credentials);

    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
    }

    return result;
  };

  const logout = async () => {
    const logoutUseCase = AuthModule.createLogoutUseCase();
    await logoutUseCase.execute();

    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
```

### Infrastructure Layer

**Implementation Details:**

- `JwtTokenService` - implements token validation and decoding
- `ApiAuthService` - communicates with backend APIs
- `TokenStorage` - handles token persistence

```typescript
// Infrastructure layer
class JwtTokenService implements ITokenService {
  verifyToken(token: string): Promise<DecodedToken | null> {
    try {
      // In client-side applications, we typically don't verify the signature
      // since we don't have the secret, but we can check structure and expiration
      const decoded = decodeJwt(token); // Just decode, don't verify signature

      if (!decoded || !decoded.exp) {
        return Promise.resolve(null);
      }

      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      if (Date.now() >= expirationTime) {
        return Promise.resolve(null); // Token expired
      }

      return Promise.resolve(decoded);
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  extractUserInfo(token: string): Promise<User | null> {
    try {
      const decoded = decodeJwt(token);
      if (!decoded) return Promise.resolve(null);

      return Promise.resolve({
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
      });
    } catch (error) {
      return Promise.resolve(null);
    }
  }
}

class LocalStorageTokenStorage implements ITokenStorage {
  storeTokens(authToken: AuthToken): void {
    localStorage.setItem("auth_token", authToken.token);

    if (authToken.refreshToken) {
      localStorage.setItem("refresh_token", authToken.refreshToken);
    }

    localStorage.setItem("token_expiry", authToken.expiresAt.toISOString());
  }

  getAuthToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  clearTokens(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
  }
}

class ApiAuthService implements IAuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: ITokenService,
    private tokenStorage: ITokenStorage
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const response = await this.httpClient.post(
        "/api/auth/login",
        credentials
      );
      return {
        success: true,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        expiresAt: new Date(response.data.expiresAt),
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  }

  async validateToken(token: string): Promise<boolean> {
    return !!(await this.tokenService.verifyToken(token));
  }

  async refreshToken(): Promise<AuthResult> {
    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      return { success: false, error: "No refresh token available" };
    }

    try {
      const response = await this.httpClient.post("/api/auth/refresh", {
        refreshToken,
      });
      return {
        success: true,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        expiresAt: new Date(response.data.expiresAt),
        user: response.data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: "Token refresh failed",
      };
    }
  }
}
```

### Presentation Layer

**UI Components:**

- Login/Registration forms
- Protected route components

```tsx
// Presentation layer (following Atomic Design)

// Atoms
const LoginButton = ({ onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="rounded-md bg-primary px-4 py-2 text-white"
  >
    {isLoading ? "Logging in..." : "Log in"}
  </button>
);

// Molecules
const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <LoginButton onClick={handleSubmit} isLoading={isLoading} />
    </form>
  );
};

// Organisms
const LoginContainer = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await login(credentials);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
    </div>
  );
};

// Higher-order component for protected routes
const withAuth = (Component) => {
  return function ProtectedRoute(props) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // Will redirect in useEffectz
    }

    return <Component {...props} />;
  };
};

// Pages
const LoginPage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <LoginContainer />
  </div>
);

const DashboardPage = withAuth(() => (
  <div>
    <h1>Dashboard</h1>
    {/* Dashboard content */}
  </div>
));
```

## Module Factory

The AuthModule factory provides centralized access to authentication components:

```typescript
// AuthModule.ts
export class AuthModule {
  private static tokenService: ITokenService | null = null;
  private static authService: IAuthService | null = null;
  private static tokenStorage: ITokenStorage | null = null;

  static getTokenService(): ITokenService {
    if (!this.tokenService) {
      this.tokenService = new JwtTokenService();
    }
    return this.tokenService;
  }

  static getTokenStorage(): ITokenStorage {
    if (!this.tokenStorage) {
      this.tokenStorage = new LocalStorageTokenStorage();
    }
    return this.tokenStorage;
  }

  static getAuthService(): IAuthService {
    if (!this.authService) {
      this.authService = new ApiAuthService(
        axios,
        this.getTokenService(),
        this.getTokenStorage()
      );
    }
    return this.authService;
  }

  static createLoginUseCase(): LoginUseCase {
    return new LoginUseCase(this.getAuthService(), this.getTokenStorage());
  }

  static createLogoutUseCase(): LogoutUseCase {
    return new LogoutUseCase(this.getTokenStorage());
  }

  static createVerifyTokenUseCase(): VerifyTokenUseCase {
    return new VerifyTokenUseCase(
      this.getTokenService(),
      this.getTokenStorage()
    );
  }

  static createRefreshTokenUseCase(): RefreshTokenUseCase {
    return new RefreshTokenUseCase(
      this.getAuthService(),
      this.getTokenStorage()
    );
  }

  // For testing purposes
  static reset(): void {
    this.tokenService = null;
    this.authService = null;
    this.tokenStorage = null;
  }
}
```

## Data Flow

### Authentication Flow

1. User enters credentials in LoginForm component (Presentation Layer)
2. LoginContainer component's handleLogin method is called (Presentation Layer)
3. useAuth hook's login method is called (Application Layer)
4. LoginUseCase is created via AuthModule factory and executed (Application Layer)
5. ApiAuthService calls backend API endpoint (Infrastructure Layer)
6. Backend validates credentials and returns JWT token
7. TokenStorage stores the JWT (Infrastructure Layer)
8. User state is updated and UI reflects authenticated state (Presentation Layer)

### Token Refresh Flow

1. API request fails due to expired token (Infrastructure Layer)
2. HTTP interceptor catches 401 error (Infrastructure Layer)
3. RefreshTokenUseCase is triggered (Application Layer)
4. ApiAuthService requests new token using refresh token (Infrastructure Layer)
5. TokenStorage updates stored tokens (Infrastructure Layer)
6. Original API request is retried with new token (Infrastructure Layer)

## Requirements from Backend Team

1. **API Endpoints:**

   - `/api/auth/login` - Accepts credentials, returns JWT token
   - `/api/auth/refresh` - Accepts refresh token, returns new JWT token
   - `/api/auth/logout` - Optional endpoint to invalidate tokens server-side

2. **Token Structure:**

   - Standard JWT with payload containing:
     - `sub` (subject): User ID
     - `email`: User email
     - `name`: User name
     - `exp`: Expiration timestamp
     - `iat`: Issued at timestamp

3. **Security Considerations:**
   - Token should be short-lived (15-60 minutes)
   - Use refresh tokens for obtaining new access tokens
   - Consider using localStorage for simplicity (or cookies for better security)

## Implementation Recommendations

1. Set up HTTP interceptors to add the token to all API requests
2. Implement automatic token refresh when tokens expire
3. Create a simple withAuth HOC to protect private routes
4. Add a loading state to handle initial authentication check
