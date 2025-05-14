import { mealTypes } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type MealType = TModelWithRelations<'mealTypes'>;
export type CreateMealType = InferInsertModel<typeof mealTypes>;
