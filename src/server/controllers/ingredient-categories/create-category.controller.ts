import { auth } from '@/auth';
import { ICreateCategoryUseCase } from '@/server/application/use-cases/ingredient-categories/create-category.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
});

export const createCategoryController =
  (createCategoryUseCase: ICreateCategoryUseCase) =>
  async (input: z.infer<typeof createCategorySchema>) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new InputParseError('User not found');
    }

    const validatedInput = createCategorySchema.parse(input);

    return createCategoryUseCase({
      ...validatedInput,
      createdBy: user.id,
    });
  };

export type ICreateCategoryController = ReturnType<
  typeof createCategoryController
>;
