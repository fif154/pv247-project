import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const updateRecipeUseCase =
  (recipesRepository: IRecipesRepository, groupService: IGroupService) =>
  async (
    id: string,
    input: {
      name?: string;
      description?: string | null;
      servings?: number;
      image?: string | null;
    }
  ) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const recipe = await recipesRepository.getRecipeById(id);
    if (!recipe || recipe.groupId !== user.groupId) {
      throw new NotFoundError('Recipe not found');
    }

    return recipesRepository.updateRecipe(id, input);
  };

export type IUpdateRecipeUseCase = ReturnType<typeof updateRecipeUseCase>;
