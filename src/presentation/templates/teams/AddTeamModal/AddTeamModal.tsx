"use client";

import React from "react";
import { Modal } from "@/presentation/molecules/common/Modal";
import { AddTeamForm, AddTeamFormInputs } from "@/presentation/organisms/teams/AddTeamForm";
import { Team } from "@/modules/teams";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddTeamFormInputs) => void;
  isSubmitting: boolean;
  teamToEdit?: Team | null;
  isEditMode?: boolean;
}

export function AddTeamModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isSubmitting = false,
  teamToEdit = null,
  isEditMode = false
}: AddTeamModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Team" : "Add New Team"}>
      <AddTeamForm 
        onSubmit={onSubmit} 
        onCancel={onClose} 
        isSubmitting={isSubmitting} 
        teamToEdit={teamToEdit}
        isEditMode={isEditMode}
      />
    </Modal>
  );
} 