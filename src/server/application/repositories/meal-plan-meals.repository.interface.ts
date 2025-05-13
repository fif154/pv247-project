import { Transaction } from '@/db';
import { MealPlanMeal } from '@/server/entities/models/meal-plan';

export interface IMealPlanMealsRepository {
  addMealToPlan(
    mealPlanId: string,
    mealId: string,
    tx?: Transaction
  ): Promise<MealPlanMeal>;
  removeMealFromPlan(
    mealPlanId: string,
    mealId: string,
    tx?: Transaction
  ): Promise<void>;
  getMealPlanMeals(
    mealPlanId: string,
    tx?: Transaction
  ): Promise<MealPlanMeal[]>;
  getMealPlanMealByMealId(
    mealId: string,
    tx?: Transaction
  ): Promise<MealPlanMeal | null>;
}
