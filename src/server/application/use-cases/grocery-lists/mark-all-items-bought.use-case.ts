import { auth } from '@/auth';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const markAllItemsBoughtUseCase =
  (
    groceryListItemsRepository: IGroceryListItemsRepository,
    groceryListsRepository: IGroceryListsRepository,
    groupService: IGroupService
  ) =>
  async (groceryListId: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const groceryList =
      await groceryListsRepository.getGroceryListById(groceryListId);
    if (!groceryList) {
      throw new NotFoundError('Grocery list not found');
    }

    if (groceryList.groupId !== user.groupId) {
      throw new NotFoundError('Grocery list not found');
    }

    return groceryListItemsRepository.updateGroceryListItemsByGroceryListId(
      groceryListId,
      { isBought: true }
    );
  };

export type IMarkAllItemsBoughtUseCase = ReturnType<
  typeof markAllItemsBoughtUseCase
>;
