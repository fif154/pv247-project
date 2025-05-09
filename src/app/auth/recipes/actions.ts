'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';

export async function listRecipes() {
  const listRecipesController = getInjection('IListRecipesController');
  return listRecipesController();
}

export async function getRecipe(id: string) {
  const getRecipeController = getInjection('IGetRecipeController');
  return getRecipeController({ id });
}

export async function createRecipe(input: {
  name: string;
  description: string | null;
  servings: number;
  image: string | null;
}) {
  const createRecipeController = getInjection('ICreateRecipeController');
  const result = await createRecipeController(input);
  revalidatePath('/recipes');
  return result;
}

export async function updateRecipe(input: {
  id: string;
  name?: string;
  description?: string | null;
  servings?: number;
  image?: string | null;
}) {
  const updateRecipeController = getInjection('IUpdateRecipeController');
  const result = await updateRecipeController(input);
  revalidatePath('/recipes');
  return result;
}

export async function deleteRecipe(input: { id: string }) {
  const deleteRecipeController = getInjection('IDeleteRecipeController');
  await deleteRecipeController(input);
  revalidatePath('/recipes');
}
