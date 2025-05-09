import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';

export const listRecipesUseCase = (recipesRepository: IRecipesRepository) => 
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return recipesRepository.listRecipes(user.id);
  };

export type IListRecipesUseCase = ReturnType<typeof listRecipesUseCase>;