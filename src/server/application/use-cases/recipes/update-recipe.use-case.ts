import { auth } from "@/auth";
import { IRecipesRepository } from "@/server/application/repositories/recipes.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";
import { canEditRecipe } from "../../policy/recipe";

export const updateRecipeUseCase =
    (recipesRepository: IRecipesRepository) =>
    async (
        id: string,
        input: {
            name?: string;
            description?: string | null;
            servings?: number;
            image?: string | null;
        }
    ) => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        const recipe = await recipesRepository.getRecipeById(id);
        if (!recipe) {
            throw new NotFoundError("Recipe not found");
        }

        if (!canEditRecipe(recipe, user)) {
            throw new NotFoundError("Recipe not found");
        }

        return recipesRepository.updateRecipe(id, input);
    };

export type IUpdateRecipeUseCase = ReturnType<typeof updateRecipeUseCase>;
