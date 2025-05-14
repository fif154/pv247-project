import {
  IListFilteredRecipesUseCase,
  ListFilteredRecipesInput,
} from '@/server/application/use-cases/recipes/list-filtered-recipes.use-case';

export const listFilteredRecipesController =
  (listFilteredRecipesUseCase: IListFilteredRecipesUseCase) =>
  async (input: ListFilteredRecipesInput = {}) => {
    return await listFilteredRecipesUseCase(input);
  };

export type IListFilteredRecipesController = ReturnType<
  typeof listFilteredRecipesController
>;
