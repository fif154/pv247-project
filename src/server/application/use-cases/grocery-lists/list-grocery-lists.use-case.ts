import { auth } from '@/auth';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';

export const listGroceryListsUseCase =
  (groceryListsRepository: IGroceryListsRepository) => async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return groceryListsRepository.listGroceryLists(user.id);
  };

export type IListGroceryListsUseCase = ReturnType<
  typeof listGroceryListsUseCase
>;
