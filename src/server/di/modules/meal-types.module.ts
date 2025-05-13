import { createModule } from '@evyweb/ioctopus';

import { listMealTypesUseCase } from '@/server/application/use-cases/meal-types/list-meal-types.use-case';
import { listMealTypesController } from '@/server/controllers/meal-types/list-meal-types.controller';
import { MealTypesRepository } from '@/server/infrastructure/repositories/meal-types.repository';
import { DI_SYMBOLS } from '../types';

export function createMealTypesModule() {
  const mealTypesModule = createModule();

  mealTypesModule
    .bind(DI_SYMBOLS.IMealTypesRepository)
    .toClass(MealTypesRepository, [DI_SYMBOLS.ITransactionManagerService]);

  mealTypesModule
    .bind(DI_SYMBOLS.IListMealTypesUseCase)
    .toHigherOrderFunction(listMealTypesUseCase, [
      DI_SYMBOLS.IMealTypesRepository,
    ]);

  mealTypesModule
    .bind(DI_SYMBOLS.IListMealTypesController)
    .toHigherOrderFunction(listMealTypesController, [
      DI_SYMBOLS.IListMealTypesUseCase,
    ]);

  return mealTypesModule;
}
