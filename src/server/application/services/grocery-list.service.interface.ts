import { Transaction } from '@/db';
import { IIngredientsRepository } from '../repositories/ingredients.repository.interface';

export interface IGroceryListService {
  processIngredient(
    ingredient: {
      ingredientId?: string;
      ingredientName?: string;
      categoryId?: string;
    },
    userId: string,
    groupId: string,
    ingredientsRepository: IIngredientsRepository,
    tx?: Transaction
  ): Promise<string>;
}
