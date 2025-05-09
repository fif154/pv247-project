import { createModule } from '@evyweb/ioctopus';

import { createMealUseCase } from '@/server/application/use-cases/meals/create-meal.use-case';
import { listMealsUseCase } from '@/server/application/use-cases/meals/list-meals.use-case';
import { createMealController } from '@/server/controllers/meals/create-meal.controller';
import { listMealsController } from '@/server/controllers/meals/list-meals.controller';
import { MealsRepository } from '@/server/infrastructure/repositories/meals.repository';
import { DI_SYMBOLS } from '../types';

export function createMealsModule() {
  const mealsModule = createModule();

  mealsModule
    .bind(DI_SYMBOLS.IMealsRepository)
    .toClass(MealsRepository, [DI_SYMBOLS.ITransactionManagerService]);

  mealsModule
    .bind(DI_SYMBOLS.ICreateMealUseCase)
    .toHigherOrderFunction(createMealUseCase, [DI_SYMBOLS.IMealsRepository]);

  mealsModule
    .bind(DI_SYMBOLS.IListMealsUseCase)
    .toHigherOrderFunction(listMealsUseCase, [DI_SYMBOLS.IMealsRepository]);

  mealsModule
    .bind(DI_SYMBOLS.ICreateMealController)
    .toHigherOrderFunction(createMealController, [
      DI_SYMBOLS.ICreateMealUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  mealsModule
    .bind(DI_SYMBOLS.IListMealsController)
    .toHigherOrderFunction(listMealsController, [DI_SYMBOLS.IListMealsUseCase]);

  return mealsModule;
}
