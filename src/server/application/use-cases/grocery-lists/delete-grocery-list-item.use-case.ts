import { auth } from '@/auth';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const deleteGroceryListItemUseCase =
  (
    groceryListItemsRepository: IGroceryListItemsRepository,
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

    const groceryListItem =
      await groceryListItemsRepository.getGroceryListItemById(id);
    if (!groceryListItem) {
      throw new NotFoundError('Grocery list item not found');
    }

    const groceryList = await groceryListsRepository.getGroceryListById(
      groceryListItem.groceryListId
    );
    if (!groceryList) {
      throw new NotFoundError('Grocery list not found');
    }

    if (groceryList.groupId !== user.groupId) {
      throw new NotFoundError('Grocery list not found');
    }

    await groceryListItemsRepository.deleteGroceryListItem(id);
  };

export type IDeleteGroceryListItemUseCase = ReturnType<
  typeof deleteGroceryListItemUseCase
>;
