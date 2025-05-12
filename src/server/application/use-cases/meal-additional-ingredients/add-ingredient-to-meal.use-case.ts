import { auth } from '@/auth';
import { IMealAdditionalIngredientsRepository } from '@/server/application/repositories/meal-additional-ingredients.repository.interface';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { MealAdditionalIngredient } from '@/server/entities/models/meal';
import { IGroupService } from '../../services/group.service.interface';

export const addIngredientToMealUseCase =
  (
    mealAdditionalIngredientsRepository: IMealAdditionalIngredientsRepository,
    mealsRepository: IMealsRepository,
    groupService: IGroupService
  ) =>
  async (
    mealId: string,
    ingredientId: string,
    quantity: number,
    unitId: string
  ): Promise<MealAdditionalIngredient> => {
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

    return mealAdditionalIngredientsRepository.addIngredientToMeal(
      mealId,
      ingredientId,
      quantity,
      unitId
    );
  };

export type IAddIngredientToMealUseCase = ReturnType<
  typeof addIngredientToMealUseCase
>;
