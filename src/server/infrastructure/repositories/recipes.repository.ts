import { db } from "@/db";
import { recipes } from "@/db/schema";
import { IRecipesRepository } from "@/server/application/repositories/recipes.repository.interface";
import { Recipe } from "@/server/entities/models/recipe";
import { and, eq, isNull } from "drizzle-orm";

export class RecipesRepository implements IRecipesRepository {
    async createRecipe(
        input: Omit<Recipe, "id" | "createdAt" | "updatedAt">
    ): Promise<Recipe> {
        const [recipe] = await db.insert(recipes).values(input).returning();
        return recipe;
    }

    async getRecipeById(id: string): Promise<Recipe | null> {
        const [recipe] = await db
            .select()
            .from(recipes)
            .where(and(eq(recipes.id, id), isNull(recipes.deletedAt)))
            .limit(1);
        return recipe || null;
    }

    async getRecipeByName(name: string): Promise<Recipe | null> {
        const [recipe] = await db
            .select()
            .from(recipes)
            .where(and(eq(recipes.name, name), isNull(recipes.deletedAt)))
            .limit(1);
        return recipe || null;
    }

    async updateRecipe(
        id: string,
        input: Partial<
            Omit<Recipe, "id" | "createdBy" | "createdAt" | "updatedAt">
        >
    ): Promise<Recipe> {
        const [recipe] = await db
            .update(recipes)
            .set(input)
            .where(and(eq(recipes.id, id), isNull(recipes.deletedAt)))
            .returning();
        return recipe;
    }

    async deleteRecipe(id: string): Promise<void> {
        await db.delete(recipes).where(eq(recipes.id, id));
    }

    // TODO: should accept filters
    async listRecipes(): Promise<Recipe[]> {
        const result = await db
            .select()
            .from(recipes)
            .where(isNull(recipes.deletedAt));
        return result;
    }
}
