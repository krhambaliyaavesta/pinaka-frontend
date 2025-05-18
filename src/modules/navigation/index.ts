// Export module factory
export { NavigationModule } from "./NavigationModule";

// Export domain types and interfaces
export { MenuSection } from "./domain/types";
export type { MenuItem } from "./domain/types";
export type { INavigationService } from "./domain/interfaces/INavigationService";

// Export application hooks
export { useNavigation } from "./application/hooks/useNavigation";
export type { UseNavigationProps } from "./application/hooks/useNavigation";
