import { auth } from '@/auth';
import { ICreateIngredientUseCase } from '@/server/application/use-cases/ingredients/create-ingredient.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { z } from 'zod';

const inputSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).nullable(),
  createdBy: z.string().min(1),
  imageUrl: z.string().url().nullable(),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fats: z.number().min(0),
  calories: z.number().min(0),
  baseMacroQuantity: z.number().min(0),
  deletedAt: z.string().nullable(),
});

export const createIngredientController =
  (createIngredientUseCase: ICreateIngredientUseCase) =>
  async (input: unknown) => {
    const result = inputSchema.safeParse(input);
    if (!result.success) {
      throw new InputParseError(result.error.message);
    }

    const user = (await auth())?.user;
    if (!user) {
      throw new InputParseError('User not found');
    }

    return await createIngredientUseCase({
      ...result.data,
      groupId: user.groupId,
    });
  };

export type ICreateIngredientController = ReturnType<
  typeof createIngredientController
>;
