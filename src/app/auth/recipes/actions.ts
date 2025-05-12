'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';
import { Recipe } from '@/server/entities/models/recipe';

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
  ingredients?: Array<{
    id?: string;
    ingredientId: string;
    quantity: number;
    unitId: string;
  }>;
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
  const saveRecipeIngredientsController = getInjection('ISaveRecipeIngredientsController');
  return await saveRecipeIngredientsController({
    recipeId,
    ingredients
  });
}

type ListRecipesOptions = {
  search?: string;
  sort?: 'name-asc' | 'name-desc' | 'newest' | 'oldest';
};

export async function listFilteredRecipes(options: ListRecipesOptions = {}): Promise<Recipe[]> {
  const listRecipesController = getInjection('IListRecipesController');
  
  const recipes = await listRecipesController();
  
  let filtered = recipes;
  
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter(recipe => 
      recipe.name.toLowerCase().includes(searchLower) || 
      (recipe.description && recipe.description.toLowerCase().includes(searchLower))
    );
  }
  
  if (options.sort) {
    filtered.sort((a, b) => {
      switch (options.sort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }
  
  return filtered;
}
