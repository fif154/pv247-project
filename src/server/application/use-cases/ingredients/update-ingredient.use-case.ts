import { auth } from '@/auth';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import {
  InputParseError,
  NotFoundError,
} from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const updateIngredientUseCase =
  (
    ingredientsRepository: IIngredientsRepository,
    groupService: IGroupService
  ) =>
  async (
    id: string,
    input: {
      name: string;
      description: string | null;
      imageUrl: string | null;
      protein: number;
      carbs: number;
      fats: number;
      calories: number;
      baseMacroQuantity: number;
    }
  ) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const ingredient = await ingredientsRepository.getIngredientById(
      id,
      user.groupId
    );
    if (!ingredient) {
      throw new NotFoundError('Ingredient not found');
    }

    // TODO: Uncomment this when we have the policy in place
    // if (!canEditIngredient(ingredient, user)) {
    //   throw new NotFoundError('User not authorized to edit this ingredient');
    // }

    if (input.name !== ingredient.name) {
      const existingIngredient =
        await ingredientsRepository.getIngredientByName(
          input.name,
          user.groupId
        );
      if (existingIngredient) {
        throw new InputParseError('Ingredient with this name already exists');
      }
    }

    return ingredientsRepository.updateIngredient(id, input);
  };

export type IUpdateIngredientUseCase = ReturnType<
  typeof updateIngredientUseCase
>;
