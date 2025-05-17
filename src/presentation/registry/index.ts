import {
  Atoms,
  CommonAtoms,
  UserManagementAtoms,
  getCommonAtom,
  getUserManagementAtom,
} from "./atoms.registry";
import {
  Molecules,
  CommonMolecules,
  UserManagementMolecules,
  getCommonMolecule,
  getUserManagementMolecule,
} from "./molecules.registry";
import {
  Organisms,
  CommonOrganisms,
  UserManagementOrganisms,
  getCommonOrganism,
  getUserManagementOrganism,
} from "./organisms.registry";
import {
  Templates,
  CommonTemplates,
  UserManagementTemplates,
  getUserManagementTemplate,
} from "./templates.registry";
import {
  Pages,
  UserManagementPages,
  getUserManagementPage,
} from "./pages.registry";

/**
 * Main component registry for the application
 * Provides access to all registered components organized by type and module
 */
export const ComponentRegistry = {
  atoms: Atoms,
  molecules: Molecules,
  organisms: Organisms,
  templates: Templates,
  pages: Pages,
};

/**
 * Helper function to get a common template component
 */
export function getCommonTemplate<K extends keyof typeof CommonTemplates>(
  name: K
) {
  return CommonTemplates[name];
}

export {
  // Atoms
  Atoms,
  CommonAtoms,
  UserManagementAtoms,
  getCommonAtom,
  getUserManagementAtom,

  // Molecules
  Molecules,
  CommonMolecules,
  UserManagementMolecules,
  getCommonMolecule,
  getUserManagementMolecule,

  // Organisms
  Organisms,
  CommonOrganisms,
  UserManagementOrganisms,
  getCommonOrganism,
  getUserManagementOrganism,

  // Templates
  Templates,
  CommonTemplates,
  UserManagementTemplates,
  getUserManagementTemplate,

  // Pages
  Pages,
  UserManagementPages,
  getUserManagementPage,
};
