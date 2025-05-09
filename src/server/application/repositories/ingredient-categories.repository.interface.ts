import {
  CreateIngredientCategory,
  IngredientCategory,
} from '@/server/entities/models/ingredient-category';

export interface IIngredientCategoriesRepository {
  createCategory(input: CreateIngredientCategory): Promise<IngredientCategory>;
  getCategoryById(id: string): Promise<IngredientCategory | null>;
  getCategoryByName(name: string): Promise<IngredientCategory | null>;
  listCategories(userId: string): Promise<IngredientCategory[]>;
}
