import { Transaction } from '@/db';
import { CreateRecipeIngredient } from '@/server/entities/models/recipe-ingredient';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { IRecipeIngredientsService } from '@/server/application/services/recipe-ingredients.service.interface';

export class RecipeIngredientsService implements IRecipeIngredientsService {
  async processIngredient(
    ingredientData: {
      ingredientId?: string;
      ingredientName?: string;
      categoryId?: string;
    },
    userId: string,
    groupId: string,
    ingredientsRepository: IIngredientsRepository,
    tx?: Transaction
  ): Promise<string> {
    // If we have an ID, try to use that first
    if (ingredientData.ingredientId) {
      const existingIngredient = await ingredientsRepository.getIngredientById(
        ingredientData.ingredientId,
        groupId
      );
      if (existingIngredient) {
        return existingIngredient.id;
      }
    }

    // If we have a name, try to find an existing ingredient with that name
    if (ingredientData.ingredientName) {
      // Use the existing getIngredientByName method
      const existingIngredient =
        await ingredientsRepository.getIngredientByName(
          ingredientData.ingredientName,
          groupId
        );

      if (existingIngredient) {
        // If found, use the existing ingredient
        return existingIngredient.id;
      }

      // If not found, create a new ingredient
      const newIngredient = await ingredientsRepository.createIngredient(
        {
          name: ingredientData.ingredientName,
          description: null,
          imageUrl: null,
          protein: 0,
          carbs: 0,
          fats: 0,
          calories: 0,
          baseMacroQuantity: 100,
          groupId: groupId,
          createdBy: userId,
          categoryId: ingredientData.categoryId,
        },
        tx
      );

      return newIngredient.id;
    }

    throw new Error(
      'Failed to process ingredient: No valid ID and no name to create new'
    );
  }

  combineIngredients(
    ingredients: CreateRecipeIngredient[]
  ): CreateRecipeIngredient[] {
    const groupedByKey: Record<string, CreateRecipeIngredient> = {};

    // Group ingredients by ingredientId and unitId
    for (const ingredient of ingredients) {
      const key = `${ingredient.ingredientId}-${ingredient.unitId}`;

      if (groupedByKey[key]) {
        // If this ingredient already exists, add the quantities
        groupedByKey[key].quantity += ingredient.quantity;
      } else {
        // Otherwise, add it to our grouped object
        groupedByKey[key] = { ...ingredient };
      }
    }

    // Convert back to array
    return Object.values(groupedByKey);
  }
}
