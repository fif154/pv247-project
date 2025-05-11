import { auth } from '@/auth';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const listIngredientsUseCase =
  (
    ingredientsRepository: IIngredientsRepository,
    groupService: IGroupService
  ) =>
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return ingredientsRepository.listIngredients(user.groupId);
  };

export type IListIngredientsUseCase = ReturnType<typeof listIngredientsUseCase>;
