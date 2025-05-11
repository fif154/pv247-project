import { IIngredientCategoriesRepository } from '@/server/application/repositories/ingredient-categories.repository.interface';

export const listCategoriesUseCase =
  (ingredientCategoriesRepository: IIngredientCategoriesRepository) =>
  async () => {
    return ingredientCategoriesRepository.listCategories();
  };

export type IListCategoriesUseCase = ReturnType<typeof listCategoriesUseCase>;
