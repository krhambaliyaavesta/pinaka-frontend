"use client";

import { useAuth } from "@/modules/auth";
import { UserRole } from "@/modules/auth/domain/enums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoriesTable, AddCategoryModal, DeleteCategoryModal } from "@/presentation/categories";
import { useCategories } from "@/modules/categories/application/hooks/useCategories";
import { AddCategoryFormInputs } from "@/presentation/organisms/categories/AddCategoryForm";
import { FaPlus } from "react-icons/fa";
import { CategoriesModule } from "@/modules/categories/CategoriesModule";
import { useToast } from "@/modules/toast";
import { Category } from "@/modules/categories";

export default function CategoriesPage() {
  const { user, isLoading } = useAuth();
  const { categories: initialCategories, loading: categoriesLoading, error } = useCategories();
  const router = useRouter();
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();

  // Update categories state when initialCategories loads
  useEffect(() => {
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  // Authentication check
  useEffect(() => {
    if (!isLoading && (!user || (user.role !== UserRole.LEAD && user.role !== UserRole.ADMIN))) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handleAddCategory = async (data: AddCategoryFormInputs) => {
    setIsSubmitting(true);
    try {
      const createCategoryUseCase = CategoriesModule.createCreateCategoryUseCase();
      const newCategory = await createCategoryUseCase.execute(data.name);
      
      // Update the categories array with the new category
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      
      toast.success(`Category "${newCategory.name}" created successfully`, {
        title: "Success",
      });
      
      // Close the modal only after success
      setIsAddCategoryModalOpen(false);
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error(`Failed to create category: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (category: Category) => {
    setCategoryToEdit(category);
    setIsEditMode(true);
    setIsAddCategoryModalOpen(true);
  };

  const handleEditCategory = async (data: AddCategoryFormInputs) => {
    if (!categoryToEdit) return;
    
    setIsSubmitting(true);
    try {
      const updateCategoryUseCase = CategoriesModule.createUpdateCategoryUseCase();
      const updatedCategory = await updateCategoryUseCase.execute(categoryToEdit.id, data.name);
      
      // Update the category in the state without refetching
      setCategories((prevCategories) => 
        prevCategories.map(category => 
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      
      toast.success(`Category "${updatedCategory.name}" updated successfully`, {
        title: "Success",
      });
      
      // Close the modal and reset edit mode after success
      setIsAddCategoryModalOpen(false);
      setCategoryToEdit(null);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error updating category:", err);
      toast.error(`Failed to update category: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalSubmit = (data: AddCategoryFormInputs) => {
    if (isEditMode) {
      handleEditCategory(data);
    } else {
      handleAddCategory(data);
    }
  };

  const handleModalClose = () => {
    setIsAddCategoryModalOpen(false);
    setCategoryToEdit(null);
    setIsEditMode(false);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteCategoryModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    setIsDeleting(true);
    try {
      const deleteCategoryUseCase = CategoriesModule.createDeleteCategoryUseCase();
      await deleteCategoryUseCase.execute(categoryToDelete.id);
      
      // Remove the deleted category from the state
      setCategories((prevCategories) => prevCategories.filter(category => category.id !== categoryToDelete.id));
      
      toast.success(`Category "${categoryToDelete.name}" deleted successfully`, {
        title: "Success",
      });
      
      // Close the modal after success
      setIsDeleteCategoryModalOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error(`Failed to delete category: ${err instanceof Error ? err.message : "Unknown error"}`, {
        title: "Error",
      });
      // Don't close modal on error
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || categoriesLoading || !user) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading categories: {error.message}</div>;
  }

  return (
    <div className="container mx-auto pl-0 pr-2 py-4 bg-[#fffef9] min-h-screen">
      <div className="mb-4">
        <div className="bg-teal-600 py-3 px-4 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Our Categories</h1>
          <button
            onClick={() => {
              setIsEditMode(false);
              setCategoryToEdit(null);
              setIsAddCategoryModalOpen(true);
            }}
            className="px-3 py-1 bg-white text-teal-600 hover:bg-teal-50 font-medium rounded-md shadow-sm flex items-center cursor-pointer"
            disabled={isSubmitting}
          >
            <FaPlus className="mr-1" />
            Add Category
          </button>
        </div>
      </div>
      
      <CategoriesTable 
        categories={categories} 
        onDeleteClick={handleDeleteClick} 
        onEditClick={handleEditClick}
      />

      <AddCategoryModal 
        isOpen={isAddCategoryModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
        categoryToEdit={categoryToEdit}
        isEditMode={isEditMode}
      />

      <DeleteCategoryModal 
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => setIsDeleteCategoryModalOpen(false)}
        onDelete={handleDeleteCategory}
        isDeleting={isDeleting}
        category={categoryToDelete}
      />
    </div>
  );
} 