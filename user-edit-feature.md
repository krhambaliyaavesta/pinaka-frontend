# User Edit Feature Implementation

## Overview

This feature will add a new "Edit Users" tab to the admin dashboard sidebar, which will navigate to a new route for searching and editing user details.

## API Details

The API endpoint for fetching users is:

```
GET https://pinaka.onrender.com/api/admin/users
```

Parameters:

- `approvalStatus` (optional): Filter users by approval status (e.g., "APPROVED")
- `limit` (optional): Number of users to return
- `offset` (optional): Pagination offset
- `search` (optional): Search term to filter users

Response format:

```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "id": "900908b0-33da-4dfc-a795-f80906fc38d2",
        "email": "simran.kaur@avestatechnologies.com",
        "firstName": "simran",
        "lastName": "kaur",
        "fullName": "simran kaur",
        "role": 1,
        "jobTitle": "frontend",
        "approvalStatus": "APPROVED",
        "createdAt": "2025-05-18T10:18:23.647Z"
      }
      // More users...
    ],
    "total": 4
  }
}
```

## Blueprint

### Domain Layer

1. Update interfaces to support user search and management
2. Define necessary data structures and types
3. Ensure clear separation of concerns

### Infrastructure Layer

1. Implement repository methods for API interaction
2. Add proper mapping between DTOs and domain entities
3. Handle error cases gracefully

### Application Layer

1. Create use cases for searching and managing users
2. Develop React hooks for UI integration
3. Ensure proper state management

### Presentation Layer

1. Add sidebar navigation item
2. Create the page component
3. Implement search functionality
4. Build user table display
5. Add pagination support
6. Create modals for editing user details

## Incremental Implementation Steps

### Phase 1: Foundation and Navigation

1. Add the edit users link to the admin dashboard sidebar
2. Create basic route structure for edit users page
3. Add role-based access control to the page

### Phase 2: Domain and Infrastructure Setup

4. Update user management interfaces in domain layer
5. Add user search related types and interfaces
6. Implement user search in the repository

### Phase 3: Application Layer Development

7. Create the search users use case
8. Develop a React hook for the search functionality
9. Add pagination support to the hook

### Phase 4: Basic UI Implementation

10. Create a basic page component with search input
11. Implement the users table component
12. Add loading and error states

### Phase 5: Enhanced Functionality

13. Implement pagination controls for the UI
14. Add filtering capabilities
15. Create the edit user modal

### Phase 6: Edit User Functionality

16. Update repository with user edit methods
17. Create use case for editing user details
18. Integrate edit functionality with the UI

## Code Generation Prompts

### Prompt 1: Add Sidebar Navigation

```
Add a new "Edit Users" menu item to the admin dashboard sidebar.

1. Update the sidebar navigation in src/app/dashboard/layout.tsx
2. Use an appropriate icon (e.g., FaUserEdit from react-icons/fa)
3. Add a link to the new route "/dashboard/edit-users"
4. Ensure the link appears for admin users only
5. Add the same link to the mobile menu

The new menu item should appear after the existing "User Approvals" item.
```

### Prompt 2: Create Basic Route Structure

```
Create the basic route structure for the edit users page.

1. Create the file structure for the new route at src/app/dashboard/edit-users/
2. Add a basic page.tsx file with a placeholder component
3. Add a simple layout.tsx file if needed
4. Ensure the page is protected for admin access only
5. Add a loading state for when authentication is being checked

The page should follow the same pattern as other dashboard pages.
```

### Prompt 3: Update Domain Layer Interfaces

```
Update the domain layer interfaces to support user search functionality.

1. Modify src/modules/user-management/domain/interfaces/IUserManagementRepository.ts to add:
   - A searchUsers method to find users with pagination and filtering
   - Appropriate parameters like search term, limit, offset, and status filter
   - Return type including users array and total count

2. Update src/modules/user-management/domain/interfaces/IUserManagementService.ts with a corresponding method.

3. Create any necessary type definitions for search parameters and responses.

Follow the existing patterns in the codebase and maintain clean architecture principles.
```

### Prompt 4: Update Infrastructure Layer

```
Implement the user search functionality in the infrastructure layer.

1. Update src/modules/user-management/infrastructure/repositories/UserManagementRepository.ts to:
   - Add the searchUsers method implementation
   - Make an API call to /api/admin/users with appropriate query parameters
   - Handle the response and map it to domain entities
   - Implement proper error handling

2. Reuse the existing mapToUser method for consistent entity mapping.

Ensure the implementation follows the repository pattern and clean architecture principles.
```

### Prompt 5: Add Application Layer Use Case

```
Create a new use case for searching users.

1. Create src/modules/user-management/application/usecases/SearchUsersUseCase.ts with:
   - A constructor that takes IUserManagementService as a dependency
   - An execute method with appropriate parameters
   - Proper error handling

2. Update src/modules/user-management/application/services/UserManagementService.ts to implement the searchUsers method.

3. Update src/modules/user-management/application/usecases/index.ts to export the new use case.

4. Update the UserManagementModule.ts to provide a factory method for the new use case.

Follow the patterns used in existing use cases like GetPendingUsersUseCase.
```

### Prompt 6: Create Application Layer Hook

```
Create a React hook for the user search functionality.

1. Create src/modules/user-management/application/hooks/useSearchUsers.ts with:
   - State for users, loading, error, and pagination
   - A search function that calls the use case
   - Pagination controls (next page, previous page)
   - Optional initial search parameters

2. Update src/modules/user-management/application/hooks/index.ts to export the new hook.

The hook should manage all the state needed for the UI components and provide a clean API for searching and pagination.
```

### Prompt 7: Create Basic Page Component

```
Create the basic page component for the edit users feature.

1. Update src/app/dashboard/edit-users/page.tsx to:
   - Import necessary components and hooks
   - Add a title and description
   - Create a search input and button
   - Add a container for the results table

2. Implement basic authentication and role checking.

3. Add appropriate styles consistent with the design system.

The page structure should follow the same pattern as other dashboard pages like categories.
```

### Prompt 8: Implement Users Table

```
Create a users table component to display search results.

1. Create a new component at src/presentation/organisms/user-management/UsersTable/UsersTable.tsx with:
   - A table to display user information
   - Columns for: Name, Email, Job Title, Role, Status, Created At, and Actions
   - Proper formatting for dates and enumerated values
   - An edit button in the Actions column

2. Add loading and empty states to the table.

3. Update the component registry if needed.

Follow the atomic design principles and ensure the component is reusable.
```

### Prompt 9: Add Pagination Support

```
Add pagination support to the users table.

1. Create a pagination component at src/presentation/molecules/common/Pagination/Pagination.tsx (if it doesn't exist) with:
   - Previous and Next buttons
   - Current page indicator
   - Page size selector

2. Integrate pagination with the users table and search hook.

3. Update the page component to display pagination controls.

Ensure the pagination is accessible and provides good UX for navigating through large datasets.
```

### Prompt 10: Create Edit User Modal

```
Create a modal for editing user details.

1. Create src/presentation/organisms/user-management/EditUserModal/EditUserModal.tsx with:
   - A form for editing user details (name, email, job title, role)
   - Validation for input fields
   - Submit and cancel buttons
   - Loading state during submission

2. Create a form component that uses React Hook Form for validation.

3. Add appropriate styles consistent with other modals in the system.

Follow the atomic design principles and ensure the component is reusable.
```

### Prompt 11: Add User Edit Repository Methods

```
Add methods to the repository for editing user details.

1. Update IUserManagementRepository.ts to add:
   - An updateUser method that accepts a user ID and update data
   - Appropriate parameter and return types

2. Update UserManagementRepository.ts to implement the new method with:
   - An API call to update the user
   - Proper error handling
   - Response mapping to domain entities

Follow the existing patterns in the codebase for consistency.
```

### Prompt 12: Create Edit User Use Case

```
Create a use case for editing user details.

1. Create src/modules/user-management/application/usecases/UpdateUserUseCase.ts with:
   - A constructor that takes IUserManagementService as a dependency
   - An execute method that accepts a user ID and update data
   - Proper error handling

2. Update UserManagementService.ts to implement the corresponding method.

3. Update the usecases/index.ts to export the new use case.

4. Update UserManagementModule.ts to provide a factory method for the new use case.

Follow the patterns used in existing use cases for consistency.
```

### Prompt 13: Create Edit User Hook

```
Create a React hook for the user edit functionality.

1. Create src/modules/user-management/application/hooks/useUpdateUser.ts with:
   - State for loading, error, and success
   - An updateUser function that calls the use case
   - Proper error handling

2. Update the hooks/index.ts to export the new hook.

The hook should provide a clean API for updating user details and managing related state.
```

### Prompt 14: Integrate Edit Functionality

```
Integrate the edit functionality with the UI components.

1. Update the edit user modal to use the useUpdateUser hook.

2. Connect the edit button in the users table to open the edit modal.

3. Implement proper state updates after a successful edit.

4. Add toast notifications for success and error states.

Ensure the user experience is smooth and intuitive.
```

### Prompt 15: Final Integration and Testing

```
Complete the integration of all components and add final touches.

1. Ensure all components are properly connected.

2. Add any missing error handling or edge cases.

3. Test the complete feature flow:
   - Navigation to the page
   - Searching for users
   - Pagination through results
   - Editing a user
   - Verifying the changes appear in the table

4. Add any necessary documentation comments.

This final step should ensure everything works together seamlessly.
```

## UI Components to Reuse

We will follow the same pattern as the Categories page, reusing concepts like:

- Table layout
- Modal forms
- Toast notifications
- Loading states
- Error handling

## User Permissions

Only users with ADMIN role will have access to this feature.
