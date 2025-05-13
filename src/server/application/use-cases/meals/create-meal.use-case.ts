import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import {
  CreateMeal,
  CreateMealAdditionalIngredient,
} from '@/server/entities/models/meal';
import { IMealAdditionalIngredientsRepository } from '../../repositories/meal-additional-ingredients.repository.interface';
import { IMealPlanMealsRepository } from '../../repositories/meal-plan-meals.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

export const createMealUseCase =
  (
    mealsRepository: IMealsRepository,
    groupService: IGroupService,
    mealPlanMealsRepository: IMealPlanMealsRepository,
    additionalIngredientsRepository: IMealAdditionalIngredientsRepository
  ) =>
  async (
    input: Omit<CreateMeal, 'userId' | 'groupId'>,
    additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
    mealPlanId?: string,
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

    const meal = await mealsRepository.createMeal(
      {
        ...input,
        userId: user.id,
        groupId: user.groupId,
      },
      tx
    );

    if (mealPlanId) {
      await mealPlanMealsRepository.addMealToPlan(mealPlanId, meal.id, tx);
    }

    if (additionalIngredients?.length) {
      await additionalIngredientsRepository.addIngredientsToMeal(
        additionalIngredients.map((ingredient) => ({
          ...ingredient,
          mealId: meal.id,
        })),
        tx
      );
    }

    return { ...meal, additionalIngredients, mealPlanId };
  };

export type ICreateMealUseCase = ReturnType<typeof createMealUseCase>;
