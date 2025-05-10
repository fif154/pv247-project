import { auth } from '@/auth';
import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';

export const markAllItemsBoughtUseCase =
  (groceryListItemsRepository: IGroceryListItemsRepository) =>
  async (groceryListId: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return groceryListItemsRepository.updateGroceryListItemsByGroceryListId(
      groceryListId,
      { isBought: true }
    );
  };

export type IMarkAllItemsBoughtUseCase = ReturnType<
  typeof markAllItemsBoughtUseCase
>;
