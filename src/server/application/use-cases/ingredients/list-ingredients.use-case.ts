import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";

export const listIngredientsUseCase =
    (ingredientsRepository: IIngredientsRepository) => async () => {
        return ingredientsRepository.listIngredients();
    };

export type IListIngredientsUseCase = ReturnType<typeof listIngredientsUseCase>;
