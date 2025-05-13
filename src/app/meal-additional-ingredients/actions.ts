import { getInjection } from '@/server/di/container';

export const addIngredientToMealAction = async (
  mealId: string,
  ingredientId: string,
  quantity: number,
  unitId: string
): Promise<void> => {
  const controller = getInjection('IAddIngredientToMealController');
  await controller(mealId, ingredientId, quantity, unitId);
};

export const removeIngredientFromMealAction = async (
  mealId: string,
  ingredientId: string
): Promise<void> => {
  const controller = getInjection('IRemoveIngredientFromMealController');
  await controller(mealId, ingredientId);
};
