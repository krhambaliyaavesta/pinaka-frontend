import React from 'react';
import { Modal } from '../../molecules/common/Modal/Modal';
import { Card } from '@/modules/cards';

interface ViewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card | null;
}

export const ViewCardModal: React.FC<ViewCardModalProps> = ({
  isOpen,
  onClose,
  card
}) => {
  if (!card) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Card Details">
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Card for {card.recipientName}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Team</p>
              <p className="text-sm font-medium">{card.teamName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-sm font-medium">{card.categoryName}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Message</p>
            <div className="p-3 bg-white rounded border border-gray-200">
              <p className="text-sm whitespace-pre-wrap">{card.message}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Created By</p>
              <p className="text-sm font-medium">{card.creatorName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="text-sm font-medium">{new Date(card.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}; 