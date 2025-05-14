import { auth } from '@/auth';
import { ICreateIngredientUseCase } from '@/server/application/use-cases/ingredients/create-ingredient.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { CreateIngredient } from '@/server/entities/models/ingredient';

export const createIngredientController =
  (createIngredientUseCase: ICreateIngredientUseCase) =>
  async (input: CreateIngredient) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new InputParseError('User not found');
    }

    return await createIngredientUseCase({
      ...input,
      groupId: user.groupId,
    });
  };

export type ICreateIngredientController = ReturnType<
  typeof createIngredientController
>;
