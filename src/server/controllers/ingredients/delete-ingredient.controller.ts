import { IDeleteIngredientUseCase } from '@/server/application/use-cases/ingredients/delete-ingredient.use-case';

export const deleteIngredientController =
  (deleteIngredientUseCase: IDeleteIngredientUseCase) => async (id: string) => {
    return await deleteIngredientUseCase(id);
  };

export type IDeleteIngredientController = ReturnType<
  typeof deleteIngredientController
>;
