import React from 'react';
import { Modal } from '../../molecules/common/Modal/Modal';
import { Card } from '@/modules/cards';

interface DeleteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  card: Card | null;
}

export const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  isDeleting,
  card
}) => {
  if (!card) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Card">
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete the card for <span className="font-medium">{card.recipientName}</span>?
        </p>
        <p className="text-gray-600 text-sm">
          This action cannot be undone and will permanently remove the card.
        </p>
        
        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
}; 