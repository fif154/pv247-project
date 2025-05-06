import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";
import {
    InputParseError,
    NotFoundError,
} from "@/server/entities/errors/common";

export const updateIngredientUseCase =
    (ingredientsRepository: IIngredientsRepository) =>
    async (
        id: string,
        input: {
            name: string;
            description: string | null;
            imageUrl: string | null;
            protein: number;
            carbs: number;
            fats: number;
            calories: number;
            baseMacroQuantity: number;
        }
    ) => {
        const ingredient = await ingredientsRepository.getIngredientById(id);
        if (!ingredient) {
            throw new NotFoundError("Ingredient not found");
        }

        if (input.name !== ingredient.name) {
            const existingIngredient =
                await ingredientsRepository.getIngredientByName(input.name);
            if (existingIngredient) {
                throw new InputParseError(
                    "Ingredient with this name already exists"
                );
            }
        }

        return ingredientsRepository.updateIngredient(id, input);
    };

export type IUpdateIngredientUseCase = ReturnType<
    typeof updateIngredientUseCase
>;
