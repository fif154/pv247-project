import { auth } from '@/auth';
import { ICreateRecipeUseCase } from '@/server/application/use-cases/recipes/create-recipe.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { z } from 'zod';

const createRecipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  servings: z.number().min(1),
  image: z.string().nullable(),
});

export const createRecipeController =
  (createRecipeUseCase: ICreateRecipeUseCase) =>
  async (input: z.infer<typeof createRecipeSchema>) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new InputParseError('User not found');
    }

    const validatedInput = createRecipeSchema.parse(input);

    return createRecipeUseCase({
      ...validatedInput,
      createdBy: user.id,
      deletedAt: null,
      groupId: user.groupId,
    });
  };

export type ICreateRecipeController = ReturnType<typeof createRecipeController>;
