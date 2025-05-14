'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';

export async function listRecipes() {
  const listRecipesController = getInjection('IListRecipesController');
  return await listRecipesController();
}

export async function getRecipe(id: string) {
  const getRecipeController = getInjection('IGetRecipeController');
  return await getRecipeController({ id });
}

export async function createRecipe(input: {
  name: string;
  description: string | null;
  servings: number;
  image: string | null;
}) {
  const createRecipeController = getInjection('ICreateRecipeController');
  const result = await createRecipeController(input);
  revalidatePath('/auth/recipes');
  return result;
}

export async function updateRecipe(input: {
  id: string;
  name?: string;
  description?: string | null;
  servings?: number;
  image?: string | null;
  ingredients?: Array<{
    id?: string;
    ingredientId: string;
    quantity: number;
    unitId: string;
  }>;
}) {
  const updateRecipeController = getInjection('IUpdateRecipeController');
  const result = await updateRecipeController(input);
  revalidatePath('/auth/recipes');
  return result;
}

export async function deleteRecipe(input: { id: string }) {
  const deleteRecipeController = getInjection('IDeleteRecipeController');
  await deleteRecipeController(input);
  revalidatePath('/auth/recipes');
}

export async function saveRecipeIngredients(
  recipeId: string,
  ingredients: Array<{
    id?: string;
    ingredientId?: string;
    name?: string;
    quantity: number;
    unitId: string;
  }>
) {
  const saveRecipeIngredientsController = getInjection(
    'ISaveRecipeIngredientsController'
  );
  return await saveRecipeIngredientsController({
    recipeId,
    ingredients,
  });
}

export type SortType = 'name-asc' | 'name-desc' | 'newest' | 'oldest';

type ListRecipesOptions = {
  search?: string;
  sort?: SortType;
};

export async function listFilteredRecipes(options: ListRecipesOptions = {}) {
  const listFilteredRecipesController = getInjection(
    'IListFilteredRecipesController'
  );
  return await listFilteredRecipesController(options);
}
