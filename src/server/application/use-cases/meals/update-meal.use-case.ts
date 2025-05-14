import { auth } from '@/auth';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import {
  CreateMealAdditionalIngredient,
  Meal,
} from '@/server/entities/models/meal';
import { IMealAdditionalIngredientsRepository } from '../../repositories/meal-additional-ingredients.repository.interface';
import { IGroupService } from '../../services/group.service.interface';
import { IIngredientService } from '../../services/ingredient.service.interface';

export const updateMealUseCase =
  (
    mealsRepository: IMealsRepository,
    additionalIngredientsRepository: IMealAdditionalIngredientsRepository,
    groupService: IGroupService,
    ingredientService: IIngredientService
  ) =>
  async (
    id: string,
    input: Partial<Omit<Meal, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>,
    additionalIngredients?: Omit<CreateMealAdditionalIngredient, 'mealId'>[],
    dnd = false,
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

    const existingMeal = await mealsRepository.getMealById(id);
    if (!existingMeal) {
      throw new NotFoundError('Meal not found');
    }

    if (existingMeal.groupId !== user.groupId) {
      throw new NotFoundError('Meal not in your group');
    }

    const combined = ingredientService.combine(additionalIngredients ?? []);

    const meal = await mealsRepository.updateMeal(
      id,
      input,
      combined,
      !dnd,
      tx
    );

    return { ...meal, additionalIngredients };
  };

export type IUpdateMealUseCase = ReturnType<typeof updateMealUseCase>;
