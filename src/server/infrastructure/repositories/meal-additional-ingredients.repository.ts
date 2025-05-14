import { db, Transaction } from '@/db';
import { mealAdditionalIngredients } from '@/db/schema';
import { IMealAdditionalIngredientsRepository } from '@/server/application/repositories/meal-additional-ingredients.repository.interface';
import {
  CreateMealAdditionalIngredient,
  MealAdditionalIngredient,
} from '@/server/entities/models/meal';
import { and, eq } from 'drizzle-orm';

export class MealAdditionalIngredientsRepository
  implements IMealAdditionalIngredientsRepository
{
  async addIngredientToMeal(
    data: CreateMealAdditionalIngredient,
    tx?: Transaction
  ): Promise<MealAdditionalIngredient> {
    const invoker = tx ?? db;
    const [mealAdditionalIngredient] = await invoker
      .insert(mealAdditionalIngredients)
      .values(data)
      .returning();

    return mealAdditionalIngredient;
  }

  async addIngredientsToMeal(
    ingredients: Omit<MealAdditionalIngredient, 'id'>[],
    tx?: Transaction
  ): Promise<MealAdditionalIngredient[]> {
    if (ingredients.length === 0) {
      return [];
    }

    const invoker = tx ?? db;
    const mealAdditionalIngredientsList = await invoker
      .insert(mealAdditionalIngredients)
      .values(ingredients)
      .returning();

    return mealAdditionalIngredientsList;
  }

  async removeIngredientFromMeal(
    mealId: string,
    ingredientId: string,
    tx?: Transaction
  ): Promise<void> {
    const invoker = tx ?? db;
    await invoker
      .delete(mealAdditionalIngredients)
      .where(
        and(
          eq(mealAdditionalIngredients.mealId, mealId),
          eq(mealAdditionalIngredients.ingredientId, ingredientId)
        )
      );
  }

  async getMealAdditionalIngredients(
    mealId: string,
    tx?: Transaction
  ): Promise<MealAdditionalIngredient[]> {
    const invoker = tx ?? db;
    return await invoker.query.mealAdditionalIngredients.findMany({
      where: eq(mealAdditionalIngredients.mealId, mealId),
      with: {
        ingredient: true,
        unit: true,
      },
    });
  }
}
