# Import Path Rules

This project follows specific rules for import path patterns to maintain consistency and improve code readability.

## Rules

1. **Use `@/` for imports outside the current directory:**
   - All imports that would normally use `../` (parent directory) should use the `@/` alias instead
   - This makes imports cleaner and prevents deep nesting of relative paths
   - Example: `import { Component } from '@/presentation/atoms/Component'`

2. **Use `./` for imports within the same directory:**
   - For files in the same directory, always use the `./` prefix
   - Example: `import { utils } from './utils'`

## Benefits

- **Readability:** Simplified import paths make the code more readable
- **Maintainability:** Moving files around becomes easier as you don't need to update deep relative paths
- **Consistency:** Consistent import style across the codebase
- **Intelligence:** IDE auto-imports work better with aliased paths

## Technical Implementation

This pattern is enforced through:

1. **Path Aliases:** Configured in `tsconfig.json`:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

2. **ESLint Rules:** Configured in `eslint.config.mjs` to enforce the pattern:
   - Preventing `../` imports in favor of `@/`
   - Requiring `./` for same-directory imports

## Scripts

Two utility scripts are available to help maintain the import patterns:

1. **`update-imports.js`:** Converts relative parent imports (`../`) to alias imports (`@/`)
2. **`fix-local-imports.js`:** Ensures imports within the same directory use `./`

Run these scripts if you need to batch-fix imports across the project:

```bash
node update-imports.js
node fix-local-imports.js
``` 