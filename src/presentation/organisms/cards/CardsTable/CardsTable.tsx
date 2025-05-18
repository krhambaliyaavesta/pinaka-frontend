import React from "react";
import { Table } from "../../../molecules/common/Table/Table";
import { Card } from "@/modules/cards";
import { FaTrash, FaEdit } from "react-icons/fa";

interface CardsTableProps {
  cards: Card[];
  onDeleteClick: (card: Card) => void;
  onEditClick: (card: Card) => void;
  onViewClick?: (card: Card) => void;
}

export const CardsTable: React.FC<CardsTableProps> = ({ 
  cards, 
  onDeleteClick, 
  onEditClick,
  onViewClick 
}) => {
  const headers = [
    <div key="header-no" className="text-center">No.</div>,
    <div key="header-recipient" className="text-center">Recipient</div>,
    <div key="header-team" className="text-center">Team</div>,
    <div key="header-category" className="text-center">Category</div>,
    <div key="header-message" className="text-center">Message</div>,
    <div key="header-actions" className="text-center">Actions</div>
  ];
  
  const data = cards.map((card, index) => [
    index + 1,
    <div key={`recipient-${card.id}`} className="text-center">{card.recipientName}</div>,
    <div key={`team-${card.id}`} className="text-center">{card.teamName}</div>,
    <div key={`category-${card.id}`} className="text-center">{card.categoryName}</div>,
    <div 
      key={`message-${card.id}`} 
      className="text-center truncate max-w-xs mx-auto"
      title={card.message}
    >
      {card.message.length > 40 ? `${card.message.substring(0, 40)}...` : card.message}
    </div>,
    <div key={`action-${card.id}`} className="flex justify-center space-x-3">
      <button
        onClick={() => onEditClick(card)}
        className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-pointer"
        aria-label={`Edit ${card.recipientName}'s card`}
        title="Edit card"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => onDeleteClick(card)}
        className="text-red-500 hover:text-red-700 p-1 rounded cursor-pointer"
        aria-label={`Delete ${card.recipientName}'s card`}
        title="Delete card"
      >
        <FaTrash />
      </button>
    </div>
  ]);
  
  return (
    <div className="mt-4">
      <Table headers={headers} data={data} />
    </div>
  );
}; 