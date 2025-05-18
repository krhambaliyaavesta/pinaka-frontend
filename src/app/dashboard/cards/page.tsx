"use client";

import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardsTable, AddCardModal, DeleteCardModal } from "@/presentation/cards";
import { useCards } from "@/modules/cards/application/hooks/useCards";
import { AddCardFormInputs } from "@/presentation/organisms/cards/AddCardForm/AddCardForm";
import { FaPlus } from "react-icons/fa";
import { CardsModule } from "@/modules/cards/CardsModule";
import { useToast } from "@/modules/toast";
import { Card } from "@/modules/cards";
import { Loader } from "@/presentation/atoms/common";

export default function CardsPage() {
  const { user, isLoading } = useAuth();
  const { cards: initialCards, loading: cardsLoading, error } = useCards();
  const router = useRouter();
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isDeleteCardModalOpen, setIsDeleteCardModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();

  // Update cards state when initialCards loads
  useEffect(() => {
    if (initialCards.length > 0) {
      setCards(initialCards);
    }
  }, [initialCards]);

  // Authentication check
  useEffect(() => {
    if (!isLoading && (!user || (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN))) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handleAddCard = async (data: AddCardFormInputs) => {
    setIsSubmitting(true);
    try {
      const createCardUseCase = CardsModule.createCreateCardUseCase();
      const newCard = await createCardUseCase.execute(
        data.recipientName,
        data.teamId,
        data.categoryId,
        data.message
      );
      
      // Update the cards array with the new card
      setCards((prevCards) => [...prevCards, newCard]);
      
      toast.success(`Card for "${newCard.recipientName}" created successfully`, {
        title: "Success",
      });
      
      // Close the modal only after success
      setIsAddCardModalOpen(false);
    } catch (err) {
      console.error("Error creating card:", err);
      toast.error(`Failed to create card: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (card: Card) => {
    setCardToEdit(card);
    setIsEditMode(true);
    setIsAddCardModalOpen(true);
  };

  const handleEditCard = async (data: AddCardFormInputs) => {
    if (!cardToEdit) return;
    
    setIsSubmitting(true);
    try {
      const updateCardUseCase = CardsModule.createUpdateCardUseCase();
      const updatedCard = await updateCardUseCase.execute(cardToEdit.id, data);
      
      // Update the card in the state without refetching
      setCards((prevCards) => 
        prevCards.map(card => 
          card.id === updatedCard.id ? updatedCard : card
        )
      );
      
      toast.success(`Card for "${updatedCard.recipientName}" updated successfully`, {
        title: "Success",
      });
      
      // Close the modal and reset edit mode after success
      setIsAddCardModalOpen(false);
      setCardToEdit(null);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error updating card:", err);
      toast.error(`Failed to update card: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalSubmit = (data: AddCardFormInputs) => {
    if (isEditMode) {
      handleEditCard(data);
    } else {
      handleAddCard(data);
    }
  };

  const handleModalClose = () => {
    setIsAddCardModalOpen(false);
    setCardToEdit(null);
    setIsEditMode(false);
  };

  const handleDeleteClick = (card: Card) => {
    setCardToDelete(card);
    setIsDeleteCardModalOpen(true);
  };

  const handleDeleteCard = async () => {
    if (!cardToDelete) return;
    
    setIsDeleting(true);
    try {
      const deleteCardUseCase = CardsModule.createDeleteCardUseCase();
      await deleteCardUseCase.execute(cardToDelete.id);
      
      // Remove the deleted card from the state
      setCards((prevCards) => prevCards.filter(card => card.id !== cardToDelete.id));
      
      toast.success(`Card for "${cardToDelete.recipientName}" deleted successfully`, {
        title: "Success",
      });
      
      // Close the modal after success
      setIsDeleteCardModalOpen(false);
      setCardToDelete(null);
    } catch (err) {
      console.error("Error deleting card:", err);
      toast.error(`Failed to delete card: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || cardsLoading || !user) {
    return <Loader label="Loading cards..." />;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading cards: {error.message}</div>;
  }

  return (
    <div className="container mx-auto pl-0 pr-2 py-4 bg-[#fffef9] min-h-screen">
      <div className="mb-4">
        <div className="bg-teal-600 py-3 px-4 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Recognition Cards</h1>
          <button
            onClick={() => {
              setIsEditMode(false);
              setCardToEdit(null);
              setIsAddCardModalOpen(true);
            }}
            className="px-3 py-1 bg-white text-teal-600 hover:bg-teal-50 font-medium rounded-md shadow-sm flex items-center cursor-pointer"
            disabled={isSubmitting}
          >
            <FaPlus className="mr-1" />
            Add Card
          </button>
        </div>
      </div>
      
      <CardsTable 
        cards={cards} 
        onDeleteClick={handleDeleteClick} 
        onEditClick={handleEditClick}
      />

      <AddCardModal 
        isOpen={isAddCardModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
        cardToEdit={cardToEdit}
        isEditMode={isEditMode}
      />

      <DeleteCardModal 
        isOpen={isDeleteCardModalOpen}
        onClose={() => setIsDeleteCardModalOpen(false)}
        onDelete={handleDeleteCard}
        isDeleting={isDeleting}
        card={cardToDelete}
      />
    </div>
  );
} 