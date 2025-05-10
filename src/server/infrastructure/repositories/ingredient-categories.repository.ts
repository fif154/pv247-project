import { db } from '@/db';
import { ingredientCategories } from '@/db/schema';
import { IIngredientCategoriesRepository } from '@/server/application/repositories/ingredient-categories.repository.interface';
import {
  CreateIngredientCategory,
  IngredientCategory,
} from '@/server/entities/models/ingredient-category';
import { and, eq, isNull } from 'drizzle-orm';

export class IngredientCategoriesRepository
  implements IIngredientCategoriesRepository
{
  async createCategory(
    input: CreateIngredientCategory
  ): Promise<IngredientCategory> {
    const [category] = await db
      .insert(ingredientCategories)
      .values(input)
      .returning();
    return category;
  }

  async getCategoryById(id: string): Promise<IngredientCategory | null> {
    const [category] = await db
      .select()
      .from(ingredientCategories)
      .where(
        and(
          eq(ingredientCategories.id, id),
          isNull(ingredientCategories.deletedAt)
        )
      )
      .limit(1);
    return category || null;
  }

  async getCategoryByName(name: string): Promise<IngredientCategory | null> {
    const [category] = await db
      .select()
      .from(ingredientCategories)
      .where(
        and(
          eq(ingredientCategories.name, name),
          isNull(ingredientCategories.deletedAt)
        )
      )
      .limit(1);
    return category || null;
  }

  async listCategories(): Promise<IngredientCategory[]> {
    const result = await db
      .select()
      .from(ingredientCategories)
      .where(and(isNull(ingredientCategories.deletedAt)));
    return result;
  }
}
