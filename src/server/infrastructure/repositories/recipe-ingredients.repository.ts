import { Transaction, db } from '@/db';
import { recipeIngredients } from '@/db/schema';
import { IRecipeIngredientsRepository } from '@/server/application/repositories/recipe-ingredients.repository.interface';
import {
  CreateRecipeIngredient,
  RecipeIngredient,
} from '@/server/entities/models/recipe-ingredient';
import { eq } from 'drizzle-orm';

export class RecipeIngredientsRepository
  implements IRecipeIngredientsRepository
{
  async createRecipeIngredients(
    ingredients: CreateRecipeIngredient[],
    tx?: Transaction
  ): Promise<RecipeIngredient[]> {
    const dbClient = tx || db;

    if (ingredients.length === 0) {
      return [];
    }

    const result = await dbClient
      .insert(recipeIngredients)
      .values(ingredients)
      .returning();

    // Convert string dates to Date objects
    return result.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })) as RecipeIngredient[];
  }

  async getRecipeIngredientsByRecipeId(
    recipeId: string,
    tx?: Transaction
  ): Promise<RecipeIngredient[]> {
    const dbClient = tx || db;
    const result = await dbClient
      .select()
      .from(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, recipeId));

    // Convert string dates to Date objects
    return result.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })) as RecipeIngredient[];
  }

  async deleteRecipeIngredientsByRecipeId(
    recipeId: string,
    tx?: Transaction
  ): Promise<void> {
    const dbClient = tx || db;
    await dbClient
      .delete(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, recipeId));
  }
}
