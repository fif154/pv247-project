import { auth } from '@/auth';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { Ingredient } from '@/server/entities/models/ingredient';

export const createIngredientUseCase =
  (ingredientsRepository: IIngredientsRepository) =>
  async (input: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const existingIngredient = await ingredientsRepository.getIngredientByName(
      input.name,
      user.groupId!
    );
    if (existingIngredient) {
      throw new Error('Ingredient with this name already exists');
    }

    return ingredientsRepository.createIngredient({
      ...input,
      groupId: user.groupId!,
    });
  };

export type ICreateIngredientUseCase = ReturnType<
  typeof createIngredientUseCase
>;
