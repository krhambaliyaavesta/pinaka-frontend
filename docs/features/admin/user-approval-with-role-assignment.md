# Admin User Approval System with Role Assignment

## Overview

This document outlines the implementation of an enhanced user approval system for administrators. When a user with the "admin" role logs in, they will be redirected to a dedicated dashboard that displays all pending users. Admins can review and either approve (with role assignment) or reject these pending user accounts. Unlike leads who can only approve or reject users, admins have the additional privilege of assigning specific roles (Admin, Lead, or Member) during the approval process.

## User Flow

1. Admin user logs in with credentials
2. System identifies the user role as "admin" (UserRole.ADMIN)
3. User is redirected to the admin dashboard (/dashboard)
4. Dashboard displays all pending users fetched from the API
5. Admin can review user details and take action:
   - Approve with role assignment (Admin, Lead, or Member)
   - Reject
6. On approval/rejection, system updates user status and role (if applicable) via API

## Architecture Components

### Domain Layer

- **Entities**: User entity with role and approval status properties
- **Interfaces**: Extended IUserManagementRepository, IUserManagementService with role assignment methods
- **Enums**: UserStatus (APPROVED, PENDING, REJECTED), UserRole (ADMIN, LEAD, MEMBER)

### Application Layer

- **Services**: Extended UserManagementService
- **Use Cases**:
  - GetPendingUsersUseCase (shared with lead functionality)
  - ApproveUserWithRoleUseCase (admin-specific)
  - RejectUserUseCase (shared with lead functionality)
- **Hooks**:
  - useApproveUserWithRole (admin-specific)

### Infrastructure Layer

- **Repositories**: Extended UserManagementRepository
  - Implements API calls for:
    - getPendingUsers (shared with lead functionality)
    - approveUserWithRole (admin-specific)
    - updateUserStatus (for rejection, shared with lead functionality)

### Presentation Layer

- **Pages**: AdminDashboard
- **Templates**: PendingUserApprovalTemplate (enhanced to handle role selection)
- **Organisms**:
  - PendingUsersList (shared with lead functionality)
  - AdminUserApprovalCard (enhanced with role selection)
- **Molecules**:
  - AdminApprovalButtonGroup (includes role selection)
  - RoleSelector (new component)
  - UserDetailItem (shared with lead functionality)
- **Atoms**:
  - ApprovalBadge (shared with lead functionality)
  - ActionButton (shared with lead functionality)
  - RoleOption (new component)

## API Integration

### GET: getAllPendingStatusUser

- **Endpoint**: `/api/admin/users/pending`
- **Purpose**: Fetch all users with PENDING status
- **Response**: Array of user objects with details needed for approval
- **Authentication**: Required (Admin or Lead users only)
- **Error Handling**: Handle network errors, unauthorized access

### PUT: updateUserDetails

- **Endpoint**: `/api/admin/users/{userId}`
- **Example**: `/api/admin/users/de6d2db838-d426-4453-8213-3c16c2cd7840`
- **Purpose**: Update user status (approve/reject) and role (for admins)
- **Payload**: User ID, updated status, and role (when applicable)
- **Payload Example (Approval with Role)**:
  ```json
  {
    "approvalStatus": "APPROVED",
    "role": 2 // UserRole.LEAD = 2
  }
  ```
- **Payload Example (Rejection)**:
  ```json
  {
    "approvalStatus": "REJECTED"
  }
  ```
- **Authentication**: Required (Admin users only for role assignment)
- **Response**: Updated user object
- **Error Handling**: Handle network errors, validation errors

## Differences from Lead Approval System

The Admin User Approval System extends the Lead User Approval System with the following enhancements:

1. **Role Assignment**: Admins can assign roles during approval (Lead can only approve/reject)
2. **Enhanced UI**: Role selection component in the approval flow
3. **Extended API Payload**: Includes role information when approving users
4. **Access Control**: Different permission checks for admin-specific functionality

## Component Reusability

To maximize code reuse and maintain consistency, many components from the existing Lead User Approval System can be reused or extended for the Admin User Approval System:

### Fully Reusable Components (No Modification)

1. **Domain Layer**:

   - User entity
   - UserStatus enum
   - UserRole enum

2. **Application Layer**:

   - GetPendingUsersUseCase
   - RejectUserUseCase
   - usePendingUsers hook
   - useRejectUser hook

3. **Infrastructure Layer**:

   - getPendingUsers method in UserManagementRepository
   - updateUserStatus method for rejection

4. **Presentation Layer**:
   - **Atoms**:
     - ApprovalBadge
     - ActionButton
   - **Molecules**:
     - UserDetailItem
   - **Organisms**:
     - PendingUsersList (the container component that displays the list of users)

### Components Requiring Modification or Extension

1. **Domain Layer**:

   - IUserManagementRepository interface (add approveUserWithRole method)
   - IUserManagementService interface (add approveUserWithRole method)

2. **Application Layer**:

   - UserManagementService (add approveUserWithRole method)

3. **Presentation Layer**:
   - **Templates**:
     - PendingUserApprovalTemplate (modify to conditionally render role selection for admins)
   - **Organisms**:
     - UserApprovalCard (extend to create AdminUserApprovalCard with role selection)
   - **Molecules**:
     - ApprovalButtonGroup (extend to create AdminApprovalButtonGroup with role selection)

### New Components (Admin-Specific)

1. **Application Layer**:

   - ApproveUserWithRoleUseCase
   - useApproveUserWithRole hook

2. **Infrastructure Layer**:

   - approveUserWithRole method in UserManagementRepository

3. **Presentation Layer**:
   - **Pages**:
     - AdminDashboard
   - **Molecules**:
     - RoleSelector
   - **Atoms**:
     - RoleOption

### Implementation Approach for Reusability

1. **Component Composition**: Use composition to extend existing components rather than duplicating code
2. **Conditional Rendering**: Add conditional rendering based on user role in shared components
3. **Props Extensions**: Extend props interfaces to support additional functionality in shared components
4. **Higher-Order Components**: For complex cases, consider using HOCs to add admin-specific functionality
5. **Custom Hooks**: Create admin-specific hooks that leverage existing functionality where possible

This approach ensures maximum code reuse while maintaining a clear separation between admin and lead functionality.

## Authentication & Authorization

- Leverage existing AuthModule and middleware
- Enhance dashboard layout to accommodate both admin and lead roles
- Ensure admin-specific features (role assignment) are only available to admin users
- Protect admin routes and functionality from unauthorized access

## UI/UX Considerations

- Consistent UI with the existing lead approval system
- Clear distinction for the role selection feature
- Intuitive role selection interface
- Appropriate validation and confirmation for role assignment
- Responsive design for all device sizes

## Implementation Strategy

1. Extend the user management module with role assignment capability
2. Implement repository method for approving with role
3. Build presentation components for role selection
4. Enhance authentication flow to recognize admin role
5. Add proper route protection and access control
6. Implement error handling and feedback

## Testing Strategy

- Unit tests for extended services and use cases
- Integration tests for API interactions with role assignment
- Component tests for UI elements including role selection
- End-to-end tests for complete approval flow with role assignment

## Implementation Plan

Below is a detailed, step-by-step implementation plan for building the Admin User Approval System with Role Assignment, focusing on the additions to the existing Lead User Approval System.

### Phase 1: Domain and Interface Extensions

#### Step 1: Extend Repository Interface

Extend the IUserManagementRepository interface to add support for role assignment during user approval.

```typescript
// Add to IUserManagementRepository
approveUserWithRole(userId: string, role: UserRole): Promise<User>;
```

#### Step 2: Extend Service Interface

Extend the IUserManagementService interface to add support for approving users with role assignment.

```typescript
// Add to IUserManagementService
approveUserWithRole(userId: string, role: UserRole): Promise<User>;
```

### Phase 2: Implementation

#### Step 3: Implement Repository Method

Implement the approveUserWithRole method in the UserManagementRepository class to handle API calls with role information.

```typescript
// In UserManagementRepository
async approveUserWithRole(userId: string, role: UserRole): Promise<User> {
  // Implementation details
}
```

#### Step 4: Implement Service Method

Implement the approveUserWithRole method in the UserManagementService class.

```typescript
// In UserManagementService
async approveUserWithRole(userId: string, role: UserRole): Promise<User> {
  // Implementation details
}
```

#### Step 5: Create New Use Case

Create a new use case for approving users with role assignment.

```typescript
// Create ApproveUserWithRoleUseCase
class ApproveUserWithRoleUseCase {
  // Implementation details
}
```

#### Step 6: Update Module Factory

Add a factory method to the UserManagementModule to create the new use case.

```typescript
// In UserManagementModule
static getApproveUserWithRoleUseCase(): ApproveUserWithRoleUseCase {
  // Implementation details
}
```

### Phase 3: UI Components

#### Step 7: Create Role Selector Component

Create a new component for role selection during the approval process.

```typescript
// Create RoleSelector component
function RoleSelector({ selectedRole, onRoleChange }) {
  // Implementation details
}
```

#### Step 8: Enhance Approval Card

Enhance the user approval card to include role selection for admin users.

```typescript
// Create AdminUserApprovalCard component based on UserApprovalCard
function AdminUserApprovalCard({ user, onStatusChange }) {
  // Implementation details including role selection
}
```

#### Step 9: Create Admin Dashboard

Create an admin dashboard component similar to the lead dashboard but with enhanced functionality.

```typescript
// Create AdminDashboard component
function AdminDashboard() {
  // Implementation details
}
```

### Phase 4: Integration

#### Step 10: Update Dashboard Layout

Modify the dashboard layout to support both admin and lead roles with appropriate UI elements.

```typescript
// Update dashboard layout to check for admin role as well
// and conditionally render admin-specific components
```

#### Step 11: Create New Hook

Create a new hook for the admin-specific approval with role functionality.

```typescript
// Create useApproveUserWithRole hook
function useApproveUserWithRole() {
  // Implementation details
}
```

#### Step 12: Update Routes

Ensure admin-specific routes and pages are set up correctly.

```typescript
// Create or update routes for admin dashboard
```

## Implementation Blueprint with LLM Prompts

This section provides a detailed blueprint for implementing the Admin User Approval System with Role Assignment feature, broken down into small, iterative steps. Each step is presented as a prompt that can be used with a code-generation LLM to implement that specific part of the feature.

### Stage 1: Domain Layer Extensions

#### Prompt 1: Extend Repository Interface

```text
Extend the IUserManagementRepository interface to add support for role assignment during user approval. This interface is in the user-management module's domain layer. The existing interface already has methods for getPendingUsers() and updateUserStatus(), and we need to add approveUserWithRole() that takes a userId and a UserRole enum value.

File: src/modules/user-management/domain/interfaces/IUserManagementRepository.ts

Make sure to:
1. Import UserRole from the auth module
2. Add proper JSDoc comments
3. Follow the existing coding style
4. Keep all existing methods
```

#### Prompt 2: Extend Service Interface

```text
Extend the IUserManagementService interface to add support for approving users with role assignment. This interface is in the user-management module's domain layer. The existing interface already has methods for getPendingUsers(), approveUser(), and rejectUser().

File: src/modules/user-management/domain/interfaces/IUserManagementService.ts

Make sure to:
1. Add approveUserWithRole(userId: string, role: UserRole): Promise<User>
2. Add proper JSDoc comments
3. Follow the existing coding style
4. Keep all existing methods
```

### Stage 2: Infrastructure Layer Implementation

#### Prompt 3: Implement Repository Method

```text
Implement the approveUserWithRole method in the UserManagementRepository class. This repository handles API calls to the backend for user management functionality. The existing repository already implements getPendingUsers() and updateUserStatus().

File: src/modules/user-management/infrastructure/repositories/UserManagementRepository.ts

The implementation should:
1. Make a PUT request to '/api/admin/users/${userId}' endpoint
2. Send a payload with approvalStatus: "APPROVED" and role: [UserRole value]
3. Handle errors properly
4. Map the API response to a User domain object (use the existing mapToUser method)
5. Follow the error handling pattern from other methods
```

### Stage 3: Application Layer Implementation

#### Prompt 4: Implement Service Method

```text
Implement the approveUserWithRole method in the UserManagementService class. This service is part of the application layer and uses the repository to perform business operations.

File: src/modules/user-management/application/services/UserManagementService.ts

The implementation should:
1. Use the repository's new approveUserWithRole method
2. Handle errors properly
3. Follow the same pattern as the existing approveUser and rejectUser methods
4. Add appropriate logging
```

#### Prompt 5: Create ApproveUserWithRoleUseCase

```text
Create a new use case class called ApproveUserWithRoleUseCase that handles approving a user with a specific role. This should follow the Single Responsibility Principle and match the pattern of the existing ApproveUserUseCase.

File: src/modules/user-management/application/usecases/ApproveUserWithRoleUseCase.ts

The use case should:
1. Take IUserManagementService as a dependency in the constructor
2. Have an execute method that takes userId and role parameters
3. Validate that userId is provided
4. Call the service's approveUserWithRole method
5. Handle errors properly
6. Add proper JSDoc comments
```

#### Prompt 6: Export the Use Case

```text
Update the application layer's index.ts to export the new ApproveUserWithRoleUseCase.

File: src/modules/user-management/application/index.ts

Make sure to:
1. Import the new use case
2. Add it to the exports
3. Maintain the existing structure and exports
```

#### Prompt 7: Update Module Factory

```text
Add a factory method to the UserManagementModule class to create instances of the new ApproveUserWithRoleUseCase. This follows the Module Factory pattern used throughout the application.

File: src/modules/user-management/UserManagementModule.ts

The new method should:
1. Be named getApproveUserWithRoleUseCase
2. Return a new instance of ApproveUserWithRoleUseCase
3. Pass the service instance to the use case constructor
4. Include proper JSDoc comments
5. Follow the pattern of existing factory methods
```

#### Prompt 8: Create Hook for Approving User with Role

```text
Create a React hook called useApproveUserWithRole that will allow components to approve users with a specific role. This should follow the pattern of the existing useApproveUser hook.

File: src/modules/user-management/application/hooks/useApproveUserWithRole.ts

The hook should:
1. Use useState for loading and error states
2. Create an approveUserWithRole function that takes userId and role parameters
3. Use the UserManagementModule to get the ApproveUserWithRoleUseCase
4. Execute the use case with the provided parameters
5. Handle loading states and errors
6. Return approveUserWithRole function, isLoading, and error
7. Include proper JSDoc comments
```

#### Prompt 9: Export the Hook

```text
Update the hooks index.ts to export the new useApproveUserWithRole hook.

File: src/modules/user-management/application/hooks/index.ts

Make sure to:
1. Import the new hook
2. Add it to the exports
3. Maintain the existing structure and exports
```

### Stage 4: Presentation Layer – Atoms and Molecules

#### Prompt 10: Create RoleOption Component

```text
Create a RoleOption atom component that will represent a single role option in the role selector. This should follow the atomic design principles used in the application.

File: src/presentation/atoms/user-management/RoleOption/RoleOption.tsx

The component should:
1. Accept props for value, label, isSelected, and onChange
2. Render a radio button input with the specified props
3. Style it to match the existing design system
4. Add proper TypeScript types and interfaces
5. Include proper JSDoc comments
```

#### Prompt 11: Create Index for RoleOption

```text
Create an index.ts file for the new RoleOption component.

File: src/presentation/atoms/user-management/RoleOption/index.ts

The file should:
1. Export the RoleOption component
2. Follow the barrel export pattern used in the project
```

#### Prompt 12: Create RoleSelector Component

```text
Create a RoleSelector molecule component that will allow administrators to select a role for a user during approval. This component will use the RoleOption atom.

File: src/presentation/molecules/user-management/RoleSelector/RoleSelector.tsx

The component should:
1. Accept props for selectedRole, onRoleChange, and optional className
2. Import and use the UserRole enum from the auth module
3. Render RoleOption components for each role (Admin, Lead, Member)
4. Handle role selection change
5. Add proper TypeScript types and interfaces
6. Include proper JSDoc comments
7. Use a consistent styling approach with the rest of the application
```

#### Prompt 13: Create Index for RoleSelector

```text
Create an index.ts file for the new RoleSelector component.

File: src/presentation/molecules/user-management/RoleSelector/index.ts

The file should:
1. Export the RoleSelector component
2. Follow the barrel export pattern used in the project
```

#### Prompt 14: Create AdminApprovalButtonGroup Component

```text
Create an AdminApprovalButtonGroup molecule component that extends the existing ApprovalButtonGroup to include role selection. This will be used in the admin user approval flow.

File: src/presentation/molecules/user-management/AdminApprovalButtonGroup/AdminApprovalButtonGroup.tsx

The component should:
1. Have similar props to ApprovalButtonGroup plus selectedRole and onRoleChange
2. Import and use the RoleSelector component
3. Render the RoleSelector above the approval/reject buttons
4. Make the Approve button conditionally disabled if no role is selected
5. Add proper TypeScript types and interfaces
6. Include proper JSDoc comments
7. Use a consistent styling approach with the rest of the application
```

#### Prompt 15: Create Index for AdminApprovalButtonGroup

```text
Create an index.ts file for the new AdminApprovalButtonGroup component.

File: src/presentation/molecules/user-management/AdminApprovalButtonGroup/index.ts

The file should:
1. Export the AdminApprovalButtonGroup component
2. Follow the barrel export pattern used in the project
```

### Stage 5: Presentation Layer – Organisms and Templates

#### Prompt 16: Create AdminUserApprovalCard Component

```text
Create an AdminUserApprovalCard organism component that extends the existing UserApprovalCard to include role selection for admin users. This will display user information and provide role assignment functionality.

File: src/presentation/organisms/user-management/AdminUserApprovalCard/AdminUserApprovalCard.tsx

The component should:
1. Be similar to UserApprovalCard but use AdminApprovalButtonGroup instead
2. Import useApproveUserWithRole hook and useRejectUser hook
3. Add state for selectedRole
4. Update the handleApprove function to pass the selected role
5. Keep the same user information display as UserApprovalCard
6. Add proper TypeScript types and interfaces
7. Include proper JSDoc comments
8. Use a consistent styling approach with the rest of the application
```

#### Prompt 17: Create Index for AdminUserApprovalCard

```text
Create an index.ts file for the new AdminUserApprovalCard component.

File: src/presentation/organisms/user-management/AdminUserApprovalCard/index.ts

The file should:
1. Export the AdminUserApprovalCard component
2. Follow the barrel export pattern used in the project
```

#### Prompt 18: Create AdminPendingUsersList Component

```text
Create an AdminPendingUsersList organism component that extends the existing PendingUsersList to use AdminUserApprovalCard instead of UserApprovalCard for rendering each user. This will provide role assignment capability for admins.

File: src/presentation/organisms/user-management/AdminPendingUsersList/AdminPendingUsersList.tsx

The component should:
1. Be similar to PendingUsersList but use AdminUserApprovalCard for rendering each user
2. Keep all the existing functionality (filtering, loading states, error handling)
3. Add proper TypeScript types and interfaces
4. Include proper JSDoc comments
5. Use a consistent styling approach with the rest of the application
```

#### Prompt 19: Create Index for AdminPendingUsersList

```text
Create an index.ts file for the new AdminPendingUsersList component.

File: src/presentation/organisms/user-management/AdminPendingUsersList/index.ts

The file should:
1. Export the AdminPendingUsersList component
2. Follow the barrel export pattern used in the project
```

#### Prompt 20: Create AdminPendingUserApprovalTemplate

```text
Create an AdminPendingUserApprovalTemplate template component that uses the AdminPendingUsersList organism. This will provide the layout for the admin approval dashboard.

File: src/presentation/templates/user-management/AdminPendingUserApprovalTemplate/AdminPendingUserApprovalTemplate.tsx

The component should:
1. Be similar to PendingUserApprovalTemplate but use AdminPendingUsersList
2. Keep the same overall layout and structure
3. Update the header to indicate it's the Admin Approval Dashboard
4. Add proper TypeScript types and interfaces
5. Include proper JSDoc comments
6. Use a consistent styling approach with the rest of the application
```

#### Prompt 21: Create Index for AdminPendingUserApprovalTemplate

```text
Create an index.ts file for the new AdminPendingUserApprovalTemplate component.

File: src/presentation/templates/user-management/AdminPendingUserApprovalTemplate/index.ts

The file should:
1. Export the AdminPendingUserApprovalTemplate component
2. Follow the barrel export pattern used in the project
```

### Stage 6: Presentation Layer – Pages and Integration

#### Prompt 22: Create AdminDashboard Component

```text
Create an AdminDashboard page component that will be the entry point for the admin user approval functionality. This should use the AdminPendingUserApprovalTemplate.

File: src/presentation/pages/user-management/AdminDashboard/AdminDashboard.tsx

The component should:
1. Use the usePendingUsers hook to fetch and manage pending users
2. Render the AdminPendingUserApprovalTemplate with the appropriate props
3. Add proper TypeScript types and interfaces
4. Include proper JSDoc comments
5. Be a client component with the "use client" directive
```

#### Prompt 23: Create Index for AdminDashboard

```text
Create an index.ts file for the new AdminDashboard component.

File: src/presentation/pages/user-management/AdminDashboard/index.ts

The file should:
1. Export the AdminDashboard component
2. Follow the barrel export pattern used in the project
```

### Stage 7: Integration with Next.js

#### Prompt 24: Update Dashboard Layout for Admin Access

```text
Update the dashboard layout component to support both admin and lead roles. Currently, it only allows lead users to access the dashboard.

File: src/app/dashboard/layout.tsx

The changes should:
1. Modify the authentication check to allow both UserRole.ADMIN and UserRole.LEAD
2. Update the dashboard title and UI elements to show "Admin Dashboard" when the user is an admin
3. Keep the existing functionality for lead users
4. Add proper TypeScript types where needed
5. Ensure responsive design is maintained
```

#### Prompt 25: Create Admin Users Page

```text
Create a page component for the admin users dashboard that will use the AdminDashboard component.

File: src/app/dashboard/admin/users/page.tsx

The component should:
1. Be a client component with the "use client" directive
2. Import and render the AdminDashboard component
3. Be simple and follow the Next.js page pattern
```

#### Prompt 26: Update User Dashboard Page for Role-Based Rendering

```text
Update the existing users dashboard page to conditionally render either the LeadDashboard or AdminDashboard based on the user's role.

File: src/app/dashboard/users/page.tsx

The changes should:
1. Import the useAuth hook to get the current user
2. Import both LeadDashboard and AdminDashboard components
3. Conditionally render AdminDashboard for admin users and LeadDashboard for lead users
4. Add loading state handling
5. Keep the "use client" directive
```

### Stage 8: Registry and Export Updates

#### Prompt 27: Update Registry for New Components

```text
Update the appropriate registry files to include the new components following the component registry pattern used in the project.

Files to update:
1. src/presentation/registry/atoms.registry.ts (for RoleOption)
2. src/presentation/registry/molecules.registry.ts (for RoleSelector and AdminApprovalButtonGroup)
3. src/presentation/registry/organisms.registry.ts (for AdminUserApprovalCard and AdminPendingUsersList)
4. src/presentation/registry/templates.registry.ts (for AdminPendingUserApprovalTemplate)
5. src/presentation/registry/pages.registry.ts (for AdminDashboard)

Each update should:
1. Import the new component
2. Add it to the appropriate section in the registry
3. Follow the existing pattern and structure
```

#### Prompt 28: Create User Management Exports Barrel

```text
Create or update a barrel export file for the user-management presentation components to simplify imports.

File: src/presentation/user-management.ts

The file should:
1. Export all user management related components from atoms to pages
2. Group exports by atomic design level
3. Follow the barrel export pattern used in the project
```

### Stage 9: Testing and Finalization

#### Prompt 29: Create Unit Tests for ApproveUserWithRoleUseCase

```text
Create unit tests for the new ApproveUserWithRoleUseCase to ensure it works correctly. These tests should verify that the use case properly calls the service and handles errors.

File: src/modules/user-management/application/usecases/__tests__/ApproveUserWithRoleUseCase.test.ts

The tests should:
1. Mock the UserManagementService
2. Test successful approval with role
3. Test error handling
4. Test validation of inputs
5. Follow the testing pattern used in the project
```

#### Prompt 30: Create Unit Tests for AdminApprovalButtonGroup

```text
Create unit tests for the AdminApprovalButtonGroup component to verify that it renders correctly and handles user interactions properly.

File: src/presentation/molecules/user-management/AdminApprovalButtonGroup/__tests__/AdminApprovalButtonGroup.test.tsx

The tests should:
1. Verify that the component renders
2. Test that role selection works
3. Test that approval and rejection buttons work
4. Test that the approve button is disabled when no role is selected
5. Follow the testing pattern used in the project
```

#### Prompt 31: Integration Test for Admin Approval Flow

```text
Create an integration test for the complete admin approval flow to ensure all components work together correctly.

File: src/tests/integration/admin-approval-flow.test.tsx

The test should:
1. Mock the API responses
2. Render the AdminDashboard
3. Test the complete flow from loading users to selecting a role and approving
4. Verify that API calls are made with the correct parameters
5. Follow the integration testing pattern used in the project
```

#### Prompt 32: Final Code Review and Documentation

```text
Review all the implemented code to ensure everything follows the project's standards and patterns. Also, update the documentation to reflect the implemented features.

This should:
1. Verify all components are properly connected
2. Check for any potential bugs or edge cases
3. Ensure proper error handling throughout
4. Verify that the UI is consistent
5. Update any relevant documentation
```
