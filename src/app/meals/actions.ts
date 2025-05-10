'use server';

import { getInjection } from '@/server/di/container';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
} from '@/server/entities/models/meal';
import { revalidatePath } from 'next/cache';

export async function createMealAction(
  data: CreateMeal,
  additionalIngredients?: CreateMealAdditionalIngredient[]
) {
  const mealController = getInjection('ICreateMealController');
  await mealController(data, additionalIngredients);
  revalidatePath('/meals');
}

export async function listMealsAction() {
  const mealController = getInjection('IListMealsController');
  return await mealController();
}
