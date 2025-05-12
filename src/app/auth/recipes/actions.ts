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
  try {
    // Import necessary modules
    const { db } = await import('@/db');
    const { recipeIngredients, ingredients: ingredientsTable } = await import(
      '@/db/schema'
    );
    const { eq } = await import('drizzle-orm');
    const { auth } = await import('@/auth');

    // Get the current user to access groupId
    const user = (await auth())?.user;
    if (!user || !user.groupId) {
      throw new Error('User not found or not in a group');
    }

    // 1. Delete existing recipe ingredients
    await db
      .delete(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, recipeId));

    // Process each ingredient
    for (const ing of ingredients) {
      let ingredientId = ing.ingredientId;

      // If this is a new ingredient (has name but no ingredientId)
      if (!ingredientId && ing.name) {

        try {
          // Create the new ingredient
          const [newIngredient] = await db
            .insert(ingredientsTable)
            .values({
              name: ing.name,
              description: null,
              imageUrl: null,
              protein: 0,
              carbs: 0,
              fats: 0,
              calories: 0,
              baseMacroQuantity: 100,
              groupId: user.groupId,
              createdBy: user.id,
            })
            .returning();

          ingredientId = newIngredient.id;
        } catch (error) {
          console.error(`Error creating ingredient ${ing.name}:`, error);
          // Skip this ingredient and continue with others
          continue;
        }
      }

      // Skip if we still don't have a valid ingredientId
      if (!ingredientId) {
        console.log('Skipping ingredient with no ID');
        continue;
      }

      try {
        // Add the recipe ingredient relation
        console.log(
          `Adding recipe ingredient relation: ${recipeId} - ${ingredientId}`
        );

        await db.insert(recipeIngredients).values({
          recipeId: recipeId,
          ingredientId: ingredientId,
          quantity: ing.quantity,
          unitId: ing.unitId,
        });

        console.log('Successfully added recipe ingredient relation');
      } catch (error) {
        console.error('Error adding recipe ingredient relation:', error);
        // Continue with other ingredients
      }
    }

    console.log('Successfully processed all ingredients');
    return { success: true };
  } catch (error) {
    console.error('Error saving recipe ingredients:', error);
    throw new Error('Failed to save recipe ingredients');
  }
}
