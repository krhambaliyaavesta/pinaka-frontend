# Lead User Approval System

## Overview

This document outlines the implementation of a user approval system for leads. When a user with the "lead" role logs in, they will be redirected to a dedicated dashboard that displays all pending users. Leads can then review and either approve or reject these pending user accounts.

## User Flow

1. Lead user logs in with credentials
2. System identifies the user role as "lead" (UserRole.LEAD)
3. User is redirected to the leads dashboard (/leads/dashboard)
4. Dashboard displays all pending users fetched from the API
5. Lead can review user details and take action (approve/reject)
6. On approval/rejection, system updates user status via API

## Architecture Components

### Domain Layer

- **Entities**: Extended User entity with approval-related properties
- **Interfaces**: IUserManagementRepository, IUserManagementService
- **Enums**: Existing UserStatus (APPROVED, PENDING, REJECTED)

### Application Layer

- **Services**: UserManagementService
- **Use Cases**:
  - GetPendingUsersUseCase
  - ApproveUserUseCase
  - RejectUserUseCase

### Infrastructure Layer

- **Repositories**: UserManagementRepository
  - Implements API calls for:
    - getAllPendingStatusUser
    - updateUserDetails

### Presentation Layer

- **Pages**: LeadDashboard
- **Templates**: PendingUserApprovalTemplate
- **Organisms**:
  - PendingUsersList
  - UserApprovalCard
- **Molecules**:
  - ApprovalButtonGroup
  - UserDetailItem
- **Atoms**:
  - ApprovalBadge
  - ActionButton

## API Integration

### GET: getAllPendingStatusUser

- **Endpoint**: `/api/admin/users/pending`
- **Purpose**: Fetch all users with PENDING status
- **Response**: Array of user objects with details needed for approval
- **Authentication**: Required (Lead users only)
- **Error Handling**: Handle network errors, unauthorized access

### PUT: updateUserDetails

- **Endpoint**: `/api/auth/users/{userId}`
- **Example**: `/api/auth/users/de6d2db838-d426-4453-8213-3c16c2cd7840`
- **Purpose**: Update user status (approve/reject)
- **Payload**: User ID and updated status
- **Authentication**: Required (Lead users only)
- **Response**: Updated user object
- **Error Handling**: Handle network errors, validation errors

## Authentication & Authorization

- Leverage existing AuthModule and middleware
- Enhance signin flow to redirect leads to appropriate dashboard
- Ensure routes are protected for lead access only

## UI/UX Considerations

- Clean, organized display of pending users
- Clear indication of current status
- Intuitive approval/rejection actions
- Confirmations for status changes
- Responsive design for all device sizes

## State Management

- Local state for UI interactions
- Toast notifications for action feedback
- Optimistic UI updates with fallback on errors

## Implementation Strategy

1. Create user management module structure
2. Implement repository with API integration
3. Build presentation components
4. Enhance authentication flow for role-based redirects
5. Add route protection and middleware updates
6. Implement error handling and feedback

## Testing Strategy

- Unit tests for services and use cases
- Integration tests for API interactions
- Component tests for UI elements
- End-to-end tests for complete approval flow

## Implementation Plan

Below is a detailed, step-by-step implementation plan for building the Lead User Approval System, broken down into small, iterative chunks.

### Phase 1: Foundation Setup

#### Step 1: Create Basic Module Structure

```
Create the foundational structure for the user management module. Set up domain interfaces and enums needed for user management. Create a skeleton of the UserManagementModule following the module factory pattern.

Files to create:
- src/modules/user-management/domain/interfaces/IUserManagementRepository.ts
- src/modules/user-management/domain/interfaces/IUserManagementService.ts
- src/modules/user-management/domain/interfaces/index.ts
- src/modules/user-management/domain/index.ts
- src/modules/user-management/UserManagementModule.ts
- src/modules/user-management/index.ts
```

#### Step 2: Define Repository Interface

```
Define the IUserManagementRepository interface with methods for fetching pending users and updating user status. This will establish the contract between the domain and infrastructure layers.

Update the following file:
- src/modules/user-management/domain/interfaces/IUserManagementRepository.ts

Add methods:
- getPendingUsers(): Promise<User[]>
- updateUserStatus(userId: string, status: UserStatus): Promise<User>
```

#### Step 3: Define Service Interface

```
Define the IUserManagementService interface that will be used by application use cases. This service will wrap repository methods and provide domain-specific logic.

Update the following file:
- src/modules/user-management/domain/interfaces/IUserManagementService.ts

Add methods:
- getPendingUsers(): Promise<User[]>
- approveUser(userId: string): Promise<User>
- rejectUser(userId: string): Promise<User>
```

### Phase 2: Infrastructure Implementation

#### Step 4: Implement Repository

```
Implement the UserManagementRepository that fulfills the IUserManagementRepository interface. This will handle API calls to fetch pending users and update user status.

Files to create:
- src/modules/user-management/infrastructure/repositories/UserManagementRepository.ts
- src/modules/user-management/infrastructure/repositories/index.ts
- src/modules/user-management/infrastructure/index.ts

Implement methods:
- getPendingUsers() - calls '/api/admin/users/pending'
- updateUserStatus() - calls '/api/auth/users/{userId}'
```

#### Step 5: Implement Service

```
Implement the UserManagementService that fulfills the IUserManagementService interface. This service will use the repository and handle any domain-specific logic.

Files to create:
- src/modules/user-management/application/services/UserManagementService.ts
- src/modules/user-management/application/services/index.ts
- src/modules/user-management/application/index.ts

Implement methods:
- getPendingUsers()
- approveUser()
- rejectUser()
```

#### Step 6: Complete Module Factory

```
Complete the UserManagementModule factory class that will provide access to the repository, service, and create use cases with proper dependency injection.

Update the following file:
- src/modules/user-management/UserManagementModule.ts

Implement methods:
- getRepository()
- getService()
- getGetPendingUsersUseCase()
- getApproveUserUseCase()
- getRejectUserUseCase()
```

### Phase 3: Application Layer - Use Cases

#### Step 7: Create Use Cases

```
Implement the use cases for getting pending users, approving a user, and rejecting a user. These use cases will be used by the presentation layer.

Files to create:
- src/modules/user-management/application/usecases/GetPendingUsersUseCase.ts
- src/modules/user-management/application/usecases/ApproveUserUseCase.ts
- src/modules/user-management/application/usecases/RejectUserUseCase.ts
- src/modules/user-management/application/usecases/index.ts

Each use case should have:
- constructor (receiving necessary dependencies)
- execute method
```

#### Step 8: Create Application Hooks

```
Create React hooks that utilize the use cases and provide UI components with access to the user management functionality.

Files to create:
- src/modules/user-management/application/hooks/usePendingUsers.ts
- src/modules/user-management/application/hooks/useApproveUser.ts
- src/modules/user-management/application/hooks/useRejectUser.ts
- src/modules/user-management/application/hooks/index.ts

Each hook should:
- Use the corresponding use case
- Handle loading state
- Handle errors
- Return appropriate data and functions
```

### Phase 4: Presentation Layer - Components

#### Step 9: Create Atomic Components

```
Create atom and molecule level components for the lead dashboard according to the Atomic Design methodology.

Files to create:
- src/presentation/atoms/user-management/ApprovalBadge/ApprovalBadge.tsx
- src/presentation/atoms/user-management/ActionButton/ActionButton.tsx
- src/presentation/molecules/user-management/UserDetailItem/UserDetailItem.tsx
- src/presentation/molecules/user-management/ApprovalButtonGroup/ApprovalButtonGroup.tsx

Component specifications:

1. ApprovalBadge:
   - Styled similar to existing components with rounded-md
   - Color scheme: Pending (yellow), Approved (green), Rejected (red)
   - Should include a status icon and text
   - Uses teal-500 as primary color for consistency

2. ActionButton:
   - Extends existing Button component pattern
   - Approve button: bg-teal-500 hover:bg-teal-600 (same as primary styling)
   - Reject button: bg-red-500 hover:bg-red-600
   - Should include loading state for async operations
   - Rounded-md to match existing UI

3. UserDetailItem:
   - Styled with consistent font sizes and colors (text-gray-700 for labels)
   - Label-value pattern with proper spacing
   - Clean separation between items
   - Optional icon support

4. ApprovalButtonGroup:
   - Contains approve and reject ActionButtons
   - Implements confirmation pattern with a cancel option
   - Consistent spacing and positioning
   - Wrapper for action status feedback
```

#### Step 10: Create Organism Components

```
Create the organism level components that will display pending users and user details for the lead dashboard.

Files to create:
- src/presentation/organisms/user-management/PendingUsersList/PendingUsersList.tsx
- src/presentation/organisms/user-management/UserApprovalCard/UserApprovalCard.tsx

Component specifications:

1. PendingUsersList:
   - Responsive grid/list layout with cards (similar to auth layout)
   - Loading skeleton state during data fetch
   - Empty state for no pending users
   - Error state with retry option
   - Clean separation between user cards
   - Support for filtering/search

2. UserApprovalCard:
   - Card layout with slight shadow (shadow-sm) and border (border-gray-200)
   - User info displayed using UserDetailItem molecules
   - Approval status badge prominently displayed
   - Approval actions at the bottom
   - Expand/collapse for additional details
   - Background color: bg-[#FFFDF5] to match existing theme
```

#### Step 11: Create Template and Page Components

```
Create the template and page components that will compose the lead dashboard layout and integrate with the application layer.

Files to create:
- src/presentation/templates/user-management/PendingUserApprovalTemplate/PendingUserApprovalTemplate.tsx
- src/presentation/pages/user-management/LeadDashboard/LeadDashboard.tsx

Component specifications:

1. PendingUserApprovalTemplate:
   - Header with title "User Approval Dashboard"
   - Main content area for PendingUsersList
   - Sidebar or filter section for controlling view
   - Consistent padding and spacing (p-8)
   - Clean white/off-white background similar to auth layout
   - Responsive layout for different screen sizes

2. LeadDashboard:
   - Client-side component with "use client" directive
   - Uses the PendingUserApprovalTemplate
   - Integrates with usePendingUsers, useApproveUser, and useRejectUser hooks
   - Handles page-level state and user interactions
   - Implements toast notifications for actions
```

### Phase 5: Routes and Navigation

#### Step 12: Create Route and Page File

```
Create the Next.js page file and route for the lead dashboard.

Files to create:
- src/app/leads/dashboard/page.tsx

Implementation details:
- Server component that renders the client LeadDashboard component
- Simple and straightforward, following Next.js routing patterns
- No heavy logic in this file
```

#### Step 13: Update Authentication Flow

```
Modify the signin form to redirect lead users to the lead dashboard after successful authentication.

Update the following file:
- src/presentation/organisms/auth/SigninForm/signinForm.tsx

Add conditional redirection based on user role:
- Before the existing conditional for UserStatus.PENDING
- Add: if (user.isLead()) router.push("/leads/dashboard");
- Maintain the existing redirect for pending users
```

#### Step 14: Update Middleware

```
Update the middleware to ensure proper route protection for the lead dashboard.

Update the following file:
- middleware.ts

Changes needed:
- Ensure the leadRoutes array includes "/leads/dashboard"
- Keep the existing role check logic
- Maintain other route protection patterns
```

### Phase 6: Integration and Testing

#### Step 15: Component Registration

```
Register all new components in the component registry system.

Update the following files:
- src/presentation/registry/atoms.registry.ts
- src/presentation/registry/molecules.registry.ts
- src/presentation/registry/organisms.registry.ts
- src/presentation/registry/templates.registry.ts
- src/presentation/registry/pages.registry.ts

Registration should follow existing patterns:
- Create UserManagementAtoms, UserManagementMolecules, etc.
- Add them to the Atoms, Molecules, etc. exports
- Follow the existing pattern in the registry files
```

#### Step 16: Add Module Export

```
Ensure the user management module is properly exported and available for use.

Update the following file:
- src/modules/index.ts

Add the user management module export:
- Export the module with all its public hooks and types
- Follow the same pattern used for the auth and toast modules
```

#### Step 17: Final Integration

```
Ensure all components are wired together properly and the feature is fully integrated.

Check:
- All imports and exports
- Route configuration
- Auth flow
- Error handling
- UI/UX considerations

Verify interface with existing styles:
- Confirm colors match the teal/blue theme
- Verify layout consistency
- Check responsive behavior
```

## Prompts for Implementation

### Prompt 1: Foundation Setup

```
Implement the foundation for the user management module following Clean Architecture principles:

1. Create the basic module structure:
   - Create domain interfaces in src/modules/user-management/domain/interfaces/
   - Define IUserManagementRepository with methods to get pending users and update user status
   - Define IUserManagementService with methods for getting pending users, approving and rejecting users
   - Create barrel exports in index.ts files

2. Create a skeleton UserManagementModule factory:
   - Follow the module factory pattern
   - Include placeholders for repository and service
   - Export the module in src/modules/user-management/index.ts

Ensure all code follows TypeScript best practices with proper typing and follows project conventions.
```

### Prompt 2: Repository and Service Implementation

```
Implement the infrastructure and application layers for the user management module:

1. Create UserManagementRepository:
   - Implement IUserManagementRepository interface
   - Add getPendingUsers() method calling `/api/admin/users/pending` endpoint
   - Add updateUserStatus() method calling `/api/auth/users/{userId}` endpoint
   - Handle API responses and error cases
   - Follow the same error handling pattern as in AuthRepository

2. Create UserManagementService:
   - Implement IUserManagementService interface
   - Use the repository for data access
   - Add domain-specific logic if needed
   - Handle service-level errors

3. Complete the UserManagementModule:
   - Add singleton management for repository and service
   - Add methods to get instances of repository and service
   - Ensure proper dependency injection
   - Follow the pattern in the existing AuthModule implementation

Follow error handling patterns similar to existing code, and ensure services map data to domain entities correctly.
```

### Prompt 3: Use Cases and Hooks

```
Implement the use cases and React hooks for the user management functionality:

1. Create use cases:
   - GetPendingUsersUseCase
   - ApproveUserUseCase
   - RejectUserUseCase
   - Each should have an execute() method and follow the single responsibility principle

2. Add methods to UserManagementModule to create use cases:
   - getGetPendingUsersUseCase()
   - getApproveUserUseCase()
   - getRejectUserUseCase()

3. Create React hooks:
   - usePendingUsers() - returns { pendingUsers, isLoading, error, refresh }
   - useApproveUser() - returns { approveUser, isLoading, error }
   - useRejectUser() - returns { rejectUser, isLoading, error }

Ensure hooks handle loading and error states consistently. Follow the pattern used in useSignin() hook from the auth module.
```

### Prompt 4: Atomic Components

```
Implement the atom and molecule components for the lead dashboard following Atomic Design principles:

1. Create atom components:
   - ApprovalBadge: Shows the status of a user (pending, approved, rejected)
     - Use yellow for pending, green for approved, red for rejected
     - Follow the rounded styling pattern from existing components

   - ActionButton: Button for approval/rejection actions
     - Extend the existing Button component pattern
     - Add specific styling for approve/reject actions
     - Include teal-500 for approve, red-500 for reject

2. Create molecule components:
   - UserDetailItem: Displays a single user detail (like name, email, job title)
     - Follow the formatting pattern from existing components
     - Use text-gray-700 for labels and consistent spacing

   - ApprovalButtonGroup: Contains approve and reject buttons with confirmation handling
     - Implement a confirmation pattern for actions
     - Follow existing UI patterns for button groups

Ensure components:
- Have well-defined props with TypeScript interfaces
- Follow UI design patterns from the rest of the application
- Include theme colors (teal-500, blue-500, gray-700) for consistency
- Use the same border-radius and shadow patterns
- Are properly exported and organized following the Atomic Design structure
```

### Prompt 5: Organism and Template Components

```
Implement the organism and template components for the lead dashboard:

1. Create organism components:
   - PendingUsersList:
     - Implements a responsive grid layout for user cards
     - Uses the bg-[#FFFDF5] background color matching the auth layout
     - Includes loading states with skeleton UI
     - Handles empty state and error display
     - Uses consistent spacing and padding (p-8)

   - UserApprovalCard:
     - Shows user details in a card format with border-gray-200 and shadow-sm
     - Displays approval status badge prominently
     - Includes approval action buttons
     - Uses the UserDetailItem for displaying user information
     - Matches the rounded-lg style of the auth components

2. Create template component:
   - PendingUserApprovalTemplate:
     - Creates the overall layout for the dashboard
     - Includes header with title
     - Main content area for the user list
     - Uses the same color scheme as the auth layout
     - Implements responsive layout

These components should:
- Compose atoms and molecules created earlier
- Use hooks from the application layer to fetch and manipulate data
- Follow the same styling patterns (colors, shadows, borders) as existing components
- Handle user interactions like showing confirmations
- Display loading and error states appropriately
- Follow responsive design principles
```

### Prompt 6: Page Component and Routing

````
Implement the page component and routing for the lead dashboard:

1. Create page component:
   - LeadDashboard:
     - Uses the "use client" directive
     - Implements the template component
     - Hooks into usePendingUsers, useApproveUser, and useRejectUser
     - Handles page-level state and user interactions
     - Uses useToast for user feedback
     - Follows the same pattern as the SigninSignUp page component

2. Create Next.js route:
   - Create src/app/leads/dashboard/page.tsx
   - Renders the LeadDashboard component
   - Follows Next.js page conventions

3. Update authentication flow:
   - Modify src/presentation/organisms/auth/SigninForm/signinForm.tsx
   - Add conditional redirection:
     ```typescript
     if (user.isLead()) {
       router.push("/leads/dashboard");
     } else if (user.status === UserStatus.PENDING) {
       router.push("/waiting-approval");
     } else {
       router.push("/dashboard");
     }
     ```

4. Update middleware:
   - Ensure "/leads/dashboard" is protected in the leadRoutes array
   - Keep existing role-based access control logic

Test the entire flow from login to dashboard access, ensuring proper role-based routing.
````

### Prompt 7: Registry and Final Integration

````
Complete the integration of all components and ensure everything is properly registered:

1. Update component registries:
   - Register all new components in their respective registry files:

     // atoms.registry.ts
     export const UserManagementAtoms = {
       ApprovalBadge,
       ActionButton
     };

     // Add UserManagementAtoms to the Atoms export
     export const Atoms = {
       common: CommonAtoms,
       userManagement: UserManagementAtoms
       // other modules...
     };

     // Repeat for molecules, organisms, etc.

2. Add module export:
   - Update src/modules/index.ts to export the user management module:
     ```typescript
     export * from './user-management';
     ```

3. Final review and testing:
   - Ensure colors and styling match the existing theme
   - Verify all components are properly integrated
   - Test the entire flow from login to approval
   - Verify toast notifications work for user feedback
   - Check responsive design on various screen sizes

Perform a thorough review of the implementation, ensuring all parts are properly integrated and there's no orphaned code.
````
