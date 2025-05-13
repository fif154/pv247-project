'use server';

import { getInjection } from '@/server/di/container';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
  Meal,
} from '@/server/entities/models/meal';
import { revalidatePath } from 'next/cache';
import { DateRange } from 'react-day-picker';

export async function createMealAction(
  data: Omit<CreateMeal, 'userId' | 'groupId'>,
  additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
  mealPlanId?: string
) {
  const mealController = getInjection('ICreateMealController');
  await mealController(data, additionalIngredients, mealPlanId);
  revalidatePath('/auth/meals');

  if (mealPlanId) {
    revalidatePath(`/auth/meal-plans/${mealPlanId}`);
  }
}

export async function listMealsAction(
  mealPlanId?: string,
  dateRange?: DateRange
) {
  const mealController = getInjection('IListMealsController');
  return await mealController(mealPlanId, dateRange);
}

export async function listMealsForDayAction(date: Date) {
  const mealController = getInjection('IListMealsForDayController');
  return await mealController({ date });
}
export const updateMealAction = async (
  id: string,
  input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
  additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[]
): Promise<
  Meal & { additionalIngredients?: CreateMealAdditionalIngredient[] }
> => {
  const controller = getInjection('IUpdateMealController');
  return controller(id, input, additionalIngredients);
};

export const deleteMealAction = async (id: string): Promise<void> => {
  const controller = getInjection('IDeleteMealController');
  await controller(id);
  revalidatePath('/auth/meals');
};
