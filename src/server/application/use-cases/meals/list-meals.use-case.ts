import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { Meal } from '@/server/entities/models/meal';
import { isDateInRange } from '@/utils/date';
import { calculateMacrosForMeal } from '@/utils/macros';
import { DateRange } from 'react-day-picker';
import { IMealPlansRepository } from '../../repositories/meal-plans.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

export const listMealsUseCase =
  (
    mealsRepository: IMealsRepository,
    groupService: IGroupService,
    mealPlansRepository: IMealPlansRepository
  ) =>
  async (mealPlanId?: string, dateRange?: DateRange) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    let meals: Meal[] = [];
    if (mealPlanId) {
      const mealPlan = await mealPlansRepository.getMealPlanById(mealPlanId);
      if (!mealPlan) {
        throw new NotFoundError('Meal plan not found');
      }
      if (mealPlan.groupId !== user.groupId) {
        throw new NotFoundError('Meal plan not in your group');
      }
      meals = mealPlan.meals?.map((meal) => meal.meal!) ?? [];
    } else {
      meals = await mealsRepository.listMeals(user.groupId);
    }

    return meals
      .filter((m) => !dateRange || isDateInRange(m.plannedDate!, dateRange))
      .map((meal) => ({
        ...meal,
        macros: calculateMacrosForMeal(meal),
      }));
  };

export type IListMealsUseCase = ReturnType<typeof listMealsUseCase>;
