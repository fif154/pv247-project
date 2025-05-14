import { auth } from '@/auth';
import { IMealAdditionalIngredientsRepository } from '@/server/application/repositories/meal-additional-ingredients.repository.interface';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupService } from '../../services/group.service.interface';

export const removeIngredientFromMealUseCase =
  (
    mealAdditionalIngredientsRepository: IMealAdditionalIngredientsRepository,
    mealsRepository: IMealsRepository,
    groupService: IGroupService
  ) =>
  async (mealId: string, ingredientId: string): Promise<void> => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User not in a group');
    }

    await groupService.verifyUserInGroup(user.id, user.groupId);

    const meal = await mealsRepository.getMealById(mealId);
    if (!meal) {
      throw new NotFoundError('Meal not found');
    }

    if (meal.groupId !== user.groupId) {
      throw new NotFoundError('Meal not in your group');
    }

    await mealAdditionalIngredientsRepository.removeIngredientFromMeal(
      mealId,
      ingredientId
    );
  };

export type IRemoveIngredientFromMealUseCase = ReturnType<
  typeof removeIngredientFromMealUseCase
>;
