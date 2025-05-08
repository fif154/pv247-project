import { auth } from '@/auth';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { canViewIngredient } from '../../policy/ingredient';

export const getIngredientUseCase =
  (ingredientsRepository: IIngredientsRepository) => async (id: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const ingredient = await ingredientsRepository.getIngredientById(id);
    if (!ingredient) {
      throw new NotFoundError('Ingredient not found');
    }

    if (!canViewIngredient(ingredient, user)) {
      throw new NotFoundError('Ingredient not found');
    }

    return ingredient;
  };

export type IGetIngredientUseCase = ReturnType<typeof getIngredientUseCase>;
