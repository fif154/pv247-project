import { createModule } from '@evyweb/ioctopus';

import { createMealPlanUseCase } from '@/server/application/use-cases/meal-plans/create-meal-plan.use-case';
import { deleteMealPlanUseCase } from '@/server/application/use-cases/meal-plans/delete-meal-plan.use-case';
import { getMealPlanUseCase } from '@/server/application/use-cases/meal-plans/get-meal-plan.use-case';
import { listMealPlansUseCase } from '@/server/application/use-cases/meal-plans/list-meal-plans.use-case';
import { updateMealPlanUseCase } from '@/server/application/use-cases/meal-plans/update-meal-plan.use-case';
import { createMealPlanController } from '@/server/controllers/meal-plans/create-meal-plan.controller';
import { deleteMealPlanController } from '@/server/controllers/meal-plans/delete-meal-plan.controller';
import { getMealPlanController } from '@/server/controllers/meal-plans/get-meal-plan.controller';
import { listMealPlansController } from '@/server/controllers/meal-plans/list-meal-plans.controller';
import { updateMealPlanController } from '@/server/controllers/meal-plans/update-meal-plan.controller';
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
      DI_SYMBOLS.IGroupService,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IListMealPlansUseCase)
    .toHigherOrderFunction(listMealPlansUseCase, [
      DI_SYMBOLS.IMealPlansRepository,
      DI_SYMBOLS.IGroupService,
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

  mealPlansModule
    .bind(DI_SYMBOLS.IGetMealPlanUseCase)
    .toHigherOrderFunction(getMealPlanUseCase, [
      DI_SYMBOLS.IMealPlansRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IGetMealPlanController)
    .toHigherOrderFunction(getMealPlanController, [
      DI_SYMBOLS.IGetMealPlanUseCase,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IUpdateMealPlanUseCase)
    .toHigherOrderFunction(updateMealPlanUseCase, [
      DI_SYMBOLS.IMealPlansRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IUpdateMealPlanController)
    .toHigherOrderFunction(updateMealPlanController, [
      DI_SYMBOLS.IUpdateMealPlanUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IDeleteMealPlanUseCase)
    .toHigherOrderFunction(deleteMealPlanUseCase, [
      DI_SYMBOLS.IMealPlansRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  mealPlansModule
    .bind(DI_SYMBOLS.IDeleteMealPlanController)
    .toHigherOrderFunction(deleteMealPlanController, [
      DI_SYMBOLS.IDeleteMealPlanUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  return mealPlansModule;
}
