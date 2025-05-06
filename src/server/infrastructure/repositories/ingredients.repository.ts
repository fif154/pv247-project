import { db } from "@/db";
import { ingredients } from "@/db/schema";
import { IIngredientsRepository } from "@/server/application/repositories/ingredients.repository.interface";
import { Ingredient } from "@/server/entities/models/ingredient";
import { and, eq, isNull } from "drizzle-orm";

export class IngredientsRepository implements IIngredientsRepository {
    async createIngredient(
        input: Omit<Ingredient, "id" | "createdAt" | "updatedAt">
    ): Promise<Ingredient> {
        const [ingredient] = await db
            .insert(ingredients)
            .values(input)
            .returning();
        return ingredient;
    }

    async getIngredientById(id: string): Promise<Ingredient | null> {
        const [ingredient] = await db
            .select()
            .from(ingredients)
            .where(and(eq(ingredients.id, id), isNull(ingredients.deletedAt)))
            .limit(1);
        return ingredient || null;
    }

    async getIngredientByName(name: string): Promise<Ingredient | null> {
        const [ingredient] = await db
            .select()
            .from(ingredients)
            .where(
                and(eq(ingredients.name, name), isNull(ingredients.deletedAt))
            )
            .limit(1);
        return ingredient || null;
    }

    async updateIngredient(
        id: string,
        input: Partial<
            Omit<Ingredient, "id" | "createdBy" | "createdAt" | "updatedAt">
        >
    ): Promise<Ingredient> {
        const [ingredient] = await db
            .update(ingredients)
            .set(input)
            .where(and(eq(ingredients.id, id), isNull(ingredients.deletedAt)))
            .returning();
        return ingredient;
    }

    async deleteIngredient(id: string): Promise<void> {
        await db.delete(ingredients).where(eq(ingredients.id, id));
    }

    async listIngredients(userId: string): Promise<Ingredient[]> {
        const result = await db
            .select()
            .from(ingredients)
            .where(
                and(
                    eq(ingredients.createdBy, userId),
                    isNull(ingredients.deletedAt)
                )
            );
        return result;
    }
}
