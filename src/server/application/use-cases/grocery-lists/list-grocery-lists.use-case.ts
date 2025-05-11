import { auth } from '@/auth';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const listGroceryListsUseCase =
  (
    groceryListsRepository: IGroceryListsRepository,
    groupService: IGroupService
  ) =>
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return groceryListsRepository.listGroceryLists(user.id, user.groupId);
  };

export type IListGroceryListsUseCase = ReturnType<
  typeof listGroceryListsUseCase
>;
