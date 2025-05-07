import { Recipe } from "@/server/entities/models/recipe";

export interface IRecipesRepository {
    createRecipe(
        input: Omit<Recipe, "id" | "createdAt" | "updatedAt">
    ): Promise<Recipe>;
    getRecipeById(id: string): Promise<Recipe | null>;
    getRecipeByName(name: string): Promise<Recipe | null>;
    updateRecipe(
        id: string,
        input: Partial<
            Omit<Recipe, "id" | "createdBy" | "createdAt" | "updatedAt">
        >
    ): Promise<Recipe>;
    deleteRecipe(id: string): Promise<void>;
    listRecipes(userId: string): Promise<Recipe[]>;
}
