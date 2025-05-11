import { Transaction } from '@/db';
import {
  CreateGroceryList,
  GroceryList,
} from '@/server/entities/models/grocery-list';

export interface IGroceryListsRepository {
  createGroceryList(
    input: CreateGroceryList,
    tx?: Transaction
  ): Promise<GroceryList>;
  getGroceryListById(id: string): Promise<GroceryList | null>;
  getGroceryListByName(name: string): Promise<GroceryList | null>;
  updateGroceryList(
    id: string,
    input: Partial<
      Omit<GroceryList, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<GroceryList>;
  deleteGroceryList(id: string): Promise<void>;
  listGroceryLists(userId: string, groupId: string): Promise<GroceryList[]>;
}
