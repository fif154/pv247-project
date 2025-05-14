'use server';

import { getInjection } from '@/server/di/container';
import { CreateMealPlan, MealPlan } from '@/server/entities/models/meal-plan';
import { revalidatePath } from 'next/cache';
import { DateRange } from 'react-day-picker';

export async function createMealPlanAction(
  data: CreateMealPlan,
  mealIds: string[]
) {
  const mealPlanController = getInjection('ICreateMealPlanController');
  await mealPlanController(data, mealIds);
  revalidatePath('/meal-plans');
  return { success: true };
}

export async function listMealPlansAction() {
  const mealPlanController = getInjection('IListMealPlansController');
  return await mealPlanController();
}

export async function getMealPlanAction(id: string) {
  const mealPlanController = getInjection('IGetMealPlanController');
  return await mealPlanController(id);
}

export const updateMealPlanAction = async (
  id: string,
  input: Partial<Omit<MealPlan, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>
) => {
  const controller = getInjection('IUpdateMealPlanController');
  return await controller(id, input);
};

export const deleteMealPlanAction = async (id: string) => {
  const controller = getInjection('IDeleteMealPlanController');
  await controller(id);
  revalidatePath('/auth/meal-plans');
};

export const copyMealsToDateRangeAction = async (
  mealPlanId: string,
  sourceDateRange: DateRange,
  targetDateRange: DateRange,
  randomize: boolean = false
) => {
  const controller = getInjection('ICopyMealsToDateRangeController');
  const result = await controller(
    mealPlanId,
    sourceDateRange,
    targetDateRange,
    randomize
  );
  revalidatePath('/auth/meal-plans');
  return result;
};
