import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { canViewRecipe } from '../../policy/recipe';

<<<<<<< HEAD
export const getRecipeUseCase = (recipesRepository: IRecipesRepository) => 
  async (id: string) => {
=======
export const getRecipeUseCase =
  (recipesRepository: IRecipesRepository) => async (id: string) => {
>>>>>>> main
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const recipe = await recipesRepository.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundError('Recipe not found');
    }

    if (!canViewRecipe(recipe, user)) {
      throw new NotFoundError('Recipe not found');
    }

    return recipe;
  };

<<<<<<< HEAD
export type IGetRecipeUseCase = ReturnType<typeof getRecipeUseCase>;
=======
export type IGetRecipeUseCase = ReturnType<typeof getRecipeUseCase>;
>>>>>>> main
