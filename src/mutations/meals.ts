import {
  createMealAction,
  deleteMealAction,
  updateMealAction,
} from '@/app/meals/actions';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
} from '@/server/entities/models/meal';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useCreateMealMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: {
      data: Omit<CreateMeal, 'userId' | 'groupId'>;
      additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[];
      mealPlanId?: string;
    }) => {
      return createMealAction(
        data.data,
        data.additionalIngredients,
        data.mealPlanId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      showSuccessToast('Meal created successfully');
      router.refresh();
    },
    onError: (error) => {
      showErrorToast('Error creating meal');
      console.error('Error creating meal:', error);
    },
  });
}

export function useUpdateMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      mealId: string;
      data: Partial<Omit<CreateMeal, 'userId' | 'groupId'>>;
      additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[];
    }) => {
      return updateMealAction(data.mealId, data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      showSuccessToast('Meal updated successfully');
    },
    onError: (error) => {
      showErrorToast('Error updating meal');
      console.error('Error updating meal:', error);
    },
  });
}

export function useDeleteMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mealId: string) => {
      return deleteMealAction(mealId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      showSuccessToast('Meal deleted successfully');
    },
    onError: (error) => {
      showErrorToast('Error deleting meal');
      console.error('Error deleting meal:', error);
    },
  });
}
