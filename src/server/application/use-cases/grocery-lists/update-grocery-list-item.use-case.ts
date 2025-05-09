import { auth } from '@/auth';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { GroceryListItem } from '@/server/entities/models/grocery-list-item';

export const updateGroceryListItemUseCase =
  (groceryListItemsRepository: IGroceryListItemsRepository) =>
  async (
    id: string,
    input: Partial<
      Omit<GroceryListItem, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >
  ) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return groceryListItemsRepository.updateGroceryListItem(id, input);
  };

export type IUpdateGroceryListItemUseCase = ReturnType<
  typeof updateGroceryListItemUseCase
>;
