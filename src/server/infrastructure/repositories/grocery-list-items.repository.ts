import { db, Transaction } from '@/db';
import { groceryListItems } from '@/db/schema';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import {
  CreateGroceryListItem,
  GroceryListItem,
} from '@/server/entities/models/grocery-list-item';
import { and, eq, isNull } from 'drizzle-orm';

export class GroceryListItemsRepository implements IGroceryListItemsRepository {
  async createGroceryListItem(
    input: CreateGroceryListItem,
    tx?: Transaction
  ): Promise<GroceryListItem> {
    const invoker = tx ?? db;
    const [item] = await invoker
      .insert(groceryListItems)
      .values(input)
      .returning();
    return item;
  }

  async createGroceryListItems(
    inputs: Omit<GroceryListItem, 'id' | 'createdAt' | 'updatedAt'>[],
    tx?: Transaction
  ): Promise<GroceryListItem[]> {
    if (inputs.length === 0) {
      return [];
    }

    const invoker = tx ?? db;
    const items = await invoker
      .insert(groceryListItems)
      .values(inputs)
      .returning();
    return items;
  }

  async getGroceryListItemsByGroceryListId(
    groceryListId: string,
    tx?: Transaction
  ): Promise<GroceryListItem[]> {
    const invoker = tx ?? db;
    return await invoker.query.groceryListItems.findMany({
      where: and(
        eq(groceryListItems.groceryListId, groceryListId),
        isNull(groceryListItems.deletedAt)
      ),
      with: {
        ingredient: true,
      },
    });
  }

  async updateGroceryListItem(
    id: string,
    input: Partial<
      Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >,
    tx?: Transaction
  ): Promise<GroceryListItem> {
    const invoker = tx ?? db;
    const [item] = await invoker
      .update(groceryListItems)
      .set(input)
      .where(
        and(eq(groceryListItems.id, id), isNull(groceryListItems.deletedAt))
      )
      .returning();
    return item;
  }

  async updateGroceryListItemsByGroceryListId(
    groceryListId: string,
    input: Partial<
      Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >,
    tx?: Transaction
  ): Promise<GroceryListItem[]> {
    const invoker = tx ?? db;
    return await invoker
      .update(groceryListItems)
      .set(input)
      .where(
        and(
          eq(groceryListItems.groceryListId, groceryListId),
          isNull(groceryListItems.deletedAt)
        )
      )
      .returning();
  }

  async deleteGroceryListItem(id: string): Promise<void> {
    await db.delete(groceryListItems).where(eq(groceryListItems.id, id));
  }
}
