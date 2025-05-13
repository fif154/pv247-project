import { Transaction } from '@/db';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
  Meal,
} from '@/server/entities/models/meal';

export interface IMealsRepository {
  createMeal(
    input: CreateMeal,
    additionalIngredients?: CreateMealAdditionalIngredient[],
    tx?: Transaction
  ): Promise<Meal>;
  getMealById(id: string, tx?: Transaction): Promise<Meal | null>;
  getMealsByIds(ids: string[], tx?: Transaction): Promise<Meal[]>;
  updateMeal(
    id: string,
    input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
    additionalIngredients?: CreateMealAdditionalIngredient[],
    tx?: Transaction
  ): Promise<Meal>;
  deleteMeal(id: string, tx?: Transaction): Promise<void>;
  listMeals(groupId: string): Promise<Meal[]>;
  listMealsForDay(groupId: string, plannedDate: Date): Promise<Meal[]>;
}
