import { mealPlanMeals, mealPlans } from '@/db/schema';
import { Macros } from '@/utils/macros';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type MealPlan = TModelWithRelations<'mealPlans'>;
export type CreateMealPlan = Omit<
  InferInsertModel<typeof mealPlans>,
  'groupId' | 'createdBy'
>;

export type ClientCreateMealPlan = Omit<
  CreateMealPlan,
  'groupId' | 'createdBy'
>;

export type MealPlanMeal = TModelWithRelations<'mealPlanMeals'>;
export type CreateMealPlanMeal = InferInsertModel<typeof mealPlanMeals>;

type MealWithMacros = TModelWithRelations<'meals'> & {
  macros: Macros;
};

type MealPlanMealWithMacros = Omit<MealPlanMeal, 'meal'> & {
  meal: MealWithMacros;
};

export type MealPlanWithStatus = Omit<MealPlan, 'meals'> & {
  status: {
    isCurrent: boolean;
    isUpcoming: boolean;
  };
  meals?: MealPlanMealWithMacros[];
};
