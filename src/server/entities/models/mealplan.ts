import { mealPlans } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type MealPlan = TModelWithRelations<'mealPlans'>;
export type CreateMealPlan = InferInsertModel<typeof mealPlans>;
