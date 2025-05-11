import { auth } from '@/auth';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const listRecipesUseCase =
  (recipesRepository: IRecipesRepository, groupService: IGroupService) =>
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return recipesRepository.listRecipes(user.groupId);
  };

export type IListRecipesUseCase = ReturnType<typeof listRecipesUseCase>;
