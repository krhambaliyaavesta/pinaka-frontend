# Toast Service Setup Guide

This guide provides step-by-step instructions for implementing the Toast Notification Service in your application.

## Installation

1. **Install required dependencies**

   The toast service uses shadcn/ui's toast component. Install it using:

   ```bash
   npm install sonner
   ```

## Implementation Steps

### 1. Set up the Root Layout

Add the ToastProvider and Toaster components to your root layout:

```tsx
// src/app/layout.tsx
import { ToastProvider } from "@/modules/toast/infrastructure/providers/ToastProvider";
import { Toaster } from "@/presentation/organisms/common/ToastContainer/ToastContainer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <Toaster position="top-right" maxVisible={3} defaultDuration={5000} />
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 2. Using the Toast Service in Components

Import and use the `useToast` hook to display toasts in your components:

```tsx
import { useToast } from "@/modules/toast";

function MyComponent() {
  const { success, error, warning, info } = useToast();

  const handleSuccessAction = () => {
    success("Operation completed successfully", {
      title: "Success",
      duration: 5000,
    });
  };

  const handleErrorAction = () => {
    error("Something went wrong", {
      title: "Error",
      duration: 7000,
      action: {
        label: "Retry",
        onClick: () => {
          console.log("Retry action clicked");
        },
      },
    });
  };

  return (
    <div>
      <button onClick={handleSuccessAction}>Show Success Toast</button>
      <button onClick={handleErrorAction}>Show Error Toast</button>
    </div>
  );
}
```

### 3. Configuration Options

The toast service supports several configuration options:

#### Toast Container Options

These options are set when rendering the `<Toaster />` component:

| Option          | Type          | Default     | Description                             |
| --------------- | ------------- | ----------- | --------------------------------------- |
| position        | ToastPosition | "top-right" | Where toasts appear on screen           |
| maxVisible      | number        | 3           | Maximum toasts visible at once          |
| defaultDuration | number        | 5000        | Default time (ms) toasts remain visible |
| expandOnHover   | boolean       | true        | Whether toasts expand on hover          |

#### Individual Toast Options

These options can be passed to any toast method (success, error, warning, info):

| Option      | Type                                   | Description                                      |
| ----------- | -------------------------------------- | ------------------------------------------------ |
| title       | string                                 | Optional title for the toast                     |
| duration    | number                                 | Duration in milliseconds for this specific toast |
| dismissible | boolean                                | Whether the toast can be dismissed manually      |
| action      | { label: string, onClick: () => void } | Action button for the toast                      |

## Accessibility Considerations

The toast implementation follows these accessibility guidelines:

1. Uses appropriate ARIA roles and attributes
2. Supports keyboard navigation and dismissal
3. Ensures sufficient color contrast
4. Provides screen reader announcements for new toasts
5. Respects user motion preferences for animations

## Advanced Usage

### Using ToastWithAction Component

For more complex interactions, you can use the ToastWithAction component directly:

```tsx
import { ToastWithAction } from "@/presentation/molecules/common/ToastWithAction/ToastWithAction";
import { ToastType } from "@/modules/toast";

function MyAdvancedComponent() {
  return (
    <ToastWithAction
      type={ToastType.SUCCESS}
      message="Your profile has been updated"
      title="Success"
      primaryAction={{
        label: "View Profile",
        onClick: () => console.log("View profile clicked"),
      }}
      secondaryAction={{
        label: "Dismiss",
        onClick: () => console.log("Dismissed"),
      }}
    />
  );
}
```

### Using the Component Registry

You can access toast components through the component registry:

```tsx
import { ComponentRegistry } from "@/presentation/registry";

// Get toast components
const Toast = ComponentRegistry.atoms.common.Toast;
const ToastWithAction = ComponentRegistry.molecules.common.ToastWithAction;
const Toaster = ComponentRegistry.organisms.common.Toaster;
```
