import { IUpdateRecipeUseCase } from '@/server/application/use-cases/recipes/update-recipe.use-case';
import { z } from 'zod';

const updateRecipeSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  servings: z.number().min(1).optional(),
  image: z.string().nullable().optional(),
});

export const updateRecipeController = (updateRecipeUseCase: IUpdateRecipeUseCase) => 
  async (input: z.infer<typeof updateRecipeSchema>) => {
    const validatedInput = updateRecipeSchema.parse(input);
    const { id, ...updateData } = validatedInput;
    return updateRecipeUseCase(id, updateData);
  };

export type IUpdateRecipeController = ReturnType<typeof updateRecipeController>;