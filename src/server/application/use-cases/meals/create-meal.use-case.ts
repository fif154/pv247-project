import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
} from '@/server/entities/models/meal';
import { IGroupService } from '../../services/group.service.interface';

export const createMealUseCase =
  (mealsRepository: IMealsRepository, groupService: IGroupService) =>
  async (
    input: CreateMeal,
    additionalIngredients?: CreateMealAdditionalIngredient[],
    // TODO: remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    return mealsRepository.createMeal(
      {
        ...input,
        userId: user.id,
        groupId: user.groupId,
      },
      additionalIngredients,
      tx
    );
  };

export type ICreateMealUseCase = ReturnType<typeof createMealUseCase>;
