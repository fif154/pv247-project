import {
  createIngredientAction,
  deleteIngredientAction,
  updateIngredientAction,
} from '@/app/auth/ingredients/actions';
import { CreateIngredient } from '@/server/entities/models/ingredient';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<CreateIngredient, 'groupId'>) => {
      const formatted = {
        ...data,
        categoryId: data.categoryId,
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
      data: Partial<Omit<CreateIngredient, 'category'>>;
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
