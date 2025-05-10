'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';

export async function listRecipes() {
  try {
    const listRecipesController = getInjection('IListRecipesController');
    return await listRecipesController();
  } catch (error) {
    console.error('Error listing recipes:', error);
    return [];
  }
}

export async function getRecipe(id: string) {
  try {
    const getRecipeController = getInjection('IGetRecipeController');
    return await getRecipeController({ id });
  } catch (error) {
    console.error('Error getting recipe:', error);
    return null;
  }
}

export async function createRecipe(input: {
  name: string;
  description: string | null;
  servings: number;
  image: string | null;
}) {
  try {
    const createRecipeController = getInjection('ICreateRecipeController');
    const result = await createRecipeController(input);
    revalidatePath('/auth/recipes');
    return result;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
}

export async function updateRecipe(input: {
  id: string;
  name?: string;
  description?: string | null;
  servings?: number;
  image?: string | null;
}) {
  try {
    const updateRecipeController = getInjection('IUpdateRecipeController');
    const result = await updateRecipeController(input);
    revalidatePath('/auth/recipes');
    return result;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
}

export async function deleteRecipe(input: { id: string }) {
  try {
    const deleteRecipeController = getInjection('IDeleteRecipeController');
    await deleteRecipeController(input);
    revalidatePath('/auth/recipes');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
}
