import { auth } from '@/auth';
import { IMealPlanMealsRepository } from '@/server/application/repositories/meal-plan-meals.repository.interface';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const removeMealFromPlanUseCase =
  (
    mealPlanMealsRepository: IMealPlanMealsRepository,
    mealPlansRepository: IMealPlansRepository,
    groupService: IGroupService
  ) =>
  async (mealPlanId: string, mealId: string): Promise<void> => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const mealPlan = await mealPlansRepository.getMealPlanById(mealPlanId);
    if (!mealPlan) {
      throw new NotFoundError('Meal plan not found');
    }

    if (mealPlan.groupId !== user.groupId) {
      throw new NotFoundError('Meal plan not in your group');
    }

    await mealPlanMealsRepository.removeMealFromPlan(mealPlanId, mealId);
  };

export type IRemoveMealFromPlanUseCase = ReturnType<
  typeof removeMealFromPlanUseCase
>;
