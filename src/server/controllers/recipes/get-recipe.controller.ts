import { IGetRecipeUseCase } from '@/server/application/use-cases/recipes/get-recipe.use-case';
import { z } from 'zod';

const getRecipeSchema = z.object({
  id: z.string(),
});

export const getRecipeController =
  (getRecipeUseCase: IGetRecipeUseCase) =>
  async (input: z.infer<typeof getRecipeSchema>) => {
    const validatedInput = getRecipeSchema.parse(input);
    return getRecipeUseCase(validatedInput.id);
  };

export type IGetRecipeController = ReturnType<typeof getRecipeController>;
