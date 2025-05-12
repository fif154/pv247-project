import { Transaction } from '@/db';
import {
  CreateMealAdditionalIngredient,
  MealAdditionalIngredient,
} from '@/server/entities/models/meal';

export interface IMealAdditionalIngredientsRepository {
  addIngredientToMeal(
    data: CreateMealAdditionalIngredient,
    tx?: Transaction
  ): Promise<MealAdditionalIngredient>;
  addIngredientsToMeal(
    data: CreateMealAdditionalIngredient[],
    tx?: Transaction
  ): Promise<MealAdditionalIngredient[]>;
  removeIngredientFromMeal(
    mealId: string,
    ingredientId: string,
    tx?: Transaction
  ): Promise<void>;
  getMealAdditionalIngredients(
    mealId: string,
    tx?: Transaction
  ): Promise<MealAdditionalIngredient[]>;
}
