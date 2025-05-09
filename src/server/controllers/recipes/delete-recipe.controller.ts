import { IDeleteRecipeUseCase } from '@/server/application/use-cases/recipes/delete-recipe.use-case';
import { z } from 'zod';

const deleteRecipeSchema = z.object({
  id: z.string(),
});

export const deleteRecipeController =
  (deleteRecipeUseCase: IDeleteRecipeUseCase) =>
  async (input: z.infer<typeof deleteRecipeSchema>) => {
    const validatedInput = deleteRecipeSchema.parse(input);
    await deleteRecipeUseCase(validatedInput.id);
  };

export type IDeleteRecipeController = ReturnType<typeof deleteRecipeController>;
