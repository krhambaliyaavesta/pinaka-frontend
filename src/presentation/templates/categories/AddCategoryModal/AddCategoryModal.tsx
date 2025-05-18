"use client";

import React from "react";
import { Modal } from "@/presentation/molecules/common/Modal";
import { AddCategoryForm, AddCategoryFormInputs } from "@/presentation/organisms/categories/AddCategoryForm";
import { Category } from "@/modules/categories";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddCategoryFormInputs) => void;
  isSubmitting: boolean;
  categoryToEdit?: Category | null;
  isEditMode?: boolean;
}

export function AddCategoryModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isSubmitting = false,
  categoryToEdit = null,
  isEditMode = false
}: AddCategoryModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category" : "Add New Category"}>
      <AddCategoryForm 
        onSubmit={onSubmit} 
        onCancel={onClose} 
        isSubmitting={isSubmitting} 
        categoryToEdit={categoryToEdit}
        isEditMode={isEditMode}
      />
    </Modal>
  );
} 