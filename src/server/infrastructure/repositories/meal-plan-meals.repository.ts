import { db, Transaction } from '@/db';
import { mealPlanMeals } from '@/db/schema';
import { IMealPlanMealsRepository } from '@/server/application/repositories/meal-plan-meals.repository.interface';
import { MealPlanMeal } from '@/server/entities/models/meal-plan';
import { and, eq } from 'drizzle-orm';

export class MealPlanMealsRepository implements IMealPlanMealsRepository {
  async addMealToPlan(
    mealPlanId: string,
    mealId: string,
    tx?: Transaction
  ): Promise<MealPlanMeal> {
    const invoker = tx ?? db;
    const [mealPlanMeal] = await invoker
      .insert(mealPlanMeals)
      .values({
        mealPlanId,
        mealId,
      })
      .returning();

    return mealPlanMeal;
  }

  async removeMealFromPlan(
    mealPlanId: string,
    mealId: string,
    tx?: Transaction
  ): Promise<void> {
    const invoker = tx ?? db;
    await invoker
      .delete(mealPlanMeals)
      .where(
        and(
          eq(mealPlanMeals.mealPlanId, mealPlanId),
          eq(mealPlanMeals.mealId, mealId)
        )
      );
  }

  async getMealPlanMeals(
    mealPlanId: string,
    tx?: Transaction
  ): Promise<MealPlanMeal[]> {
    const invoker = tx ?? db;
    return await invoker.query.mealPlanMeals.findMany({
      where: eq(mealPlanMeals.mealPlanId, mealPlanId),
      with: {
        meal: {
          with: {
            additionalIngredients: {
              with: {
                ingredient: true,
                unit: true,
              },
            },
            recipe: {
              with: {
                ingredients: {
                  with: {
                    ingredient: true,
                    unit: true,
                  },
                },
              },
            },
            mealType: true,
          },
        },
      },
    });
  }

  async getMealPlanMealByMealId(
    mealId: string,
    tx?: Transaction
  ): Promise<MealPlanMeal | null> {
    const invoker = tx ?? db;

    const meal = await invoker.query.mealPlanMeals.findFirst({
      where: eq(mealPlanMeals.mealId, mealId),
    });

    return meal ?? null;
  }
}
