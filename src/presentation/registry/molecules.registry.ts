import { ToastWithAction } from "@/presentation/molecules/common/ToastWithAction/ToastWithAction";

/**
 * Common molecular components available throughout the application
 */
export const CommonMolecules = {
  ToastWithAction,
  // Other common molecules will be added here
};

/**
 * Main export for molecular components organized by module and feature
 */
export const Molecules = {
  common: CommonMolecules,
  // Other module-specific molecules will be added here
};

/**
 * Helper function to get a common molecule by name
 * @param name Name of the component
 * @returns The component
 */
export function getCommonMolecule(name: keyof typeof CommonMolecules) {
  return CommonMolecules[name];
}
