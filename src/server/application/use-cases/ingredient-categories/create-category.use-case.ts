import { IIngredientCategoriesRepository } from '@/server/application/repositories/ingredient-categories.repository.interface';
import { IngredientCategory } from '@/server/entities/models/ingredient-category';

export const createCategoryUseCase =
  (ingredientCategoriesRepository: IIngredientCategoriesRepository) =>
  async (input: Omit<IngredientCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const existingCategory =
      await ingredientCategoriesRepository.getCategoryByName(input.name);
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }

    return ingredientCategoriesRepository.createCategory(input);
  };

export type ICreateCategoryUseCase = ReturnType<typeof createCategoryUseCase>;
