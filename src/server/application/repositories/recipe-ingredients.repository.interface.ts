import { Transaction } from '@/db';
import {
  CreateRecipeIngredient,
  RecipeIngredient,
} from '@/server/entities/models/recipe-ingredient';

export interface IRecipeIngredientsRepository {
  createRecipeIngredients(
    recipeIngredients: CreateRecipeIngredient[],
    tx?: Transaction
  ): Promise<RecipeIngredient[]>;

  getRecipeIngredientsByRecipeId(
    recipeId: string,
    tx?: Transaction
  ): Promise<RecipeIngredient[]>;

  deleteRecipeIngredientsByRecipeId(
    recipeId: string,
    tx?: Transaction
  ): Promise<void>;
}
