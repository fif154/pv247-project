import { createModule } from '@evyweb/ioctopus';

import { createMealPlanUseCase } from '@/server/application/use-cases/meal-plans/create-meal-plan.use-case';
import { listMealPlansUseCase } from '@/server/application/use-cases/meal-plans/list-meal-plans.use-case';
import { createMealPlanController } from '@/server/controllers/meal-plans/create-meal-plan.controller';
import { listMealPlansController } from '@/server/controllers/meal-plans/list-meal-plans.controller';
import { MealPlansRepository } from '@/server/infrastructure/repositories/meal-plans.repository';
import { DI_SYMBOLS } from '../types';

export function createMealPlansModule() {
  const mealPlansModule = createModule();

  mealPlansModule
    .bind(DI_SYMBOLS.IMealPlansRepository)
    .toClass(MealPlansRepository, [DI_SYMBOLS.ITransactionManagerService]);

  mealPlansModule
    .bind(DI_SYMBOLS.ICreateMealPlanUseCase)
    .toHigherOrderFunction(createMealPlanUseCase, [
      DI_SYMBOLS.IMealPlansRepository,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IListMealPlansUseCase)
    .toHigherOrderFunction(listMealPlansUseCase, [
      DI_SYMBOLS.IMealPlansRepository,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.ICreateMealPlanController)
    .toHigherOrderFunction(createMealPlanController, [
      DI_SYMBOLS.ICreateMealPlanUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IListMealPlansController)
    .toHigherOrderFunction(listMealPlansController, [
      DI_SYMBOLS.IListMealPlansUseCase,
    ]);

  return mealPlansModule;
}
