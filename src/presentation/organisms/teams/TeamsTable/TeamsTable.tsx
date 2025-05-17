import React from "react";
import { Table } from "../../../molecules/common/Table/Table";
import { Team } from "@/modules/teams";
import { FaTrash, FaEdit } from "react-icons/fa";

interface TeamsTableProps {
  teams: Team[];
  onDeleteClick: (team: Team) => void;
  onEditClick: (team: Team) => void;
}

export const TeamsTable: React.FC<TeamsTableProps> = ({ teams, onDeleteClick, onEditClick }) => {
  const headers = [
    <div key="header-no" className="text-center">No.</div>,
    <div key="header-name" className="text-center">Team Name</div>,
    <div key="header-actions" className="text-center">Actions</div>
  ];
  
  const data = teams.map((team, index) => [
    index + 1,
    <div key={`name-${team.id}`} className="text-center">{team.name}</div>,
    <div key={`action-${team.id}`} className="flex justify-center space-x-2">
      <button
        onClick={() => onEditClick(team)}
        className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-pointer"
        aria-label={`Edit ${team.name}`}
      >
        <FaEdit />
      </button>
      <button
        onClick={() => onDeleteClick(team)}
        className="text-red-500 hover:text-red-700 p-1 rounded cursor-pointer"
        aria-label={`Delete ${team.name}`}
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