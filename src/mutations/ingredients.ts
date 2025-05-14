import { 
  createIngredientAction, 
  deleteIngredientAction, 
  updateIngredientAction 
} from '@/app/ingredients/actions';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Type definition matching schema.ts and form
type CreateIngredientInput = {
  name: string;
  description?: string | undefined; // Changed from string | null
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
      // Convert null to undefined for description to match expected types
      const formatted = {
        ...data,
        category: data.category || '',
        // Convert null to undefined for description
        description: data.description === null ? undefined : data.description,
      };
      
      const result = await createIngredientAction(formatted);
      
      if (result && 'error' in result) {
        throw new Error(result.error);
      }
      
      return result;
    },
    onError: (error: any) => {
      showErrorToast(`Failed to create ingredient: ${error.message}`);
    },
    onSuccess: () => {
      showSuccessToast('Ingredient created successfully');
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
  });
};

// Rest of the file remains the same...

export const useUpdateIngredientMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Omit<CreateIngredientInput, 'category'>> }) => {
      // Map fields to expected format
      const updateData: any = {
        ...data,
        // Convert fat to fats if needed
        // Make sure description is in the right format
        description: data.description === null ? '' : data.description,
      };
      
      // If categoryId exists, use it for category
      if (data.categoryId !== undefined) {
        updateData.category = data.categoryId || '';
      }
      
      const result = await updateIngredientAction(id, updateData);
      
      if (result && 'error' in result) {
        throw new Error(result.error);
      }
      
      return result;
    },
    onError: (error: any) => {
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
      const result = await deleteIngredientAction(id);
      
      // Make sure result is defined before checking if it has an error property
      if (result && 'error' in result) {
        throw new Error(result.error);
      }
      
      return result || { success: true };
    },
    onError: (error: any) => {
      showErrorToast(`Failed to delete ingredient: ${error.message}`);
    },
    onSuccess: () => {
      showSuccessToast('Ingredient deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    },
  });
};