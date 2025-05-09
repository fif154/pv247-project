import { IListRecipesUseCase } from '@/server/application/use-cases/recipes/list-recipes.use-case';

export const listRecipesController = (listRecipesUseCase: IListRecipesUseCase) => 
  async () => {
    return listRecipesUseCase();
  };

export type IListRecipesController = ReturnType<typeof listRecipesController>;