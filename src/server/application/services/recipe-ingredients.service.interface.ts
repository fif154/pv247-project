import { Transaction } from '@/db';
import { CreateRecipeIngredient } from '@/server/entities/models/recipe-ingredient';
import { IIngredientsRepository } from '../repositories/ingredients.repository.interface';

export interface IRecipeIngredientsService {
  processIngredient(
    ingredientData: {
      ingredientId?: string;
      ingredientName?: string;
      categoryId?: string;
    },
    userId: string,
    groupId: string,
    ingredientsRepository: IIngredientsRepository,
    tx?: Transaction
  ): Promise<string>;

  combineIngredients(
    ingredients: CreateRecipeIngredient[]
  ): CreateRecipeIngredient[];
}