import { createModule } from '@evyweb/ioctopus';

import { addMealToPlanUseCase } from '@/server/application/use-cases/meal-plan-meals/add-meal-to-plan.use-case';
import { removeMealFromPlanUseCase } from '@/server/application/use-cases/meal-plan-meals/remove-meal-from-plan.use-case';
import { addMealToPlanController } from '@/server/controllers/meal-plan-meals/add-meal-to-plan.controller';
import { removeMealFromPlanController } from '@/server/controllers/meal-plan-meals/remove-meal-from-plan.controller';
import { MealPlanMealsRepository } from '@/server/infrastructure/repositories/meal-plan-meals.repository';
import { DI_SYMBOLS } from '../types';

export function createMealPlanMealsModule() {
  const mealPlanMealsModule = createModule();

  mealPlanMealsModule
    .bind(DI_SYMBOLS.IMealPlanMealsRepository)
    .toClass(MealPlanMealsRepository, [DI_SYMBOLS.ITransactionManagerService]);

  mealPlanMealsModule
    .bind(DI_SYMBOLS.IAddMealToPlanUseCase)
    .toHigherOrderFunction(addMealToPlanUseCase, [
      DI_SYMBOLS.IMealPlanMealsRepository,
      DI_SYMBOLS.IMealPlansRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  mealPlanMealsModule
    .bind(DI_SYMBOLS.IRemoveMealFromPlanUseCase)
    .toHigherOrderFunction(removeMealFromPlanUseCase, [
      DI_SYMBOLS.IMealPlanMealsRepository,
      DI_SYMBOLS.IMealPlansRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  mealPlanMealsModule
    .bind(DI_SYMBOLS.IAddMealToPlanController)
    .toHigherOrderFunction(addMealToPlanController, [
      DI_SYMBOLS.IAddMealToPlanUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealPlanMealsModule
    .bind(DI_SYMBOLS.IRemoveMealFromPlanController)
    .toHigherOrderFunction(removeMealFromPlanController, [
      DI_SYMBOLS.IRemoveMealFromPlanUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  return mealPlanMealsModule;
}
