import { Transaction } from '@/db';
import { MealType } from '@/server/entities/models/meal-type';

export interface IMealTypesRepository {
  listMealTypes(tx?: Transaction): Promise<MealType[]>;
}
