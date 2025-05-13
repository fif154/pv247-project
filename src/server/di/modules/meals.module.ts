import { createModule } from '@evyweb/ioctopus';

import { createMealUseCase } from '@/server/application/use-cases/meals/create-meal.use-case';
import { deleteMealUseCase } from '@/server/application/use-cases/meals/delete-meal.use-case';
import { listMealsUseCase } from '@/server/application/use-cases/meals/list-meals.use-case';
import { updateMealUseCase } from '@/server/application/use-cases/meals/update-meal.use-case';
import { createMealController } from '@/server/controllers/meals/create-meal.controller';
import { deleteMealController } from '@/server/controllers/meals/delete-meal.controller';
import { listMealsController } from '@/server/controllers/meals/list-meals.controller';
import { updateMealController } from '@/server/controllers/meals/update-meal.controller';
import { MealsRepository } from '@/server/infrastructure/repositories/meals.repository';
import { DI_SYMBOLS } from '../types';

export function createMealsModule() {
  const mealsModule = createModule();

  mealsModule
    .bind(DI_SYMBOLS.IMealsRepository)
    .toClass(MealsRepository, [DI_SYMBOLS.ITransactionManagerService]);

  mealsModule
    .bind(DI_SYMBOLS.ICreateMealUseCase)
    .toHigherOrderFunction(createMealUseCase, [
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
      DI_SYMBOLS.IMealPlanMealsRepository,
      DI_SYMBOLS.IMealAdditionalIngredientsRepository,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.IListMealsUseCase)
    .toHigherOrderFunction(listMealsUseCase, [
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
      DI_SYMBOLS.IMealPlansRepository,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.IUpdateMealUseCase)
    .toHigherOrderFunction(updateMealUseCase, [
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
      DI_SYMBOLS.IMealAdditionalIngredientsRepository,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.IDeleteMealUseCase)
    .toHigherOrderFunction(deleteMealUseCase, [
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
      DI_SYMBOLS.IMealPlanMealsRepository,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.ICreateMealController)
    .toHigherOrderFunction(createMealController, [
      DI_SYMBOLS.ICreateMealUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.IListMealsController)
    .toHigherOrderFunction(listMealsController, [DI_SYMBOLS.IListMealsUseCase]);

      mealsModule
    .bind(DI_SYMBOLS.IListMealsForDayUseCase)
    .toHigherOrderFunction(listMealsUseCase, [
      DI_SYMBOLS.IMealsRepository,
      DI_SYMBOLS.IGroupService,
    ]);

      mealsModule
    .bind(DI_SYMBOLS.IListMealsForDayController)
    .toHigherOrderFunction(listMealsController, [DI_SYMBOLS.IListMealsForDayUseCase]);
  mealsModule
    .bind(DI_SYMBOLS.IUpdateMealController)
    .toHigherOrderFunction(updateMealController, [
      DI_SYMBOLS.IUpdateMealUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.IDeleteMealController)
    .toHigherOrderFunction(deleteMealController, [
      DI_SYMBOLS.IDeleteMealUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  return mealsModule;
}
