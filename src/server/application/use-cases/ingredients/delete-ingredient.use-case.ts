import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";

export const deleteIngredientUseCase =
    (ingredientsRepository: IIngredientsRepository) => async (id: string) => {
        const ingredient = await ingredientsRepository.getIngredientById(id);
        if (!ingredient) {
            throw new NotFoundError("Ingredient not found");
        }

        return ingredientsRepository.deleteIngredient(id);
    };

export type IDeleteIngredientUseCase = ReturnType<
    typeof deleteIngredientUseCase
>;
