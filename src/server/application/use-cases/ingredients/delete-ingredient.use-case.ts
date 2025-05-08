import { auth } from "@/auth";
import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";
import { canDeleteIngredient } from "../../policy/ingredient";

export const deleteIngredientUseCase =
    (ingredientsRepository: IIngredientsRepository) => async (id: string) => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const ingredient = await ingredientsRepository.getIngredientById(id);
        if (!ingredient) {
            throw new NotFoundError("Ingredient not found");
        }

        if (!canDeleteIngredient(ingredient, user)) {
            throw new NotFoundError("Ingredient not found");
        }

        return ingredientsRepository.deleteIngredient(id);
    };

export type IDeleteIngredientUseCase = ReturnType<
    typeof deleteIngredientUseCase
>;
