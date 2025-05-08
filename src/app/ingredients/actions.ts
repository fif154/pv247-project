'use server';

import { getInjection } from '@/server/di/container';
import { Ingredient } from '../auth/ingredients/schema';

export async function createIngredientAction(data: Omit<Ingredient, 'id'>) {
  try {
    const ingredientController = getInjection('ICreateIngredientController');
    return await ingredientController(data);
  } catch (err) {
    // TODO: handle errors
    return {
      error: 'An error occurred while creating the ingredient',
      err,
    };
  }
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
  try {
    const ingredientController = getInjection('IUpdateIngredientController');
    return await ingredientController(id, data);
  } catch (err) {
    // TODO: handle errors
    return {
      error: 'An error occurred while updating the ingredient',
      err,
    };
  }
}

export async function deleteIngredientAction(id: string) {
  try {
    const ingredientController = getInjection('IDeleteIngredientController');
    return await ingredientController(id);
  } catch (err) {
    return {
      error: 'An error occurred while deleting the ingredient',
      err,
    };
  }
}

export async function listIngredientsAction() {
  try {
    const ingredientController = getInjection('IListIngredientsController');
    return await ingredientController();
  } catch (err) {
    return {
      error: 'An error occurred while listing the ingredients',
      err,
    };
  }
}
