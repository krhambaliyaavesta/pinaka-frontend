import { Toaster } from "../organisms/common/ToastContainer/ToastContainer";

/**
 * Common organism components available throughout the application
 */
export const CommonOrganisms = {
  Toaster,
  // Other common organisms will be added here
};

/**
 * Main export for organism components organized by module and feature
 */
export const Organisms = {
  common: CommonOrganisms,
  // Other module-specific organisms will be added here
};

/**
 * Helper function to get a common organism by name
 * @param name Name of the component
 * @returns The component
 */
export function getCommonOrganism(name: keyof typeof CommonOrganisms) {
  return CommonOrganisms[name];
}
