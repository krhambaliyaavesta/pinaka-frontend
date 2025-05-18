"use client";

import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TeamsTable, AddTeamModal, DeleteTeamModal } from "@/presentation/teams";
import { useTeams } from "@/modules/teams";
import { AddTeamFormInputs } from "@/presentation/organisms/teams/AddTeamForm";
import { FaPlus } from "react-icons/fa";
import { TeamsModule } from "@/modules/teams/TeamsModule";
import { useToast } from "@/modules/toast";
import { Team } from "@/modules/teams";
import { Loader } from "@/presentation/atoms/common";

export default function TeamsPage() {
  const { user, isLoading } = useAuth();
  const { teams: initialTeams, loading: teamsLoading, error } = useTeams();
  const router = useRouter();
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isDeleteTeamModalOpen, setIsDeleteTeamModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();

  // Update teams state when initialTeams loads
  useEffect(() => {
    if (initialTeams.length > 0) {
      setTeams(initialTeams);
    }
  }, [initialTeams]);

  // Authentication check
  useEffect(() => {
    if (!isLoading && (!user || (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN))) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handleAddTeam = async (data: AddTeamFormInputs) => {
    setIsSubmitting(true);
    try {
      const createTeamUseCase = TeamsModule.createCreateTeamUseCase();
      const newTeam = await createTeamUseCase.execute(data.name);
      
      // Update the teams array with the new team
      setTeams((prevTeams) => [...prevTeams, newTeam]);
      
      toast.success(`Team "${newTeam.name}" created successfully`, {
        title: "Success",
      });
      
      // Close the modal only after success
      setIsAddTeamModalOpen(false);
    } catch (err) {
      console.error("Error creating team:", err);
      toast.error(`Failed to create team: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (team: Team) => {
    setTeamToEdit(team);
    setIsEditMode(true);
    setIsAddTeamModalOpen(true);
  };

  const handleEditTeam = async (data: AddTeamFormInputs) => {
    if (!teamToEdit) return;
    
    setIsSubmitting(true);
    try {
      const updateTeamUseCase = TeamsModule.createUpdateTeamUseCase();
      const updatedTeam = await updateTeamUseCase.execute(teamToEdit.id, data.name);
      
      // Update the team in the state without refetching
      setTeams((prevTeams) => 
        prevTeams.map(team => 
          team.id === updatedTeam.id ? updatedTeam : team
        )
      );
      
      toast.success(`Team "${updatedTeam.name}" updated successfully`, {
        title: "Success",
      });
      
      // Close the modal and reset edit mode after success
      setIsAddTeamModalOpen(false);
      setTeamToEdit(null);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error updating team:", err);
      toast.error(`Failed to update team: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalSubmit = (data: AddTeamFormInputs) => {
    if (isEditMode) {
      handleEditTeam(data);
    } else {
      handleAddTeam(data);
    }
  };

  const handleModalClose = () => {
    setIsAddTeamModalOpen(false);
    setTeamToEdit(null);
    setIsEditMode(false);
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
    setIsDeleteTeamModalOpen(true);
  };

  const handleDeleteTeam = async () => {
    if (!teamToDelete) return;
    
    setIsDeleting(true);
    try {
      const deleteTeamUseCase = TeamsModule.createDeleteTeamUseCase();
      await deleteTeamUseCase.execute(teamToDelete.id);
      
      // Remove the deleted team from the state
      setTeams((prevTeams) => prevTeams.filter(team => team.id !== teamToDelete.id));
      
      toast.success(`Team "${teamToDelete.name}" deleted successfully`, {
        title: "Success",
      });
      
      // Close the modal after success
      setIsDeleteTeamModalOpen(false);
      setTeamToDelete(null);
    } catch (err) {
      console.error("Error deleting team:", err);
      toast.error(`Failed to delete team: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || teamsLoading || !user) {
    return <Loader label="Loading teams..." />;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading teams: {error.message}</div>;
  }

  return (
    <div className="container mx-auto pl-0 pr-2 py-4 bg-[#fffef9] min-h-screen">
      <div className="mb-4">
        <div className="bg-teal-600 py-3 px-4 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Our Teams</h1>
          <button
            onClick={() => {
              setIsEditMode(false);
              setTeamToEdit(null);
              setIsAddTeamModalOpen(true);
            }}
            className="px-3 py-1 bg-white text-teal-600 hover:bg-teal-50 font-medium rounded-md shadow-sm flex items-center cursor-pointer"
            disabled={isSubmitting}
          >
            <FaPlus className="mr-1" />
            Add Team
          </button>
        </div>
      </div>
      
      <TeamsTable 
        teams={teams} 
        onDeleteClick={handleDeleteClick} 
        onEditClick={handleEditClick}
      />

      <AddTeamModal 
        isOpen={isAddTeamModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
        teamToEdit={teamToEdit}
        isEditMode={isEditMode}
      />

      <DeleteTeamModal 
        isOpen={isDeleteTeamModalOpen}
        onClose={() => setIsDeleteTeamModalOpen(false)}
        onDelete={handleDeleteTeam}
        isDeleting={isDeleting}
        team={teamToDelete}
      />
    </div>
  );
} 