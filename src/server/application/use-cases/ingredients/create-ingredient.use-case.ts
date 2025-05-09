import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";
import { InputParseError } from "@/server/entities/errors/common";

export const createIngredientUseCase =
    (ingredientsRepository: IIngredientsRepository) =>
    async (input: {
        name: string;
        description: string | null;
        createdBy: string;
        imageUrl: string | null;
        protein: number;
        carbs: number;
        fats: number;
        calories: number;
        baseMacroQuantity: number;
        deletedAt: string | null;
        categoryId?: string | null;
    }) => {
        const existingIngredient =
            await ingredientsRepository.getIngredientByName(input.name);
        if (existingIngredient) {
            throw new InputParseError(
                "Ingredient with this name already exists"
            );
        }

        return ingredientsRepository.createIngredient({
            ...input,
            categoryId: input.categoryId ?? null,
        });
    };

export type ICreateIngredientUseCase = ReturnType<
    typeof createIngredientUseCase
>;
