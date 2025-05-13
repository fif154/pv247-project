import { createMealPlanAction } from '@/app/auth/meal-plans/actions';
import { MealPlanFormValues } from '@/components/forms/meal-plan/meal-plan-form';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateMealPlanMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ data }: { data: MealPlanFormValues }) => {
      createMealPlanAction(
        { ...data, startDate: data.dateRange.from, endDate: data.dateRange.to },
        []
      );
    },
    onError: () => {
      showErrorToast('Failed to create meal plan');
    },
    onSuccess: () => {
      showSuccessToast('Meal plan created successfully');
      router.push('/auth/meal-plans');
    },
  });
};
