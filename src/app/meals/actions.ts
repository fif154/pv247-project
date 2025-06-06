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

export const updateMealAction = async (
  id: string,
  input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
  additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
  mealPlanId?: string,
  dnd = false
) => {
  const controller = getInjection('IUpdateMealController');
  const res = await controller(id, input, additionalIngredients, dnd);
  revalidatePath('/auth/meals');
  revalidatePath(`/auth/meal-plans/${mealPlanId}`);

  return res;
};

export const deleteMealAction = async (id: string): Promise<void> => {
  const controller = getInjection('IDeleteMealController');
  await controller(id);
  revalidatePath('/auth/meals');
};
