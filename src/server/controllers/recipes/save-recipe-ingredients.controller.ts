import { ISaveRecipeIngredientsUseCase, SaveRecipeIngredientsInput } from '@/server/application/use-cases/recipes/save-recipe-ingredients.use-case';

export const saveRecipeIngredientsController = (
  saveRecipeIngredientsUseCase: ISaveRecipeIngredientsUseCase
) => async (input: SaveRecipeIngredientsInput) => {
  return await saveRecipeIngredientsUseCase(input);
};

export type ISaveRecipeIngredientsController = ReturnType<typeof saveRecipeIngredientsController>;