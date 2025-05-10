import { auth } from '@/auth';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const getGroceryListUseCase =
  (
    groceryListsRepository: IGroceryListsRepository,
    groupService: IGroupService
  ) =>
  async (id: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const groceryList = await groceryListsRepository.getGroceryListById(id);
    if (!groceryList) {
      throw new NotFoundError('Grocery list not found');
    }

    if (groceryList.groupId !== user.groupId) {
      throw new NotFoundError('Grocery list not found');
    }

    return groceryList;
  };

export type IGetGroceryListUseCase = ReturnType<typeof getGroceryListUseCase>;
