import React from 'react';
import { Modal } from '../../molecules/common/Modal/Modal';
import { AddCardForm, AddCardFormInputs } from '../../organisms/cards/AddCardForm/AddCardForm';
import { Card } from '@/modules/cards';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddCardFormInputs) => void;
  isSubmitting: boolean;
  cardToEdit?: Card | null;
  isEditMode?: boolean;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  cardToEdit = null,
  isEditMode = false
}) => {
  const title = isEditMode ? 'Edit Card' : 'Add New Card';
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <AddCardForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        cardToEdit={cardToEdit}
        isEditMode={isEditMode}
      />
    </Modal>
  );
}; 