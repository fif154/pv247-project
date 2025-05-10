import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import {
  InputParseError,
  NotFoundError,
} from '@/server/entities/errors/common';
import { Recipe } from '@/server/entities/models/recipe';

export const createRecipeUseCase =
  (recipesRepository: IRecipesRepository) =>
  async (input: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const existingRecipe = await recipesRepository.getRecipeByName(
      input.name,
      user.groupId!
    );
    if (existingRecipe) {
      throw new InputParseError('Recipe with this name already exists');
    }

    return recipesRepository.createRecipe({
      ...input,
      groupId: user.groupId!,
    });
  };

export type ICreateRecipeUseCase = ReturnType<typeof createRecipeUseCase>;
