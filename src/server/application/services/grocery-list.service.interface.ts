import { Transaction } from '@/db';
import { CreateGroceryListItem } from '@/server/entities/models/grocery-list-item';
import { IIngredientsRepository } from '../repositories/ingredients.repository.interface';

export interface IGroceryListService {
  combineIngredients(
    ingredients: CreateGroceryListItem[]
  ): CreateGroceryListItem[];

  processIngredient(
    ingredient: {
      ingredientId?: string;
      ingredientName?: string;
      categoryId?: string;
    },
    userId: string,
    ingredientsRepository: IIngredientsRepository,
    tx?: Transaction
  ): Promise<string>;
}
