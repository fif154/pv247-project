import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const deleteRecipeUseCase =
  (recipesRepository: IRecipesRepository, groupService: IGroupService) =>
  async (id: string) => {
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

    return recipesRepository.deleteRecipe(id);
  };

export type IDeleteRecipeUseCase = ReturnType<typeof deleteRecipeUseCase>;
