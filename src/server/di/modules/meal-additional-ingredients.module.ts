import { createModule } from '@evyweb/ioctopus';

import { removeIngredientFromMealUseCase } from '@/server/application/use-cases/meal-additional-ingredients/remove-ingredient-from-meal.use-case';
import { MealAdditionalIngredientsRepository } from '@/server/infrastructure/repositories/meal-additional-ingredients.repository';
import { DI_SYMBOLS } from '../types';

export function createMealAdditionalIngredientsModule() {
  const mealAdditionalIngredientsModule = createModule();

  // Repository
  mealAdditionalIngredientsModule
    .bind(DI_SYMBOLS.IMealAdditionalIngredientsRepository)
    .toClass(MealAdditionalIngredientsRepository, [
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealAdditionalIngredientsModule
    .bind(DI_SYMBOLS.IRemoveIngredientFromMealUseCase)
    .toHigherOrderFunction(removeIngredientFromMealUseCase, [
      DI_SYMBOLS.IMealAdditionalIngredientsRepository,
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  return mealAdditionalIngredientsModule;
}
