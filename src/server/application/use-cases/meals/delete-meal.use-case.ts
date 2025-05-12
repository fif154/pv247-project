import { auth } from '@/auth';
import { Transaction } from '@/db';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IMealPlanMealsRepository } from '../../repositories/meal-plan-meals.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

export const deleteMealUseCase =
  (
    mealsRepository: IMealsRepository,
    groupService: IGroupService,
    mealPlanMealsRepository: IMealPlanMealsRepository
  ) =>
  async (id: string, tx?: Transaction) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const existingMeal = await mealsRepository.getMealById(id);
    if (!existingMeal) {
      throw new NotFoundError('Meal not found');
    }

    if (existingMeal.groupId !== user.groupId) {
      throw new NotFoundError('Meal not in your group');
    }
    const mealPlanMeal = await mealPlanMealsRepository.getMealPlanMealByMealId(
      id,
      tx
    );

    if (mealPlanMeal) {
      await mealPlanMealsRepository.removeMealFromPlan(
        mealPlanMeal.mealPlanId,
        id,
        tx
      );
    }
    await mealsRepository.deleteMeal(id, tx);
  };
