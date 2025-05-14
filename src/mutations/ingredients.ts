import {
  createIngredientAction,
  deleteIngredientAction,
  updateIngredientAction,
} from '@/app/ingredients/actions';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Type definition matching schema.ts and form
type CreateIngredientInput = {
  name: string;
  description?: string | undefined;
  imageUrl?: string | null;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  baseMacroQuantity: number;
  categoryId?: string | null;
  unit: string;
  category: string;
};

export const useCreateIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateIngredientInput) => {
      const formatted = {
        ...data,
        category: data.category || '',
        description: data.description === null ? undefined : data.description,
      };

      try {
        const result = await createIngredientAction(formatted);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(String(error));
      }
    },
    onError: (error: Error) => {
      showErrorToast(`Failed to create ingredient: ${error.message}`);
    },
    onSuccess: () => {
      showSuccessToast('Ingredient created successfully');
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
  });
};

export const useUpdateIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<CreateIngredientInput, 'category'>>;
    }) => {
      const updateData: any = {
        ...data,
        description: data.description === null ? undefined : data.description,
      };

      if (data.categoryId !== undefined) {
        updateData.category = data.categoryId || '';
      }

      try {
        const result = await updateIngredientAction(id, updateData);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(String(error));
      }
    },
    onError: (error: Error) => {
      showErrorToast(`Failed to update ingredient: ${error.message}`);
    },
    onSuccess: () => {
      showSuccessToast('Ingredient updated successfully');
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
  });
};

export const useDeleteIngredientMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteIngredientAction(id);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(String(error));
      }
    },
    onError: (error: Error) => {
      showErrorToast(`Failed to delete ingredient: ${error.message}`);
    },
    onSuccess: () => {
      showSuccessToast('Ingredient deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
  });
};
