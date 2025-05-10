import { auth } from '@/auth';
import { IIngredientCategoriesRepository } from '@/server/application/repositories/ingredient-categories.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IngredientCategory } from '@/server/entities/models/ingredient-category';

export const createCategoryUseCase =
  (ingredientCategoriesRepository: IIngredientCategoriesRepository) =>
  async (input: Omit<IngredientCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const existingCategory =
      await ingredientCategoriesRepository.getCategoryByName(
        input.name,
        user.groupId!
      );
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }

    return ingredientCategoriesRepository.createCategory({
      ...input,
      groupId: user.groupId!,
    });
  };

export type ICreateCategoryUseCase = ReturnType<typeof createCategoryUseCase>;
