import { auth } from '@/auth';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';

export const listIngredientsUseCase =
  (ingredientsRepository: IIngredientsRepository) => async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return ingredientsRepository.listIngredients(user.groupId!);
  };

export type IListIngredientsUseCase = ReturnType<typeof listIngredientsUseCase>;
