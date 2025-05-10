import { auth } from '@/auth';
import { IIngredientCategoriesRepository } from '@/server/application/repositories/ingredient-categories.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';

export const listCategoriesUseCase =
  (ingredientCategoriesRepository: IIngredientCategoriesRepository) =>
  async () => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    return ingredientCategoriesRepository.listCategories(user.groupId!);
  };

export type IListCategoriesUseCase = ReturnType<typeof listCategoriesUseCase>;
