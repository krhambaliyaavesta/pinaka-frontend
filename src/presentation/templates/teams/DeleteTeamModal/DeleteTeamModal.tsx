"use client";

import React from "react";
import { Modal } from "@/presentation/molecules/common/Modal";
import { Team } from "@/modules/teams";

interface DeleteTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  team: Team | null;
}

export function DeleteTeamModal({ 
  isOpen, 
  onClose, 
  onDelete, 
  isDeleting = false,
  team 
}: DeleteTeamModalProps) {
  if (!team) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Team">
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete team <span className="font-semibold">{team.name}</span>?
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium cursor-pointer"
            disabled={isDeleting}
          >
            Cancel
          </button>
          
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium flex items-center justify-center cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="animate-pulse mr-2">●</span>
                Deleting...
              </>
            ) : (
              "Delete Team"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
} 