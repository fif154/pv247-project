import { Transaction } from '@/db';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { IGroceryListService } from '@/server/application/services/grocery-list.service.interface';
import { CreateGroceryListItem } from '@/server/entities/models/grocery-list-item';

export class GroceryListService implements IGroceryListService {
  public combineIngredients(
    groceryListItems: CreateGroceryListItem[]
  ): CreateGroceryListItem[] {
    const combinedIngredients: Record<string, CreateGroceryListItem> = {};

    for (const item of groceryListItems) {
      const key = `${item.ingredientId}-${item.unitId}`;
      if (combinedIngredients[key]) {
        combinedIngredients[key].quantity += item.quantity;
      } else {
        combinedIngredients[key] = { ...item };
      }
    }

    return Object.values(combinedIngredients);
  }

  public async processIngredient(
    ingredient: {
      ingredientId?: string;
      ingredientName?: string;
      categoryId?: string;
    },
    userId: string,
    groupId: string,
    ingredientsRepository: IIngredientsRepository,
    tx?: Transaction
  ): Promise<string> {
    let ingredientId = ingredient.ingredientId;

    if (!ingredientId) {
      const existingIngredient =
        await ingredientsRepository.getIngredientByName(
          ingredient.ingredientName!,
          groupId,
          tx
        );

      if (existingIngredient) {
        ingredientId = existingIngredient.id;
      }
    }

    // If no ingredient ID even after checking by name, create a new ingredient
    if (!ingredientId) {
      const newIngredient = await ingredientsRepository.createIngredient(
        {
          name: ingredient.ingredientName!,
          categoryId: ingredient.categoryId!,
          createdBy: userId,
          groupId,
        },
        tx
      );
      ingredientId = newIngredient.id;
    }

    if (!ingredientId) {
      throw new Error('Either ingredientId or ingredientName must be provided');
    }

    return ingredientId;
  }
}
