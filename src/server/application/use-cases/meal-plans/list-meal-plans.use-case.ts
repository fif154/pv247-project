import { auth } from '@/auth';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { MealPlanWithStatus } from '@/server/entities/models/meal-plan';
import { calculateMacrosForMeal } from '@/utils/macros';
import { isWithinInterval, startOfDay } from 'date-fns';
import { IGroupService } from '../../services/group.service.interface';

export const listMealPlansUseCase =
  (mealPlansRepository: IMealPlansRepository, groupService: IGroupService) =>
  async (): Promise<MealPlanWithStatus[]> => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const mealPlans = await mealPlansRepository.listMealPlans(
      user.id,
      user.groupId
    );

    const today = startOfDay(new Date());

    const sortedMealPlans = [...mealPlans].sort((a, b) => {
      const aStart = new Date(a.startDate);
      const bStart = new Date(b.startDate);
      const aIsCurrent = isWithinInterval(today, {
        start: aStart,
        end: new Date(a.endDate),
      });
      const bIsCurrent = isWithinInterval(today, {
        start: bStart,
        end: new Date(b.endDate),
      });

      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
      return aStart.getTime() - bStart.getTime();
    });

    return sortedMealPlans.map((mealPlan) => {
      const startDate = new Date(mealPlan.startDate);
      const endDate = new Date(mealPlan.endDate);
      const isCurrent = isWithinInterval(today, {
        start: startDate,
        end: endDate,
      });
      const isUpcoming = startDate > today;

      return {
        ...mealPlan,
        status: {
          isCurrent,
          isUpcoming,
        },
        meals: mealPlan.meals?.map((mealPlanMeal) => ({
          ...mealPlanMeal,
          meal: {
            ...mealPlanMeal.meal!,
            macros: calculateMacrosForMeal(mealPlanMeal.meal!),
          },
        })),
      };
    });
  };

export type IListMealPlansUseCase = ReturnType<typeof listMealPlansUseCase>;
