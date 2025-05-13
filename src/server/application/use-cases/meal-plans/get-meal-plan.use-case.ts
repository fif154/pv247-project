import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';
import { getStatusForMealPlan } from './list-meal-plans.use-case';

export const getMealPlanUseCase =
  (mealPlansRepository: IMealPlansRepository, groupService: IGroupService) =>
  async (id: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const mealPlan = await mealPlansRepository.getMealPlanById(id);
    if (!mealPlan) {
      throw new NotFoundError('Meal plan not found');
    }

    if (mealPlan.groupId !== user.groupId) {
      throw new NotFoundError('Meal plan not in your group');
    }

    const status = getStatusForMealPlan(mealPlan, new Date());

    return {
      ...mealPlan,
      status,
    };
  };

export type IGetMealPlanUseCase = ReturnType<typeof getMealPlanUseCase>;
