import { IngredientCategory } from "@/server/entities/models/ingredient-category";

export interface IIngredientCategoriesRepository {
    createCategory(
        input: Omit<IngredientCategory, "id" | "createdAt" | "updatedAt">
    ): Promise<IngredientCategory>;
    getCategoryById(id: string): Promise<IngredientCategory | null>;
    getCategoryByName(name: string): Promise<IngredientCategory | null>;
    listCategories(userId: string): Promise<IngredientCategory[]>;
}
