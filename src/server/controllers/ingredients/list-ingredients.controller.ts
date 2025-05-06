import { IListIngredientsUseCase } from "@/server/application/use-cases/ingredients/list-ingredients.use-case";

export const listIngredientsController =
    (listIngredientsUseCase: IListIngredientsUseCase) => async () =>
        await listIngredientsUseCase();

export type IListIngredientsController = typeof listIngredientsController;
