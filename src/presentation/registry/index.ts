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

/**
 * Main component registry for the application
 * Provides access to all registered components organized by type and module
 */
export const ComponentRegistry = {
  atoms: Atoms,
  molecules: Molecules,
  organisms: Organisms,
};

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
};
