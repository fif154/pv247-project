import { Transaction } from '@/db';
import {
  CreateGroceryListItem,
  GroceryListItem,
} from '@/server/entities/models/grocery-list-item';

export interface IGroceryListItemsRepository {
  createGroceryListItem(
    input: Omit<GroceryListItem, 'id' | 'createdAt' | 'updatedAt'>,
    tx?: Transaction
  ): Promise<GroceryListItem>;
  createGroceryListItems(
    inputs: CreateGroceryListItem[],
    tx?: Transaction
  ): Promise<GroceryListItem[]>;
  getGroceryListItemById(
    id: string,
    tx?: Transaction
  ): Promise<GroceryListItem | null>;
  getGroceryListItemsByGroceryListId(
    groceryListId: string,
    tx?: Transaction
  ): Promise<GroceryListItem[]>;
  updateGroceryListItem(
    id: string,
    input: Partial<
      Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >,
    tx?: Transaction
  ): Promise<GroceryListItem>;
  updateGroceryListItemsByGroceryListId(
    groceryListId: string,
    input: Partial<
      Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >,
    tx?: Transaction
  ): Promise<GroceryListItem[]>;
  deleteGroceryListItem(id: string): Promise<void>;
}
