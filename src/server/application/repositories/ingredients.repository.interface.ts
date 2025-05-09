import { Transaction } from '@/db';
import {
  CreateIngredient,
  Ingredient,
} from '@/server/entities/models/ingredient';

export interface IIngredientsRepository {
  createIngredient(
    input: CreateIngredient,
    tx?: Transaction
  ): Promise<Ingredient>;
  getIngredientById(id: string): Promise<Ingredient | null>;
  getIngredientByName(name: string): Promise<Ingredient | null>;
  updateIngredient(
    id: string,
    input: Partial<
      Omit<Ingredient, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<Ingredient>;
  deleteIngredient(id: string): Promise<void>;
  listIngredients(userId: string): Promise<Ingredient[]>;
}
