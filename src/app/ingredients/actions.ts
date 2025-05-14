'use server';

import { getInjection } from '@/server/di/container';
import { revalidatePath } from 'next/cache';
import { Ingredient } from '../auth/ingredients/schema';

export async function createIngredientAction(data: Omit<Ingredient, 'id'>) {
  const ingredientController = getInjection('ICreateIngredientController');
  const res = await ingredientController(data);
  revalidatePath('/ingredients');
  return res;
}

export async function getIngredientAction(id: string) {
  try {
    const ingredientController = getInjection('IGetIngredientController');
    return await ingredientController(id);
  } catch (err) {
    // TODO: handle errors
    return {
      error: 'An error occurred while fetching the ingredient',
      err,
    };
  }
}

export async function updateIngredientAction(
  id: string,
  data: Partial<Ingredient>
) {
  const ingredientController = getInjection('IUpdateIngredientController');
  const res = await ingredientController(id, data);
  revalidatePath('/ingredients');
  return res;
}

export async function deleteIngredientAction(id: string) {
  const ingredientController = getInjection('IDeleteIngredientController');
  await ingredientController(id);
  revalidatePath('/ingredients');
}

export async function listIngredientsAction(shouldThrow = false) {
  try {
    const ingredientController = getInjection('IListIngredientsController');
    const res = await ingredientController();

    return res;
  } catch (err) {
    if (shouldThrow) {
      throw err;
    }

    return {
      error: 'An error occurred while listing the ingredients',
      err,
    };
  }
}
