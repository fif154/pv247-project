import { db, Transaction } from '@/db';
import { groceryLists } from '@/db/schema';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { GroceryList } from '@/server/entities/models/grocery-list';
import { and, desc, eq, isNull } from 'drizzle-orm';

export class GroceryListsRepository implements IGroceryListsRepository {
  async createGroceryList(
    input: Omit<GroceryList, 'id' | 'createdAt' | 'updatedAt'>,
    tx?: Transaction
  ): Promise<GroceryList> {
    const invoker = tx ?? db;
    const [groceryList] = await invoker
      .insert(groceryLists)
      .values(input)
      .returning();
    return groceryList;
  }

  async getGroceryListById(id: string): Promise<GroceryList | null> {
    const groceryList = await db.query.groceryLists.findFirst({
      where: and(eq(groceryLists.id, id), isNull(groceryLists.deletedAt)),
      with: {
        items: {
          with: {
            ingredient: {
              with: {
                category: true,
              },
            },
            unit: true,
          },
        },
      },
      orderBy: [desc(groceryLists.createdAt)],
    });

    return groceryList || null;
  }

  async getGroceryListByName(name: string): Promise<GroceryList | null> {
    const [groceryList] = await db
      .select()
      .from(groceryLists)
      .where(and(eq(groceryLists.name, name), isNull(groceryLists.deletedAt)))
      .limit(1);
    return groceryList || null;
  }

  async updateGroceryList(
    id: string,
    input: Partial<
      Omit<GroceryList, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<GroceryList> {
    const [groceryList] = await db
      .update(groceryLists)
      .set(input)
      .where(and(eq(groceryLists.id, id), isNull(groceryLists.deletedAt)))
      .returning();
    return groceryList;
  }

  async deleteGroceryList(id: string): Promise<void> {
    await db.delete(groceryLists).where(eq(groceryLists.id, id));
  }

  async listGroceryLists(userId: string): Promise<GroceryList[]> {
    const result = await db.query.groceryLists.findMany({
      where: and(
        eq(groceryLists.createdBy, userId),
        isNull(groceryLists.deletedAt)
      ),
      with: {
        items: {
          with: {
            ingredient: {
              with: {
                category: true,
              },
            },
            unit: true,
          },
        },
      },
      orderBy: [desc(groceryLists.createdAt)],
    });

    return result;
  }
}
