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
    let ingredientId = ingredientData.ingredientId;
    
    // If this is a new ingredient (has name but no ingredientId)
    if (!ingredientId && ingredientData.ingredientName) {
      const newIngredient = await ingredientsRepository.createIngredient({
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
        categoryId: ingredientData.categoryId
      }, tx);
      
      ingredientId = newIngredient.id;
    }
    
    return ingredientId!;
  }

  combineIngredients(ingredients: CreateRecipeIngredient[]): CreateRecipeIngredient[] {
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