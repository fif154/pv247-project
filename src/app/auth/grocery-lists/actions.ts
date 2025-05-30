'use server';

import {
  GroceryListFormValues,
  IngredientFormValues,
} from '@/components/forms/grocery-list/schema';
import { getInjection } from '@/server/di/container';
import { NotFoundError } from '@/server/entities/errors/common';
import { GroceryListItem } from '@/server/entities/models/grocery-list-item';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { DateRange } from 'react-day-picker';

export async function createGroceryListAction(
  data: GroceryListFormValues,
  mealDateRange?: DateRange
) {
  const groceryListController = getInjection('ICreateGroceryListController');
  const res = await groceryListController(data, mealDateRange);
  revalidatePath('/grocery-lists');
  return res;
}

export async function getGroceryListAction(id: string) {
  try {
    const groceryListController = getInjection('IGetGroceryListController');
    return await groceryListController(id);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}

export async function listGroceryListsAction() {
  try {
    const groceryListController = getInjection('IListGroceryListsController');
    return await groceryListController();
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}

export async function updateGroceryListAction(
  id: string,
  input: Partial<
    Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
  >
) {
  const updateController = getInjection('IUpdateGroceryListController');
  await updateController(id, input);
  revalidatePath('/grocery-lists');
}

export async function addGroceryListItemsAction(
  groceryListId: string,
  items: IngredientFormValues[]
) {
  const addItemsController = getInjection('IAddGroceryListItemsController');
  await addItemsController({ groceryListId, items });
  revalidatePath('/grocery-lists');
}

export async function updateGroceryListItemAction(
  id: string,
  input: Partial<
    Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
  >
) {
  const updateController = getInjection('IUpdateGroceryListItemController');
  await updateController(id, input);
  revalidatePath('/grocery-lists');
}

export async function deleteGroceryListItemAction(id: string) {
  const deleteController = getInjection('IDeleteGroceryListItemController');
  await deleteController(id);
  revalidatePath('/grocery-lists');
}

export async function markAllItemsBoughtAction(groceryListId: string) {
  const markAllController = getInjection('IMarkAllItemsBoughtController');
  await markAllController(groceryListId);
  revalidatePath('/grocery-lists');
}
