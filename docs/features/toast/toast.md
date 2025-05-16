# Toast Service Architecture

This document outlines the architecture and implementation guidelines for the Toast Notification Service in the Pinaka Frontend project.

## Overview

The Toast Service provides a standardized way to display non-disruptive notifications to users across the application. It follows the project's Clean Architecture principles and is organized as a self-contained module.

## Architecture Layers

### 1. Domain Layer

The core business entities and rules for the toast service.

```
src/modules/toast/domain/
├── entities/
│   └── Toast.ts                 # Core toast entity with required properties
├── interfaces/
│   ├── IToast.ts                # Interface for toast entity
│   └── IToastService.ts         # Interface defining toast service methods
├── enums/
│   └── ToastType.ts             # Enum for toast types (success, error, etc.)
└── errors/
    └── ToastError.ts            # Domain-specific errors for toast operations
```

**Key Components:**

- `IToast` interface: Defines the structure of a toast notification (id, message, type, duration, etc.)
- `IToastService` interface: Defines the contract for toast operations (show, hide, update)
- `ToastType` enum: Standardizes toast types (success, error, warning, info)

### 2. Application Layer

The use cases and business logic for the toast service.

```
src/modules/toast/application/
├── services/
│   └── ToastService.ts          # Implementation of IToastService interface
├── dtos/
│   ├── CreateToastDto.ts        # Data transfer object for creating toasts
│   └── UpdateToastDto.ts        # Data transfer object for updating toasts
└── ports/
    └── IToastPresenter.ts       # Interface for presenting toasts (output port)
```

**Key Components:**

- `ToastService`: Implements the `IToastService` interface with methods for displaying different types of toasts
- Data Transfer Objects (DTOs): Define the structure of data for toast operations
- `IToastPresenter` interface: Defines how toasts should be presented (output port)

### 3. Infrastructure Layer

React-specific implementations for the toast service.

```
src/modules/toast/infrastructure/
├── repositories/
│   └── ToastRepository.ts       # Repository for managing toast state
├── providers/
│   └── ToastProvider.tsx        # React Context provider for toast state
├── presenters/
│   └── ToastPresenter.ts        # Implementation of IToastPresenter for React
└── hooks/
    └── useToast.ts              # Custom hook for accessing toast service in React components
```

**Key Components:**

- `ToastRepository`: Manages the state of active toasts
- `ToastProvider`: Provides toast context to React components
- `ToastPresenter`: Implements the presentation logic for toasts
- `useToast` hook: Simplified interface for components to use the toast service

### 4. Presentation Layer

UI components for displaying toasts, using shadcn components and following Atomic Design principles.

```
src/presentation/
├── atoms/
│   └── common/
│       └── Toast/               # Wrapper around shadcn Toast component
├── molecules/
│   └── common/
│       └── ToastWithAction/     # Toast with action buttons
├── organisms/
│   └── common/
│       └── ToastContainer/      # Container using shadcn's toast provider
└── registry/
    └── atoms.registry.ts        # Register toast components in registry
```

**Key Components:**

- `Toast` (atom): Wrapper around shadcn's Toast component with our styling
- `ToastWithAction` (molecule): Enhanced toast with action buttons using shadcn components
- `ToastContainer` (organism): Uses shadcn's toast provider for positioning and animations

**shadcn Integration:**

The presentation layer leverages shadcn/ui components, specifically:

- `toast` component from shadcn for consistent styling
- `useToast` hook from shadcn for managing toast state
- `Toaster` component for rendering toasts

This approach allows us to maintain design system consistency while following clean architecture principles.

### 5. Module Factory

Centralized dependency management for the toast service.

```
src/modules/toast/ToastModule.ts
```

**Key Responsibilities:**

- Provides static factory methods to create instances of toast services
- Manages singleton instances of repositories and services
- Handles the dependency graph for the toast module

## Implementation Guidelines

### Configuration Options

The toast service should support the following configuration options:

- **Position**: Where toasts appear (top-right, bottom-left, etc.)
- **Duration**: How long toasts remain visible (in milliseconds)
- **Max Visible**: Maximum number of toasts visible at once
- **Animation**: Type of entrance/exit animation

### Toast Types

Standard toast types to implement:

- **Success**: For successful operations
- **Error**: For errors and failures
- **Warning**: For warnings and potential issues
- **Info**: For general information

### Usage Example

```tsx
// In any component
import { useToast } from "@/modules/toast";

function MyComponent() {
  const { success, error } = useToast();

  const handleSuccessAction = () => {
    success("Operation completed successfully");
  };

  const handleErrorAction = () => {
    error("Something went wrong", {
      duration: 5000,
      position: "bottom-right",
    });
  };

  return (
    <div>
      <button onClick={handleSuccessAction}>Success Action</button>
      <button onClick={handleErrorAction}>Error Action</button>
    </div>
  );
}
```

## Provider Setup

The toast provider should be set up at the application root:

```tsx
// src/app/layout.tsx or appropriate root component
import { ToastProvider } from "@/modules/toast/infrastructure/providers/ToastProvider";
import { Toaster } from "@/presentation/organisms/common/ToastContainer/ToastContainer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
```

## Accessibility Considerations

The toast implementation should follow these accessibility guidelines:

1. Use appropriate ARIA roles and attributes (leveraging shadcn's built-in accessibility)
2. Support keyboard navigation and dismissal
3. Ensure sufficient color contrast
4. Provide screen reader announcements for new toasts
5. Respect user motion preferences for animations

## Testing Strategy

1. **Unit Tests**: Test individual service methods and components
2. **Integration Tests**: Test the interaction between layers
3. **Component Tests**: Test the UI components with various props
4. **Accessibility Tests**: Verify accessibility compliance
5. **E2E Tests**: Test the complete toast functionality in the application

## Future Enhancements

Potential future enhancements to consider:

1. Support for custom toast templates
2. Progress indicators for long-running operations
3. Action buttons within toasts
4. Toast grouping for similar notifications
5. Persistence options for important notifications
