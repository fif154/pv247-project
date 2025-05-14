'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';

export async function addMealToPlanAction(mealPlanId: string, mealId: string) {
  const mealPlanMealsController = getInjection('IAddMealToPlanController');
  await mealPlanMealsController(mealPlanId, mealId);
  revalidatePath('/meal-plans/[id]');
}

export async function removeMealFromPlanAction(
  mealPlanId: string,
  mealId: string
) {
  const mealPlanMealsController = getInjection('IRemoveMealFromPlanController');
  await mealPlanMealsController(mealPlanId, mealId);
  revalidatePath('/meal-plans/[id]');
}
