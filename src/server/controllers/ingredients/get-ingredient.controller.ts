import { IGetIngredientUseCase } from "@/server/application/use-cases/ingredients/get-ingredient.use-case";

export const getIngredientController =
    (getIngredientUseCase: IGetIngredientUseCase) => async (id: string) => {
        return await getIngredientUseCase(id);
    };

export type IGetIngredientController = ReturnType<
    typeof getIngredientController
>;
