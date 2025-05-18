# Navigation Redesign

## Overview

This document outlines the implementation of the navigation redesign for the Pinaka application. The redesign focuses on removing the sidebar navigation and integrating all navigation options into a user dropdown menu in the top navigation bar.

## Current Issues

1. The sidebar navigation takes up a significant amount of screen space
2. Mobile responsiveness is challenging with the sidebar approach
3. Navigation is split between top bar and sidebar, creating an inconsistent experience
4. Duplication of navigation elements across different layouts

## Redesign Goals

1. Simplify navigation by consolidating all options in the top navigation bar
2. Improve screen space utilization by removing the sidebar
3. Enhance mobile responsiveness with a cleaner, dropdown-based approach
4. Provide consistent navigation across all sections of the application
5. Follow Clean Architecture principles for better maintainability

## Implementation Approach

The redesign follows Clean Architecture principles and Atomic Design methodology:

1. **Domain Layer**: Defines navigation types, interfaces, and entities
2. **Application Layer**: Provides hooks and services for navigation state management
3. **Presentation Layer**: Implements UI components following Atomic Design pattern
   - Atoms: Basic UI elements (UserAvatar, NavLink, DropdownItem)
   - Molecules: Composite components (UserDropdownTrigger, DropdownMenu)
   - Organisms: Complex components (UserDropdown, TopNavigation)
   - Templates: Page layouts (MainNavigation)

## Key Components

### Domain Layer:

- `MenuItem` interface - Defines navigation menu items with role-based restrictions
- `MenuSection` enum - Organizes menu items by section (ADMIN, USER, SYSTEM)
- `INavigationService` interface - Defines contract for navigation operations

### Application Layer:

- `NavigationService` - Implements navigation logic and menu item management
- `useNavigation` hook - Provides stateful navigation functionality to components
- `NavigationModule` - Factory for creating navigation services following module pattern

### Presentation Layer:

- Atoms:
  - `UserAvatar` - Displays user initials or image
  - `NavLink` - Navigation links with active state
  - `DropdownItem` - Menu items for dropdown menus
- Molecules:
  - `UserDropdownTrigger` - Trigger button for user dropdown
  - `DropdownMenu` - Container for dropdown menu items
- Organisms:
  - `UserDropdown` - User dropdown with role-based menu items
  - `TopNavigation` - Main navigation bar with responsive design
- Templates:
  - `MainNavigation` - Combines navigation components for consistent layout

## Implementation Steps

1. Create domain types and interfaces
2. Implement navigation service
3. Create navigation module factory
4. Develop useNavigation hook for state management
5. Implement atomic components
6. Update layout files to use new navigation

## Design Guidelines

- **Color Scheme**: Primary - Teal (#059669), Secondary - Gray (#4B5563)
- **Dropdown Spacing**: 8px between items, 12px padding
- **Responsive Breakpoints**: md (768px) for desktop/mobile switch
- **Hover Effects**: Color transitions (200ms duration)
- **Mobile Menu**: Full-width dropdown below header
- **Accessibility**: High contrast for text, focus states for keyboard navigation

## Benefits

1. **Improved UX**: Cleaner interface with more content space
2. **Better Mobile Experience**: Simplified navigation on smaller screens
3. **Consistent Navigation**: Same navigation pattern across all pages
4. **Maintainable Code**: Well-organized components following Clean Architecture
5. **Reusable Components**: Atomic design provides a library of reusable UI elements

## Testing Considerations

1. Test role-based menu filtering for different user roles
2. Verify mobile responsiveness at various breakpoints
3. Test keyboard navigation and accessibility
4. Ensure smooth animations and transitions
5. Validate correct active states for current routes
