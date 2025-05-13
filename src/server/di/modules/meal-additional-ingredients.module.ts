import { createModule } from '@evyweb/ioctopus';

import { addIngredientToMealController } from '@/server/application/controllers/meal-additional-ingredients/add-ingredient-to-meal.controller';
import { removeIngredientFromMealController } from '@/server/application/controllers/meal-additional-ingredients/remove-ingredient-from-meal.controller';
import { addIngredientToMealUseCase } from '@/server/application/use-cases/meal-additional-ingredients/add-ingredient-to-meal.use-case';
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

  // Use cases
  mealAdditionalIngredientsModule
    .bind(DI_SYMBOLS.IAddIngredientToMealUseCase)
    .toHigherOrderFunction(addIngredientToMealUseCase, [
      DI_SYMBOLS.IMealAdditionalIngredientsRepository,
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  mealAdditionalIngredientsModule
    .bind(DI_SYMBOLS.IRemoveIngredientFromMealUseCase)
    .toHigherOrderFunction(removeIngredientFromMealUseCase, [
      DI_SYMBOLS.IMealAdditionalIngredientsRepository,
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  // Controllers
  mealAdditionalIngredientsModule
    .bind(DI_SYMBOLS.IAddIngredientToMealController)
    .toHigherOrderFunction(addIngredientToMealController, [
      DI_SYMBOLS.IAddIngredientToMealUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealAdditionalIngredientsModule
    .bind(DI_SYMBOLS.IRemoveIngredientFromMealController)
    .toHigherOrderFunction(removeIngredientFromMealController, [
      DI_SYMBOLS.IRemoveIngredientFromMealUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  return mealAdditionalIngredientsModule;
}
