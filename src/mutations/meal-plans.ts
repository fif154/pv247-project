import {
  copyMealsToDateRangeAction,
  createMealPlanAction,
  deleteMealPlanAction,
  updateMealPlanAction,
} from '@/app/auth/meal-plans/actions';
import { MealPlanFormValues } from '@/components/forms/meal-plan/meal-plan-form';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';

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

export const useEditMealPlanMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ data }: { data: MealPlanFormValues }) => {
      updateMealPlanAction(data.id!, {
        ...data,
        startDate: data.dateRange.from,
        endDate: data.dateRange.to,
      });
    },
    onError: () => {
      showErrorToast('Failed to edit meal plan');
    },
    onSuccess: () => {
      showSuccessToast('Meal plan edited successfully');
      router.push('/auth/meal-plans');
    },
  });
};

export const useDeleteMealPlanMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteMealPlanAction(id);
    },
    onError: () => {
      showErrorToast('Failed to delete meal plan');
    },
    onSuccess: () => {
      showSuccessToast('Meal plan deleted successfully');
      router.push('/auth/meal-plans');
    },
  });
};

export const useCopyMealsToDateRangeMutation = () => {
  return useMutation({
    mutationFn: async ({
      mealPlanId,
      sourceDateRange,
      targetDateRange,
      randomize = false,
    }: {
      mealPlanId: string;
      sourceDateRange: DateRange;
      targetDateRange: DateRange;
      randomize?: boolean;
    }) => {
      await copyMealsToDateRangeAction(
        mealPlanId,
        sourceDateRange,
        targetDateRange,
        randomize
      );
    },
    onError: () => {
      showErrorToast('Failed to copy meals');
    },
    onSuccess: () => {
      showSuccessToast('Meals copied successfully');
    },
  });
};
