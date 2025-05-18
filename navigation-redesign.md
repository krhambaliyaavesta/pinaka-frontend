# Navigation Redesign Plan

## Current Issues

- The sidebar takes up significant screen space
- Admin/lead options are always visible in the sidebar
- Navigation structure feels separated from user account functions
- Mobile experience requires additional interaction patterns

## Proposed Changes

### 1. Remove Sidebar Navigation

- Remove the current sidebar that contains navigation items like:
  - Overview
  - User Approvals
  - Edit Users
  - Teams
  - Categories
  - Cards
  - Analytics

### 2. Create User Dropdown Menu

- Add a dropdown menu attached to the username display in the top navigation bar
- The dropdown will appear on hover/click and include:
  - Admin/lead-specific options (previously in sidebar)
  - User account management options
  - Logout option for all users

### 3. Simplified Top Navigation

- Keep "Kudos Wall" in the main navigation bar
- Make the top navigation bar more prominent
- Ensure consistent styling across the application

## Benefits

- More screen space for content
- Cleaner user interface
- Follows common patterns in modern web applications
- Better organization of administrative functions
- Improved mobile experience

## Implementation Plan

Following Clean Architecture and Atomic Design principles, we'll implement this redesign in small, iterative steps.

### Step 1: Create Atomic Components for Navigation

#### 1.1: Create Navigation Atoms

- Create `UserAvatar` atom component
- Create `NavLink` atom component
- Create `DropdownItem` atom component

#### 1.2: Create Navigation Molecules

- Create `UserDropdownTrigger` molecule component
- Create `DropdownMenu` molecule component

#### 1.3: Create Navigation Organism

- Create `UserDropdown` organism component
- Create `TopNavigation` organism component

### Step 2: Update Layout Structure

#### 2.1: Refactor Main Layout

- Remove sidebar from layout
- Update layout to use full width
- Adjust content area styling

#### 2.2: Create Navigation Template

- Create `MainNavigation` template component
- Integrate `TopNavigation` and `UserDropdown`

### Step 3: Implement Role-Based Menu Logic

#### 3.1: Navigation Domain

- Create navigation types and interfaces
- Define menu item models

#### 3.2: Navigation Application

- Create navigation hooks for menu management
- Implement role-based menu filtering
- Create mobile menu toggle functionality

#### 3.3: Connect Components with Application Logic

- Wire up dropdown menu with authentication
- Implement navigation state management

### Step 4: Polish and Finalize

#### 4.1: Style Refinement

- Apply consistent color scheme
- Ensure responsive behavior
- Add transitions and animations

#### 4.2: Accessibility Improvements

- Add keyboard navigation support
- Ensure ARIA attributes
- Test with screen readers

## Detailed Implementation Steps

### Phase 1: Foundation Components

```
Step 1: Create Base Atom Components

- Create src/presentation/atoms/navigation/UserAvatar/UserAvatar.tsx
  - Simple avatar component that displays user's initials or image
  - Handle different sizes and color variants
  - Add hover state styling

- Create src/presentation/atoms/navigation/NavLink/NavLink.tsx
  - Basic navigation link component with active state
  - Support for icon + text
  - Handle different variants (primary, secondary)

- Create src/presentation/atoms/navigation/DropdownItem/DropdownItem.tsx
  - Menu item for dropdown lists
  - Support for icon + text
  - Handle hover and active states
  - Support for dividers
```

```
Step 2: Create Molecule Components

- Create src/presentation/molecules/navigation/UserDropdownTrigger/UserDropdownTrigger.tsx
  - Compose UserAvatar with username text
  - Add dropdown indicator
  - Handle hover/focus states
  - Implement click handler for dropdown toggle

- Create src/presentation/molecules/navigation/DropdownMenu/DropdownMenu.tsx
  - Container for dropdown items
  - Handle positioning and animation
  - Implement click outside behavior
  - Support for sections and dividers
```

```
Step 3: Create Organism Components

- Create src/presentation/organisms/navigation/UserDropdown/UserDropdown.tsx
  - Combine UserDropdownTrigger and DropdownMenu
  - Filter menu items based on user role
  - Handle dropdown open/close state
  - Implement logout functionality

- Create src/presentation/organisms/navigation/TopNavigation/TopNavigation.tsx
  - Create responsive top navigation bar
  - Include logo, main navigation links
  - Add UserDropdown component
  - Implement mobile menu toggle
```

### Phase 2: Application Layer Integration

```
Step 4: Navigation Domain Layer

- Create src/modules/navigation/domain/types/index.ts
  - Define MenuItem interface
  - Create MenuSection enum
  - Define NavigationState interface

- Create src/modules/navigation/domain/interfaces/INavigationService.ts
  - Define getRoleBasedMenuItems method
  - Define getActiveMenuItem method
```

```
Step 5: Navigation Application Layer

- Create src/modules/navigation/application/services/NavigationService.ts
  - Implement getRoleBasedMenuItems with role filtering
  - Implement getActiveMenuItem with path matching

- Create src/modules/navigation/application/hooks/useNavigation.ts
  - Create hook to manage navigation state
  - Provide menu items based on user role
  - Track active menu item
  - Handle mobile menu toggle
```

```
Step 6: Create Navigation Module Factory

- Create src/modules/navigation/NavigationModule.ts
  - Create factory for navigation services
  - Implement dependency injection pattern
  - Add module initialization

- Update src/modules/navigation/index.ts
  - Export navigation hooks and types
  - Export module factory
```

### Phase 3: Layout and Integration

```
Step 7: Create Navigation Template

- Create src/presentation/templates/navigation/MainNavigation/MainNavigation.tsx
  - Integrate TopNavigation and UserDropdown
  - Connect with useNavigation hook
  - Handle responsive behavior
  - Implement mobile drawer for small screens
```

```
Step 8: Update Layout Structure

- Update src/app/dashboard/layout.tsx
  - Remove sidebar component
  - Integrate MainNavigation template
  - Update content container styling
  - Adjust padding and margins

- Update mobile layout handling
  - Replace mobile menu with drawer pattern
  - Ensure smooth transitions
```

### Phase 4: Refinement and Polish

```
Step 9: Add Animation and Transitions

- Enhance dropdown animations
  - Add smooth reveal animations
  - Implement fade effects
  - Ensure proper focus handling

- Refine responsive behavior
  - Test on various screen sizes
  - Optimize mobile experience
  - Add touch-friendly targets
```

```
Step 10: Accessibility and Final Testing

- Add keyboard navigation support
  - Implement focus trap in dropdown
  - Add keyboard shortcuts
  - Ensure tab order is logical

- Add ARIA attributes
  - Add proper roles and labels
  - Implement aria-expanded states
  - Test with screen readers

- Cross-browser testing
  - Verify functionality in all major browsers
  - Ensure consistent appearance
  - Fix any compatibility issues
```

## Color Scheme and Design Guidelines

### Primary Colors

- Primary: #42B4AC (Teal) - For primary actions and highlights
- Secondary: #4A5568 (Dark Gray) - For secondary elements
- Accent: #F6AD55 (Orange) - For accent elements and calls to action

### Neutral Colors

- Background: #FFFDF5 (Off-White) - Main background color
- Surface: #FFFFFF (White) - Cards and elevated surfaces
- Text: #2D3748 (Dark Gray) - Primary text color
- Subtle: #A0AEC0 (Light Gray) - Secondary text and icons

### UI States

- Hover: 10% darker than base color
- Active: 15% darker than base color
- Focus: 2px solid primary color with 0.5 opacity

### Typography

- Primary Font: Inter, system-ui, sans-serif
- Headings: 600 weight (semi-bold)
- Body: 400 weight (regular)
- Small Text: 14px, 300 weight (light)

### Spacing

- Base Unit: 4px
- Content Padding: 24px (6 units)
- Component Spacing: 16px (4 units)

### Shadows

- Dropdown: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)
- Navigation: 0 1px 3px rgba(0, 0, 0, 0.1)

### Border Radius

- Small Elements: 4px
- Medium Elements: 8px
- Large Elements: 12px

## User Experience Guidelines

1. **Immediacy**: Actions should provide immediate feedback
2. **Clarity**: Navigation options should be clear and descriptive
3. **Efficiency**: Minimize clicks needed to perform common tasks
4. **Context**: Users should always know where they are
5. **Consistency**: Similar actions should behave in similar ways

## Component Integration Guidelines

1. Follow Clean Architecture dependency rules
2. Use proper Atomic Design composition patterns
3. Keep state management in application layer
4. Implement proper accessibility patterns
5. Use consistent naming conventions
