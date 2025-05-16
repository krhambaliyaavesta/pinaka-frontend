import { Toast } from "../atoms/common/Toast/Toast";

/**
 * Common atomic components available throughout the application
 */
export const CommonAtoms = {
  Toast,
  // Other common atoms will be added here
};

/**
 * Main export for atomic components organized by module and feature
 */
export const Atoms = {
  common: CommonAtoms,
  // Other module-specific atoms will be added here
};

/**
 * Helper function to get a common atom by name
 * @param name Name of the component
 * @returns The component
 */
export function getCommonAtom(name: keyof typeof CommonAtoms) {
  return CommonAtoms[name];
}
