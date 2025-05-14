import { db, Transaction } from '@/db';
import { mealTypes } from '@/db/schema';
import { IMealTypesRepository } from '@/server/application/repositories/meal-types.repository.interface';
import { MealType } from '@/server/entities/models/meal-type';

export class MealTypesRepository implements IMealTypesRepository {
  async listMealTypes(tx?: Transaction): Promise<MealType[]> {
    const query = tx || db;
    return await query.select().from(mealTypes).orderBy(mealTypes.sortOrder);
  }
}
