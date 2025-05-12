import { IUpdateRecipeUseCase } from '@/server/application/use-cases/recipes/update-recipe.use-case';
import { z } from 'zod';

// Define the schema for an ingredient
const ingredientSchema = z.object({
  id: z.string().optional(), // Optional for new ingredients
  ingredientId: z.string(),
  quantity: z.number().positive(),
  unitId: z.string(),
});

const updateRecipeSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  servings: z.number().min(1).optional(),
  image: z.string().nullable().optional(),
  ingredients: z.array(ingredientSchema).optional(),
});

export const updateRecipeController =
  (updateRecipeUseCase: IUpdateRecipeUseCase) =>
  async (input: z.infer<typeof updateRecipeSchema>) => {
    const validatedInput = updateRecipeSchema.parse(input);
    const { id, ...updateData } = validatedInput;
    return updateRecipeUseCase(id, updateData);
  };

export type IUpdateRecipeController = ReturnType<typeof updateRecipeController>;