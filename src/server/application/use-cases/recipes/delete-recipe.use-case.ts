import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { canDeleteRecipe } from '../../policy/recipe';

export const deleteRecipeUseCase =
  (recipesRepository: IRecipesRepository) => async (id: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const recipe = await recipesRepository.getRecipeById(id);
    if (!recipe) {
      throw new NotFoundError('Recipe not found');
    }

    if (!canDeleteRecipe(recipe, user)) {
      throw new NotFoundError('Recipe not found');
    }

    await recipesRepository.deleteRecipe(id);
  };

export type IDeleteRecipeUseCase = ReturnType<typeof deleteRecipeUseCase>;
