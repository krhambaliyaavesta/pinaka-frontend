import { Atoms, CommonAtoms, getCommonAtom } from "./atoms.registry";
import {
  Molecules,
  CommonMolecules,
  getCommonMolecule,
} from "./molecules.registry";
import {
  Organisms,
  CommonOrganisms,
  getCommonOrganism,
} from "./organisms.registry";
import { Templates, CommonTemplates } from "./templates.registry";

/**
 * Main component registry for the application
 * Provides access to all registered components organized by type and module
 */
export const ComponentRegistry = {
  atoms: Atoms,
  molecules: Molecules,
  organisms: Organisms,
  templates: Templates,
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
  getCommonAtom,

  // Molecules
  Molecules,
  CommonMolecules,
  getCommonMolecule,

  // Organisms
  Organisms,
  CommonOrganisms,
  getCommonOrganism,

  // Templates
  Templates,
  CommonTemplates,
};
