import { db, Transaction } from '@/db';
import { mealAdditionalIngredients, meals } from '@/db/schema';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
  Meal,
} from '@/server/entities/models/meal';
import { and, eq, inArray, isNull } from 'drizzle-orm';

export class MealsRepository implements IMealsRepository {
  async createMeal(
    input: CreateMeal,
    additionalIngredients?: CreateMealAdditionalIngredient[],
    tx?: Transaction
  ): Promise<Meal> {
    const invoker = tx ?? db;
    const [meal] = await invoker.insert(meals).values(input).returning();

    if (additionalIngredients?.length) {
      const ingredientsWithMealId = additionalIngredients.map((ingredient) => ({
        ...ingredient,
        mealId: meal.id,
      }));
      await invoker
        .insert(mealAdditionalIngredients)
        .values(ingredientsWithMealId);
    }

    return meal;
  }

  async getMealById(id: string, tx?: Transaction): Promise<Meal | null> {
    const invoker = tx ?? db;
    const meal = await invoker.query.meals.findFirst({
      where: and(eq(meals.id, id), isNull(meals.deletedAt)),
      with: {
        additionalIngredients: {
          with: {
            ingredient: true,
            unit: true,
          },
        },
        recipe: true,
      },
    });

    return meal || null;
  }

  async getMealsByIds(ids: string[], tx?: Transaction): Promise<Meal[]> {
    const invoker = tx ?? db;
    return await invoker.query.meals.findMany({
      where: and(inArray(meals.id, ids), isNull(meals.deletedAt)),
      with: {
        additionalIngredients: {
          with: {
            ingredient: true,
            unit: true,
          },
        },
        recipe: true,
      },
    });
  }

  async updateMeal(
    id: string,
    input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
    additionalIngredients?: CreateMealAdditionalIngredient[],
    tx?: Transaction
  ): Promise<Meal> {
    const invoker = tx ?? db;
    const [meal] = await invoker
      .update(meals)
      .set(input)
      .where(and(eq(meals.id, id), isNull(meals.deletedAt)))
      .returning();

    if (additionalIngredients?.length) {
      await invoker
        .delete(mealAdditionalIngredients)
        .where(eq(mealAdditionalIngredients.mealId, id));

      const ingredientsWithMealId = additionalIngredients.map((ingredient) => ({
        ...ingredient,
        mealId: id,
      }));
      await invoker
        .insert(mealAdditionalIngredients)
        .values(ingredientsWithMealId);
    }

    return meal;
  }

  async deleteMeal(id: string, tx?: Transaction): Promise<void> {
    const invoker = tx ?? db;
    await invoker.delete(meals).where(eq(meals.id, id));
  }

  async listMeals(userId: string): Promise<Meal[]> {
    return db.query.meals.findMany({
      where: and(eq(meals.userId, userId), isNull(meals.deletedAt)),
      with: {
        additionalIngredients: {
          with: {
            ingredient: true,
            unit: true,
          },
        },
      },
    });
  }
}
