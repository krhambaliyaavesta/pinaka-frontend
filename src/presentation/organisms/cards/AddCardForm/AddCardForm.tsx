import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/modules/cards';
import { Team } from '@/modules/teams';
import { Category } from '@/modules/categories';
import { TeamsModule } from '@/modules/teams/TeamsModule';
import { CategoriesModule } from '@/modules/categories/CategoriesModule';

export interface AddCardFormInputs {
  recipientName: string;
  teamId: number;
  categoryId: number;
  message: string;
}

interface AddCardFormProps {
  onSubmit: (data: AddCardFormInputs) => void;
  isSubmitting: boolean;
  cardToEdit?: Card | null;
  isEditMode?: boolean;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({ 
  onSubmit, 
  isSubmitting, 
  cardToEdit = null,
  isEditMode = false
}) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddCardFormInputs>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchTeamsAndCategories = async () => {
      try {
        const getTeamsUseCase = TeamsModule.createGetTeamsUseCase();
        const teamsData = await getTeamsUseCase.execute();
        setTeams(teamsData);
        const getCategoriesUseCase = CategoriesModule.createGetCategoriesUseCase();
        const categoriesData = await getCategoriesUseCase.execute();
        setCategories(categoriesData);

        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeamsAndCategories();
  }, []);

  // Reset form with existing values when editing
  useEffect(() => {
    if (isEditMode && cardToEdit && isDataLoaded) {
      // Make sure we explicitly set the values after data is loaded
      setValue('recipientName', cardToEdit.recipientName);
      setValue('teamId', cardToEdit.teamId);
      setValue('categoryId', cardToEdit.categoryId);
      setValue('message', cardToEdit.message);
      
      console.log('Setting form values:', {
        recipientName: cardToEdit.recipientName,
        teamId: cardToEdit.teamId, 
        categoryId: cardToEdit.categoryId,
        message: cardToEdit.message
      });
    } else if (!isEditMode) {
      reset({
        recipientName: '',
        teamId: 0,
        categoryId: 0,
        message: ''
      });
    }
  }, [reset, isEditMode, cardToEdit, setValue, isDataLoaded]);

  const onFormSubmit = (data: AddCardFormInputs) => {
    // Convert string IDs to numbers for API
    const formData = {
      ...data,
      teamId: Number(data.teamId),
      categoryId: Number(data.categoryId)
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
          Recipient Name
        </label>
        <input
          id="recipientName"
          type="text"
          className={`w-full p-2 border rounded-md ${errors.recipientName ? 'border-red-500' : 'border-gray-300'}`}
          {...register("recipientName", { 
            required: "Recipient name is required" 
          })}
        />
        {errors.recipientName && (
          <p className="mt-1 text-xs text-red-500">{errors.recipientName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 mb-1">
          Team
        </label>
        <select
          id="teamId"
          className={`w-full p-2 border rounded-md ${errors.teamId ? 'border-red-500' : 'border-gray-300'}`}
          {...register("teamId", { 
            required: "Team is required",
            valueAsNumber: true
          })}
          defaultValue={isEditMode && cardToEdit ? cardToEdit.teamId : ""}
        >
          <option value="">Select Team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {errors.teamId && (
          <p className="mt-1 text-xs text-red-500">{errors.teamId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="categoryId"
          className={`w-full p-2 border rounded-md ${errors.categoryId ? 'border-red-500' : 'border-gray-300'}`}
          {...register("categoryId", { 
            required: "Category is required",
            valueAsNumber: true
          })}
          defaultValue={isEditMode && cardToEdit ? cardToEdit.categoryId : ""}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-xs text-red-500">{errors.categoryId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`w-full p-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          {...register("message", { 
            required: "Message is required",
            minLength: { value: 10, message: "Message must be at least 10 characters" }
          })}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors disabled:bg-teal-300"
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Card' : 'Create Card'}
        </button>
      </div>
    </form>
  );
}; 