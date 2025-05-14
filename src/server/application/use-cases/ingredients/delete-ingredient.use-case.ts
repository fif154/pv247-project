import { auth } from '@/auth';
import { IIngredientsRepository } from '@/server/application/repositories/ingredients.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const deleteIngredientUseCase =
  (
    ingredientsRepository: IIngredientsRepository,
    groupService: IGroupService
  ) =>
  async (id: string) => {
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
    // if (!canDeleteIngredient(ingredient, user)) {
    //   throw new NotFoundError('Ingredient not found');
    // }

    return ingredientsRepository.deleteIngredient(id);
  };

export type IDeleteIngredientUseCase = ReturnType<
  typeof deleteIngredientUseCase
>;
