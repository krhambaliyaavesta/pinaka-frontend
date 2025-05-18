import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category } from "@/modules/categories";

interface AddCategoryFormProps {
  onSubmit: (data: AddCategoryFormInputs) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  categoryToEdit?: Category | null;
  isEditMode?: boolean;
}

export interface AddCategoryFormInputs {
  name: string;
}

export function AddCategoryForm({ 
  onSubmit, 
  onCancel, 
  isSubmitting = false, 
  categoryToEdit = null, 
  isEditMode = false 
}: AddCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddCategoryFormInputs>({
    mode: "onChange",
    defaultValues: {
      name: categoryToEdit ? categoryToEdit.name : ""
    }
  });

  // Update form values when categoryToEdit changes
  useEffect(() => {
    if (categoryToEdit) {
      reset({
        name: categoryToEdit.name
      });
    }
  }, [categoryToEdit, reset]);

  const handleFormSubmit: SubmitHandler<AddCategoryFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category Name
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
            errors.name ? "border-red-300" : "border-gray-300"
          }`}
          placeholder="Enter category name"
          disabled={isSubmitting}
          {...register("name", {
            required: "Category name is required",
            minLength: {
              value: 2,
              message: "Category name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Category name must be less than 50 characters",
            },
          })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditMode ? "Saving..." : "Creating..."}
            </div>
          ) : (
            isEditMode ? "Save Changes" : "Create Category"
          )}
        </button>
      </div>
    </form>
  );
} 