import { db, Transaction } from '@/db';
import { ingredients } from '@/db/schema';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { Ingredient } from '@/server/entities/models/ingredient';
import { and, eq, isNull } from 'drizzle-orm';

export class IngredientsRepository implements IIngredientsRepository {
  async createIngredient(
    input: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>,
    tx?: Transaction
  ): Promise<Ingredient> {
    const invoker = tx ?? db;
    const [ingredient] = await invoker
      .insert(ingredients)
      .values(input)
      .returning();
    return ingredient;
  }

  async getIngredientById(
    id: string,
    groupId: string
  ): Promise<Ingredient | null> {
    const [ingredient] = await db
      .select()
      .from(ingredients)
      .where(
        and(
          eq(ingredients.id, id),
          eq(ingredients.groupId, groupId),
          isNull(ingredients.deletedAt)
        )
      )
      .limit(1);
    return ingredient || null;
  }

  async getIngredientByName(
    name: string,
    groupId: string,
    tx?: Transaction
  ): Promise<Ingredient | null> {
    const invoker = tx ?? db;
    const [ingredient] = await invoker
      .select()
      .from(ingredients)
      .where(
        and(
          eq(ingredients.name, name),
          eq(ingredients.groupId, groupId),
          isNull(ingredients.deletedAt)
        )
      )
      .limit(1);
    return ingredient || null;
  }

  async updateIngredient(
    id: string,
    input: Partial<
      Omit<Ingredient, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<Ingredient> {
    const [ingredient] = await db
      .update(ingredients)
      .set(input)
      .where(and(eq(ingredients.id, id), isNull(ingredients.deletedAt)))
      .returning();
    return ingredient;
  }

  async deleteIngredient(id: string): Promise<void> {
    await db
      .update(ingredients)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(ingredients.id, id));
  }

  async listIngredients(groupId: string): Promise<Ingredient[]> {
    const result = await db
      .select()
      .from(ingredients)
      .where(
        and(eq(ingredients.groupId, groupId), isNull(ingredients.deletedAt))
      );
    return result;
  }
}
