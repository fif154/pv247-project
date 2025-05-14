import { mealAdditionalIngredients, meals } from '@/db/schema';
import { Macros } from '@/utils/macros';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type Meal = TModelWithRelations<'meals'>;
export type CreateMeal = InferInsertModel<typeof meals>;

export type MealAdditionalIngredient =
  TModelWithRelations<'mealAdditionalIngredients'>;
export type CreateMealAdditionalIngredient = InferInsertModel<
  typeof mealAdditionalIngredients
>;

export type MealWithMacros = Meal & {
  macros: Macros;
};
