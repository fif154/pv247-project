import { IRecipesRepository } from "@/server/application/repositories/recipes.repository.interface";
import { InputParseError } from "@/server/entities/errors/common";

export const createRecipeUseCase =
    (recipesRepository: IRecipesRepository) =>
    async (input: {
        name: string;
        description: string | null;
        createdBy: string;
        servings: number;
        image: string | null;
        deletedAt: string | null;
    }) => {
        const existingRecipe = await recipesRepository.getRecipeByName(
            input.name
        );
        if (existingRecipe) {
            throw new InputParseError("Recipe with this name already exists");
        }

        return recipesRepository.createRecipe(input);
    };

export type ICreateRecipeUseCase = ReturnType<typeof createRecipeUseCase>;
