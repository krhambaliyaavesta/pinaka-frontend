# Authentication Implementation

This document outlines the implementation of the authentication system in our application, following Clean Architecture principles and integrating with our atomic design-based UI.

## Architecture Overview

The authentication system is implemented following Clean Architecture with the following layers:

1. **Domain Layer** - Core business entities and rules
2. **Application Layer** - Use cases and business logic
3. **Infrastructure Layer** - External implementations (API client)
4. **Presentation Layer** - UI components (based on Atomic Design)

## Domain Layer

### Entities

- **User** - Represents the authenticated user with properties:
  - `id` - Unique identifier
  - `email` - User's email address
  - `firstName` - User's first name
  - `lastName` - User's last name
  - `jobTitle` - User's job title (optional)
  - `role` - User's role (Admin, Lead, Member)
  - `status` - User's status (Approved, Pending, Rejected)
  - `createdAt` - Account creation timestamp

### Enums

- **UserRole** - Defines the possible user roles:

  ```typescript
  enum UserRole {
    ADMIN = 1,
    LEAD = 2,
    MEMBER = 3,
  }
  ```

- **UserStatus** - Defines the possible user statuses:
  ```typescript
  enum UserStatus {
    APPROVED = "approved",
    PENDING = "pending",
    REJECTED = "rejected",
  }
  ```

### Interfaces

- **IAuthRepository** - Defines the contract for data access:

  - `signin(email, password)` - Authenticates a user
  - `signup(userData)` - Registers a new user
  - `getCurrentUser()` - Gets the current authenticated user
  - `logout()` - Logs out the user

- **IAuthService** - Defines the business logic contract:
  - `signin(email, password)` - Handles user login
  - `signup(userData)` - Handles user registration
  - `getCurrentUser()` - Gets current user info
  - `logout()` - Handles user logout

### Domain Errors

- **AuthError** - Base error class for authentication
- **InvalidCredentialsError** - For login failures
- **UserNotFoundError** - When user doesn't exist
- **SignupError** - For registration failures
- **AuthorizationError** - For access permission issues

## Infrastructure Layer

### AuthRepository

Implements the IAuthRepository interface using our core HttpClient:

- Uses the HttpClientProvider to get an HttpClient instance
- Handles API interactions for signin, signup, getCurrentUser, and logout
- Maps API responses to domain entities
- Transforms API errors to domain-specific errors
- Correctly handles the API response format: `{ status: "success", data: { token, user } }`
- Stores JWT token in HTTP-only cookies or secure storage

## Application Layer

### AuthService

Implements IAuthService with business logic:

- Performs input validation (email format, password strength)
- Validates required fields
- Delegates data operations to the repository
- Transforms and handles errors appropriately

### Use Cases

- **SigninUseCase** - Handles user login
- **SignupUseCase** - Handles user registration
- **GetCurrentUserUseCase** - Retrieves current user
- **LogoutUseCase** - Handles user logout

## Module Integration

### AuthModule Factory

Provides centralized access to authentication components:

- Manages singleton instances of repository and service
- Exposes factory methods for use cases
- Handles dependency injection

## Route Protection

Next.js middleware handles route protection based on authentication state and user roles:

- Extracts auth token from cookies
- Verifies token via API call
- Applies role-based access control
- Redirects unauthorized requests to appropriate pages
- Configures public routes that don't require authentication

## Presentation Layer

The UI is implemented following Atomic Design methodology:

### Atoms

- **Input** - Basic input component with label and error handling
- **Button** - Button component with variants, sizes, and loading state

### Organisms

- **SigninForm** - Form for user login with validation and feedback
- **SignupForm** - Form for user registration with all required fields
  - Collects firstName, lastName, email, jobTitle, and password
  - Includes client-side validation
  - Shows loading state during submission

### Pages

- **SigninSignUp** - Combined page that toggles between signin and signup forms

### Layout

- **AuthLayout** - Layout wrapper for authentication pages with visual design

## API Integration

Authentication endpoints:

- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

API responses follow the format:

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6...",
    "user": {
      "id": "df634d9b-ad95-4d00-acc7-43e391f6015a",
      "email": "vajaharish.dev@gmail.com",
      "firstName": "harish",
      "lastName": "vaja",
      "role": 3
    }
  }
}
```

Login request format:

```json
{
  "email": "vajaharish.dev@gmail.com",
  "password": "harish"
}
```

Signup request format:

```json
{
  "email": "vajaharish.dev@gmail.com",
  "password": "harish",
  "firstName": "harish",
  "lastName": "vaja"
}
```

## Security Considerations

1. **Token Storage**

   - JWT tokens stored in HTTP-only cookies
   - Prevents client-side JavaScript access

2. **API Protection**

   - Uses Authorization Bearer header for API requests
   - Validates tokens on server side

3. **Password Handling**
   - Password validation enforces minimum length
   - Password visibility toggle for better UX
   - No plaintext password storage

## Integration Points

To complete the integration between the presentation layer and the auth module:

1. Create application hooks that use auth module use cases
2. Connect form submissions in SigninForm and SignupForm to these hooks
3. Implement global auth state management
4. Add routing and redirect logic based on authentication status

## Future Improvements

1. Add refresh token functionality for better session management
2. Implement password reset functionality
3. Add multi-factor authentication
4. Enhance role-based permission system with more granular controls
