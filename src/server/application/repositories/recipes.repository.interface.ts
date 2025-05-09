import { Transaction } from '@/db';
import { Recipe } from '@/server/entities/models/recipe';

export interface IRecipesRepository {
  createRecipe(
    input: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Recipe>;
  getRecipeById(id: string, tx?: Transaction): Promise<Recipe | null>;
  getRecipesByIds(ids: string[], tx?: Transaction): Promise<Recipe[]>;
  getRecipeByName(name: string): Promise<Recipe | null>;
  updateRecipe(
    id: string,
    input: Partial<Omit<Recipe, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>
  ): Promise<Recipe>;
  deleteRecipe(id: string): Promise<void>;
  listRecipes(userId: string): Promise<Recipe[]>;
}
