import { auth } from '@/auth';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { GroceryList } from '@/server/entities/models/grocery-list';
import { IGroupService } from '../../services/group.service.interface';

export type UpdateGroceryListInput = Partial<
  Omit<GroceryList, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
>;

export const updateGroceryListUseCase =
  (
    groceryListsRepository: IGroceryListsRepository,
    groupService: IGroupService
  ) =>
  async (id: string, input: UpdateGroceryListInput) => {
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

    return await groceryListsRepository.updateGroceryList(id, input);
  };

export type IUpdateGroceryListUseCase = ReturnType<
  typeof updateGroceryListUseCase
>;
