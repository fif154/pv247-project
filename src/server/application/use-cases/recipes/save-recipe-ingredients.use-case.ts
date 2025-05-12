import { auth } from '@/auth';
import { Transaction } from '@/db';
import { z } from 'zod';
import { IIngredientsRepository } from '../../repositories/ingredients.repository.interface';
import { IRecipeIngredientsRepository } from '../../repositories/recipe-ingredients.repository.interface';
import { IRecipesRepository } from '../../repositories/recipes.repository.interface';
import { IRecipeIngredientsService } from '../../services/recipe-ingredients.service.interface';
import { IGroupService } from '../../services/group.service.interface';
import { AuthenticationError } from '@/server/entities/errors/auth';
import { NotFoundError } from '@/server/entities/errors/common';

export const saveRecipeIngredientsSchema = z.object({
  recipeId: z.string(),
  ingredients: z.array(z.object({
    id: z.string().optional(),
    ingredientId: z.string().optional(),
    name: z.string().optional(),
    quantity: z.number(),
    unitId: z.string()
  }))
});

export type SaveRecipeIngredientsInput = z.infer<typeof saveRecipeIngredientsSchema>;

export const saveRecipeIngredientsUseCase = (
  recipesRepository: IRecipesRepository,
  recipeIngredientsRepository: IRecipeIngredientsRepository,
  ingredientsRepository: IIngredientsRepository,
  recipeIngredientsService: IRecipeIngredientsService,
  groupService: IGroupService
) => async (input: SaveRecipeIngredientsInput, tx?: Transaction) => {
  const session = await auth();
  const user = session?.user ?? null;

  if (!user) {
    throw new AuthenticationError('User not found');
  }

  if (!user.groupId) {
    throw new NotFoundError('User is not in a group');
  }

  await groupService.verifyUserInGroup(user.id, user.groupId);

  const recipe = await recipesRepository.getRecipeById(input.recipeId);
  
  if (!recipe) {
    throw new NotFoundError('Recipe not found');
  }

  if (recipe.groupId !== user.groupId) {
    throw new NotFoundError('Recipe not found');
  }

  // First delete existing ingredients
  await recipeIngredientsRepository.deleteRecipeIngredientsByRecipeId(input.recipeId, tx);

  const ingredientsToCreate = [];

  // Process each ingredient
  for (const ing of input.ingredients) {
    try {
      const ingredientId = await recipeIngredientsService.processIngredient(
        {
          ingredientId: ing.ingredientId,
          ingredientName: ing.name,
          categoryId: undefined,
        },
        user.id,
        user.groupId,
        ingredientsRepository,
        tx
      );

      ingredientsToCreate.push({
        recipeId: input.recipeId,
        ingredientId,
        quantity: ing.quantity,
        unitId: ing.unitId
      });
    } catch (error) {
      console.error(`Error processing ingredient:`, error);
      continue;
    }
  }

  // Combine ingredients with the same ingredient ID and unit ID
  const combinedIngredients = recipeIngredientsService.combineIngredients(ingredientsToCreate);

  return await recipeIngredientsRepository.createRecipeIngredients(combinedIngredients, tx);
};

export type ISaveRecipeIngredientsUseCase = ReturnType<typeof saveRecipeIngredientsUseCase>;